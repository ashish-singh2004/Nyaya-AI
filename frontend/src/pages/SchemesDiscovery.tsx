import React, { useState, useEffect } from 'react';
import {
  Building2,
  Search,
  Filter,
  ExternalLink,
  FileCheck,
  CheckCircle2,
  Calendar,
  Users,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';
import { api } from '../services/api';
import { Scheme } from '../types';

export const SchemesDiscovery: React.FC = () => {
  const { language } = useApp();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('All India');

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी श्रेणियां' : 'All Categories' },
    { id: 'farmer', label: language === 'hi' ? 'किसान (Farmers)' : 'Farmers' },
    { id: 'student', label: language === 'hi' ? 'विद्यार्थी (Students)' : 'Students' },
    { id: 'women', label: language === 'hi' ? 'महिलाएं (Women)' : 'Women' },
    { id: 'worker', label: language === 'hi' ? 'श्रमिक (Workers)' : 'Workers' },
    { id: 'small_business', label: language === 'hi' ? 'छोटे व्यापारी (MSME)' : 'Small Business' },
    { id: 'general', label: language === 'hi' ? 'सामान्य नागरिक' : 'General Public' },
  ];

  const states = [
    'All India',
    'Delhi',
    'Maharashtra',
    'Uttar Pradesh',
    'Karnataka',
    'Rajasthan',
    'West Bengal',
    'Tamil Nadu',
    'Bihar'
  ];

  const fetchSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.searchSchemes(
        searchQuery || undefined,
        selectedCategory !== 'all' ? selectedCategory : undefined,
        selectedState !== 'All India' ? selectedState : undefined
      );
      setSchemes(data);
    } catch (err: any) {
      setError('Could not retrieve schemes catalogue. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedCategory, selectedState]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSchemes();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-slate-900 text-white">
            <Building2 className="w-5 h-5 text-orange-500" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'सरकारी योजना खोज एवं सेवा कैटलॉग' : 'Government Scheme Discovery'}
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'सत्यापित केंद्रीय और राज्य कल्याणकारी योजनाएं, पात्रता शर्तें और आधिकारिक आवेदन लिंक।'
            : 'Verified central and state citizen welfare schemes, statutory benefits, and direct application portals.'}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'योजना का नाम या लाभ खोजें (उदा. "किसान", "आवास", "स्वास्थ्य")...'
                  : 'Search by scheme name, keyword, or benefit (e.g. "Kisan", "Housing", "Health")...'
              }
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-900 hover:bg-orange-600 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            {language === 'hi' ? 'खोजें' : 'Search'}
          </button>
        </form>

        {/* Categories & State Dropdowns */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === c.id
                    ? 'bg-orange-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-500 font-medium">State/UT:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Schemes Results Grid */}
      {loading ? (
        <div className="py-12 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Searching verified government catalogue...</p>
        </div>
      ) : schemes.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-2">
          <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No schemes matched your search criteria</h3>
          <p className="text-xs text-slate-500">Try selecting "All Categories" or searching a broader term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-orange-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                    {scheme.beneficiary_category.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Verified {scheme.last_verified_at}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'hi' && scheme.name_hi ? scheme.name_hi : scheme.name}
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                    {language === 'hi' && scheme.issuing_department_hi ? scheme.issuing_department_hi : scheme.issuing_department}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi' && scheme.description_hi ? scheme.description_hi : scheme.description}
                </p>

                {/* Eligibility */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                  <span className="font-bold text-slate-800 text-[11px]">Eligibility Summary:</span>
                  <p className="text-slate-600 text-[11px]">
                    {language === 'hi' && scheme.eligibility_summary_hi ? scheme.eligibility_summary_hi : scheme.eligibility_summary}
                  </p>
                </div>

                {/* Benefits */}
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <span className="font-bold text-emerald-900 text-[11px]">Key Benefits:</span>
                  <p className="text-emerald-800 text-[11px]">
                    {language === 'hi' && scheme.benefits_summary_hi ? scheme.benefits_summary_hi : scheme.benefits_summary}
                  </p>
                </div>

                {scheme.required_documents && (
                  <div className="text-[11px] text-slate-500">
                    <strong>Required Documents: </strong>{scheme.required_documents}
                  </div>
                )}
              </div>

              {/* Direct Official Apply Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  Coverage: {scheme.state_ut}
                </span>

                <a
                  href={scheme.application_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
