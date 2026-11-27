import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ExternalLink,
  ArrowLeft,
  Calendar,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Code2,
  Layers,
  Globe,
} from 'lucide-react';
import {
  projects,
  categoryLabels,
  statusLabels,
  backendLabels,
} from '@/lib/projects';
import { GlassCard } from '@/components/shared/GlassCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Reveal } from '@/components/shared/Reveal';
import { GithubIcon } from '@/components/shared/Icons';
import { DeviceCoverFrame } from '@/components/work/DeviceCoverFrame';
import { MegaFooter } from '@/components/contact/MegaFooter';
import { Hero3DText } from '@/components/shared/Hero3DText';
import { getMultiCardStyle } from '@/lib/cardThemes';

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | Dhanush A',
    };
  }

  return {
    title: `${project.title} | Case Study | Dhanush A`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | Dhanush A`,
      description: project.realVsSimulated || project.tagline,
      url: `https://dhanush.dev/work/${project.slug}`,
      siteName: 'Dhanush A Portfolio',
      type: 'article',
    },
  };
}

async function ProjectDetailContent({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  const hasLiveLink = Boolean(project.links?.live);
  const hasRepoLink = Boolean(project.links?.repo);
  const hasActionButtons = hasLiveLink || hasRepoLink;
  const hasStack = project.stack && project.stack.length > 0;
  const hasFeatures = project.features && project.features.length > 0;
  const hasChallenges = project.challenges && project.challenges.length > 0;

  return (
    <div
      style={
        {
          '--project-accent': project.accent,
          '--project-accent-2': project.accent2,
          '--card-border': `${project.accent}30`,
          '--card-bg': `${project.accent}0a`,
          '--glass-glare': `${project.accent}20`,
        } as React.CSSProperties
      }
      className="w-full min-h-screen transition-colors duration-500 bg-[var(--act-bg)] text-[var(--ink)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Back Link */}
        <Reveal delay={0.05}>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all projects</span>
          </Link>
        </Reveal>

        {/* 1. Hero Section */}
        <div className="mb-12">
          {/* Badges Row */}
          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {/* Status Badge - rendered only if project.status is defined */}
              {project.status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border bg-[var(--text)]/5 text-[var(--text)]">
                  {project.status === 'live' && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  )}
                  {project.status === 'realtime' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  )}
                  {project.status === 'practice' && (
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  )}
                  <span>{statusLabels[project.status]?.label}</span>
                </span>
              )}

              {/* Category Badge */}
              <span className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)]/80">
                {categoryLabels[project.category]}
              </span>

              {project.secondaryCategory && (
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--accent)]">
                  {categoryLabels[project.secondaryCategory]}
                </span>
              )}

              {/* Backend Badge */}
              {project.backend && (
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--accent)] font-medium">
                  {backendLabels[project.backend]}
                </span>
              )}
            </div>
          </Reveal>

          {/* 3D Animated Title */}
          <div className="mb-4">
            <Hero3DText
              as="h1"
              align="left"
              segments={[{ text: project.title }]}
              className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-[var(--ink)]"
            />
          </div>

          {/* Tagline */}
          <Reveal delay={0.2}>
            <p className="text-lg sm:text-xl text-[var(--text)]/80 max-w-3xl leading-relaxed mb-8">
              {project.tagline}
            </p>
          </Reveal>

          {/* Action Buttons */}
          {hasActionButtons && (
            <Reveal delay={0.25}>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  {project.isProductionClient ? (
                    <>
                      {project.links.live && (
                        <MagneticButton
                          href={project.links.live}
                          variant="primary"
                          target="_blank"
                        >
                          <Globe className="w-4 h-4" />
                          <span>Live Website</span>
                        </MagneticButton>
                      )}
                      <MagneticButton
                        href={project.links.demo || project.links.live}
                        variant="glass"
                        target="_blank"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Demo Showcase</span>
                      </MagneticButton>
                    </>
                  ) : (
                    hasLiveLink && (
                      <MagneticButton
                        href={project.links.live}
                        variant="primary"
                        target="_blank"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Interactive Demo</span>
                      </MagneticButton>
                    )
                  )}

                  {hasRepoLink && (
                    <MagneticButton
                      href={project.links.repo}
                      variant="glass"
                      target="_blank"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>View Source Code</span>
                    </MagneticButton>
                  )}
                </div>

                {/* Portfolio Demonstration Notice */}
                {project.isProductionClient ? (
                  <div className="p-3.5 sm:p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono leading-relaxed flex items-start gap-3 shadow-sm max-w-2xl">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-500 mt-0.5" />
                    <div>
                      <span className="font-bold uppercase tracking-wider block mb-1 text-amber-600 dark:text-amber-400">
                        Portfolio Demonstration Notice
                      </span>
                      <span>
                        This commercial platform is showcased strictly for demonstration to exhibit full-stack engineering, UI/UX, and architecture work. Client production domains or third-party servers may experience maintenance, hosting changes, or service pauses (not all 5 client websites are guaranteed to be actively running in live production at all times).
                      </span>
                    </div>
                  </div>
                ) : (
                  hasLiveLink && (
                    <p className="text-[11px] font-mono text-[var(--text)]/60 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Hosted cloud environment running an interactive showcase for portfolio evaluation.</span>
                    </p>
                  )
                )}
              </div>
            </Reveal>
          )}
        </div>

        {/* 2. At-a-glance Row */}
        <Reveal delay={0.3} className="mb-12">
          <GlassCard colorIndex={0} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text)]/50 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-[var(--accent)]" /> Role
                </span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {project.role}
                </span>
              </div>

              {project.period && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text)]/50 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" /> Timeline
                  </span>
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {project.period}
                  </span>
                </div>
              )}

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text)]/50 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[var(--accent)]" /> Category
                </span>
                <span className="text-sm font-semibold text-[var(--text)]">
                  {categoryLabels[project.category]}
                </span>
              </div>

              {project.status && (
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text)]/50 mb-1 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" /> Status
                  </span>
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {statusLabels[project.status]?.label}
                  </span>
                </div>
              )}
            </div>

            {/* Stack Chips - hidden if stack is empty */}
            {hasStack && (
              <div className="mt-6 pt-6 border-t border-[var(--card-border)]">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text)]/60 block mb-3">
                  Technologies & Architecture
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-[var(--text)]/5 text-[var(--text)] border border-[var(--card-border)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </Reveal>

        {/* 3. Device Cover Area with Parallax (Generates gradient art with initials for real-time) */}
        <Reveal delay={0.35} className="mb-14">
          <DeviceCoverFrame
            title={project.title}
            cover={project.cover}
            accent={project.accent}
            accent2={project.accent2}
          />
        </Reveal>

        {/* 4. Real vs Simulated Callout (Only if realVsSimulated exists) */}
        {project.realVsSimulated && (
          <Reveal delay={0.4} className="mb-14">
            <GlassCard colorIndex={2} className="p-6 sm:p-8 border-l-4 border-l-[var(--accent)] shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-[var(--accent)]/15 text-[var(--accent)] shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[var(--text)] mb-2">
                    Architecture Note: Real vs. Simulated
                  </h3>
                  <p className="text-sm text-[var(--text)]/85 leading-relaxed font-mono">
                    {project.realVsSimulated}
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        )}

        {/* 4b. Verified Engineering Impact & Results */}
        {project.impact && (
          <Reveal delay={0.42} className="mb-14">
            <GlassCard colorIndex={1} className="p-6 sm:p-8 border-l-4 border-l-emerald-500 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[var(--text)] mb-2">
                    Engineering Impact & Results
                  </h3>
                  <p className="text-sm text-[var(--text)]/85 leading-relaxed font-mono">
                    {project.impact}
                  </p>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        )}

        {/* 5. Key Features Grid - hidden if features are empty */}
        {hasFeatures && (
          <div className="mb-14">
            <Reveal delay={0.45}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)] mb-6">
                Key Features & Capabilities
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, fIdx) => (
                <Reveal key={fIdx} delay={0.45 + fIdx * 0.05}>
                  <GlassCard colorIndex={fIdx + 3} className="p-5 h-full flex items-start gap-3 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span className="text-sm text-[var(--text)]/85 leading-relaxed">
                      {feature}
                    </span>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 6. Technical Challenges & Solutions Pairs - hidden if challenges are empty */}
        {hasChallenges && (
          <div className="mb-16">
            <Reveal delay={0.5}>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
                Engineering Challenges & Solutions
              </h2>
              <p className="text-sm text-[var(--text)]/70 mb-8">
                Obstacles encountered during development and the architectural solutions applied.
              </p>
            </Reveal>

            <div className="space-y-6">
              {project.challenges!.map((chal, cIdx) => (
                <Reveal key={cIdx} delay={0.5 + cIdx * 0.07}>
                  <GlassCard colorIndex={cIdx + 6} className="p-6 sm:p-7 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-[var(--card-border)]">
                      {/* Problem Column */}
                      <div className="pr-0 md:pr-4">
                        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>The Challenge</span>
                        </div>
                        <p className="text-sm text-[var(--text)]/85 leading-relaxed">
                          {chal.problem}
                        </p>
                      </div>

                      {/* Solution Column */}
                      <div className="pt-4 md:pt-0 md:pl-6">
                        <div className="flex items-center gap-2 text-[var(--accent)] font-mono text-xs uppercase tracking-wider mb-2 font-semibold">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Applied Solution</span>
                        </div>
                        <p className="text-sm text-[var(--text)]/90 leading-relaxed">
                          {chal.solution}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* 7. Previous / Next Project Navigation */}
        <Reveal delay={0.6}>
          <div className="pt-10 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/work/${prevProject.slug}`}
              style={getMultiCardStyle(4)}
              className="w-full sm:w-auto p-4 rounded-xl border multi-card transition-all text-left group"
            >
              <span className="text-[10px] font-mono text-[var(--muted)] block mb-1">
                ← Previous Project
              </span>
              <span className="text-sm font-heading font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {prevProject.title}
              </span>
            </Link>

            <Link
              href="/work"
              className="px-4 py-2 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
            >
              All Projects
            </Link>

            <Link
              href={`/work/${nextProject.slug}`}
              style={getMultiCardStyle(9)}
              className="w-full sm:w-auto p-4 rounded-xl border multi-card transition-all text-right group"
            >
              <span className="text-[10px] font-mono text-[var(--muted)] block mb-1">
                Next Project →
              </span>
              <span className="text-sm font-heading font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                {nextProject.title}
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      <MegaFooter />
    </div>
  );
}

export default function ProjectDetailPage(props: ProjectDetailPageProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen flex items-center justify-center bg-[var(--act-bg)]">
          <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
        </div>
      }
    >
      <ProjectDetailContent {...props} />
    </Suspense>
  );
}
