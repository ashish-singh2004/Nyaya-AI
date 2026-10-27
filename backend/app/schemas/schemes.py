from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class SchemeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    name_hi: Optional[str] = None
    issuing_department: str
    issuing_department_hi: Optional[str] = None
    description: str
    description_hi: Optional[str] = None
    beneficiary_category: str
    eligibility_summary: str
    eligibility_summary_hi: Optional[str] = None
    benefits_summary: str
    benefits_summary_hi: Optional[str] = None
    required_documents: Optional[str] = None
    application_url: str
    official_source_url: str
    state_ut: str
    min_age: Optional[int] = None
    max_age: Optional[int] = None
    last_verified_at: str
