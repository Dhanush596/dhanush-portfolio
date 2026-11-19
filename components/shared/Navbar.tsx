'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Briefcase,
  Compass,
  Terminal,
  Layers,
  Award,
  User,
  Mail,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Work', href: '/work', icon: Briefcase },
  { name: 'Journey', href: '/journey', icon: Compass },
  { name: 'DevOps Lab', href: '/devops-lab', icon: Terminal },
  { name: 'Stack', href: '/stack', icon: Layers },
  { name: 'Credentials', href: '/credentials', icon: Award },
  { name: 'About', href: '/about', icon: User },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Resume', href: '/resume', icon: FileText },
];

export function Navbar() {
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <header className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <nav
        aria-label="Main Navigation"
        className={cn(
          'flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full border shadow-2xl backdrop-blur-2xl transition-all duration-300',
          'bg-black/80 border-white/[0.12] shadow-black/80'
        )}
      >
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={item.href}
                aria-label={item.name}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex items-center justify-center p-2.5 sm:p-3 rounded-full transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
                  isActive
                    ? 'text-[var(--bg)] font-bold'
                    : 'text-[var(--text)]/70 hover:text-[var(--text)]'
                )}
              >
                {/* Active Background Pill using current page accent */}
                {isActive && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : 'activeNavIndicator'}
                    className="absolute inset-0 rounded-full shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent)',
                      boxShadow: '0 0 15px var(--accent)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}

                {/* Subtle Hover Ring */}
                {!isActive && hoveredIndex === index && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : 'hoverNavIndicator'}
                    className="absolute inset-0 rounded-full bg-[var(--text)]/5 border border-[var(--accent)]/30"
                    transition={{ duration: 0.2 }}
                  />
                )}

                <span className="relative z-10">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
              </Link>

              {/* Tooltip on Hover for Desktop */}
              <AnimatePresence>
                {!prefersReducedMotion && hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: -4, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      'pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider whitespace-nowrap border shadow-md backdrop-blur-md',
                      'bg-[var(--bg)] text-[var(--accent)] border-[var(--accent)]/30'
                    )}
                  >
                    {item.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>
    </header>
  );
}
