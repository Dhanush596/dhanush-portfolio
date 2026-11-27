'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, Filter, RotateCcw, GraduationCap, Briefcase, Globe, Layers } from 'lucide-react';
import {
  projects,
  siteStats,
  categoryLabels,
  statusLabels,
  Category,
  Status,
  Project,
} from '@/lib/projects';
import { TiltCard } from '@/components/shared/TiltCard';
import { Reveal } from '@/components/shared/Reveal';
import { ProjectGradientArt } from './ProjectGradientArt';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Prioritize: BCA & MCA first (1), Internship second (2), Live Production third (3), Company fourth (4), Practice fifth (5)
const getProjectPriority = (p: Project): number => {
  if (p.category === 'mca' || p.category === 'bca' || p.secondaryCategory === 'bca' || p.secondaryCategory === 'mca') {
    return 1;
  }
  if (p.category === 'internship') {
    return 2;
  }
  if (p.category === 'company' && p.status === 'live') {
    return 3;
  }
  if (p.category === 'company') {
    return 4;
  }
  return 5;
};

export function WorkList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prefersReducedMotion = usePrefersReducedMotion();

  const currentCategory = (searchParams.get('category') as Category | 'all' | 'academic') || 'all';
  const currentStatus = (searchParams.get('status') as Status | 'all') || 'all';

  // Custom categorized tabs tailored to user requirements
  const filterTabs = [
    { key: 'all', label: 'All Projects', count: projects.length },
    {
      key: 'academic',
      label: 'BCA & MCA Academic',
      count: projects.filter(
        (p) => p.category === 'mca' || p.category === 'bca' || p.secondaryCategory === 'bca' || p.secondaryCategory === 'mca'
      ).length,
    },
    {
      key: 'internship',
      label: 'Internship Projects',
      count: projects.filter((p) => p.category === 'internship').length,
    },
    {
      key: 'live-section',
      label: 'Live Commercial Platforms',
      count: projects.filter((p) => p.status === 'live').length,
    },
    {
      key: 'company',
      label: 'PrimePro.ai Projects',
      count: projects.filter((p) => p.category === 'company').length,
    },
    {
      key: 'practice',
      label: 'Self-Practice & Lab',
      count: projects.filter((p) => p.category === 'practice').length,
    },
  ];

  const updateFilters = (newCategory?: string, newStatus?: Status | 'all') => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory !== undefined) {
      if (newCategory === 'all') {
        params.delete('category');
        params.delete('status');
      } else if (newCategory === 'live-section') {
        params.delete('category');
        params.set('status', 'live');
      } else {
        params.set('category', newCategory);
        params.delete('status');
      }
    }

    if (newStatus !== undefined) {
      if (newStatus === 'all') {
        params.delete('status');
      } else {
        params.set('status', newStatus);
      }
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  // Filter and sort projects strictly according to user requirements:
  // Starts with BCA and MCA projects, then Internship projects, then Live Commercial Platforms
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        let matchesCategory = true;
        if (currentCategory === 'academic') {
          matchesCategory =
            p.category === 'mca' || p.category === 'bca' || p.secondaryCategory === 'bca' || p.secondaryCategory === 'mca';
        } else if (currentCategory !== 'all') {
          matchesCategory =
            p.category === currentCategory || p.secondaryCategory === currentCategory;
        }

        const matchesStatus =
          currentStatus === 'all' || p.status === currentStatus;

        return matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const priorityA = getProjectPriority(a);
        const priorityB = getProjectPriority(b);
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        // Inside same priority, featured first
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [currentCategory, currentStatus]);

  const liveCount = useMemo(
    () => projects.filter((p) => p.status === 'live').length,
    []
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-[var(--ink)]">
      {/* 1. Header */}
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <Reveal delay={0.05}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-xs font-mono text-[var(--muted)] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>[PROJECTS ARCHIVE // 01-{projects.length}]</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[var(--ink)] uppercase mb-4">
            Projects & Work
          </h1>
          <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-mono max-w-2xl mx-auto">
            Starting with BCA & MCA Academic Systems, Verified Internship Deployments, followed by Live Commercial Platforms and Engineering Labs.
          </p>
        </Reveal>

        {/* Quick Summary Highlights Strip */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
              <span className="text-[10px] font-mono text-[var(--muted)] block">1. ACADEMIC SYSTEMS</span>
              <span className="font-heading text-lg font-bold text-[var(--ink)]">BCA & MCA</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
              <span className="text-[10px] font-mono text-[var(--muted)] block">2. INTERNSHIPS</span>
              <span className="font-heading text-lg font-bold text-emerald-600 dark:text-emerald-400">Score: 100/100</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
              <span className="text-[10px] font-mono text-[var(--muted)] block">3. LIVE DEPLOYMENTS</span>
              <span className="font-heading text-lg font-bold text-[var(--accent)]">{liveCount} Live Sites</span>
            </div>
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left shadow-sm">
              <span className="text-[10px] font-mono text-[var(--muted)] block">TOTAL CATALOG</span>
              <span className="font-heading text-lg font-bold text-[var(--ink)]">{projects.length} Architectures</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 2. Filter Tabs */}
      <div className="space-y-4 mb-14">
        <Reveal delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {filterTabs.map((tab) => {
              const isActive =
                tab.key === 'live-section'
                  ? currentStatus === 'live' && currentCategory === 'all'
                  : currentCategory === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => updateFilters(tab.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
                    isActive
                      ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)] shadow-md'
                      : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-[var(--act-bg)]/20 text-[var(--act-bg)]' : 'bg-[var(--act-tint)] text-[var(--muted)]'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      {/* 3. Empty State */}
      {filteredProjects.length === 0 && (
        <Reveal delay={0.2}>
          <div className="p-12 text-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-[var(--act-tint)] flex items-center justify-center mx-auto mb-4 text-[var(--muted)]">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl text-[var(--ink)] mb-2">
              No matching projects
            </h3>
            <p className="text-sm text-[var(--muted)] mb-6">
              There are no projects that match the selected filter.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-2)] transition-all"
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
              const isAcademic =
                project.category === 'mca' ||
                project.category === 'bca' ||
                project.secondaryCategory === 'bca' ||
                project.secondaryCategory === 'mca';
              const isInternship = project.category === 'internship';
              const isLive = project.status === 'live';

              return (
                <motion.div
                  key={project.slug}
                  layout={!prefersReducedMotion}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25) }}
                  className={isFeatured ? 'md:col-span-2' : 'col-span-1'}
                >
                  <TiltCard
                    className="h-full p-6 sm:p-7 flex flex-col justify-between group relative border border-[var(--line)] hover:border-[var(--accent)]/50 bg-[var(--surface)] shadow-md transition-all duration-300 rounded-3xl"
                  >
                    <div>
                      {/* Top Visual Artwork */}
                      <Link href={`/work/${project.slug}`} className="block mb-5 overflow-hidden rounded-2xl border border-[var(--line)]">
                        <ProjectGradientArt
                          title={project.title}
                          accent={project.accent}
                          accent2={project.accent2}
                          large={isFeatured}
                        />
                      </Link>

                      {/* Header Line with Index & Section Indicator */}
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-[var(--muted)] font-bold">
                            [{String(idx + 1).padStart(2, '0')}]
                          </span>
                          {isAcademic && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                              ACADEMIC
                            </span>
                          )}
                          {isInternship && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              INTERNSHIP
                            </span>
                          )}
                          {isLive && project.category === 'company' && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30">
                              LIVE PRODUCTION
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {/* Status Badge */}
                          {project.status && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)]">
                              {project.status === 'live' && (
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
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
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--muted)]">
                            {categoryLabels[project.category]}
                            {project.secondaryCategory && ` · ${categoryLabels[project.secondaryCategory]}`}
                          </span>
                        </div>
                      </div>

                      {/* Project Title */}
                      <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors duration-200 mb-2 tracking-tight">
                        <Link href={`/work/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h2>

                      {/* Tagline */}
                      <p className="text-sm text-[var(--muted)] leading-relaxed font-sans mb-6">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Footer / Stack chips & Actions */}
                    <div>
                      {hasStack && (
                        <div className="flex flex-wrap gap-1.5 mb-6 pt-3 border-t border-[var(--line)]">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--act-tint)] text-[var(--muted)] border border-[var(--line)]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.stack.length > 4 && (
                            <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)] self-center">
                              +{project.stack.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-2">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                        >
                          <span>{isRealtime ? 'View project' : 'View case study'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[var(--accent)]" />
                        </Link>

                        {hasLiveLink && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                          >
                            <span>Live site</span>
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
