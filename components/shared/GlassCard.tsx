'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BorderBeam } from './BorderBeam';
import { getCardTheme, getMultiCardStyle } from '@/lib/cardThemes';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderBeam?: boolean;
  beamDuration?: number;
  floatEffect?: boolean;
  floatVariant?: 1 | 2 | 3;
  colorIndex?: number;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  borderBeam = true,
  beamDuration = 6.5,
  floatEffect = true,
  floatVariant = 1,
  colorIndex = 0,
  style,
  ...props
}: GlassCardProps) {
  const theme = getCardTheme(colorIndex);
  const multiStyle = getMultiCardStyle(colorIndex);

  const floatClass = floatEffect
    ? floatVariant === 2
      ? 'animate-float-2'
      : floatVariant === 3
      ? 'animate-float-3'
      : 'animate-float-1'
    : '';

  return (
    <div
      style={{ ...multiStyle, ...style }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border transition-all duration-300 text-[var(--ink)] multi-card',
        hoverEffect && 'hover:-translate-y-1.5',
        floatClass,
        className
      )}
      {...props}
    >
      {borderBeam && (
        <BorderBeam
          duration={beamDuration}
          borderWidth={1.5}
          colorFrom={theme.c1Hex}
          colorTo={theme.c2Hex}
          colorPop={theme.c3Hex}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
