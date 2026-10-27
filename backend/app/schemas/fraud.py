from typing import List, Optional
from pydantic import BaseModel, Field

class FraudPatternDetected(BaseModel):
    pattern_name: str
    severity: str # "High", "Medium", "Low"
    evidence_found: str
    explanation: str

class FraudCheckRequest(BaseModel):
    message_text: str = Field(..., min_length=5, max_length=5000, description="Pasted SMS, email, or chat text")
    message_type: Optional[str] = Field("sms", description="sms, email, payment_link, job_offer, govt_claim")
    language: Optional[str] = Field("en", description="en or hi")
    is_demo: bool = Field(False, description="Flag for demo scenario")

class FraudCheckResponse(BaseModel):
    risk_level: str # "High Risk", "Medium Risk", "Low Risk"
    risk_score: int # 0 to 100
    has_sensitive_credential_warning: bool = False
    credential_warning_details: Optional[str] = None
    detected_patterns: List[FraudPatternDetected]
    safe_next_steps: List[str]
    official_helplines: List[dict]
    sanitized_preview: str
    is_demo: bool = False
    disclaimer: str = (
        "Important: Risk ratings are heuristic and AI-assisted educational assessments. "
        "A low score is not a guarantee of legitimacy. Never share OTPs, UPI PINs, passwords, or net-banking credentials."
    )
