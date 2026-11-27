'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/shared/BorderBeam';

interface StickerItem {
  id: string;
  label: string;
  sub: string;
  color: string;
  initialRotation: number;
  className: string;
  animationClass: string;
}

const STICKERS: StickerItem[] = [
  {
    id: 'sticker-journey',
    label: 'Kasaragod → Mangalore → Bangalore',
    sub: 'Software Journey',
    color: '#10B981',
    initialRotation: -6,
    className: 'top-6 -left-4 sm:-left-8',
    animationClass: 'animate-sticker-1',
  },
  {
    id: 'sticker-devops',
    label: '100 / 100 Score',
    sub: 'Rooman DevOps Honor',
    color: '#2563EB',
    initialRotation: 7,
    className: 'top-1/4 -right-4 sm:-right-8',
    animationClass: 'animate-sticker-2',
  },
  {
    id: 'sticker-mca',
    label: 'MCA Grad · 2026',
    sub: 'SIT Mangalore (VTU)',
    color: '#7C3AED',
    initialRotation: -4,
    className: 'bottom-16 -left-4 sm:-left-8',
    animationClass: 'animate-sticker-3',
  },
  {
    id: 'sticker-bca',
    label: 'BCA 8.2 CGPA',
    sub: 'Sharada Degree College',
    color: '#F59E0B',
    initialRotation: 5,
    className: 'bottom-8 -right-4 sm:-right-8',
    animationClass: 'animate-sticker-4',
  },
];

export function Polaroids() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative select-none">
      {/* Section Header */}
      <div className="text-center mb-14">
        <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
          [PROFILE & VALUES]
        </span>
        <h3 className="font-heading text-3xl sm:text-4xl font-black text-[var(--ink)] uppercase tracking-tight">
          The human behind the{' '}
          <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--ok)] bg-clip-text text-transparent font-normal italic lowercase">
            code
          </span>
          .
        </h3>
        <p className="text-xs font-mono text-[var(--muted)] mt-2">
          (Interactive: drag the stickers around the profile card)
        </p>
      </div>

      {/* Outer Card Wrapper with safe margins so floating stickers never overlap text */}
      <div className="relative max-w-3xl mx-auto">
        {/* Floating Rotating Stickers with Animated Light Border Beam */}
        {STICKERS.map((stk) => (
          <motion.div
            key={stk.id}
            drag
            dragConstraints={{ top: -60, left: -60, right: 60, bottom: 60 }}
            whileHover={{ scale: 1.1, zIndex: 50 }}
            whileDrag={{ scale: 1.15, zIndex: 60 }}
            className={`absolute hidden md:block z-30 cursor-grab active:cursor-grabbing rounded-2xl select-none ${stk.className} ${stk.animationClass}`}
          >
            {/* The outer glowing light beam circling the sticker */}
            <div className="relative rounded-2xl overflow-hidden p-[1.5px] shadow-xl">
              <BorderBeam
                duration={4.5}
                borderWidth={1.5}
                colorFrom={stk.color}
                colorTo="var(--accent)"
                colorPop="var(--pop)"
              />
              <div className="relative z-10 px-4 py-3 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: stk.color }}
                  />
                  <span className="font-heading font-bold text-xs text-[var(--ink)] whitespace-nowrap">
                    {stk.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted)] block mt-0.5">
                  {stk.sub}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Main Floating Profile Card with Orbiting Border Beam */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-float-1 p-[1.5px]">
          {/* Animated Light Moving Around the Profile Card */}
          <BorderBeam duration={7} borderWidth={1.5} />

          {/* Profile Card Body */}
          <div className="relative z-10 rounded-3xl bg-[var(--surface)] p-8 sm:p-14 border border-[var(--line)]">
            <div className="max-w-md mx-auto flex flex-col items-center text-center">
              {/* Portrait Image with subtle float */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border-2 border-[var(--accent)] shadow-xl shadow-[var(--accent)]/15 mb-6 shrink-0 bg-[var(--surface-2)] animate-float-2">
                <Image
                  src="/dhanush-profile.jpg"
                  alt="Dhanush A"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 128px, 144px"
                  priority
                />
              </div>

              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold block mb-1">
                Software Engineer & Cloud-Native Architect
              </span>
              <h4 className="font-heading font-black text-3xl sm:text-4xl text-[var(--ink)] tracking-tight mb-4">
                Dhanush A
              </h4>

              <p className="text-sm sm:text-base text-[var(--ink)] font-sans leading-relaxed mb-6">
                Currently engineering web applications at PrimePro.ai. Dedicated to shipping robust, clean, and accessible user experiences backed by resilient cloud delivery pipelines and declarative GitOps automation.
              </p>

              <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
                I prioritize readable code, automated testing, container security with Trivy, and pragmatic solutions that deliver real-world business value over unnecessary complexity.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Stickers Grid (Visible on small screens, never overlaps text) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 md:hidden">
          {STICKERS.map((stk) => (
            <div
              key={`mobile-${stk.id}`}
              className="relative rounded-2xl overflow-hidden p-[1.5px] shadow-md"
            >
              <BorderBeam
                duration={5}
                borderWidth={1.5}
                colorFrom={stk.color}
                colorTo="var(--accent)"
                colorPop="var(--pop)"
              />
              <div className="relative z-10 px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: stk.color }}
                  />
                  <span className="font-heading font-bold text-xs text-[var(--ink)]">
                    {stk.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--muted)] block mt-0.5">
                  {stk.sub}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
