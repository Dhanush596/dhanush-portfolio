'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useBackgroundMode } from './BackgroundModeContext';

const TouchSensorCanvas = dynamic(
  () => import('./TouchSensorCanvas'),
  {
    ssr: false,
    loading: () => <StaticPastelBackground />,
  }
);

function StaticPastelBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-transparent">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-[#BFDBFE]/40 via-[#DDD6FE]/30 to-transparent dark:from-blue-600/20 dark:via-violet-600/15 dark:to-transparent blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#E2ECFE]/50 to-transparent dark:from-cyan-500/15 dark:to-transparent blur-3xl opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}

export function TouchSensorWrapper() {
  const { mode } = useBackgroundMode();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const syncTheme = () => {
      const dark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');
      setIsDark(dark);
    };
    syncTheme();

    const handleThemeEvent = (e: Event) => {
      const custom = e as CustomEvent<string>;
      setIsDark(custom.detail === 'dark');
    };
    window.addEventListener('theme-changed', handleThemeEvent);

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => {
      window.removeEventListener('theme-changed', handleThemeEvent);
      observer.disconnect();
    };
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <StaticPastelBackground />;
  }

  return (
    <>
      <StaticPastelBackground />
      <Suspense fallback={null}>
        <TouchSensorCanvas mode={mode} isDark={isDark} />
      </Suspense>
    </>
  );
}
