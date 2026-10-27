from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.database import LegalSource
from app.schemas.legal_aid import LegalSourceResponse

router = APIRouter(prefix="/sources", tags=["Verified Sources"])

@router.get("", response_model=List[LegalSourceResponse])
def get_verified_sources(db: Session = Depends(get_db)):
    return db.query(LegalSource).all()
