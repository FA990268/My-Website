import React from 'react';
import { useApp } from '../context/AppContext';
import { Cookie, Check, X } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const { cookieConsent, setCookieConsent } = useApp();

  // If user has already made a choice, hide banner
  if (cookieConsent !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="glass-panel text-white rounded-[2rem] p-4 sm:p-5 shadow-2xl flex flex-col gap-3 font-sans border border-white/30 backdrop-blur-2xl">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-white/15 border border-white/30 flex items-center justify-center shrink-0 text-white backdrop-blur shadow-sm mt-0.5">
            <Cookie className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Exam Persistence & Cookies</span>
            </h4>
            <p className="text-[11px] text-white/85 mt-1 leading-relaxed">
              JFT Guru uses essential local storage to remember your active 60-minute test timer, Section 1–4 lock status, audio replay counters, and weak point analytics.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/15">
          <button
            onClick={() => setCookieConsent('rejected')}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white/80 hover:text-white glass-capsule-item transition"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => setCookieConsent('accepted')}
            className="px-4 py-1.5 rounded-full text-xs font-bold glass-btn-primary transition flex items-center gap-1 shadow-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
