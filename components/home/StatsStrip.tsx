'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Globe, Layers, Briefcase, Award } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Reveal } from '@/components/shared/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { STATS } from '@/lib/data';

interface StatCounterProps {
  target: number;
  suffix?: string;
}

function StatCounter({ target, suffix = '' }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    if (!isInView) return;

    let start = 0;
    const duration = 1600; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(start + (target - start) * ease);
      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, prefersReducedMotion]);

  return (
    <span ref={ref} className="font-heading font-bold text-3xl sm:text-5xl text-[var(--accent)]">
      {count}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const statIcons = [Globe, Layers, Briefcase, Award];

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 -mt-6 mb-20 max-w-6xl mx-auto">
      <Reveal direction="up" delay={0.1}>
        <GlassCard className="p-6 sm:p-8 border-[var(--accent)]/20 shadow-xl bg-[var(--card-bg)]/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
            {STATS.map((stat, idx) => {
              const Icon = statIcons[idx % statIcons.length];
              return (
                <div
                  key={stat.label}
                  className={`flex flex-col items-center text-center ${
                    idx > 0 && idx < 2 ? 'pt-4 md:pt-0' : idx >= 2 ? 'pt-4 md:pt-0' : ''
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <StatCounter target={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 text-xs sm:text-sm font-medium text-[var(--text)]/70 tracking-wide">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </Reveal>
    </section>
  );
}
