'use client';

import React from 'react';
import { ArrowRight, Download, Mail, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { HeroSceneWrapper } from './HeroSceneWrapper';
import { RotatingWords } from './RotatingWords';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';
import { PERSONAL_INFO } from '@/lib/data';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
      {/* 3D Canvas / Static Gradient Background */}
      <HeroSceneWrapper />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Availability Badge */}
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--card-bg)] backdrop-blur-md mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="text-xs font-mono font-medium tracking-wide text-[var(--text)]/80">
              Web & App Developer at PrimePro.ai
            </span>
          </div>
        </Reveal>

        {/* Main Headline */}
        <Reveal delay={0.2}>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--text)] mb-4">
            Dhanush A,{' '}
            <span className="bg-gradient-to-r from-[var(--accent)] via-teal-300 to-[var(--accent-2)] bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>
        </Reveal>

        {/* Subline & Rotating Words */}
        <Reveal delay={0.3}>
          <div className="max-w-2xl text-lg sm:text-xl text-[var(--text)]/80 leading-relaxed mb-4">
            I build full-stack web apps and the cloud pipelines that ship them.
          </div>
          <div className="flex items-center justify-center gap-2 text-base sm:text-lg mb-8">
            <span className="text-[var(--text)]/60">Specializing in</span>
            <RotatingWords words={PERSONAL_INFO.rotatingTitles} />
          </div>
        </Reveal>

        {/* Action Buttons */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <MagneticButton href="#live-sites" variant="primary">
              <span>View my work</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              href={PERSONAL_INFO.resumePdf}
              variant="glass"
              download="Dhanush_A_Resume.pdf"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>Download resume</span>
            </MagneticButton>
          </div>
        </Reveal>

        {/* Social / Contact Links */}
        <Reveal delay={0.5}>
          <div className="flex items-center gap-5 text-[var(--text)]/60">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2.5 rounded-full border border-transparent hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2.5 rounded-full border border-transparent hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Send Email"
              className="p-2.5 rounded-full border border-transparent hover:border-[var(--accent)]/40 hover:text-[var(--accent)] hover:bg-[var(--card-bg)] transition-all duration-200"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
