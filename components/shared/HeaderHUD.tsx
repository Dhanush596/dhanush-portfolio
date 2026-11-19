'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBackgroundMode } from '@/components/canvas/BackgroundModeContext';
import { Sparkles, Layers, Activity } from 'lucide-react';

export function HeaderHUD() {
  const pathname = usePathname();
  const { mode, toggleMode } = useBackgroundMode();

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-white/[0.08] backdrop-blur-xl bg-black/60 px-4 sm:px-8 py-3.5 flex items-center justify-between text-xs font-mono transition-colors duration-300">
      {/* Identity Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="font-heading font-bold text-sm tracking-tight text-white hover:opacity-80 transition-opacity">
          DHANUSH A
        </Link>
        <span className="hidden sm:inline-block text-white/30">/</span>
        <span className="hidden sm:inline-block text-white/50 text-[11px]">
          Software Engineer
        </span>
      </div>

      {/* Center Status / Location Ticker */}
      <div className="hidden md:flex items-center gap-2.5 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[11px] text-white/70">
          Currently in Bangalore · <span className="text-white font-medium">(Available) for projects</span>
        </span>
      </div>

      {/* Right Controls: Mode Toggle + Quick Links */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* WebGL Canvas Mode Switcher */}
        <button
          type="button"
          onClick={toggleMode}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-white/20 bg-white/[0.04] text-[11px] text-white/90 hover:border-white hover:bg-white/10 transition-all duration-200"
          title="Toggle interactive 3D WebGL mode"
        >
          <Layers className="w-3 h-3 text-white/70" />
          <span>[MODE: <span className="text-white font-bold uppercase">{mode}</span>]</span>
        </button>

        {/* Quick Nav Links */}
        <nav className="flex items-center gap-3 sm:gap-4 text-[11px] text-white/70">
          <Link
            href="/work"
            className={`hover:text-white transition-colors ${
              pathname.startsWith('/work') ? 'text-white font-bold underline underline-offset-4' : ''
            }`}
          >
            Work
          </Link>
          <Link
            href="/about"
            className={`hover:text-white transition-colors ${
              pathname.startsWith('/about') ? 'text-white font-bold underline underline-offset-4' : ''
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`hover:text-white transition-colors ${
              pathname.startsWith('/contact') ? 'text-white font-bold underline underline-offset-4' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
