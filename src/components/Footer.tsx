import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setPricingModalOpen, themeConfig } = useApp();
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const openLegalModal = (title: string) => {
    setLegalModalTitle(title);
  };

  return (
    <>
      <footer className="bg-slate-950/85 backdrop-blur-xl text-slate-300 font-sans border-t border-white/10 pt-16 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                {themeConfig.customLogoUrl ? (
                  <img
                    src={themeConfig.customLogoUrl}
                    alt={themeConfig.instituteTitle}
                    className="w-10 h-10 object-contain rounded-xl p-0.5 bg-white shadow-xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-rose-500/20">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M2 5h20v2h-2v13h-2V7H6v13H4V7H2V5zm3-3h14v2H5V2zm1 7h12v2H6V9z" />
                    </svg>
                  </div>
                )}
                <div>
                  <span className="font-extrabold text-xl text-white tracking-tight">
                    DAI ICHI <span className="text-rose-500">ACADEMY</span>
                  </span>
                  <span className="ml-1 text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60">
                    CBT
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-rose-400">
                  {themeConfig.instituteTitle}
                </p>
                <p className="text-[11px] text-slate-400 italic">
                  {themeConfig.instituteSlogan}
                </p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                The premier Japanese language training academy and visa consultancy in Khulna. Offering official Computer-Based Testing (CBT) simulators for JFT-Basic, SSW Specified Skilled Worker Tokutei技能 1号, and JLPT candidates.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Prometric CBT Engine Replica</span>
              </div>
            </div>

            {/* Column 2: Platform Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Platform Navigation
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <button onClick={() => navigateTo('landing')} className="hover:text-white transition">
                    Home & Overview
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests')} className="hover:text-white transition">
                    Mock Tests Directory (24+ Sets)
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('tools')} className="hover:text-white transition">
                    25 Free Japanese Tools
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('ai-speaking')} className="hover:text-white transition">
                    AI Speaking & Kaiwa Coach
                  </button>
                </li>
                <li>
                  <button onClick={() => setPricingModalOpen(true)} className="hover:text-white transition">
                    Pricing & Plan Upgrades
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('store')} className="hover:text-white transition">
                    Digital Study Books Store
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('institutes')} className="hover:text-white transition">
                    For Language Academies & B2B
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('blog')} className="hover:text-white transition">
                    Exam Strategy Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Exam Shortcuts */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Exam Track Shortcuts
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'JFT Basic' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>JFT-Basic Prometric</span>
                    <span className="text-[10px] text-emerald-400">8 Sets</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'Irodori Books' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>Irodori Starter A1 & A2</span>
                    <span className="text-[10px] text-slate-500">3 Sets</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'SSW Care Worker' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>SSW Care Worker (Kaigo)</span>
                    <span className="text-[10px] text-amber-400">Skill Test</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'SSW Food Service' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>SSW Food Service & Restaurant</span>
                    <span className="text-[10px] text-amber-400">Skill Test</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'SSW Construction' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>SSW Construction & Safety</span>
                    <span className="text-[10px] text-amber-400">Skill Test</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'SSW Agriculture' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>SSW Agriculture & Crops</span>
                    <span className="text-[10px] text-amber-400">Skill Test</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('mock-tests', { track: 'JLPT Mock Tests' })} className="hover:text-white transition flex items-center justify-between w-full">
                    <span>JLPT N5, N4, N3, N2, N1</span>
                    <span className="text-[10px] text-slate-500">5 Sets</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Accreditations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Legal & Compliance
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                <li>
                  <button onClick={() => openLegalModal('Privacy Policy')} className="hover:text-white transition">
                    Privacy Policy & Data Security
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegalModal('Terms of Service')} className="hover:text-white transition">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegalModal('Report Copyright')} className="hover:text-white transition">
                    Report Copyright / Fair Use Notice
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegalModal('Cookie Preferences')} className="hover:text-white transition">
                    Cookie Preferences
                  </button>
                </li>
                <li>
                  <button onClick={() => openLegalModal('Prometric Disclaimer')} className="hover:text-white transition">
                    Official Prometric Disclaimer
                  </button>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-[10px] text-slate-400 leading-normal">
                Prometric® and Japan Foundation Test for Basic Japanese (JFT-Basic) are registered trademarks. JFT Guru is an independent educational simulation platform designed for student practice and preparation.
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 Dai Ichi Academy Khulna (DAI ICHI ACADEMY CBT). All rights reserved. Japanese Language and Visa Consultancy.</p>
            <p className="flex items-center gap-1">
              <span>Engineered with</span>
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
              <span>for Japanese language aspirants worldwide.</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModalTitle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900">{legalModalTitle}</h3>
              <button
                onClick={() => setLegalModalTitle(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3 max-h-80 overflow-y-auto leading-relaxed pr-1">
              {legalModalTitle === 'Privacy Policy' && (
                <>
                  <p><strong>1. Data Collection & Local Storage:</strong> JFT Guru stores your exam progress, selected answers, audio play count counters, and weak point analytics in your browser’s local storage to enable uninterrupted test-taking even in the event of brief network drops.</p>
                  <p><strong>2. Audio & Microphone Access:</strong> The AI Speaking & Interview Coach requests temporary microphone access strictly via the browser Web Speech API. Voice audio is processed locally and in real time; we do not store or sell your voice recordings.</p>
                  <p><strong>3. Security:</strong> All communications between your client device and our servers use TLS 1.3 encryption.</p>
                </>
              )}
              {legalModalTitle === 'Report Copyright' && (
                <>
                  <p><strong>Fair Use & Educational Purpose:</strong> JFT Guru content is formulated by our pedagogical team based on open syllabus frameworks published by the Japan Foundation (Irodori, Can-do benchmarks) and official Specified Skilled Worker guidelines.</p>
                  <p>If you believe any question or stimulus text infringes your intellectual property, please submit an inquiry to <code>legal@jftguru.com</code> with the question identifier for immediate review.</p>
                </>
              )}
              {legalModalTitle === 'Prometric Disclaimer' && (
                <>
                  <p><strong>Independent Simulation:</strong> JFT Guru is an independent software simulator created to help students familiarize themselves with Computer-Based Testing conditions. We are not officially affiliated with or endorsed by Prometric Inc. or the Japan Foundation.</p>
                  <p>Official exam registration must be executed directly through the official Prometric candidate portal.</p>
                </>
              )}
              {legalModalTitle === 'Cookie Preferences' && (
                <>
                  <p>We use essential functional cookies to keep track of your active mock test attempt, user login session, and subscription tier.</p>
                  <p>Non-essential analytics cookies are optional and may be disabled via the Cookie Banner at any time.</p>
                </>
              )}
              {legalModalTitle === 'Terms of Service' && (
                <>
                  <p>By using JFT Guru, you agree to access mock test materials for personal educational preparation. Reselling or scraping mock exam question databases without prior written authorization is strictly prohibited.</p>
                </>
              )}
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLegalModalTitle(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
