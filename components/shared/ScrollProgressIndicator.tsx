'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ACTS = [
  { id: 'hello', label: 'Act 01 of 05', name: 'Hello' },
  { id: 'work', label: 'Act 02 of 05', name: 'The Making' },
  { id: 'journey', label: 'Act 03 of 05', name: 'The Journey' },
  { id: 'toolkit', label: 'Act 04 of 05', name: 'The Toolkit' },
  { id: 'contact', label: 'Act 05 of 05', name: 'Contact' },
];

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [currentAct, setCurrentAct] = useState(ACTS[0]);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = ACTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(ACTS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setCurrentAct(ACTS[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Thin Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] z-[60] origin-left pointer-events-none"
      />

      {/* Floating Act Counter (Top Right, under top bar) */}
      <div className="fixed top-14 right-4 sm:right-8 z-40 hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] backdrop-blur-md text-[10px] font-mono pointer-events-none transition-all duration-300 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        <span className="text-[var(--muted)]">{currentAct.label}</span>
        <span className="text-[var(--muted)]/40">·</span>
        <span className="text-[var(--ink)] font-bold uppercase">{currentAct.name}</span>
      </div>
    </>
  );
}
