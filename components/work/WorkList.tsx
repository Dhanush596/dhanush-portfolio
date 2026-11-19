'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, Filter, RotateCcw } from 'lucide-react';
import {
  projects,
  siteStats,
  categoryLabels,
  statusLabels,
  backendLabels,
  Category,
  Status,
  Project,
} from '@/lib/projects';
import { TiltCard } from '@/components/shared/TiltCard';
import { Reveal } from '@/components/shared/Reveal';
import { ProjectGradientArt } from './ProjectGradientArt';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STATUS_PRIORITY: Record<string, number> = {
  live: 1,
  realtime: 2,
  practice: 3,
};

export function WorkList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = usePrefersReducedMotion();

  const currentCategory = (searchParams.get('category') as Category | 'all') || 'all';
  const currentStatus = (searchParams.get('status') as Status | 'all') || 'all';

  // Compute available categories that actually contain at least one project
  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });

    const list: { key: Category | 'all'; label: string; count: number }[] = [
      { key: 'all', label: 'All Projects', count: projects.length },
    ];

    (Object.keys(categoryLabels) as Category[]).forEach((cat) => {
      if (counts[cat]) {
        list.push({
          key: cat,
          label: categoryLabels[cat],
          count: counts[cat],
        });
      }
    });

    return list;
  }, []);

  // Status chips: All, LIVE, REAL-TIME, PRACTICE
  const statusOptions: { key: Status | 'all'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'LIVE' },
    { key: 'realtime', label: 'REAL-TIME' },
    { key: 'practice', label: 'PRACTICE' },
  ];

  const updateFilters = (newCategory?: Category | 'all', newStatus?: Status | 'all') => {
    const params = new URLSearchParams(searchParams.toString());

    const cat = newCategory !== undefined ? newCategory : currentCategory;
    const stat = newStatus !== undefined ? newStatus : currentStatus;

    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }

    if (stat === 'all') {
      params.delete('status');
    } else {
      params.set('status', stat);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Filter and sort projects: live -> realtime -> practice, featured first
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        const matchesCategory =
          currentCategory === 'all' || p.category === currentCategory;
        const matchesStatus =
          currentStatus === 'all' || p.status === currentStatus;
        return matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const priorityA = a.status ? STATUS_PRIORITY[a.status] ?? 4 : 4;
        const priorityB = b.status ? STATUS_PRIORITY[b.status] ?? 4 : 4;
        const statusDiff = priorityA - priorityB;
        if (statusDiff !== 0) return statusDiff;
        // Featured first inside each group
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [currentCategory, currentStatus]);

  const practiceCount = useMemo(
    () => projects.filter((p) => p.category === 'practice').length,
    []
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* 1. Header with exact data-driven counts */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <Reveal delay={0.1}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--accent)]/30 bg-[var(--card-bg)] text-xs font-mono text-[var(--accent)] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portfolio Showcase</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight text-[var(--text)] mb-4">
            Work
          </h1>
          <p className="text-base sm:text-lg text-[var(--text)]/75 leading-relaxed font-mono">
            {siteStats.companyWebsites} company sites · {siteStats.liveSites} live · {siteStats.realtimeSites} real-time · {practiceCount} practice builds
          </p>
        </Reveal>
      </div>

      {/* 2. Filter Controls */}
      <div className="space-y-4 mb-12">
        {/* Category Tabs */}
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {availableCategories.map((tab) => {
              const isActive = currentCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => updateFilters(tab.key, undefined)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                    isActive
                      ? 'bg-[var(--accent)] text-[#0B0709] font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                      : 'bg-[var(--card-bg)] text-[var(--text)]/75 border-[var(--card-border)] hover:border-[var(--accent)]/40 hover:text-[var(--text)]'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-[#0B0709]/20' : 'bg-[var(--text)]/10 text-[var(--text)]/60'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Status Chips */}
        <Reveal delay={0.25}>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono text-[var(--text)]/50 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Status:
            </span>
            {statusOptions.map((st) => {
              const isActive = currentStatus === st.key;
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => updateFilters(undefined, st.key)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 border ${
                    isActive
                      ? 'bg-[var(--accent-2)] text-[#0B0709] font-bold border-[var(--accent-2)] shadow-sm'
                      : 'bg-transparent text-[var(--text)]/65 border-[var(--card-border)] hover:border-[var(--accent-2)]/40 hover:text-[var(--text)]'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* 3. Empty State */}
      {filteredProjects.length === 0 && (
        <Reveal delay={0.3}>
          <div className="p-12 text-center rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-[var(--text)]/5 flex items-center justify-center mx-auto mb-4 text-[var(--text)]/40">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[var(--text)] mb-2">
              No matching projects
            </h3>
            <p className="text-sm text-[var(--text)]/70 mb-6">
              There are no projects that match the selected category and status combination.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--accent)] text-[#0B0709] hover:brightness-110 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        </Reveal>
      )}

      {/* 4. Bento Grid of Project Cards */}
      {filteredProjects.length > 0 && (
        <motion.div
          layout={!prefersReducedMotion}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isFeatured = project.featured;
              const hasLiveLink = Boolean(project.links?.live);
              const isRealtime = project.status === 'realtime';
              const hasStack = project.stack && project.stack.length > 0;

              return (
                <motion.div
                  key={project.slug}
                  layout={!prefersReducedMotion}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.05, 0.3) }}
                  className={isFeatured ? 'md:col-span-2' : 'col-span-1'}
                >
                  <TiltCard
                    className="h-full p-6 sm:p-7 flex flex-col justify-between group relative border transition-all"
                    style={{
                      borderColor: `${project.accent}30`,
                    }}
                  >
                    {/* Ambient Glow */}
                    <div
                      className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
                      style={{ backgroundColor: project.accent }}
                    />

                    <div>
                      {/* Top Visual Artwork */}
                      <Link href={`/work/${project.slug}`} className="block mb-5 overflow-hidden rounded-xl">
                        <ProjectGradientArt
                          title={project.title}
                          accent={project.accent}
                          accent2={project.accent2}
                          large={isFeatured}
                        />
                      </Link>

                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {/* Status Badge - only if project.status is defined */}
                        {project.status && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold border bg-[var(--text)]/5 text-[var(--text)]">
                            {project.status === 'live' && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                              </span>
                            )}
                            {project.status === 'realtime' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            )}
                            {project.status === 'practice' && (
                              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                            )}
                            <span>{statusLabels[project.status]?.label}</span>
                          </span>
                        )}

                        {/* Category Label */}
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)]/75">
                          {categoryLabels[project.category]}
                        </span>

                        {/* Backend Badge */}
                        {project.backend && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)]/70">
                            {backendLabels[project.backend]}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2">
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      {/* Tagline */}
                      <p className="text-sm text-[var(--text)]/75 leading-relaxed mb-6">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Footer / Stack chips & Actions */}
                    <div>
                      {/* Up to four stack chips - hidden if stack is empty */}
                      {hasStack && (
                        <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-[var(--card-border)]">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[11px] font-mono bg-[var(--text)]/5 text-[var(--text)]/75 border border-[var(--card-border)]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--text)]/40 self-center">
                              +{project.stack.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-2">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:translate-x-1 transition-transform duration-200"
                        >
                          <span>{isRealtime ? 'View project' : 'View case study'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        {hasLiveLink && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)]/70 hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors"
                          >
                            <span>Visit site</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
