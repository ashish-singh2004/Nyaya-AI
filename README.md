# NyayaAI (न्यायAI) — AI-Powered Legal Awareness & Citizen Assistance Platform

> **"Know Your Rights. Understand the Law. Make Informed Decisions."**

NyayaAI is an open-source, citizen-centric legal awareness and public empowerment web application built for India. It demystifies legal provisions, simplifies complex legal documents (such as tenancy agreements and employment contracts), catalogues verified government welfare schemes, detects potential digital fraud warning signs, and directs citizens to free statutory legal aid.

---

## 1. Social Problem & Motivation

In India, ordinary citizens encounter significant hurdles when dealing with the law and public services:
1. **Complex Legalese & Document Anxiety:** Standard contracts (rental leases, employment letters, utility terms) are packed with archaic clauses, leading people to sign agreements with unfair penalty or forfeiture conditions.
2. **Language Barriers:** Over 80% of citizens communicate primarily in Hindi or regional languages, whereas formal legal statutes and contracts are predominantly drafted in English.
3. **Hidden Free Legal Aid Rights:** Under Section 12 of the Legal Services Authorities Act, 1987, women, children, SC/ST members, industrial workmen, persons with disabilities, and low-income individuals have a statutory right to 100% free advocate representation, but few know how to reach NALSA, SLSAs, or DLSAs.
4. **Coercive Cyber Fraud:** Scammers exploit fear of legal consequences (e.g. fake electricity disconnection at 9:30 PM, fake police arrest warrants, reverse UPI scams) to siphon citizens' hard-earned savings.
5. **Welfare Scheme Fragmentation:** Deserving farmers, street vendors, and youth miss out on subsidized loans and welfare grants scattered across unlinked departmental websites.
6. **AI Hallucination Dangers:** Generic AI models often invent fake judgments or quote non-existent sections, creating severe hazards in the legal domain.

---

## 2. The NyayaAI Solution

NyayaAI bridges the justice access gap through **source-grounded AI, transparent heuristic guardrails, and bilingual plain-language translation**:

| Module | Core Capability | Grounded Primary Source |
|---|---|---|
| **Intelligent Legal Assistant** | Plain-language answers to everyday legal queries with structured next steps. | India Code, Model Tenancy Act, Consumer Protection Act, IT Act, Code on Wages |
| **Legal Document Simplifier** | Extracts clauses, obligations, financial numbers, notice periods, and red flags from PDF/DOCX/TXT files. | In-memory text extraction, statutory comparison |
| **Government Scheme Discovery** | Search and filter verified central/state welfare schemes by category, state, and income. | National Government Services Portal, PM-KISAN, AB PM-JAY, PM SVANidhi |
| **Fraud & Scam Analyzer** | Detects artificial panic, fake APK downloads, reverse-UPI traps, and redacts sensitive credentials. | Indian Cyber Crime Coordination Centre (I4C), 1930 Helpline, Chakshu |
| **Free Legal Aid Directory** | Geo-filtered lookup of NALSA, State Legal Services Authorities (SLSAs), and Tele-Law centers. | NALSA Helpline 15100, Department of Justice, Legal Services Authorities Act |

---

## 3. Technology Stack

* **Frontend:**
  * React 19 + TypeScript
  * Vite (Fast HMR & Optimized Bundling)
  * Tailwind CSS (Civic Indian brand identity: Deep Navy `#0f172a`, Saffron accents `#ea580c`, Civic Green `#15803d`)
  * Lucide React (Accessible icons)
* **Backend:**
  * Python 3.11 - 3.13
  * FastAPI (Asynchronous REST API with automatic OpenAPI Swagger docs)
  * Pydantic v2 (Strict request/response schema validation)
  * PyMongo (High-performance MongoDB driver with connection pooling)
  * MongoDB (Local database running on `mongodb://localhost:27017/nyayaai`, auto-seeded on first run)
* **Document Processing & AI:**
  * PyMuPDF (`fitz`) for PDF text layer extraction
  * `python-docx` for Word document parsing
  * Official Google GenAI SDK (`google-genai`, Model: `gemini-2.5-flash`)
  * Deterministic Verified Grounded Engine (Operates seamlessly with or without an active Gemini API key)
* **Testing:**
  * Pytest + `httpx` (20 automated backend test suites)

---

## 4. Architecture & Security Controls

