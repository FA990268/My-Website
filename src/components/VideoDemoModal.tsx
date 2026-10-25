import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Pause, RotateCcw, Volume2, Monitor, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';

export const VideoDemoModal: React.FC = () => {
  const { videoDemoModalOpen, setVideoDemoModalOpen, navigateTo } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [step, setStep] = useState(0);

  const demoSteps = [
    {
      title: 'Step 1: Prometric Candidate Check-in & Sound Check',
      description: 'Before the exam begins, you test your headset volume and screen resolution. You cannot bring cellphones or personal notes into the testing hall.',
      badge: 'Test Center Protocol',
      visual: 'sound_check'
    },
    {
      title: 'Step 2: 60-Minute Countdown Clock & Sequential Sections',
      description: 'The 60:00 timer counts down continuously across 4 sections: 1. Script/Vocab, 2. Conversation, 3. Listening, and 4. Reading.',
      badge: 'CBT Navigation',
      visual: 'timer'
    },
    {
      title: 'Step 3: Strict 2-Play Audio Rule in Section 3 (Listening)',
      description: 'Just like the real Prometric exam, audio dialogues can only be played up to 2 times. The play counter locks automatically after 2 plays.',
      badge: 'Listening Audio Control',
      visual: 'audio_limit'
    },
    {
      title: 'Step 4: One-Way Section Locking',
      description: 'When you complete Section 1, 2, or 3, a warning confirmation appears. Once locked, answers in previous sections cannot be reopened.',
      badge: 'Section Lock Rule',
      visual: 'section_lock'
    },
    {
      title: 'Step 5: Instant 0.1s Grading & Scaled Score (200/250)',
      description: 'Immediately upon finishing Section 4, your score is calculated on the 250-point Prometric scale with a pass/fail certificate and weak-point analysis.',
      badge: 'Official Score Report',
      visual: 'score_card'
    }
  ];

  // Auto advance steps if playing
  useEffect(() => {
    if (!videoDemoModalOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % demoSteps.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [videoDemoModalOpen, isPlaying, demoSteps.length]);

  if (!videoDemoModalOpen) return null;

  const currentStep = demoSteps[step];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-white font-sans relative animate-in fade-in zoom-in-95">
        <button
          onClick={() => setVideoDemoModalOpen(false)}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold transition"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">
              Prometric CBT Exam Experience Demo
            </h3>
            <p className="text-xs text-slate-400">
              Interactive 5-step walkthrough of what you will see on test day
            </p>
          </div>
        </div>

        {/* Video Canvas Simulation Screen */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden relative shadow-inner">
          {/* Top Mock Window Bar */}
          <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              <span className="ml-2 font-mono text-[11px] text-slate-400">prometric_cbt_jft_test_room.exe</span>
            </div>
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Timer: 54:12 Remaining</span>
            </div>
          </div>

          {/* Canvas Content Area */}
          <div className="p-6 md:p-8 min-h-[260px] flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-bold uppercase tracking-wider">
                {currentStep.badge}
              </div>
              <h4 className="text-xl font-black text-white tracking-tight">
                {currentStep.title}
              </h4>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
                {currentStep.description}
              </p>
            </div>

            {/* Visual simulation graphics */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
              {currentStep.visual === 'sound_check' && (
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-rose-500 animate-bounce" />
                    <span>Headset Test Sound: 「ただいま、音声のテストを行っています」</span>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 font-bold rounded text-[10px]">
                    Audio OK (100%)
                  </span>
                </div>
              )}
              {currentStep.visual === 'timer' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Overall Exam Progress (Section 2 of 4)</span>
                    <span className="text-white font-mono font-bold">24 / 48 Questions</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-500 to-amber-400 h-full w-1/2"></div>
                  </div>
                </div>
              )}
              {currentStep.visual === 'audio_limit' && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-bold">Prometric Audio Play Limit:</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-rose-600 text-white font-bold rounded text-[10px]">Play 1: Used</span>
                    <span className="px-2 py-1 bg-rose-600 text-white font-bold rounded text-[10px]">Play 2: Used</span>
                    <span className="px-2 py-1 bg-slate-800 text-slate-400 font-bold rounded text-[10px]">🔒 Locked</span>
                  </div>
                </div>
              )}
              {currentStep.visual === 'section_lock' && (
                <div className="flex items-center gap-2 text-xs text-amber-300">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>Warning: Once you click [Proceed to Section 2], Section 1 will be permanently locked!</span>
                </div>
              )}
              {currentStep.visual === 'score_card' && (
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="text-emerald-400 font-black text-lg">224 / 250</span>
                    <span className="ml-2 text-slate-400">(Passing Mark: 200)</span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-black rounded-lg text-xs">
                    PASSED (SSW 1号 Eligible)
                  </span>
                </div>
              )}
            </div>

            {/* Stepper Dots & Player Controls */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                {demoSteps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === step ? 'w-6 bg-rose-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setStep(0)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Ready to experience the real Prometric interface firsthand?
          </p>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => setVideoDemoModalOpen(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex-1 sm:flex-initial"
            >
              Close
            </button>
            <button
              onClick={() => {
                setVideoDemoModalOpen(false);
                navigateTo('mock-tests');
              }}
              className="px-5 py-2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/30 transition flex-1 sm:flex-initial text-center"
            >
              Start Free Mock Test Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
