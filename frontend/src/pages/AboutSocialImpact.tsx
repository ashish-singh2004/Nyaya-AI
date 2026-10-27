import React from 'react';
import {
  Scale,
  ShieldCheck,
  Globe2,
  Lock,
  HeartHandshake,
  AlertTriangle,
  BookOpen,
  Users2,
  ExternalLink,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const AboutSocialImpact: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-semibold">
          <HeartHandshake className="w-3.5 h-3.5 text-orange-600" />
          <span>Social Impact & Responsible AI in Legal Tech</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          {language === 'hi'
            ? 'न्यायAI: सामाजिक उद्देश्य, नैतिक AI और विधिक साक्षरता'
            : 'Bridging the Justice Gap with Responsible AI'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {language === 'hi'
            ? 'भारतीय समाज में कानूनी जागरूकता और डिजिटल सेवाओं के मध्य भाषा और साक्षरता की बाधाओं को दूर करने का एक नागरिक-केंद्रित प्रयास।'
            : 'Empowering ordinary Indian citizens with transparent, grounded, and privacy-preserving legal comprehension.'}
        </p>
      </div>

      {/* The 6 Core Social Problems Addressed */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-orange-600" />
          The Social Challenges We Tackle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">1. Complex Legalese & Document Anxiety</h4>
            <p className="leading-relaxed">
              Standard agreements are dense with archaic phrases. Ordinary tenants, gig workers, and job applicants frequently sign contracts containing one-sided indemnity or forfeiture clauses simply because they cannot decipher them.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">2. Language Barriers in Justice</h4>
            <p className="leading-relaxed">
              While Indian laws and standard contracts are largely drafted in English, over 80% of citizens speak and comprehend Hindi or regional languages. NyayaAI bridges this divide by providing plain-language explanations in Hindi and English.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">3. Hidden Free Legal Aid Channels</h4>
            <p className="leading-relaxed">
              Millions of citizens are legally entitled to 100% free advocate representation under Section 12 of the Legal Services Authorities Act, 1987, yet remain unaware that NALSA and DLSA clinics exist across every district in India.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">4. Exploitation via Digital Fraud</h4>
            <p className="leading-relaxed">
              Cyber fraudsters exploit fear of the law — threatening immediate power disconnection or fake police arrest warrants — to siphon savings. NyayaAI demystifies these tactics with transparent evidence and helpline links.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">5. Fragmentation of Public Welfare Schemes</h4>
            <p className="leading-relaxed">
              Deserving street vendors, youth apprentices, and farmers frequently miss out on subsidized loans and welfare grants due to scattered information across dozens of departmental websites.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
            <h4 className="font-bold text-slate-900 text-sm">6. High Cost of Initial Legal Consultation</h4>
            <p className="leading-relaxed">
              Even a preliminary consultation with a private advocate can cost thousands of rupees, pricing out lower-income families before they even understand their basic statutory rights.
            </p>
          </div>
        </div>
      </div>

      {/* Responsible AI Principles in Sensitive Legal Domain */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-6 shadow-xl">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
            Ethical Guardrails & AI Safety
          </span>
          <h2 className="text-2xl font-bold">How NyayaAI Prevents AI Hallucinations in Law</h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            In medical and legal applications, general-purpose LLMs can cause real harm by inventing plausible-sounding case names, fictitious section numbers, or non-existent precedents. Here is how NyayaAI guarantees integrity:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <FileCheck2 className="w-5 h-5 text-orange-400" />
            <h4 className="font-bold text-white text-sm">Mandatory Source Grounding</h4>
            <p className="text-slate-300 leading-relaxed">
              The AI is provided with verified statutory excerpts from official portals (India Code, DoJ, NALSA). It is strictly instructed never to invent a citation not in the grounded knowledge base.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h4 className="font-bold text-white text-sm">Explicit Uncertainty Declaration</h4>
            <p className="text-slate-300 leading-relaxed">
              If an inquiry falls outside verified statutory provisions, the system explicitly labels the answer as general awareness and urges consultation with an advocate rather than guessing.
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <h4 className="font-bold text-white text-sm">Ephemeral Data Pipeline</h4>
            <p className="text-slate-300 leading-relaxed">
              Uploaded files are parsed in isolated temporary disk directories with guaranteed deletion in Python <code>try...finally</code> blocks. No user document contents are stored in databases or logs.
            </p>
          </div>
        </div>
      </div>

      {/* Bar Council of India Compliance & Human in the Loop */}
      <div className="bg-orange-50/60 border border-orange-200 rounded-2xl p-6 space-y-3 text-xs text-slate-700">
        <div className="flex items-center gap-2 text-orange-800 font-bold text-sm">
          <ShieldCheck className="w-4 h-4 text-orange-600" />
          <span>Bar Council of India Regulations & Scope Limitation</span>
        </div>
        <p className="leading-relaxed">
          Under the Advocates Act, 1961 and the Bar Council of India Rules, the right to practice law before courts and tender professional legal advice is reserved exclusively for registered advocates. NyayaAI is designed strictly as an <strong>information and civic empowerment utility</strong>. It does not solicit legal business, advertise legal services, or issue certified legal opinions.
        </p>
        <p className="leading-relaxed text-slate-500">
          Whenever a citizen faces formal court proceedings, eviction notices, police summons, or complex contract negotiations, NyayaAI proactively directs them to qualified advocates or the nearest State Legal Services Authority.
        </p>
      </div>
    </div>
  );
};
