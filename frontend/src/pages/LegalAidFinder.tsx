import React, { useState, useEffect } from 'react';
import {
  Scale,
  Search,
  PhoneCall,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Users,
  Info,
  Building,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';
import { api } from '../services/api';
import { LegalAidResource } from '../types';

export const LegalAidFinder: React.FC = () => {
  const { language, demoScenario } = useApp();
  const [resources, setResources] = useState<LegalAidResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (demoScenario === 'scenario-c') {
      setSelectedState('Delhi');
      setSelectedCategory('All');
    }
  }, [demoScenario]);

  const states = [
    'All',
    'Delhi',
    'Maharashtra',
    'Karnataka',
    'Uttar Pradesh',
    'All India'
  ];

  const categories = [
    'All',
    'SLSA',
    'NALSA Apex Authority',
    'Tele-Law E-Portal'
  ];

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.searchLegalAid(
        selectedState !== 'All' ? selectedState : undefined,
        selectedCategory !== 'All' ? selectedCategory : undefined,
        searchQuery || undefined
      );
      setResources(data);
    } catch (err: any) {
      setError('Could not fetch legal aid directory. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [selectedState, selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResources();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-slate-900 text-white">
            <Scale className="w-5 h-5 text-orange-500" />
          </span>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'निःशुल्क कानूनी सहायता निर्देशिका (विधिक सेवा प्राधिकरण)' : 'Find Free Legal Aid Directory'}
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          {language === 'hi'
            ? 'विधिक सेवा प्राधिकरण अधिनियम, 1987 के तहत पात्र नागरिकों हेतु निःशुल्क सरकारी वकील व कानूनी सहायता केंद्र।'
            : 'Locate verified statutory legal aid authorities, Tele-Law centers, and free court advocates across India.'}
        </p>
      </div>

      {/* Statutory Section 12 Explainer Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md space-y-3">
        <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Right Under Section 12 (Legal Services Authorities Act, 1987)</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold">
          {language === 'hi'
            ? 'भारत में किसे निःशुल्क कानूनी सहायता और वकील पाने का अधिकार है?'
            : 'Who is Statutorily Entitled to 100% Free Legal Representation in Court?'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong className="text-white block mb-0.5">Women & Children</strong>
            <span>All women and children regardless of financial income level.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong className="text-white block mb-0.5">SC & ST Citizens</strong>
            <span>Members of Scheduled Castes and Scheduled Tribes across all jurisdictions.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong className="text-white block mb-0.5">Industrial Workmen</strong>
            <span>Factory workers, laborers, and persons with disabilities or mental illness.</span>
          </div>
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
            <strong className="text-white block mb-0.5">Low-Income Citizens</strong>
            <span>Individuals with annual income below State statutory limits (typically ₹3 Lakh p.a.).</span>
          </div>
        </div>
      </div>

      {/* Search & Location Filters */}
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
                  ? 'प्राधिकरण का नाम, जिला या पता खोजें (उदा. "Delhi", "Patiala House", "High Court")...'
                  : 'Search by organization name, city, or address (e.g., "Delhi", "Patiala House", "Lok Adalat")...'
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

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Filter by State/UT:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-hidden"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
          {error}
        </div>
      )}

      {/* Resources Cards Grid */}
      {loading ? (
        <div className="py-12 text-center space-y-2">
          <div className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-500">Searching verified legal aid directories...</p>
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 space-y-2">
          <Scale className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No legal aid authorities found for this filter</h3>
          <p className="text-xs text-slate-500">
            Dial National Toll-Free Helpline <strong>15100</strong> to reach your local District Legal Services Authority directly.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-orange-300 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Verified {res.last_verified_at}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {language === 'hi' && res.organization_name_hi ? res.organization_name_hi : res.organization_name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <span className="font-semibold text-slate-700">{res.state}</span>
                    {res.district && <span>• {res.district}</span>}
                    <span>• {res.jurisdiction_level} Jurisdiction</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'hi' && res.service_description_hi ? res.service_description_hi : res.service_description}
                </p>

                {/* Helpline Box */}
                <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center gap-2.5 text-xs">
                  <PhoneCall className="w-4 h-4 text-orange-600 shrink-0" />
                  <div>
                    <span className="text-[10px] text-orange-800 font-semibold uppercase tracking-wider block">Official Contact / Helpline:</span>
                    <strong className="text-slate-900 font-mono text-xs">{res.official_phone}</strong>
                  </div>
                </div>

                {/* Physical Address */}
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-snug">{res.official_address}</p>
                </div>

                {/* Eligibility criteria */}
                {res.eligibility_info && (
                  <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-600 leading-relaxed border border-slate-100">
                    <strong className="text-slate-700">Eligibility: </strong>{res.eligibility_info}
                  </div>
                )}
              </div>

              {/* Official Link */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <a
                  href={res.official_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-orange-600 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>Visit Official Portal</span>
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
