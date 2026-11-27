'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface RotatingWordsProps {
  words: string[];
  intervalMs?: number;
}

export function RotatingWords({
  words,
  intervalMs = 3000,
}: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [words.length, intervalMs]);

  if (prefersReducedMotion) {
    return (
      <span className="inline-block text-[var(--accent)] font-semibold font-mono">
        {words[index]}
      </span>
    );
  }

  return (
    <span className="relative inline-flex h-8 sm:h-9 overflow-hidden align-middle">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center px-3.5 py-0.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-md font-mono font-semibold text-[var(--accent)] tracking-tight whitespace-nowrap shadow-sm"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
