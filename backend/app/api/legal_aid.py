from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.database import LegalAidResource
from app.schemas.legal_aid import LegalAidResponse

router = APIRouter(prefix="/legal-aid", tags=["Find Legal Aid"])

@router.get("", response_model=List[LegalAidResponse])
def get_all_legal_aid(
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return db.query(LegalAidResource).limit(limit).all()

@router.get("/search", response_model=List[LegalAidResponse])
def search_legal_aid(
    state: Optional[str] = Query(None, description="State name (e.g. Delhi, Maharashtra, Karnataka)"),
    category: Optional[str] = Query(None, description="Authority category (SLSA, DLSA, NALSA, Tele-Law)"),
    query: Optional[str] = Query(None, description="Keyword search"),
    db: Session = Depends(get_db)
):
    q = db.query(LegalAidResource)

    if state and state.lower() != "all" and state.lower() != "all india":
        q = q.filter(
            or_(
                LegalAidResource.state.ilike(f"%{state.strip()}%"),
                LegalAidResource.state == "All India"
            )
        )

    if category and category.lower() != "all":
        q = q.filter(LegalAidResource.category.ilike(f"%{category.strip()}%"))

    if query and query.strip():
        term = f"%{query.strip()}%"
        q = q.filter(
            or_(
                LegalAidResource.organization_name.ilike(term),
                LegalAidResource.service_description.ilike(term),
                LegalAidResource.district.ilike(term),
                LegalAidResource.official_address.ilike(term)
            )
        )

    return q.all()
