import { Hero } from '@/components/home/Hero';
import { StatsStrip } from '@/components/home/StatsStrip';
import { LiveSites } from '@/components/home/LiveSites';
import { WhatIDo } from '@/components/home/WhatIDo';
import { Footer } from '@/components/shared/Footer';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero with 3D Canvas, headline, rotating titles & CTA buttons */}
      <Hero />

      {/* 2. Stats Strip with count-up animation */}
      <StatsStrip />

      {/* 3. Live Sites Row of 4 colourful TiltCards */}
      <LiveSites />

      {/* 4. Two 'What I do' Cards (Full-Stack & Cloud-Native) */}
      <WhatIDo />

      {/* Footer */}
      <Footer />
    </div>
  );
}
