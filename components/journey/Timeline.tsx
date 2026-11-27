'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCES, ACADEMIC_CREDENTIALS } from '@/lib/data';
import { GraduationCap, CheckCircle2, FileText, ArrowUpRight, Award } from 'lucide-react';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function Timeline() {
  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Central Progress Line */}
      <div className="hidden md:block absolute left-1/2 top-40 bottom-20 w-[2px] bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)] -translate-x-1/2 opacity-30" />

      {/* Part 1: Industry Experiences & Internships */}
      <div className="mb-20">
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
            [EXPERIENCE & PRODUCTION MILESTONES]
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--ink)] uppercase tracking-tight">
            Industry Roles &{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
              internships
            </span>
          </h3>
        </div>

        <div className="space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node on Timeline */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[var(--accent)] bg-[var(--surface)] items-center justify-center z-10 shadow-lg shadow-[var(--accent)]/20">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
                </div>

                {/* Card Container (Takes 50% width on desktop) */}
                <div className="w-full md:w-[calc(50%-40px)]">
                  <div className={`relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl hover:border-[var(--accent)]/50 hover:shadow-2xl transition-all duration-300 overflow-hidden ${idx % 2 === 0 ? 'animate-float-1' : 'animate-float-2'}`}>
                    <BorderBeam duration={6.5 + idx} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--accent-2)" />
                    <div className="relative z-10">
                      {/* Period & Score Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)]">
                          {exp.period}
                        </span>

                        {exp.score && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                            <Award className="w-3.5 h-3.5" />
                            Evaluation Score: {exp.score}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-[var(--muted)] uppercase font-semibold">
                          {exp.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <h4 className="font-heading font-black text-2xl text-[var(--ink)] tracking-tight">
                        {exp.role}
                      </h4>
                      <p className="text-sm font-mono text-[var(--accent)] font-semibold mb-4">
                        {exp.company}
                      </p>

                      <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      {/* Achievements List */}
                      <div className="space-y-2 mb-6 border-t border-[var(--line)] pt-4">
                        {exp.achievements.map((ach, aIdx) => (
                          <div key={aIdx} className="flex items-start gap-2.5 text-xs text-[var(--ink)]">
                            <CheckCircle2 className="w-4 h-4 text-[var(--ok)] shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line)]">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded text-[10px] font-mono border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer Column for Alignment */}
                <div className="hidden md:block w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Academic Transcripts & Degrees */}
      <div>
        <div className="text-center mb-16">
          <span className="text-[11px] font-mono text-[var(--accent-2)] uppercase tracking-widest block mb-2 font-semibold">
            [OFFICIAL ACADEMIC ARCHIVE]
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--ink)] uppercase tracking-tight">
            Academic Degrees &{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent-2)] to-[var(--accent)] bg-clip-text text-transparent font-normal italic lowercase">
              markscards
            </span>
          </h3>
        </div>

        <div className="space-y-12">
          {ACADEMIC_CREDENTIALS.map((prog, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[var(--accent-2)] bg-[var(--surface)] items-center justify-center z-10 shadow-lg shadow-[var(--accent-2)]/20">
                  <GraduationCap className="w-4 h-4 text-[var(--accent-2)]" />
                </div>

                {/* Card Container */}
                <div className="w-full md:w-[calc(50%-40px)]">
                  <div className={`relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl hover:border-[var(--accent-2)]/50 hover:shadow-2xl transition-all duration-300 overflow-hidden ${idx % 2 === 0 ? 'animate-float-2' : 'animate-float-3'}`}>
                    <BorderBeam duration={7 + idx} borderWidth={1.5} colorFrom="var(--accent-2)" colorTo="var(--ok)" colorPop="var(--accent)" />
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)]">
                          {prog.period}
                        </span>
                        {prog.grade && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300">
                            {prog.grade}
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-[var(--muted)] uppercase font-semibold">
                          {prog.degree}
                        </span>
                      </div>

                      <h4 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] tracking-tight">
                        {prog.title}
                      </h4>
                      <p className="text-xs font-mono text-[var(--muted)] mt-1 mb-3">
                        {prog.institution} {prog.boardOrUniversity ? `· ${prog.boardOrUniversity}` : ''}
                      </p>

                      <p className="text-xs text-[var(--muted)] font-sans leading-relaxed mb-6">
                        {prog.description}
                      </p>

                      {/* Semester PDF Markscard Pills */}
                      <div className="border-t border-[var(--line)] pt-4">
                        <span className="text-[11px] font-mono text-[var(--muted)] block mb-2 uppercase tracking-widest font-semibold">
                          Official Verified Documents:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {prog.documents.map((doc) => (
                            <a
                              key={doc.label}
                              href={doc.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface-2)] hover:bg-[var(--act-tint)] hover:border-[var(--accent)] text-[var(--ink)] text-xs font-mono transition-colors group shadow-sm"
                            >
                              <FileText className="w-3 h-3 text-[var(--accent)]" />
                              <span>{doc.label}</span>
                              <ArrowUpRight className="w-3 h-3 text-[var(--muted)] group-hover:text-[var(--accent)]" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Empty Spacer */}
                <div className="hidden md:block w-[calc(50%-40px)]" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
