'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  Lock,
  ArrowRight,
  ShieldCheck,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { EXPERIENCES, INTERNSHIP_CREDENTIALS } from '@/lib/data';
import { Reveal } from '@/components/shared/Reveal';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { ProtectedDocumentModal } from '@/components/shared/ProtectedDocumentModal';

export default function ExperiencePage() {
  const [selectedDoc, setSelectedDoc] = useState<{
    isOpen: boolean;
    title: string;
    issuer: string;
    fileUrl: string;
    category: string;
  }>({
    isOpen: false,
    title: '',
    issuer: '',
    fileUrl: '',
    category: '',
  });

  const openProtectedDoc = (title: string, issuer: string, fileUrl: string, category: string) => {
    setSelectedDoc({
      isOpen: true,
      title,
      issuer,
      fileUrl,
      category,
    });
  };

  const closeProtectedDoc = () => {
    setSelectedDoc((prev) => ({ ...prev, isOpen: false }));
  };

  const workProjects = [
    {
      title: 'Marichin Homestay',
      slug: 'marichin-homestay',
      role: 'Full-Stack Engineer (Planned & Built 100% from Scratch + Admin Panel)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Luxury coffee estate retreat reservation platform in Coorg. Planned and fully developed 100% from scratch for PrimePro.ai, with dedicated Admin Panel.',
      stack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Admin Panel', 'Render'],
      features: [
        'Planned and fully developed 100% from scratch by Dhanush for PrimePro.ai.',
        'Custom Admin Panel built from scratch for room reservation & guest pricing control.',
        'Real-time guest booking inquiry pipeline and calendar date availability validation.',
      ],
      liveUrl: 'https://marichinhomestay.in/',
    },
    {
      title: 'Karnataka Kalyanothsava',
      slug: 'karnataka-kalyanothsava',
      role: 'Full-Stack Engineer (Planned & Built 100% from Scratch + Admin Panel)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Premier matrimonial and cultural matchmaking platform. Planned and fully developed 100% from scratch for PrimePro.ai, with dedicated Admin Panel.',
      stack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Admin Panel', 'Tailwind CSS'],
      features: [
        'Planned and fully developed 100% from scratch by Dhanush for PrimePro.ai.',
        'Dedicated Admin Panel built from scratch for member verification and event management.',
        'Structured matchmaking filters, photo privacy protection, and multi-language support.',
      ],
      liveUrl: 'https://karnatakakalyanothsava.com/',
    },
    {
      title: 'Alankar Fashion (AlankarStyles)',
      slug: 'alankarstyles',
      role: 'Full-Stack Engineer (MERN Migration & Admin Panel from Scratch)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Modernized ethnic fashion & optical store. First live commercial website worked on in the industry. Migrated from HTML/CSS/PHP to MERN stack, full UI/UX makeover, and built Admin Panel from scratch.',
      stack: ['MERN Stack', 'React 18', 'Node.js', 'Express', 'MongoDB Atlas', 'Admin Panel'],
      features: [
        'First commercial live website worked on in the industry (developed for PrimePro.ai).',
        'Migrated legacy architecture from HTML/CSS/PHP to modern MERN stack.',
        'Complete UI/UX makeover from scratch and engineered custom Admin Panel from scratch.',
      ],
      liveUrl: 'https://alankarfashion.in/',
    },
    {
      title: 'Bangalore Vibes (Celebration Lounge)',
      slug: 'bangalore-32-vibes',
      role: 'Frontend & Process Engineer (Process Workflow & UI/UX Revamp)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Private celebration venue & lounge booking platform. Contributed to existing platform for PrimePro.ai: overhauled full process workflow, added new features, and revamped UI/UX.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
      features: [
        'Contributed to commercial platform built for PrimePro.ai (worked on existing system).',
        'Overhauled full reservation process workflow for hourly private lounge bookings.',
        'Revamped UI/UX for party package selection, add-on reservations, and car celebrations.',
      ],
      liveUrl: 'https://bangalorevibes.in/',
    },
    {
      title: 'Insta Car Towing Services',
      slug: 'instacartowing',
      role: 'UI/UX & Content Engineer (Information Architecture & UI/UX Redesign)',
      period: 'PrimePro.ai Work Time',
      tagline: '24/7 on-demand vehicle emergency towing & rescue platform across Bengaluru. Contributed to existing site for PrimePro.ai: updated core information and overhauled UI/UX for rapid dispatch.',
      stack: ['React', 'Tailwind CSS', 'WhatsApp GPS Dispatch', 'Emergency UI/UX'],
      features: [
        'Contributed to commercial live platform built for PrimePro.ai (worked on existing site).',
        'Restructured critical service information, location coverage, and pricing transparency.',
        'Overhauled emergency roadside assistance UI/UX with 1-tap call and WhatsApp GPS sharing.',
      ],
      liveUrl: 'https://instacartowing.com/',
    },
    {
      title: 'Haneesha Security Enterprise Platform',
      slug: 'security-service',
      role: 'Full-Stack Engineer / Lead Developer (Developed for PrimePro.ai)',
      period: 'PrimePro.ai Work Time',
      tagline: 'PSARA 2005 compliant physical security ERP, 24/7 guard rostering, and client command portal. Developed for PrimePro.ai.',
      stack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite 6', 'TanStack Query', 'PSARA Engine'],
      features: [
        'Developed for the company (PrimePro.ai) during work time.',
        '24/7 shift rostering and biometric attendance for 40+ security personnel.',
        'Commercial quotation engine with automatic 18% GST (SAC 998525) math.',
      ],
      liveUrl: 'https://securityservice.vercel.app/',
    },
    {
      title: 'Fernooo Furniture & Interiors',
      slug: 'mahanya-furniture-interiors',
      role: 'Full-Stack Engineer / Frontend Architect (Developed for PrimePro.ai)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Solid-wood furniture storefront, 5-step custom configurator, AI interior specialist, and Recharts telemetry. Developed for PrimePro.ai.',
      stack: ['React 19', 'Vite 8', 'Tailwind CSS v4', 'Zustand v5', 'Recharts', 'react-helmet-async'],
      features: [
        'Developed for the company (PrimePro.ai) during work time.',
        '44-product catalog with 5-step interactive custom furniture configurator.',
        'Deterministic 15-intent client-side AI interior specialist chat drawer.',
      ],
      liveUrl: 'https://fernooo.vercel.app/',
    },
    {
      title: 'SPORTS SPOT',
      slug: 'sports-spot',
      role: 'Full-Stack Lead Engineer & Architect (Developed for PrimePro.ai)',
      period: 'PrimePro.ai Work Time',
      tagline: 'Athletic apparel e-commerce platform, 13 performance fabrics, and multi-role enterprise admin console. Developed for PrimePro.ai.',
      stack: ['React', 'Vite', 'React Router', 'Axios', 'Recharts', 'MERN Architecture'],
      features: [
        'Developed for the company (PrimePro.ai) during work time.',
        '30 products across 5 categories and 13 technical performance fabrics.',
        'Zero-backend Axios request adapter translating 40+ REST endpoints to localStorage.',
      ],
      liveUrl: 'https://sportsspot-eight.vercel.app/',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--act-bg)] text-[var(--ink)] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb / Top Eyebrow */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors cursor-pointer pointer-events-auto">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-semibold">Experience</span>
          </div>
        </Reveal>

        {/* Hero Header */}
        <Reveal delay={0.1}>
          <div className="border-b border-[var(--line)] pb-8 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--muted)] mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>CAREER // 1 FULL-TIME ROLE · 2 VERIFIED INTERNSHIPS</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl font-black uppercase tracking-tight text-[var(--ink)] leading-none mb-4">
              Work &{' '}
              <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
                experience
              </span>
              .
            </h1>
            <p className="text-base sm:text-lg text-[var(--muted)] max-w-3xl leading-relaxed">
              Real-world software engineering at PrimePro.ai alongside 2 enterprise internships in DevOps (Rooman Technologies, perfect 100/100 score) and Full-Stack Engineering (Encode Data Tech).
            </p>
          </div>
        </Reveal>

        {/* Section 1: Full-time Industry Experience */}
        <section className="mb-16">
          <Reveal delay={0.15}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-[var(--ink)]">
                Full-Time Work
              </h2>
            </div>
          </Reveal>

          {/* PrimePro.ai Card */}
          <Reveal delay={0.2}>
            <div className="relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-lg overflow-hidden">
              <BorderBeam duration={7} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--accent-2)" />
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                        FULL-TIME
                      </span>
                      <span className="text-xs font-mono text-[var(--muted)]">
                        Bangalore, IN
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black text-[var(--ink)]">
                      Web & App Developer
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-[var(--accent)] mt-0.5">
                      PrimePro.ai
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-[var(--muted)] block">
                      Sep 2026 – Present
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Role
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
                  Architecting and deploying full-scale client web applications, e-commerce platforms, and high-performance digital solutions across varied industry verticals.
                </p>

                {/* Key Achievements */}
                <div className="mb-6 space-y-2.5">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-bold block mb-2">
                    Key Engineering Contributions:
                  </span>
                  <div className="p-3.5 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--ink)]">
                      Engineered and delivered <strong className="text-[var(--accent)]">12 production-ready websites and web applications</strong> from concept to deployment.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--ink)]">
                      Implemented full-stack architectures integrating modern frontends (React, Next.js, Tailwind CSS) with backend REST APIs and secure MongoDB/MySQL databases.
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)] flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[var(--ink)]">
                      Maintained high availability, sub-second page performance, and custom enterprise requirements across diverse client domains.
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--line)]">
                  {['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'MySQL', 'Tailwind CSS', 'Cloud Deployment'].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[var(--surface)] text-[var(--muted)] border border-[var(--line)]"
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Dedicated Section: Work Time Commercial Platforms */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold block mb-1">
                [PRIMEPRO.AI PRODUCTION BUILDS]
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[var(--ink)]">
                Key Systems Built During Work Time
              </h2>
            </div>
            <Link
              href="/work?status=live"
              className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer pointer-events-auto"
            >
              <span>View demo showcases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Demo Notice Banner */}
          <div className="mb-8 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono flex items-start gap-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse mt-1 shrink-0" />
            <p className="leading-relaxed">
              <strong>Demo Notice:</strong> These client websites are featured strictly for portfolio demonstration to show real-world engineering, UI/UX, and admin architecture. Client production domains and third-party servers may experience maintenance, updates, or service changes (not all 5 client websites are actively operational at all times).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workProjects.map((proj) => (
              <div
                key={proj.slug}
                className="p-6 sm:p-7 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      CLIENT PRODUCTION · DEMO
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">{proj.period}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[var(--ink)] mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--accent)] font-semibold mb-3">
                    {proj.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
                    {proj.tagline}
                  </p>

                  <div className="space-y-1.5 mb-5 text-xs text-[var(--muted)]">
                    {proj.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--act-tint)] text-[var(--muted)] border border-[var(--line)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between gap-2">
                  <Link
                    href={`/work/${proj.slug}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-[var(--act-tint)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--line)] font-mono text-xs font-bold transition-all text-center cursor-pointer pointer-events-auto"
                  >
                    Demo Showcase
                  </Link>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 rounded-xl border border-[var(--line)] hover:border-[var(--accent)] text-[var(--ink)] font-mono text-xs font-semibold flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                    >
                      <span>Live Website</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--accent)]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 2 Verified Internships & Their Detailed Architectures */}
        <section className="mb-16">
          <Reveal delay={0.25}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="font-heading text-2xl font-black uppercase tracking-tight text-[var(--ink)]">
                  Verified Internships & Projects
                </h2>
              </div>
              <span className="text-xs font-mono text-[var(--muted)]">
                [PROTECTED CREDENTIALS]
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Internship 1: Rooman Technologies (100/100 score) */}
            <Reveal delay={0.3}>
              <div className="relative p-6 sm:p-7 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-emerald-500/50 transition-all">
                <BorderBeam duration={8} borderWidth={1.5} colorFrom="#10B981" colorTo="var(--accent)" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                    <span className="text-xs font-mono text-[var(--muted)] font-semibold">
                      [INTERNSHIP // 01]
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                      Score: 100/100
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                    DevOps Engineering Intern
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
                    Rooman Technologies Ltd.
                  </p>
                  <p className="text-xs font-mono text-[var(--muted)] mb-4">
                    Feb 2026 – May 2026
                  </p>

                  <div className="p-3 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)] text-xs font-mono mb-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
                      Key Milestone Project:
                    </span>
                    <span className="text-[var(--ink)] font-semibold">
                      MERN GitOps CI/CD Pipeline Architecture on AWS EC2 & K3s Kubernetes
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
                    Hands-on enterprise experience in containerization, infrastructure provisioning, and continuous deployment workflows. Built the DevStream GitOps pipeline with zero drift.
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-[var(--muted)]">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>Constructed CI/CD pipelines via GitHub Actions with automated Trivy vulnerability scanning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>Orchestrated reproducible AWS EC2 infrastructure using Terraform IaC & Ansible.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>Configured Docker multi-stage builds and Kubernetes pod auto-scaling with ArgoCD sync.</span>
                    </li>
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {['Terraform', 'Ansible', 'Docker', 'Kubernetes K3s', 'ArgoCD', 'GitOps', 'AWS EC2', 'GitHub Actions', 'Trivy'].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--act-tint)] text-[var(--muted)] border border-[var(--line)]"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-[var(--line)] space-y-2">
                  <Link
                    href="/work/mern-gitops-pipeline"
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--act-tint)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--line)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                  >
                    <span>Inspect DevOps Architecture Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      openProtectedDoc(
                        'Rooman Technologies DevOps Internship Completion Certificate',
                        'Rooman Technologies Ltd. · Score: 100/100',
                        '/Certificates/InternshipCompletionCertificate.pdf',
                        'Verified Internship Certificate'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                  >
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>View Verified Certificate (View Only)</span>
                  </button>
                </div>
              </div>
            </Reveal>

            {/* Internship 2: Encode Data Tech */}
            <Reveal delay={0.35}>
              <div className="relative p-6 sm:p-7 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between h-full group hover:border-[var(--accent)]/50 transition-all">
                <BorderBeam duration={8} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--accent-2)" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                    <span className="text-xs font-mono text-[var(--muted)] font-semibold">
                      [INTERNSHIP // 02]
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30">
                      Verified
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                    Full-Stack Development Intern
                  </h3>
                  <p className="text-sm font-semibold text-[var(--accent)] mb-1">
                    Encode Data Tech
                  </p>
                  <p className="text-xs font-mono text-[var(--muted)] mb-4">
                    Apr 2024 – Jun 2024 (2 Months)
                  </p>

                  <div className="p-3 rounded-2xl bg-[var(--act-tint)] border border-[var(--line)] text-xs font-mono mb-4">
                    <span className="text-[var(--accent)] font-bold block mb-1">
                      Key Milestone Project:
                    </span>
                    <span className="text-[var(--ink)] font-semibold">
                      Online Grocery Store E-Commerce Platform (React, PHP & MySQL)
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed mb-4">
                    Designed and developed end-to-end commercial web modules, RESTful API integrations, and digital commerce platforms in fast-paced Agile sprint cycles.
                  </p>

                  <ul className="space-y-1.5 mb-6 text-xs text-[var(--muted)]">
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-0.5">•</span>
                      <span>Engineered responsive customer storefront with dynamic product catalog and shopping cart.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-0.5">•</span>
                      <span>Structured normalized MySQL relational schema with transactional checkout management.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[var(--accent)] mt-0.5">•</span>
                      <span>Managed Git collaborative workflows and participated in bi-weekly sprint reviews.</span>
                    </li>
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'React', 'Node.js', 'Express', 'Agile'].map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--act-tint)] text-[var(--muted)] border border-[var(--line)]"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-[var(--line)] space-y-2">
                  <Link
                    href="/work/online-grocery-store"
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--act-tint)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--line)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                  >
                    <span>Inspect E-Commerce Architecture Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      openProtectedDoc(
                        'Encode Data Tech Full-Stack Internship Certificate',
                        'Encode Data Tech · 2 Months Agile Sprint',
                        '/Certificates/FullStackInternship.pdf',
                        'Verified Internship Certificate'
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--accent)]/10 hover:bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto"
                  >
                    <Lock className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span>View Verified Certificate (View Only)</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Quick Navigation Strip */}
        <Reveal delay={0.4}>
          <div className="p-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg font-bold text-[var(--ink)]">
                Explore More of Dhanush&apos;s Work & Background
              </h3>
              <p className="text-xs text-[var(--muted)] font-mono mt-0.5">
                Academic projects, degree markscards, and full credentials repository.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/work"
                className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white font-mono text-xs font-bold hover:bg-[var(--accent-2)] transition-colors flex items-center gap-1.5 cursor-pointer pointer-events-auto"
              >
                <span>View Projects (BCA & MCA)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/education"
                className="px-4 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs font-bold hover:border-[var(--accent)] transition-colors flex items-center gap-1.5 cursor-pointer pointer-events-auto"
              >
                <span>View Education</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Protected Document Modal (Strictly No Download, Anti-Screenshot Shield) */}
      <ProtectedDocumentModal
        isOpen={selectedDoc.isOpen}
        onClose={closeProtectedDoc}
        title={selectedDoc.title}
        issuer={selectedDoc.issuer}
        fileUrl={selectedDoc.fileUrl}
        category={selectedDoc.category}
      />
    </div>
  );
}
