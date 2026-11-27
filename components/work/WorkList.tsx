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
  siteStats,
  categoryLabels,
  statusLabels,
  Category,
  Status,
  Project,
} from '@/lib/projects';
import { Rotating3DDeck } from './Rotating3DDeck';
import { WorkFilterHub, FilterTab } from './WorkFilterHub';
import { CrazyProjectCard } from './CrazyProjectCard';

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
      label: 'Live Client Platforms',
      shortLabel: 'Clients',
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

  return (
    <div className="w-full min-h-screen">
      {/* 1. Page Header & Hero Intro */}
      <section className="relative pt-24 sm:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[var(--line)]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest block mb-2 font-semibold">
              [SYSTEMS DIRECTORY · 2023 - 2026]
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] tracking-tight">
              Production{' '}
              <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] via-[var(--pop)] to-[var(--accent-2)] bg-clip-text text-transparent font-normal italic lowercase">
                systems &
              </span>{' '}
              architectures.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed">
              Explore 22 software engineering platforms: MCA/BCA capstones, full-stack AI applications, production client deployments, and modern MERN/Next.js architectures built by Dhanush A.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="px-3.5 py-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
              <span className="block text-lg font-heading font-black text-[var(--ink)]">22</span>
              <span className="text-[10px] font-mono text-[var(--muted)] uppercase">Total Projects</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 shadow-sm">
              <span className="block text-lg font-heading font-black text-emerald-600 dark:text-emerald-400">05</span>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">Live Clients</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl border border-blue-500/30 bg-blue-500/10 shadow-sm">
              <span className="block text-lg font-heading font-black text-blue-600 dark:text-blue-400">07</span>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 uppercase">MCA / BCA Academic</span>
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
              No projects match your current filter query. Try resetting filters to explore all 22 engineering architectures.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-mono font-bold hover:bg-[var(--accent-2)] transition-colors shadow-md"
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
