from sqlalchemy.orm import Session
from app.models.database import Scheme, LegalAidResource, LegalSource
import json

VERIFIED_SCHEMES = [
    {
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "name_hi": "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)",
        "issuing_department": "Ministry of Agriculture & Farmers Welfare",
        "issuing_department_hi": "कृषि एवं किसान कल्याण मंत्रालय",
        "description": "Central sector scheme offering income support to landholding farmer families across India to supplement financial needs for agriculture and domestic requirements.",
        "description_hi": "कृषि एवं घरेलू आवश्यकताओं की पूर्ति के लिए सभी भूमिधारक किसान परिवारों को आय सहायता प्रदान करने वाली केंद्रीय योजना।",
        "beneficiary_category": "farmer",
        "eligibility_summary": "All landholding farmer families with cultivable landholding in their names. Subject to standard institutional/income exclusion criteria.",
        "eligibility_summary_hi": "वे सभी किसान परिवार जिनके नाम कृषि योग्य भूमि है। संस्थागत भूमिधारक और उच्च आयकर दाता इसके पात्र नहीं हैं।",
        "benefits_summary": "Direct benefit transfer of Rs 6,000 per year paid in three equal installments of Rs 2,000 each directly into bank accounts.",
        "benefits_summary_hi": "₹6,000 प्रति वर्ष की वित्तीय सहायता, ₹2,000 की 3 समान किश्तों में सीधे बैंक खाते में ट्रांसफर।",
        "required_documents": "Aadhaar Card, Land ownership papers (Khatauni/Khasra), Active Bank Account details (seeded with Aadhaar)",
        "application_url": "https://pmkisan.gov.in/",
        "official_source_url": "https://pmkisan.gov.in/Documents_Pmkisan.aspx",
        "state_ut": "All India",
        "min_age": 18,
        "max_age": None,
        "last_verified_at": "2026-10-15"
    },
    {
        "name": "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)",
        "name_hi": "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)",
        "issuing_department": "National Health Authority, Ministry of Health & Family Welfare",
        "issuing_department_hi": "राष्ट्रीय स्वास्थ्य प्राधिकरण, स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
        "description": "World's largest government-funded health assurance scheme providing comprehensive cashless inpatient care for vulnerable citizen families.",
        "description_hi": "पात्र गरीब और वंचित परिवारों को द्वितीयक और तृतीयक देखभाल हेतु कैशलेस स्वास्थ्य बीमा प्रदान करने वाली योजना।",
        "beneficiary_category": "general",
        "eligibility_summary": "Families identified on the basis of deprivation and occupational criteria as per Socio-Economic Caste Census (SECC 2011) and updated National Health Authority lists.",
        "eligibility_summary_hi": "SECC 2011 और राज्य सरकारों द्वारा निर्धारित वंचित ग्रामीण और शहरी कामगार परिवार।",
        "benefits_summary": "Health cover of Rs 5,00,000 per family per year for secondary and tertiary hospital care across empaneled public and private hospitals.",
        "benefits_summary_hi": "प्रति परिवार प्रति वर्ष ₹5,00,000 तक का निःशुल्क कैशलेस अस्पताल उपचार।",
        "required_documents": "Aadhaar card, Ration card or verified family identification document",
        "application_url": "https://beneficiary.nha.gov.in/",
        "official_source_url": "https://pmjay.gov.in/about/pmjay",
        "state_ut": "All India",
        "min_age": None,
        "max_age": None,
        "last_verified_at": "2026-10-15"
    },
    {
        "name": "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
        "name_hi": "पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)",
        "issuing_department": "Ministry of Housing and Urban Affairs",
        "issuing_department_hi": "आवासन और शहरी कार्य मंत्रालय",
        "description": "Special micro-credit facility providing affordable working capital collateral-free loans to urban and peri-urban street vendors.",
        "description_hi": "रेहड़ी-पटरी और फेरी लगाने वाले स्ट्रीट वेंडर्स के लिए सस्ती कार्यशील पूंजी ऋण योजना।",
        "beneficiary_category": "small_business",
        "eligibility_summary": "Street vendors engaged in vending in urban areas on or before March 24, 2020 holding a Certificate of Vending / Identity Card issued by Urban Local Bodies (ULBs).",
        "eligibility_summary_hi": "शहरी क्षेत्रों में फेरी या वेंडिंग करने वाले स्ट्रीट वेंडर्स जिनके पास स्थानीय निकाय का वेंडिंग पहचान पत्र या सिफ़ारिश पत्र हो।",
        "benefits_summary": "Initial collateral-free working capital loan up to Rs 10,000 with 7% interest subsidy on regular repayment, enhancing to Rs 20,000 and Rs 50,000 in successive tranches.",
        "benefits_summary_hi": "पहले चरण में ₹10,000 तक का बिना गारंटी ऋण, समय पर भुगतान पर 7% ब्याज सब्सिडी तथा अगले चरणों में ₹20,000 व ₹50,000 का ऋण।",
        "required_documents": "Vending Certificate / Urban Local Body ID, Aadhaar Card, Bank Account passbook",
        "application_url": "https://pmsvanidhi.mohua.gov.in/",
        "official_source_url": "https://pmsvanidhi.mohua.gov.in/Home/Schemes",
        "state_ut": "All India",
        "min_age": 18,
        "max_age": None,
        "last_verified_at": "2026-10-15"
    },
    {
        "name": "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
        "name_hi": "प्रधानमंत्री आवास योजना - शहरी (पीएमएवाई-यू)",
        "issuing_department": "Ministry of Housing and Urban Affairs",
        "issuing_department_hi": "आवासन और शहरी कार्य मंत्रालय",
        "description": "Housing initiative addressing urban housing shortage among EWS/LIG and MIG categories through credit-linked subsidies and affordable housing partnerships.",
        "description_hi": "शहरी गरीबों और मध्यम आय वर्ग के परिवारों को पक्का मकान उपलब्ध कराने की प्रमुख आवास योजना।",
        "beneficiary_category": "worker",
        "eligibility_summary": "Beneficiary family must not own a pucca house in any part of India. Classified under Economically Weaker Section (EWS) or Low Income Group (LIG).",
        "eligibility_summary_hi": "परिवार के पास भारत में कहीं भी अपना पक्का घर नहीं होना चाहिए। ईडब्ल्यूएस (EWS) या एलआईजी (LIG) आय सीमा के अंतर्गत।",
        "benefits_summary": "Interest subsidy up to 6.5% on home loans or central financial assistance up to Rs 1.5 - 2.5 Lakh depending on the vertical component.",
        "benefits_summary_hi": "गृह ऋण पर 6.5% तक ब्याज सब्सिडी या ₹1.5 से ₹2.5 लाख तक की केंद्रीय वित्तीय सहायता।",
        "required_documents": "Income Certificate, Aadhaar Card, Bank account details, Affidavit of not owning a pucca house",
        "application_url": "https://pmaymis.gov.in/",
        "official_source_url": "https://pmay-urban.gov.in/",
        "state_ut": "All India",
        "min_age": 18,
        "max_age": None,
        "last_verified_at": "2026-10-15"
    },
    {
        "name": "National Apprenticeship Promotion Scheme (NAPS)",
        "name_hi": "राष्ट्रीय शिक्षुता संवर्धन योजना (एनएपीएस)",
        "issuing_department": "Ministry of Skill Development and Entrepreneurship",
        "issuing_department_hi": "कौशल विकास और उद्यमशीलता मंत्रालय",
        "description": "Scheme to promote apprenticeship training, provide stipend support to apprentices, and build youth technical and vocational capabilities.",
        "description_hi": "युवाओं को उद्योगों में शिक्षुता (अप्रेंटिसशिप) प्रशिक्षण और मासिक वजीफा सहायता प्रदान करने वाली योजना।",
        "beneficiary_category": "student",
        "eligibility_summary": "Youth aged 14 to 35 years possessing minimum educational qualifications (10th, 12th, ITI, Diploma, or Graduate depending on apprenticeship role).",
        "eligibility_summary_hi": "14 से 35 वर्ष के युवा जिन्होंने 10वीं, 12वीं, आईटीआई, डिप्लोमा या स्नातक की शिक्षा प्राप्त की हो।",
        "benefits_summary": "On-the-job industrial skill training with government co-sharing of monthly stipend up to Rs 1,500/month directly to apprentice accounts.",
        "benefits_summary_hi": "उद्योगों में व्यावहारिक प्रशिक्षण एवं प्रतिमाह ₹1,500 तक की सरकारी छात्रवृत्ति/वजीफा अंशदान।",
        "required_documents": "Educational marksheet, Aadhaar Card, Active Bank account details",
        "application_url": "https://www.apprenticeshipindia.gov.in/",
        "official_source_url": "https://www.msde.gov.in/en/schemes-initiatives/schemes-initiatives-for-youth/naps",
        "state_ut": "All India",
        "min_age": 14,
        "max_age": 35,
        "last_verified_at": "2026-10-15"
    },
    {
        "name": "Sukanya Samriddhi Yojana (SSY)",
        "name_hi": "सुकन्या समृद्धि योजना (एसएसवाई)",
        "issuing_department": "Department of Posts, Ministry of Finance",
        "issuing_department_hi": "डाक विभाग, वित्त मंत्रालय",
        "description": "Government-backed savings scheme targeted at parents of girl children to build funds for higher education and marriage under 'Beti Bachao Beti Padhao'.",
        "description_hi": "बालिकाओं की उच्च शिक्षा और भविष्य की सुरक्षा के लिए उच्च ब्याज दर वाली छोटी बचत योजना।",
        "beneficiary_category": "women",
        "eligibility_summary": "Account can be opened by parents/legal guardians in the name of a girl child from her birth till she attains the age of 10 years.",
        "eligibility_summary_hi": "माता-पिता या कानूनी अभिभावक द्वारा 10 वर्ष से कम आयु की बालिकाओं के नाम पर खाता खोला जा सकता है।",
        "benefits_summary": "High guaranteed sovereign interest rate (currently ~8.2% p.a.), tax exemptions under Section 80C, and full tax-free maturity amount.",
        "benefits_summary_hi": "सरकारी गारंटीकृत उच्च ब्याज दर (लगभग 8.2%), धारा 80C के तहत आयकर छूट और परिपक्वता पर कर-मुक्त राशि।",
        "required_documents": "Birth Certificate of the girl child, Identity & Address proof of guardian, Passport size photographs",
        "application_url": "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
        "official_source_url": "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89",
        "state_ut": "All India",
        "min_age": 0,
        "max_age": 10,
        "last_verified_at": "2026-10-15"
    }
]

