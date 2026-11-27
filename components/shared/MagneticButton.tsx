'use client';

import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  target?: string;
  rel?: string;
  download?: boolean | string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  className,
  variant = 'primary',
  target,
  rel,
  download,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !buttonRef.current) return;
      if (rafId.current !== null) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (clientX - (rect.left + rect.width / 2)) * 0.25;
        const y = (clientY - (rect.top + rect.height / 2)) * 0.25;
        buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  }, []);

  const variantStyles = {
    primary:
      'bg-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-600/25 hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors',
    secondary:
      'bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)] hover:shadow-md transition-all',
    glass:
      'bg-[var(--surface)]/80 text-[var(--ink)] border border-[var(--line)] backdrop-blur-md hover:border-[var(--accent)] hover:text-[var(--accent)]',
    outline:
      'bg-transparent border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)] hover:bg-[var(--surface-2)]',
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.15s ease-out',
      }}
      className={cn(
        'relative inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-heading font-medium tracking-wide cursor-pointer select-none overflow-hidden group',
        variantStyles[variant],
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal || download) {
      return (
        <a
          href={href}
          target={target || (isExternal ? '_blank' : undefined)}
          rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
          download={download}
          className="inline-block"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} prefetch={true} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}
