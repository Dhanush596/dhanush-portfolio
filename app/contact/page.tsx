'use client';

import React from 'react';
import Link from 'next/link';
import { ContactBlock } from '@/components/contact/ContactBlock';
import { MegaFooter } from '@/components/contact/MegaFooter';
import { Reveal } from '@/components/shared/Reveal';

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[var(--act-bg)] text-[var(--ink)] pt-24 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        {/* Breadcrumb */}
        <Reveal delay={0.05}>
          <div className="flex items-center gap-2 text-xs font-mono text-[var(--muted)] mb-4">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[var(--accent)] font-semibold">Contact</span>
          </div>
        </Reveal>
      </div>

      {/* Main Interactive Contact Block */}
      <ContactBlock />

      {/* Complete Footer */}
      <MegaFooter />
    </div>
  );
}
