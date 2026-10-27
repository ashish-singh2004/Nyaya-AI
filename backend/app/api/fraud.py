from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException
from app.database import get_db
from app.schemas.fraud import FraudCheckRequest, FraudCheckResponse
from app.services.fraud_analyzer import FraudAnalyzerService

router = APIRouter(prefix="/fraud", tags=["Fraud Awareness"])

PRELOADED_SAMPLES = [
    {
        "id": "sample-electricity",
        "title": "Urgent Electricity Disconnection SMS",
        "type": "sms",
        "text": "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electric office because your previous month bill was not updated. Please immediately contact our Electricity Officer Mr. Verma at 98765-XXXXX or download update bill app from http://bijli-bill-update.online/app.apk to avoid power cut."
    },
    {
        "id": "sample-job-task",
        "title": "Work-From-Home YouTube Like Task Scam",
        "type": "job_offer",
        "text": "Congratulations! You have been selected for Part-Time Online Work from Home. Earn Rs 2,500 to Rs 6,000 daily by simply liking YouTube videos and rating hotels on Google Maps. No experience required. Join our official Telegram channel https://t.me/earn_daily_task_india and pay an initial refundable security registration fee of Rs 499 to start receiving payout tasks."
    },
    {
        "id": "sample-bank-kyc",
        "title": "Bank Account KYC Suspension Warning",
        "type": "sms",
        "text": "Dear SBI customer, your YONO account has been suspended today due to pending re-KYC document verification. To reactivate your account immediately and prevent permanent blocking, please update your PAN and Aadhaar details at https://sbi-kyc-reactivate.top/login. Enter your netbanking username, password, and OTP."
    }
]

@router.post("/analyze", response_model=FraudCheckResponse)
def analyze_fraud_message(
    payload: FraudCheckRequest,
    db = Depends(get_db)
):
    try:
        response = FraudAnalyzerService.analyze_message(
            message_text=payload.message_text,
            message_type=payload.message_type or "sms",
            is_demo=payload.is_demo
        )

        try:
            db.audit_events.insert_one({
                "event_type": "fraud_checked",
                "category": payload.message_type,
                "is_demo": payload.is_demo,
                "timestamp": datetime.now(timezone.utc).isoformat()
            })
        except Exception:
            pass

        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during fraud analysis: {str(e)}"
        )

@router.get("/samples")
def get_fraud_samples():
    return PRELOADED_SAMPLES
