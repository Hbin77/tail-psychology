import time
from collections import defaultdict

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api import diagnoses, questions, sessions
from app.config import settings

app = FastAPI(
    title="Tail Psychology API",
    version="0.1.0",
    docs_url="/api/v1/docs" if settings.ENVIRONMENT == "dev" else None,
    openapi_url="/api/v1/openapi.json" if settings.ENVIRONMENT == "dev" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

# Simple in-memory rate limiting: 60 requests per minute per IP
_rate_limit_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 60
RATE_WINDOW = 60  # seconds
_RATE_LIMIT_MAX_STORE = 10000
_rate_limit_last_cleanup = 0.0


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    global _rate_limit_last_cleanup
    client_ip = request.client.host if request.client else "unknown"
    now = time.time()

    # Periodic cleanup of expired entries (every RATE_WINDOW seconds)
    if now - _rate_limit_last_cleanup > RATE_WINDOW:
        _rate_limit_last_cleanup = now
        expired_keys = [
            ip for ip, ts in _rate_limit_store.items()
            if not ts or now - ts[-1] >= RATE_WINDOW
        ]
        for ip in expired_keys:
            del _rate_limit_store[ip]

    # Cap store size to prevent memory exhaustion
    if len(_rate_limit_store) >= _RATE_LIMIT_MAX_STORE and client_ip not in _rate_limit_store:
        return JSONResponse(status_code=429, content={"detail": "Too many requests"})

    timestamps = _rate_limit_store[client_ip]
    # Remove expired entries for this IP
    _rate_limit_store[client_ip] = [t for t in timestamps if now - t < RATE_WINDOW]
    if len(_rate_limit_store[client_ip]) >= RATE_LIMIT:
        return JSONResponse(status_code=429, content={"detail": "Too many requests"})
    _rate_limit_store[client_ip].append(now)
    return await call_next(request)


app.include_router(sessions.router)
app.include_router(questions.router)
app.include_router(diagnoses.router)


@app.get("/api/v1/health")
async def health_check():
    return {"status": "ok"}
