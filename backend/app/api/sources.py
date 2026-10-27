from typing import List
from fastapi import APIRouter, Depends
from app.database import get_db
from app.schemas.legal_aid import LegalSourceResponse

router = APIRouter(prefix="/sources", tags=["Verified Sources"])

@router.get("", response_model=List[LegalSourceResponse])
def get_verified_sources(db = Depends(get_db)):
    """Retrieve verified statutory sources from MongoDB."""
    cursor = db.legal_sources.find({}, {"_id": 0})
    return list(cursor)
