'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';

interface ThemedPlaceholderProps {
  title: string;
  theme: string;
  accent: string;
  accent2: string;
  description: string;
  children?: React.ReactNode;
}

export function ThemedPlaceholder({
  title,
  theme,
  accent,
  accent2,
  description,
  children,
}: ThemedPlaceholderProps) {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      {/* Background ambient glow matching route accents */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-25 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, ${accent2} 70%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--card-bg)] backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-[var(--accent)]" />
            <span className="text-xs font-mono tracking-wider uppercase text-[var(--text)]/80">
              Theme: <span className="font-semibold text-[var(--accent)]">{theme}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 pl-2 border-l border-[var(--card-border)]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accent2 }}
              />
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text)] mb-4">
            {title}
          </h1>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="text-base sm:text-lg text-[var(--text)]/75 max-w-xl mx-auto leading-relaxed mb-8">
            {description}
          </p>
        </Reveal>

        {children && (
          <Reveal delay={0.4} className="mb-10">
            {children}
          </Reveal>
        )}

        <Reveal delay={0.5}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href="/" variant="primary">
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </MagneticButton>
            <MagneticButton href="/contact" variant="glass">
              <span>Get in Touch</span>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
