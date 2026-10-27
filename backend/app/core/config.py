import os
from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "NyayaAI Backend"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # AI / LLM Configuration (Google Gemini)
    GEMINI_API_KEY: Optional[str] = None
    GOOGLE_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-flash-lite-latest"
    
    # Legacy / Alternative AI fallback
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o-mini"
    
    # Database Configuration (MongoDB Primary)
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_DB_NAME: str = "nyayaai"
    DATABASE_URL: Optional[str] = "mongodb://localhost:27017/nyayaai"
    
    # Security & Limits
    MAX_UPLOAD_MB: int = 15
    ALLOWED_EXTENSIONS: List[str] = [".pdf", ".docx", ".txt"]
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]
    
    # Demo & Offline Support
    DEMO_MODE_DEFAULT: bool = True
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
