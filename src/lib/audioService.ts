/**
 * Restricted Audio Playback Manager for JFT-Basic CBT Section 3 (Listening)
 * - Maximum 2 plays allowed per question
 * - Read-only progress indicator
 * - No rewind or seeking allowed
 * - Supports actual audio URLs (.mp3, .wav) with graceful Web Speech Synthesis fallback for Japanese
 */

export interface AudioPlaybackState {
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
  playCount: number; // 0, 1, or 2
  isLocked: boolean;
}

class ListeningAudioController {
  private currentAudio: HTMLAudioElement | null = null;
  private timerId: any = null;

  public stopAll(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public playTrack(
    audioUrl: string | undefined,
    fallbackJapaneseScript: string,
    onProgress: (progress: number, currentTime: number, duration: number) => void,
    onEnd: () => void,
    onError?: (err: any) => void
  ): void {
    this.stopAll();

    // 1. Try real audio URL if provided and not dummy
    if (audioUrl && audioUrl.startsWith('http') && !audioUrl.includes('placeholder')) {
      const audio = new Audio(audioUrl);
      this.currentAudio = audio;

      audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
          const prog = (audio.currentTime / audio.duration) * 100;
          onProgress(prog, audio.currentTime, audio.duration);
        }
      });

      audio.addEventListener('ended', () => {
        this.currentAudio = null;
        onEnd();
      });

      audio.addEventListener('error', (e) => {
        console.warn('Audio URL playback failed, switching to synthesized voice:', e);
        if (onError) onError(e);
        this.playSynthesizedSpeech(fallbackJapaneseScript, onProgress, onEnd);
      });

      audio.play().catch((err) => {
        console.warn('Autoplay blocked or failed, trying synthesized speech:', err);
        if (onError) onError(err);
        this.playSynthesizedSpeech(fallbackJapaneseScript, onProgress, onEnd);
      });
      return;
    }

    // 2. Synthesized Japanese Speech Fallback
    this.playSynthesizedSpeech(fallbackJapaneseScript, onProgress, onEnd);
  }

  private playSynthesizedSpeech(
    text: string,
    onProgress: (progress: number, currentTime: number, duration: number) => void,
    onEnd: () => void
  ): void {
    const isBrowser = typeof window !== 'undefined';
    const hasSpeech = isBrowser && 'speechSynthesis' in window;

    if (!hasSpeech) {
      // Simulate playback in non-speech environment
      let elapsed = 0;
      const fakeDuration = 10;
      this.timerId = setInterval(() => {
        elapsed += 0.5;
        const prog = Math.min(100, (elapsed / fakeDuration) * 100);
        onProgress(prog, elapsed, fakeDuration);
        if (elapsed >= fakeDuration) {
          if (this.timerId) clearInterval(this.timerId);
          this.timerId = null;
          onEnd();
        }
      }, 500);
      return;
    }

    // Strip furigana brackets for speech synthesizer: "私[わたし]" -> "わたし"
    const speechCleanText = text.replace(/([一-龯々ヶぁ-んァ-ヶa-zA-Z0-9]+)\[([ぁ-んァ-ヶa-zA-Z0-9]+)\]/g, '$2');

    const utterance = new SpeechSynthesisUtterance(speechCleanText);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.88; // Slightly slow and clear for JFT-Basic test pace

    // Try finding a natural Japanese voice
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang.startsWith('ja') || v.name.toLowerCase().includes('japan'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    // Approximate duration: 3.5 characters per second
    const estimatedDuration = Math.max(6, speechCleanText.length * 0.28);
    const startTime = Date.now();

    this.timerId = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(99, (elapsed / estimatedDuration) * 100);
      onProgress(progress, Math.min(elapsed, estimatedDuration), estimatedDuration);
    }, 200);

    utterance.onend = () => {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      onProgress(100, estimatedDuration, estimatedDuration);
      onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error:', e);
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const listeningAudioController = new ListeningAudioController();
