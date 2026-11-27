'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Cloud, Check } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { WHAT_I_DO } from '@/lib/data';

export function WhatIDo() {
  return (
    <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-20 border-b border-[var(--line)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <Reveal direction="up" delay={0.05}>
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent)] mb-3 flex items-center gap-2 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>[03] // ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[var(--ink)] uppercase leading-[0.95]">
            What I Do
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="text-sm sm:text-base text-[var(--muted)] max-w-md font-sans leading-relaxed">
            Bridging end-to-end full-stack software development with automated cloud infrastructure and GitOps reliability.
          </p>
        </Reveal>
      </div>

      {/* Two Pillar Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {WHAT_I_DO.map((item, index) => {
          const isFullStack = item.id === 'full-stack';
          const Icon = isFullStack ? Code2 : Cloud;

          return (
            <Reveal key={item.id} direction="up" delay={0.15 * index}>
              <div className="h-full p-8 sm:p-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/50 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6 font-mono text-xs text-[var(--muted)]">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[var(--accent)]" />
                      <span className="uppercase tracking-widest text-[var(--ink)] font-semibold">{item.subtitle}</span>
                    </div>
                    <span>[DISCIPLINE // 0{index + 1}]</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--ink)] mb-4 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-sans mb-8">
                    {item.description}
                  </p>

                  {/* Primary Tech Stack */}
                  <div className="mb-8">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--muted)] mb-3">
                      Core Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-8">
                    {item.highlights.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted)] font-sans">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-6 border-t border-[var(--line)]">
                  <Link
                    href={isFullStack ? '/stack' : '/devops-lab'}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--muted)] hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-200 font-semibold"
                  >
                    <span>{isFullStack ? 'Explore Tech Stack' : 'View DevOps Lab'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
