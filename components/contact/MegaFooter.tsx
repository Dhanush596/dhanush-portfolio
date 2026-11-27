'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUp, Globe, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function MegaFooter() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [puppetEnabled, setPuppetEnabled] = useState<boolean>(true);

  // Sync Puppet cursor state from localStorage and events
  useEffect(() => {
    const stored = localStorage.getItem('puppet_cursor_enabled');
    if (stored !== null) {
      setPuppetEnabled(stored === 'true');
    }

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
    localStorage.setItem('puppet_cursor_enabled', String(nextVal));
    window.dispatchEvent(new CustomEvent('puppet-toggle-changed', { detail: nextVal }));
  };

  // Client-side IST Bangalore Clock (avoids hydration mismatch)
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
    <footer className="w-full bg-[#2563EB] pt-20 pb-12 text-white relative z-20 overflow-hidden shadow-2xl">
      {/* 1. Giant Outlined "DHANUSH A" Wordmark that fills white on hover */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8 select-none">
        <h2
          id="mega-footer-wordmark"
          className="font-heading font-black text-6xl sm:text-9xl md:text-[14vw] tracking-tighter leading-none stroke-text hover:text-white transition-all duration-700 cursor-default"
        >
          DHANUSH A
        </h2>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.7);
          color: transparent;
        }
        .stroke-text:hover {
          -webkit-text-stroke: 2px #ffffff;
          color: #ffffff;
        }
      `}</style>

      {/* 2. Seamless Tagline Marquee */}
      <div className="w-full overflow-hidden border-y border-white/20 py-3.5 bg-blue-700/40 mb-16 select-none">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex w-max gap-8 font-mono text-xs uppercase tracking-widest text-white/80"
        >
          <span>Ship it. Then sip. · Zero-downtime. · GitOps all the way. · Built in Bangalore. · Infrastructure as Code. · Continuous Delivery. · </span>
          <span>Ship it. Then sip. · Zero-downtime. · GitOps all the way. · Built in Bangalore. · Infrastructure as Code. · Continuous Delivery. · </span>
        </motion.div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3. System Status Card & Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/20">
          {/* DevOps Status Card (White Card with Dark Text for high contrast) */}
          <div className="md:col-span-4 relative p-6 rounded-3xl bg-white text-[#0F172A] shadow-2xl flex flex-col justify-between overflow-hidden animate-float-1">
            <BorderBeam duration={7} borderWidth={1.5} colorFrom="#2563EB" colorTo="#10B981" colorPop="#F43F5E" />

            <div className="relative z-10 w-full h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">
                    [SYSTEM STATUS]
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    All Systems Operational
                  </span>
                </div>

                {/* Platform Infrastructure Health (Live site names removed from home page) */}
                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-mono text-slate-600 block uppercase">
                    Core Systems Infrastructure:
                  </span>
                  {[
                    { label: 'Kubernetes Cluster (K3s)', status: '100% UPTIME' },
                    { label: 'ArgoCD GitOps Sync', status: 'HEALTHY' },
                    { label: 'Trivy Container Security', status: '0 CVEs' },
                    { label: 'Terraform IaC State', status: 'CONVERGED' },
                  ].map((service) => (
                    <div key={service.label} className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-800 font-medium truncate max-w-[180px]">
                        {service.label}
                      </span>
                      <span className="text-emerald-600 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>ArgoCD GitOps Status</span>
                <span className="text-emerald-600 font-bold">Synced & Healthy</span>
              </div>
            </div>
          </div>

          {/* Multi-Page Navigation Directory */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[11px] text-white/70 uppercase tracking-widest font-bold block mb-4">
              [PAGES DIRECTORY]
            </span>
            <ul className="space-y-2.5">
              <li>
                <Link href="/work" prefetch={true} className="text-white hover:underline block">
                  Projects (BCA, MCA, Internships & Live)
                </Link>
              </li>
              <li>
                <Link href="/experience" prefetch={true} className="text-white hover:underline block">
                  Experience & Internships (100/100)
                </Link>
              </li>
              <li>
                <Link href="/education" prefetch={true} className="text-white hover:underline block">
                  Education (MCA, BCA, PUC, 10th)
                </Link>
              </li>
              <li>
                <Link href="/credentials" prefetch={true} className="text-white hover:underline block">
                  Credentials & Transcripts (View-Only)
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={true} className="text-white hover:underline block">
                  About Me & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="text-white hover:underline block">
                  Transmission & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials & Connect Column (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[11px] text-white/70 uppercase tracking-widest font-bold block mb-4">
              [CONNECT & CODE]
            </span>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub (@dhanusha-png)</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:underline"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn (dhanush-a)</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-2 text-white hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Direct Email</span>
                </a>
              </li>
              <li>
                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white hover:underline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Official Resume PDF</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Clock & Back to Top (2 cols) */}
          <div className="md:col-span-2 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right font-mono text-xs">
              <span className="text-white/70 block uppercase text-[10px]">
                Bangalore, IN
              </span>
              <span className="text-base text-white font-bold block mt-1">
                {currentTime || '12:00:00'} IST
              </span>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 md:mt-0 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-2 text-xs font-mono group"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4. Bottom Legal / Credits Row & Easter Egg Tip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/80 gap-4">
          <div className="flex items-center gap-2">
            <span>© 2026 Dhanush A. Built with Next.js 16, React 19 & Three.js.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/70">
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">D</kbd> for Dark theme</span>
            <span>·</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">Z</kbd> for Calm</span>
            <span>·</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">M</kbd> for Sound</span>
            <span>·</span>
            <button
              type="button"
              onClick={togglePuppet}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/15 hover:bg-white/25 transition-colors text-white font-bold cursor-pointer"
            >
              <span>Puppet: {puppetEnabled ? 'ON' : 'OFF'}</span>
              <kbd className="px-1 py-0.2 rounded bg-white/20 text-[10px]">P</kbd>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
