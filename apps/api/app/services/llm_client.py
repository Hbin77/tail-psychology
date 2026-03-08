import json
import logging

import anthropic

from app.config import settings

logger = logging.getLogger(__name__)

client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)


async def adjust_scores(
    base_scores: dict[str, float],
    free_text: str,
    pet_name: str,
    pet_category: str,
) -> dict[str, float] | None:
    """Claude Haiku로 자유입력을 분석하여 축별 보정값(-0.2 ~ +0.2)을 반환한다."""
    if not free_text or not free_text.strip():
        return None

    prompt = f"""당신은 반려동물 성격 진단 전문가입니다.
반려동물 정보:
- 이름: {pet_name}
- 종류: {"강아지" if pet_category == "dog" else "고양이"}

현재 축별 기본 점수 (-1 ~ +1):
- energy (활동성): {base_scores['energy']:.2f}
- social (사회성): {base_scores['social']:.2f}
- sensitivity (감수성): {base_scores['sensitivity']:.2f}
- curiosity (호기심): {base_scores['curiosity']:.2f}

보호자의 자유 서술:
\"{free_text}\"

위 자유 서술을 분석하여 각 축에 대한 보정값을 -0.2에서 +0.2 사이로 제시해주세요.
반드시 아래 JSON 형식으로만 응답하세요:
{{"energy": 0.0, "social": 0.0, "sensitivity": 0.0, "curiosity": 0.0}}"""

    try:
        response = await client.messages.create(
            model="claude-3-5-haiku-latest",
            max_tokens=200,
            messages=[{"role": "user", "content": prompt}],
        )
        text = response.content[0].text.strip()
        # JSON 파싱
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()
        adjustments = json.loads(text)
        # 보정값 범위 제한
        for axis in ["energy", "social", "sensitivity", "curiosity"]:
            val = float(adjustments.get(axis, 0.0))
            adjustments[axis] = max(-0.2, min(0.2, val))
        return adjustments
    except Exception as e:
        logger.error(f"LLM adjust_scores failed: {e}")
        return None


async def generate_result_text(
    type_code: str,
    character_name: str,
    pet_name: str,
    axis_scores: dict[str, float],
    response_summary: str,
) -> dict[str, str]:
    """Claude Sonnet으로 맞춤 설명과 궁합 텍스트를 생성한다."""
    prompt = f"""당신은 반려동물 성격 진단 결과를 재미있고 따뜻하게 설명하는 전문가입니다.

반려동물 정보:
- 이름: {pet_name}
- 유형 코드: {type_code}
- 캐릭터 이름: {character_name}

축별 점수 (-1 ~ +1):
- energy (활동성): {axis_scores['energy']:.2f}
- social (사회성): {axis_scores['social']:.2f}
- sensitivity (감수성): {axis_scores['sensitivity']:.2f}
- curiosity (호기심): {axis_scores['curiosity']:.2f}

응답 요약:
{response_summary}

다음 두 가지를 작성해주세요:
1. description: {pet_name}의 성격을 3-4문단으로 따뜻하고 재미있게 설명 (마크다운 사용 가능)
2. compatibility: 이 유형과 잘 맞는 보호자 유형, 함께하면 좋은 활동 등을 2-3문단으로 설명

반드시 아래 JSON 형식으로만 응답하세요:
{{"description": "...", "compatibility": "..."}}"""

    try:
        response = await client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1500,
            messages=[{"role": "user", "content": prompt}],
        )
        text = response.content[0].text.strip()
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
            text = text.strip()
        result = json.loads(text)
        return {
            "description": result.get("description", ""),
            "compatibility": result.get("compatibility", ""),
        }
    except Exception as e:
        logger.error(f"LLM generate_result_text failed: {e}")
        return {
            "description": f"{pet_name}은(는) {character_name} 유형입니다.",
            "compatibility": "다양한 보호자와 잘 어울립니다.",
        }