VERIFIED_LEGAL_AID = [
    {
        "organization_name": "National Legal Services Authority (NALSA)",
        "organization_name_hi": "राष्ट्रीय विधिक सेवा प्राधिकरण (नालसा)",
        "jurisdiction_level": "National",
        "state": "All India",
        "district": "New Delhi",
        "category": "NALSA Apex Authority",
        "service_description": "Apex statutory body established under Legal Services Authorities Act, 1987. Provides free and competent legal services to eligible citizens, organizes Lok Adalats, and facilitates legal literacy.",
        "service_description_hi": "विधिक सेवा प्राधिकरण अधिनियम, 1987 के तहत शीर्ष वैधानिक निकाय। पात्र नागरिकों को निःशुल्क कानूनी सहायता और लोक अदालतों का संचालन करता है।",
        "official_phone": "15100 (National Legal Aid Toll-Free Helpline)",
        "official_address": "B-Block, Ground Floor, Additional Building Complex, Supreme Court of India, New Delhi - 110001",
        "official_url": "https://nalsa.gov.in/",
        "eligibility_info": "Under Section 12 of the Legal Services Authorities Act, 1987: Women, children, SC/ST members, industrial workmen, persons with disabilities, victims of trafficking, undertrial prisoners, and individuals whose annual income is below statutory state thresholds are entitled to free legal aid.",
        "last_verified_at": "2026-10-20"
    },
    {
        "organization_name": "Tele-Law Service (Department of Justice)",
        "organization_name_hi": "टेली-लॉ सेवा (न्याय विभाग, विधि एवं न्याय मंत्रालय)",
        "jurisdiction_level": "National / Rural",
        "state": "All India",
        "district": "All Districts (via Common Services Centres)",
        "category": "Tele-Law E-Portal",
        "service_description": "Government of India initiative enabling citizens to consult panel lawyers via video conferencing and telephone calls through Common Service Centres (CSCs) or the Tele-Law Mobile App.",
        "service_description_hi": "नागरिकों को कॉमन सर्विस सेंटर (CSC) और मोबाइल ऐप के माध्यम से पैनल वकीलों से निःशुल्क या नाममात्र शुल्क पर कानूनी सलाह उपलब्ध कराने की सेवा।",
        "official_phone": "14417 / 1800-180-1555",
        "official_address": "Department of Justice, Jaisalmer House, 26 Man Singh Road, New Delhi - 110011",
        "official_url": "https://www.tele-law.in/",
        "eligibility_info": "Completely free legal advice for Section 12 eligible categories (women, SC, ST, disabled, workers). Nominal advisory fee for others.",
        "last_verified_at": "2026-10-20"
    },
    {
        "organization_name": "Delhi State Legal Services Authority (DSLSA)",
        "organization_name_hi": "दिल्ली राज्य विधिक सेवा प्राधिकरण",
        "jurisdiction_level": "State",
        "state": "Delhi",
        "district": "Central Delhi",
        "category": "SLSA",
        "service_description": "State authority delivering free legal representation, mediation centers, frontline legal clinics, and victim compensation schemes across all Delhi court complexes.",
        "service_description_hi": "दिल्ली में निःशुल्क कानूनी प्रतिनिधित्व, मध्यस्थता केंद्र और पीड़ित मुआवजा योजनाएं संचालित करने वाली राज्य संस्था।",
        "official_phone": "1516 (24x7 DSLSA Helpline) / 011-23384781",
        "official_address": "Central Office, Pre-fab Building, Patiala House Courts Complex, New Delhi - 110001",
        "official_url": "https://dslsa.org/",
        "eligibility_info": "Residents of NCT of Delhi earning up to statutory income limit (Rs 3,00,000 p.a.) or falling under Section 12 categories.",
        "last_verified_at": "2026-10-20"
    },
    {
        "organization_name": "Maharashtra State Legal Services Authority (MSLSA)",
        "organization_name_hi": "महाराष्ट्र राज्य विधिक सेवा प्राधिकरण",
        "jurisdiction_level": "State",
        "state": "Maharashtra",
        "district": "Mumbai",
        "category": "SLSA",
        "service_description": "State legal authority overseeing district legal services authorities, High Court legal services committees, and taluka legal clinics throughout Maharashtra.",
        "service_description_hi": "महाराष्ट्र राज्य भर में जिला न्यायालयों और उच्च न्यायालय में निःशुल्क कानूनी सहायता और लोक अदालतें आयोजित करने वाला प्राधिकरण।",
        "official_phone": "022-22623762 / 15100",
        "official_address": "105, High Court PWD Building, Fort, Mumbai - 400032",
        "official_url": "https://legalservices.maharashtra.gov.in/",
        "eligibility_info": "Annual income limit of Rs 3,00,000 for general category; free for women, children, SC/ST, and persons with disabilities regardless of income.",
        "last_verified_at": "2026-10-20"
    },
    {
        "organization_name": "Karnataka State Legal Services Authority (KSLSA)",
        "organization_name_hi": "कर्नाटक राज्य विधिक सेवा प्राधिकरण",
        "jurisdiction_level": "State",
        "state": "Karnataka",
        "district": "Bengaluru",
        "category": "SLSA",
        "service_description": "Statutory body providing free legal services to the underprivileged, settlement of disputes through Lok Adalat, and conducting legal literacy programs across Karnataka.",
        "service_description_hi": "कर्नाटक में वंचित नागरिकों को मुफ्त कानूनी सलाह और न्यायालय में वकील उपलब्ध कराने वाला राज्य प्राधिकरण।",
        "official_phone": "080-22111725 / 15100",
        "official_address": "Nyaya Degula, 1st Floor, Siddaiah Road, Bangalore - 560027",
        "official_url": "https://kslsa.karnataka.gov.in/",
        "eligibility_info": "Income ceiling of Rs 3,00,000 p.a. for general citizens; women, children, SC/ST, and disabled individuals receive 100% free aid.",
        "last_verified_at": "2026-10-20"
    },
    {
        "organization_name": "Uttar Pradesh State Legal Services Authority (UPSLSA)",
        "organization_name_hi": "उत्तर प्रदेश राज्य विधिक सेवा प्राधिकरण",
        "jurisdiction_level": "State",
        "state": "Uttar Pradesh",
        "district": "Lucknow",
        "category": "SLSA",
        "service_description": "Apex state legal aid authority managing 75 District Legal Services Authorities (DLSAs) to provide free legal representation and organize Lok Adalats.",
        "service_description_hi": "उत्तर प्रदेश के 75 जिलों में निःशुल्क विधिक सेवा और लोक अदालतों का संचालन करने वाला राज्य प्राधिकरण।",
        "official_phone": "0522-2286395 / 15100",
        "official_address": "IIIrd Floor, Jawahar Bhawan, Annexe, Lucknow - 226001",
        "official_url": "https://upslsa.up.gov.in/",
        "eligibility_info": "Income ceiling of Rs 3,00,000 p.a. for general individuals; statutory categories under Section 12 receive full assistance.",
        "last_verified_at": "2026-10-20"
    }
]

