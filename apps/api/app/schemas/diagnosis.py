from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AxisScores(BaseModel):
    extraversion: float = 0.0
    amicability: float = 0.0
    neuroticism: float = 0.0
    trainability: float = 0.0
    dominance: float = 0.0


class DiagnosisResult(BaseModel):
    type_code: str
    character_name: str
    character_emoji: str
    axis_scores: AxisScores
    ai_description: str
    ai_compatibility: str
    share_token: str


class DiagnosisResponse(BaseModel):
    id: UUID
    session_id: UUID
    type_code: str
    axis_scores: dict
    ai_description: str
    ai_compatibility: str
    share_token: str
    llm_model_used: str
    created_at: datetime
    pet_type: dict | None = None

    model_config = {"from_attributes": True}
