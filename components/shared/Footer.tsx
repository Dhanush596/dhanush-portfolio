'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUp,
  Mail,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Terminal,
  FileText,
  Send,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navGroups = [
    {
      title: 'Systems & Work',
      tag: '01',
      links: [
        { label: 'All 22 Systems', href: '/work' },
        { label: 'Live Client Platforms', href: '/work?category=live-section' },
        { label: 'MCA & BCA Academic', href: '/work?category=academic' },
        { label: 'DevOps & GitOps Lab', href: '/devops-lab' },
        { label: 'Experience & Roles', href: '/experience' },
      ],
    },
    {
      title: 'Profile & Journey',
      tag: '02',
      links: [
        { label: 'Engineering Journey', href: '/journey' },
        { label: 'Credentials & Certs', href: '/credentials' },
        { label: 'Education & Academics', href: '/education' },
        { label: 'Tech Stack Spectrum', href: '/stack' },
        { label: 'About Dhanush', href: '/about' },
      ],
    },
    {
      title: 'Connect & Inquire',
      tag: '03',
      links: [
        { label: "Start a Conversation", href: '/contact' },
        { label: 'Resume (View & PDF)', href: '/resume' },
        { label: 'GitHub Repositories', href: PERSONAL_INFO.github, external: true },
        { label: 'LinkedIn Network', href: PERSONAL_INFO.linkedin, external: true },
        { label: 'Direct Email Dispatch', href: `mailto:${PERSONAL_INFO.email}`, external: true },
      ],
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] mt-24 transition-colors duration-500">
      {/* 1. Orbiting Top Border Laser Beam */}
      <BorderBeam
        duration={8}
        borderWidth={1.5}
        colorFrom="var(--accent)"
        colorTo="var(--ok)"
        colorPop="var(--accent-2)"
      />

      {/* 2. Infinite Kinetic Text Marquee */}
      <div className="w-full overflow-hidden border-b border-[var(--line)] bg-[var(--surface-2)]/60 py-3.5 select-none backdrop-blur-sm">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-mono text-xs uppercase tracking-widest text-[var(--muted)] font-semibold"
        >
          <span>✦ DHANUSH A · FULL-STACK SOFTWARE ENGINEER · MCA 2ND YEAR · PRIMPRO.AI · OPEN FOR FULL-TIME & CONTRACT ROLES · BENGALURU, IN ✦ PRODUCTION-READY SYSTEMS · REACT 19 · NEXT.JS · PYTHON · FLASK · MONGODB · POSTGRES · DOCKER ✦ </span>
          <span>✦ DHANUSH A · FULL-STACK SOFTWARE ENGINEER · MCA 2ND YEAR · PRIMPRO.AI · OPEN FOR FULL-TIME & CONTRACT ROLES · BENGALURU, IN ✦ PRODUCTION-READY SYSTEMS · REACT 19 · NEXT.JS · PYTHON · FLASK · MONGODB · POSTGRES · DOCKER ✦ </span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* 3. Hero Brand & Live Availability Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-[var(--line)]">
          <div className="max-w-2xl">
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase mb-5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for high-impact software roles & consulting</span>
            </div>

            {/* Giant Editorial Wordmark */}
            <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl tracking-tighter uppercase text-[var(--ink)] leading-none select-none">
              Dhanush A<span className="text-[var(--accent)]">.</span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-[var(--muted)] font-sans leading-relaxed max-w-xl">
              Software Engineer specializing in scalable full-stack web applications, AI-assisted tools, and modern cloud deployment pipelines. Based in Bengaluru, India.
            </p>
          </div>

          {/* Quick Action CTA Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/contact"
              className="py-3 px-6 rounded-2xl bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[var(--accent)]/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Let&apos;s build together</span>
            </Link>

            <Link
              href="/resume"
              className="py-3 px-5 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--ink)] text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all hover:border-[var(--accent)]"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Resume PDF</span>
            </Link>
          </div>
        </div>

        {/* 4. Multi-Column Navigation Directory */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-14 border-b border-[var(--line)]">
          {/* Metadata Card: Location & Live Time */}
          <div className="md:col-span-4 p-6 rounded-2xl border border-[var(--line)] bg-[var(--surface-2)]/60 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-4">
                <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-widest font-bold">
                  [LOCATION & TIME ENGINE]
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
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
                  <span className="font-bold text-sm tracking-wider">
                    {timeString || '05:30:00 PM IST'}
                  </span>
                </div>
              </div>
            </div>

            {/* Social Connect Pills */}
            <div className="pt-6 border-t border-[var(--line)] mt-6 flex items-center gap-2.5">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Directory Navigation Columns */}
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {navGroups.map((group) => (
              <div key={group.title} className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-2.5 border-b border-[var(--line)] mb-4">
                    <span className="text-[10px] font-mono text-[var(--accent)] font-bold">
                      [{group.tag}]
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                      {group.title}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-0.5"
                          >
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              {link.label}
                            </span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group flex items-center justify-between text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors py-0.5"
                          >
                            <span className="transition-transform duration-200 group-hover:translate-x-1">
                              {link.label}
                            </span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)]" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Bottom Copyright Bar & Back to Top Rocket */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--muted)]">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 Dhanush A. All rights reserved.</span>
            <span className="hidden sm:inline text-[var(--line)]">·</span>
            <span className="hidden sm:inline">Engineered with Next.js 16 & Three.js</span>
          </div>

          {/* Interactive Back to Top Launch Button */}
          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setIsHoveredTop(true)}
            onMouseLeave={() => setIsHoveredTop(false)}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all shadow-sm active:scale-95"
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
    </footer>
  );
}
