import logging
from datetime import datetime, timezone
from uuid import UUID

from nanoid import generate as nanoid
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.diagnosis import Diagnosis
from app.models.pet_type import PetType
from app.models.question import Question
from app.models.response import Response
from app.models.session import Session
from app.schemas.diagnosis import AxisScores, DiagnosisResult
from app.services.llm_client import adjust_scores, generate_result_text
from app.services.scoring import calculate_base_scores, determine_type_code

logger = logging.getLogger(__name__)


async def run_diagnosis(session_id: UUID, db: AsyncSession) -> DiagnosisResult:
    """진단 오케스트레이션: 점수 산출 -> LLM 보정 -> 유형 결정 -> 결과 텍스트 생성 -> 저장."""

    # 1. 세션 조회
    session = await db.get(Session, session_id)
    if not session:
        raise ValueError(f"Session {session_id} not found")

    # 2. 세션의 모든 응답 조회
    result = await db.execute(
        select(Response).where(Response.session_id == session_id)
    )
    responses = list(result.scalars().all())
    if not responses:
        raise ValueError("No responses found for this session")

    # 질문 목록 조회
    question_ids = [r.question_id for r in responses]
    q_result = await db.execute(select(Question).where(Question.id.in_(question_ids)))
    questions = list(q_result.scalars().all())

    # 3. 기본 점수 산출
    base_scores = calculate_base_scores(responses, questions)

    # 4. 자유입력 수집 및 LLM 보정
    free_texts = [r.free_text for r in responses if r.free_text and r.free_text.strip()]
    combined_free_text = "\n".join(free_texts)

    final_scores = dict(base_scores)
    llm_model = "claude-sonnet-4-20250514"

    if combined_free_text:
        adjustments = await adjust_scores(
            base_scores, combined_free_text, session.pet_name, session.pet_category
        )
        if adjustments:
            llm_model = "claude-3-5-haiku-latest + claude-sonnet-4-20250514"
            for axis in final_scores:
                final_scores[axis] = max(
                    -1.0, min(1.0, final_scores[axis] + adjustments.get(axis, 0.0))
                )

    # 5. 유형 코드 결정
    type_code = determine_type_code(final_scores)

    # 6. PetType 조회
    pt_result = await db.execute(
        select(PetType).where(
            PetType.type_code == type_code,
            PetType.pet_category == session.pet_category,
        )
    )
    pet_type = pt_result.scalar_one_or_none()
    character_name = pet_type.character_name if pet_type else type_code
    character_emoji = pet_type.character_emoji if pet_type else ""

    # 7. 응답 요약 생성
    response_summary_parts = []
    question_map = {str(q.id): q for q in questions}
    for resp in responses:
        q = question_map.get(str(resp.question_id))
        if not q:
            continue
        if resp.choice_id and q.choices:
            for c in q.choices:
                if c.get("id") == resp.choice_id:
                    response_summary_parts.append(f"Q: {q.question_text} -> {c.get('text', '')}")
                    break
        elif resp.free_text:
            response_summary_parts.append(f"Q: {q.question_text} -> {resp.free_text}")
    response_summary = "\n".join(response_summary_parts)

    # 8. 결과 텍스트 생성
    result_text = await generate_result_text(
        type_code, character_name, session.pet_name, final_scores, response_summary
    )

    # 9. share_token 생성 및 Diagnosis 저장
    share_token = nanoid(size=12)

    diagnosis = Diagnosis(
        session_id=session_id,
        pet_type_id=pet_type.id if pet_type else None,
        type_code=type_code,
        axis_scores=final_scores,
        ai_description=result_text["description"],
        ai_compatibility=result_text["compatibility"],
        share_token=share_token,
        llm_model_used=llm_model,
    )
    db.add(diagnosis)

    # 세션 상태 업데이트
    session.status = "completed"
    session.completed_at = datetime.now(timezone.utc)

    await db.flush()

    return DiagnosisResult(
        type_code=type_code,
        character_name=character_name,
        character_emoji=character_emoji,
        axis_scores=AxisScores(**final_scores),
        ai_description=result_text["description"],
        ai_compatibility=result_text["compatibility"],
        share_token=share_token,
    )
