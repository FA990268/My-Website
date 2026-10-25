import React, { useState } from 'react';
import { MockTest } from '../types';
import {
  AlertTriangle,
  Headphones,
  Laptop,
  Clock,
  Lock,
  Volume2,
  CheckCircle2,
  X,
  Play
} from 'lucide-react';

interface PreExamModalProps {
  test: MockTest;
  isOpen: boolean;
  onClose: () => void;
  onConfirmStart: () => void;
}

export const PreExamModal: React.FC<PreExamModalProps> = ({
  test,
  isOpen,
  onClose,
  onConfirmStart
}) => {
  const [testedAudio, setTestedAudio] = useState(false);
  const [isPlayingTestTone, setIsPlayingTestTone] = useState(false);

  if (!isOpen) return null;

  const playTestTone = () => {
    setIsPlayingTestTone(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('音声のテストです。音が聞こえますか。');
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      utterance.onend = () => {
        setIsPlayingTestTone(false);
        setTestedAudio(true);
      };
      utterance.onerror = () => {
        setIsPlayingTestTone(false);
        setTestedAudio(true);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setIsPlayingTestTone(false);
        setTestedAudio(true);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Official Prometric CBT Readiness Check</span>
            </div>
            <h3 className="text-lg font-bold text-white">{test.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              48 Questions • 60 Minutes • Passing: 200/250 Scale
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checklist Content */}
        <div className="p-6 space-y-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
            Please review the Prometric test conditions before launching:
          </p>

          <div className="space-y-3">
            {/* Condition 1 */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="p-2 bg-blue-100 text-blue-700 rounded-lg shrink-0 mt-0.5">
                <Laptop className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">Recommended Device</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Use a desktop or laptop with a mouse for the most authentic CBT Prometric test center experience.
                </p>
              </div>
            </div>

            {/* Condition 2 - Audio Test */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0 mt-0.5">
                <Headphones className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900 text-xs">Headphones & Audio Verification</h4>
                  {testedAudio && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Checked
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Section 3 requires clear sound. Please test your speaker/headphone volume now.
                </p>
                <button
                  type="button"
                  onClick={playTestTone}
                  disabled={isPlayingTestTone}
                  className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded shadow-sm transition disabled:opacity-50"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingTestTone ? 'Playing Audio Check...' : 'Test Japanese Audio Sample'}</span>
                </button>
              </div>
            </div>

            {/* Condition 3 - Timer & Environment */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="p-2 bg-amber-100 text-amber-700 rounded-lg shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 text-xs">60 Continuous Minutes</h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  The clock counts down continuously. Ensure 60 uninterrupted minutes in a quiet environment.
                </p>
              </div>
            </div>

            {/* Condition 4 - Strict Exam Rules */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-red-50 border border-red-200">
              <div className="p-2 bg-red-100 text-red-700 rounded-lg shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-red-900 text-xs">Strict One-Way Section Lock Rule</h4>
                <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                  Once you finish a section and proceed, it is <strong>permanently locked</strong>. You cannot return. Listening audio in Section 3 can only be played <strong>maximum 2 times</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirmStart}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white text-xs font-bold rounded-lg shadow-lg shadow-orange-500/20 flex items-center gap-2 transition"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>I Am Ready — Start Mock Test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
