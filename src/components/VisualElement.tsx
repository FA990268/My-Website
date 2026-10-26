import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowUp, ArrowDown, EyeOff, Eye, Sparkles, Move } from 'lucide-react';

interface VisualElementProps {
  id: string;
  containerId: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
}

export const VisualElement: React.FC<VisualElementProps> = ({
  id,
  containerId,
  label,
  children,
  className = ''
}) => {
  const {
    isVisualEditMode,
    isElementHidden,
    moveElement,
    deleteElement,
    restoreElement
  } = useApp();

  const hidden = isElementHidden(id);

  if (hidden && !isVisualEditMode) {
    return null;
  }

  if (hidden && isVisualEditMode) {
    return (
      <div className="my-3 p-3 rounded-2xl bg-slate-900/60 border-2 border-dashed border-red-500/40 backdrop-blur-md flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <EyeOff className="w-4 h-4 text-red-400" />
          <span className="font-semibold text-slate-200">Hidden Element:</span>
          <span className="font-mono text-slate-400">[{label || id}]</span>
        </div>
        <button
          type="button"
          onClick={() => restoreElement(id)}
          className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-full font-bold transition flex items-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Restore Element</span>
        </button>
      </div>
    );
  }

  if (!isVisualEditMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative group transition-all duration-200 visual-edit-highlight ${className}`}>
      {/* Floating In-Context Action Capsule Bar */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-30 flex items-center gap-1.5 p-1 rounded-full bg-slate-950/85 backdrop-blur-xl border border-amber-400/50 shadow-2xl transition opacity-90 group-hover:opacity-100 scale-95 group-hover:scale-100">
        <div className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
          <Move className="w-3 h-3 text-amber-400" />
          <span className="max-w-[120px] truncate">{label || id}</span>
        </div>

        {/* Move Up */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            moveElement(containerId, id, 'up');
          }}
          title="Move Up"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20 active:scale-95"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        {/* Move Down */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            moveElement(containerId, id, 'down');
          }}
          title="Move Down"
          className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition border border-white/20 active:scale-95"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>

        {/* Delete / Hide Element */}
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            deleteElement(id);
          }}
          title="Delete / Hide Element"
          className="w-7 h-7 rounded-full bg-red-500/20 hover:bg-red-500/40 text-red-300 flex items-center justify-center transition border border-red-500/30 active:scale-95"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>
      </div>

      {children}
    </div>
  );
};
