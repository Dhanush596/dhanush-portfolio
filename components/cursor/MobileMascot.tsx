'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { PUPPET_CONFIG } from '@/lib/puppetConfig';

export function MobileMascot() {
  const [hidden, setHidden] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    // Check localStorage dismissal
    const isDismissed = localStorage.getItem('mascot_dismissed') === 'true';
    if (!isDismissed) {
      setHidden(false);
    }

    // Scroll listener for running animation
    let scrollTimeout: NodeJS.Timeout | null = null;
    const handleScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHidden(true);
    localStorage.setItem('mascot_dismissed', 'true');
  };

  const handleTap = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 350);
  };

  if (hidden) return null;

  return (
    <div
      className="fixed bottom-6 right-5 z-40 flex flex-col items-center select-none"
      aria-label="Interactive Mascot"
    >
      {/* Dismiss Button */}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Hide mascot"
        className="self-end mb-1 w-5 h-5 rounded-full bg-[var(--surface)] text-[var(--ink)]/60 hover:text-[var(--ink)] border border-[var(--line)] shadow-sm flex items-center justify-center text-[10px] active:scale-95 transition-transform"
      >
        <X className="w-3 h-3" />
      </button>

      {/* Mascot Toy Character */}
      <motion.div
        onClick={handleTap}
        animate={
          isJumping
            ? { y: [-15, 0], scaleY: [1.1, 0.9, 1] }
            : isScrolling
            ? { rotate: [-5, 5, -5], y: [-3, 0, -3] }
            : { y: [0, -3, 0] }
        }
        transition={
          isJumping
            ? { duration: 0.35, ease: 'easeOut' }
            : isScrolling
            ? { repeat: Infinity, duration: 0.25, ease: 'easeInOut' }
            : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
        }
        className="w-16 h-20 relative cursor-pointer active:scale-95 transition-transform drop-shadow-md flex flex-col items-center"
      >
        {/* Cap */}
        <div
          className="w-6 h-2.5 rounded-t-full relative z-20"
          style={{ backgroundColor: PUPPET_CONFIG.colors.scarf }}
        />
        {/* Head */}
        <div
          className="w-8 h-8 rounded-full border border-black/20 relative z-10 flex items-center justify-center shadow-inner"
          style={{ backgroundColor: PUPPET_CONFIG.colors.wood }}
        >
          {/* Eyes */}
          <div className="flex gap-1.5">
            <span className="w-1 h-1 rounded-full bg-white/90" />
            <span className="w-1 h-1 rounded-full bg-white/90" />
          </div>
        </div>
        {/* Scarf */}
        <div
          className="w-7 h-2 rounded-full -mt-1 relative z-20"
          style={{ backgroundColor: PUPPET_CONFIG.colors.scarf }}
        />
        {/* Torso / Shirt */}
        <div
          className="w-7 h-8 rounded-xl border border-black/20 -mt-0.5 relative z-10 shadow-sm"
          style={{ backgroundColor: PUPPET_CONFIG.colors.shirt }}
        />
        {/* Legs & Shoes */}
        <div className="flex gap-2 -mt-1">
          <div
            className="w-2.5 h-4 rounded-b-md"
            style={{ backgroundColor: PUPPET_CONFIG.colors.shoes }}
          />
          <div
            className="w-2.5 h-4 rounded-b-md"
            style={{ backgroundColor: PUPPET_CONFIG.colors.shoes }}
          />
        </div>
      </motion.div>
    </div>
  );
}
