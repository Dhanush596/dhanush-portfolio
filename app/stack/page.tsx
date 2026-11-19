import { Metadata } from 'next';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { SKILL_CATEGORIES } from '@/lib/data';
import { GlassCard } from '@/components/shared/GlassCard';

export const metadata: Metadata = {
  title: 'Technology Stack | Dhanush A',
  description: 'Full-stack languages, libraries, databases, and DevOps tools mastered by Dhanush A.',
};

export default function StackPage() {
  return (
    <ThemedPlaceholder
      title="Technology Stack"
      theme="stack"
      accent="#E879F9"
      accent2="#6366F1"
      description="The languages, frameworks, cloud tooling, and architectural primitives I leverage to build production applications."
    >
      <div className="space-y-6 text-left max-w-2xl mx-auto my-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <GlassCard key={idx} className="p-6 border-[var(--accent)]/20 hover:border-[var(--accent)]/50">
            <h3 className="font-heading font-bold text-lg text-[var(--accent)] mb-1">
              {cat.category}
            </h3>
            <p className="text-xs text-[var(--text)]/70 mb-4">{cat.description}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--text)]/5 text-xs font-mono flex items-center gap-2"
                >
                  <span className="text-[var(--text)] font-medium">{skill.name}</span>
                  <span className="text-[10px] text-[var(--accent)] px-1.5 py-0.2 rounded bg-[var(--accent)]/10">
                    {skill.tag || skill.level}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </ThemedPlaceholder>
  );
}