```
                       ┌────────────────────────┐
                       │   Citizen / Browser    │
                       │   (React + TypeScript) │
                       └───────────┬────────────┘
                                   │ HTTP / JSON
                                   ▼
                       ┌────────────────────────┐
                       │    FastAPI Backend     │
                       │    (Uvicorn on :8000)  │
                       └─────┬──────┬─────┬─────┘
                             │      │     │
            ┌────────────────┘      │     └────────────────┐
            ▼                       ▼                      ▼
  ┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
  │  Grounded RAG &  │    │ Document Parser  │   │ Fraud Heuristic  │
  │  Statute Engine  │    │ (Ephemeral Temp) │   │ & Risk Scorer    │
  └─────────┬────────┘    └─────────┬────────┘   └─────────┬────────┘
            │                       │                      │
            ▼                       ▼                      ▼
  ┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
  │ Official Portals │    │ Clean Memory /   │   │ Credential Mask  │
  │ (India Code/DoJ/ │    │ Guaranteed Zero  │   │ & 1930 Reporting │
  │ NALSA Repository)│    │ File Persistence │   │ Action Guide     │
  └──────────────────┘    └──────────────────┘   └──────────────────┘
```

### Security & Privacy Protections
* **Zero Document Persistence:** Uploaded files are parsed within isolated temporary directories and purged immediately after analysis in Python `finally` blocks.
* **Credential Redaction:** If a citizen pastes an OTP, UPI PIN, or netbanking password, the system immediately displays a high-priority warning and masks the numbers.
* **No PII Mandate:** Citizens do not need to register accounts or supply Aadhaar numbers to access legal guidance or scheme directories.
* **Prompt Injection Defense:** Uploaded contracts and messages are treated as untrusted data strings. The model is forbidden from executing instructions found inside analyzed files.
* **Bar Council of India Compliance:** Prominent disclaimers clearly state that NyayaAI is an educational informational utility and does not constitute certified legal counsel under the Advocates Act, 1961.

---

## 5. Prerequisites

* **Node.js:** v18.0.0 or higher (v20+ recommended)
* **Python:** 3.10, 3.11, 3.12, or 3.13
* **Git** (optional)

---

## 6. Quick Start (Windows / Mac / Linux)

### Option A: One-Click Startup (Windows)
Double click `run_dev.bat` or run in PowerShell:
```powershell
.\run_dev.ps1
```

### Option B: Manual Step-by-Step Setup

#### Step 1: Backend Setup
```bash
cd backend

# Create and activate Python virtual environment
python -m venv venv

# On Windows:
.\venv\Scripts\activate
# On Linux / macOS:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (Optional) Configure environment variables
# Copy .env.example to .env if you wish to supply your own GEMINI_API_KEY
# If GEMINI_API_KEY is omitted, NyayaAI automatically runs its high-fidelity Grounded Fallback Engine.
# MongoDB connects to mongodb://localhost:27017/nyayaai by default and auto-seeds verified data.

# Run backend tests
pytest -v

# Start FastAPI server
uvicorn app.main:app --reload --port 8000
```
Backend is now running at `http://localhost:8000`.  
Interactive API Swagger Docs: `http://localhost:8000/docs`.

#### Step 2: Frontend Setup (Open a second terminal)
```bash
cd frontend

# Install npm dependencies
npm install

# Build check
npm run build

# Start development server
npm run dev
```
Frontend is now accessible at `http://localhost:5173`.

---

## 7. Running Automated Tests

NyayaAI includes a comprehensive automated test suite testing healthchecks, document extraction, format security, fraud indicators, scheme searching, and legal aid filtering:

```bash
cd backend
.\venv\Scripts\pytest -v
```

Expected result:
```
tests/test_documents.py::test_get_sample_document_endpoint PASSED        [  5%]
tests/test_documents.py::test_analyze_valid_txt_document PASSED          [ 11%]
tests/test_documents.py::test_analyze_empty_document_rejection PASSED    [ 16%]
tests/test_documents.py::test_unsupported_file_extension PASSED          [ 22%]
tests/test_fraud.py::test_fraud_analyzer_high_risk_coercion PASSED       [ 27%]
tests/test_fraud.py::test_fraud_analyzer_sensitive_credential_detection PASSED [ 33%]
tests/test_fraud.py::test_fraud_samples_endpoint PASSED                  [ 38%]
tests/test_health.py::test_health_endpoint PASSED                        [ 44%]
tests/test_health.py::test_root_endpoint PASSED                          [ 50%]
tests/test_legal_api.py::test_ask_legal_question_success PASSED          [ 55%]
tests/test_legal_api.py::test_ask_legal_question_short_validation_error PASSED [ 61%]
tests/test_legal_api.py::test_ask_legal_hindi PASSED                     [ 66%]
tests/test_schemes.py::test_get_all_schemes PASSED                       [ 72%]
tests/test_schemes.py::test_search_schemes_by_category PASSED            [ 77%]
tests/test_schemes.py::test_search_schemes_by_keyword PASSED             [ 83%]
tests/test_schemes.py::test_get_legal_aid_resources PASSED               [ 88%]
tests/test_schemes.py::test_search_legal_aid_by_state PASSED             [ 94%]
tests/test_schemes.py::test_get_sources_catalogue PASSED                 [100%]
============================= 18 passed in 9.06s ==============================
```

