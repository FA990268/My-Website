import React, { useState, useEffect } from 'react';
import { Volume2, Play, Lock, AlertCircle } from 'lucide-react';
import { listeningAudioController } from '../lib/audioService';

interface RestrictedAudioPlayerProps {
  questionId: string;
  audioUrl?: string;
  audioScript: string;
  playCount: number; // 0, 1, or 2
  onPlayIncrement: () => void;
  disabled?: boolean;
}

export const RestrictedAudioPlayer: React.FC<RestrictedAudioPlayerProps> = ({
  questionId,
  audioUrl,
  audioScript,
  playCount,
  onPlayIncrement,
  disabled = false
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const playsRemaining = Math.max(0, 2 - playCount);
  const isLocked = playsRemaining <= 0;

  // Stop any active audio when switching questions or unmounting
  useEffect(() => {
    return () => {
      listeningAudioController.stopAll();
      setIsPlaying(false);
      setProgress(0);
    };
  }, [questionId]);

  const handlePlay = () => {
    if (disabled || isLocked || isPlaying) return;

    // Increment play count immediately in app context
    onPlayIncrement();
    setIsPlaying(true);
    setProgress(0);

    listeningAudioController.playTrack(
      audioUrl,
      audioScript,
      (prog, curr, dur) => {
        setProgress(prog);
        setCurrentTime(curr);
        setDuration(dur);
      },
      () => {
        setIsPlaying(false);
        setProgress(100);
      },
      () => {
        setIsPlaying(false);
      }
    );
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-700 text-white rounded-lg p-4 shadow-md max-w-xl mx-auto my-3 select-none">
      {/* Player Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-orange-500/20 text-orange-400 rounded-lg">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Listening Comprehension Audio Player
            </h4>
            <p className="text-[11px] text-slate-400">
              Prometric JFT-Basic Official Rule (No rewind, no pause/scrub)
            </p>
          </div>
        </div>

        {/* Plays Remaining Badge */}
        <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border ${
          isLocked
            ? 'bg-red-950/80 text-red-400 border-red-800'
            : playsRemaining === 1
            ? 'bg-amber-950/80 text-amber-300 border-amber-700'
            : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
        }`}>
          {isLocked ? <Lock className="w-3.5 h-3.5" /> : null}
          <span>Plays Remaining: {playsRemaining}/2</span>
        </div>
      </div>

      {/* Main Controls & Non-interactive Progress Bar */}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlay}
            disabled={disabled || isLocked || isPlaying}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-150 shadow-md ${
              isPlaying
                ? 'bg-orange-500 text-white animate-pulse cursor-not-allowed'
                : isLocked
                ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 text-white active:scale-95'
            }`}
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                <span>Audio Playing...</span>
              </>
            ) : isLocked ? (
              <>
                <Lock className="w-4 h-4" />
                <span>Audio Locked (0/2)</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play Audio Clip</span>
              </>
            )}
          </button>

          {/* Time indicator */}
          <div className="text-xs font-mono text-slate-400">
            {isPlaying || progress > 0 ? (
              <span>{formatSeconds(currentTime)} / {formatSeconds(duration || 15)}</span>
            ) : (
              <span>--:--</span>
            )}
          </div>
        </div>

        {/* STRICT NON-INTERACTIVE READ-ONLY PROGRESS BAR */}
        <div className="space-y-1">
          <div
            className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 pointer-events-none cursor-default"
            title="Read-only progress bar (Seeking and rewinding are disabled per official exam rules)"
          >
            <div
              className={`h-full transition-all duration-200 ease-linear ${
                isPlaying ? 'bg-orange-500' : progress === 100 ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Read-only track (No scrubbing)</span>
            <span>{isLocked ? 'Audio limit reached' : isPlaying ? 'Playing' : 'Ready'}</span>
          </div>
        </div>

        {/* Warning notification */}
        {isLocked ? (
          <div className="flex items-center gap-2 p-2 bg-red-950/40 border border-red-900/60 rounded text-xs text-red-300">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>
              You have used both audio plays for this question. The audio is now permanently locked. Please choose your answer below.
            </span>
          </div>
        ) : (
          <div className="text-[11px] text-slate-400 italic">
            * Once started, audio plays continuously to the end. You can listen a maximum of 2 times.
          </div>
        )}
      </div>
    </div>
  );
};
