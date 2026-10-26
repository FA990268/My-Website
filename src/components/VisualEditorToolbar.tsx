import React from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Check, RotateCcw, Sparkles, Layers } from 'lucide-react';

export const VisualEditorToolbar: React.FC = () => {
  const {
    currentUser,
    isAdminAuthenticated,
    isVisualEditMode,
    toggleVisualEditMode,
    resetLayout,
    themeConfig
  } = useApp();

  // Only show toolbar for authorized admin or sensei
  const isAuthorized = isAdminAuthenticated || currentUser.role === 'admin' || currentUser.role === 'teacher';

  if (!isAuthorized) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div
        className={`px-4 py-2 rounded-full border backdrop-blur-2xl transition-all duration-300 shadow-2xl flex items-center gap-3 ${
          isVisualEditMode
            ? 'bg-amber-950/85 border-amber-400 text-amber-200 shadow-amber-500/20'
            : 'bg-slate-900/80 hover:bg-slate-900 border-white/20 text-white shadow-black/40'
        }`}
      >
        <button
          type="button"
          onClick={toggleVisualEditMode}
          className="flex items-center gap-2 text-xs font-bold transition active:scale-95"
        >
          {isVisualEditMode ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <Layers className="w-4 h-4 text-amber-400" />
              <span>In-Context Editor Active</span>
            </>
          ) : (
            <>
              <Edit3 className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-slate-200">Visual Edit Mode</span>
            </>
          )}
        </button>

        {isVisualEditMode && (
          <>
            <div className="h-4 w-px bg-white/20" />

            <button
              type="button"
              onClick={() => resetLayout()}
              title="Reset layout arrangement to factory defaults"
              className="text-[11px] font-semibold text-amber-300 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={toggleVisualEditMode}
              className="px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider transition flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3 h-3" />
              <span>Done</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
