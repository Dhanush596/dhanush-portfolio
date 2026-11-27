import { Suspense } from 'react';
import { HeroAct } from '@/components/home/HeroAct';
import { HomeHubAct } from '@/components/home/HomeHubAct';
import { ContactAct } from '@/components/contact/ContactAct';

export default function ConsolidatedHomePage() {
  return (
    <Suspense fallback={<div className="w-full min-h-screen bg-[var(--act-bg)]" />}>
      <div className="w-full relative">
        {/* Act 01: Hero Intro + Live Status + Tech Marquee + Proof Strip (No live project mentions) */}
        <HeroAct />

        {/* Home Hub: Concise Overview Cards with "View All" links to dedicated pages */}
        {/* 1. Projects (Starts with BCA & MCA), 2. Experience & Internships, 3. Education, 4. Protected Credentials, 5. About */}
        <HomeHubAct />

        {/* Act 03: Contact & Mega Footer */}
        <ContactAct />
      </div>
    </Suspense>
  );
}
