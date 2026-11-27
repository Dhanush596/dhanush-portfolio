'use client';

import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function SkillSpiral() {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [flippedSkill, setFlippedSkill] = useState<string | null>(null);

  const activeCategory = SKILL_CATEGORIES[selectedCategory] || SKILL_CATEGORIES[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent-2)] uppercase tracking-widest block mb-2 font-semibold">
            [4.1 TECHNICAL REPERTOIRE]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            The engineering{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)] bg-clip-text text-transparent font-normal italic lowercase">
              toolkit
            </span>
            .
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Core primitives, languages, frameworks, cloud tooling, and architectural patterns. Click any skill chip to inspect competency details.
        </p>
      </div>

      {/* Category Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const isActive = selectedCategory === idx;
          return (
            <button
              key={cat.category}
              type="button"
              onClick={() => {
                setSelectedCategory(idx);
                setFlippedSkill(null);
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                isActive
                  ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)] shadow-sm'
              }`}
            >
              {cat.category}
            </button>
          );
        })}
      </div>

      {/* Active Category Header */}
      <div className="text-center mb-10">
        <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
          {activeCategory.category}
        </h3>
        <p className="text-xs font-mono text-[var(--muted)] mt-1">
          {activeCategory.description}
        </p>
      </div>

      {/* 3D Skills Grid Showcase */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeCategory.items.map((skill, idx) => {
          const isFlipped = flippedSkill === skill.name;
          const floatClass = idx % 3 === 0 ? 'animate-float-1' : idx % 3 === 1 ? 'animate-float-2' : 'animate-float-3';
          return (
            <div
              key={skill.name}
              data-cursor="Open"
              onClick={() => setFlippedSkill(isFlipped ? null : skill.name)}
              className={`relative min-h-[140px] rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-md overflow-hidden p-6 cursor-pointer group hover:border-[var(--accent)] hover:shadow-2xl transition-all duration-300 select-none ${floatClass}`}
            >
              <BorderBeam
                duration={5.5 + (idx % 3)}
                borderWidth={1.5}
                colorFrom="var(--accent-2)"
                colorTo="var(--accent)"
                colorPop="var(--pop)"
              />

              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-lg text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)] font-semibold">
                    {skill.tag || skill.level}
                  </span>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--muted)]">
                  <span>Proficiency Level</span>
                  <span className="text-[var(--ink)] font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok)]" />
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Flipped Detail Drawer */}
              {isFlipped && (
                <div className="absolute inset-0 bg-[var(--surface)] rounded-2xl p-5 border border-[var(--accent)] flex flex-col justify-between z-20 shadow-2xl">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--accent)] font-bold uppercase tracking-wider block mb-1">
                      [COMPETENCY VERIFIED]
                    </span>
                    <h4 className="font-heading font-bold text-base text-[var(--ink)]">
                      {skill.name}
                    </h4>
                    <p className="text-xs text-[var(--muted)] mt-1.5 font-sans leading-relaxed">
                      Production engineering experience applied in live web systems and automated delivery workflows.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                    Click to close
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
