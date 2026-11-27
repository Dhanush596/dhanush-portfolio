'use client';

import React, { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BorderBeam } from './BorderBeam';
import { getCardTheme, getMultiCardStyle } from '@/lib/cardThemes';

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  borderBeam?: boolean;
  beamDuration?: number;
  floatEffect?: boolean;
  colorIndex?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 4,
  glareOpacity = 0.25,
  borderBeam = true,
  beamDuration = 6.0,
  floatEffect = true,
  colorIndex = 0,
  style,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafId = useRef<number | null>(null);
  const theme = getCardTheme(colorIndex);
  const multiStyle = getMultiCardStyle(colorIndex);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      if (rafId.current !== null) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        if (glareRef.current) {
          glareRef.current.style.opacity = String(glareOpacity);
          glareRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(${theme.c2Rgb}, 0.22), transparent 60%)`;
        }
      });
    },
    [maxTilt, glareOpacity, prefersReducedMotion, theme.c2Rgb]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
        ...multiStyle,
        ...style,
      }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border text-[var(--ink)] select-none multi-card',
        'transition-all duration-300',
        floatEffect && 'animate-float-2',
        className
      )}
      {...props}
    >
      {/* Animated Multi-Color Light Moving Around the Border */}
      {borderBeam && (
        <BorderBeam
          duration={beamDuration}
          borderWidth={1.5}
          colorFrom={theme.c1Hex}
          colorTo={theme.c2Hex}
          colorPop={theme.c3Hex}
        />
      )}

      {/* Glare Highlight */}
      {!prefersReducedMotion && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
          style={{ opacity: 0 }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
