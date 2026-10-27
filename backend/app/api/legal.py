from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.legal import LegalAskRequest, LegalAskResponse
from app.services.ai_service import AIService

router = APIRouter(prefix="/legal", tags=["Legal Assistant"])

@router.post("/ask", response_model=LegalAskResponse)
async def ask_legal_question(
    payload: LegalAskRequest,
    db = Depends(get_db)
):
    try:
        response = await AIService.answer_legal_question(
            question=payload.question,
            language=payload.language,
            category=payload.category,
            conversation_history=payload.conversation_history,
            is_demo=payload.is_demo
        )
        
        # Log minimal anonymous audit metric (NO user text or PII) into MongoDB
        try:
            db.audit_events.insert_one({
                "event_type": "legal_query_processed",
                "category": payload.category,
                "is_demo": payload.is_demo,
                "timestamp": datetime.now(timezone.utc).isoformat()
            })
        except Exception:
            pass

        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your legal information request: {str(e)}"
        )
