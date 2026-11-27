'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function SplashIntro({ onFinish }: { onFinish?: () => void }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showSplash, setShowSplash] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      onFinish?.();
      return;
    }

    try {
      const entered = sessionStorage.getItem('dhanush_splash_entered');
      if (!entered) {
        setShowSplash(true);
      } else {
        onFinish?.();
      }
    } catch {
      setShowSplash(false);
      onFinish?.();
    }
  }, [prefersReducedMotion, onFinish]);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    try {
      sessionStorage.setItem('dhanush_splash_entered', 'true');
    } catch {
      // storage error handled
    }

    setTimeout(() => {
      setShowSplash(false);
      onFinish?.();
    }, 700);
  };

  useEffect(() => {
    if (!showSplash) return;
    const handleKeyDown = () => handleEnter();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSplash, isExiting]);

  if (!showSplash) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="splash-screen"
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        animate={{
          clipPath: isExiting
            ? 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
            : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleEnter}
        className="fixed inset-0 z-[110] bg-[var(--act-bg)] text-[var(--ink)] flex flex-col justify-between p-6 sm:p-12 cursor-pointer select-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between font-mono text-xs text-[var(--muted)] border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--ok)] animate-pulse" />
            <span className="font-bold text-[var(--ink)]">DHANUSH.DEV</span>
            <span>·</span>
            <span>terminal p.01</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-[var(--muted)]">
            v2.0 · Bangalore, IN
          </span>
        </div>

        {/* Center Main Stage */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] shadow-sm text-xs font-mono">
            <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>sys.ready: 22 projects · 5 live sites · 0 drift</span>
          </div>

          <h2 className="font-heading text-4xl sm:text-7xl font-black text-[var(--ink)] tracking-tight uppercase leading-[1.05]">
            Welcome to my{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
              cloud
            </span>{' '}
            corner.
          </h2>

          <p className="text-sm sm:text-base font-mono text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
            Full-stack product engineering, automated GitOps CI/CD delivery, and cloud infrastructure.
          </p>

          <div className="pt-4 flex flex-col items-center gap-3">
            <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[var(--accent)] text-white font-heading font-black text-xs uppercase tracking-wider shadow-lg shadow-[var(--accent)]/20 hover:scale-105 transition-transform">
              <span>Click or Tap to enter</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--muted)]">
              [Press any key to enter]
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[var(--muted)] border-t border-[var(--line)] pt-4 gap-2">
          <span>Bangalore, Karnataka, IN · 12.9716° N, 77.5946° E</span>
          <span className="text-[var(--accent)] font-semibold">Ready to ship</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
