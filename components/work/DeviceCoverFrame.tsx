'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ProjectGradientArt } from './ProjectGradientArt';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface DeviceCoverFrameProps {
  title: string;
  cover?: string;
  accent: string;
  accent2: string;
}

export function DeviceCoverFrame({
  title,
  cover,
  accent,
  accent2,
}: DeviceCoverFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl border shadow-xl overflow-hidden backdrop-blur-xl transition-all duration-300"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: `${accent}40`,
        boxShadow: `0 20px 40px -15px ${accent}25`,
      }}
    >
      {/* Browser / Device Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: `${accent}20`,
          backgroundColor: 'var(--surface-2)',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div
          className="px-4 py-1 rounded-md text-[11px] font-mono tracking-wider border truncate max-w-[240px] sm:max-w-md text-center"
          style={{
            borderColor: `${accent}25`,
            backgroundColor: 'var(--surface)',
            color: 'var(--ink)',
          }}
        >
          {title.toLowerCase().replace(/\s+/g, '-')}.case-study
        </div>
        <div className="w-12" />
      </div>

      {/* Screen Frame Content */}
      <div className="relative overflow-hidden">
        {cover ? (
          <motion.div
            style={{ y: prefersReducedMotion ? 0 : y }}
            className="relative w-full h-72 sm:h-[450px]"
          >
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </motion.div>
        ) : (
          <ProjectGradientArt
            title={title}
            accent={accent}
            accent2={accent2}
            large
          />
        )}
      </div>
    </div>
  );
}
