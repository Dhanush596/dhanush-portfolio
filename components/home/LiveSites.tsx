'use client';

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { TiltCard } from '@/components/shared/TiltCard';
import { Reveal } from '@/components/shared/Reveal';
import { LIVE_SITES } from '@/lib/data';

export function LiveSites() {
  return (
    <section id="live-sites" className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Reveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--card-bg)] text-xs font-mono text-[var(--accent)] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven In Production</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
            Live Commercial Sites
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text)]/70 max-w-2xl mx-auto">
            High-performance full-stack web applications actively serving customers and processing real-world traffic.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {LIVE_SITES.map((site, index) => (
          <Reveal key={site.id} direction="up" delay={0.15 * index}>
            <TiltCard className="h-full p-6 sm:p-8 flex flex-col justify-between group">
              {/* Background Accent Mesh */}
              <div
                className={`absolute -top-24 -right-24 w-52 h-52 rounded-full bg-gradient-to-br ${site.gradient} blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--accent)] mb-2">
                      {site.highlightMetric || site.category}
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {site.title}
                    </h3>
                  </div>

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${site.title} live website`}
                    className="p-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)]/70 group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/40 group-hover:scale-105 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-[var(--text)]/80 leading-relaxed mb-6">
                  {site.description}
                </p>
              </div>

              {/* Footer / Tech Stack */}
              <div className="relative z-10 pt-4 border-t border-[var(--card-border)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {site.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono rounded-md bg-[var(--text)]/5 text-[var(--text)]/70 border border-[var(--card-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  <span>Launch Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
