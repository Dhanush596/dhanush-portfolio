'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { projects, categoryLabels, statusLabels, Category, Status } from '@/lib/projects';

export function WorkIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | 'all'>('all');
  const [currentStatus, setCurrentStatus] = useState<Status | 'all'>('all');

  // Available categories with counts
  const availableCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.secondaryCategory) {
        counts[p.secondaryCategory] = (counts[p.secondaryCategory] || 0) + 1;
      }
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

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesCat =
        currentCategory === 'all' ||
        p.category === currentCategory ||
        p.secondaryCategory === currentCategory;
      const matchesStat =
        currentStatus === 'all' || p.status === currentStatus;
      return matchesCat && matchesStat;
    });
  }, [currentCategory, currentStatus]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Toggle Expand Trigger */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] text-[var(--ink)] font-heading font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-md group"
        >
          <span>{isOpen ? 'Collapse Project Index' : `View All ${projects.length} Projects & Case Studies`}</span>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-[var(--accent)] group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--accent)] group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>
      </div>

      {/* Expandable Index Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden mt-10 pt-10 border-t border-[var(--line)]"
          >
            {/* Filter Chips Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {availableCategories.map((cat) => {
                  const isActive = currentCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setCurrentCategory(cat.key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
                        isActive
                          ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-sm'
                          : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {cat.label} ({cat.count})
                    </button>
                  );
                })}
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                {(['all', 'live', 'realtime', 'practice'] as const).map((stat) => (
                  <button
                    key={stat}
                    type="button"
                    onClick={() => setCurrentStatus(stat)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all border ${
                      currentStatus === stat
                        ? 'bg-[var(--ink)] text-[var(--act-bg)] font-bold border-[var(--ink)]'
                        : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:text-[var(--ink)]'
                    }`}
                  >
                    {stat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* List Table Rows */}
            <div className="space-y-2">
              {filteredProjects.map((proj, idx) => (
                <Link
                  key={proj.slug}
                  href={`/work/${proj.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-2)] transition-colors group"
                >
                  <div className="flex items-center gap-4 min-w-0 pr-4">
                    <span className="font-mono text-xs text-[var(--muted)] w-8 shrink-0">
                      #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>

                    <div className="truncate">
                      <div className="flex items-center gap-2.5 mb-0.5">
                        <span className="font-heading font-bold text-sm sm:text-base text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors truncate">
                          {proj.title}
                        </span>

                        {proj.status && (
                          <span
                            className={`px-2 py-0.2 rounded-full text-[9px] font-mono shrink-0 font-semibold border ${
                              proj.status === 'live'
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20'
                                : proj.status === 'realtime'
                                ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20'
                                : 'bg-[var(--surface-2)] text-[var(--muted)] border-[var(--line)]'
                            }`}
                          >
                            {statusLabels[proj.status]?.label}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[var(--muted)] truncate font-sans">
                        {proj.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="hidden sm:inline-block text-xs font-mono text-[var(--muted)]">
                      {categoryLabels[proj.category]}
                    </span>

                    <div className="w-8 h-8 rounded-full border border-[var(--line)] bg-[var(--surface-2)] flex items-center justify-center text-[var(--muted)] group-hover:bg-[var(--accent)] group-hover:text-white group-hover:border-[var(--accent)] transition-all">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
