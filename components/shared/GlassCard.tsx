'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl border backdrop-blur-xl transition-all duration-300',
        'bg-[var(--card-bg)] border-[var(--card-border)]',
        hoverEffect &&
          'hover:shadow-2xl hover:shadow-[var(--accent)]/10 hover:border-[var(--accent)]/40',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
