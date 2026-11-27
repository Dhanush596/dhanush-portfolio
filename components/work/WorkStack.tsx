'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects, statusLabels } from '@/lib/projects';
import { DeviceCoverFrame } from '@/components/work/DeviceCoverFrame';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function WorkStack() {
  // Select 6 primary featured projects for the sticky stack
  const featuredProjects = React.useMemo(() => {
    return projects.filter((p) => p.featured).slice(0, 6);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
            [2.2 ARCHITECTURAL SHOWCASE]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Selected{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
              work
            </span>
            .
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Deep-dive case studies into full-stack product architectures, automated GitOps pipelines, and machine learning deployments.
        </p>
      </div>

      {/* Sticky Stacked Cards Container */}
      <div className="relative space-y-16 sm:space-y-24">
        {featuredProjects.map((project, idx) => {
          return (
            <div
              key={project.slug}
              className="sticky top-24 sm:top-28 w-full"
              style={{
                zIndex: idx + 10,
              }}
            >
              <Link
                href={`/work/${project.slug}`}
                data-cursor="View"
                className="block group"
              >
                <div
                  className="relative rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl overflow-hidden p-6 sm:p-10 transition-all duration-300 hover:border-[var(--accent)]"
                  style={{
                    boxShadow: '0 20px 40px -15px rgba(37, 99, 235, 0.12), 0 0 0 1px var(--line)',
                  }}
                >
                  {/* Orbiting Border Light Beam */}
                  <BorderBeam duration={7 + idx} borderWidth={1.5} />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Metadata & Details (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[var(--accent)]">
                          [0{idx + 1} / 0{featuredProjects.length}]
                        </span>

                        {project.status && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                              project.status === 'live'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                                : project.status === 'realtime'
                                ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20'
                                : 'bg-[var(--surface-2)] text-[var(--muted)] border-[var(--line)]'
                            }`}
                          >
                            {project.status === 'live' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                            {project.status === 'realtime' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            )}
                            {project.status === 'practice' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            )}
                            <span>{statusLabels[project.status]?.label}</span>
                          </span>
                        )}

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-[var(--line)] bg-[var(--surface-2)] text-[var(--muted)]">
                          {project.role}
                        </span>
                      </div>

                      {/* Title & One-liner */}
                      <div>
                        <h3 className="font-heading font-black text-2xl sm:text-3xl md:text-4xl text-[var(--ink)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm sm:text-base text-[var(--muted)] font-sans mt-3 leading-relaxed">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2">
                        {project.stack?.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Read Case Study Link */}
                      <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent)] group-hover:text-[var(--accent-2)] transition-colors">
                        <span>Read the case study</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>

                    {/* Right Column: Visual Mockup Frame (5 cols) */}
                    <div className="lg:col-span-5">
                      <DeviceCoverFrame
                        title={project.title}
                        cover={project.cover}
                        accent={project.accent}
                        accent2={project.accent2}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
