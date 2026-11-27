'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  GraduationCap,
  Briefcase,
  Globe,
  Layers,
  FlaskConical,
  Search,
  X,
  RotateCcw,
} from 'lucide-react';
import { Category, Status } from '@/lib/projects';

export interface FilterTab {
  key: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

interface WorkFilterHubProps {
  currentCategory: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onCategorySelect: (key: string) => void;
  onResetFilters: () => void;
  totalProjects: number;
  filteredCount: number;
  filterTabs: FilterTab[];
}

export function WorkFilterHub({
  currentCategory,
  searchQuery,
  onSearchChange,
  onCategorySelect,
  onResetFilters,
  totalProjects,
  filteredCount,
  filterTabs,
}: WorkFilterHubProps) {
  const isFiltered = currentCategory !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="sticky top-14 sm:top-20 z-30 w-full bg-[var(--surface)]/90 backdrop-blur-xl border-y border-[var(--line)] shadow-sm transition-colors py-2.5 sm:py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Scrollable Category Tabs with Touch Momentum */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0 touch-pan-x">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentCategory === tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => onCategorySelect(tab.key)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap flex items-center gap-2 select-none shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {/* Sliding Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        isActive
                          ? 'bg-white/20 text-white font-bold'
                          : 'bg-[var(--line)] text-[var(--muted)]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Area: Search Box & Reset Counter */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted)] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search stack, title, role..."
                className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] placeholder-[var(--muted)] text-xs font-mono focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--ink)]"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results Counter & Reset */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] whitespace-nowrap shrink-0">
              <span className="hidden sm:inline">
                {filteredCount} of {totalProjects}
              </span>

              {isFiltered && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="p-1.5 rounded-lg border border-[var(--line)] hover:border-red-500/40 hover:text-red-500 text-[var(--muted)] transition-colors"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
