'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Pause, Play, Sparkles, ShieldCheck } from 'lucide-react';
import { LIVE_SITES } from '@/lib/data';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BorderBeam } from '@/components/shared/BorderBeam';

const ROTATION_INTERVAL_MS = 4500; // Still for 4.5 seconds, then rotate

export function Rotating3DDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const total = LIVE_SITES.length;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  // Auto-rotation timer with visual progress
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const intervalTime = 50; // update progress every 50ms
    const step = (intervalTime / ROTATION_INTERVAL_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, nextSlide]);

  return (
    <div
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-[var(--line)] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-mono uppercase tracking-widest font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            <span>Featured 3D Showcase · 05 Live Client Platforms</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Commercial{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--ok)] via-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
              client
            </span>{' '}
            deployments.
          </h2>
        </div>

        {/* Rotation Status & Controls Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-xs font-mono text-[var(--muted)]">
            <button
              type="button"
              onClick={() => setIsPaused((p) => !p)}
              className="p-1 rounded-md hover:text-[var(--ink)] transition-colors"
              title={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-amber-500" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <span className="hidden sm:inline">
              {isPaused ? 'Paused (hovered)' : 'Rotating (4.5s)'}
            </span>
            <div className="w-12 h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-all duration-75"
                style={{ width: `${isPaused ? 100 : progress}%` }}
              />
            </div>
          </div>

          {/* Prev / Next Chevrons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous client platform"
              className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-all shadow-sm active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next client platform"
              className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--surface-2)] transition-all shadow-sm active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Portfolio Demonstration Notice */}
      <div className="mb-10 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs font-mono flex items-start gap-3 shadow-sm">
        <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Client Production Notice:</strong> These platforms were built for live commercial clients. Due to client server maintenance, domain renewals, or periodic updates, external client domains may occasionally undergo service pauses (not all 5 websites are guaranteed to be operating in live production at all times). Both the <strong>Live Website</strong> and internal <strong>Demo Showcase</strong> are provided for full inspection.
        </p>
      </div>

      {/* 3D Cylindrical Perspective Carousel Stage */}
      <div
        className="relative w-full min-h-[480px] sm:min-h-[540px] flex items-center justify-center overflow-hidden sm:overflow-visible py-4 select-none"
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative w-full max-w-lg h-[460px] sm:h-[500px] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {LIVE_SITES.map((site, idx) => {
            // Normalized offset from active slide: -2, -1, 0, 1, 2
            let offset = (idx - activeIndex) % total;
            if (offset > 2) offset -= total;
            if (offset < -2) offset += total;

            const isActive = offset === 0;
            const isFlank = Math.abs(offset) === 1;

            // Compute 3D geometric coordinates
            let xOffset = 0;
            let zOffset = 0;
            let rotateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;

            if (isActive) {
              xOffset = 0;
              zOffset = isMobile ? 10 : 40;
              rotateY = 0;
              scale = 1;
              opacity = 1;
              zIndex = 30;
            } else if (offset === 1) {
              xOffset = isMobile ? 65 : 280;
              zOffset = isMobile ? -60 : -120;
              rotateY = isMobile ? -18 : -28;
              scale = isMobile ? 0.88 : 0.88;
              opacity = isMobile ? 0.35 : 0.72;
              zIndex = 20;
            } else if (offset === -1) {
              xOffset = isMobile ? -65 : -280;
              zOffset = isMobile ? -60 : -120;
              rotateY = isMobile ? 18 : 28;
              scale = isMobile ? 0.88 : 0.88;
              opacity = isMobile ? 0.35 : 0.72;
              zIndex = 20;
            } else if (offset === 2) {
              xOffset = isMobile ? 120 : 440;
              zOffset = isMobile ? -140 : -260;
              rotateY = isMobile ? -30 : -45;
              scale = 0.76;
              opacity = isMobile ? 0 : 0.25;
              zIndex = 10;
            } else if (offset === -2) {
              xOffset = isMobile ? -120 : -440;
              zOffset = isMobile ? -140 : -260;
              rotateY = isMobile ? 30 : 45;
              scale = 0.76;
              opacity = isMobile ? 0 : 0.25;
              zIndex = 10;
            }

            if (prefersReducedMotion) {
              rotateY = 0;
              zOffset = 0;
              xOffset = offset * 320;
            }

            return (
              <motion.div
                key={site.id}
                animate={{
                  x: xOffset,
                  z: zOffset,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 190,
                  damping: 24,
                }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(idx);
                    setProgress(0);
                  }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  pointerEvents: opacity < 0.2 ? 'none' : 'auto',
                }}
                className={`absolute w-[92%] sm:w-[420px] h-full rounded-2xl border bg-[var(--surface)] shadow-2xl overflow-hidden flex flex-col justify-between transition-colors duration-300 ${
                  isActive
                    ? 'border-[var(--accent)] shadow-[0_25px_60px_-15px_rgba(37,99,235,0.30)] cursor-default'
                    : 'border-[var(--line)] cursor-pointer hover:border-[var(--accent)]/60'
                }`}
              >
                {/* Active Card Glowing Laser Beam */}
                {isActive && (
                  <BorderBeam
                    duration={4.5}
                    borderWidth={1.8}
                    colorFrom="var(--accent)"
                    colorTo="var(--ok)"
                    colorPop="var(--accent-2)"
                  />
                )}

                {/* Card Container */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between bg-[var(--surface)]">
                  {/* Browser Mockup Top Bar */}
                  <div className="px-4 py-2.5 border-b border-[var(--line)] bg-[var(--surface-2)] flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>

                    <div className="px-3 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[10px] font-mono text-[var(--muted)] truncate max-w-[190px] sm:max-w-[220px]">
                      {site.url.replace('https://', '')}
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      0{idx + 1}/05
                    </span>
                  </div>

                  {/* High-Resolution Screenshot Thumbnail */}
                  {site.cover && (
                    <div className="relative w-full h-44 sm:h-48 overflow-hidden border-b border-[var(--line)] bg-[var(--surface-2)] shrink-0 group">
                      <img
                        src={site.cover}
                        alt={site.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-40" />

                      {/* Highlight Metric Pill on Thumbnail */}
                      <div className="absolute bottom-2.5 left-3 px-2.5 py-1 rounded-lg backdrop-blur-md bg-black/60 border border-white/20 text-white text-[10px] font-mono font-medium flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>{site.highlightMetric}</span>
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                          {site.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                          Production
                        </span>
                      </div>

                      <p className="text-xs text-[var(--muted)] font-sans leading-relaxed line-clamp-2 mb-3">
                        {site.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {site.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]"
                          >
                            {tech}
                          </span>
                        ))}
                        {site.techStack.length > 4 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)]">
                            +{site.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons: Live Website & Demo Showcase */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[var(--line)]">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 py-2 px-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
                        >
                          <span>Live Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <a
                          href={`/work/${site.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="py-2 px-3.5 rounded-xl bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] text-xs font-mono font-semibold flex items-center justify-center gap-1 transition-all hover:border-[var(--accent)]"
                        >
                          <span>Case Study</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Pagination Dot Navigation */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {LIVE_SITES.map((site, i) => (
          <button
            key={site.id}
            type="button"
            onClick={() => {
              setActiveIndex(i);
              setProgress(0);
            }}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === i
                ? 'w-8 h-2.5 bg-[var(--accent)] shadow-sm'
                : 'w-2.5 h-2.5 bg-[var(--line)] hover:bg-[var(--muted)]'
            }`}
            aria-label={`Go to slide ${i + 1}: ${site.title}`}
          />
        ))}
      </div>
    </div>
  );
}
