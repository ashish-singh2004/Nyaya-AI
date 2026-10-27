import pytest
import io
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_sample_document_endpoint():
    response = client.get("/api/documents/sample-text")
    assert response.status_code == 200
    data = response.json()
    assert "content" in data
    assert "RESIDENTIAL LEAVE AND LICENSE AGREEMENT" in data["content"]

def test_analyze_valid_txt_document():
    sample_text = (
        "RESIDENTIAL LEASE AGREEMENT\n"
        "This agreement is made between Mr. Sharma (Landlord) and Ms. Sen (Tenant).\n"
        "1. Term: 11 months from November 2026.\n"
        "2. Rent: Rs. 24,000 per month.\n"
        "3. Security Deposit: Rs. 60,000 refundable.\n"
        "4. Notice Period: 1 month prior written notice by either party.\n"
        "Signed at New Delhi."
    )
    file_bytes = io.BytesIO(sample_text.encode("utf-8"))
    response = client.post(
        "/api/documents/analyze",
        files={"file": ("rental_agreement.txt", file_bytes, "text/plain")},
        data={"language": "en", "is_demo": "true"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "document_overview" in data
    assert "plain_summary" in data
    assert len(data["important_clauses"]) > 0
    assert len(data["dates_and_amounts"]) > 0
    assert len(data["questions_to_ask_lawyer"]) > 0

def test_analyze_empty_document_rejection():
    file_bytes = io.BytesIO(b"")
    response = client.post(
        "/api/documents/analyze",
        files={"file": ("empty.txt", file_bytes, "text/plain")}
    )
    assert response.status_code == 400

def test_unsupported_file_extension():
    file_bytes = io.BytesIO(b"some binary code")
    response = client.post(
        "/api/documents/analyze",
        files={"file": ("malicious.exe", file_bytes, "application/octet-stream")}
    )
    assert response.status_code == 400
    assert "Unsupported file format" in response.json()["detail"]
