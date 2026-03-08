import uuid

from sqlalchemy import String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class PetType(Base):
    __tablename__ = "pet_types"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    pet_category: Mapped[str] = mapped_column(String(10), nullable=False)
    type_code: Mapped[str] = mapped_column(String(4), nullable=False)
    character_name: Mapped[str] = mapped_column(String(50), nullable=False)
    character_emoji: Mapped[str] = mapped_column(String(10), nullable=False)
    base_description: Mapped[str] = mapped_column(Text, nullable=False)
    compatible_types: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
