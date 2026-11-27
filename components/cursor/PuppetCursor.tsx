'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { PUPPET_CONFIG, isPuppetDebug } from '@/lib/puppetConfig';
import { MobileMascot } from './MobileMascot';

// Dynamic import with ssr: false for the 3D physics canvas
const PuppetCanvas = dynamic(
  () => import('./PuppetCanvas').then((mod) => mod.PuppetCanvas),
  {
    ssr: false,
    loading: () => null,
  }
);

interface PuppetCursorProps {
  isModalOpen?: boolean;
}

export function PuppetCursor({ isModalOpen = false }: PuppetCursorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isFinePointer, setIsFinePointer] = useState<boolean | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [debugActive, setDebugActive] = useState(false);

  // Debug sliders state (when ?puppet=debug is on)
  const [ropeLengthVal, setRopeLengthVal] = useState(PUPPET_CONFIG.ropeLength);
  const [gravityVal, setGravityVal] = useState(PUPPET_CONFIG.gravity[1]);
  const [springStiffVal, setSpringStiffVal] = useState(PUPPET_CONFIG.ropeSpringStiffness);

  useEffect(() => {
    // 1. Check pointer capability (desktop vs touch)
    const mediaFine = window.matchMedia('(pointer: fine)');
    setIsFinePointer(mediaFine.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    mediaFine.addEventListener('change', handlePointerChange);

    // 2. Check localStorage preference (Default ON)
    const stored = localStorage.getItem('puppet_cursor_enabled');
    if (stored !== null) {
      setIsEnabled(stored === 'true');
    }

    // 3. Check debug query param
    setDebugActive(isPuppetDebug());

    // 4. Keyboard Shortcut toggle (Key 'P' or 'p')
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't toggle if user is typing in an input
      const target = e.target as HTMLElement | null;
      if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
      ) {
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        setIsEnabled((prev) => {
          const nextVal = !prev;
          localStorage.setItem('puppet_cursor_enabled', String(nextVal));
          window.dispatchEvent(new CustomEvent('puppet-toggle-changed', { detail: nextVal }));
          return nextVal;
        });
      }
    };

    // 5. Listen to footer toggle event
    const handleCustomToggle = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      setIsEnabled(customEvent.detail);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('puppet-toggle-changed', handleCustomToggle);

    // 6. Mount puppet immediately on client ready
    setIsReady(true);

    return () => {
      mediaFine.removeEventListener('change', handlePointerChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('puppet-toggle-changed', handleCustomToggle);
    };
  }, []);

  // Sync debug slider changes to PUPPET_CONFIG
  const handleRopeChange = (val: number) => {
    setRopeLengthVal(val);
    PUPPET_CONFIG.ropeLength = val;
  };

  const handleGravityChange = (val: number) => {
    setGravityVal(val);
    PUPPET_CONFIG.gravity[1] = val;
  };

  const handleStiffChange = (val: number) => {
    setSpringStiffVal(val);
    PUPPET_CONFIG.ropeSpringStiffness = val;
  };

  // If user prefers reduced motion, disable entirely
  if (prefersReducedMotion) {
    return null;
  }

  // Touch devices: Render lightweight mobile mascot
  if (isFinePointer === false) {
    return <MobileMascot />;
  }

  // Not ready, disabled by user, or pointer not yet determined
  if (!isReady || !isEnabled || isFinePointer === null) {
    return null;
  }

  return (
    <>
      <PuppetCanvas isModalOpen={isModalOpen} />

      {/* Hidden Debug Panel (Active only when ?puppet=debug is in URL) */}
      {debugActive && (
        <div className="fixed bottom-6 left-6 z-[80] p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-[var(--line)] shadow-2xl text-[var(--ink)] font-mono text-xs w-72 space-y-3 pointer-events-auto backdrop-blur-md">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-bold text-[var(--accent)]">Puppet Tuning</span>
            <span className="text-[10px] text-[var(--muted)]">?puppet=debug</span>
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Rope Length</span>
              <span>{ropeLengthVal.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.2"
              step="0.05"
              value={ropeLengthVal}
              onChange={(e) => handleRopeChange(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Gravity Y</span>
              <span>{gravityVal.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="-8.0"
              max="-0.5"
              step="0.5"
              value={gravityVal}
              onChange={(e) => handleGravityChange(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span>Spring Stiffness</span>
              <span>{springStiffVal.toFixed(0)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={springStiffVal}
              onChange={(e) => handleStiffChange(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
          </div>
        </div>
      )}
    </>
  );
}
