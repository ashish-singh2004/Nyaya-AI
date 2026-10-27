from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.database import get_db
from app.models.database import Scheme
from app.schemas.schemes import SchemeResponse

router = APIRouter(prefix="/schemes", tags=["Government Schemes"])

@router.get("", response_model=List[SchemeResponse])
def get_all_schemes(
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db)
):
    return db.query(Scheme).limit(limit).all()

@router.get("/search", response_model=List[SchemeResponse])
def search_schemes(
    query: Optional[str] = Query(None, description="Keyword search in scheme title or description"),
    category: Optional[str] = Query(None, description="Beneficiary category (farmer, student, women, worker, small_business, general)"),
    state_ut: Optional[str] = Query(None, description="State or Union Territory"),
    db: Session = Depends(get_db)
):
    q = db.query(Scheme)

    if category and category.lower() != "all":
        q = q.filter(Scheme.beneficiary_category.ilike(f"%{category.strip()}%"))

    if state_ut and state_ut.lower() != "all india" and state_ut.lower() != "all":
        q = q.filter(
            or_(
                Scheme.state_ut.ilike(f"%{state_ut.strip()}%"),
                Scheme.state_ut == "All India"
            )
        )

    if query and query.strip():
        term = f"%{query.strip()}%"
        q = q.filter(
            or_(
                Scheme.name.ilike(term),
                Scheme.name_hi.ilike(term),
                Scheme.description.ilike(term),
                Scheme.issuing_department.ilike(term),
                Scheme.eligibility_summary.ilike(term),
                Scheme.benefits_summary.ilike(term)
            )
        )

    return q.all()
