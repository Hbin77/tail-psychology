from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.question import Question

router = APIRouter(prefix="/api/v1/questions", tags=["questions"])


@router.get("/{pet_category}")
async def get_questions(pet_category: str, db: AsyncSession = Depends(get_db)):
    if pet_category not in ("dog", "cat"):
        raise HTTPException(status_code=400, detail="pet_category must be 'dog' or 'cat'")

    result = await db.execute(
        select(Question)
        .where(Question.pet_category == pet_category, Question.is_active.is_(True))
        .order_by(Question.order_index)
    )
    questions = result.scalars().all()

    return [
        {
            "id": str(q.id),
            "question_text": q.question_text,
            "question_type": q.question_type,
            "axis": q.axis,
            "choices": q.choices,
            "order_index": q.order_index,
        }
        for q in questions
    ]
