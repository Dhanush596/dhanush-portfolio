'use client';

import React, { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, GraduationCap, Briefcase, Globe } from 'lucide-react';
import { Project, categoryLabels, statusLabels } from '@/lib/projects';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { ProjectGradientArt } from './ProjectGradientArt';
import { getCardTheme, getMultiCardStyle } from '@/lib/cardThemes';

interface CrazyProjectCardProps {
  project: Project;
  index: number;
}

export function CrazyProjectCard({ project, index }: CrazyProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rafId = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const cardTheme = getCardTheme(index);
  const cardMultiStyle = getMultiCardStyle(index);

  // 3D Parallax Mouse Physics
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReducedMotion || !cardRef.current) return;
      if (rafId.current !== null) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxTilt = 4;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;

        if (glareRef.current) {
          glareRef.current.style.opacity = '0.35';
          glareRef.current.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(${cardTheme.c2Rgb}, 0.25), transparent 65%)`;
        }
      });
    },
    [prefersReducedMotion, cardTheme.c2Rgb]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const isAcademic =
    project.category === 'mca' ||
    project.category === 'bca' ||
    project.secondaryCategory === 'bca' ||
    project.secondaryCategory === 'mca';
  const isInternship = project.category === 'internship';
  const isClient = project.isProductionClient || project.status === 'live';
  const hasLiveLink = Boolean(project.links?.live);

  const statusDisplay = project.isProductionClient
    ? 'CLIENT SITE'
    : project.status && statusLabels[project.status]
    ? statusLabels[project.status].label
    : 'PROJECT';

  return (
    <motion.div
      layout
      initial={{ opacity: 1, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 24,
      }}
      className="h-full flex"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, box-shadow 0.3s ease',
          ...cardMultiStyle,
        }}
        className="group relative w-full rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors duration-300 select-none multi-card"
      >
        {/* Multi-Color Top Spectrum Accent Bar */}
        <div
          aria-hidden="true"
          className="h-1 w-full shrink-0"
          style={{
            background: `linear-gradient(90deg, ${cardTheme.c1Hex}, ${cardTheme.c2Hex}, ${cardTheme.c3Hex})`,
          }}
        />

        {/* Orbiting 3-Color Laser Border Beam */}
        <BorderBeam
          duration={isHovered ? 3.5 : 7}
          borderWidth={1.6}
          colorFrom={cardTheme.c1Hex}
          colorTo={cardTheme.c2Hex}
          colorPop={cardTheme.c3Hex}
        />

        {/* Specular Radial Glare Surface */}
        {!prefersReducedMotion && (
          <div
            ref={glareRef}
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200"
            style={{ opacity: 0 }}
          />
        )}

        {/* Card Content with 3D Parallax Depths */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-5 sm:p-6">
          <div>
            {/* Top Row: Category Badge + Index / Status */}
            <div
              className="flex items-center justify-between gap-2 mb-4"
              style={{ transform: 'translateZ(38px)' }}
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                {/* Primary Category Pill */}
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-sm ${
                    isAcademic
                      ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                      : isInternship
                      ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                      : isClient
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-[var(--act-tint)] text-[var(--muted)] border-[var(--line)]'
                  }`}
                >
                  {isAcademic && <GraduationCap className="w-3 h-3" />}
                  {isInternship && <Briefcase className="w-3 h-3" />}
                  {isClient && <Globe className="w-3 h-3" />}
                  <span>{categoryLabels[project.category] || project.category}</span>
                </span>

                {/* Academic Secondary Badge if applicable */}
                {project.secondaryCategory && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {categoryLabels[project.secondaryCategory]}
                  </span>
                )}
              </div>

              {/* Status Badge */}
              <span className="text-[10px] font-mono text-[var(--muted)] font-semibold flex items-center gap-1 shrink-0">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === 'live'
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-[var(--accent)]'
                  }`}
                />
                {statusDisplay}
              </span>
            </div>

            {/* Thumbnail / Visual Art Layer with 3D Z-Depth */}
            <div
              className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-5 border border-[var(--line)] bg-[var(--surface-2)] shrink-0"
              style={{ transform: 'translateZ(26px)' }}
            >
              <Link href={`/work/${project.slug}`} className="block w-full h-full">
                {project.cover ? (
                  <img
                    src={project.cover}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                ) : (
                  <ProjectGradientArt
                    title={project.title}
                    accent={project.accent}
                    accent2={project.accent2}
                    className="w-full h-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-30 group-hover:opacity-10 transition-opacity" />
              </Link>

              {/* Highlight Pill on Hover */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-md backdrop-blur-md bg-black/60 border border-white/20 text-white text-[9px] font-mono font-medium flex items-center gap-1 pointer-events-none">
                  <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                  <span>{project.highlights[0]}</span>
                </div>
              )}
            </div>

            {/* Title & Tagline with 3D Z-Depth */}
            <div style={{ transform: 'translateZ(36px)' }}>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2 tracking-tight">
                <Link href={`/work/${project.slug}`}>{project.title}</Link>
              </h3>

              <p className="text-xs sm:text-sm text-[var(--muted)] font-sans leading-relaxed line-clamp-2 mb-4">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Bottom Area: Tech Chips & Actions with 3D Z-Depth */}
          <div style={{ transform: 'translateZ(46px)' }}>
            {/* Tech Stack Chips */}
            {project.stack && project.stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4 pt-3 border-t border-[var(--line)]">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--surface)]/85 text-[var(--ink)] border border-[var(--line)] backdrop-blur-xs transition-transform hover:scale-105"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-[var(--muted)] self-center">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--muted)] hover:text-[var(--ink)] transition-colors group/link"
              >
                <span>Case study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 text-[var(--accent)]" />
              </Link>

              <div className="flex items-center gap-1.5">
                {project.isProductionClient ? (
                  <>
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 transition-all shadow-sm active:scale-95"
                      >
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={project.links.demo || `/work/${project.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                    >
                      <span>Demo</span>
                    </a>
                  </>
                ) : (
                  hasLiveLink && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                    >
                      <span>Interactive Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
