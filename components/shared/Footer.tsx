'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  Mail,
  ExternalLink,
  MapPin,
  Clock,
  FileText,
  Send,
  ArrowRight,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';
import { projects } from '@/lib/projects';
import { Hero3DText } from '@/components/shared/Hero3DText';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { getCardTheme, getMultiCardStyle } from '@/lib/cardThemes';

export function Footer() {
  const [timeString, setTimeString] = useState<string>('');
  const [isHoveredTop, setIsHoveredTop] = useState(false);

  // Live Bengaluru IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeString(new Intl.DateTimeFormat('en-IN', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navGroups = [
    {
      title: 'Systems & Work',
      tag: '01',
      themeIndex: 2,
      links: [
        { label: `All ${projects.length} Systems`, href: '/work' },
        { label: 'Live & Demo Platforms', href: '/work?status=live' },
        { label: 'MCA & BCA Academic', href: '/work?category=academic' },
        { label: 'DevOps & GitOps Lab', href: '/devops-lab' },
        { label: 'Experience & Roles', href: '/experience' },
      ],
    },
    {
      title: 'Profile & Journey',
      tag: '02',
      themeIndex: 5,
      links: [
        { label: 'Credentials & Certs', href: '/credentials' },
        { label: 'Education & Academics', href: '/education' },
        { label: 'Tech Stack Spectrum', href: '/stack' },
        { label: 'Engineering Experience', href: '/experience' },
        { label: 'About Dhanush', href: '/about' },
      ],
    },
    {
      title: 'Connect & Inquire',
      tag: '03',
      themeIndex: 8,
      links: [
        { label: 'Start a Conversation', href: '/contact' },
        { label: 'Resume (View & PDF)', href: '/resume' },
        { label: 'GitHub Repositories', href: PERSONAL_INFO.github, external: true },
        { label: 'LinkedIn Network', href: PERSONAL_INFO.linkedin, external: true },
        { label: 'Direct Email Dispatch', href: `mailto:${PERSONAL_INFO.email}`, external: true },
      ],
    },
  ];

  const locationTheme = getCardTheme(0);

  return (
    <footer className="relative w-full overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] mt-12 sm:mt-16 transition-colors duration-500">
      {/* 1. Animated Multi-Color Top Border Scanning Laser Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2.5px] z-20 overflow-hidden"
      >
        <motion.div
          animate={{ x: ['-40%', '140%'] }}
          transition={{ duration: 4.2, ease: 'easeInOut', repeat: Infinity }}
          className="h-full w-2/5 bg-gradient-to-r from-transparent via-[var(--accent)] via-50% to-[var(--pop)] opacity-95 blur-[0.5px]"
        />
      </div>

      {/* Multi-Color Ambient Aurora Orbs (Non-blocking behind content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/4 w-[min(60vw,540px)] h-56 rounded-full opacity-20 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, var(--accent) 0%, var(--accent-2) 60%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/4 w-[min(60vw,540px)] h-56 rounded-full opacity-20 blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, var(--pop) 0%, var(--ok) 60%, transparent 100%)',
        }}
      />

      {/* 2. Infinite Kinetic Text Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-b border-[var(--line)] bg-[var(--surface-2)]/75 py-3.5 select-none backdrop-blur-sm">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-mono text-xs uppercase tracking-widest text-[var(--muted)] font-semibold hover:[animation-play-state:paused]"
        >
          <span>
            ✦ DHANUSH A · FULL-STACK SOFTWARE ENGINEER · MCA GRAD 2026 · PRIMEPRO.AI · OPEN FOR FULL-TIME & CONTRACT ROLES · BENGALURU, IN ✦ PRODUCTION-READY SYSTEMS · REACT 19 · NEXT.JS 16 · PYTHON · FLASK · MONGODB · POSTGRES · DOCKER ✦{' '}
          </span>
          <span>
            ✦ DHANUSH A · FULL-STACK SOFTWARE ENGINEER · MCA GRAD 2026 · PRIMEPRO.AI · OPEN FOR FULL-TIME & CONTRACT ROLES · BENGALURU, IN ✦ PRODUCTION-READY SYSTEMS · REACT 19 · NEXT.JS 16 · PYTHON · FLASK · MONGODB · POSTGRES · DOCKER ✦{' '}
          </span>
        </motion.div>
      </div>

      {/* 3. Main Footer Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-10 sm:pb-12">
        {/* Hero Brand & Live Availability Header with 3D Motion Wordmark */}
        <motion.div
          initial={{ opacity: 1, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 sm:pb-14 border-b border-[var(--line)]"
        >
          <div className="max-w-2xl">
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase mb-5 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for high-impact software roles & consulting</span>
            </div>

            {/* 3D Animated Kinetic Editorial Wordmark */}
            <Hero3DText
              as="h2"
              trigger="inView"
              align="left"
              segments={[
                { text: 'Dhanush' },
                { text: 'A.', accent: true, preserveCase: true },
              ]}
              gradientClass="from-blue-600 via-purple-600 to-rose-500 dark:from-cyan-400 dark:via-violet-400 dark:to-rose-400"
              className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[var(--ink)] leading-none"
            />

            <p className="mt-4 text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed max-w-xl">
              Software Engineer specializing in scalable full-stack web applications, AI-assisted platforms, and resilient cloud deployment pipelines. Based in Bengaluru, India.
            </p>
          </div>

          {/* Quick Action CTA Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-purple-600 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Let&apos;s build together</span>
            </Link>

            <Link
              href="/resume"
              className="py-3 px-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all hover:border-[var(--accent)]"
            >
              <FileText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>Resume PDF</span>
            </Link>
          </div>
        </motion.div>

        {/* 4. Multi-Color Navigation Cards Directory (Every card distinct multi-color!) */}
        <motion.div
          initial={{ opacity: 1, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 py-10 sm:py-14 border-b border-[var(--line)]"
        >
          {/* Metadata Card: Location & Live Time (Theme 0: Cobalt + Violet + Cyan) */}
          <div
            style={getMultiCardStyle(0)}
            className="lg:col-span-4 relative overflow-hidden p-6 rounded-2xl border multi-card flex flex-col justify-between transition-all duration-300"
          >
            <BorderBeam
              duration={6.5}
              borderWidth={1.5}
              colorFrom={locationTheme.c1Hex}
              colorTo={locationTheme.c2Hex}
              colorPop={locationTheme.c3Hex}
            />
            <div className="relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" />
                  [LOCATION & TIME]
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  IST (UTC+5:30)
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--ink)]">
                  <MapPin className="w-4 h-4 text-[var(--pop)] shrink-0" />
                  <span className="font-semibold">Bengaluru, Karnataka, India</span>
                </div>
                <div className="text-[11px] font-mono text-[var(--muted)] pl-6">
                  Coordinates: 12.9716° N, 77.5946° E
                </div>

                <div className="flex items-center gap-2.5 text-xs font-mono text-[var(--ink)] pt-2 border-t border-[var(--line)]">
                  <Clock className="w-4 h-4 text-[var(--accent)] shrink-0" />
                  <span className="font-bold text-sm tracking-wider tabular-nums">
                    {timeString || '05:30:00 PM IST'}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect Pills */}
            <div className="relative z-10 pt-5 border-t border-[var(--line)] mt-6 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)]/90 text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all shadow-sm"
                  aria-label="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>

              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--muted)]">
                <Sparkles className="w-3 h-3 text-[var(--accent)]" />
                Zero-Drift
              </span>
            </div>
          </div>

          {/* Directory Navigation Multi-Color Cards (Themes 2, 5, 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {navGroups.map((group) => {
              const gTheme = getCardTheme(group.themeIndex);
              return (
                <div
                  key={group.title}
                  style={getMultiCardStyle(group.themeIndex)}
                  className="relative overflow-hidden p-5 rounded-2xl border multi-card flex flex-col transition-all duration-300"
                >
                  <BorderBeam
                    duration={7 + group.themeIndex * 0.4}
                    borderWidth={1.5}
                    colorFrom={gTheme.c1Hex}
                    colorTo={gTheme.c2Hex}
                    colorPop={gTheme.c3Hex}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 pb-2.5 border-b border-[var(--line)] mb-4">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--surface)]/90 text-[var(--accent)] border border-[var(--line)]">
                        [{group.tag}]
                      </span>
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                        {group.title}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.label}>
                          {link.external ? (
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between text-xs font-mono text-[var(--ink)] hover:text-[var(--accent)] transition-colors py-1"
                            >
                              <span className="transition-transform duration-200 group-hover:translate-x-1">
                                {link.label}
                              </span>
                              <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" />
                            </a>
                          ) : (
                            <Link
                              href={link.href}
                              className="group flex items-center justify-between text-xs font-mono text-[var(--ink)] hover:text-[var(--accent)] transition-colors py-1"
                            >
                              <span className="transition-transform duration-200 group-hover:translate-x-1">
                                {link.label}
                              </span>
                              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)] shrink-0" />
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* 5. Bottom Copyright Bar & Back to Top Rocket */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-center sm:text-left">
            <span className="text-[var(--ink)] font-medium">© 2026 Dhanush A. All rights reserved.</span>
            <span className="hidden sm:inline text-[var(--line)]">·</span>
            <span className="hidden sm:inline">Engineered with Next.js 16 & Three.js</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[11px] text-[var(--muted)]">
              <span>Press</span>
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] font-bold">
                D
              </kbd>
              <span>Theme</span>
              <span className="text-[var(--line)]">·</span>
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] font-bold">
                P
              </kbd>
              <span>Puppet</span>
            </div>

            {/* Interactive Back to Top Launch Button */}
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => setIsHoveredTop(true)}
              onMouseLeave={() => setIsHoveredTop(false)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm active:scale-95"
            >
              <span>Back to top</span>
              <motion.div
                animate={{ y: isHoveredTop ? -3 : 0 }}
                transition={{ repeat: isHoveredTop ? Infinity : 0, repeatType: 'reverse', duration: 0.4 }}
              >
                <ArrowUp className="w-3.5 h-3.5 text-[var(--accent)]" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
