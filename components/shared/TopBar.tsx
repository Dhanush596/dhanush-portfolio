'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/data';
import { FileText, Send, Menu, X, Command, Sun, Moon } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '/work' },
  { label: 'Experience', href: '/experience' },
  { label: 'Education', href: '/education' },
  { label: 'Credentials', href: '/credentials' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function TopBar({ onOpenCommand }: { onOpenCommand?: () => void }) {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
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
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setIsDark(currentTheme === 'dark');

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
  }, [puppetEnabled]);

  // Keep topbar permanently visible and accessible across all screens
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs font-mono pointer-events-none"
      >
        {/* Brand identity pill */}
        <div className="pointer-events-auto">
          <Link
            href="/"
            prefetch={true}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] backdrop-blur-xl hover:border-[var(--accent)] transition-all duration-200 shadow-sm"
          >
            {/* Header Profile Photo */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />
            <span className="font-heading font-black tracking-tight text-[var(--ink)] text-sm">
              DHANUSH A
            </span>
            <span className="hidden md:inline-block text-[var(--muted)]/40 font-normal">/</span>
            <span className="hidden md:inline-block text-[var(--muted)] text-[11px]">
              Software Engineer
            </span>
          </Link>
        </div>

        {/* Center multi-page navigation dock with active route pill */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-1 px-2 py-1 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 backdrop-blur-2xl shadow-sm pointer-events-auto"
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

        {/* Right CTA pills: Puppet toggle, Theme toggle, Command Palette, Resume, Let's build */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Puppet Toggle Pill (Accessible on all screens) */}
          <button
            type="button"
            onClick={togglePuppet}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 text-xs font-mono shadow-sm cursor-pointer"
            title={puppetEnabled ? 'Turn OFF 3D Puppet Cursor (Press P)' : 'Turn ON 3D Puppet Cursor (Press P)'}
            aria-label="Toggle 3D Puppet Cursor"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                puppetEnabled ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>Puppet: <span className="font-bold">{puppetEnabled ? 'ON' : 'OFF'}</span></span>
          </button>

          {/* Theme Toggle (Sun / Moon) */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center p-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200 shadow-sm"
            title={isDark ? 'Switch to Light theme (D)' : 'Switch to Dark theme (D)'}
            aria-label="Toggle visual theme"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-[var(--muted)]" />
            )}
          </button>

          {/* Quick Command Trigger */}
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 shadow-sm"
            title="Open command palette (Cmd+K)"
          >
            <Command className="w-3.5 h-3.5 text-[var(--muted)]" />
            <span className="text-[11px] font-mono">⌘K</span>
          </button>

          {/* Resume PDF pill (Links to /resume with View & Download) */}
          <Link
            href="/resume"
            prefetch={true}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] hover:border-[var(--accent)] transition-all duration-200 text-xs font-mono shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[var(--warn)]" />
            <span>Resume</span>
          </Link>

          {/* Let's build mailto pill */}
          <Link
            href="/contact"
            prefetch={true}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-white font-heading font-bold text-xs hover:bg-[var(--accent-2)] transition-colors duration-200 shadow-md shadow-[var(--accent)]/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Let&apos;s build</span>
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 text-[var(--ink)] hover:bg-[var(--surface-2)] transition-colors shadow-sm"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[120] bg-[var(--surface)]/98 backdrop-blur-3xl flex flex-col justify-center px-8 sm:px-12 md:hidden text-[var(--ink)] pointer-events-auto"
          >
            <div className="space-y-4">
              <span className="text-[11px] font-mono text-[var(--muted)] block mb-2 uppercase tracking-widest">
                [PAGES NAVIGATION]
              </span>
              {NAV_ITEMS.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-heading text-2xl font-extrabold transition-colors block py-1.5 ${
                      pathname === item.href
                        ? 'text-[var(--accent)]'
                        : 'text-[var(--ink)] hover:text-[var(--accent)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-6 border-t border-[var(--line)] flex flex-col gap-2.5">
                <Link
                  href="/resume"
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-mono text-[var(--warn)] py-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume (View & Download)</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommand?.();
                  }}
                  className="flex items-center gap-2 text-sm font-mono text-[var(--muted)] py-1.5 text-left"
                >
                  <Command className="w-4 h-4" />
                  <span>Command Palette (⌘K)</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-mono text-[var(--ink)] py-1.5 text-left"
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[var(--muted)]" />}
                  <span>{isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</span>
                </button>
                <button
                  type="button"
                  onClick={togglePuppet}
                  className="flex items-center gap-2 text-sm font-mono text-[var(--ink)] py-1.5 text-left"
                >
                  <span className={`w-2 h-2 rounded-full ${puppetEnabled ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  <span>Puppet: <span className="font-bold">{puppetEnabled ? 'ON' : 'OFF'}</span></span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
