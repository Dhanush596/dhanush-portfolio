'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Globe,
  Layers,
  FlaskConical,
  RotateCcw,
  Layers3,
} from 'lucide-react';
import {
  projects,
  categoryLabels,
  statusLabels,
  Category,
  Status,
  Project,
} from '@/lib/projects';
import { LIVE_SITES } from '@/lib/data';
import { Rotating3DDeck } from './Rotating3DDeck';
import { WorkFilterHub, FilterTab } from './WorkFilterHub';
import { CrazyProjectCard } from './CrazyProjectCard';
import { Hero3DText } from '@/components/shared/Hero3DText';
import { getMultiCardStyle } from '@/lib/cardThemes';

// Prioritize: BCA & MCA first (1), Internship second (2), Live Production third (3), Company fourth (4), Practice fifth (5)
const getProjectPriority = (p: Project): number => {
  if (
    p.category === 'mca' ||
    p.category === 'bca' ||
    p.secondaryCategory === 'bca' ||
    p.secondaryCategory === 'mca'
  ) {
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

  const currentCategory = (searchParams.get('category') as Category | 'all' | 'academic') || 'all';
  const currentStatus = (searchParams.get('status') as Status | 'all') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  // Structured filter tabs with icons
  const filterTabs: FilterTab[] = [
    {
      key: 'all',
      label: 'All Projects',
      shortLabel: 'All',
      icon: Sparkles,
      count: projects.length,
    },
    {
      key: 'academic',
      label: 'BCA & MCA Academic',
      shortLabel: 'Academic',
      icon: GraduationCap,
      count: projects.filter(
        (p) =>
          p.category === 'mca' ||
          p.category === 'bca' ||
          p.secondaryCategory === 'bca' ||
          p.secondaryCategory === 'mca'
      ).length,
    },
    {
      key: 'internship',
      label: 'Internship Projects',
      shortLabel: 'Internships',
      icon: Briefcase,
      count: projects.filter((p) => p.category === 'internship').length,
    },
    {
      key: 'live-section',
      label: 'Live & Hosted Demos',
      shortLabel: 'Live Demos',
      icon: Globe,
      count: projects.filter((p) => p.status === 'live').length,
    },
    {
      key: 'company',
      label: 'PrimePro.ai Projects',
      shortLabel: 'PrimePro',
      icon: Layers,
      count: projects.filter((p) => p.category === 'company').length,
    },
    {
      key: 'practice',
      label: 'Self-Practice & Lab',
      shortLabel: 'Lab',
      icon: FlaskConical,
      count: projects.filter((p) => p.category === 'practice').length,
    },
  ];

  const updateFilters = (newCategory?: string) => {
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

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const resetFilters = () => {
    setSearchQuery('');
    router.push(pathname, { scroll: false });
  };

  // Filter & sort projects strictly: Academic first, then Internship, then Live, then Company, then Practice
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects
      .filter((p) => {
        let matchesCategory = true;
        if (currentCategory === 'academic') {
          matchesCategory =
            p.category === 'mca' ||
            p.category === 'bca' ||
            p.secondaryCategory === 'bca' ||
            p.secondaryCategory === 'mca';
        } else if (currentCategory !== 'all') {
          matchesCategory =
            p.category === currentCategory || p.secondaryCategory === currentCategory;
        }

        const matchesStatus = currentStatus === 'all' || p.status === currentStatus;

        // Search query matching
        let matchesSearch = true;
        if (query) {
          const inTitle = p.title.toLowerCase().includes(query);
          const inTagline = p.tagline.toLowerCase().includes(query);
          const inStack = p.stack.some((s) => s.toLowerCase().includes(query));
          const inCategory = p.category.toLowerCase().includes(query);
          matchesSearch = inTitle || inTagline || inStack || inCategory;
        }

        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const priorityA = getProjectPriority(a);
        const priorityB = getProjectPriority(b);
        if (priorityA !== priorityB) {
          return priorityA - priorityB;
        }
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [currentCategory, currentStatus, searchQuery]);

  const academicCount = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.category === 'mca' ||
          p.category === 'bca' ||
          p.secondaryCategory === 'bca' ||
          p.secondaryCategory === 'mca'
      ).length,
    []
  );
  const liveClientsCount = LIVE_SITES.length;

  return (
    <div className="w-full">
      {/* 1. Page Header & Hero Intro */}
      <section className="relative pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--line)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
              [SYSTEMS DIRECTORY · 2023 - 2026]
            </span>
            <Hero3DText
              as="h1"
              align="left"
              segments={[
                { text: 'Production' },
                { text: 'systems &', accent: true },
                { text: 'architectures.' },
              ]}
              gradientClass="from-[var(--accent)] via-[var(--pop)] to-[var(--accent-2)]"
              className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] tracking-tight"
            />
            <p className="mt-3 text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed">
              Explore {projects.length} software engineering platforms: MCA/BCA capstones, full-stack AI applications, production client deployments, and modern MERN/Next.js architectures built by Dhanush A.
            </p>
          </div>

          {/* Quick Metrics Multi-Color Cards */}
          <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3 w-full md:w-auto">
            <div
              style={getMultiCardStyle(0)}
              className="px-3 sm:px-3.5 py-2 rounded-xl border multi-card transition-all"
            >
              <span className="block text-base sm:text-lg font-heading font-black text-[var(--ink)]">
                {String(projects.length).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-[var(--muted)] uppercase font-semibold">Total Projects</span>
            </div>
            <div
              style={getMultiCardStyle(1)}
              className="px-3 sm:px-3.5 py-2 rounded-xl border multi-card transition-all"
            >
              <span className="block text-base sm:text-lg font-heading font-black text-emerald-700 dark:text-emerald-400">
                {String(liveClientsCount).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-emerald-700 dark:text-emerald-400 uppercase font-semibold">Live Clients</span>
            </div>
            <div
              style={getMultiCardStyle(5)}
              className="px-3 sm:px-3.5 py-2 rounded-xl border multi-card transition-all"
            >
              <span className="block text-base sm:text-lg font-heading font-black text-violet-700 dark:text-violet-300">
                {String(academicCount).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-violet-700 dark:text-violet-300 uppercase font-semibold">Academic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Top Section: 3D Auto-Rotating Cylinder Showcase of 5 Live Client Platforms */}
      <Rotating3DDeck />

      {/* 3. Repositioned Category Command Hub (Sticky Dock) */}
      <WorkFilterHub
        currentCategory={currentStatus === 'live' ? 'live-section' : currentCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCategorySelect={updateFilters}
        onResetFilters={resetFilters}
        totalProjects={projects.length}
        filteredCount={filteredProjects.length}
        filterTabs={filterTabs}
      />

      {/* 4. Crazy Motion 3D Parallax Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[var(--line)] rounded-2xl p-8 bg-[var(--surface-2)]">
            <Layers3 className="w-12 h-12 text-[var(--muted)] mx-auto mb-3 opacity-50" />
            <h3 className="font-heading font-bold text-xl text-[var(--ink)] mb-1">
              No matching systems found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] font-mono max-w-md mx-auto mb-5">
              No projects match your current filter query. Try resetting filters to explore all {projects.length} engineering architectures.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white text-xs font-mono font-bold transition-colors shadow-md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <CrazyProjectCard
                  key={project.slug}
                  project={project}
                  index={idx}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}
