import React from 'react';
import { Scale, ExternalLink, Shield, HeartHandshake, PhoneCall } from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                <Scale className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Nyaya<span className="text-orange-500">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Know Your Rights. Understand the Law. Make Informed Decisions."
            </p>
            <p className="text-[11px] text-slate-500">
              An AI-powered legal awareness & citizen guidance platform demystifying legal provisions, contracts, and public entitlements for every Indian citizen.
            </p>
          </div>

          {/* National Citizens Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-orange-400" />
              Official Helplines (24x7)
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Free Legal Aid (NALSA)</span>
                <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">15100</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>Cyber Financial Fraud</span>
                <span className="font-mono font-bold text-red-400 bg-slate-800 px-2 py-0.5 rounded">1930</span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-slate-800">
                <span>National Consumer Helpline</span>
                <span className="font-mono font-bold text-emerald-400 bg-slate-800 px-2 py-0.5 rounded">1915</span>
              </li>
              <li className="flex justify-between items-center py-1">
                <span>Tele-Law Citizen Support</span>
                <span className="font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded">14417</span>
              </li>
            </ul>
          </div>

          {/* Official Indian Repositories */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
              Official Government Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.indiacode.nic.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>India Code Digital Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://nalsa.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>National Legal Services Authority</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://doj.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>Department of Justice (Govt. of India)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center justify-between"
                >
                  <span>National Cyber Crime Reporting Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Ethics & Privacy Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-orange-400" />
              Ethics & Privacy Assurance
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              NyayaAI strictly adheres to citizen privacy: uploaded documents are processed in secure temporary memory and immediately cleared. No document contents or PII are logged or retained.
            </p>
            <p className="text-[11px] text-slate-500">
              Not an advertisement or solicitation under Bar Council of India rules. Designed strictly for public legal literacy and social benefit.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 NyayaAI. Made with civic dedication for India.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Privacy-Preserving Architecture</span>
            <span>•</span>
            <span>Grounded Official Sources</span>
            <span>•</span>
            <span>Bilingual (English / हिंदी)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
