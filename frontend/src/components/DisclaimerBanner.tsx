import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, X } from 'lucide-react';
import { useApp } from '../context/LanguageContext';

export const DisclaimerBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const { language } = useApp();

  if (dismissed) return null;

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-orange-400 shrink-0" />
          <span>
            {language === 'hi' ? (
              <>
                <strong className="text-orange-300">सूचना:</strong> न्यायAI एक कानूनी जागरूकता मंच है। यह किसी पंजीकृत अधिवक्ता द्वारा औपचारिक विधिक सलाह का विकल्प नहीं है।
              </>
            ) : (
              <>
                <strong className="text-orange-300">Legal Awareness Notice:</strong> NyayaAI is an educational citizen guidance platform, not a certified lawyer or court.
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-300">
          <div className="flex items-center gap-1.5 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>NALSA: <strong className="text-white">15100</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span>Cybercrime: <strong className="text-white">1930</strong></span>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-slate-400 hover:text-white p-0.5 rounded transition-colors"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
