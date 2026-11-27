'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  FileText,
  Award,
  Lock,
  ArrowLeft,
  ArrowRight,
  Eye,
  CheckCircle2,
  Code2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { ACADEMIC_CREDENTIALS } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { ProtectedDocumentModal } from '@/components/shared/ProtectedDocumentModal';
import { Footer } from '@/components/shared/Footer';

export default function EducationPage() {
  const [selectedDoc, setSelectedDoc] = useState<{
    title: string;
    issuer?: string;
    category?: string;
    fileUrl: string;
  } | null>(null);

  const academicProjects = [
    {
      degree: 'MCA (2024–2026)',
      title: 'Student Wellness Monitor — AI-Powered Mental Health & Stress Analytics',
      slug: 'mental-health-monitor',
      tagline: 'Serverless wellness tracking & generative AI therapy platform analyzing student lifestyle telemetry and conversational sentiment.',
      stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Gemini 3.5 Flash', 'Firebase', 'Vercel'],
      features: [
        '5-axis Recharts Wellness Balance radar (Sleep, Study, Screen, Social, Activity) & threat gauge.',
        'Google Gemini 3.5 Flash conversational therapy space returning structured JSON telemetry.',
        'User-scoped Cloud Firestore persistence and one-click clinical PDF wellness report export.',
      ],
      accent: '#10B981',
      accent2: '#06B6D4',
    },
    {
      degree: 'MCA (2024–2026)',
      title: 'AI Study Assistant (Study Buddy)',
      slug: 'ai-study-assistant',
      tagline: 'Document-aware AI study platform with fuzzy retrieval, Gemini 2.5 Flash conversational Q&A, and Brevo email OTP.',
      stack: ['React', 'Python', 'Flask', 'Gemini 2.5 Flash', 'TheFuzz', 'SQLite', 'Brevo API', 'Render'],
      features: [
        'Document ingestion (PDF, DOCX, TXT) with chunking and fuzzy token-sort retrieval.',
        'Grounded multi-turn explanations powered by Google Gemini 2.5 Flash with source citations.',
        'Guest lazy-auth flow, HTTPS email OTP verification via Brevo API, and in-app document viewer.',
      ],
      accent: '#8B5CF6',
      accent2: '#EC4899',
    },
    {
      degree: 'MCA 2nd Sem (2024–2025)',
      title: 'PayFlow — Full-Stack Payroll & Payslip Management System',
      slug: 'payflow-payroll',
      tagline: 'Full-stack web application with gross-to-net salary computation, INR-first multi-currency conversion, and print-ready payslips.',
      stack: ['Python', 'Flask', 'PostgreSQL (Neon)', 'SQLAlchemy', 'Bootstrap 5', 'Vercel'],
      features: [
        'Automated gross-to-net salary computation with live client-side estimate preview.',
        'INR-first multi-currency conversion with dynamic exchange rates and en-IN formatting.',
        'Print-ready payslips with CSS @media print and Neon serverless Postgres persistence.',
      ],
      accent: '#2563EB',
      accent2: '#10B981',
    },
    {
      degree: 'BCA Capstone (2021–2024)',
      title: 'GStore — Full-Stack Grocery E-Commerce Platform',
      slug: 'online-grocery-store',
      tagline: 'Legacy PHP 8 + MySQL grocery store modernized into React 18 + MERN architecture with interactive Vercel showcase.',
      stack: ['React 18', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Legacy PHP/MySQL', 'Vercel'],
      features: [
        'Decoupled monolithic PHP/MySQL into modern React 18 + Vite SPA with dual User & Admin portals.',
        'Zero-backend localStorage REST adapter supporting full CRUD, order tracking, and image uploads.',
        'Production MERN backend with 7 Mongoose models, JWT role middleware, and Cloudinary storage.',
      ],
      accent: '#16A34A',
      accent2: '#22C55E',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--act-bg)] text-[var(--ink)] pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Protected Document Modal with Anti-Screenshot Shielding */}
      {selectedDoc && (
        <ProtectedDocumentModal
          isOpen={Boolean(selectedDoc)}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc.title}
          issuer={selectedDoc.issuer}
          category={selectedDoc.category}
          fileUrl={selectedDoc.fileUrl}
        />
      )}

      <div className="w-full max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors group cursor-pointer pointer-events-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-14 pb-8 border-b border-[var(--line)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] text-xs font-mono font-semibold mb-4 shadow-sm">
            <Lock className="w-3.5 h-3.5" />
            <span>[ACADEMIC ARCHIVE · VIEW ONLY · ANTI-SCREENSHOT PROTECTED]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] uppercase tracking-tight mb-4 leading-none">
            Academic Degrees &{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
              markscards
            </span>
            .
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] font-sans max-w-2xl leading-relaxed">
            Official verified academic markscards for MCA, BCA, PUC, and 10th SSLC, plus complete engineering details of systems built during education.
          </p>
        </div>

        {/* Academic Degrees Stack */}
        <div className="space-y-8 mb-20">
          {ACADEMIC_CREDENTIALS.map((prog, idx) => (
            <div
              key={prog.id}
              className="relative rounded-3xl overflow-hidden p-[1.5px] shadow-xl"
            >
              <BorderBeam
                duration={6 + idx * 1.5}
                borderWidth={1.5}
                colorFrom="var(--accent)"
                colorTo="var(--accent-2)"
              />
              <div className="relative z-10 rounded-3xl bg-[var(--surface)] p-6 sm:p-10 border border-[var(--line)]">
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--line)] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[var(--act-tint)] text-[var(--accent)] flex items-center justify-center border border-[var(--line)] shadow-sm">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[var(--accent)] uppercase font-semibold">
                        [DEGREE · 0{idx + 1}]
                      </span>
                      <h2 className="font-heading font-black text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
                        {prog.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {prog.grade && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                        <Award className="w-3.5 h-3.5" />
                        {prog.grade}
                      </span>
                    )}
                    <span className="px-3 py-1 rounded-full text-xs font-mono text-[var(--muted)] bg-[var(--surface-2)] border border-[var(--line)]">
                      {prog.period}
                    </span>
                  </div>
                </div>

                {/* Institution & Details */}
                <div className="mb-6">
                  <p className="text-sm font-mono text-[var(--accent)] font-semibold mb-2">
                    {prog.institution} {prog.boardOrUniversity ? `· ${prog.boardOrUniversity}` : ''}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                {/* Markscards List with Protected View Only */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-bold">
                      Official Semester Transcripts ({prog.documents.length} Records):
                    </span>
                    <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-semibold">
                      🔒 View Only · Direct Download Disabled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {prog.documents.map((doc) => (
                      <button
                        key={doc.label}
                        type="button"
                        onClick={() =>
                          setSelectedDoc({
                            title: `${prog.title} — ${doc.label}`,
                            issuer: prog.institution,
                            category: doc.type,
                            fileUrl: doc.file,
                          })
                        }
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] hover:bg-[var(--act-tint)] hover:border-[var(--accent)] text-[var(--ink)] transition-all shadow-sm text-left cursor-pointer pointer-events-auto"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <FileText className="w-4 h-4 text-[var(--accent)] shrink-0" />
                          <span className="text-xs font-mono font-medium truncate">
                            {doc.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--accent)] shrink-0 font-semibold group-hover:underline">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Section: Academic Projects Built During Education */}
        <div className="pt-8 border-t border-[var(--line)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest font-semibold block mb-1">
                [ACADEMIC SYSTEMS & CAPSTONES]
              </span>
              <h2 className="font-heading text-3xl font-black uppercase tracking-tight text-[var(--ink)]">
                Projects Built During Education (BCA & MCA)
              </h2>
            </div>
            <Link
              href="/work?category=academic"
              className="text-xs font-mono text-[var(--accent)] hover:underline flex items-center gap-1 cursor-pointer pointer-events-auto"
            >
              <span>View in catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {academicProjects.map((proj, pIdx) => (
              <div
                key={proj.slug}
                className="p-6 sm:p-7 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md flex flex-col justify-between hover:border-[var(--accent)]/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--act-tint)] text-[var(--accent)] border border-[var(--line)]">
                      {proj.degree}
                    </span>
                    <span className="text-xs font-mono text-[var(--muted)]">0{pIdx + 1}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[var(--ink)] mb-2">
                    {proj.title}
                  </h3>
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

                <div className="pt-4 border-t border-[var(--line)]">
                  <Link
                    href={`/work/${proj.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[var(--act-tint)] hover:bg-[var(--accent)] hover:text-white text-[var(--accent)] border border-[var(--line)] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer pointer-events-auto group"
                  >
                    <span>Inspect Project Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Interactive Animated Footer */}
      <Footer />
    </div>
  );
}
