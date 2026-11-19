'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function TouchHoldIndicator() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isOverInteractive, setIsOverInteractive] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [glitchText, setGlitchText] = useState('TOUCH SENSOR');

  const interactiveSelector = 'a, button, [role="button"], input, select, textarea, label, summary, .interactive';

  useEffect(() => {
    // Disable on touch screens or reduced motion
    const isTouchOnly = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchOnly || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const isOver = Boolean(target?.closest(interactiveSelector));
      setIsOverInteractive(isOver);
    };

    const handleMouseDown = () => {
      setIsHolding(true);
      setGlitchText('RIPPLE // ACTIVE');
    };

    const handleMouseUp = () => {
      setIsHolding(false);
      setGlitchText('TOUCH SENSOR');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || !isVisible || isOverInteractive) {
    return null;
  }

  return (
    <div
      style={{
        transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
        pointerEvents: 'none',
      }}
      className="fixed top-0 left-0 z-50 transition-opacity duration-200"
    >
      {/* Reticle Dot */}
      <div
        className={`w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ${
          isHolding
            ? 'scale-150 bg-white border-white shadow-[0_0_12px_rgba(255,255,255,0.8)]'
            : 'bg-white/70 border-white/40'
        }`}
      />

      {/* Floating Micro-Telemetry HUD */}
      <div className="absolute top-3 left-3 flex flex-col gap-0.5 select-none font-mono text-[9px] tracking-wider text-white/50 backdrop-blur-md bg-black/50 px-2 py-1 rounded border border-white/10 whitespace-nowrap shadow-xl">
        <div className="flex items-center gap-1.5 text-white/80 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{glitchText}</span>
        </div>
        <div className="text-[8px] text-white/40">
          X: {Math.round(coords.x)} · Y: {Math.round(coords.y)}
        </div>
      </div>
    </div>
  );
}
