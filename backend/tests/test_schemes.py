import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_all_schemes():
    response = client.get("/api/schemes")
    assert response.status_code == 200
    schemes = response.json()
    assert len(schemes) >= 5
    # Verify PM-KISAN exists
    assert any("PM-KISAN" in s["name"] or "Kisan" in s["name"] for s in schemes)

def test_search_schemes_by_category():
    response = client.get("/api/schemes/search?category=farmer")
    assert response.status_code == 200
    schemes = response.json()
    assert len(schemes) > 0
    assert all("farmer" in s["beneficiary_category"].lower() for s in schemes)

def test_search_schemes_by_keyword():
    response = client.get("/api/schemes/search?query=Awas")
    assert response.status_code == 200
    schemes = response.json()
    assert len(schemes) > 0
    assert any("Awas" in s["name"] for s in schemes)

def test_get_legal_aid_resources():
    response = client.get("/api/legal-aid")
    assert response.status_code == 200
    resources = response.json()
    assert len(resources) >= 4
    # Check NALSA
    assert any("NALSA" in r["organization_name"] or "National" in r["organization_name"] for r in resources)

def test_search_legal_aid_by_state():
    response = client.get("/api/legal-aid/search?state=Delhi")
    assert response.status_code == 200
    resources = response.json()
    assert len(resources) > 0
    assert all(r["state"] in ["Delhi", "All India"] for r in resources)

def test_get_sources_catalogue():
    response = client.get("/api/sources")
    assert response.status_code == 200
    sources = response.json()
    assert len(sources) >= 4
    assert any("India Code" in s["title"] for s in sources)
