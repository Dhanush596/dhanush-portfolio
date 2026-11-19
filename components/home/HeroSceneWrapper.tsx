'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

// Dynamic import with ssr: false as explicitly requested
const NodeNetworkCanvas = dynamic(
  () => import('@/components/canvas/NodeNetworkCanvas'),
  {
    ssr: false,
    loading: () => <StaticHeroGradient />,
  }
);

function StaticHeroGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/15 via-[var(--accent-2)]/10 to-transparent blur-3xl opacity-70" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-[var(--accent-2)]/15 to-transparent blur-3xl opacity-50" />
    </div>
  );
}

export function HeroSceneWrapper() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isNarrow = window.innerWidth < 768;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(isNarrow || isTouch);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // During SSR or before mobile check finishes, render static gradient
  if (isMobile === null || isMobile || prefersReducedMotion) {
    return <StaticHeroGradient />;
  }

  return (
    <>
      <StaticHeroGradient />
      <NodeNetworkCanvas />
    </>
  );
}
