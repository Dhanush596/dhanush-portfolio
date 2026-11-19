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
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
      const y = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
      setPosition({ x, y });
    },
    [prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const variantStyles = {
    primary:
      'bg-[var(--accent)] text-[#05060A] font-semibold hover:shadow-lg hover:shadow-[var(--accent)]/30 hover:brightness-110',
    secondary:
      'bg-transparent border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10',
    glass:
      'bg-[var(--card-bg)] text-[var(--text)] border border-[var(--card-border)] backdrop-blur-md hover:border-[var(--accent)] hover:text-[var(--accent)]',
    outline:
      'bg-transparent border border-white/20 text-white/90 hover:border-white/50 hover:bg-white/5',
  };

  const content = (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: prefersReducedMotion
          ? 'none'
          : `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all duration-300',
        'focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );

  if (href) {
    const isExternal = href.startsWith('http') || href.endsWith('.pdf');
    if (isExternal) {
      return (
        <a
          href={href}
          target={target || (href.endsWith('.pdf') ? '_blank' : undefined)}
          rel={rel || 'noopener noreferrer'}
          download={download}
          className="inline-block"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
}
