'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function CustomCursor() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const isPointerRef = useRef(false);
  const cursorTextRef = useRef<string | null>(null);

  // Smooth lagging spring for outer ring
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]');
      const nextText = cursorTarget ? cursorTarget.getAttribute('data-cursor') : null;
      if (nextText !== cursorTextRef.current) {
        cursorTextRef.current = nextText;
        setCursorText(nextText);
      }

      const isClickable = Boolean(target?.closest('a, button, [role="button"], input, select'));
      if (isClickable !== isPointerRef.current) {
        isPointerRef.current = isClickable;
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!mounted || prefersReducedMotion || !visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--ink)] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorText ? 0 : 1,
        }}
      />

      {/* Outer lagging ring or morphing label pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[11px] font-bold text-white shadow-xl"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          width: cursorText ? 68 : isPointer ? 36 : 24,
          height: cursorText ? 28 : isPointer ? 36 : 24,
          borderRadius: 9999,
          backgroundColor: cursorText
            ? 'var(--ink)'
            : isPointer
            ? 'rgba(37, 99, 235, 0.12)'
            : 'rgba(15, 23, 42, 0.04)',
          borderWidth: cursorText ? 0 : 1.5,
          borderColor: isPointer ? 'var(--accent)' : 'var(--line)',
          scale: cursorText ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 350 }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="tracking-wider uppercase text-white"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}
