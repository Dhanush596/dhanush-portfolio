'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RotatingWords } from '@/components/home/RotatingWords';
import { HeroMarquee } from '@/components/home/HeroMarquee';
import { ProofStrip } from '@/components/home/ProofStrip';
import { TouchSensorWrapper } from '@/components/canvas/TouchSensorWrapper';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { Hero3DText } from '@/components/shared/Hero3DText';
import { getCardTheme, getMultiCardStyle } from '@/lib/cardThemes';
import { PERSONAL_INFO } from '@/lib/data';
import { ArrowDown, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export function HeroAct() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '100px 0px 100px 0px' });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mouse parallax motion values for toast notification bubbles (GPU-driven, 0 re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const bubble1X = useTransform(smoothX, (v) => v * 1.4);
  const bubble1Y = useTransform(smoothY, (v) => v * 1.4);

  const bubble2X = useTransform(smoothX, (v) => -v * 1.2);
  const bubble2Y = useTransform(smoothY, (v) => -v * 1.2);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 35;
      const y = (e.clientY - innerHeight / 2) / 35;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, mouseX, mouseY]);

  return (
    <section
      id="hello"
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-36"
    >
      {/* 1. WebGL 3D Wave Distortion Canvas (Active in Hero Viewport Only) */}
      {isInView && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <Suspense fallback={null}>
            <TouchSensorWrapper />
          </Suspense>
        </div>
      )}


      {/* 3. Floating Terminal / Slack Notification Bubbles */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none z-10 max-w-6xl mx-auto">
        {/* Bubble 1: ArgoCD Sync Toast (Top Right) */}
        <motion.div
          style={
            prefersReducedMotion
              ? getMultiCardStyle(1)
              : {
                  x: bubble1X,
                  y: bubble1Y,
                  ...getMultiCardStyle(1),
                }
          }
          className="absolute top-28 right-8 p-3.5 rounded-2xl border backdrop-blur-xl pointer-events-auto flex items-start gap-3 select-none text-[var(--ink)] overflow-hidden multi-card"
        >
          <BorderBeam
            duration={5}
            borderWidth={1.5}
            colorFrom={getCardTheme(1).c1Hex}
            colorTo={getCardTheme(1).c2Hex}
            colorPop={getCardTheme(1).c3Hex}
          />
          <div className="relative z-10 p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[var(--ink)]">Dhanush · just now</span>
              <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-500/10 font-semibold">
                PROD
              </span>
            </div>
            <p className="text-xs font-mono text-[var(--muted)] mt-0.5">
              ArgoCD synced <span className="text-emerald-600 dark:text-emerald-400 font-semibold">✓ 0 drift</span>
            </p>
          </div>
        </motion.div>

        {/* Bubble 2: Trivy Pipeline Toast (Top Left) */}
        <motion.div
          style={
            prefersReducedMotion
              ? getMultiCardStyle(5)
              : {
                  x: bubble2X,
                  y: bubble2Y,
                  ...getMultiCardStyle(5),
                }
          }
          className="absolute top-28 left-8 p-3.5 rounded-2xl border backdrop-blur-xl pointer-events-auto flex items-start gap-3 select-none text-[var(--ink)] overflow-hidden multi-card"
        >
          <BorderBeam
            duration={6}
            borderWidth={1.5}
            colorFrom={getCardTheme(5).c1Hex}
            colorTo={getCardTheme(5).c2Hex}
            colorPop={getCardTheme(5).c3Hex}
          />
          <div className="relative z-10 p-2 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-[var(--ink)]">Pipeline · 2 min ago</span>
              <span className="text-[9px] font-mono text-[var(--accent)] px-1.5 py-0.2 rounded bg-[var(--accent)]/10 font-semibold">
                PASS
              </span>
            </div>
            <p className="text-xs font-mono text-[var(--muted)] mt-0.5">
              Trivy container security scan: <span className="text-[var(--accent)] font-semibold">0 CVEs</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* 4. Center Hero Typography & Controls */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center my-auto">
        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] shadow-sm backdrop-blur-md mx-auto mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--ok)] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--ok)]" />
          </span>
          <span className="text-xs font-mono text-[var(--muted)]">
            Available for projects · Bangalore, IN
          </span>
        </div>

        {/* 3D Extruded Kinetic Hero Headline */}
        <div className="mb-6">
          <Hero3DText
            as="h1"
            segments={[
              { text: 'Dhanush A,' },
              { text: 'software', accent: true },
              { text: 'Engineer' },
            ]}
            gradientClass="from-blue-600 via-violet-600 to-rose-500 dark:from-cyan-400 dark:via-violet-400 dark:to-rose-400"
            className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--ink)] uppercase leading-[1.05]"
          />
        </div>

        {/* Rotating Titles */}
        <div className="mb-6 flex justify-center">
          <RotatingWords words={PERSONAL_INFO.rotatingTitles} />
        </div>

        {/* Subline */}
        <p className="text-base sm:text-xl text-[var(--muted)] max-w-2xl mx-auto font-sans leading-relaxed mb-10">
          {PERSONAL_INFO.subline}
        </p>

        {/* Call to Actions (Direct multi-page routing) */}
        <div className="flex flex-wrap items-center justify-center gap-4 relative z-20">
          <Link
            href="/work"
            prefetch={true}
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-heading font-black text-xs uppercase tracking-wider hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors duration-200 shadow-lg shadow-blue-600/25 flex items-center gap-2 pointer-events-auto cursor-pointer"
          >
            <span>Explore Work Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/contact"
            prefetch={true}
            className="px-6 py-3 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-heading font-bold text-xs uppercase tracking-wider hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 pointer-events-auto cursor-pointer"
          >
            <span>Let&apos;s Talk</span>
          </Link>
        </div>
      </div>

      {/* 5. Two Opposite-Direction Infinite Tech Marquees */}
      <div className="relative z-10 mt-14">
        <HeroMarquee />
      </div>

      {/* 6. "Receipts, not vibes" Proof Strip */}
      <div className="relative z-10">
        <ProofStrip />
      </div>

      {/* Bobbing Scroll Down Hint */}
      <div className="flex justify-center pb-8 relative z-10">
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-[10px] font-mono text-[var(--muted)] uppercase tracking-widest select-none"
        >
          <span>Scroll to explore</span>
          <ArrowDown className="w-3.5 h-3.5 text-[var(--accent)]" />
        </motion.div>
      </div>
    </section>
  );
}
