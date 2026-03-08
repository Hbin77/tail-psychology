import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.database import Base


class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    session_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("sessions.id"), unique=True, nullable=False
    )
    pet_type_id: Mapped[uuid.UUID | None] = mapped_column(
        UUID(as_uuid=True), ForeignKey("pet_types.id"), nullable=True
    )
    type_code: Mapped[str] = mapped_column(String(4), nullable=False)
    axis_scores: Mapped[dict] = mapped_column(JSONB, nullable=False)
    ai_description: Mapped[str] = mapped_column(Text, nullable=False)
    ai_compatibility: Mapped[str] = mapped_column(Text, nullable=False)
    share_token: Mapped[str] = mapped_column(String(12), unique=True, index=True, nullable=False)
    llm_model_used: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    session = relationship("Session", back_populates="diagnosis")
    pet_type = relationship("PetType", lazy="selectin")
