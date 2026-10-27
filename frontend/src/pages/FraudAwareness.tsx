import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  PhoneCall,
  Lock,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';
import { api } from '../services/api';
import { FraudCheckResponse } from '../types';

export const FraudAwareness: React.FC = () => {
  const { language } = useApp();
  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState('sms');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FraudCheckResponse | null>(null);
  const [samples, setSamples] = useState<Array<{ id: string; title: string; text: string; type: string }>>([]);

  useEffect(() => {
    api.getFraudSamples().then(setSamples).catch(() => {});
  }, []);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || messageText;
    if (!text.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await api.analyzeFraud(text.trim(), messageType, false);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze message. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sampleText: string, type: string) => {
    setMessageText(sampleText);
    setMessageType(type);
    handleAnalyze(sampleText);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-slate-900 text-white">
            <ShieldCheck className="w-5 h-5 text-orange-500" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'साइबर धोखाधड़ी एवं संदिग्ध संदेश विश्लेषक' : 'Fraud Awareness & Message Analyzer'}
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'बिजली बिल कटने, लॉटरी, पार्ट-टाइम जॉब या बैंक केवाईसी के संदिग्ध SMS और WhatsApp संदेशों की तुरंत जांच करें।'
            : 'Inspect suspicious SMS, payment requests, job offers, and APK links using transparent heuristic warning indicators.'}
        </p>
      </div>

      {/* Quick 1-Click Real-world Samples */}
      <div className="bg-slate-100/70 p-4 rounded-xl border border-slate-200 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>{language === 'hi' ? 'वास्तविक धोखाधड़ी संदेशों के नमूने (जांचने के लिए क्लिक करें):' : 'Try Real-World Scam Scenarios (1-Click Test):'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {samples.map((s) => (
            <button
              key={s.id}
              onClick={() => loadSample(s.text, s.type)}
              className="p-2.5 bg-white hover:bg-orange-50/70 border border-slate-200 hover:border-orange-300 rounded-xl text-left transition-all shadow-xs"
            >
              <div className="text-[11px] font-bold text-slate-900">{s.title}</div>
              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{s.text}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
            {language === 'hi' ? 'संदिग्ध संदेश या लिंक यहाँ पेस्ट करें:' : 'Paste Suspicious Message Text or Link:'}
          </label>
          <textarea
            rows={4}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'SMS, ईमेल या व्हाट्सएप संदेश का टेक्स्ट यहाँ पेस्ट करें (उदा. "आपका बिजली कनेक्शन आज रात काट दिया जाएगा...")...'
                : 'Paste message text here (e.g. "Dear consumer, your electricity will be disconnected tonight at 9:30 PM...")...'
            }
            className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-orange-500 font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Type:</span>
            <select
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
              className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
            >
              <option value="sms">SMS Message</option>
              <option value="job_offer">Job / Work Offer</option>
              <option value="payment_request">Payment / QR Request</option>
              <option value="email">Email</option>
              <option value="govt_claim">Govt Scheme Claim</option>
            </select>
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={!messageText.trim() || loading}
            className="px-5 py-2.5 bg-slate-900 hover:bg-orange-600 disabled:opacity-40 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Evaluating patterns...</span>
              </>
            ) : (
              <>
                <span>Analyze Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Results View */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Sensitive Credential Alert if detected */}
          {result.has_sensitive_credential_warning && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-900 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <strong className="text-red-950 font-bold block">
                  CRITICAL SECURITY ALERT: Confidential Credentials Detected
                </strong>
                <p>{result.credential_warning_details}</p>
              </div>
            </div>
          )}

          {/* Risk Level Gauge Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Calculated Risk Assessment
              </span>
              <div className="flex items-center gap-3">
                <span className={`text-2xl font-black ${
                  result.risk_level === 'High Risk'
                    ? 'text-red-600'
                    : result.risk_level === 'Medium Risk'
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}>
                  {result.risk_level}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  Score: {result.risk_score} / 100
                </span>
              </div>
              <p className="text-xs text-slate-500 max-w-md">
                Assessed based on urgency coercion, suspicious domain/APK, credential solicitation, and reverse-payment indicators.
              </p>
            </div>

            {/* Visual Risk Indicator Bar */}
            <div className="w-full sm:w-64 space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Safe</span>
                <span>Suspicious</span>
                <span>High Danger</span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.risk_score >= 60
                      ? 'bg-red-500'
                      : result.risk_score >= 25
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${result.risk_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Detected Patterns */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Identified Warning Patterns ({result.detected_patterns.length})
            </h3>

            {result.detected_patterns.length === 0 ? (
              <p className="text-xs text-slate-500">
                No standard scam patterns or known threat signatures were detected in the submitted text. Always remain cautious.
              </p>
            ) : (
              <div className="space-y-3">
                {result.detected_patterns.map((pat, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{pat.pattern_name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        pat.severity === 'High' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {pat.severity} Severity
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-600 bg-white p-2 rounded border border-slate-200">
                      {pat.evidence_found}
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{pat.explanation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safe Next Steps */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold flex items-center gap-2 text-orange-400">
              <CheckCircle2 className="w-4 h-4" />
              Recommended Immediate Safety Actions
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {result.safe_next_steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-orange-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Helplines Directory */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Official Reporting & Verification Resources</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.official_helplines.map((h, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs">
                  <div className="font-bold text-slate-900">{h.name}</div>
                  <div className="text-base font-extrabold text-orange-600 font-mono">{h.number}</div>
                  <p className="text-[11px] text-slate-500 leading-snug">{h.purpose}</p>
                  <a
                    href={h.portal_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800 hover:text-orange-600 pt-1"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Notice */}
          <div className="text-[10px] text-slate-400 p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            {result.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
