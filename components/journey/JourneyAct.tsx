'use client';

import React from 'react';
import { Timeline } from './Timeline';
import { Polaroids } from './Polaroids';

export function JourneyAct() {
  return (
    <section id="journey" className="relative w-full py-20 transition-colors duration-700">
      {/* Career Milestones & Official Degree Markscards */}
      <Timeline />

      {/* "The human behind the code" Profile & Draggable Stickers */}
      <Polaroids />
    </section>
  );
}
