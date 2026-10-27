from typing import List, Dict, Optional
import re
from app.schemas.legal import LegalSourceRef

# Curated, verified repository of primary Indian statutory frameworks
GROUNDED_KNOWLEDGE = [
    {
        "category": "Rental and housing",
        "keywords": ["rent", "rental", "tenant", "landlord", "lease", "eviction", "security deposit", "notice period", "maintenance", "agreement", "house", "flat"],
        "act_title": "Model Tenancy Act, 2021 & Transfer of Property Act, 1882",
        "issuing_authority": "Ministry of Housing and Urban Affairs & Legislative Department",
        "official_url": "https://www.indiacode.nic.in/handle/123456789/2338",
        "verified_date": "2026-10-15",
        "key_sections": "Sections 105 to 111 (Transfer of Property Act); Chapter II & III (Model Tenancy Act)",
        "summary_en": "Under Indian law, tenancy requires a registered or executed written agreement. The Model Tenancy Act caps residential security deposits to a maximum of two months' rent. Notice periods must follow the agreed lease agreement or statutory standard (typically 1 to 3 months). A landlord cannot unilaterally disconnect essential services like water or electricity or forcibly evict without due process of law.",
        "summary_hi": "भारतीय कानून के तहत किराएदारी के लिए एक लिखित अनुबंध आवश्यक है। मॉडल टेनेंसी एक्ट के तहत आवासीय सुरक्षा जमा (सिक्योरिटी डिपॉजिट) अधिकतम दो महीने के किराए तक सीमित है। बिना कानूनी प्रक्रिया के मकान मालिक बिजली-पानी जैसी आवश्यक सेवाएं नहीं काट सकता।"
    },
    {
        "category": "Consumer rights",
        "keywords": ["consumer", "defective", "refund", "replacement", "e-commerce", "flipkart", "amazon", "fake product", "warranty", "deficiency", "guarantee"],
        "act_title": "Consumer Protection Act, 2019",
        "issuing_authority": "Department of Consumer Affairs, Ministry of Consumer Affairs, Food and Public Distribution",
        "official_url": "https://www.indiacode.nic.in/handle/123456789/15256",
        "verified_date": "2026-10-15",
        "key_sections": "Section 2(7) (Consumer definition), Section 35 (Complaints to District Commission), Section 89 (Penalties for misleading advertisement)",
        "summary_en": "The Consumer Protection Act, 2019 protects consumers against unfair trade practices, deficiency in service, and defective goods. Consumers can register grievances online through the National Consumer Helpline (NCH portal / Dial 1915) or e-Daakhil portal without needing an advocate.",
        "summary_hi": "उपभोक्ता संरक्षण अधिनियम, 2019 उपभोक्ताओं को दोषपूर्ण उत्पादों और सेवा में कमी के खिलाफ अधिकार देता है। उपभोक्ता राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) या ई-दाखिल पोर्टल पर सीधे ऑनलाइन शिकायत दर्ज कर सकते हैं।"
    },
    {
        "category": "Employment",
        "keywords": ["employee", "employer", "salary", "wages", "termination", "job", "layoff", "maternity", "probation", "overtime", "pf", "provident fund", "gratuity"],
        "act_title": "Code on Wages, 2019 & Industrial Disputes Act, 1947",
        "issuing_authority": "Ministry of Labour and Employment",
        "official_url": "https://www.indiacode.nic.in/handle/123456789/15478",
        "verified_date": "2026-10-15",
        "key_sections": "Section 17 (Time limit for payment of wages - within 2 working days of removal/dismissal); Section 25F (Conditions for retrenchment)",
        "summary_en": "Employees are entitled to timely payment of earned wages. Upon resignation or termination, unsettled dues must be cleared within statutory deadlines. Arbitrary termination without adhering to employment agreement notice clauses or statutory compensation is actionable before labour authorities.",
        "summary_hi": "कर्मचारियों को समय पर वेतन पाने और सेवा समाप्ति पर नियमानुसार नोटिस अवधि वेतन व ग्रेच्युटी पाने का वैधानिक अधिकार है। वेतन भुगतान में अनुचित कटौती या देरी पर श्रम आयुक्त के समक्ष शिकायत की जा सकती है।"
    },
    {
        "category": "Cybercrime awareness",
        "keywords": ["cyber", "fraud", "hacked", "phishing", "scam", "otp", "upi", "card", "cheated", "online scam", "identity theft", "1930"],
        "act_title": "Information Technology Act, 2000 & Bharatiya Nyaya Sanhita, 2023",
        "issuing_authority": "Ministry of Electronics and Information Technology & Ministry of Home Affairs",
        "official_url": "https://www.indiacode.nic.in/handle/123456789/1999",
        "verified_date": "2026-10-15",
        "key_sections": "Section 43A (Data privacy compensation), Section 66C (Identity theft), Section 66D (Cheating by personation using computer resource)",
        "summary_en": "Cheating through computer resources and fraudulent financial deception are cognizable criminal offenses under Section 66D of the IT Act. Financial cyber frauds should be immediately reported to National Cyber Crime Helpline 1930 and registered at cybercrime.gov.in.",
        "summary_hi": "कंप्यूटर या मोबाइल द्वारा वित्तीय धोखाधड़ी और पहचान की चोरी आईटी अधिनियम की धारा 66C और 66D के तहत दंडनीय अपराध हैं। साइबर धोखाधड़ी होने पर तुरंत राष्ट्रीय हेल्पलाइन 1930 पर कॉल करें।"
    },
    {
        "category": "Free legal aid",
        "keywords": ["legal aid", "free lawyer", "nalsa", "slsa", "dlsa", "lok adalat", "court fees", "afford", "poor"],
        "act_title": "Legal Services Authorities Act, 1987",
        "issuing_authority": "National Legal Services Authority & Ministry of Law and Justice",
        "official_url": "https://nalsa.gov.in/acts-rules/the-legal-services-authorities-act-1987",
        "verified_date": "2026-10-20",
        "key_sections": "Section 12 (Criteria for giving legal services)",
        "summary_en": "Under Section 12, free legal services including free advocate representation in court and drafting assistance are guaranteed to women, children, members of SC/ST, industrial workmen, persons with disabilities, and low-income individuals through NALSA, SLSAs, and DLSAs.",
        "summary_hi": "विधिक सेवा प्राधिकरण अधिनियम की धारा 12 के तहत महिलाओं, बच्चों, अनुसूचित जाति/जनजाति, श्रमिकों और कम आय वर्ग के नागरिकों को अदालतों में निःशुल्क सरकारी वकील व सहायता का अधिकार प्राप्त है।"
    }
]

