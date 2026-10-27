from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.database import AuditEvent
from app.schemas.documents import DocumentAnalysisResponse
from app.services.doc_parser import DocumentParserService
from app.services.ai_service import AIService

router = APIRouter(prefix="/documents", tags=["Document Simplifier"])

SAMPLE_RENTAL_AGREEMENT = """RESIDENTIAL LEAVE AND LICENSE AGREEMENT

This Agreement is made on 1st day of November 2026 at New Delhi, India.

BETWEEN:
Mr. Rajesh Kumar Sharma, residing at Flat 402, Lotus Court, Saket, New Delhi (hereinafter referred to as the "LICENSOR / LANDLORD")
AND
Ms. Ananya Sen, residing at C-12, Green Park, New Delhi (hereinafter referred to as the "LICENSEE / TENANT").

WHEREAS the Licensor is the absolute owner of Flat No. 301, Tower B, Palm Residency, Sector 62, Noida, Uttar Pradesh (hereinafter referred to as the "SCHEDULED PREMISES").

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. GRANT OF LICENSE:
The Licensor hereby grants to the Licensee permissible license to occupy the Scheduled Premises purely for residential purposes for a fixed term of 11 (eleven) months commencing from 1st November 2026 and expiring on 30th September 2027.

2. MONTHLY COMPENSATION (RENT):
The Licensee shall pay a monthly license fee of Rs. 24,000/- (Rupees Twenty Four Thousand only) payable in advance on or before the 5th day of each English calendar month directly into the Licensor's bank account. A delayed payment penalty of Rs. 200 per day shall apply after the 10th of the month.

3. SECURITY DEPOSIT:
The Licensee has deposited a sum of Rs. 60,000/- (Rupees Sixty Thousand only) as interest-free refundable security deposit. The said deposit shall be refunded upon vacant handover of physical possession of the premises after deducting arrears of electricity, water bills, or damages beyond normal wear and tear.

4. NOTICE PERIOD & TERMINATION:
Either party may terminate this agreement prior to the expiration of the term by serving one (1) month prior written notice to the other party, or by paying one month's rent in lieu of notice.

5. RESTRICTIONS & MAINTENANCE:
The Licensee shall not sublet, assign, or part with possession of the premises to any third party. The Licensee shall keep the premises clean and bear minor repairs up to Rs. 1,000/-. Major structural repairs shall be borne by the Licensor.

6. INSPECTION & RIGHT OF ENTRY:
The Licensor or his authorized agent shall have the right to inspect the premises at reasonable times during daylight hours with reasonable notice to the Licensee.

7. GOVERNING LAW & JURISDICTION:
This agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent civil courts at Gautam Buddha Nagar / Delhi.

IN WITNESS WHEREOF, the parties have signed this Agreement on the day and year first above written.
"""

@router.post("/analyze", response_model=DocumentAnalysisResponse)
async def analyze_document(
    file: UploadFile = File(...),
    language: str = Form("en"),
    is_demo: bool = Form(False),
    db: Session = Depends(get_db)
):
    try:
        # Extract text securely
        extracted = await DocumentParserService.extract_text(file)
        
        # Simplify document
        response = await AIService.simplify_document(
            extracted_text=extracted["raw_text"],
            filename=extracted["filename"],
            language=language,
            is_demo=is_demo
        )

        # Anonymous audit metric
        audit = AuditEvent(
            event_type="doc_simplified",
            category="document",
            is_demo=is_demo
        )
        db.add(audit)
        db.commit()

        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during document processing: {str(e)}"
        )

@router.get("/sample-text")
def get_sample_document():
    return {
        "title": "Sample Residential Tenancy Agreement (11 Months)",
        "content": SAMPLE_RENTAL_AGREEMENT,
        "format": "text/plain"
    }
