'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { Reveal } from '@/components/shared/Reveal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { siteStats } from '@/lib/projects';

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

    const start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
    <span ref={ref} className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  const statsList = [
    { label: 'Company Websites', value: siteStats.companyWebsites, suffix: '' },
    { label: 'Live in Production', value: siteStats.liveSites, suffix: '' },
    { label: 'Real-time Projects', value: siteStats.realtimeSites, suffix: '' },
    { label: 'Technical Credentials', value: 8, suffix: '+' },
  ];

  return (
    <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-12 border-y border-white/[0.08] bg-black/40 backdrop-blur-md">
      <Reveal direction="up" delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {statsList.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col ${
                idx > 0 && idx < 2 ? 'pt-4 md:pt-0 md:pl-6' : idx >= 2 ? 'pt-4 md:pt-0 md:pl-6' : ''
              }`}
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">
                [Metric // 0{idx + 1}]
              </div>
              <StatCounter target={stat.value} suffix={stat.suffix} />
              <div className="mt-1 text-xs sm:text-sm font-sans text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