class LegalRAGService:
    @classmethod
    def find_relevant_sources(cls, question: str, category: Optional[str] = None) -> List[Dict]:
        q_lower = question.lower()
        matched = []
        
        # Match based on keywords and category
        for doc in GROUNDED_KNOWLEDGE:
            score = 0
            if category and category.lower() in doc["category"].lower():
                score += 3
            
            for kw in doc["keywords"]:
                if re.search(r'\b' + re.escape(kw) + r'\b', q_lower):
                    score += 1

            if score > 0:
                matched.append((score, doc))

        # Sort by relevance score
        matched.sort(key=lambda x: x[0], reverse=True)
        
        results = [item[1] for item in matched[:2]]
        
        # Fallback to general statutory authority if nothing matched
        if not results:
            results.append({
                "category": "General Legal Framework",
                "keywords": [],
                "act_title": "Constitution of India & India Code Central Legislations",
                "issuing_authority": "Legislative Department, Ministry of Law and Justice",
                "official_url": "https://www.indiacode.nic.in/",
                "verified_date": "2026-10-20",
                "key_sections": "Relevant Central and State Statutes",
                "summary_en": "Indian law is grounded in constitutional statutory frameworks codified in India Code. Individual rights are enforceable through relevant jurisdictional courts and statutory tribunals.",
                "summary_hi": "भारतीय कानून भारत की संसद और राज्य विधानसभाओं द्वारा पारित अधिनियमों के तहत शासित होता है जिन्हें इंडिया कोड पोर्टल पर सत्यापित किया जा सकता है।"
            })
            
        return results

    @classmethod
    def format_sources(cls, sources: List[Dict]) -> List[LegalSourceRef]:
        refs = []
        for s in sources:
            refs.append(
                LegalSourceRef(
                    title=f"{s['act_title']} ({s['key_sections']})",
                    issuing_authority=s["issuing_authority"],
                    official_url=s["official_url"],
                    relevant_excerpt=s["summary_en"],
                    verified_date=s["verified_date"]
                )
            )
        return refs
