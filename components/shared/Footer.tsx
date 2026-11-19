'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/shared/Icons';
import { PERSONAL_INFO } from '@/lib/data';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--card-border)] bg-[var(--bg)] py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-20 sm:mb-24">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-heading font-bold text-lg text-[var(--text)]">
            Dhanush A
          </span>
          <p className="text-xs text-[var(--text)]/60 mt-1">
            Software Engineer • Web & App Developer at PrimePro.ai
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--text)]/70">
          <Link href="/work" className="hover:text-[var(--accent)] transition-colors">
            Work
          </Link>
          <Link href="/journey" className="hover:text-[var(--accent)] transition-colors">
            Journey
          </Link>
          <Link href="/devops-lab" className="hover:text-[var(--accent)] transition-colors">
            DevOps
          </Link>
          <Link href="/credentials" className="hover:text-[var(--accent)] transition-colors">
            Credentials
          </Link>
          <Link href="/contact" className="hover:text-[var(--accent)] transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4 text-[var(--text)]/60">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email"
            className="hover:text-[var(--accent)] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--card-border)] text-center text-xs text-[var(--text)]/50">
        © 2026 Dhanush A. Built with Next.js App Router, Three.js & Tailwind CSS.
      </div>
    </footer>
  );
}