VERIFIED_LEGAL_SOURCES = [
    {
        "title": "India Code Digital Repository",
        "issuing_authority": "Legislative Department, Ministry of Law and Justice",
        "source_url": "https://www.indiacode.nic.in/",
        "source_type": "Statute / Official Acts Repository",
        "description": "Official centralized digital repository of all Central and State Acts, ordinances, and subordinate legislations enacted by the Parliament of India and state legislatures.",
        "publication_date": "Updated Continuously",
        "last_verified_at": "2026-10-20"
    },
    {
        "title": "Department of Justice Portal",
        "issuing_authority": "Ministry of Law and Justice, Government of India",
        "source_url": "https://doj.gov.in/",
        "source_type": "Central Government Department",
        "description": "Official portal providing policy guidelines, judicial reform reports, Fast Track Special Court statistics, and citizen access to justice initiatives like Tele-Law.",
        "publication_date": "Updated Continuously",
        "last_verified_at": "2026-10-20"
    },
    {
        "title": "National Legal Services Authority (NALSA) Official Portal",
        "issuing_authority": "Statutory Authority under Act of Parliament",
        "source_url": "https://nalsa.gov.in/",
        "source_type": "Statutory Legal Services Directory",
        "description": "Official authority for national legal aid frameworks, state authority guidelines, legal literacy schemes, and nationwide National Lok Adalat schedules.",
        "publication_date": "Updated Continuously",
        "last_verified_at": "2026-10-20"
    },
    {
        "title": "National Government Services Portal",
        "issuing_authority": "National Informatics Centre (NIC), MeitY",
        "source_url": "https://services.india.gov.in/",
        "source_type": "Official Public Services Catalogue",
        "description": "Single-window discovery platform for over 13,000 citizen-centric online government services provided by central and state government departments.",
        "publication_date": "Updated Continuously",
        "last_verified_at": "2026-10-20"
    },
    {
        "title": "National Cyber Crime Reporting Portal",
        "issuing_authority": "Ministry of Home Affairs, Government of India",
        "source_url": "https://cybercrime.gov.in/",
        "source_type": "Law Enforcement & Cyber Crime Grievance",
        "description": "Dedicated official portal for citizens to report cybercrimes, financial digital fraud, and access citizen cyber safety guidelines. National Helpline: 1930.",
        "publication_date": "Updated Continuously",
        "last_verified_at": "2026-10-20"
    }
]

def seed_all(db: Session):
    # Check if schemes already exist
    if db.query(Scheme).count() == 0:
        for s in VERIFIED_SCHEMES:
            scheme = Scheme(**s)
            db.add(scheme)
    
    # Check if legal aid resources already exist
    if db.query(LegalAidResource).count() == 0:
        for r in VERIFIED_LEGAL_AID:
            aid = LegalAidResource(**r)
            db.add(aid)
            
    # Check if legal sources already exist
    if db.query(LegalSource).count() == 0:
        for src in VERIFIED_LEGAL_SOURCES:
            source = LegalSource(**src)
            db.add(source)
            
    db.commit()
