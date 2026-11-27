'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { TopBar } from '@/components/shared/TopBar';
import { CommandPalette } from '@/components/shared/CommandPalette';
import { CustomCursor } from '@/components/shared/CustomCursor';
import { PuppetCursor } from '@/components/cursor/PuppetCursor';
import { ScrollProgressIndicator } from '@/components/shared/ScrollProgressIndicator';
import { ActBackground } from '@/components/home/ActBackground';
import { CrazyLoadFX } from '@/components/shared/CrazyLoadFX';
import { InteractiveCardFX } from '@/components/shared/InteractiveCardFX';
import { useEasterEggs } from '@/components/shared/EasterEggs';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [commandOpen, setCommandOpen] = useState(false);
  const { calmMode, soundEnabled, toggleCalm, toggleSound } = useEasterEggs();

  return (
    <>
      {/* Page Load / Route Transition Crazy 3D Chromatic Burst */}
      <CrazyLoadFX key={pathname} />
      {/* Global cursor-reactive multi-color spotlight on cards */}
      <InteractiveCardFX />
      {/* Subtle Grain Overlay for tactile editorial texture */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.04] mix-blend-multiply bg-[radial-gradient(var(--ink)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Dynamic Background Color Sync via ScrollTrigger */}
      <ActBackground />

      {/* Top Thin Progress Bar & Act Counter */}
      <ScrollProgressIndicator />

      {/* Lagging Cursor with morphing action bubbles */}
      <CustomCursor />

      {/* 3D Pulled Puppet Physics Cursor (Hanging, trailing, running) */}
      <PuppetCursor isModalOpen={commandOpen} />

      {/* Floating Dynamic Top Bar */}
      <TopBar onOpenCommand={() => setCommandOpen(true)} />

      {/* Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onToggleCalm={toggleCalm}
        onToggleSound={toggleSound}
        soundEnabled={soundEnabled}
        calmEnabled={calmMode}
      />

      {/* Main Acts Content */}
      <main className="relative z-10 w-full min-h-screen">
        {children}
      </main>
    </>
  );
}
