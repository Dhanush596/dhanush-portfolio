'use client';

import React from 'react';
import { SkillSpiral } from './SkillSpiral';
import { CertPile } from './CertPile';

export function ToolkitAct() {
  return (
    <section id="toolkit" className="relative w-full py-20 transition-colors duration-700">
      {/* 4.1 Technical Repertoire / 3D Skill Spiral */}
      <SkillSpiral />

      {/* 4.2 Trophy Pile / Verified Records & Transcripts */}
      <CertPile />
    </section>
  );
}
