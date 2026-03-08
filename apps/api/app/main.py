from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import diagnoses, questions, sessions
from app.config import settings

app = FastAPI(
    title="Tail Psychology API",
    version="0.1.0",
    docs_url="/api/v1/docs",
    openapi_url="/api/v1/openapi.json",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sessions.router)
app.include_router(questions.router)
app.include_router(diagnoses.router)


@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok", "environment": settings.ENVIRONMENT}
