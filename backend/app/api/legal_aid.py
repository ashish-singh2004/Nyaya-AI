from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from app.database import get_db
from app.schemas.legal_aid import LegalAidResponse

router = APIRouter(prefix="/legal-aid", tags=["Find Legal Aid"])

@router.get("", response_model=List[LegalAidResponse])
def get_all_legal_aid(
    limit: int = Query(50, ge=1, le=100),
    db = Depends(get_db)
):
    """Retrieve verified legal aid directory from MongoDB."""
    cursor = db.legal_aid_resources.find({}, {"_id": 0}).limit(limit)
    return list(cursor)

@router.get("/search", response_model=List[LegalAidResponse])
def search_legal_aid(
    state: Optional[str] = Query(None, description="State name (e.g. Delhi, Maharashtra, Karnataka)"),
    category: Optional[str] = Query(None, description="Authority category (SLSA, DLSA, NALSA, Tele-Law)"),
    query: Optional[str] = Query(None, description="Keyword search"),
    db = Depends(get_db)
):
    """Search and filter legal aid resources from MongoDB."""
    conditions = []

    if state and state.lower() not in ["all", "all india"]:
        conditions.append({
            "$or": [
                {"state": {"$regex": state.strip(), "$options": "i"}},
                {"state": "All India"}
            ]
        })

    if category and category.lower() != "all":
        conditions.append({
            "category": {"$regex": category.strip(), "$options": "i"}
        })

    if query and query.strip():
        term = query.strip()
        regex_val = {"$regex": term, "$options": "i"}
        conditions.append({
            "$or": [
                {"organization_name": regex_val},
                {"service_description": regex_val},
                {"district": regex_val},
                {"official_address": regex_val}
            ]
        })

    if conditions:
        filter_query = {"$and": conditions} if len(conditions) > 1 else conditions[0]
    else:
        filter_query = {}

    cursor = db.legal_aid_resources.find(filter_query, {"_id": 0})
    return list(cursor)
