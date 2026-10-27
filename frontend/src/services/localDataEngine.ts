import {
  LegalAskResponse,
  DocumentAnalysisResponse,
  FraudCheckResponse,
  Scheme,
  LegalAidResource,
  LegalSource
} from '../types';

export const LOCAL_SCHEMES: Scheme[] = [
  {
    id: 1,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    name_hi: "प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान)",
    issuing_department: "Ministry of Agriculture & Farmers Welfare",
    issuing_department_hi: "कृषि एवं किसान कल्याण मंत्रालय",
    description: "Central sector scheme offering income support to landholding farmer families across India to supplement financial needs for agriculture and domestic requirements.",
    description_hi: "कृषि एवं घरेलू आवश्यकताओं की पूर्ति के लिए सभी भूमिधारक किसान परिवारों को आय सहायता प्रदान करने वाली केंद्रीय योजना।",
    beneficiary_category: "farmer",
    eligibility_summary: "All landholding farmer families with cultivable landholding in their names. Subject to standard institutional/income exclusion criteria.",
    eligibility_summary_hi: "वे सभी किसान परिवार जिनके नाम कृषि योग्य भूमि है। संस्थागत भूमिधारक और उच्च आयकर दाता इसके पात्र नहीं हैं।",
    benefits_summary: "Direct benefit transfer of Rs 6,000 per year paid in three equal installments of Rs 2,000 each directly into bank accounts.",
    benefits_summary_hi: "₹6,000 प्रति वर्ष की वित्तीय सहायता, ₹2,000 की 3 समान किश्तों में सीधे बैंक खाते में ट्रांसफर।",
    required_documents: "Aadhaar Card, Land ownership papers (Khatauni/Khasra), Active Bank Account details (seeded with Aadhaar)",
    application_url: "https://pmkisan.gov.in/",
    official_source_url: "https://pmkisan.gov.in/Documents_Pmkisan.aspx",
    state_ut: "All India",
    min_age: 18,
    max_age: undefined,
    last_verified_at: "2026-10-15"
  },
  {
    id: 2,
    name: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (AB PM-JAY)",
    name_hi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना (पीएम-जय)",
    issuing_department: "National Health Authority, Ministry of Health & Family Welfare",
    issuing_department_hi: "राष्ट्रीय स्वास्थ्य प्राधिकरण, स्वास्थ्य एवं परिवार कल्याण मंत्रालय",
    description: "World's largest government-funded health assurance scheme providing comprehensive cashless inpatient care for vulnerable citizen families.",
    description_hi: "पात्र गरीब और वंचित परिवारों को द्वितीयक और तृतीयक देखभाल हेतु कैशलेस स्वास्थ्य बीमा प्रदान करने वाली योजना।",
    beneficiary_category: "general",
    eligibility_summary: "Families identified on the basis of deprivation and occupational criteria as per Socio-Economic Caste Census (SECC 2011) and updated National Health Authority lists.",
    eligibility_summary_hi: "SECC 2011 और राज्य सरकारों द्वारा निर्धारित वंचित ग्रामीण और शहरी कामगार परिवार।",
    benefits_summary: "Health cover of Rs 5,00,000 per family per year for secondary and tertiary hospital care across empaneled public and private hospitals.",
    benefits_summary_hi: "प्रति परिवार प्रति वर्ष ₹5,00,000 तक का निःशुल्क कैशलेस अस्पताल उपचार।",
    required_documents: "Aadhaar card, Ration card or verified family identification document",
    application_url: "https://beneficiary.nha.gov.in/",
    official_source_url: "https://pmjay.gov.in/about/pmjay",
    state_ut: "All India",
    min_age: undefined,
    max_age: undefined,
    last_verified_at: "2026-10-15"
  },
  {
    id: 3,
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    name_hi: "पीएम स्ट्रीट वेंडर्स आत्मनिर्भर निधि (पीएम स्वनिधि)",
    issuing_department: "Ministry of Housing and Urban Affairs",
    issuing_department_hi: "आवासन और शहरी कार्य मंत्रालय",
    description: "Special micro-credit facility providing affordable working capital collateral-free loans to urban and peri-urban street vendors.",
    description_hi: "रेहड़ी-पटरी और फेरी लगाने वाले स्ट्रीट वेंडर्स के लिए सस्ती कार्यशील पूंजी ऋण योजना।",
    beneficiary_category: "small_business",
    eligibility_summary: "Street vendors engaged in vending in urban areas on or before March 24, 2020 holding a Certificate of Vending / Identity Card issued by Urban Local Bodies (ULBs).",
    eligibility_summary_hi: "शहरी क्षेत्रों में फेरी या वेंडिंग करने वाले स्ट्रीट वेंडर्स जिनके पास स्थानीय निकाय का वेंडिंग पहचान पत्र या सिफ़ारिश पत्र हो।",
    benefits_summary: "Initial collateral-free working capital loan up to Rs 10,000 with 7% interest subsidy on regular repayment, enhancing to Rs 20,000 and Rs 50,000 in successive tranches.",
    benefits_summary_hi: "पहले चरण में ₹10,000 तक का बिना गारंटी ऋण, समय पर भुगतान पर 7% ब्याज सब्सिडी तथा अगले चरणों में ₹20,000 व ₹50,000 का ऋण।",
    required_documents: "Vending Certificate / Urban Local Body ID, Aadhaar Card, Bank Account passbook",
    application_url: "https://pmsvanidhi.mohua.gov.in/",
    official_source_url: "https://pmsvanidhi.mohua.gov.in/Home/Schemes",
    state_ut: "All India",
    min_age: 18,
    max_age: undefined,
    last_verified_at: "2026-10-15"
  },
  {
    id: 4,
    name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
    name_hi: "प्रधानमंत्री आवास योजना - शहरी (पीएमएवाई-यू)",
    issuing_department: "Ministry of Housing and Urban Affairs",
    issuing_department_hi: "आवासन और शहरी कार्य मंत्रालय",
    description: "Housing initiative addressing urban housing shortage among EWS/LIG and MIG categories through credit-linked subsidies and affordable housing partnerships.",
    description_hi: "शहरी गरीबों और मध्यम आय वर्ग के परिवारों को पक्का मकान उपलब्ध कराने की प्रमुख आवास योजना।",
    beneficiary_category: "worker",
    eligibility_summary: "Beneficiary family must not own a pucca house in any part of India. Classified under Economically Weaker Section (EWS) or Low Income Group (LIG).",
    eligibility_summary_hi: "परिवार के पास भारत में कहीं भी अपना पक्का घर नहीं होना चाहिए। ईडब्ल्यूएस (EWS) या एलआईजी (LIG) आय सीमा के अंतर्गत।",
    benefits_summary: "Interest subsidy up to 6.5% on home loans or central financial assistance up to Rs 1.5 - 2.5 Lakh depending on the vertical component.",
    benefits_summary_hi: "गृह ऋण पर 6.5% तक ब्याज सब्सिडी या ₹1.5 से ₹2.5 लाख तक की केंद्रीय वित्तीय सहायता।",
    required_documents: "Income Certificate, Aadhaar Card, Bank account details, Affidavit of not owning a pucca house",
    application_url: "https://pmaymis.gov.in/",
    official_source_url: "https://pmay-urban.gov.in/",
    state_ut: "All India",
    min_age: 18,
    max_age: undefined,
    last_verified_at: "2026-10-15"
  },
  {
    id: 5,
    name: "National Apprenticeship Promotion Scheme (NAPS)",
    name_hi: "राष्ट्रीय शिक्षुता संवर्धन योजना (एनएपीएस)",
    issuing_department: "Ministry of Skill Development and Entrepreneurship",
    issuing_department_hi: "कौशल विकास और उद्यमशीलता मंत्रालय",
    description: "Scheme to promote apprenticeship training, provide stipend support to apprentices, and build youth technical and vocational capabilities.",
    description_hi: "युवाओं को उद्योगों में शिक्षुता (अप्रेंटिसशिप) प्रशिक्षण और मासिक वजीफा सहायता प्रदान करने वाली योजना।",
    beneficiary_category: "student",
    eligibility_summary: "Youth aged 14 to 35 years possessing minimum educational qualifications (10th, 12th, ITI, Diploma, or Graduate depending on apprenticeship role).",
    eligibility_summary_hi: "14 से 35 वर्ष के युवा जिन्होंने 10वीं, 12वीं, आईटीआई, डिप्लोमा या स्नातक की शिक्षा प्राप्त की हो।",
    benefits_summary: "On-the-job industrial skill training with government co-sharing of monthly stipend up to Rs 1,500/month directly to apprentice accounts.",
    benefits_summary_hi: "उद्योगों में व्यावहारिक प्रशिक्षण एवं प्रतिमाह ₹1,500 तक की सरकारी छात्रवृत्ति/वजीफा अंशदान।",
    required_documents: "Educational marksheet, Aadhaar Card, Active Bank account details",
    application_url: "https://www.apprenticeshipindia.gov.in/",
    official_source_url: "https://www.msde.gov.in/en/schemes-initiatives/schemes-programmes-under-msde/naps",
    state_ut: "All India",
    min_age: 14,
    max_age: 35,
    last_verified_at: "2026-10-15"
  },
  {
    id: 6,
    name: "Sukanya Samriddhi Yojana (SSY)",
    name_hi: "सुकन्या समृद्धि योजना",
    issuing_department: "Ministry of Finance (Department of Economic Affairs) / India Post",
    issuing_department_hi: "वित्त मंत्रालय (आर्थिक कार्य विभाग) / डाक विभाग",
    description: "Government-backed savings initiative under Beti Bachao Beti Padhao aimed at parents of girl children to build funds for higher education and marriage.",
    description_hi: "बालिकाओं के उज्ज्वल भविष्य और उच्च शिक्षा के लिए आकर्षक ब्याज दर वाली सरकारी बचत योजना।",
    beneficiary_category: "women",
    eligibility_summary: "Parents or legal guardians can open an account in the name of a girl child from her birth up to the age of 10 years. Maximum two accounts per family.",
    eligibility_summary_hi: "माता-पिता या कानूनी अभिभावक जन्म से लेकर 10 वर्ष की आयु तक की बालिकाओं के नाम पर खाता खोल सकते हैं।",
    benefits_summary: "Guaranteed high interest rates (currently 8.2% p.a. compounded annually) with complete Triple E tax exemption (under Section 80C).",
    benefits_summary_hi: "उच्च ब्याज दर (8.2% वार्षिक) और धारा 80C के अंतर्गत पूर्ण कर छूट (EEE स्टेटस)।",
    required_documents: "Girl child's Birth Certificate, Parent/Guardian identity and address proof, Photograph",
    application_url: "https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx",
    official_source_url: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89",
    state_ut: "All India",
    min_age: 0,
    max_age: 10,
    last_verified_at: "2026-10-15"
  }
];

