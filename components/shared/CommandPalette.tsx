'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { projects } from '@/lib/projects';
import { PERSONAL_INFO } from '@/lib/data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleCalm?: () => void;
  onToggleSound?: () => void;
  soundEnabled?: boolean;
  calmEnabled?: boolean;
}

interface PaletteItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onToggleCalm,
  onToggleSound,
  soundEnabled,
  calmEnabled,
}: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Generate searchable catalogue
  const items = useMemo<PaletteItem[]>(() => {
    const list: PaletteItem[] = [
      {
        id: 'nav-home',
        title: 'Home (Overview & System Hub)',
        subtitle: 'Engineering headline, live telemetry, and section directory',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/');
        },
      },
      {
        id: 'nav-work',
        title: 'Projects Archive (BCA, MCA, Internships & Production)',
        subtitle: '21 engineering architectures, academic builds, and client platforms',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/work');
        },
      },
      {
        id: 'nav-experience',
        title: 'Experience & Internships',
        subtitle: 'PrimePro.ai engineer, Rooman 100/100 DevOps, and Encode Data Tech',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/experience');
        },
      },
      {
        id: 'nav-education',
        title: 'Education & Academic Degrees',
        subtitle: 'MCA (VTU 2026), BCA 8.2 CGPA, PUC, and 10th Schooling records',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/education');
        },
      },
      {
        id: 'nav-credentials',
        title: 'Credentials & Protected Markscards',
        subtitle: 'Verified academic markscards, certificates, and completion honors',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/credentials');
        },
      },
      {
        id: 'nav-about',
        title: 'About Dhanush A (Profile & Mission)',
        subtitle: 'Background story from Kasaragod to Bangalore, philosophy & stack',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/about');
        },
      },
      {
        id: 'nav-contact',
        title: 'Contact & Transmission',
        subtitle: 'Direct email transmission, contact form, and devops status',
        category: 'Pages',
        action: () => {
          onClose();
          router.push('/contact');
        },
      },
      {
        id: 'nav-resume',
        title: 'Resume (View & Download PDF)',
        subtitle: 'Official CV with verified work, degrees, and technical competencies',
        category: 'Documents',
        action: () => {
          onClose();
          router.push('/resume');
        },
      },
      {
        id: 'act-calm',
        title: calmEnabled ? 'Disable Calm Mode (Z)' : 'Enable Calm Mode (Z)',
        subtitle: 'Dampen motion and saturation for distraction-free reading',
        category: 'Preferences',
        action: onToggleCalm || (() => {}),
      },
      {
        id: 'act-sound',
        title: soundEnabled ? 'Mute Interface Sounds (M)' : 'Enable Interface Sounds (M)',
        subtitle: 'Toggle tactile audio feedback synthesized via Web Audio',
        category: 'Preferences',
        action: onToggleSound || (() => {}),
      },
    ];

    // Add Live Sites
    projects
      .filter((p) => p.links?.live)
      .slice(0, 5)
      .forEach((p) => {
        list.push({
          id: `live-${p.slug}`,
          title: `Visit: ${p.title}`,
          subtitle: p.tagline,
          category: 'Live Sites',
          action: () => {
            window.open(p.links.live!, '_blank');
          },
        });
      });

    // Add Case Studies
    projects.slice(0, 8).forEach((p) => {
      list.push({
        id: `proj-${p.slug}`,
        title: `Case Study: ${p.title}`,
        subtitle: `${p.role} · ${p.category.toUpperCase()}`,
        category: 'Case Studies',
        action: () => {
          onClose();
          router.push(`/work/${p.slug}`);
        },
      });
    });

    if (!query.trim()) return list;

    const q = query.toLowerCase();
    return list.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query, calmEnabled, soundEnabled, onToggleCalm, onToggleSound]);

  // Arrow navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].action();
        onClose();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Dialog Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl overflow-hidden z-10 text-[var(--ink)]"
            onKeyDown={handleKeyDown}
          >
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)]">
              <Search className="w-4 h-4 text-[var(--muted)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type to jump to an Act, project, certificate, or setting..."
                className="w-full bg-transparent text-sm text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none font-mono"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
              {items.length === 0 ? (
                <div className="p-8 text-center text-xs font-mono text-[var(--muted)]">
                  No matching results found for &quot;{query}&quot;.
                </div>
              ) : (
                items.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors font-mono ${
                        isSelected
                          ? 'bg-[var(--surface-2)] text-[var(--ink)]'
                          : 'hover:bg-[var(--surface-2)]/60 text-[var(--ink)]'
                      }`}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-bold text-[var(--ink)] truncate">
                            {item.title}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)] shrink-0">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--muted)] truncate font-sans">
                          {item.subtitle}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-1 text-[11px] text-[var(--accent)] shrink-0 font-mono">
                          <span>Enter</span>
                          <CornerDownLeft className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2.5 border-t border-[var(--line)] bg-[var(--surface-2)]/60 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>Esc Close</span>
              </div>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
