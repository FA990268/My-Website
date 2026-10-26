import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastCapsuleProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const ToastCapsule: React.FC<ToastCapsuleProps> = ({ toast, onClose }) => {
  if (!toast) return null;

  return (
    <div className="fixed top-20 right-1/2 translate-x-1/2 sm:translate-x-0 sm:right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="px-5 py-2.5 rounded-full bg-slate-950/85 backdrop-blur-2xl border border-white/20 text-white shadow-2xl flex items-center gap-3 text-xs font-semibold">
        {toast.type === 'success' && (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        )}
        {toast.type === 'error' && (
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
        )}
        {toast.type === 'info' && (
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        )}

        <span className="text-slate-100">{toast.message}</span>

        <button
          type="button"
          onClick={onClose}
          className="ml-2 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