---

## 8. Hackathon Demonstration Script (For Judges)

When presenting NyayaAI to hackathon judges, follow this **3-minute walkthrough**:

### Introduction (30 seconds)
1. Open `http://localhost:5173`.
2. Point out the original product identity: clean scales of justice combined with a civic speech bubble.
3. Toggle the persistent **EN / हिंदी** button in the top navbar to show instant bilingual UI translation.
4. Click the **"Demo Mode"** button in the navbar to open the Hackathon Scenarios panel.

### Demonstration Scenario 1: Document Simplification (60 seconds)
1. In the Demo Modal, click **"Run Scenario A"** (or open **Document Simplifier** and click *"Try Sample Rental Agreement"*).
2. Show that an 11-month Residential Tenancy Agreement is analyzed within seconds.
3. Walk the judges through the tabs:
   * **Plain Summary:** Translates legal terminology into everyday citizen language.
   * **Clauses & Quotes:** Proves accuracy by showing the exact excerpt from the contract alongside the explanation.
   * **Dates & Financials:** Automatically pulls out the ₹60,000 security deposit, ₹24,000 monthly rent, and 1-month notice period.
   * **Potential Concerns:** Warns the tenant about arbitrary deposit deductions for "wear and tear".
   * **Questions to Ask:** Equips the citizen with specific questions before signing.

### Demonstration Scenario 2: Fraud Awareness & Credential Redaction (45 seconds)
1. Click **"Fraud Awareness"** on the navigation bar.
2. Under "Try Real-World Scam Scenarios", click **"Urgent Electricity Disconnection SMS"**.
3. Point out:
   * The **Risk Score (65/100 - High Risk)** and visual warning meter.
   * The detected heuristics: Artificial panic ("electricity will be disconnected tonight at 9:30 PM") and fake `.apk` file download.
   * Safe immediate steps and direct reporting details for the **National Cyber Crime Helpline (1930)** and **Chakshu Portal**.

### Demonstration Scenario 3: Statutory Legal Aid & Grounded Assistant (45 seconds)
1. Navigate to **"Find Legal Aid"**.
2. Highlight the Section 12 Legal Services Authorities Act criteria (free for all women, children, SC/ST, and low-income citizens).
3. Search for "Delhi" to display the **Delhi State Legal Services Authority (DSLSA)** with verified Patiala House Courts address and Helpline 1516.
4. Navigate to **"Ask NyayaAI"** and ask: *"What should I check before signing an employment contract?"*
5. Highlight the grounded primary statutory citations linking directly to the official **India Code** portal (`https://www.indiacode.nic.in/`).

---

## 9. Official Data Sources

All legal references, public schemes, and assistance channels are derived from verified Government of India portals:
* **India Code Digital Repository:** [https://www.indiacode.nic.in/](https://www.indiacode.nic.in/)
* **Department of Justice (Ministry of Law and Justice):** [https://doj.gov.in/](https://doj.gov.in/)
* **National Legal Services Authority (NALSA):** [https://nalsa.gov.in/](https://nalsa.gov.in/)
* **National Government Services Portal:** [https://services.india.gov.in/](https://services.india.gov.in/)
* **National Cyber Crime Reporting Portal:** [https://cybercrime.gov.in/](https://cybercrime.gov.in/)
* **Tele-Law Citizen Portal:** [https://www.tele-law.in/](https://www.tele-law.in/)

---

## 10. Known Limitations & Future Scope

### Current Limitations
1. **Educational Awareness Only:** NyayaAI does not draft binding pleadings for filing in court or represent litigants.
2. **Curated Scheme Catalogue:** The current hackathon build includes a verified seed catalogue of primary national schemes; state-level scheme scraping requires automated sync with data.gov.in APIs.
3. **Scanned PDF OCR:** Optical Character Recognition for low-resolution handwritten notices requires dedicated Tesseract / Google Cloud Vision OCR microservices.

### Future Roadmap
* **Regional Language Expansion:** Expand from Hindi and English to Bengali, Marathi, Telugu, Tamil, and Gujarati.
* **Offline Lok Adalat Case Tracker:** Integration with e-Courts API to track pre-litigation settlement dates.
* **Voice-Enabled Citizen Hotline:** Dial-in IVR and WhatsApp voice-note support for non-literate citizens.

---

## 11. License

This project is licensed under the **MIT License** — see the [LICENSE](file:///c:/Users/ashis/OneDrive/Desktop/NayayaAI/LICENSE) file for details.
