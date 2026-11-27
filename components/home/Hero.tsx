'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDownRight, Download, ArrowRight, Disc3 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';
import { PERSONAL_INFO } from '@/lib/data';

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between px-4 sm:px-8 lg:px-12 pt-28 pb-16 z-10">
      {/* Top Meta Line */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[var(--muted)] border-b border-[var(--line)] pb-4">
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[var(--ink)] font-semibold">Web & App Developer at PrimePro.ai</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex items-center gap-2 text-[var(--muted)]">
            <Disc3 className="w-3.5 h-3.5 animate-spin text-[var(--accent)]" style={{ animationDuration: '4s' }} />
            <span>In my focus: React 19 · Three.js · Cloud Infrastructure</span>
          </div>
        </Reveal>
      </div>

      {/* Massive Editorial Display Headline */}
      <div className="my-auto py-12 sm:py-16">
        <Reveal delay={0.15}>
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter text-[var(--ink)] uppercase leading-[0.88] select-none">
            Dhanush A
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-4 sm:mt-6 font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[var(--ink)] tracking-tight">
            Software Engineer <span className="font-mono text-xs sm:text-sm text-[var(--muted)] align-super">[01]</span>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg text-[var(--muted)] leading-relaxed font-sans">
            I craft full-stack digital products, high-velocity web interfaces, and automated cloud pipelines that scale seamlessly from zero to production.
          </p>
        </Reveal>
      </div>

      {/* Bottom Action Strip & Social Links */}
      <div className="pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton href="#work-index" variant="primary">
              <span>Explore Selected Work</span>
              <ArrowDownRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              href={PERSONAL_INFO.resumePdf}
              variant="outline"
              download="Dhanush_A_Resume.pdf"
            >
              <Download className="w-4 h-4" />
              <span>Resume PDF</span>
            </MagneticButton>
          </div>
        </Reveal>

        {/* Social Meta Links */}
        <Reveal delay={0.35}>
          <div className="flex items-center gap-5 text-xs font-mono text-[var(--muted)]">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-[var(--muted)]/40">/</span>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--ink)] transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>
            <span className="text-[var(--muted)]/40">/</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[var(--ink)] transition-colors"
            >
              <span>Email</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