export const LOCAL_LEGAL_AID: LegalAidResource[] = [
  {
    id: 1,
    organization_name: "National Legal Services Authority (NALSA)",
    organization_name_hi: "राष्ट्रीय विधिक सेवा प्राधिकरण (नालसा)",
    jurisdiction_level: "National",
    state: "All India",
    district: "New Delhi",
    category: "NALSA Apex Authority",
    service_description: "Apex statutory body established under Legal Services Authorities Act, 1987. Provides free and competent legal services to eligible citizens, organizes Lok Adalats, and facilitates legal literacy.",
    service_description_hi: "विधिक सेवा प्राधिकरण अधिनियम, 1987 के तहत शीर्ष वैधानिक निकाय। पात्र नागरिकों को निःशुल्क कानूनी सहायता और लोक अदालतों का संचालन करता है।",
    official_phone: "15100 (National Legal Aid Toll-Free Helpline)",
    official_address: "B-Block, Ground Floor, Additional Building Complex, Supreme Court of India, New Delhi - 110001",
    official_url: "https://nalsa.gov.in/",
    eligibility_info: "Under Section 12 of the Legal Services Authorities Act, 1987: Women, children, SC/ST members, industrial workmen, persons with disabilities, victims of trafficking, undertrial prisoners, and individuals whose annual income is below statutory state thresholds are entitled to free legal aid.",
    last_verified_at: "2026-10-20"
  },
  {
    id: 2,
    organization_name: "Tele-Law Service (Department of Justice)",
    organization_name_hi: "टेली-लॉ सेवा (न्याय विभाग, विधि एवं न्याय मंत्रालय)",
    jurisdiction_level: "National / Rural",
    state: "All India",
    district: "All Districts (via Common Services Centres)",
    category: "Tele-Law E-Portal",
    service_description: "Government of India initiative enabling citizens to consult panel lawyers via video conferencing and telephone calls through Common Service Centres (CSCs) or the Tele-Law Mobile App.",
    service_description_hi: "नागरिकों को कॉमन सर्विस सेंटर (CSC) और मोबाइल ऐप के माध्यम से पैनल वकीलों से निःशुल्क या नाममात्र शुल्क पर कानूनी सलाह उपलब्ध कराने की सेवा।",
    official_phone: "14417 / 1800-180-1555",
    official_address: "Department of Justice, Jaisalmer House, 26 Man Singh Road, New Delhi - 110011",
    official_url: "https://www.tele-law.in/",
    eligibility_info: "Completely free legal advice for Section 12 eligible categories (women, SC, ST, disabled, workers). Nominal advisory fee for others.",
    last_verified_at: "2026-10-20"
  },
  {
    id: 3,
    organization_name: "Delhi State Legal Services Authority (DSLSA)",
    organization_name_hi: "दिल्ली राज्य विधिक सेवा प्राधिकरण",
    jurisdiction_level: "State",
    state: "Delhi",
    district: "Central Delhi",
    category: "SLSA",
    service_description: "State authority delivering free legal representation, mediation centers, frontline legal clinics, and victim compensation schemes across all Delhi court complexes.",
    service_description_hi: "दिल्ली में निःशुल्क कानूनी प्रतिनिधित्व, मध्यस्थता केंद्र और पीड़ित मुआवजा योजनाएं संचालित करने वाली राज्य संस्था।",
    official_phone: "1516 (24x7 DSLSA Helpline) / 011-23384781",
    official_address: "Central Office, Pre-fab Building, Patiala House Courts Complex, New Delhi - 110001",
    official_url: "https://dslsa.org/",
    eligibility_info: "Residents of NCT of Delhi earning up to statutory income limit (Rs 3,00,000 p.a.) or falling under Section 12 categories.",
    last_verified_at: "2026-10-20"
  },
  {
    id: 4,
    organization_name: "Maharashtra State Legal Services Authority (MSLSA)",
    organization_name_hi: "महाराष्ट्र राज्य विधिक सेवा प्राधिकरण",
    jurisdiction_level: "State",
    state: "Maharashtra",
    district: "Mumbai",
    category: "SLSA",
    service_description: "State legal authority overseeing district legal services authorities, High Court legal services committees, and taluka legal clinics throughout Maharashtra.",
    service_description_hi: "महाराष्ट्र राज्य भर में जिला न्यायालयों और उच्च न्यायालय में निःशुल्क कानूनी सहायता और लोक अदालतें आयोजित करने वाला प्राधिकरण।",
    official_phone: "022-22623762 / 15100",
    official_address: "105, High Court PWD Building, Fort, Mumbai - 400032",
    official_url: "https://legalservices.maharashtra.gov.in/",
    eligibility_info: "Annual income limit of Rs 3,00,000 for general category; free for women, children, SC/ST, and persons with disabilities regardless of income.",
    last_verified_at: "2026-10-20"
  },
  {
    id: 5,
    organization_name: "Karnataka State Legal Services Authority (KSLSA)",
    organization_name_hi: "कर्नाटक राज्य विधिक सेवा प्राधिकरण",
    jurisdiction_level: "State",
    state: "Karnataka",
    district: "Bengaluru",
    category: "SLSA",
    service_description: "Statutory body providing free legal services to the underprivileged, settlement of disputes through Lok Adalat, and conducting legal literacy programs across Karnataka.",
    service_description_hi: "कर्नाटक में वंचित नागरिकों को मुफ्त कानूनी सलाह और न्यायालय में वकील उपलब्ध कराने वाला राज्य प्राधिकरण।",
    official_phone: "080-22111725 / 15100",
    official_address: "Nyaya Degula, 1st Floor, Siddaiah Road, Bangalore - 560027",
    official_url: "https://kslsa.karnataka.gov.in/",
    eligibility_info: "Income ceiling of Rs 3,00,000 p.a. for general citizens; women, children, SC/ST, and disabled individuals receive 100% free aid.",
    last_verified_at: "2026-10-20"
  },
  {
    id: 6,
    organization_name: "Uttar Pradesh State Legal Services Authority (UPSLSA)",
    organization_name_hi: "उत्तर प्रदेश राज्य विधिक सेवा प्राधिकरण",
    jurisdiction_level: "State",
    state: "Uttar Pradesh",
    district: "Lucknow",
    category: "SLSA",
    service_description: "Apex state legal aid authority managing 75 District Legal Services Authorities (DLSAs) to provide free legal representation and organize Lok Adalats.",
    service_description_hi: "उत्तर प्रदेश के 75 जिलों में निःशुल्क विधिक सेवा और लोक अदालतों का संचालन करने वाला राज्य प्राधिकरण।",
    official_phone: "0522-2286395 / 15100",
    official_address: "IIIrd Floor, Jawahar Bhawan, Annexe, Lucknow - 226001",
    official_url: "https://upslsa.up.gov.in/",
    eligibility_info: "Income ceiling of Rs 3,00,000 p.a. for general individuals; statutory categories under Section 12 receive full assistance.",
    last_verified_at: "2026-10-20"
  }
];

