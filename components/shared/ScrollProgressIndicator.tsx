'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useSpring } from 'framer-motion';

const ACTS = [
  { id: 'hello', label: 'Act 01 of 03', name: 'Hello' },
  { id: 'directory', label: 'Act 02 of 03', name: 'Directory' },
  { id: 'contact', label: 'Act 03 of 03', name: 'Contact' },
];

export function ScrollProgressIndicator() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [currentAct, setCurrentAct] = useState(ACTS[0]);

  const isHomePage = pathname === '/';

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      if (window.scrollY < 40) {
        setCurrentAct(ACTS[0]);
        return;
      }
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

    setCurrentAct(ACTS[0]);
    const raf = requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      {/* Top Thin Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] z-[60] origin-left pointer-events-none"
      />

      {/* Floating Act Counter (Displayed only on Home acts to avoid cluttering subpage headers) */}
      {isHomePage && (
        <div className="fixed top-16 right-4 sm:right-8 z-40 hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/85 text-[var(--ink)] backdrop-blur-md text-[10px] font-mono pointer-events-none transition-all duration-300 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--muted)]">{currentAct.label}</span>
          <span className="text-[var(--muted)]/40">·</span>
          <span className="text-[var(--ink)] font-bold uppercase">{currentAct.name}</span>
        </div>
      )}
    </>
  );
}
