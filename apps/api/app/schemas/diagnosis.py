from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AxisScores(BaseModel):
    energy: float
    social: float
    sensitivity: float
    curiosity: float


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
