'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const SPARK_VECTORS = [
  { angle: 12, dist: 190, color: '#2563EB', size: 6 },
  { angle: 42, dist: 240, color: '#7C3AED', size: 8 },
  { angle: 78, dist: 160, color: '#06B6D4', size: 5 },
  { angle: 112, dist: 230, color: '#10B981', size: 7 },
  { angle: 148, dist: 185, color: '#E11D48', size: 6 },
  { angle: 185, dist: 250, color: '#F59E0B', size: 8 },
  { angle: 215, dist: 175, color: '#38BDF8', size: 5 },
  { angle: 252, dist: 225, color: '#A855F7', size: 7 },
  { angle: 292, dist: 195, color: '#EC4899', size: 6 },
  { angle: 332, dist: 235, color: '#22C55E', size: 7 },
];

/**
 * Non-blocking arrival visual effect triggered on every route load/transition:
 * expanding 3D portal rings, laser scanline sweep, and chromatic particle burst.
 */
export function CrazyLoadFX() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) {
      setActive(false);
      return;
    }
    setActive(true);
    const timer = setTimeout(() => setActive(false), 1150);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="crazy-load-fx"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 pointer-events-none z-[55] overflow-hidden select-none"
        >
          {/* 1. High-velocity Chromatic Laser Scanline Sweep */}
          <motion.div
            initial={{ y: '-5vh', opacity: 0.9 }}
            animate={{ y: '105vh', opacity: 0 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-violet-500 to-rose-500 shadow-[0_0_24px_rgba(56,189,248,0.85)]"
          />

          {/* 2. Top Viewport Chromatic Portal Bloom */}
          <motion.div
            initial={{ scale: 0.25, opacity: 0.55 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[22vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,520px)] aspect-square rounded-full blur-3xl"
            style={{
              background:
                'conic-gradient(from 0deg, rgba(37,99,235,0.55), rgba(168,85,247,0.55), rgba(16,185,129,0.55), rgba(244,63,94,0.55), rgba(37,99,235,0.55))',
            }}
          />

          {/* 3. Expanding 3D Shockwave Ring */}
          <motion.div
            initial={{ scale: 0.15, rotateX: 65, opacity: 0.9 }}
            animate={{ scale: 2.5, rotateX: 25, opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[26vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(75vw,440px)] aspect-square rounded-full border-2 border-[var(--accent)]"
            style={{
              boxShadow: '0 0 36px rgba(37,99,235,0.45), inset 0 0 24px rgba(168,85,247,0.35)',
            }}
          />

          {/* 4. Secondary Counter-Spinning Prism Ring */}
          <motion.div
            initial={{ scale: 0.3, rotate: 0, opacity: 0.8 }}
            animate={{ scale: 1.9, rotate: 135, opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="absolute top-[26vh] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,340px)] aspect-square rounded-3xl border border-dashed border-[var(--pop)]/80"
          />

          {/* 5. Radiating Chromatic Spark Burst */}
          <div className="absolute top-[26vh] left-1/2 -translate-x-1/2 -translate-y-1/2">
            {SPARK_VECTORS.map((spark, idx) => {
              const rad = (spark.angle * Math.PI) / 180;
              const tx = Math.cos(rad) * spark.dist;
              const ty = Math.sin(rad) * spark.dist;
              return (
                <motion.span
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 1.4, opacity: 0.95 }}
                  animate={{ x: tx, y: ty, scale: 0, opacity: 0 }}
                  transition={{
                    duration: 0.72 + (idx % 3) * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute rounded-full"
                  style={{
                    width: `${spark.size}px`,
                    height: `${spark.size}px`,
                    backgroundColor: spark.color,
                    boxShadow: `0 0 12px ${spark.color}`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
