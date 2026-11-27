'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ROW_1 = [
  'Terraform',
  'Kubernetes (K3s)',
  'ArgoCD GitOps',
  'Docker Multi-Stage',
  'AWS EC2 & IAM',
  'GitHub Actions CI/CD',
  'Trivy Security Scanning',
  'Linux CLI',
  'Ansible',
];

const ROW_2 = [
  'React 19',
  'Next.js 16 (App Router)',
  'TypeScript',
  'Tailwind CSS v4',
  'Three.js / WebGL',
  'Node.js & Express',
  'MongoDB Atlas',
  'MySQL Relational',
  'Python & Scikit-learn',
];

export function HeroMarquee() {
  return (
    <div className="w-full overflow-hidden py-8 space-y-3 pointer-events-auto select-none border-y border-[var(--line)] bg-[var(--surface-2)]/50 backdrop-blur-sm">
      {/* Track 1: Leftward with --accent dots */}
      <div className="flex w-max gap-4 hover:[animation-play-state:paused]">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex gap-4 shrink-0"
        >
          {[...ROW_1, ...ROW_1].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)] shadow-sm hover:border-[var(--accent)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Track 2: Rightward with --accent-2 dots */}
      <div className="flex w-max gap-4 hover:[animation-play-state:paused]">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
          className="flex gap-4 shrink-0"
        >
          {[...ROW_2, ...ROW_2].map((tech, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)] shadow-sm hover:border-[var(--accent-2)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-2)]" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
