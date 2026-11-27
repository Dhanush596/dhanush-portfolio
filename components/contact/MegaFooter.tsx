'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUp, Globe, Mail, MapPin, Clock, Activity } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function MegaFooter() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [puppetEnabled, setPuppetEnabled] = useState<boolean>(true);
  const [isWordmarkHovered, setIsWordmarkHovered] = useState(false);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(smoothX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);

  const handleWordmarkMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !wordmarkRef.current) return;
    const rect = wordmarkRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleWordmarkLeave = () => {
    setIsWordmarkHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem('puppet_cursor_enabled');
      if (stored !== null) {
        setPuppetEnabled(stored === 'true');
      }
    } catch {}

    const handlePuppetToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setPuppetEnabled(customEvent.detail);
    };
    window.addEventListener('puppet-toggle-changed', handlePuppetToggle);
    return () => window.removeEventListener('puppet-toggle-changed', handlePuppetToggle);
  }, []);

  const togglePuppet = () => {
    const nextVal = !puppetEnabled;
    setPuppetEnabled(nextVal);
    try {
      localStorage.setItem('puppet_cursor_enabled', String(nextVal));
    } catch {}
    window.dispatchEvent(new CustomEvent('puppet-toggle-changed', { detail: nextVal }));
  };

  // Client-side IST Bangalore Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(istTime);
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

  return (
    <footer className="w-full bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#4F46E5] pt-24 sm:pt-28 pb-12 text-white relative z-20 overflow-hidden shadow-2xl">
      {/* Top Chromatic Laser Sweep */}
      <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
        <motion.div
          animate={{ x: ['-40%', '140%'] }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          className="h-full w-2/5 bg-gradient-to-r from-transparent via-cyan-300 to-rose-300"
        />
      </div>

      {/* Multi-color Atmospheric Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-fuchsia-400/20 blur-3xl"
      />

      {/* 1. Giant 3D Extruded "DHANUSH A" Wordmark */}
      <div
        ref={wordmarkRef}
        onMouseMove={handleWordmarkMove}
        onMouseEnter={() => setIsWordmarkHovered(true)}
        onMouseLeave={handleWordmarkLeave}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 select-none"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          style={{
            rotateX: isWordmarkHovered ? rotateX : undefined,
            rotateY: isWordmarkHovered ? rotateY : undefined,
            transformStyle: 'preserve-3d',
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : isWordmarkHovered
              ? { scale: 1.03 }
              : { rotateX: [3, -3, 3], rotateY: [-4, 4, -4] }
          }
          transition={
            isWordmarkHovered
              ? { type: 'spring', stiffness: 200, damping: 18 }
              : { duration: 7.5, repeat: Infinity, ease: 'easeInOut' }
          }
          className="relative inline-block"
        >
          {/* Back 3D Extrusion Layer (Cyan) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 font-heading font-black text-5xl sm:text-8xl md:text-[10.5vw] lg:text-[9.5rem] tracking-tighter leading-none text-cyan-300/35"
            style={{ transform: 'translate3d(4px, 6px, -14px)' }}
          >
            DHANUSH A
          </span>

          {/* Mid 3D Extrusion Layer (Rose) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 font-heading font-black text-5xl sm:text-8xl md:text-[10.5vw] lg:text-[9.5rem] tracking-tighter leading-none text-rose-300/35"
            style={{ transform: 'translate3d(2px, 3px, -7px)' }}
          >
            DHANUSH A
          </span>

          {/* Front Interactive 3D Face */}
          <h2
            id="mega-footer-wordmark"
            className="relative font-heading font-black text-5xl sm:text-8xl md:text-[10.5vw] lg:text-[9.5rem] tracking-tighter leading-none text-white drop-shadow-[0_12px_30px_rgba(15,23,42,0.4)] cursor-default"
            style={{ transform: 'translateZ(10px)' }}
          >
            DHANUSH A
          </h2>
        </motion.div>
      </div>

      {/* 2. Seamless Tagline Marquee */}
      <div className="w-full overflow-hidden border-y border-white/25 py-3.5 bg-slate-950/25 backdrop-blur-sm mb-14 select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-mono text-xs uppercase tracking-widest text-white/95"
        >
          <span>Ship it. Then sip. · Zero-downtime. · GitOps all the way. · Built in Bangalore. · Infrastructure as Code. · Continuous Delivery. · </span>
          <span>Ship it. Then sip. · Zero-downtime. · GitOps all the way. · Built in Bangalore. · Infrastructure as Code. · Continuous Delivery. · </span>
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 3. Balanced 4-Column Cards Grid (Prevents narrow wrapping on clock & Back to Top) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_0.95fr] gap-5 sm:gap-6 pb-14 border-b border-white/25">
          {/* Card 1: DevOps System Status (Crisp high-contrast emerald/white/cyan gradient) */}
          <div className="relative p-6 rounded-3xl text-[#0F172A] shadow-2xl flex flex-col justify-between overflow-hidden animate-float-1 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 border border-white/60">
            <BorderBeam duration={7} borderWidth={1.8} colorFrom="#06B6D4" colorTo="#10B981" colorPop="#F43F5E" />

            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80 mb-4">
                  <span className="text-[10px] font-mono text-indigo-700 uppercase tracking-widest font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    [SYSTEM STATUS]
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 font-bold whitespace-nowrap px-2 py-0.5 rounded-full bg-emerald-100/80 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    Operational
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-mono text-slate-600 block uppercase font-semibold">
                    Core Systems Infrastructure:
                  </span>
                  {[
                    { label: 'Kubernetes Cluster (K3s)', status: '100% UPTIME', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
                    { label: 'ArgoCD GitOps Sync', status: 'HEALTHY', badge: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
                    { label: 'Trivy Security Scan', status: '0 CVEs', badge: 'bg-violet-100 text-violet-800 border-violet-300' },
                    { label: 'Terraform IaC State', status: 'CONVERGED', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
                  ].map((service) => (
                    <div key={service.label} className="flex items-center justify-between gap-2 text-xs font-mono">
                      <span className="text-slate-900 font-semibold truncate">
                        {service.label}
                      </span>
                      <span className={`font-bold text-[10px] px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${service.badge}`}>
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
                <span>ArgoCD GitOps</span>
                <span className="text-emerald-700 font-bold whitespace-nowrap">Synced & Healthy</span>
              </div>
            </div>
          </div>

          {/* Card 2: Multi-Page Navigation Directory (Teal + Violet + Cyan glass) */}
          <div className="p-6 rounded-3xl border border-white/25 bg-gradient-to-br from-violet-600/45 via-indigo-700/45 to-cyan-600/40 backdrop-blur-md space-y-3 font-mono text-xs shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-cyan-200 uppercase tracking-widest font-bold block mb-4 border-b border-white/20 pb-2.5">
                [PAGES DIRECTORY]
              </span>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/work" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    Projects (BCA, MCA & Live)
                  </Link>
                </li>
                <li>
                  <Link href="/experience" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    Experience & Internships
                  </Link>
                </li>
                <li>
                  <Link href="/education" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    Education (MCA, BCA, PUC)
                  </Link>
                </li>
                <li>
                  <Link href="/credentials" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    Credentials & Transcripts
                  </Link>
                </li>
                <li>
                  <Link href="/about" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    About Me & Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" prefetch={true} className="text-white hover:text-cyan-200 hover:translate-x-1 transition-all block">
                    Transmission & Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Socials & Connect Column (Rose + Purple + Amber glass) */}
          <div className="p-6 rounded-3xl border border-white/25 bg-gradient-to-br from-rose-600/40 via-purple-700/45 to-amber-500/35 backdrop-blur-md space-y-3 font-mono text-xs shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-[11px] text-amber-200 uppercase tracking-widest font-bold block mb-4 border-b border-white/20 pb-2.5">
                [CONNECT & CODE]
              </span>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-amber-200 hover:translate-x-1 transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">GitHub (@dhanusha-png)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-amber-200 hover:translate-x-1 transition-all"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">LinkedIn (dhanush-a)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-2 text-white hover:text-amber-200 hover:translate-x-1 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Direct Email</span>
                  </a>
                </li>
                <li>
                  <a
                    href={PERSONAL_INFO.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white hover:text-amber-200 hover:translate-x-1 transition-all"
                  >
                    <Globe className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Official Resume PDF</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Location, Live Clock & Back to Top (Emerald + Teal + Blue glass, no wrapping!) */}
          <div className="p-6 rounded-3xl border border-white/25 bg-gradient-to-br from-emerald-600/40 via-teal-700/45 to-blue-700/45 backdrop-blur-md flex flex-col justify-between items-start shadow-xl">
            <div className="w-full font-mono text-xs space-y-3">
              <span className="text-[11px] text-emerald-200 font-bold uppercase tracking-widest flex items-center gap-1.5 border-b border-white/20 pb-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Bangalore, IN</span>
              </span>

              <div className="flex items-center gap-2 text-white font-bold pt-1">
                <Clock className="w-4 h-4 text-cyan-200 shrink-0" />
                <span className="text-sm sm:text-base tracking-wide whitespace-nowrap tabular-nums">
                  {currentTime || '12:00:00'} IST
                </span>
              </div>
              <p className="text-[11px] text-white/80 leading-relaxed">
                UTC+5:30 · Available globally for engineering & cloud roles.
              </p>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 w-full justify-center px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white border border-white/30 transition-all flex items-center gap-2 text-xs font-mono font-bold whitespace-nowrap group cursor-pointer shadow-sm"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 shrink-0 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4. Bottom Legal / Credits Row & Easter Egg Tip */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/95 gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span>© 2026 Dhanush A. Built with Next.js 16, React 19 & Three.js.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-white/90">
            <span className="whitespace-nowrap">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">D</kbd> Theme
            </span>
            <span>·</span>
            <span className="whitespace-nowrap">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">Z</kbd> Calm
            </span>
            <span>·</span>
            <span className="whitespace-nowrap">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">M</kbd> Sound
            </span>
            <span>·</span>
            <button
              type="button"
              onClick={togglePuppet}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/20 hover:bg-white/30 transition-colors text-white font-bold cursor-pointer whitespace-nowrap"
            >
              <span>Puppet: {puppetEnabled ? 'ON' : 'OFF'}</span>
              <kbd className="px-1 py-0.2 rounded bg-white/25 text-[10px]">P</kbd>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
