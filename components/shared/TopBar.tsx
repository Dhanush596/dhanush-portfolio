'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';
import {
  FileText,
  Send,
  Menu,
  X,
  Command,
  Sun,
  Moon,
  Briefcase,
  GraduationCap,
  Award,
  User,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '/work', icon: Layers },
  { label: 'Experience', href: '/experience', icon: Briefcase },
  { label: 'Education', href: '/education', icon: GraduationCap },
  { label: 'Credentials', href: '/credentials', icon: Award },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: Send },
];

export function TopBar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [puppetEnabled, setPuppetEnabled] = useState(true);

  const togglePuppet = () => {
    const nextVal = !puppetEnabled;
    setPuppetEnabled(nextVal);
    try {
      localStorage.setItem('puppet_cursor_enabled', String(nextVal));
    } catch {}
    window.dispatchEvent(new CustomEvent('puppet-toggle-changed', { detail: nextVal }));
  };

  const toggleTheme = () => {
    const isCurrentlyDark =
      document.documentElement.getAttribute('data-theme') === 'dark' ||
      document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    document.body.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('theme', nextTheme);
    } catch {}
    setIsDark(nextTheme === 'dark');
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: nextTheme }));
  };

  // Initialize theme and puppet states
  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setIsDark(currentTheme === 'dark');
    };
    checkTheme();

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      setIsDark(customEvent.detail === 'dark');
    };
    window.addEventListener('theme-changed', handleThemeChange);

    // Keyboard shortcut 'D' to toggle theme, 'P' to toggle puppet
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }
      if (e.key.toLowerCase() === 'd' && !e.metaKey && !e.ctrlKey) {
        toggleTheme();
      }
      if (e.key.toLowerCase() === 'p' && !e.metaKey && !e.ctrlKey) {
        togglePuppet();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    try {
      const stored = localStorage.getItem('puppet_cursor_enabled');
      if (stored !== null) setPuppetEnabled(stored === 'true');
    } catch {}

    const handlePuppetChange = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setPuppetEnabled(customEvent.detail);
    };
    window.addEventListener('puppet-toggle-changed', handlePuppetChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('puppet-toggle-changed', handlePuppetChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          duration: prefersReducedMotion ? 0.05 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed top-0 left-0 w-full z-50 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5 flex items-center justify-between text-xs font-mono pointer-events-none"
      >
        {/* Brand Identity Pill (Optimized for Mobile Width) */}
        <div className="pointer-events-auto shrink-0">
          <Link
            href="/"
            prefetch={true}
            className="group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] backdrop-blur-xl hover:border-[var(--accent)] transition-all duration-200 shadow-sm"
          >
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[var(--accent)]/50 shrink-0 shadow-sm bg-[var(--surface-2)]">
              <Image
                src="/dhanush-profile.jpg"
                alt="Dhanush A"
                fill
                className="object-cover object-top"
                sizes="24px"
                priority
              />
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse shrink-0" />
            <span className="font-heading font-black tracking-tight text-[var(--ink)] text-xs sm:text-sm">
              DHANUSH A
            </span>
            <span className="hidden xl:inline-block text-[var(--muted)]/40 font-normal">/</span>
            <span className="hidden xl:inline-block text-[var(--muted)] text-[11px]">
              Software Engineer
            </span>
          </Link>
        </div>

        {/* Center Desktop Navigation Dock with Active Animated Pill */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 backdrop-blur-2xl shadow-sm pointer-events-auto"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || (item.href === '/work' && pathname.startsWith('/work/'));
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 z-10 ${
                  isActive ? 'text-[var(--ink)] font-bold' : 'text-[var(--muted)] hover:text-[var(--ink)]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="topbar-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[var(--act-tint)] border border-[var(--line)] rounded-full -z-10 shadow-sm"
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Controls: Mobile Cleaned, Desktop Expanded */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          {/* Puppet Toggle Pill (Desktop Only) */}
          <button
            type="button"
            onClick={togglePuppet}
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 text-xs font-mono shadow-sm cursor-pointer"
            title={puppetEnabled ? 'Turn OFF 3D Puppet Cursor (P)' : 'Turn ON 3D Puppet Cursor (P)'}
            aria-label="Toggle 3D Puppet Cursor"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                puppetEnabled ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>Puppet: <span className="font-bold">{puppetEnabled ? 'ON' : 'OFF'}</span></span>
          </button>

          {/* Quick Command Trigger (Desktop Only) */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden xl:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 shadow-sm"
            title="Open command palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span className="text-[11px] font-mono font-semibold">K</span>
          </button>

          {/* Resume PDF pill (Tablet & Desktop) */}
          <Link
            href="/resume"
            prefetch={true}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 text-xs font-mono shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-amber-500" />
            <span>Resume</span>
          </Link>

          {/* Theme Toggle Button (Available on ALL screens) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 shadow-sm active:scale-95"
            title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
            aria-label="Toggle visual theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[var(--muted)]" />
            )}
          </button>

          {/* Let's Build CTA Pill (Tablet & Desktop) */}
          <Link
            href="/contact"
            prefetch={true}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-heading font-bold text-xs transition-colors duration-200 shadow-md shadow-blue-600/25 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Let&apos;s build</span>
          </Link>

          {/* Mobile & Tablet Hamburger Button (High Contrast, Guaranteed Visible) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-2)] hover:border-[var(--accent)] transition-all shadow-md active:scale-90"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--pop)]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Full-Screen High-Impact Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[120] bg-[var(--surface)] text-[var(--ink)] overflow-y-auto flex flex-col justify-between p-6 sm:p-10 lg:hidden pointer-events-auto"
          >
            {/* Drawer Header with Title & Direct Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-[var(--line)]">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--accent)]/50 shrink-0 shadow-sm bg-[var(--surface-2)]">
                  <Image
                    src="/dhanush-profile.jpg"
                    alt="Dhanush A"
                    fill
                    className="object-cover object-top"
                    sizes="32px"
                  />
                </div>
                <div>
                  <span className="font-heading font-black text-sm text-[var(--ink)] block leading-tight">
                    DHANUSH A
                  </span>
                  <span className="text-[10px] font-mono text-[var(--accent)] font-semibold">
                    Navigation Menu
                  </span>
                </div>
              </div>

              {/* Close (X) Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] flex items-center justify-center hover:bg-[var(--line)] transition-all shadow-sm active:scale-90"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Icons & Active Indicators */}
            <div className="py-6 space-y-2">
              <span className="text-[11px] font-mono text-[var(--muted)] block mb-3 uppercase tracking-widest font-bold">
                [PAGES & EXHIBITIONS]
              </span>

              {NAV_ITEMS.map((item, idx) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || (item.href === '/work' && pathname.startsWith('/work/'));

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      prefetch={true}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md'
                          : 'hover:bg-[var(--surface-2)] text-[var(--ink)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[var(--accent)]'}`} />
                        <span className="font-heading font-black text-lg tracking-tight">
                          {item.label}
                        </span>
                      </div>
                      <ArrowRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[var(--muted)]'}`} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Actions & Quick Tools in Mobile Drawer */}
            <div className="pt-6 border-t border-[var(--line)] space-y-3">
              {/* Primary "Let's Build" CTA */}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Let&apos;s build together</span>
              </Link>

              {/* Resume Download Pill */}
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 px-4 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] font-mono text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-colors"
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Resume (View & Download)</span>
              </Link>

              {/* Utility Grid: Theme + Puppet + Command Palette */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="py-2.5 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--muted)]" />}
                  <span>{isDark ? 'Light' : 'Dark'} Mode</span>
                </button>

                <button
                  type="button"
                  onClick={togglePuppet}
                  className="py-2.5 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] text-xs font-mono font-semibold flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <span className={`w-2 h-2 rounded-full ${puppetEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  <span>Puppet: {puppetEnabled ? 'ON' : 'OFF'}</span>
                </button>
              </div>

              {onOpenCommand && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommand();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[var(--line)] text-[var(--muted)] hover:text-[var(--ink)] text-xs font-mono flex items-center justify-center gap-2"
                >
                  <Command className="w-3.5 h-3.5" />
                  <span>Command Palette (⌘K)</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
