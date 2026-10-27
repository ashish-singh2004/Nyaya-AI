import logging
from datetime import datetime, timezone
from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database import init_db, get_db, is_db_connected
from app.services.ai_service import AIService

from app.api.legal import router as legal_router
from app.api.documents import router as documents_router
from app.api.schemes import router as schemes_router
from app.api.fraud import router as fraud_router
from app.api.legal_aid import router as legal_aid_router
from app.api.sources import router as sources_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("nyayaai")

# Lifespan context manager for startup and shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing NyayaAI database and seeding verified datasets...")
    try:
        init_db()
        logger.info("Database initialized and verified records seeded.")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
    yield
    logger.info("NyayaAI backend shutdown.")

# Ensure DB is created upon module import as well for tests
init_db()

app = FastAPI(
    title="NyayaAI API",
    description="Backend API for NyayaAI — AI-Powered Legal Awareness & Citizen Assistance Platform for India",
    version=settings.VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(legal_router, prefix=settings.API_PREFIX)
app.include_router(documents_router, prefix=settings.API_PREFIX)
app.include_router(schemes_router, prefix=settings.API_PREFIX)
app.include_router(fraud_router, prefix=settings.API_PREFIX)
app.include_router(legal_aid_router, prefix=settings.API_PREFIX)
app.include_router(sources_router, prefix=settings.API_PREFIX)

@app.get(f"{settings.API_PREFIX}/health", tags=["Health"])
def health_check(db = Depends(get_db)):
    db_connected = is_db_connected()
    return {
        "status": "healthy" if db_connected else "degraded",
        "service": "NyayaAI Backend",
        "version": settings.VERSION,
        "database_type": "MongoDB",
        "ai_service_configured": AIService.is_ai_configured(),
        "database_connected": db_connected,
        "demo_mode_enabled": settings.DEMO_MODE_DEFAULT,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/", tags=["Root"])
def root():
    return {
        "app": "NyayaAI",
        "tagline": "Know Your Rights. Understand the Law. Make Informed Decisions.",
        "documentation": "/docs",
        "health": f"{settings.API_PREFIX}/health"
    }
