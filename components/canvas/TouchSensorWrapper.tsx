'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useBackgroundMode } from './BackgroundModeContext';

const TouchSensorCanvas = dynamic(
  () => import('./TouchSensorCanvas'),
  {
    ssr: false,
    loading: () => <StaticDarkBackground />,
  }
);

function StaticDarkBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-white/[0.04] via-zinc-800/[0.03] to-transparent blur-3xl opacity-70" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-zinc-700/[0.04] to-transparent blur-3xl opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || prefersReducedMotion) {
    return <StaticDarkBackground />;
  }

  return (
    <>
      <StaticDarkBackground />
      <TouchSensorCanvas mode={mode} />
    </>
  );
}
