'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { LIVE_SITES } from '@/lib/data';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function LiveDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Fanning angles for 4 cards: -9, -3, +3, +9 deg
  const fanRotations = [-9, -3, 3, 9];
  const fanXOffsets = [-120, -40, 40, 120];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
            [2.1 PRODUCTION SYSTEMS]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Live in{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--ok)] to-[var(--accent)] bg-clip-text text-transparent font-normal italic lowercase">
              production
            </span>
            .
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Commercial platforms operating in live production. Click any card to launch the live platform.
        </p>
      </div>

      {/* Fanned Interactive Deck */}
      <div className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center py-6">
        <div className="relative w-full max-w-lg h-[400px] sm:h-[450px] flex items-center justify-center">
          {LIVE_SITES.map((site, idx) => {
            const isHovered = hoveredIndex === idx;
            const anyHovered = hoveredIndex !== null;

            // When hovering, spread out cards with spring physics; unhovered cards spread wider
            const rotation = prefersReducedMotion
              ? 0
              : isHovered
              ? 0
              : anyHovered
              ? fanRotations[idx] * 1.6
              : fanRotations[idx];

            const xOffset = prefersReducedMotion
              ? 0
              : isHovered
              ? 0
              : anyHovered
              ? fanXOffsets[idx] * 1.8
              : fanXOffsets[idx];

            const yOffset = isHovered ? -24 : 0;
            const zIndex = isHovered ? 30 : idx + 10;
            const scale = isHovered ? 1.04 : anyHovered ? 0.96 : 1;

            return (
              <motion.div
                key={site.id}
                data-cursor="Open"
                animate={{
                  rotate: rotation,
                  x: xOffset,
                  y: yOffset,
                  scale,
                  zIndex,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => window.open(site.url, '_blank')}
                className="absolute w-[90%] sm:w-[420px] h-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between group select-none transition-colors hover:border-[var(--accent)]"
                style={{
                  boxShadow: isHovered
                    ? '0 25px 50px -12px rgba(37, 99, 235, 0.25)'
                    : '0 10px 30px -12px rgba(15, 23, 42, 0.10)',
                }}
              >
                {/* Orbiting Border Light Beam */}
                <BorderBeam
                  duration={5 + idx * 1.2}
                  borderWidth={1.5}
                  colorFrom="var(--ok)"
                  colorTo="var(--accent)"
                  colorPop="var(--pop)"
                />

                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  {/* Browser Chrome Header Mockup */}
                  <div className="px-4 py-2.5 bg-[var(--surface-2)] border-b border-[var(--line)] flex items-center justify-between shrink-0">
                    {/* Traffic Light Dots */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    {/* Mock URL Address Bar */}
                    <div className="px-3 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[10px] font-mono text-[var(--muted)] truncate max-w-[200px] sm:max-w-[240px]">
                      {site.url.replace('https://', '')}
                    </div>

                    {/* Status Indicator */}
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </span>
                  </div>

                  {/* Screenshot Placeholder Area */}
                  {/* TODO(MEDIA): replace with recording -> /public/media/sites/<slug>.webp (1440x900 high-res screenshot) */}
                  <div className="relative flex-1 bg-gradient-to-br from-[var(--act-tint)] to-[var(--surface)] p-6 flex flex-col justify-between overflow-hidden border-b border-dashed border-[var(--line)]">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent)] font-bold block mb-1">
                          0{idx + 1} / 04 · {site.highlightMetric}
                        </span>
                        <h3 className="font-heading font-black text-2xl text-[var(--ink)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                          {site.title}
                        </h3>
                      </div>

                      <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors shadow-sm">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Site Description */}
                    <p className="text-xs text-[var(--muted)] font-sans leading-relaxed line-clamp-3 my-auto">
                      {site.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                      {site.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
