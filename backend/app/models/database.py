from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.orm import declarative_base
from datetime import datetime, timezone

Base = declarative_base()

def get_utc_now():
    return datetime.now(timezone.utc)

class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    name_hi = Column(String(255), nullable=True)
    issuing_department = Column(String(255), nullable=False)
    issuing_department_hi = Column(String(255), nullable=True)
    description = Column(Text, nullable=False)
    description_hi = Column(Text, nullable=True)
    beneficiary_category = Column(String(100), nullable=False, index=True)
    eligibility_summary = Column(Text, nullable=False)
    eligibility_summary_hi = Column(Text, nullable=True)
    benefits_summary = Column(Text, nullable=False)
    benefits_summary_hi = Column(Text, nullable=True)
    required_documents = Column(Text, nullable=True)
    application_url = Column(String(500), nullable=False)
    official_source_url = Column(String(500), nullable=False)
    state_ut = Column(String(100), default="All India", index=True)
    min_age = Column(Integer, nullable=True)
    max_age = Column(Integer, nullable=True)
    last_verified_at = Column(String(50), nullable=False)


class LegalAidResource(Base):
    __tablename__ = "legal_aid_resources"

    id = Column(Integer, primary_key=True, index=True)
    organization_name = Column(String(255), nullable=False)
    organization_name_hi = Column(String(255), nullable=True)
    jurisdiction_level = Column(String(50), default="National")
    state = Column(String(100), nullable=False, index=True)
    district = Column(String(100), nullable=True, index=True)
    category = Column(String(100), default="Legal Services Authority")
    service_description = Column(Text, nullable=False)
    service_description_hi = Column(Text, nullable=True)
    official_phone = Column(String(100), nullable=False)
    official_address = Column(Text, nullable=False)
    official_url = Column(String(500), nullable=False)
    eligibility_info = Column(Text, nullable=True)
    last_verified_at = Column(String(50), nullable=False)


class LegalSource(Base):
    __tablename__ = "legal_sources"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    issuing_authority = Column(String(255), nullable=False)
    source_url = Column(String(500), nullable=False)
    source_type = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    publication_date = Column(String(50), nullable=True)
    last_verified_at = Column(String(50), nullable=False)


class AuditEvent(Base):
    __tablename__ = "audit_events"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(100), nullable=False, index=True)
    timestamp = Column(DateTime, default=get_utc_now)
    category = Column(String(100), nullable=True)
    is_demo = Column(Boolean, default=False)
