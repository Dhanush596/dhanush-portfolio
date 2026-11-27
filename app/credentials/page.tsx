'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import {
  ACADEMIC_CREDENTIALS,
  INTERNSHIP_CREDENTIALS,
  CERTIFICATIONS,
} from '@/lib/data';
import { Reveal } from '@/components/shared/Reveal';
import { TiltCard } from '@/components/shared/TiltCard';
import { ProtectedDocumentModal } from '@/components/shared/ProtectedDocumentModal';

type Tab = 'all' | 'academic' | 'internships' | 'certifications';

export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');
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

  const totalAcademicDocs = (ACADEMIC_CREDENTIALS || []).reduce(
    (acc, curr) => acc + (curr.documents?.length || 0),
    0
  );
  const totalInternshipDocs = (INTERNSHIP_CREDENTIALS || []).length;
  const totalCertDocs = (CERTIFICATIONS || []).length;
  const grandTotalDocs =
    totalAcademicDocs + totalInternshipDocs + totalCertDocs;

  return (
    <div className="w-full min-h-screen bg-[var(--act-bg)] text-[var(--ink)] pt-24 pb-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-6">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-semibold">Credentials</span>
          </div>
        </Reveal>

        {/* 1. Header */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Reveal delay={0.08}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--muted)] mb-4 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>[VERIFIED CREDENTIALS ARCHIVE // {grandTotalDocs} PROTECTED RECORDS]</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[var(--ink)] uppercase mb-4 leading-none">
              Credentials &{' '}
              <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--pop)] bg-clip-text text-transparent font-normal italic lowercase">
                records
              </span>
              .
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-sans max-w-2xl mx-auto">
              Official academic markscards (MCA, BCA, PUC, 10th), verified internship completion credentials, and professional technical certifications.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono">
              <Lock className="w-3.5 h-3.5" />
              <span>Strictly View-Only · Protected from Downloads & Screen Capture</span>
            </div>
          </Reveal>

          {/* Quick Stats Strip */}
          <Reveal delay={0.12}>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
              <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
                <span className="text-[10px] font-mono text-[var(--muted)] block">ACADEMIC MARKS</span>
                <span className="font-heading text-lg font-bold text-[var(--ink)]">{totalAcademicDocs} PDFs</span>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
                <span className="text-[10px] font-mono text-[var(--muted)] block">INTERNSHIPS</span>
                <span className="font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400">{totalInternshipDocs} Verified</span>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
                <span className="text-[10px] font-mono text-[var(--muted)] block">CERTIFICATIONS</span>
                <span className="font-heading text-lg font-bold text-[var(--accent)]">{totalCertDocs} Industry</span>
              </div>
              <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
                <span className="text-[10px] font-mono text-[var(--muted)] block">TOTAL RECORDS</span>
                <span className="font-heading text-lg font-bold text-amber-500">{grandTotalDocs} Records</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* 2. Filter Tabs */}
        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                activeTab === 'all'
                  ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)] shadow-md'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
              }`}
            >
              All Records ({grandTotalDocs})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                activeTab === 'academic'
                  ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)] shadow-md'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
              }`}
            >
              Academic Markscards ({totalAcademicDocs})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('internships')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                activeTab === 'internships'
                  ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)] shadow-md'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
              }`}
            >
              Internship Certificates ({totalInternshipDocs})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('certifications')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                activeTab === 'certifications'
                  ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)] shadow-md'
                  : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
              }`}
            >
              Technical Certifications ({totalCertDocs})
            </button>
          </div>
        </Reveal>

        {/* 3. Academic Markscards Section */}
        {(activeTab === 'all' || activeTab === 'academic') && (
          <section className="mb-20">
            <Reveal delay={0.1}>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-amber-500" />
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--ink)]">
                    Academic Markscards & Transcripts
                  </h2>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">
                  [MCA · BCA · PUC · 10TH]
                </span>
              </div>
            </Reveal>

            <div className="space-y-8">
              {(ACADEMIC_CREDENTIALS || []).map((program, pIdx) => (
                <Reveal key={program.id} delay={0.06 * pIdx}>
                  <div className="p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-md transition-all duration-300">
                    {/* Program Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-amber-500 font-bold">
                            [DEGREE // 0{pIdx + 1}]
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--muted)]">
                            {program.degree}
                          </span>
                        </div>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] tracking-tight">
                          {program.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs font-mono text-[var(--muted)]">
                          {program.institution && (
                            <span className="text-[var(--ink)] font-medium">{program.institution}</span>
                          )}
                          {program.boardOrUniversity && (
                            <span>· {program.boardOrUniversity}</span>
                          )}
                          {program.period && (
                            <span>· {program.period}</span>
                          )}
                          {program.grade && (
                            <span className="text-amber-500 font-semibold px-2 py-0.2 rounded bg-amber-500/10 border border-amber-500/20">
                              {program.grade}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-mono text-[var(--muted)] shrink-0">
                        {program.documents.length} Markscard{program.documents.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <p className="text-sm text-[var(--muted)] leading-relaxed font-sans mb-6">
                      {program.description}
                    </p>

                    {/* Markscards List - All wired to ProtectedDocumentModal (No download) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {program.documents.map((doc) => (
                        <button
                          key={doc.label}
                          type="button"
                          onClick={() =>
                            openProtectedDoc(
                              `${program.title} · ${doc.label}`,
                              program.institution || program.boardOrUniversity || 'Educational Board',
                              doc.file,
                              doc.type || 'Academic Markscard'
                            )
                          }
                          className="group flex items-center justify-between p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--act-tint)] hover:border-[var(--accent)] hover:shadow-md transition-all duration-200 text-left"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="truncate">
                              <span className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors block truncate">
                                {doc.label}
                              </span>
                              <span className="text-[10px] font-mono text-[var(--muted)] block">
                                {doc.type} · View Only
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 ml-2 text-[var(--muted)] group-hover:text-[var(--accent)]">
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 4. Internship Completion Certificates Section */}
        {(activeTab === 'all' || activeTab === 'internships') && (
          <section className="mb-20">
            <Reveal delay={0.1}>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--ink)]">
                    Internship Completion Certificates
                  </h2>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">
                  [VERIFIED INDUSTRY EXPERIENCE]
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(INTERNSHIP_CREDENTIALS || []).map((intern, idx) => (
                <Reveal key={intern.id} delay={0.1 * idx}>
                  <div className="h-full p-6 sm:p-8 flex flex-col justify-between group border border-[var(--line)] bg-[var(--surface)] shadow-md hover:border-emerald-500/50 rounded-3xl transition-all duration-300">
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-6">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--muted)] font-bold">
                            [INTERN // 0{idx + 1}]
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            VERIFIED
                          </span>
                          {intern.score && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                              Score: {intern.score}
                            </span>
                          )}
                        </div>

                        <span className="text-xs font-mono text-[var(--muted)]">
                          {intern.period}
                        </span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-[var(--ink)] mb-1 tracking-tight">
                        {intern.role}
                      </h3>
                      <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                        {intern.company}
                      </p>

                      {intern.project && (
                        <div className="mb-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[var(--act-tint)] border border-[var(--line)] text-xs font-mono text-[var(--ink)]">
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Key Project:</span>
                          <span>{intern.project}</span>
                        </div>
                      )}

                      <p className="text-sm text-[var(--muted)] leading-relaxed font-sans mb-6">
                        {intern.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {intern.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[11px] font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--muted)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Protected Certificate View Button - Strictly View Only */}
                    <div className="pt-4 border-t border-[var(--line)]">
                      <button
                        type="button"
                        onClick={() =>
                          openProtectedDoc(
                            `${intern.company} Completion Certificate`,
                            `${intern.role} · ${intern.score ? `Score: ${intern.score}` : 'Verified'}`,
                            intern.certificateFile,
                            'Internship Certificate'
                          )
                        }
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>View Completion Certificate</span>
                        <span className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 font-normal">
                          (View Only · Protected)
                        </span>
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 5. Technical Certifications Section */}
        {(activeTab === 'all' || activeTab === 'certifications') && (
          <section className="mb-20">
            <Reveal delay={0.1}>
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-4 mb-8">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-500" />
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[var(--ink)]">
                    Technical Certifications
                  </h2>
                </div>
                <span className="text-xs font-mono text-[var(--muted)]">
                  [CLOUD · AI/ML · SOFTWARE]
                </span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(CERTIFICATIONS || []).map((cert, idx) => (
                <Reveal key={cert.id} delay={0.04 * idx}>
                  <div className="h-full p-6 flex flex-col justify-between group border border-[var(--line)] bg-[var(--surface)] shadow-md hover:border-purple-500/50 rounded-3xl transition-all duration-300">
                    <div>
                      {/* Header Row */}
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                        <span className="font-mono text-xs text-[var(--muted)] font-bold">
                          [0{idx + 1}]
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--muted)]">
                          {cert.category}
                        </span>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="font-heading text-lg font-bold text-[var(--ink)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors mb-1 tracking-tight">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-mono text-[var(--muted)] mb-6">
                        Issued by: {cert.issuer}
                      </p>
                    </div>

                    {/* Protected View Button - Strictly View Only */}
                    <div className="pt-4 border-t border-[var(--line)]">
                      <button
                        type="button"
                        onClick={() =>
                          openProtectedDoc(
                            cert.title,
                            cert.issuer,
                            cert.file,
                            `Certification · ${cert.category}`
                          )
                        }
                        className="w-full py-2 px-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Lock className="w-3.5 h-3.5 text-purple-500" />
                        <span>Inspect Certificate</span>
                        <span className="text-[10px] text-purple-600/70 dark:text-purple-400/70 font-normal">
                          (View Only)
                        </span>
                      </button>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Protected Document Modal with Anti-Screenshot Shielding & Zero Download */}
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
