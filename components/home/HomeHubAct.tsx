'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  User,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { TiltCard } from '@/components/shared/TiltCard';

export function HomeHubAct() {
  return (
    <section id="directory" className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Eyebrow Header */}
      <Reveal delay={0.05}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
          <div>
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
              [PORTFOLIO HUB // DIRECTORY & SECTIONS]
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
              Engineering{' '}
              <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
                overview
              </span>
              .
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
            Concise index of projects, career history, academic degrees, and verified credentials. Select a section to explore comprehensive case studies and records.
          </p>
        </div>
      </Reveal>

      {/* Grid of Section Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Projects (Starts with BCA & MCA) */}
        <Reveal delay={0.1}>
          <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-[var(--accent)]/50 transition-all">
            <BorderBeam duration={7} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--accent-2)" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
                <span className="text-xs font-mono text-[var(--accent)] font-bold">
                  [01 // PROJECTS ARCHIVE]
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--act-tint)] text-[var(--muted)] border border-[var(--line)]">
                  21 Architectures
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--ink)] tracking-tight mb-2">
                Projects & Engineering Systems
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Full-stack architectures and machine learning systems starting with <strong className="text-[var(--ink)]">BCA & MCA Academic Platforms</strong> (Mental Health Monitor, Online Grocery Store, Study Assistant), verified internship pipelines, and commercial production platforms in their dedicated section.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span><strong>MCA Projects:</strong> Mental Health Monitor (ML) & AI Study Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span><strong>BCA Projects:</strong> Online Grocery Store E-Commerce & Intelligent Payroll</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Dedicated Section:</strong> Live Commercial Deployments & Client Platforms</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[var(--line)]">
              <Link
                href="/work"
                prefetch={true}
                className="w-full py-3 px-4 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--accent)]/15 group"
              >
                <span>View All Projects (BCA, MCA, Internships & Live)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Card 2: Work Experience & 2 Internships */}
        <Reveal delay={0.15}>
          <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-emerald-500/50 transition-all">
            <BorderBeam duration={8} borderWidth={1.5} colorFrom="#10B981" colorTo="var(--accent)" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  [02 // EXPERIENCE & CAREER]
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold">
                  Score: 100/100
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--ink)] tracking-tight mb-2">
                Work Experience & 2 Internships
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Full-time software engineering at <strong className="text-[var(--ink)]">PrimePro.ai</strong> (12 production websites) along with two verified enterprise internships in DevOps and Full-Stack development.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>PrimePro.ai:</strong> Web & App Developer (Sep 2026 – Present, Full-Time)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Rooman Technologies:</strong> DevOps Intern (Score: 100/100, ArgoCD & K3s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span><strong>Encode Data Tech:</strong> Full-Stack Development Intern (Agile Sprints)</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[var(--line)]">
              <Link
                href="/experience"
                prefetch={true}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-600/15 group"
              >
                <span>View Full Experience & Internships</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Card 3: Academic Qualifications & Transcripts */}
        <Reveal delay={0.2}>
          <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-amber-500/50 transition-all">
            <BorderBeam duration={8} borderWidth={1.5} colorFrom="#F59E0B" colorTo="var(--accent)" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
                <span className="text-xs font-mono text-amber-500 font-bold">
                  [03 // ACADEMIC QUALIFICATIONS]
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 font-bold">
                  BCA 8.2 CGPA
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--ink)] tracking-tight mb-2">
                Education & Semester Markscards
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Higher educational degrees and official semester markscards protected by anti-screenshot security shielding and view-only permissions (strictly no downloads).
              </p>

              <div className="space-y-2 mb-6 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>MCA (2024–2026):</strong> Srinivas Institute of Technology, Mangalore (VTU)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>BCA (2021–2024):</strong> Sharada Degree College, Mangalore (8.2 CGPA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span><strong>PUC & 10th SSLC:</strong> Pre-University Science & NIOS Secondary Board</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[var(--line)]">
              <Link
                href="/education"
                prefetch={true}
                className="w-full py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-amber-500 text-[var(--ink)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm group"
              >
                <span>View Education & Protected Markscards</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* Card 4: Verified Credentials & Certifications */}
        <Reveal delay={0.25}>
          <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-purple-500/50 transition-all">
            <BorderBeam duration={9} borderWidth={1.5} colorFrom="#A855F7" colorTo="var(--accent)" />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-5">
                <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-bold">
                  [04 // CREDENTIALS & CERTS]
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 font-bold">
                  View-Only Protected
                </span>
              </div>

              <h3 className="font-heading text-2xl font-bold text-[var(--ink)] tracking-tight mb-2">
                Certifications & Trophy Records
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
                Complete archive of 9+ verified technical certifications (Google AI/ML, AWS AI/ML, Cloud Computing, Ethical Hacking, Advanced Python) and official academic documents.
              </p>

              <div className="space-y-2 mb-6 text-xs text-[var(--muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span><strong>AI & Cloud:</strong> Google AI/ML, AWS AI/ML, Cloud Computing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span><strong>Software & Security:</strong> Advanced Python, ML with Python, Ethical Hacking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span><strong>Document Security:</strong> Anti-screenshot shield & zero download permissions</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-[var(--line)]">
              <Link
                href="/credentials"
                prefetch={true}
                className="w-full py-3 px-4 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-purple-500 text-[var(--ink)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm group"
              >
                <span>View All Protected Credentials Archive</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Card 5: Full-Width About & Story Banner */}
      <Reveal delay={0.3}>
        <div className="mt-8 p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[var(--accent)]/40 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0 font-heading font-black text-xl">
              DA
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase">
                  [THE HUMAN BEHIND THE CODE]
                </span>
                <span className="text-[10px] font-mono text-[var(--muted)]">
                  Kasaragod → Mangalore → Bangalore
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-[var(--ink)]">
                About Dhanush A & Engineering Values
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl mt-0.5">
                Software engineer passionate about scalable full-stack applications, developer experience, and cloud delivery pipelines.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/resume"
              prefetch={true}
              className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs font-bold hover:border-[var(--accent)] transition-all text-center"
            >
              Resume (View & Download)
            </Link>
            <Link
              href="/about"
              prefetch={true}
              className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-[var(--ink)] text-[var(--act-bg)] font-mono text-xs font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-md"
            >
              <span>Read Full Bio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
