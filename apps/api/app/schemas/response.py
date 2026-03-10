from uuid import UUID

from pydantic import BaseModel, Field


class ResponseSubmit(BaseModel):
    question_id: UUID
    choice_id: str | None = Field(default=None, max_length=50)
    free_text: str | None = Field(default=None, max_length=2000)


class ResponseBatch(BaseModel):
    responses: list[ResponseSubmit] = Field(..., max_length=50)