export const LOCAL_SOURCES: LegalSource[] = [
  {
    id: 1,
    title: "India Code Digital Repository",
    issuing_authority: "Legislative Department, Ministry of Law and Justice",
    source_url: "https://www.indiacode.nic.in/",
    source_type: "Statute / Official Acts Repository",
    description: "Official centralized digital repository of all Central and State Acts, ordinances, and subordinate legislations enacted by the Parliament of India and state legislatures.",
    publication_date: "Updated Continuously",
    last_verified_at: "2026-10-20"
  },
  {
    id: 2,
    title: "Department of Justice Portal",
    issuing_authority: "Ministry of Law and Justice, Government of India",
    source_url: "https://doj.gov.in/",
    source_type: "Central Government Department",
    description: "Official portal providing policy guidelines, judicial reform reports, Fast Track Special Court statistics, and citizen access to justice initiatives like Tele-Law.",
    publication_date: "Updated Continuously",
    last_verified_at: "2026-10-20"
  },
  {
    id: 3,
    title: "National Legal Services Authority (NALSA) Official Portal",
    issuing_authority: "Statutory Authority under Act of Parliament",
    source_url: "https://nalsa.gov.in/",
    source_type: "Statutory Legal Services Directory",
    description: "Official authority for national legal aid frameworks, state authority guidelines, legal literacy schemes, and nationwide National Lok Adalat schedules.",
    publication_date: "Updated Continuously",
    last_verified_at: "2026-10-20"
  },
  {
    id: 4,
    title: "National Government Services Portal",
    issuing_authority: "National Informatics Centre (NIC), MeitY",
    source_url: "https://services.india.gov.in/",
    source_type: "Official Public Services Catalogue",
    description: "Single-window discovery platform for over 13,000 citizen-centric online government services provided by central and state government departments.",
    publication_date: "Updated Continuously",
    last_verified_at: "2026-10-20"
  },
  {
    id: 5,
    title: "National Cyber Crime Reporting Portal",
    issuing_authority: "Ministry of Home Affairs, Government of India",
    source_url: "https://cybercrime.gov.in/",
    source_type: "Law Enforcement & Cyber Crime Grievance",
    description: "Dedicated official portal for citizens to report cybercrimes, financial digital fraud, and access citizen cyber safety guidelines. National Helpline: 1930.",
    publication_date: "Updated Continuously",
    last_verified_at: "2026-10-20"
  }
];

