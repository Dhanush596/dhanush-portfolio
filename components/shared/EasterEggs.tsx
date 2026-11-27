'use client';

import { useEffect, useState, useCallback } from 'react';

// Web Audio API Synthesizer for soft interface clicks
class SoundSynth {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playPop() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // AudioContext failure gracefully handled
    }
  }

  playToggle(on: boolean) {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(on ? 440 : 660, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(on ? 880 : 330, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.07);
    } catch {
      // AudioContext failure gracefully handled
    }
  }
}

export const soundSynth = new SoundSynth();

export function useEasterEggs() {
  const [calmMode, setCalmMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleCalm = useCallback(() => {
    setCalmMode((prev) => {
      const next = !prev;
      if (typeof document !== 'undefined') {
        if (next) {
          document.body.classList.add('calm-mode');
        } else {
          document.body.classList.remove('calm-mode');
        }
      }
      return next;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundSynth.playToggle(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA' || target?.isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === 'z') {
        toggleCalm();
      } else if (e.key.toLowerCase() === 'm') {
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCalm, toggleSound]);

  // Hook global click sound when sound is enabled
  useEffect(() => {
    if (!soundEnabled) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest('a, button, [role="button"], input')) {
        soundSynth.playPop();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [soundEnabled]);

  return { calmMode, soundEnabled, toggleCalm, toggleSound };
}
