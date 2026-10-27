import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Calendar,
  IndianRupee,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Lock,
  FileCheck,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';
import { api } from '../services/api';
import { DocumentAnalysisResponse } from '../types';

export const DocumentSimplifier: React.FC = () => {
  const { language, demoScenario } = useApp();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<DocumentAnalysisResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses' | 'obligations' | 'financials' | 'concerns' | 'questions'>('summary');
  const [sampleLoading, setSampleLoading] = useState(false);

  useEffect(() => {
    if (demoScenario === 'scenario-a') {
      handleLoadSample();
    }
  }, [demoScenario]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
    }
  };

  const handleAnalyze = async (fileToProcess?: File) => {
    const targetFile = fileToProcess || file;
    if (!targetFile) {
      setError('Please select a PDF, Word (.docx), or Text document to simplify.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.analyzeDocument(targetFile, language, false);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || 'Failed to analyze document. Ensure the file is not corrupted or password-protected.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setSampleLoading(true);
    setError(null);
    try {
      const sample = await api.getSampleDocument();
      const blob = new Blob([sample.content], { type: 'text/plain' });
      const sampleFile = new File([blob], 'residential_tenancy_agreement.txt', { type: 'text/plain' });
      setFile(sampleFile);
      await handleAnalyze(sampleFile);
    } catch (err: any) {
      setError('Could not load sample document: ' + err.message);
    } finally {
      setSampleLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-900 text-white">
              <FileText className="w-5 h-5 text-orange-500" />
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              {language === 'hi' ? 'कानूनी दस्तावेज़ सरलीकरण' : 'Legal Document Simplifier'}
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'hi'
              ? 'किराया समझौते, अनुबंध और कानूनी नोटिस के मुख्य बिंदु, तारीखें और जोखिम बिंदु समझें।'
              : 'Extract obligations, notice periods, security deposit terms, and red flags in plain language.'}
          </p>
        </div>

        {/* 1-Click Sample Rental Agreement Trigger */}
        <button
          onClick={handleLoadSample}
          disabled={sampleLoading || loading}
          className="flex items-center gap-1.5 px-3 py-2 bg-orange-50 border border-orange-200 hover:bg-orange-100 text-orange-800 text-xs font-semibold rounded-xl transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>{sampleLoading ? 'Loading Sample...' : 'Try Sample Rental Agreement'}</span>
        </button>
      </div>

      {/* Privacy Notice Card */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Privacy & Ephemeral Security:</strong> Your uploaded document is parsed in secure temporary memory and purged immediately after processing. We do not persist, log, or share document contents.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-dashed border-slate-300 hover:border-orange-400 transition-colors text-center space-y-4">
        <div className="mx-auto w-12 h-12 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600">
          <Upload className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            {file ? file.name : (language === 'hi' ? 'दस्तावेज़ फ़ाइल चुनें या यहाँ खींचें' : 'Select or drag your legal document here')}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Supported formats: PDF (.pdf), Microsoft Word (.docx), Plain Text (.txt) — Max 15MB
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <label className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow-xs">
            <span>Browse Files</span>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {file && (
            <button
              onClick={() => handleAnalyze()}
              disabled={loading}
              className="px-5 py-2 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Analyzing clauses...</span>
                </>
              ) : (
                <>
                  <span>Analyze Document</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Structured Analysis Results */}
      {analysis && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
          {/* Header Summary Bar */}
          <div className="bg-slate-900 text-white p-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-600/30 text-orange-400 border border-orange-500/30">
                {analysis.original_filename}
              </span>
              <span className="text-xs text-slate-400">
                Extracted Characters: {analysis.extracted_char_count.toLocaleString()}
              </span>
            </div>
            <h2 className="text-xl font-bold">{analysis.document_overview}</h2>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-700">
              {analysis.plain_summary}
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="px-6 border-b border-slate-200 flex flex-wrap gap-2 text-xs font-semibold">
            {[
              { id: 'summary', label: 'Plain Summary' },
              { id: 'clauses', label: `Clauses & Quotes (${analysis.important_clauses.length})` },
              { id: 'obligations', label: `Obligations (${analysis.obligations.length})` },
              { id: 'financials', label: `Dates & Amounts (${analysis.dates_and_amounts.length})` },
              { id: 'concerns', label: `Potential Concerns (${analysis.potential_concerns.length})` },
              { id: 'questions', label: 'Questions for Lawyer' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-orange-600 text-orange-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div className="px-6 pb-6">
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Document Overview & Core Terms</h3>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>{analysis.plain_summary}</p>
                </div>
              </div>
            )}

            {activeTab === 'clauses' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Extracted Clauses with Original Passage Verification</h3>
                <div className="space-y-3">
                  {analysis.important_clauses.map((clause, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{clause.title}</h4>
                        {clause.page_or_section && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            {clause.page_or_section}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700">{clause.summary}</p>
                      <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[11px] text-slate-600 italic">
                        <span className="font-semibold text-slate-800 not-italic">Original passage: </span>
                        "{clause.exact_quote}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'obligations' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Reciprocal Obligations Between Parties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.obligations.map((ob, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {ob.party}
                      </span>
                      <p className="text-xs text-slate-800 font-medium leading-relaxed mt-1">
                        {ob.duty_description}
                      </p>
                      {ob.conditions_or_penalty && (
                        <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <strong className="text-slate-700">Conditions / Penalty: </strong>
                          {ob.conditions_or_penalty}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Extracted Amounts, Deadlines & Notice Periods</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {analysis.dates_and_amounts.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {item.item_type}
                      </span>
                      <div className="text-base font-bold text-slate-900">{item.value}</div>
                      <p className="text-xs text-slate-600">{item.description}</p>
                      {item.original_context && (
                        <p className="text-[10px] text-slate-400 italic pt-1">{item.original_context}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'concerns' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Potential Ambiguities & Cautionary Provisions</h3>
                <div className="space-y-3">
                  {analysis.potential_concerns.map((c, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-200 text-amber-900">
                          {c.level} Attention
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{c.clause_reference}</h4>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed">{c.issue_description}</p>
                      <p className="text-[11px] text-amber-800 font-medium">
                        <strong>Reason for Caution: </strong>{c.reason_for_caution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'questions' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Questions to Ask a Professional Before Signing</h3>
                <ul className="space-y-2 text-xs text-slate-700">
                  {analysis.questions_to_ask_lawyer.map((q, idx) => (
                    <li key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                      <HelpCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Legal Notice */}
          <div className="bg-slate-50 p-4 border-t border-slate-200 text-[11px] text-slate-500">
            {analysis.disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};
