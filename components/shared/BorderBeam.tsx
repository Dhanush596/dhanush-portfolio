'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface BorderBeamProps {
  duration?: number;
  delay?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  colorPop?: string;
  className?: string;
}

/**
 * Animated moving light beam that races continuously around the card border.
 * 100% GPU-composited, zero main-thread overhead, theme-adaptive.
 */
export function BorderBeam({
  duration = 6,
  delay = 0,
  borderWidth = 1.5,
  colorFrom = 'var(--accent)',
  colorTo = 'var(--accent-2)',
  colorPop = 'var(--pop)',
  className = '',
}: BorderBeamProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[inherit] border border-[var(--line)]',
          className
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden z-0 select-none',
        className
      )}
    >
      {/* 1. Orbiting Conic Gradient Beam */}
      <div
        className="absolute inset-[-150%] animate-[beamSpin_6s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, ${colorFrom} 305deg, ${colorPop} 335deg, ${colorTo} 355deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />

      {/* 2. Soft Outer Ambient Glow */}
      <div
        className="absolute inset-[-150%] animate-[beamSpin_6s_linear_infinite] blur-[3px] opacity-75"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 280deg, ${colorFrom} 315deg, ${colorPop} 345deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />

      {/* 3. Surface Mask: cuts out the center so the radiant light travels along the border */}
      <div
        className="absolute rounded-[inherit] bg-[var(--surface)] transition-colors duration-300"
        style={{ inset: `${borderWidth}px` }}
      />
    </div>
  );
}
