'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BorderBeam } from './BorderBeam';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderBeam?: boolean;
  beamDuration?: number;
  floatEffect?: boolean;
  floatVariant?: 1 | 2 | 3;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  borderBeam = true,
  beamDuration = 6.5,
  floatEffect = true,
  floatVariant = 1,
  ...props
}: GlassCardProps) {
  const floatClass = floatEffect
    ? floatVariant === 2
      ? 'animate-float-2'
      : floatVariant === 3
      ? 'animate-float-3'
      : 'animate-float-1'
    : '';

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-[var(--line)] transition-all duration-300 text-[var(--ink)]',
        'bg-[var(--surface)] shadow-[var(--card-shadow)]',
        hoverEffect &&
          'hover:shadow-2xl hover:shadow-[var(--accent)]/15 hover:border-[var(--accent)]/50 hover:-translate-y-1.5',
        floatClass,
        className
      )}
      {...props}
    >
      {borderBeam && <BorderBeam duration={beamDuration} borderWidth={1.5} />}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
