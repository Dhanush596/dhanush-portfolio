'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProjectGradientArtProps {
  title: string;
  accent: string;
  accent2: string;
  className?: string;
  large?: boolean;
}

export function ProjectGradientArt({
  title,
  accent,
  accent2,
  className,
  large = false,
}: ProjectGradientArtProps) {
  // Extract initials (e.g. "PrimePro Platform" -> "PP", "AuraVault" -> "AV")
  const initials = title
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        'relative w-full rounded-xl overflow-hidden flex items-center justify-center border select-none transition-all duration-300',
        large ? 'h-64 sm:h-96' : 'h-40 sm:h-48',
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${accent}22 0%, ${accent2}12 100%)`,
        borderColor: `${accent}35`,
      }}
    >
      {/* Dynamic blurred orbs */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-50 pointer-events-none"
        style={{ backgroundColor: accent }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
        style={{ backgroundColor: accent2 }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Centered Initials Emblem */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center rounded-2xl border backdrop-blur-md shadow-2xl',
          large ? 'w-24 h-24 sm:w-32 sm:h-32 text-4xl sm:text-5xl' : 'w-16 h-16 sm:w-20 sm:h-20 text-2xl sm:text-3xl'
        )}
        style={{
          backgroundColor: 'rgba(5, 6, 10, 0.65)',
          borderColor: `${accent}50`,
          boxShadow: `0 0 35px ${accent}25`,
        }}
      >
        <span
          className="font-heading font-black tracking-widest"
          style={{ color: accent }}
        >
          {initials}
        </span>
      </div>
    </div>
  );
}
