import React, { useState } from 'react';
import {
  MessageSquare,
  FileText,
  Building2,
  ShieldCheck,
  Scale,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Lock,
  Globe2,
  FileCheck2,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const Dashboard: React.FC = () => {
  const { setActiveTab, setIsDemoModalOpen, language } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const featureCards = [
    {
      id: 'ask',
      icon: MessageSquare,
      title: language === 'hi' ? 'कानूनी सवाल पूछें' : 'Ask a Legal Question',
      desc: language === 'hi'
        ? 'किराया, रोजगार, उपभोक्ता अधिकार और सरकारी सेवाओं से जुड़े सवाल पूछें और सरल भाषा में उत्तर पाएं।'
        : 'Get straightforward, plain-language answers grounded in codified Indian statutes and constitutional rights.',
      badge: language === 'hi' ? 'सत्यापित स्रोत' : 'Grounded AI',
      color: 'border-blue-200 hover:border-blue-400 group-hover:text-blue-600'
    },
    {
      id: 'simplifier',
      icon: FileText,
      title: language === 'hi' ? 'दस्तावेज़ सरल करें' : 'Simplify a Document',
      desc: language === 'hi'
        ? 'किरायानामा, नौकरी का अनुबंध या कानूनी नोटिस अपलोड करें और महत्वपूर्ण तारीखों व जोखिमों को समझें।'
        : 'Upload residential lease agreements or employment contracts to extract obligations, notice periods, and red flags.',
      badge: language === 'hi' ? 'गोपनीय विश्लेषण' : 'Ephemeral Processing',
      color: 'border-orange-200 hover:border-orange-400 group-hover:text-orange-600'
    },
    {
      id: 'schemes',
      icon: Building2,
      title: language === 'hi' ? 'सरकारी योजनाएं खोजें' : 'Explore Government Schemes',
      desc: language === 'hi'
        ? 'किसान, छात्र, महिला, कामगार और छोटे व्यापारियों के लिए सत्यापित कल्याणकारी योजनाओं की सूची।'
        : 'Search verified central and state welfare initiatives with transparent eligibility, benefits, and direct links.',
      badge: language === 'hi' ? 'सीधा आवेदन' : 'Verified Catalogue',
      color: 'border-emerald-200 hover:border-emerald-400 group-hover:text-emerald-600'
    },
    {
      id: 'fraud',
      icon: ShieldCheck,
      title: language === 'hi' ? 'संदिग्ध संदेश जांचें' : 'Check a Suspicious Message',
      desc: language === 'hi'
        ? 'बिजली बिल कटने, नौकरी या फर्जी लॉटरी के SMS व लिंक को परखें और साइबर हेल्पलाइन 1930 की सहायता लें।'
        : 'Evaluate deceptive SMS, APK links, and fake disconnection threats with evidence-based risk indicators.',
      badge: language === 'hi' ? 'साइबर सुरक्षा' : 'Risk Engine',
      color: 'border-red-200 hover:border-red-400 group-hover:text-red-600'
    },
    {
      id: 'legalaid',
      icon: Scale,
      title: language === 'hi' ? 'मुफ्त कानूनी सहायता' : 'Find Free Legal Aid',
      desc: language === 'hi'
        ? 'विधिक सेवा प्राधिकरण अधिनियम की धारा 12 के तहत निःशुल्क सरकारी वकील व सहायता केंद्र खोजें।'
        : 'Locate official National and State Legal Services Authorities providing free court representation under law.',
      badge: language === 'hi' ? 'नालसा 15100' : 'Statutory Aid',
      color: 'border-purple-200 hover:border-purple-400 group-hover:text-purple-600'
    }
  ];

  const faqs = [
    {
      q: language === 'hi' ? 'क्या न्यायAI किसी वकील का विकल्प है?' : 'Does NyayaAI replace a registered advocate?',
      a: language === 'hi'
        ? 'नहीं। न्यायAI केवल एक कानूनी साक्षरता और सूचनात्मक मंच है। यह आपको आपके कानूनी अधिकारों और प्रक्रियाओं को समझने में मदद करता है। किसी भी न्यायालयीन मामले या औपचारिक अनुबंध के लिए बार काउंसिल में पंजीकृत अधिवक्ता से ही परामर्श लें।'
        : 'No. NyayaAI is strictly an educational legal awareness and citizen empowerment tool. It helps you understand statutory provisions and documents, but does not provide formal legal counsel or advocate-client representation.'
    },
    {
      q: language === 'hi' ? 'क्या मेरे अपलोड किए गए दस्तावेज़ सुरक्षित हैं?' : 'Are uploaded documents stored or retained on your servers?',
      a: language === 'hi'
        ? 'हाँ, पूर्णतः सुरक्षित। दस्तावेज़ों का विश्लेषण केवल अस्थायी मेमोरी (RAM) में होता है और विश्लेषण पूरा होते ही फ़ाइल तुरंत हटा दी जाती है। हम कोई भी दस्तावेज़ या व्यक्तिगत जानकारी स्थायी रूप से स्टोर नहीं करते।'
        : 'Yes, completely secure. Documents are processed exclusively inside isolated temporary working memory and are purged immediately after analysis. We enforce strict zero-retention for uploaded file contents.'
    },
    {
      q: language === 'hi' ? 'निःशुल्क कानूनी सहायता का पात्र कौन है?' : 'Who is entitled to free legal aid in India?',
      a: language === 'hi'
        ? 'विधिक सेवा प्राधिकरण अधिनियम, 1987 की धारा 12 के तहत: महिलाएं, बच्चे, अनुसूचित जाति/जनजाति के सदस्य, औद्योगिक श्रमिक, दिव्यांगजन, हिरासत में रखे गए व्यक्ति और निर्धारित आय सीमा से कम आय वाले नागरिक निःशुल्क कानूनी सहायता के पात्र हैं।'
        : 'Under Section 12 of the Legal Services Authorities Act, 1987, free legal aid is statutory for women, children, members of SC/ST, industrial workmen, persons with disabilities, undertrials, and citizens earning below statutory state income ceilings.'
    },
    {
      q: language === 'hi' ? 'यदि मुझे साइबर धोखाधड़ी का संदेह हो तो क्या करें?' : 'What should I do if I suspect a financial cyber fraud?',
      a: language === 'hi'
        ? 'कभी भी अज्ञात लिंक पर क्लिक न करें या ओटीपी/यूपीआई पिन साझा न करें। यदि कोई संदिग्ध लेनदेन हुआ है, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें और cybercrime.gov.in पर रिपोर्ट करें।'
        : 'Never share OTPs or enter UPI PINs. If money has been fraudulently debited, immediately dial 1930 (National Cyber Crime Helpline) within the golden hour to freeze funds in transit, and register an e-complaint on cybercrime.gov.in.'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-orange-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'भारतीय नागरिकों हेतु कानूनी जागरूकता मंच' : 'Citizen Legal Awareness for India'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white leading-tight">
            {language === 'hi' ? (
              <>कानूनी जानकारी, <span className="text-orange-500">अब सरल</span> और सुलभ।</>
            ) : (
              <>Legal Information, <span className="text-orange-500">Made Understandable.</span></>
            )}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            {language === 'hi'
              ? 'अनुबंध और कानूनी दस्तावेज़ समझें, सरकारी योजनाएं खोजें, फर्जी संदेशों को पहचानें और विश्वसनीय कानूनी सहायता प्राप्त करें — सब एक ही स्थान पर।'
              : 'Understand documents, explore public services, recognize potential scams, and discover trusted legal resources — all in one place.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => setActiveTab('ask')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all shadow-lg shadow-orange-950/40"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{language === 'hi' ? 'न्यायAI से सवाल पूछें' : 'Ask NyayaAI'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('simplifier')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-semibold text-sm transition-all shadow-md"
            >
              <FileText className="w-4 h-4 text-orange-400" />
              <span>{language === 'hi' ? 'दस्तावेज़ सरल करें' : 'Simplify a Document'}</span>
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-orange-400 border border-orange-500/30 text-xs font-semibold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'डेमो परिदृश्य देखें' : 'Judges Demo Mode'}</span>
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              Grounded in Codified Acts
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-orange-400" />
              Zero File Logging / Ephemeral
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-blue-400" />
              Bilingual English & हिंदी
            </span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {language === 'hi' ? 'नागरिक सहायता मॉड्यूल' : 'Core Citizen Assistance Modules'}
          </h2>
          <p className="text-sm text-slate-600">
            {language === 'hi'
              ? 'दैनिक जीवन में कानून और अधिकारों को समझने के लिए विशेष रूप से डिज़ाइन किए गए उपकरण।'
              : 'Empowering every citizen with transparent legal comprehension and verified resources.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => setActiveTab(card.id)}
                className={`group bg-white p-6 rounded-2xl border ${card.color} shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all text-slate-800">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-orange-600">
                  <span>{language === 'hi' ? 'मॉड्यूल खोलें' : 'Open Module'}</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How NyayaAI Works Section */}
      <section className="bg-slate-100 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              System Architecture & Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              {language === 'hi' ? 'न्यायAI कैसे कार्य करता है' : 'How NyayaAI Works'}
            </h2>
            <p className="text-sm text-slate-600">
              {language === 'hi'
                ? 'काल्पनिक या भ्रामक दावों से बचने के लिए 4-स्तरीय सत्यापन प्रक्रिया।'
                : 'A disciplined, 4-tier pipeline preventing hallucinations and ensuring verified legal grounding.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                1
              </span>
              <h4 className="text-sm font-bold text-slate-900">Citizen Input</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                User enters a question or uploads a document (PDF, Word, or Text). Confidential credentials (OTPs, PINs) are flagged and guarded.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                2
              </span>
              <h4 className="text-sm font-bold text-slate-900">Source Retrieval</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Retrieves verified primary sources from India Code, Department of Justice, or NALSA based on the exact subject matter.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                3
              </span>
              <h4 className="text-sm font-bold text-slate-900">Plain-Language Engine</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforms legalese into easy English or Hindi explanations, highlighting obligations, notice periods, and warning signs.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                4
              </span>
              <h4 className="text-sm font-bold text-slate-900">Actionable Guidance</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delivers traceable official links, statutory references, and criteria on when to consult an advocate or approach legal aid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Reliable Sources Matter & Privacy Principles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-orange-600/30 text-orange-400 text-xs font-semibold">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Why Official Grounding Matters</span>
          </div>
          <h3 className="text-xl font-bold text-white">Preventing Hallucinations in the Legal Domain</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Generic AI models frequently invent non-existent court judgments or misattribute section numbers. In the legal sphere, inaccurate advice carries severe real-world consequences for citizens.
          </p>
          <ul className="space-y-2.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Every provision links directly to verified portals like <strong>India Code</strong> (indiacode.nic.in).</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>When a source provision is unverified, NyayaAI explicitly identifies uncertainty rather than guessing.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Strict compliance with Bar Council standards: informative awareness without unauthorized practice of law.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Retention Privacy</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your Documents & Data Remain Private</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Legal documents often contain personal names, property addresses, and financial amounts. NyayaAI enforces strict technical security safeguards:
          </p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Ephemeral Processing:</strong> Uploaded files are processed in isolated temporary directories and purged immediately.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Credential Shielding:</strong> Sensitive credentials (OTPs, PINs, passwords) are automatically masked and flagged.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>No User Account Mandate:</strong> Access all resources without being forced to surrender Aadhaar or phone numbers.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500">Key information on platform capabilities, limitations, and usage.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm text-slate-900 hover:text-orange-600"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
