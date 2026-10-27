import React from 'react';
import { X, Sparkles, FileText, ShieldAlert, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const DemoScenarioModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, triggerDemoScenario, language } = useApp();

  if (!isDemoModalOpen) return null;

  const scenarios = [
    {
      id: 'scenario-a',
      icon: FileText,
      badge: 'Document Simplifier',
      badgeColor: 'bg-blue-100 text-blue-800',
      title: language === 'hi' ? 'परिदृश्य 1: किराया समझौता सरलीकरण' : 'Scenario A: Rental Agreement Simplification',
      desc: language === 'hi'
        ? '11 महीने के आवासीय रेंट एग्रीमेंट का स्वतः विश्लेषण, 1 महीने की नोटिस अवधि, सुरक्षा जमा और जोखिम धाराओं का निरीक्षण।'
        : 'Automated breakdown of an 11-month residential tenancy agreement, highlighting notice period, security deposit refund terms, and one-sided clauses.',
      actionText: language === 'hi' ? 'परिदृश्य A चलाएं' : 'Run Scenario A'
    },
    {
      id: 'scenario-b',
      icon: ShieldAlert,
      badge: 'Fraud Awareness',
      badgeColor: 'bg-red-100 text-red-800',
      title: language === 'hi' ? 'परिदृश्य 2: बिजली बिल कटने की फर्जी धमकी SMS' : 'Scenario B: Suspicious Electricity Bill SMS',
      desc: language === 'hi'
        ? 'रात 9:30 बजे बिजली कटने की धमकी वाले संदेश की जांच, फर्जी ऐप (.apk) का पता लगाना और 1930 हेल्पलाइन पर शिकायत के निर्देश।'
        : 'Real-time analysis of an urgent power disconnection scam SMS with an unverified .apk link, detecting artificial panic and reverse-payment indicators.',
      actionText: language === 'hi' ? 'परिदृश्य B चलाएं' : 'Run Scenario B'
    },
    {
      id: 'scenario-c',
      icon: Scale,
      badge: 'Legal Aid Finder',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      title: language === 'hi' ? 'परिदृश्य 3: धारा 12 के तहत निःशुल्क कानूनी सहायता' : 'Scenario C: Free Legal Aid Under Section 12',
      desc: language === 'hi'
        ? 'नालसा (NALSA) और दिल्ली राज्य विधिक सेवा प्राधिकरण (DSLSA) के हेल्पलाइन नंबर 15100 और निःशुल्क सरकारी वकील की पात्रता का सत्यापन।'
        : 'Instant lookup of verified National and State Legal Services Authorities providing free court representation under the Legal Services Authorities Act, 1987.',
      actionText: language === 'hi' ? 'परिदृश्य C चलाएं' : 'Run Scenario C'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-orange-600/30 text-orange-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-orange-400">
                Judges & Hackathon Reviewers
              </span>
            </div>
            <h3 className="text-xl font-bold">Interactive Demo Scenarios</h3>
            <p className="text-xs text-slate-300 mt-1">
              Select any pre-configured scenario to test NyayaAI features with 1-click verified data.
            </p>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="text-slate-400 hover:text-white p-2 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenarios List */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {scenarios.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="border border-slate-200 hover:border-orange-300 rounded-xl p-4 transition-all hover:shadow-md bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-xs shrink-0">
                    <Icon className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badgeColor}`}>
                        {s.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => triggerDemoScenario(s.id)}
                  className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-semibold rounded-lg transition-all shadow-xs"
                >
                  <span>{s.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Deterministic verified fallbacks active — works seamlessly with or without API keys.</span>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
