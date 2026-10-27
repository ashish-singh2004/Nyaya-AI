from typing import Optional
from pydantic import BaseModel, ConfigDict

class LegalAidResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    organization_name: str
    organization_name_hi: Optional[str] = None
    jurisdiction_level: str
    state: str
    district: Optional[str] = None
    category: str
    service_description: str
    service_description_hi: Optional[str] = None
    official_phone: str
    official_address: str
    official_url: str
    eligibility_info: Optional[str] = None
    last_verified_at: str

class LegalSourceResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    issuing_authority: str
    source_url: str
    source_type: str
    description: str
    publication_date: Optional[str] = None
    last_verified_at: str
