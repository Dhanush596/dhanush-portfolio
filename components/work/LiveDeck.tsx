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

  // Fanning angles for 5 cards: -14, -7, 0, +7, +14 deg
  const fanRotations = [-14, -7, 0, 7, 14];
  const fanXOffsets = [-160, -80, 0, 80, 160];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
            [2.1 CLIENT PRODUCTION PLATFORMS]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Client{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--ok)] to-[var(--accent)] bg-clip-text text-transparent font-normal italic lowercase">
              production
            </span>{' '}
            showcase.
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Commercial platforms developed for clients. Exhibited to showcase technical architecture and UI/UX engineering.
        </p>
      </div>

      {/* Demo Information Banner */}
      <div className="mb-10 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono flex items-start gap-3 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mt-1 shrink-0" />
        <p className="leading-relaxed">
          <strong>Demo Notice:</strong> These commercial websites are featured strictly for demonstration to review engineering contributions, design systems, and admin portals. Please note that third-party client domains and production servers may undergo maintenance, updates, or service pauses (not all 5 client websites are guaranteed to be actively operating in live production at all times).
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
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      DEMO SHOWCASE
                    </span>
                  </div>

                  {/* Screenshot Thumbnail Preview */}
                  {site.cover && (
                    <div className="relative w-full h-40 sm:h-44 overflow-hidden border-b border-[var(--line)] bg-[var(--surface-2)] shrink-0">
                      <img
                        src={site.cover}
                        alt={site.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-30" />
                    </div>
                  )}

                  <div className="relative flex-1 bg-gradient-to-br from-[var(--act-tint)] to-[var(--surface)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-[var(--accent)] font-bold block mb-1">
                          0{idx + 1} / 05 · {site.highlightMetric}
                        </span>
                        <h3 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                          {site.title}
                        </h3>
                      </div>

                      <div className="p-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors shadow-sm shrink-0">
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Site Description */}
                    <p className="text-xs text-[var(--muted)] font-sans leading-relaxed line-clamp-2 my-2">
                      {site.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--line)]">
                      {site.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons: Live Website & Demo Showcase */}
                    <div className="flex items-center gap-2 pt-3 border-t border-[var(--line)] mt-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(site.url, '_blank');
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-[11px] font-mono font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                      >
                        <span>Live Website</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/work/${site.slug}`;
                        }}
                        className="py-1.5 px-2.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-mono font-medium flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>Demo Showcase</span>
                      </button>
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
