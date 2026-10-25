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
      <div className="bg-slate-900/95 text-white backdrop-blur border border-slate-700/80 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 font-sans">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center shrink-0 text-rose-400 mt-0.5">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Exam Persistence & Cookies</span>
            </h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              JFT Guru uses essential local storage to remember your active 60-minute test timer, Section 1–4 lock status, audio replay counters, and weak point analytics.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-800">
          <button
            onClick={() => setCookieConsent('rejected')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => setCookieConsent('accepted')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition flex items-center gap-1"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
