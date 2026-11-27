'use client';

import React from 'react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { TiltCard } from '@/components/shared/TiltCard';
import { Reveal } from '@/components/shared/Reveal';
import { LIVE_SITES } from '@/lib/data';

export function LiveSites() {
  return (
    <section id="work-index" className="relative z-10 px-4 sm:px-8 lg:px-12 py-20 border-b border-[var(--line)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <Reveal direction="up" delay={0.05}>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent)] mb-3 flex items-center gap-2 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>[02] // PRODUCTION DEPLOYMENTS</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--ink)] uppercase leading-[0.95]">
            Live Commercial Sites
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="text-sm sm:text-base text-[var(--muted)] max-w-md font-sans leading-relaxed">
            High-performance full-stack web applications actively serving business customers, reservations, and real-world traffic.
          </p>
        </Reveal>
      </div>

      {/* Grid of Editorial Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {LIVE_SITES.map((site, index) => (
          <Reveal key={site.id} direction="up" delay={0.1 * index}>
            <TiltCard className="h-full p-6 sm:p-8 flex flex-col justify-between group border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/50 backdrop-blur-xl transition-all duration-300 shadow-sm">
              {/* Subtle Ambient Radial Highlight */}
              <div
                className={`absolute -top-24 -right-24 w-60 h-60 rounded-full bg-gradient-to-br ${site.gradient} blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Meta Row: Index + Live Beacon + External Link */}
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--muted)] font-bold">
                      [0{index + 1}]
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      LIVE
                    </span>
                  </div>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${site.title} live website`}
                    className="flex items-center gap-1.5 text-xs font-mono text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Project Title */}
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-3 tracking-tight">
                  <a href={site.url} target="_blank" rel="noopener noreferrer">
                    {site.title}
                  </a>
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-sans mb-8">
                  {site.description}
                </p>
              </div>

              {/* Tech Stack Chips & Direct URL */}
              <div className="relative z-10 pt-4 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <div className="flex flex-wrap gap-1.5">
                  {site.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[11px] rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="text-[11px] text-[var(--muted)]/60 truncate max-w-[200px]">
                  {site.url.replace('https://', '')}
                </span>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