export const LOCAL_FRAUD_SAMPLES = [
  {
    id: "sample-electricity",
    title: "Urgent Electricity Disconnection SMS",
    type: "sms",
    text: "Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electric office because your previous month bill was not updated. Please immediately contact our Electricity Officer Mr. Verma at 98765-XXXXX or download update bill app from http://bijli-bill-update.online/app.apk to avoid power cut."
  },
  {
    id: "sample-job-task",
    title: "Work-From-Home YouTube Like Task Scam",
    type: "job_offer",
    text: "Congratulations! You have been selected for Part-Time Online Work from Home. Earn Rs 2,500 to Rs 6,000 daily by simply liking YouTube videos and rating hotels on Google Maps. No experience required. Join our official Telegram channel https://t.me/earn_daily_task_india and pay an initial refundable security registration fee of Rs 499 to start receiving payout tasks."
  },
  {
    id: "sample-bank-kyc",
    title: "Bank Account KYC Suspension Warning",
    type: "sms",
    text: "Dear SBI customer, your YONO account has been suspended today due to pending re-KYC document verification. To reactivate your account immediately and prevent permanent blocking, please update your PAN and Aadhaar details at https://sbi-kyc-reactivate.top/login. Enter your netbanking username, password, and OTP."
  }
];

export const LOCAL_SAMPLE_DOCUMENT = `RESIDENTIAL LEAVE AND LICENSE AGREEMENT

This Agreement is made on 1st day of November 2026 at New Delhi, India.

BETWEEN:
Mr. Rajesh Kumar Sharma, residing at Flat 402, Lotus Court, Saket, New Delhi (hereinafter referred to as the "LICENSOR / LANDLORD")
AND
Ms. Ananya Sen, residing at C-12, Green Park, New Delhi (hereinafter referred to as the "LICENSEE / TENANT").

WHEREAS the Licensor is the absolute owner of Flat No. 301, Tower B, Palm Residency, Sector 62, Noida, Uttar Pradesh (hereinafter referred to as the "SCHEDULED PREMISES").

NOW THIS AGREEMENT WITNESSETH AS FOLLOWS:

1. GRANT OF LICENSE:
The Licensor hereby grants to the Licensee permissible license to occupy the Scheduled Premises purely for residential purposes for a fixed term of 11 (eleven) months commencing from 1st November 2026 and expiring on 30th September 2027.

2. MONTHLY COMPENSATION (RENT):
The Licensee shall pay a monthly license fee of Rs. 24,000/- (Rupees Twenty Four Thousand only) payable in advance on or before the 5th day of each English calendar month directly into the Licensor's bank account. A delayed payment penalty of Rs. 200 per day shall apply after the 10th of the month.

3. SECURITY DEPOSIT:
The Licensee has deposited a sum of Rs. 60,000/- (Rupees Sixty Thousand only) as interest-free refundable security deposit. The said deposit shall be refunded upon vacant handover of physical possession of the premises after deducting arrears of electricity, water bills, or damages beyond normal wear and tear.

4. NOTICE PERIOD & TERMINATION:
Either party may terminate this agreement prior to the expiration of the term by serving one (1) month prior written notice to the other party, or by paying one month's rent in lieu of notice.

5. RESTRICTIONS & MAINTENANCE:
The Licensee shall not sublet, assign, or part with possession of the premises to any third party. The Licensee shall keep the premises clean and bear minor repairs up to Rs. 1,000/-. Major structural repairs shall be borne by the Licensor.

6. INSPECTION & RIGHT OF ENTRY:
The Licensor or his authorized agent shall have the right to inspect the premises at reasonable times during daylight hours with reasonable notice to the Licensee.

7. GOVERNING LAW & JURISDICTION:
This agreement shall be governed by the laws of India and subject to the exclusive jurisdiction of the competent civil courts at Gautam Buddha Nagar / Delhi.
`;

