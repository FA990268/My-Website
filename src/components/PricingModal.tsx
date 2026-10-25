import React from 'react';
import { useApp } from '../context/AppContext';
import { Check, Crown, Sparkles, Zap, Shield, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PricingModal: React.FC = () => {
  const { pricingModalOpen, setPricingModalOpen, upgradePlan, currentUser } = useApp();

  if (!pricingModalOpen) return null;

  const handleSelectPlan = (tier: 'free' | 'trial' | 'monthly' | 'confidence' | 'pro') => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    upgradePlan(tier === 'free' ? 'free' : 'pro');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 font-sans relative my-8">
        <button
          onClick={() => setPricingModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/60">
            <Crown className="w-3.5 h-3.5 text-rose-600 fill-rose-500" />
            <span>Pass JFT-Basic & SSW On Your First Attempt</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Flexible Plans for Every Exam Candidate
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Choose the package that fits your exam date. All plans include authentic Prometric CBT timers and realistic 2-play audio questions.
          </p>
        </div>

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Plan 1: Free Forever */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Free Tier</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Free Forever</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">$0</span>
                <span className="text-xs text-slate-500">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Ideal for familiarizing yourself with the CBT format and basic tools.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3 Full CBT Mock Tests Free</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5 min Daily AI Speaking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>All 25 Japanese Tools Free</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Instant Scaled Score (250)</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('free')}
              className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              Current Active Tier
            </button>
          </div>

          {/* Plan 2: Trial Plan */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Quick Test</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Trial Pass</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">$1.99</span>
                <span className="text-xs text-slate-500">/ one-time</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Need to test right before your exam date without a monthly commitment.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5 Extra Mock Test Credits</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Access to Paid V.IMP Sets</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI Speaking Coach Preview</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Detailed Answer Explanations</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('trial')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Get Trial Pass
            </button>
          </div>

          {/* Plan 3: Monthly (Most Popular) */}
          <div className="bg-gradient-to-b from-rose-50/50 to-white border-2 border-rose-500 rounded-2xl p-5 flex flex-col justify-between space-y-4 relative shadow-lg shadow-rose-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-600 to-red-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
              Most Popular • 92% Pass
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Recommended</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Monthly Pass</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">$4.99</span>
                <span className="text-xs text-slate-500">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Complete unlimited access for candidates taking the exam this month.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>All 114+ Mock Sets Unlocked</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Unlimited AI Speaking Coach</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Automated Weak Point Analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>All SSW Sectors & JLPT Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Ad-Free Fast Loading Experience</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('monthly')}
              className="w-full py-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Unlock Monthly Pass</span>
            </button>
          </div>

          {/* Plan 4: Confidence 3-Month Plan */}
          <div className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition shadow-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">Best Value</span>
              <h3 className="text-lg font-black text-slate-900 mt-1">Confidence 3-Mo</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">$11.99</span>
                <span className="text-xs text-slate-500">/ 3 months</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Just $3.99/mo. Perfect for 90-day study sprints and guaranteed pass.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>90 Days Unlimited CBT Exams</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free E-Book Bundle Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Priority Audio Server Bandwidth</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pass Guarantee Free Extension</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => handleSelectPlan('confidence')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
            >
              Get 3-Month Plan
            </button>
          </div>
        </div>

        {/* Security & Guarantee Footer */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 text-center">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Encrypted 256-bit SSL Checkout</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant 1-Click Access Activation</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>30,000+ Students Trusted Worldwide</span>
          </span>
        </div>
      </div>
    </div>
  );
};
