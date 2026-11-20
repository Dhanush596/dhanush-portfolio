'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  FileText,
  ExternalLink,
  Download,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  BookOpen,
} from 'lucide-react';
import {
  ACADEMIC_CREDENTIALS,
  INTERNSHIP_CREDENTIALS,
  CERTIFICATIONS,
} from '@/lib/data';
import { Reveal } from '@/components/shared/Reveal';
import { TiltCard } from '@/components/shared/TiltCard';

type Tab = 'all' | 'academic' | 'internships' | 'certifications';

export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const totalAcademicDocs = (ACADEMIC_CREDENTIALS || []).reduce(
    (acc, curr) => acc + (curr.documents?.length || 0),
    0
  );
  const totalInternshipDocs = (INTERNSHIP_CREDENTIALS || []).length;
  const totalCertDocs = (CERTIFICATIONS || []).length;
  const grandTotalDocs =
    totalAcademicDocs + totalInternshipDocs + totalCertDocs;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-white">
      {/* 1. Header with Editorial Brutalist Styling */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <Reveal delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-white/70 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>[ARCHIVE // {grandTotalDocs} VERIFIED CREDENTIALS]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase mb-4">
            Credentials & Records
          </h1>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans max-w-2xl mx-auto">
            Official academic transcripts, semester markscards (MCA, BCA, PUC,
            10th), verified internship completion certificates, and professional
            technical credentials.
          </p>
        </Reveal>

        {/* Quick Stats Strip */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-left">
              <span className="text-[10px] font-mono text-white/40 block">ACADEMIC MARKS</span>
              <span className="font-heading text-xl font-bold text-white">{totalAcademicDocs} PDFs</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-left">
              <span className="text-[10px] font-mono text-white/40 block">INTERNSHIP CERTS</span>
              <span className="font-heading text-xl font-bold text-white">{totalInternshipDocs} Verified</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-left">
              <span className="text-[10px] font-mono text-white/40 block">TECH CERTIFICATES</span>
              <span className="font-heading text-xl font-bold text-white">{totalCertDocs} Industry</span>
            </div>
            <div className="p-3 rounded-lg border border-white/[0.08] bg-white/[0.02] text-left">
              <span className="text-[10px] font-mono text-white/40 block">TOTAL RECORDS</span>
              <span className="font-heading text-xl font-bold text-amber-400">{grandTotalDocs} Documents</span>
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
                ? 'bg-white text-black font-bold border-white shadow-lg'
                : 'bg-white/[0.02] text-white/60 border-white/[0.08] hover:border-white/30 hover:text-white'
            }`}
          >
            All Records ({grandTotalDocs})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
              activeTab === 'academic'
                ? 'bg-white text-black font-bold border-white shadow-lg'
                : 'bg-white/[0.02] text-white/60 border-white/[0.08] hover:border-white/30 hover:text-white'
            }`}
          >
            Academic Markscards ({totalAcademicDocs})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('internships')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
              activeTab === 'internships'
                ? 'bg-white text-black font-bold border-white shadow-lg'
                : 'bg-white/[0.02] text-white/60 border-white/[0.08] hover:border-white/30 hover:text-white'
            }`}
          >
            Internship Completion ({totalInternshipDocs})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('certifications')}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
              activeTab === 'certifications'
                ? 'bg-white text-black font-bold border-white shadow-lg'
                : 'bg-white/[0.02] text-white/60 border-white/[0.08] hover:border-white/30 hover:text-white'
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
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Academic Markscards & Transcripts
                </h2>
              </div>
              <span className="text-xs font-mono text-white/40">
                [MCA · BCA · PUC · 10TH]
              </span>
            </div>
          </Reveal>

          <div className="space-y-8">
            {ACADEMIC_CREDENTIALS.map((program, pIdx) => (
              <Reveal key={program.id} delay={0.08 * pIdx}>
                <div className="p-6 sm:p-8 rounded-xl border border-white/[0.08] bg-black/60 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                  {/* Program Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-amber-400 font-bold">
                          [DEGREE // 0{pIdx + 1}]
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 bg-white/[0.03] text-white/70">
                          {program.degree}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {program.title}
                      </h3>
                      {program.boardOrUniversity && (
                        <p className="text-xs font-mono text-white/50 mt-1">
                          {program.boardOrUniversity}
                        </p>
                      )}
                    </div>

                    <span className="text-xs font-mono text-white/40 shrink-0">
                      {program.documents.length} Document{program.documents.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/60 leading-relaxed font-sans mb-6">
                    {program.description}
                  </p>

                  {/* Markscards List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {program.documents.map((doc) => (
                      <a
                        key={doc.label}
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-3.5 rounded-lg border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                          <div className="truncate">
                            <span className="text-xs font-medium text-white group-hover:text-amber-400 transition-colors block truncate">
                              {doc.label}
                            </span>
                            <span className="text-[10px] font-mono text-white/40 block">
                              {doc.type} · PDF
                            </span>
                          </div>
                        </div>

                        <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                      </a>
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
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Internship Completion Certificates
                </h2>
              </div>
              <span className="text-xs font-mono text-white/40">
                [VERIFIED INDUSTRY EXPERIENCE]
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INTERNSHIP_CREDENTIALS.map((intern, idx) => (
              <Reveal key={intern.id} delay={0.1 * idx}>
                <TiltCard className="h-full p-6 sm:p-8 flex flex-col justify-between group border border-white/[0.08] bg-black/60 backdrop-blur-xl hover:border-white/30 transition-all duration-300">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-white/40 font-bold">
                          [INTERN // 0{idx + 1}]
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          VERIFIED
                        </span>
                      </div>

                      <span className="text-xs font-mono text-white/50">
                        {intern.period}
                      </span>
                    </div>

                    {/* Role & Company */}
                    <h3 className="font-heading text-2xl font-bold text-white mb-1 tracking-tight">
                      {intern.role}
                    </h3>
                    <p className="text-sm font-mono text-emerald-400 mb-4">
                      {intern.company}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed font-sans mb-6">
                      {intern.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {intern.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[11px] font-mono border border-white/[0.08] bg-white/[0.03] text-white/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Certificate Link */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={intern.certificateFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-emerald-400 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span>View Completion Certificate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={intern.certificateFile}
                      download
                      aria-label={`Download ${intern.company} certificate`}
                      className="p-2 rounded border border-white/[0.08] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/30 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 5. Technical Certifications Section */}
      {(activeTab === 'all' || activeTab === 'certifications') && (
        <section className="mb-20">
          <Reveal delay={0.1}>
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-purple-400" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Technical Certifications
                </h2>
              </div>
              <span className="text-xs font-mono text-white/40">
                [CLOUD · AI/ML · SOFTWARE]
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, idx) => (
              <Reveal key={cert.id} delay={0.05 * idx}>
                <TiltCard className="h-full p-6 flex flex-col justify-between group border border-white/[0.08] bg-black/60 backdrop-blur-xl hover:border-white/30 transition-all duration-300">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                      <span className="font-mono text-xs text-white/40 font-bold">
                        [0{idx + 1}]
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono border border-white/10 bg-white/[0.03] text-white/70">
                        {cert.category}
                      </span>
                    </div>

                    {/* Title & Issuer */}
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-1 tracking-tight">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-mono text-white/50 mb-6">
                      Issued by: {cert.issuer}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <a
                      href={cert.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white/70 hover:text-white transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>View PDF</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>

                    <a
                      href={cert.file}
                      download
                      aria-label={`Download ${cert.title} PDF`}
                      className="p-1.5 rounded border border-white/[0.08] text-white/40 hover:text-white transition-colors"
                    >
                      <Download className="w-3 h-3" />
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
