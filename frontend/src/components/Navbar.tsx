import React, { useState } from 'react';
import {
  Scale,
  MessageSquare,
  FileText,
  Landmark,
  ShieldCheck,
  Building2,
  Info,
  Menu,
  X,
  Sparkles,
  Languages
} from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const { language, setLanguage, activeTab, setActiveTab, setIsDemoModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: language === 'hi' ? 'मुख्य पृष्ठ' : 'Home', icon: Landmark },
    { id: 'ask', label: language === 'hi' ? 'न्यायAI से पूछें' : 'Ask NyayaAI', icon: MessageSquare },
    { id: 'simplifier', label: language === 'hi' ? 'दस्तावेज़ समझें' : 'Document Simplifier', icon: FileText },
    { id: 'schemes', label: language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes', icon: Building2 },
    { id: 'fraud', label: language === 'hi' ? 'धोखाधड़ी से बचाव' : 'Fraud Awareness', icon: ShieldCheck },
    { id: 'legalaid', label: language === 'hi' ? 'कानूनी सहायता' : 'Find Legal Aid', icon: Scale },
    { id: 'about', label: language === 'hi' ? 'उद्देश्य एवं प्रभाव' : 'About', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:bg-slate-800 transition-colors">
              {/* Minimalist scales + speech bubble combination */}
              <Scale className="w-5 h-5 text-orange-500" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center border-2 border-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">
                  Nyaya<span className="text-orange-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 tracking-wider">
                  India
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Legal Awareness & Citizen Assistance
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Controls: Language Selector & Demo Button */}
          <div className="flex items-center gap-2.5">
            {/* Hackathon Demo Preset Trigger */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 hover:border-orange-300 transition-all shadow-xs"
              title="Open Hackathon Demo Scenarios for Judges"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Demo Mode</span>
            </button>

            {/* Language Toggle */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'hi'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
