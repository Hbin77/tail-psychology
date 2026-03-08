from uuid import UUID

from pydantic import BaseModel


class ResponseSubmit(BaseModel):
    question_id: UUID
    choice_id: str | None = None
    free_text: str | None = None


class ResponseBatch(BaseModel):
    responses: list[ResponseSubmit]
