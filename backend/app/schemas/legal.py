from typing import List, Optional
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant'")
    content: str = Field(..., description="Message text")

class LegalAskRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=2000, description="The legal question from user")
    language: str = Field("en", description="'en' for English, 'hi' for Hindi")
    category: Optional[str] = Field("General", description="Category of legal query")
    conversation_history: Optional[List[ChatMessage]] = Field(default_factory=list, description="Previous messages in session")
    is_demo: bool = Field(False, description="Whether to trigger pre-reviewed demo scenario")

class LegalSourceRef(BaseModel):
    title: str
    issuing_authority: str
    official_url: str
    relevant_excerpt: str
    verified_date: str

class LegalAskResponse(BaseModel):
    short_answer: str
    explanation_simple: str
    legal_context: str
    practical_steps: List[str]
    official_sources: List[LegalSourceRef]
    when_to_seek_lawyer: str
    clarification_questions: Optional[List[str]] = None
    is_demo_fallback: bool = False
    disclaimer: str = (
        "Disclaimer: NyayaAI provides legal awareness and informational assistance only. "
        "It is not a substitute for formal legal advice from an advocate or attorney registered with the Bar Council of India."
    )
