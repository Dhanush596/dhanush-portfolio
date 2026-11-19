'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, Cloud, Check } from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { WHAT_I_DO } from '@/lib/data';

export function WhatIDo() {
  return (
    <section className="relative z-10 px-4 sm:px-8 lg:px-12 py-20 border-b border-white/[0.08]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <Reveal direction="up" delay={0.05}>
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>[03] // ENGINEERING CAPABILITIES</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
            What I Do
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <p className="text-sm sm:text-base text-white/50 max-w-md font-sans leading-relaxed">
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
              <div className="h-full p-8 sm:p-10 rounded-xl border border-white/[0.08] bg-black/60 hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6 font-mono text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-white/80" />
                      <span className="uppercase tracking-widest text-white/70">{item.subtitle}</span>
                    </div>
                    <span>[DISCIPLINE // 0{index + 1}]</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans mb-8">
                    {item.description}
                  </p>

                  {/* Primary Tech Stack */}
                  <div className="mb-8">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3">
                      Core Technologies
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded border border-white/[0.08] bg-white/[0.03] text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-8">
                    {item.highlights.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70 font-sans">
                        <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/40" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-6 border-t border-white/[0.08]">
                  <Link
                    href={isFullStack ? '/stack' : '/devops-lab'}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/70 hover:text-white group-hover:translate-x-1 transition-all duration-200"
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
