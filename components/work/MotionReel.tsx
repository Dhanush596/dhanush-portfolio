'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film } from 'lucide-react';
import { MEDIA_ASSETS } from '@/lib/assets';
import { BorderBeam } from '@/components/shared/BorderBeam';

const REEL_ITEMS: {
  assetKey: string;
  caption: string;
  title: string;
  oneLiner: string;
  gradient: string;
}[] = [
  {
    assetKey: 'clip-terraform-apply',
    caption: 'Clip 01 · IaC',
    title: 'Terraform Apply on AWS',
    oneLiner: 'Idempotent cloud infrastructure provisioning across EC2, VPC, and Security Groups.',
    gradient: 'from-amber-500/15 via-purple-600/10 to-transparent',
  },
  {
    assetKey: 'clip-argocd-sync',
    caption: 'Clip 02 · GitOps',
    title: 'ArgoCD Self-Healing Workloads',
    oneLiner: 'Automated drift reconciliation syncing declarative Kubernetes manifests in real-time.',
    gradient: 'from-emerald-500/15 via-teal-600/10 to-transparent',
  },
  {
    assetKey: 'clip-github-trivy',
    caption: 'Clip 03 · DevSecOps',
    title: 'GitHub Actions & Trivy Gate',
    oneLiner: 'CI/CD pipeline scanning dependencies for 0 CVE vulnerabilities before container packaging.',
    gradient: 'from-blue-500/15 via-indigo-600/10 to-transparent',
  },
  {
    assetKey: 'clip-marichin-booking',
    caption: 'Clip 04 · Live Product',
    title: 'Marichin Homestay Reservation',
    oneLiner: 'Real-time room booking workflow and resort accommodation showcase in Coorg.',
    gradient: 'from-emerald-500/15 via-green-600/10 to-transparent',
  },
  {
    assetKey: 'clip-kalyanothsava',
    caption: 'Clip 05 · Community',
    title: 'Karnataka Kalyanothsava Portal',
    oneLiner: 'Regional matrimony matchmaking and cultural wedding event registration platform.',
    gradient: 'from-orange-500/15 via-amber-600/10 to-transparent',
  },
  {
    assetKey: 'clip-alankar-catalog',
    caption: 'Clip 06 · E-Commerce',
    title: 'Alankar Fashion Digital Store',
    oneLiner: 'Ethnic sarees, designer apparel, and eyewear product catalogs with instant cart logic.',
    gradient: 'from-pink-500/15 via-rose-600/10 to-transparent',
  },
  {
    assetKey: 'clip-bangalore-vibes',
    caption: 'Clip 07 · City Directory',
    title: 'Bangalore Vibes City Media',
    oneLiner: 'Interactive city media portal spotlighting events, local dining, and nightlife.',
    gradient: 'from-purple-500/15 via-violet-600/10 to-transparent',
  },
  {
    assetKey: 'clip-shader-hero',
    caption: 'Clip 08 · 3D WebGL',
    title: 'Interactive Wave Deformation',
    oneLiner: 'Three.js GLSL vertex displacement responding to velocity gestures and cursor physics.',
    gradient: 'from-cyan-500/15 via-blue-600/10 to-transparent',
  },
];

export function MotionReel() {
  const [activeClip, setActiveClip] = useState<(typeof REEL_ITEMS)[0] | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent-2)] uppercase tracking-widest block mb-2 font-semibold">
            [2.4 MOTION REEL]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Things that{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent-2)] to-[var(--pop)] bg-clip-text text-transparent font-normal italic lowercase">
              wiggle
            </span>
            .
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-[var(--muted)]">
          <Film className="w-4 h-4 text-[var(--accent-2)]" />
          <span>Interactive Horizontal Reel · 8 Clips</span>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory">
        {REEL_ITEMS.map((item) => {
          const asset = MEDIA_ASSETS[item.assetKey];
          const isPortrait = asset?.aspectRatio === '9:16';

          return (
            <div
              key={item.assetKey}
              data-cursor="Play"
              onClick={() => setActiveClip(item)}
              className={`shrink-0 snap-start cursor-pointer group rounded-3xl relative overflow-hidden p-[1.5px] shadow-lg hover:shadow-2xl transition-all duration-300 animate-float-${(REEL_ITEMS.indexOf(item) % 3) + 1} ${
                isPortrait ? 'w-[280px] sm:w-[300px]' : 'w-[320px] sm:w-[380px]'
              }`}
            >
              <BorderBeam duration={5.5 + (REEL_ITEMS.indexOf(item) % 3)} borderWidth={1.5} colorFrom="var(--accent-2)" colorTo="var(--accent)" />
              <div className="relative z-10 w-full h-full rounded-3xl bg-[var(--surface)] p-6 border border-[var(--line)] flex flex-col justify-between">
              {/* Top Bar with Timecode & Caption */}
              <div className="flex items-center justify-between text-xs font-mono text-[var(--muted)] mb-4">
                <span className="text-[var(--accent-2)] font-semibold">{item.caption}</span>
                <span>{asset?.duration || '00:08'}</span>
              </div>

              {/* Video Player / Placeholder Media Area */}
              {/* TODO(MEDIA): replace with recording -> {asset?.path} (6-10s loop, 1080p max, H.264, <3MB, muted) */}
              <div
                className={`relative rounded-2xl overflow-hidden border border-dashed border-[var(--line)] bg-gradient-to-br from-[var(--act-tint)] to-[var(--surface)] flex items-center justify-center my-4 group-hover:scale-[1.02] transition-transform duration-300 ${
                  isPortrait ? 'h-[280px]' : 'h-[180px]'
                }`}
              >
                {asset?.ready ? (
                  <video
                    src={asset.path}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[var(--muted)] text-center p-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                      <Play className="w-4 h-4 ml-0.5 text-[var(--accent)] group-hover:text-white" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--muted)] font-semibold">
                      [RECORDING PLACEHOLDER]
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Description */}
              <div className="pt-2">
                <h4 className="font-heading font-black text-lg text-[var(--ink)] tracking-tight group-hover:text-[var(--accent)] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-[var(--muted)] font-sans mt-1 leading-relaxed line-clamp-2">
                  {item.oneLiner}
                </p>
              </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Video Player Modal */}
      <AnimatePresence>
        {activeClip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveClip(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 z-10 shadow-2xl text-[var(--ink)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[var(--line)] mb-6">
                <div>
                  <span className="text-xs font-mono text-[var(--accent-2)] font-semibold">
                    {activeClip.caption}
                  </span>
                  <h3 className="font-heading font-black text-2xl text-[var(--ink)]">
                    {activeClip.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveClip(null)}
                  className="p-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--ink)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-dashed border-[var(--line)] bg-gradient-to-br from-[var(--act-tint)] to-[var(--surface)] flex flex-col items-center justify-center mb-6 text-[var(--muted)] text-center p-6">
                <Play className="w-8 h-8 text-[var(--accent)] mb-2" />
                <span className="text-xs font-mono font-bold text-[var(--ink)]">
                  Simulated Video Player Preview
                </span>
                <span className="text-[11px] font-mono text-[var(--muted)] mt-1">
                  TODO(MEDIA): replace with recording -&gt; /public/clips/{activeClip.assetKey}.mp4
                </span>
              </div>

              <p className="text-sm text-[var(--muted)] font-sans leading-relaxed">
                {activeClip.oneLiner}
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
