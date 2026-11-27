'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { TiltCard } from '@/components/shared/TiltCard';
import { CheckCircle2, Globe, Briefcase, Award } from 'lucide-react';

function CounterNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / target));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export function ProofStrip() {
  const proofItems = [
    {
      value: 12,
      suffix: '',
      label: 'Production Websites Built',
      badge: 'Client Platforms',
      icon: Globe,
      accent: 'var(--accent)',
    },
    {
      value: 4,
      suffix: '',
      label: 'Core Cloud Architectures',
      badge: 'GitOps Synced',
      icon: CheckCircle2,
      accent: 'var(--ok)',
    },
    {
      value: 2,
      suffix: '',
      label: 'Verified Internships',
      badge: 'Score: 100/100',
      icon: Briefcase,
      accent: 'var(--accent-2)',
    },
    {
      value: 9,
      suffix: '+',
      label: 'Certifications & Credentials',
      badge: 'Industry Verified',
      icon: Award,
      accent: 'var(--warn)',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Ticker Eyebrow Header */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-[var(--line)] text-xs font-mono">
        <span className="text-[var(--muted)] uppercase tracking-wider font-semibold">
          Receipts, not vibes.
        </span>
        <div className="flex items-center gap-2 overflow-hidden text-[10px] text-[var(--muted)]/60 uppercase tracking-widest select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)]" />
          <span>VERIFIED · PINKY PROMISE · ZERO DRIFT</span>
        </div>
      </div>

      {/* Proof Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {proofItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <TiltCard
              key={idx}
              beamDuration={5.5 + idx}
              floatEffect={false}
              className={`p-6 flex flex-col justify-between group select-none ${
                idx % 2 === 0 ? 'animate-float-1' : 'animate-float-2'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] transition-colors"
                  >
                    <Icon className="w-4 h-4" style={{ color: item.accent }} />
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)] font-semibold">
                    {item.badge}
                  </span>
                </div>

                <div className="my-2">
                  <CounterNumber target={item.value} suffix={item.suffix} />
                </div>
              </div>

              <p className="text-xs font-mono text-[var(--muted)] leading-relaxed mt-2 border-t border-[var(--line)] pt-3">
                {item.label}
              </p>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