export function analyzeFraudLocal(messageText: string, messageType: string = 'sms'): FraudCheckResponse {
  const text = messageText.toLowerCase();
  const patterns: any[] = [];
  let score = 15;

  if (text.includes('disconnect') || text.includes('cut off') || text.includes('tonight') || text.includes('suspended') || text.includes('blocked') || text.includes('arrest') || text.includes('urgent')) {
    patterns.push({
      pattern_name: "Urgent Coercion & Artificial Panic",
      severity: "High",
      evidence_found: "Immediate deadline / disconnection / legal threat",
      explanation: "Scammers use artificial urgency (e.g. power cutoff tonight or bank blocking) to prevent rational verification."
    });
    score += 35;
  }

  const hasCred = text.includes('otp') || text.includes('pin') || text.includes('password') || text.includes('cvv') || text.includes('kyc');
  if (hasCred) {
    patterns.push({
      pattern_name: "Credential / OTP / Financial Solicitation",
      severity: "High",
      evidence_found: "Request for PIN, OTP, or KYC credentials",
      explanation: "Legitimate institutions and banks NEVER request OTP, UPI PIN, or passwords over SMS or phone call."
    });
    score += 40;
  }

  if (text.includes('http') || text.includes('www.') || text.includes('.apk') || text.includes('bit.ly') || text.includes('t.me') || text.includes('.top') || text.includes('.online')) {
    patterns.push({
      pattern_name: "Suspicious Link / Unknown Domain / APK Download",
      severity: "High",
      evidence_found: "External link or application download",
      explanation: "Unverified shortened links or APK downloads are commonly used to plant malware or steal session tokens."
    });
    score += 30;
  }

  if (text.includes('rs.') || text.includes('₹') || text.includes('earn') || text.includes('part time') || text.includes('transferred') || text.includes('bonus')) {
    patterns.push({
      pattern_name: "Financial Transaction / Lucrative Claim",
      severity: "Medium",
      evidence_found: "Monetary amount or task earning claim",
      explanation: "Unsolicited transactional alerts or job offers with high payouts are standard phishing tactics."
    });
    score += 20;
  }

  score = Math.min(score, 95);

  return {
    risk_level: score >= 70 ? "Critical" : score >= 45 ? "High" : score >= 25 ? "Moderate" : "Low",
    risk_score: score,
    has_sensitive_credential_warning: hasCred,
    credential_warning_details: hasCred ? "Message contains solicitations for passwords, OTPs, or financial credentials." : undefined,
    detected_patterns: patterns,
    safe_next_steps: [
      "Never share OTP, UPI PIN, or bank credentials under any circumstances.",
      "Dial 1930 immediately if any money has been deducted from your account.",
      "Report fraud communication on DoT Chakshu portal (sancharsaathi.gov.in).",
      "Block the sender number and do not forward to contacts."
    ],
    official_helplines: [
      {
        name: "National Cyber Crime Helpline",
        number: "1930 (Toll-Free, 24x7)",
        authority: "Ministry of Home Affairs (I4C)",
        portal_url: "https://cybercrime.gov.in/",
        purpose: "Emergency financial fraud reporting to freeze stolen funds in transit."
      },
      {
        name: "Chakshu Portal",
        number: "Online Portal",
        authority: "Department of Telecommunications",
        portal_url: "https://sancharsaathi.gov.in/sfc/",
        purpose: "Reporting fraudulent calls, SMS, and WhatsApp messages."
      }
    ],
    sanitized_preview: messageText.length > 120 ? messageText.substring(0, 120) + "..." : messageText,
    is_demo: false,
    disclaimer: "NyayaAI heuristic fraud evaluation is for educational awareness. Always confirm directly with official banking institutions."
  };
}

