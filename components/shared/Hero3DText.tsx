'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

export interface Hero3DSegment {
  text: string;
  accent?: boolean;
  preserveCase?: boolean;
  breakAfter?: boolean;
}

interface Hero3DTextProps {
  /** Simple string OR mixed segments where accent=true renders italic gradient serif */
  segments: (string | Hero3DSegment)[];
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  align?: 'center' | 'left';
  trigger?: 'mount' | 'inView';
  depthColor?: string;
  depthColor2?: string;
  gradientClass?: string;
  enableBurstGlow?: boolean;
}

/**
 * True multi-layered 3D extruded headline with crazy arrival spring choreography,
 * continuous subtle 3D spatial drift, pointer-reactive perspective tilt,
 * and a sweeping chromatic light flare on load.
 */
export function Hero3DText({
  segments,
  as: Tag = 'h1',
  className = '',
  align = 'center',
  trigger = 'mount',
  depthColor = 'rgba(37, 99, 235, 0.35)',
  depthColor2 = 'rgba(124, 58, 237, 0.25)',
  gradientClass = 'from-[var(--accent)] via-[var(--pop)] to-[var(--accent-2)]',
  enableBurstGlow = true,
}: Hero3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.7 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Expand normalized words cleanly while preserving accent flags
  const words: Hero3DSegment[] = [];
  segments.forEach((seg) => {
    if (typeof seg === 'string') {
      seg
        .split(' ')
        .filter(Boolean)
        .forEach((w) => words.push({ text: w, accent: false }));
    } else if (seg.text) {
      const splitWords = seg.text.split(' ').filter(Boolean);
      splitWords.forEach((w, wIdx) =>
        words.push({
          text: w,
          accent: seg.accent,
          preserveCase: seg.preserveCase,
          breakAfter: seg.breakAfter && wIdx === splitWords.length - 1,
        })
      );
    }
  });

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {words.map((w, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && ' '}
            {w.accent ? (
              <span
                className={cn(
                  'font-serif-accent bg-gradient-to-r bg-clip-text text-transparent font-normal italic tracking-normal',
                  !w.preserveCase && 'lowercase',
                  gradientClass
                )}
              >
                {w.text}
              </span>
            ) : (
              w.text
            )}
          </React.Fragment>
        ))}
      </Tag>
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block w-full"
      style={{ perspective: '1200px' }}
    >
      {/* Arrival Chromatic Shockwave Aura behind the 3D text */}
      {enableBurstGlow && (
        <motion.div
          aria-hidden="true"
          initial={trigger === 'mount' ? { opacity: 0.75, scale: 0.65 } : undefined}
          whileInView={trigger === 'inView' ? { opacity: 0.35, scale: 1 } : undefined}
          animate={trigger === 'mount' ? { opacity: [0.65, 0.25, 0.18], scale: [0.75, 1.15, 1] } : undefined}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-full blur-3xl -z-10 opacity-20',
            hovered ? 'opacity-35 scale-105' : ''
          )}
          style={{
            background:
              'radial-gradient(ellipse at center, var(--accent) 0%, var(--accent-2) 45%, var(--pop) 75%, transparent 100%)',
          }}
        />
      )}

      {/* Pointer-reactive 3D stage + continuous kinetic float */}
      <motion.div
        style={{
          rotateX: hovered ? rotateX : undefined,
          rotateY: hovered ? rotateY : undefined,
          transformStyle: 'preserve-3d',
        }}
        animate={
          hovered
            ? { z: 12 }
            : {
                rotateX: [2.5, -2.5, 2.5],
                rotateY: [-3.5, 3.5, -3.5],
              }
        }
        transition={
          hovered
            ? { type: 'spring', stiffness: 200, damping: 20 }
            : { duration: 7, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <Tag
          className={cn(
            'relative flex flex-wrap items-baseline gap-x-[0.26em] gap-y-1',
            align === 'center' ? 'justify-center' : 'justify-start',
            className
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {words.map((word, wIdx) => (
            <React.Fragment key={`${word.text}-${wIdx}`}>
              <motion.span
                initial={{
                  opacity: 0,
                  y: 44,
                  z: -140,
                  rotateX: -72,
                  rotateY: wIdx % 2 === 0 ? -18 : 18,
                  scale: 0.82,
                  filter: 'blur(8px)',
                }}
                {...(trigger === 'inView'
                  ? {
                      whileInView: {
                        opacity: 1,
                        y: 0,
                        z: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      },
                      viewport: { once: true, amount: 'some' as const },
                    }
                  : {
                      animate: {
                        opacity: 1,
                        y: 0,
                        z: 0,
                        rotateX: 0,
                        rotateY: 0,
                        scale: 1,
                        filter: 'blur(0px)',
                      },
                    })}
                transition={{
                  type: 'spring',
                  stiffness: 165,
                  damping: 14,
                  mass: 0.85,
                  delay: 0.065 * wIdx,
                }}
                whileHover={{
                  z: 24,
                  scale: 1.06,
                  rotateX: -8,
                  transition: { type: 'spring', stiffness: 320, damping: 16 },
                }}
                className="relative inline-block will-change-transform select-none cursor-default"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Extruded Back Depth Plane (-6px along Z) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 select-none',
                    word.accent && 'font-serif-accent italic tracking-normal font-normal',
                    word.accent && !word.preserveCase && 'lowercase'
                  )}
                  style={{
                    transform: 'translate3d(2.5px, 3.5px, -8px)',
                    color: depthColor2,
                  }}
                >
                  {word.text}
                </span>

                {/* 3D Extruded Mid Depth Plane (-3px along Z) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 select-none',
                    word.accent && 'font-serif-accent italic tracking-normal font-normal',
                    word.accent && !word.preserveCase && 'lowercase'
                  )}
                  style={{
                    transform: 'translate3d(1.25px, 1.75px, -4px)',
                    color: depthColor,
                  }}
                >
                  {word.text}
                </span>

                {/* Crisp Front Face (+6px along Z) */}
                {word.accent ? (
                  <span
                    className={cn(
                      'relative inline-block font-serif-accent bg-gradient-to-r bg-clip-text text-transparent font-normal italic tracking-normal pr-[0.06em]',
                      !word.preserveCase && 'lowercase',
                      gradientClass
                    )}
                    style={{
                      transform: 'translateZ(6px)',
                      filter: 'drop-shadow(0 6px 14px rgba(37, 99, 235, 0.18))',
                    }}
                  >
                    {word.text}
                  </span>
                ) : (
                  <span
                    className="relative inline-block"
                    style={{
                      transform: 'translateZ(6px)',
                      textShadow: '0 8px 20px rgba(15, 23, 42, 0.16)',
                    }}
                  >
                    {word.text}
                  </span>
                )}

                {/* Kinetic Holographic Flare Sweep across the word on entrance */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: '-130%', opacity: 0 }}
                  animate={{ x: '220%', opacity: [0, 0.9, 0] }}
                  transition={{
                    duration: 0.9,
                    delay: 0.12 + 0.065 * wIdx,
                    ease: 'easeOut',
                  }}
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[2px] -skew-x-12 mix-blend-overlay"
                />
              </motion.span>
              {word.breakAfter && <span className="basis-full h-0" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </Tag>
      </motion.div>
    </div>
  );
}
