import React from 'react';
import {
  Scale,
  ShieldCheck,
  HeartHandshake,
  AlertTriangle,
  Lock,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const AboutSocialImpact: React.FC = () => {
  const { language } = useApp();
  const isHi = language === 'hi';

  const socialChallenges = [
    {
      title: isHi ? '1. जटिल कानूनी शब्दावली और अनुबंध का डर' : '1. Complex Legalese & Document Anxiety',
      desc: isHi
        ? 'किरायानामा और रोजगार अनुबंध जटिल व पुरानी कानूनी भाषा में लिखे होते हैं। आम किराएदार और युवा अक्सर बिना समझे ही एकतरफा शर्तों पर हस्ताक्षर कर देते हैं।'
        : 'Standard agreements are dense with archaic phrases. Ordinary tenants, gig workers, and job applicants frequently sign contracts containing one-sided indemnity or forfeiture clauses simply because they cannot decipher them.'
    },
    {
      title: isHi ? '2. न्याय प्रणाली में भाषा की बाधा' : '2. Language Barriers in Justice',
      desc: isHi
        ? 'भारतीय कानून और अनुबंध मुख्यतः अंग्रेजी में तैयार किए जाते हैं, जबकि 80% से अधिक नागरिक हिंदी व क्षेत्रीय भाषाओं में सहज हैं। न्यायAI सरल हिंदी और अंग्रेजी में व्याख्या प्रदान कर इस अंतर को पाटता है।'
        : 'While Indian laws and standard contracts are largely drafted in English, over 80% of citizens speak and comprehend Hindi or regional languages. NyayaAI bridges this divide by providing plain-language explanations in Hindi and English.'
    },
    {
      title: isHi ? '3. निःशुल्क कानूनी सहायता की जानकारी का अभाव' : '3. Hidden Free Legal Aid Channels',
      desc: isHi
        ? 'विधिक सेवा प्राधिकरण अधिनियम 1987 की धारा 12 के तहत करोड़ों नागरिक 100% निःशुल्क सरकारी वकील के पात्र हैं, परंतु जानकारी के अभाव में वे नालसा और डीएलएसए सहायता केंद्रों तक नहीं पहुंच पाते।'
        : 'Millions of citizens are legally entitled to 100% free advocate representation under Section 12 of the Legal Services Authorities Act, 1987, yet remain unaware that NALSA and DLSA clinics exist across every district in India.'
    },
    {
      title: isHi ? '4. डिजिटल धोखाधड़ी और कानून के डर का दुरुपयोग' : '4. Exploitation via Digital Fraud',
      desc: isHi
        ? 'साइबर जालसाज कानून और पुलिस का डर दिखाकर — जैसे बिजली काटने या गिरफ्तारी वारंट की धमकी — लोगों की गाढ़ी कमाई लूटते हैं। न्यायAI पारदर्शी साक्ष्यों और 1930 हेल्पलाइन से नागरिकों को जागरूक करता है।'
        : 'Cyber fraudsters exploit fear of the law — threatening immediate power disconnection or fake police arrest warrants — to siphon savings. NyayaAI demystifies these tactics with transparent evidence and helpline links.'
    },
    {
      title: isHi ? '5. सरकारी कल्याणकारी योजनाओं की बिखरी जानकारी' : '5. Fragmentation of Public Welfare Schemes',
      desc: isHi
        ? 'पात्र रेहड़ी-पटरी वाले, किसान और छात्र विभिन्न मंत्रालयों की वेबसाइटों पर बिखरी जानकारी के कारण सब्सिडी वाले ऋण और सरकारी सहायता से वंचित रह जाते हैं।'
        : 'Deserving street vendors, youth apprentices, and farmers frequently miss out on subsidized loans and welfare grants due to scattered information across dozens of departmental websites.'
    },
    {
      title: isHi ? '6. कानूनी परामर्श की अत्यधिक लागत' : '6. High Cost of Initial Legal Consultation',
      desc: isHi
        ? 'निजी वकीलों से शुरुआती कानूनी राय लेने में भी हजारों रुपये खर्च हो जाते हैं, जिससे कम आय वाले परिवार अपने बुनियादी वैधानिक अधिकारों को जानने से पहले ही रुक जाते हैं।'
        : 'Even a preliminary consultation with a private advocate can cost thousands of rupees, pricing out lower-income families before they even understand their basic statutory rights.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
          <span>{isHi ? 'सामाजिक उद्देश्य एवं नैतिक विधिक AI' : 'Social Impact & Responsible AI in Legal Tech'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {isHi
            ? 'न्यायAI: सामाजिक उद्देश्य, नैतिक AI और विधिक साक्षरता'
            : 'Bridging the Justice Gap with Responsible AI'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {isHi
            ? 'भारतीय समाज में कानूनी जागरूकता और डिजिटल सेवाओं के मध्य भाषा और साक्षरता की बाधाओं को दूर करने का एक नागरिक-केंद्रित प्रयास।'
            : 'Empowering ordinary Indian citizens with transparent, grounded, and privacy-preserving legal comprehension.'}
        </p>
      </div>

      {/* The 6 Core Social Problems Addressed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-orange-600" />
          {isHi ? 'प्रमुख सामाजिक चुनौतियाँ जिनका हम समाधान करते हैं' : 'The Social Challenges We Tackle'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          {socialChallenges.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
              <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
              <p className="leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsible AI Principles in Sensitive Legal Domain */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            {isHi ? 'नैतिक सुरक्षा एवं AI सुरक्षा मानक' : 'Ethical Guardrails & AI Safety'}
          </span>
          <h2 className="text-2xl font-bold">
            {isHi ? 'न्यायAI कानूनी मामलों में AI भ्रम (Hallucinations) को कैसे रोकता है?' : 'How NyayaAI Prevents AI Hallucinations in Law'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            {isHi
              ? 'चिकित्सा और कानूनी क्षेत्र में सामान्य LLM काल्पनिक धाराएं या नकली फैसले बनाकर गंभीर नुकसान पहुंचा सकते हैं। न्यायAI इन 3 मजबूत सुरक्षा स्तंभों पर आधारित है:'
              : 'In medical and legal applications, general-purpose LLMs can cause real harm by inventing plausible-sounding case names, fictitious section numbers, or non-existent precedents. Here is how NyayaAI guarantees integrity:'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <FileCheck2 className="w-5 h-5 text-orange-400" />
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'सत्यापित वैधानिक स्रोतों पर आधारित (RAG)' : 'Mandatory Source Grounding'}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {isHi
                ? 'AI को केवल आधिकारिक पोर्टलों (इंडिया कोड, विधि विभाग, नालसा) के सत्यापित अंश दिए जाते हैं। बिना स्रोत के कोई धारा या फैसला नहीं गढ़ा जाता।'
                : 'The AI is provided with verified statutory excerpts from official portals (India Code, DoJ, NALSA). It is strictly instructed never to invent a citation not in the grounded knowledge base.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'स्पष्ट अनिश्चितता की घोषणा' : 'Explicit Uncertainty Declaration'}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {isHi
                ? 'यदि किसी प्रश्न का तथ्य अस्पष्ट हो, तो सिस्टम तुक्का लगाने के बजाय स्पष्ट बताता है कि क्या स्पष्टीकरण चाहिए और वकील से परामर्श की सिफारिश करता है।'
                : 'If an inquiry falls outside verified statutory provisions, the system explicitly labels the answer as general awareness and urges consultation with an advocate rather than guessing.'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">
              {isHi ? 'अस्थायी व गोपनीय डेटा पाइपलाइन' : 'Ephemeral Data Pipeline'}
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {isHi
                ? 'अपलोड किए गए दस्तावेज़ केवल अस्थायी मेमोरी में प्रोसेस होते हैं और तुरंत नष्ट कर दिए जाते हैं। कोई भी व्यक्तिगत दस्तावेज़ डेटाबेस में स्टोर नहीं होता।'
                : 'Uploaded files are parsed in isolated temporary disk directories with guaranteed deletion in Python try...finally blocks. No user document contents are stored in databases or logs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bar Council of India Compliance & Human in the Loop */}
      <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-6 space-y-3 text-xs text-slate-700">
        <div className="flex items-center gap-2 text-orange-800 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          <span>{isHi ? 'बार काउंसिल ऑफ इंडिया नियम एवं विधिक सीमाएं' : 'Bar Council of India Regulations & Scope Limitation'}</span>
        </div>
        <p className="leading-relaxed">
          {isHi
            ? 'अधिवक्ता अधिनियम, 1961 और बार काउंसिल ऑफ इंडिया के नियमों के तहत, न्यायालयों में वकालत करने और पेशेवर कानूनी सलाह देने का अधिकार केवल पंजीकृत अधिवक्ताओं के पास है। न्यायAI को केवल एक विधिक सूचना एवं नागरिक जागरूकता मंच के रूप में तैयार किया गया है।'
            : 'Under the Advocates Act, 1961 and the Bar Council of India Rules, the right to practice law before courts and tender professional legal advice is reserved exclusively for registered advocates. NyayaAI is designed strictly as an information and civic empowerment utility. It does not solicit legal business, advertise legal services, or issue certified legal opinions.'}
        </p>
        <p className="leading-relaxed text-slate-500">
          {isHi
            ? 'जब भी कोई नागरिक औपचारिक अदालती मुकदमे, बेदखली नोटिस, पुलिस समन या जटिल अनुबंध विवाद का सामना करता है, न्यायAI उन्हें योग्य अधिवक्ता या निकटतम जिला विधिक सेवा प्राधिकरण (DLSA) से संपर्क करने का निर्देश देता है।'
            : 'Whenever a citizen faces formal court proceedings, eviction notices, police summons, or complex contract negotiations, NyayaAI proactively directs them to qualified advocates or the nearest State Legal Services Authority.'}
        </p>
      </div>
    </div>
  );
};
