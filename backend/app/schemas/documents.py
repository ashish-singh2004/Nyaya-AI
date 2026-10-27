from typing import List, Optional
from pydantic import BaseModel, Field

class ClauseItem(BaseModel):
    title: str
    summary: str
    exact_quote: str
    page_or_section: Optional[str] = None

class ObligationItem(BaseModel):
    party: str # e.g. "Tenant / Licensee", "Landlord / Licensor", "Employer", "Employee"
    duty_description: str
    conditions_or_penalty: Optional[str] = None

class DateAmountItem(BaseModel):
    item_type: str # "Security Deposit", "Monthly Rent", "Notice Period", "Lock-in Period", "Effective Date"
    value: str
    description: str
    original_context: Optional[str] = None

class ConcernItem(BaseModel):
    level: str # "High", "Medium", "Attention"
    clause_reference: str
    issue_description: str
    reason_for_caution: str

class DocumentAnalysisResponse(BaseModel):
    document_overview: str
    plain_summary: str
    important_clauses: List[ClauseItem]
    obligations: List[ObligationItem]
    dates_and_amounts: List[DateAmountItem]
    potential_concerns: List[ConcernItem]
    questions_to_ask_lawyer: List[str]
    original_filename: str
    extracted_char_count: int
    is_demo: bool = False
    disclaimer: str = (
        "Notice: This document analysis is generated for educational comprehension only. "
        "It highlights key provisions and potential points for inquiry, but does not constitute formal legal drafting, validation, or enforceable legal opinion."
    )
