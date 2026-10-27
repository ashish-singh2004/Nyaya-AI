import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Trash2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';
import { api } from '../services/api';
import { LegalAskResponse, ChatMessage } from '../types';

export const AskLegal: React.FC = () => {
  const { language } = useApp();
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('General legal awareness');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversation, setConversation] = useState<Array<{ question: string; answer: LegalAskResponse }>>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const categories = [
    'General legal awareness',
    'Rental and housing',
    'Employment & workplace',
    'Consumer rights & refunds',
    'Cybercrime & digital fraud',
    'Government services'
  ];

  const sampleQuestions = [
    {
      label: 'Rental Notice Period',
      q: language === 'hi'
        ? 'किराया समझौते में नोटिस अवधि और सुरक्षा जमा वापसी के क्या नियम हैं?'
        : 'What are the rules regarding notice period and security deposit refund in a residential rental agreement?'
    },
    {
      label: 'Suspicious Payment Link',
      q: language === 'hi'
        ? 'यदि मुझे बिजली बिल कटने का संदिग्ध मैसेज या लिंक मिला है, तो क्या करूं?'
        : 'What immediate steps should I take if I receive a suspicious payment link claiming my electricity will be cut off?'
    },
    {
      label: 'Free Legal Aid Rights',
      q: language === 'hi'
        ? 'अदालत में निःशुल्क सरकारी वकील पाने के लिए कौन पात्र है?'
        : 'Who is eligible to receive free legal aid and advocate representation under Indian law?'
    },
    {
      label: 'Employment Salary Delay',
      q: language === 'hi'
        ? 'नौकरी छोड़ने के बाद कंपनी कितने दिनों में पूरा हिसाब (Full & Final) करने के लिए बाध्य है?'
        : 'Under Indian labour law, within how many days must an employer settle full and final dues after resignation or termination?'
    }
  ];

  const handleSubmit = async (e?: React.FormEvent, customQ?: string) => {
    if (e) e.preventDefault();
    const query = customQ || question;
    if (!query.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.askLegal(
        query.trim(),
        language,
        category,
        chatHistory,
        false
      );

      setConversation(prev => [...prev, { question: query, answer: response }]);
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: query },
        { role: 'assistant', content: response.short_answer }
      ]);
      setQuestion('');
    } catch (err: any) {
      setError(err.message || 'Failed to fetch legal information. Please verify your connection or try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setConversation([]);
    setChatHistory([]);
    setError(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-900 text-white">
              <MessageSquare className="w-5 h-5 text-orange-500" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'hi' ? 'बुद्धिमान कानूनी सूचना सहायक' : 'Intelligent Legal Information Assistant'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'सत्यापित भारतीय कानूनों, विधिक सेवा प्राधिकरणों और आधिकारिक पोर्टल के आधार पर स्पष्ट मार्गदर्शन।'
              : 'Grounded in codified Indian statutes, central acts, and verified legal authorities.'}
          </p>
        </div>

        {conversation.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg border border-slate-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{language === 'hi' ? 'वार्तालाप साफ़ करें' : 'Clear Conversation'}</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {language === 'hi' ? 'विषय श्रेणी चुनें:' : 'Select Legal Domain:'}
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Questions */}
      {conversation.length === 0 && (
        <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>{language === 'hi' ? 'अक्सर पूछे जाने वाले प्रश्न:' : 'Common Citizen Questions (Click to Ask):'}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleQuestions.map((sq, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuestion(sq.q);
                  handleSubmit(undefined, sq.q);
                }}
                className="text-left p-2.5 bg-white hover:bg-orange-50/60 rounded-lg border border-slate-200 hover:border-orange-300 text-xs text-slate-800 transition-all shadow-xs flex flex-col justify-between"
              >
                <span className="font-semibold text-slate-900 mb-1 text-[11px] text-orange-600">
                  {sq.label}
                </span>
                <span className="line-clamp-2">{sq.q}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Conversation Thread */}
      <div className="space-y-6">
        {conversation.map((item, idx) => (
          <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {/* User Question */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-slate-900 text-white rounded-2xl rounded-tr-xs px-4 py-3 max-w-2xl shadow-sm text-sm">
                <p className="font-medium">{item.question}</p>
              </div>
            </div>

            {/* Assistant Response Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Short Answer */}
              <div className="border-l-4 border-orange-500 pl-4 py-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                  {language === 'hi' ? 'त्वरित सारांश' : 'Short Answer'}
                </span>
                <p className="text-base font-semibold text-slate-900 mt-1 leading-snug">
                  {item.answer.short_answer}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                  {language === 'hi' ? 'सरल भाषा में व्याख्या' : 'Plain-Language Explanation'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {item.answer.explanation_simple}
                </p>
              </div>

              {/* Relevant Legal Context */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {language === 'hi' ? 'प्रासंगिक कानूनी संदर्भ' : 'Relevant Statutory Framework'}
                </h4>
                <div className="text-xs text-slate-700 bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl leading-relaxed">
                  {item.answer.legal_context}
                </div>
              </div>

              {/* Practical Next Steps */}
              {item.answer.practical_steps && item.answer.practical_steps.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {language === 'hi' ? 'नागरिक हेतु व्यावहारिक कदम' : 'Practical Next Steps'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {item.answer.practical_steps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Verified Sources Cards */}
              {item.answer.official_sources && item.answer.official_sources.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-orange-600" />
                    {language === 'hi' ? 'आधिकारिक सत्यापित स्रोत' : 'Grounded Official Sources'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.answer.official_sources.map((src, srcIdx) => (
                      <div
                        key={srcIdx}
                        className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 text-xs space-y-1.5 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 text-xs">{src.title}</span>
                          <a
                            href={src.official_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-orange-600 hover:text-orange-700 inline-flex items-center gap-1 font-semibold text-[11px]"
                          >
                            <span>Verify</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        <p className="text-[11px] text-slate-500">Authority: {src.issuing_authority}</p>
                        <p className="text-[11px] text-slate-600 italic bg-white p-2 rounded border border-slate-100">
                          "{src.relevant_excerpt}"
                        </p>
                        <div className="text-[10px] text-slate-400">Verified: {src.verified_date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* When to Seek a Professional */}
              {item.answer.when_to_seek_lawyer && (
                <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl text-xs space-y-1 text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{language === 'hi' ? 'वकील या विधिक सहायता से कब संपर्क करें' : 'When to Consult an Advocate / Legal Aid'}</span>
                  </div>
                  <p className="leading-relaxed pl-5 text-[11px] text-amber-800">
                    {item.answer.when_to_seek_lawyer}
                  </p>
                </div>
              )}

              {/* Disclaimer footer on answer */}
              <div className="text-[10px] text-slate-400 pt-2 flex items-center justify-between border-t border-slate-100">
                <span>{item.answer.disclaimer}</span>
                {item.answer.is_demo_fallback && (
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    Grounded Rule Engine
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Question Input Form */}
      <form onSubmit={handleSubmit} className="sticky bottom-4 z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-2 flex items-center gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'अपना कानूनी सवाल यहाँ लिखें (उदा. "किराया समझौता कैसे समाप्त करें?")...'
                : 'Ask a legal question in plain English or Hindi (e.g., "What should I check before signing a lease?")...'
            }
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!question.trim() || loading}
            className="px-4 py-2.5 bg-slate-900 hover:bg-orange-600 disabled:opacity-40 disabled:hover:bg-slate-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span className="hidden sm:inline">Grounding...</span>
              </>
            ) : (
              <>
                <span>{language === 'hi' ? 'पूछें' : 'Ask'}</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          Jurisdiction: India. Official Grounded Retrieval. No personal data logged.
        </p>
      </form>
    </div>
  );
};
