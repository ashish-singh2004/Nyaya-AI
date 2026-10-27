import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_fraud_analyzer_high_risk_coercion():
    payload = {
        "message_text": "Electricity power will be disconnected tonight at 9:30 PM due to unpaid bill. Download bill app at http://bijli-bill.online/app.apk immediately",
        "message_type": "sms"
    }
    response = client.post("/api/fraud/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_level"] == "High Risk"
    assert data["risk_score"] >= 60
    assert len(data["detected_patterns"]) > 0
    assert any("Urgent Threat" in p["pattern_name"] or "Suspicious Link" in p["pattern_name"] for p in data["detected_patterns"])
    assert len(data["official_helplines"]) > 0

def test_fraud_analyzer_sensitive_credential_detection():
    payload = {
        "message_text": "Please share your 6-digit OTP 482910 to verify and receive Rs 5000",
        "message_type": "sms"
    }
    response = client.post("/api/fraud/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["has_sensitive_credential_warning"] is True
    assert "OTP" in data["credential_warning_details"]

def test_fraud_samples_endpoint():
    response = client.get("/api/fraud/samples")
    assert response.status_code == 200
    samples = response.json()
    assert len(samples) >= 3
    assert "sample-electricity" in [s["id"] for s in samples]
