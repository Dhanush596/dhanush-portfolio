'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  width?: 'fit' | 'full';
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.35,
  width = 'full',
}: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return <div className={cn(width === 'full' ? 'w-full' : 'w-fit', className)}>{children}</div>;
  }

  const offset = 12;
  const initialVariants = {
    up: { opacity: 1, y: offset },
    down: { opacity: 1, y: -offset },
    left: { opacity: 1, x: offset },
    right: { opacity: 1, x: -offset },
    none: { opacity: 1 },
  };

  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 'some', margin: '80px 0px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(width === 'full' ? 'w-full' : 'w-fit', className)}
    >
      {children}
    </motion.div>
  );
}
