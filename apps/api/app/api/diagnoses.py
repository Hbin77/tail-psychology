from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.diagnosis import Diagnosis
from app.models.response import Response
from app.models.session import Session
from app.schemas.diagnosis import DiagnosisResponse, DiagnosisResult
from app.schemas.response import ResponseBatch
from app.services.diagnosis import run_diagnosis

router = APIRouter(prefix="/api/v1", tags=["diagnoses"])


@router.post("/sessions/{session_id}/responses", status_code=201)
async def submit_responses(
    session_id: UUID, body: ResponseBatch, db: AsyncSession = Depends(get_db)
):
    session = await db.get(Session, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    if session.status == "completed":
        raise HTTPException(status_code=400, detail="Session already completed")

    created = []
    for item in body.responses:
        response = Response(
            session_id=session_id,
            question_id=item.question_id,
            choice_id=item.choice_id,
            free_text=item.free_text,
        )
        db.add(response)
        created.append(response)

    await db.flush()
    return {"submitted": len(created)}


@router.post("/sessions/{session_id}/diagnose", response_model=DiagnosisResult)
async def diagnose(session_id: UUID, db: AsyncSession = Depends(get_db)):
    session = await db.get(Session, session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # 이미 진단이 있는지 확인
    existing = await db.execute(
        select(Diagnosis).where(Diagnosis.session_id == session_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Diagnosis already exists for this session")

    try:
        result = await run_diagnosis(session_id, db)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/diagnoses/{share_token}")
async def get_diagnosis_by_share_token(
    share_token: str, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Diagnosis).where(Diagnosis.share_token == share_token)
    )
    diagnosis = result.scalar_one_or_none()
    if not diagnosis:
        raise HTTPException(status_code=404, detail="Diagnosis not found")

    # 세션 정보도 함께 반환
    session = await db.get(Session, diagnosis.session_id)

    return {
        "id": str(diagnosis.id),
        "session_id": str(diagnosis.session_id),
        "type_code": diagnosis.type_code,
        "axis_scores": diagnosis.axis_scores,
        "ai_description": diagnosis.ai_description,
        "ai_compatibility": diagnosis.ai_compatibility,
        "share_token": diagnosis.share_token,
        "llm_model_used": diagnosis.llm_model_used,
        "created_at": diagnosis.created_at.isoformat(),
        "pet_name": session.pet_name if session else None,
        "pet_category": session.pet_category if session else None,
        "pet_type_id": str(diagnosis.pet_type_id) if diagnosis.pet_type_id else None,
    }
