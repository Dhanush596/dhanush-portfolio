'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-black/80 backdrop-blur-xl py-14 px-4 sm:px-8 lg:px-12 mt-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.08]">
        <div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase">
            DHANUSH A
          </span>
          <p className="text-xs font-mono text-white/50 mt-1">
            Software Engineer · Web & App Developer at PrimePro.ai
          </p>
          <p className="text-[11px] font-mono text-white/30 mt-0.5">
            [Bangalore, IN // 12.9716° N, 77.5946° E]
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-white/60">
          <Link href="/work" className="hover:text-white transition-colors">
            Work
          </Link>
          <Link href="/journey" className="hover:text-white transition-colors">
            Journey
          </Link>
          <Link href="/devops-lab" className="hover:text-white transition-colors">
            DevOps Lab
          </Link>
          <Link href="/credentials" className="hover:text-white transition-colors">
            Credentials
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-white/50">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <span className="text-white/20">/</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <span className="text-white/20">/</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-white/40">
        <div>
          © 2026 Dhanush A. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <span>Three.js Interactive Deformation Plane</span>
          <span className="text-white/20">·</span>
          <span>Next.js App Router</span>
        </div>
      </div>
    </footer>
  );
}
