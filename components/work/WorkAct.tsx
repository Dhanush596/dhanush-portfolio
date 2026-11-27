'use client';

import React from 'react';
import { LiveDeck } from './LiveDeck';
import { WorkStack } from './WorkStack';
import { WorkIndex } from './WorkIndex';
import { PipelineLab } from './PipelineLab';
import { MotionReel } from './MotionReel';

export function WorkAct() {
  return (
    <section id="work" className="relative w-full py-20 transition-colors duration-700">
      {/* 2.1 Live in Production: Fanned Deck */}
      <LiveDeck />

      {/* 2.2 Selected Work: Sticky Stacked Cards */}
      <WorkStack />

      {/* Expandable Index of All 21 Projects & Case Studies */}
      <WorkIndex />

      {/* 2.3 DevOps & Cloud Lab: Interactive Pipeline */}
      <PipelineLab />

      {/* 2.4 Motion Reel: Horizontal Scrub Track */}
      <MotionReel />
    </section>
  );
}
