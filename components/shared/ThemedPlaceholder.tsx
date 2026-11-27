'use client';

import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';
import { Footer } from '@/components/shared/Footer';
import { Hero3DText } from '@/components/shared/Hero3DText';

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
    <div className="relative w-full min-h-screen flex flex-col justify-between bg-[var(--act-bg)] text-[var(--ink)] transition-colors duration-500">
      {/* Background ambient glow matching route accents */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[130px] opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${accent} 0%, ${accent2} 70%, transparent 100%)`,
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="max-w-3xl w-full mx-auto text-center">
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-md mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              <span className="text-xs font-mono tracking-wider uppercase text-[var(--muted)]">
                Module: <span className="font-semibold text-[var(--accent)]">{theme}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 pl-2 border-l border-[var(--line)]">
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

          <div className="mb-4">
            <Hero3DText
              as="h1"
              segments={[{ text: title }]}
              className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-[var(--ink)] uppercase"
            />
          </div>

          <Reveal delay={0.3}>
            <p className="text-base sm:text-lg text-[var(--muted)] max-w-xl mx-auto leading-relaxed mb-8">
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

      <Footer />
    </div>
  );
}
