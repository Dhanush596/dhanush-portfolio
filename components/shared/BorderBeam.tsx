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
 * Uses pure CSS border mask-composite so the interior remains 100% transparent
 * and never occludes sibling elements or card backgrounds.
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
          'pointer-events-none absolute inset-0 rounded-[inherit] border border-[var(--line)] z-10',
          className
        )}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10 select-none',
        className
      )}
      style={{
        padding: `${borderWidth}px`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
      }}
    >
      {/* Orbiting square conic-gradient ring centered safely for any aspect ratio */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[max(220%,800px)] aspect-square animate-[beamSpin_6s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 255deg, ${colorFrom} 295deg, ${colorPop} 330deg, ${colorTo} 352deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}