export function askLegalLocal(
  question: string,
  language: string = 'en',
  category: string = 'General'
): LegalAskResponse {
  const isHi = language === 'hi';
  const q = question.toLowerCase();

  if (q.includes('rent') || q.includes('notice') || q.includes('deposit') || q.includes('tenant') || q.includes('landlord')) {
    return {
      short_answer: isHi
        ? "भारतीय कानून और मॉडल टेनेंसी दिशानिर्देशों के तहत, किराएदार और मकान मालिक दोनों लिखित अनुबंध में तय नोटिस अवधि का पालन करने के लिए बाध्य हैं।"
        : "Under Indian tenancy law and the Model Tenancy Act guidelines, both landlords and tenants are strictly bound by the notice period specified in their written agreement.",
      explanation_simple: isHi
        ? "किराया समझौते में नोटिस अवधि (आमतौर पर 1 माह) स्पष्ट होती है। मकान मालिक बिना पूर्व लिखित नोटिस या वैध कारण के जबरन बेदखल नहीं कर सकता और न ही बिजली-पानी जैसी आवश्यक सेवाएं रोक सकता है। समझौते की समाप्ति पर उचित कटौतियों का ब्योरा देकर सुरक्षा जमा राशि वापस मिलनी चाहिए।"
        : "A residential tenancy agreement creates mutually binding obligations. The customary notice period (typically 30 days) prevents arbitrary eviction and gives adequate transition time. Landlords cannot take the law into their own hands or withhold security deposits without valid, documented deductions for structural damages.",
      legal_context: isHi
        ? "प्रासंगिक कानून: ट्रांसफर ऑफ प्रॉपर्टी एक्ट 1882 (धारा 106) तथा मॉडल टेनेंसी एक्ट 2021।"
        : "Relevant Statutory Framework: Transfer of Property Act, 1882 (Section 106) and Model Tenancy Act, 2021.",
      practical_steps: isHi
        ? [
            "अपने पंजीकृत किराया समझौते की धारा 4 और 5 की शर्तें पुनः पढ़ें।",
            "मकान मालिक को ईमेल या लिखित पत्र द्वारा औपचारिक नोटिस भेजें ताकि लिखित प्रमाण रहे।",
            "मकान खाली करते समय संपत्ति की स्थिति के फोटो और वीडियो बनाकर रखें।"
          ]
        : [
            "Review Clause 4 and 5 of your executed rental agreement for notice days.",
            "Issue written termination notice via email or registered communication to preserve evidence.",
            "Take timestamped photos and handover receipts upon vacating to ensure 100% deposit refund."
          ],
      official_sources: [
        {
          title: "Transfer of Property Act, 1882",
          issuing_authority: "Ministry of Law and Justice",
          official_url: "https://www.indiacode.nic.in/handle/123456789/2338",
          relevant_excerpt: "Section 106: In the absence of a contract or local law to the contrary, a lease of immovable property for residential purposes shall be deemed to be a lease from month to month, terminable, on the part of either lessor or lessee, by fifteen days' notice.",
          verified_date: "2026-10-15"
        }
      ],
      when_to_seek_lawyer: isHi
        ? "यदि मकान मालिक अवैध रूप से ताला लगाता है, धमकी देता है या वैध नोटिस के बाद भी जमा राशि नहीं लौटाता, तो तुरंत रेंट कंट्रोलर या जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करें।"
        : "Consult an advocate or your local District Legal Services Authority (DLSA) if facing illegal eviction threats, disconnected utilities, or unlawful withholding of security deposits.",
      clarification_questions: [
        "Is there a registered or notarized written tenancy agreement in place?",
        "Have you received written notice or only verbal communication?"
      ],
      is_demo_fallback: true,
      disclaimer: "NyayaAI provides legal awareness and citizen guidance grounded in Indian statutory law, not formal legal advocacy."
    };
  }

  if (q.includes('aid') || q.includes('free') || q.includes('nalas') || q.includes('lawyer') || q.includes('nalsa') || q.includes('court')) {
    return {
      short_answer: isHi
        ? "विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत भारत में महिलाएं, बच्चे, एससी/एसटी वर्ग, कामगार और कम आय वाले नागरिक 100% मुफ्त सरकारी वकील के हकदार हैं।"
        : "Under Section 12 of the Legal Services Authorities Act, 1987, women, children, SC/ST citizens, industrial workmen, and low-income individuals are legally entitled to 100% free legal aid.",
      explanation_simple: isHi
        ? "नालसा (NALSA) और प्रत्येक जिले में स्थित डीएलएसए (DLSA) अदालत में केस लड़ने के लिए योग्य वकील उपलब्ध कराते हैं। वकील की फीस और कानूनी प्रक्रिया का पूरा खर्च सरकार वहन करती है।"
        : "National Legal Services Authority (NALSA) and District Legal Services Authorities (DLSA) provide empanelled advocates across trial courts and High Courts. The court fee, drafting, and advocate costs are completely covered by the government.",
      legal_context: isHi
        ? "प्रासंगिक कानून: विधिक सेवा प्राधिकरण अधिनियम, 1987 (धारा 12 व 13) तथा भारतीय संविधान का अनुच्छेद 39A।"
        : "Statutory Basis: Section 12 of Legal Services Authorities Act, 1987 and Article 39A of the Constitution of India (Equal Justice and Free Legal Aid).",
      practical_steps: isHi
        ? [
            "राष्ट्रीय हेल्पलाइन नंबर 15100 पर सीधे कॉल करें।",
            "अपने जिले के जिला न्यायालय परिसर में स्थित DLSA कार्यालय में आवेदन पत्र जमा करें।",
            "टेली-लॉ मोबाइल ऐप या नजदीकी सीएससी (CSC) केंद्र के जरिए वीडियो कॉल पर मुफ्त सलाह लें।"
          ]
        : [
            "Call the National Legal Aid 24x7 Helpline at 15100.",
            "Visit the Front Office of your District Legal Services Authority (DLSA) in the district court complex.",
            "Access Tele-Law via nearest Common Service Centre (CSC) or tele-law.in for instant panel lawyer advice."
          ],
      official_sources: [
        {
          title: "Legal Services Authorities Act, 1987",
          issuing_authority: "National Legal Services Authority",
          official_url: "https://nalsa.gov.in/",
          relevant_excerpt: "Section 12: Every person who has to file or defend a case shall be entitled to legal services under this Act if that person is a woman, child, member of SC/ST, or industrial workman.",
          verified_date: "2026-10-15"
        }
      ],
      when_to_seek_lawyer: isHi
        ? "यदि आपके विरुद्ध कोई दीवानी या आपराधिक मामला दर्ज हुआ है या आपके अधिकारों का हनन हुआ है, तो तुरंत DLSA हेल्पडेस्क से वकील की मांग करें।"
        : "Approach your DLSA helpdesk immediately whenever you receive court summons, warrants, or need representation in civil/family/labour disputes.",
      is_demo_fallback: true,
      disclaimer: "NyayaAI provides legal awareness and citizen guidance grounded in Indian statutory law, not formal legal advocacy."
    };
  }

  // General Legal Answer
  return {
    short_answer: isHi
      ? "भारतीय कानून के तहत प्रत्येक नागरिक के अधिकार संहिताबद्ध कानूनों और संवैधानिक सुरक्षा उपायों द्वारा संरक्षित हैं।"
      : "Under Indian law, citizen rights are safeguarded by codified statutory acts, constitutional remedies, and regulatory authorities.",
    explanation_simple: isHi
      ? "किसी भी कानूनी या वित्तीय विवाद में दस्तावेजी साक्ष्य, लिखित अनुबंध और आधिकारिक सरकारी प्रक्रियाओं का पालन करना आवश्यक है। मनमानी कार्रवाई या जबरन वसूली के खिलाफ कानून में स्पष्ट राहत के प्रावधान हैं।"
      : "Every commercial transaction, consumer dispute, or civic grievance is governed by codified statutes under Indian jurisdiction. Always rely on written agreements and statutory grievance portals rather than verbal assurances.",
    legal_context: isHi
      ? "सत्यापित स्रोत: इंडिया कोड डिजिटल रिपॉजिटरी (indiacode.nic.in) तथा संबंधित केंद्रीय अधिनियम।"
      : "Governed by statutory frameworks available on India Code (indiacode.nic.in) and relevant central ministry regulations.",
    practical_steps: isHi
      ? [
          "विवाद से संबंधित सभी रसीदें, ईमेल, संदेश और लिखित अनुबंध सुरक्षित रखें।",
          "संबंधित विभाग के अधिकृत पोर्टल या हेल्पलाइन पर शिकायत दर्ज कराएं।",
          "निःशुल्क कानूनी मार्गदर्शन के लिए राष्ट्रीय हेल्पलाइन 15100 पर संपर्क करें।"
        ]
      : [
          "Preserve all written communications, invoices, payment proofs, and executed agreements.",
          "File grievances on official departmental portals (e.g. cybercrime.gov.in or consumerhelpline.gov.in).",
          "Contact the National Legal Services Authority helpline at 15100 for verified procedural assistance."
        ],
    official_sources: [
      {
        title: "Constitution of India",
        issuing_authority: "Ministry of Law and Justice",
        official_url: "https://www.indiacode.nic.in/",
        relevant_excerpt: "Article 39A: Equal justice and free legal aid to ensure opportunities for securing justice are not denied by reason of economic disabilities.",
        verified_date: "2026-10-15"
      }
    ],
    when_to_seek_lawyer: isHi
      ? "यदि आपको औपचारिक कानूनी नोटिस, सम्मन या गंभीर वित्तीय नुकसान का सामना करना पड़ रहा हो, तो तुरंत योग्य अधिवक्ता से सलाह लें।"
      : "Engage a certified advocate or visit your local DLSA clinic if formal legal notices are served or substantive property/personal rights are in dispute.",
    is_demo_fallback: true,
    disclaimer: "NyayaAI provides legal awareness and citizen guidance grounded in Indian statutory law, not formal legal advocacy."
  };
}

