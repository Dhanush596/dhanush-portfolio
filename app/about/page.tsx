'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Award,
  Layers,
  MapPin,
  CheckCircle2,
  FileText,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Heart,
  Sparkles,
} from 'lucide-react';
import { Reveal } from '@/components/shared/Reveal';
import { TiltCard } from '@/components/shared/TiltCard';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { PERSONAL_INFO } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--act-bg)] text-[var(--ink)] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-semibold">About</span>
          </div>
        </Reveal>

        {/* 1. Header Hero Card with User's Official Profile Photo */}
        <Reveal delay={0.1}>
          <div className="relative p-8 sm:p-10 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl overflow-hidden mb-12">
            <BorderBeam duration={8} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--accent-2)" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Photo */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-[var(--accent)] shadow-2xl shrink-0 group">
                <Image
                  src="/dhanush-profile.jpg"
                  alt="Dhanush A - Software Engineer"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 144px, 176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded-lg bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 border border-emerald-500/30 text-center">
                  ● ACTIVE DEV
                </div>
              </div>

              {/* Bio & Intro */}
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-xs font-mono text-[var(--muted)] mb-3 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>Kasaragod → Mangalore → Bangalore</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-5xl font-black uppercase tracking-tight text-[var(--ink)] leading-tight mb-2">
                  Dhanush A
                </h1>
                <p className="text-base sm:text-lg font-semibold text-[var(--accent)] mb-4">
                  Software Engineer & Cloud-Native Architect
                </p>

                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6 font-sans">
                  Currently engineering web and mobile platforms at <strong className="text-[var(--ink)]">PrimePro.ai</strong> in Bangalore. Driven by clean code architectures, container security with Trivy, and declarative GitOps pipelines with ArgoCD and Kubernetes.
                </p>

                {/* Quick Info Chips */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-[var(--muted)]">
                    MCA Grad · 2026 (VTU)
                  </span>
                  <span className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    BCA 8.2 CGPA
                  </span>
                  <span className="px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-bold">
                    DevOps Score: 100/100
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 2. Structured Sections with Direct "View All" Navigation */}
        <div className="space-y-8 mb-16">
          {/* Section A: Academic Education & Markscards */}
          <Reveal delay={0.15}>
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[var(--accent)]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0 mt-1">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-500 uppercase">
                      [ACADEMIC BACKGROUND]
                    </span>
                    <span className="text-[10px] font-mono text-[var(--muted)] px-2 py-0.2 rounded bg-[var(--act-tint)] border border-[var(--line)]">
                      MCA · BCA · PUC · 10TH
                    </span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] mb-1">
                    Degrees & Academic Systems
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                    Postgraduate study in Cloud & AI at Srinivas Institute of Technology (VTU) and BCA at Sharada Degree College (8.2 CGPA). Includes academic projects such as Mental Health Monitor and Online Grocery Store.
                  </p>
                </div>
              </div>

              <Link
                href="/education"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-[var(--accent)] text-white font-mono text-xs font-bold hover:bg-[var(--accent-2)] transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md shadow-[var(--accent)]/15"
              >
                <span>View Education & Markscards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Section B: Experience & Internships */}
          <Reveal delay={0.2}>
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-emerald-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      [CAREER & INTERNSHIPS]
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 px-2 py-0.2 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">
                      100/100 DevOps Honor
                    </span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] mb-1">
                    Work Experience & Internships
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                    Full-time Web & App Developer at PrimePro.ai, DevOps internship at Rooman Technologies (GitOps, ArgoCD, K3s), and full-stack development internship at Encode Data Tech.
                  </p>
                </div>
              </div>

              <Link
                href="/experience"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 shrink-0 shadow-md shadow-emerald-600/15"
              >
                <span>View Full Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Section C: Projects Catalog */}
          <Reveal delay={0.25}>
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[var(--accent)]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] shrink-0 mt-1">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[var(--accent)] uppercase">
                      [COMPLETE PORTFOLIO]
                    </span>
                    <span className="text-[10px] font-mono text-[var(--muted)] px-2 py-0.2 rounded bg-[var(--act-tint)] border border-[var(--line)]">
                      BCA, MCA, Internships & Live
                    </span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] mb-1">
                    Projects & Architectures
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                    Explore all projects starting with BCA & MCA academic platforms, enterprise internship architectures, and live commercial platforms in their dedicated section.
                  </p>
                </div>
              </div>

              <Link
                href="/work"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--accent)] text-[var(--ink)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          {/* Section D: Verified Credentials Archive */}
          <Reveal delay={0.3}>
            <div className="p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-purple-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-1">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">
                      [SECURITY-PROTECTED ARCHIVE]
                    </span>
                    <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 px-2 py-0.2 rounded bg-purple-500/10 border border-purple-500/20 font-bold">
                      View-Only · Anti-Capture
                    </span>
                  </div>
                  <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] mb-1">
                    Certifications & Markscards
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted)] max-w-xl leading-relaxed">
                    Repository of 9+ verified technical certifications and all official semester markscards with anti-screenshot security shielding and view-only permissions.
                  </p>
                </div>
              </div>

              <Link
                href="/credentials"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-[var(--surface)] border border-[var(--line)] hover:border-purple-500 text-[var(--ink)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm"
              >
                <span>Inspect Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* 3. Engineering Values Strip */}
        <Reveal delay={0.35}>
          <div className="p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-lg mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-bold block mb-2">
              [ENGINEERING PRINCIPLES]
            </span>
            <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-[var(--ink)] mb-6">
              How I Build Software
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-4 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)]">
                <span className="text-xs font-mono text-[var(--accent)] font-bold block mb-1">
                  01 // READABILITY & RIGOR
                </span>
                <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-1">
                  Maintainable Code
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Clean modular patterns, strong TypeScript typing, comprehensive API contracts, and predictable state transitions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)]">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                  02 // GITOPS & CLOUD
                </span>
                <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-1">
                  Automated Delivery
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Self-healing ArgoCD synchronization, automated Trivy container security scans, and immutable Infrastructure-as-Code via Terraform.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)]">
                <span className="text-xs font-mono text-[var(--pop)] font-bold block mb-1">
                  03 // MEASURED IMPACT
                </span>
                <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-1">
                  Real Business Value
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  Delivering performant, accessible web platforms that solve real commercial problems rather than chasing superficial complexity.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4. Bottom Action Links */}
        <Reveal delay={0.4}>
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)]">
            <div>
              <span className="text-xs font-mono text-[var(--muted)] block">Ready to collaborate or discuss an opportunity?</span>
              <span className="font-heading text-lg font-bold text-[var(--ink)]">Let&apos;s engineer something reliable together.</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/resume"
                className="px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs font-bold hover:border-[var(--accent)] transition-all flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span>Resume (View/Download)</span>
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white font-mono text-xs font-bold hover:bg-[var(--accent-2)] transition-colors flex items-center gap-2 shadow-md shadow-[var(--accent)]/15"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
