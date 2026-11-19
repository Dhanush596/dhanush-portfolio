'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Code2, Cloud, Terminal } from 'lucide-react';
import { GlassCard } from '@/components/shared/GlassCard';
import { Reveal } from '@/components/shared/Reveal';
import { WHAT_I_DO } from '@/lib/data';

export function WhatIDo() {
  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Reveal direction="up" delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--card-bg)] text-xs font-mono text-[var(--accent)] mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)]">
            What I Do
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[var(--text)]/70 max-w-2xl mx-auto">
            Bridging end-to-end full-stack software development with automated cloud infrastructure and GitOps reliability.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {WHAT_I_DO.map((item, index) => {
          const isFullStack = item.id === 'full-stack';
          const Icon = isFullStack ? Code2 : Cloud;

          return (
            <Reveal key={item.id} direction="up" delay={0.2 * index}>
              <GlassCard className="h-full p-8 flex flex-col justify-between group relative overflow-hidden border-[var(--accent)]/20 hover:border-[var(--accent)]/50">
                {/* Ambient glow in corner */}
                <div
                  className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: item.accent }}
                />

                <div className="relative z-10">
                  {/* Category & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-md"
                      style={{ color: item.accent }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)]">
                        {item.subtitle}
                      </span>
                      <h3 className="font-heading text-2xl font-bold text-[var(--text)]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-[var(--text)]/80 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="mb-6">
                    <div className="text-xs font-mono text-[var(--text)]/60 mb-2 uppercase tracking-wider">
                      Primary Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono font-medium rounded-lg border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Bullets */}
                  <ul className="space-y-2.5 mb-8">
                    {item.highlights.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-[var(--text)]/80">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: item.accent }}
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="relative z-10 pt-4 border-t border-[var(--card-border)]">
                  <Link
                    href={isFullStack ? '/stack' : '/devops-lab'}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:translate-x-1 transition-transform duration-200"
                  >
                    <span>{isFullStack ? 'Explore Tech Stack' : 'Explore DevOps Lab'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
