import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_ask_legal_question_success():
    payload = {
        "question": "What is the typical notice period for terminating a rental agreement?",
        "language": "en",
        "category": "Rental and housing"
    }
    response = client.post("/api/legal/ask", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "short_answer" in data
    assert "explanation_simple" in data
    assert "legal_context" in data
    assert "official_sources" in data
    assert len(data["official_sources"]) > 0
    # Verify no fabricated source: title must include recognized statute
    assert any("Tenancy" in s["title"] or "Property" in s["title"] or "Constitution" in s["title"] for s in data["official_sources"])

def test_ask_legal_question_short_validation_error():
    # Question with < 3 characters should fail validation
    payload = {
        "question": "hi",
        "language": "en"
    }
    response = client.post("/api/legal/ask", json=payload)
    assert response.status_code == 422

def test_ask_legal_hindi():
    payload = {
        "question": "किराया समझौता कैसे समाप्त करें?",
        "language": "hi",
        "category": "Rental and housing"
    }
    response = client.post("/api/legal/ask", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "short_answer" in data

def test_ask_legal_with_conversation_history():
    payload = {
        "question": "Does this also apply if there is no written contract?",
        "language": "en",
        "category": "Rental and housing",
        "conversation_history": [
            {"role": "user", "content": "What is the notice period for tenant eviction?"},
            {"role": "assistant", "content": "Notice period is typically 1-2 months under Model Tenancy Act."}
        ]
    }
    response = client.post("/api/legal/ask", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "short_answer" in data

def test_gemini_configuration_methods():
    from app.services.ai_service import AIService
    # Test key detection logic
    key = AIService.get_gemini_key()
    # It returns None when not configured, or a valid string when configured
    assert key is None or isinstance(key, str)
