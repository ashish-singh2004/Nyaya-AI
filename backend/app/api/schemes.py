from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from app.database import get_db
from app.schemas.schemes import SchemeResponse

router = APIRouter(prefix="/schemes", tags=["Government Schemes"])

@router.get("", response_model=List[SchemeResponse])
def get_all_schemes(
    limit: int = Query(50, ge=1, le=100),
    db = Depends(get_db)
):
    """Retrieve verified government schemes from MongoDB."""
    cursor = db.schemes.find({}, {"_id": 0}).limit(limit)
    return list(cursor)

@router.get("/search", response_model=List[SchemeResponse])
def search_schemes(
    query: Optional[str] = Query(None, description="Keyword search in scheme title or description"),
    category: Optional[str] = Query(None, description="Beneficiary category (farmer, student, women, worker, small_business, general)"),
    state_ut: Optional[str] = Query(None, description="State or Union Territory"),
    db = Depends(get_db)
):
    """Search and filter government schemes in MongoDB."""
    conditions = []

    if category and category.lower() != "all":
        conditions.append({
            "beneficiary_category": {"$regex": category.strip(), "$options": "i"}
        })

    if state_ut and state_ut.lower() not in ["all", "all india"]:
        conditions.append({
            "$or": [
                {"state_ut": {"$regex": state_ut.strip(), "$options": "i"}},
                {"state_ut": "All India"}
            ]
        })

    if query and query.strip():
        term = query.strip()
        regex_val = {"$regex": term, "$options": "i"}
        conditions.append({
            "$or": [
                {"name": regex_val},
                {"name_hi": regex_val},
                {"description": regex_val},
                {"issuing_department": regex_val},
                {"eligibility_summary": regex_val},
                {"benefits_summary": regex_val}
            ]
        })

    if conditions:
        filter_query = {"$and": conditions} if len(conditions) > 1 else conditions[0]
    else:
        filter_query = {}

    cursor = db.schemes.find(filter_query, {"_id": 0})
    return list(cursor)