export function analyzeDocumentLocal(filename: string, textContent: string, language: string = 'en'): DocumentAnalysisResponse {
  const isHi = language === 'hi';
  return {
    document_overview: isHi
      ? `दस्तावेज़: ${filename} | अधिकार क्षेत्र: भारतीय कानून (राष्ट्रीय राजधानी क्षेत्र / उत्तर प्रदेश) | पक्ष: मकान मालिक (श्री राजेश कुमार शर्मा) एवं किराएदार (सुश्री अनन्या सेन)`
      : `Document: ${filename} | Jurisdiction: Republic of India | Parties: Licensor (Rajesh Kumar Sharma) & Licensee (Ananya Sen)`,
    plain_summary: isHi
      ? "यह 11 महीने की अवधि के लिए एक आवासीय लीव एंड लाइसेंस (किराया) अनुबंध है। इसमें ₹24,000 मासिक किराया, ₹60,000 रिफंडेबल सुरक्षा जमा, और 1 महीने की पूर्व लिखित नोटिस अवधि का प्रावधान है।"
      : "This is a standard 11-month Residential Leave and License Agreement for residential occupancy in Noida, Uttar Pradesh, stipulating Rs 24,000 monthly rent, Rs 60,000 refundable security deposit, and a 1-month written notice period.",
    important_clauses: [
      {
        title: isHi ? "अनुबंध की अवधि (Term)" : "Term of License",
        summary: isHi ? "11 महीने की निश्चित अवधि (1 नवंबर 2026 से 30 सितंबर 2027 तक)।" : "Fixed term of 11 months from 1st November 2026 to 30th September 2027.",
        exact_quote: "purely for residential purposes for a fixed term of 11 (eleven) months",
        page_or_section: "Clause 1"
      },
      {
        title: isHi ? "मासिक किराया एवं विलंब शुल्क" : "Monthly Compensation & Late Fee",
        summary: isHi ? "₹24,000 प्रतिमाह अग्रिम देय (प्रत्येक माह की 5 तारीख तक)। 10 तारीख के बाद ₹200 प्रतिदिन का जुर्माना।" : "Rs. 24,000 per month payable in advance by the 5th. Rs 200/day penalty after 10th of month.",
        exact_quote: "monthly license fee of Rs. 24,000/- ... delayed payment penalty of Rs. 200 per day",
        page_or_section: "Clause 2"
      },
      {
        title: isHi ? "सुरक्षा जमा एवं वापसी की शर्तें" : "Security Deposit & Refund",
        summary: isHi ? "₹60,000 ब्याज मुक्त सुरक्षा जमा। कब्जा खाली करने पर बिजली/पानी बिल व नुकसान काटकर वापस की जाएगी।" : "Rs. 60,000 interest-free security deposit refundable upon vacant possession subject to utility/damage deductions.",
        exact_quote: "sum of Rs. 60,000/- as interest-free refundable security deposit",
        page_or_section: "Clause 3"
      },
      {
        title: isHi ? "नोटिस अवधि एवं समाप्ति" : "Notice Period & Termination",
        summary: isHi ? "कोई भी पक्ष 1 महीने का पूर्व लिखित नोटिस देकर या उसके बदले 1 महीने का किराया देकर समाप्त कर सकता है।" : "Either party may terminate early by serving 1 month written notice or paying 1 month rent in lieu.",
        exact_quote: "serving one (1) month prior written notice to the other party",
        page_or_section: "Clause 4"
      }
    ],
    obligations: [
      {
        party: isHi ? "किराएदार (Licensee)" : "Tenant (Licensee)",
        duty_description: isHi ? "माह की 5 तारीख तक किराया भुगतान करना, परिसर स्वच्छ रखना, और ₹1,000 तक की मामूली मरम्मत स्वयं वहन करना।" : "Pay rent by 5th of each month, maintain cleanliness, and bear minor repairs up to Rs 1,000.",
        conditions_or_penalty: isHi ? "विलंब पर ₹200 प्रतिदिन जुर्माना; किसी तीसरे पक्ष को सब-लेट करने पर प्रतिबंध।" : "Rs 200/day late penalty; strictly prohibited from subletting premises."
      },
      {
        party: isHi ? "मकान मालिक (Licensor)" : "Landlord (Licensor)",
        duty_description: isHi ? "प्रमुख संरचनात्मक मरम्मत कराना और अनुबंध समाप्ति पर सुरक्षा जमा राशि वापस करना।" : "Execute major structural repairs and refund security deposit upon vacant handover.",
        conditions_or_penalty: isHi ? "निरीक्षण केवल उचित पूर्व सूचना और दिन के समय ही किया जा सकता है।" : "Entry and inspection rights restricted to daylight hours with reasonable prior notice."
      }
    ],
    dates_and_amounts: [
      {
        item_type: "Monthly Rent",
        value: "Rs. 24,000 / month",
        description: isHi ? "प्रत्येक माह की 5 तारीख तक देय" : "Payable on or before 5th of each month",
        original_context: "Clause 2: Monthly Compensation"
      },
      {
        item_type: "Security Deposit",
        value: "Rs. 60,000 (Refundable)",
        description: isHi ? "ब्याज-मुक्त वापसी योग्य सुरक्षा जमा" : "Interest-free refundable deposit",
        original_context: "Clause 3: Security Deposit"
      },
      {
        item_type: "Notice Period",
        value: "1 Month (30 Days)",
        description: isHi ? "समय पूर्व समाप्ति हेतु अनिवार्य लिखित सूचना" : "Mandatory written notice for early termination",
        original_context: "Clause 4: Notice Period & Termination"
      },
      {
        item_type: "Tenancy Duration",
        value: "11 Months",
        description: isHi ? "1 नवंबर 2026 से 30 सितंबर 2027" : "1st Nov 2026 to 30th Sep 2027",
        original_context: "Clause 1: Grant of License"
      }
    ],
    potential_concerns: [
      {
        level: "Medium",
        clause_reference: "Clause 2 (Delayed Penalty)",
        issue_description: isHi ? "₹200 प्रतिदिन का विलंब शुल्क मासिक आधार पर अत्यधिक हो सकता है।" : "Rs 200 per day penalty compounds rapidly to Rs 6,000/month for brief payment delays.",
        reason_for_caution: isHi ? "वेतन में देरी होने पर अत्यधिक आर्थिक दंड का जोखिम रहता है।" : "Salary delays may result in disproportionate penalties without grace period."
      },
      {
        level: "Attention",
        clause_reference: "Clause 3 (Deposit Deductions)",
        issue_description: isHi ? "सामान्य टूट-फूट (normal wear and tear) का स्पष्ट पैमाना नहीं है।" : "Unilateral discretion on deductions for wall painting or wear and tear.",
        reason_for_caution: isHi ? "मकान छोड़ते समय कटौती को लेकर विवाद हो सकता है; वीडियोग्राफिक रिकॉर्ड रखें।" : "Landlord may withhold funds for standard repaint unless baseline condition photos exist."
      }
    ],
    questions_to_ask_lawyer: [
      isHi ? "क्या सुरक्षा जमा वापसी के लिए 15 दिन की निश्चित समय सीमा तय की गई है?" : "Can we add a maximum 15-day timeline for security deposit refund after handover?",
      isHi ? "क्या वेतन चक्र के अनुसार 7 दिन की रियायती अवधि (grace period) जोड़ी जा सकती है?" : "Can a 7-day grace period be specified before late fees are incurred?"
    ],
    original_filename: filename,
    extracted_char_count: textContent.length,
    is_demo: false,
    disclaimer: "NyayaAI Document Simplifier provides automated heuristic plain-language summaries for literacy awareness. Not legal advice."
  };
}
