from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, Field


class SessionCreate(BaseModel):
    pet_category: str = Field(..., pattern="^(dog|cat)$")
    pet_name: str = Field(..., min_length=1, max_length=50)
    pet_breed: str | None = Field(None, max_length=50)


class SessionResponse(BaseModel):
    id: UUID
    pet_category: str
    pet_name: str
    pet_breed: str | None = None
    status: str
    started_at: datetime
    completed_at: datetime | None = None

    model_config = {"from_attributes": True}
