import { Metadata } from 'next';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { EXPERIENCES } from '@/lib/data';
import { GlassCard } from '@/components/shared/GlassCard';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Journey & Career | Dhanush A',
  description: 'Career progression, full-stack experience, and DevOps engineering timeline of Dhanush A.',
};

export default function JourneyPage() {
  return (
    <ThemedPlaceholder
      title="Engineering Journey"
      theme="journey"
      accent="#34D399"
      accent2="#14B8A6"
      description="Timeline of real-world software engineering, internships, and production milestones."
    >
      <div className="space-y-6 text-left max-w-2xl mx-auto my-6">
        {EXPERIENCES.map((exp, idx) => (
          <GlassCard key={idx} className="p-6 border-[var(--accent)]/20 hover:border-[var(--accent)]/50">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-medium text-[var(--accent)] px-2.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                {exp.period}
              </span>
              <span className="text-xs font-mono text-[var(--text)]/60 uppercase">
                {exp.type}
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-[var(--text)]">
              {exp.role}
            </h3>
            <p className="text-sm font-medium text-[var(--accent)] mb-3">
              {exp.company}
            </p>

            <p className="text-sm text-[var(--text)]/80 mb-4 leading-relaxed">
              {exp.description}
            </p>

            <ul className="space-y-1.5 mb-4 text-xs text-[var(--text)]/75">
              {exp.achievements.map((ach, aIdx) => (
                <li key={aIdx} className="flex items-start gap-2">
                  <span className="text-[var(--accent)] mt-0.5">•</span>
                  <span>{ach}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--card-border)]">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[11px] font-mono rounded bg-[var(--text)]/5 text-[var(--text)]/70 border border-[var(--card-border)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </ThemedPlaceholder>
  );
}
