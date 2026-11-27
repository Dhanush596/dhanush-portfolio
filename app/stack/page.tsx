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
          <GlassCard key={idx} colorIndex={idx * 3} className="p-6">
            <h3 className="font-heading font-bold text-lg text-[var(--ink)] mb-1">
              {cat.category}
            </h3>
            <p className="text-xs text-[var(--muted)] mb-4">{cat.description}</p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)]/80 text-xs font-mono flex items-center gap-2"
                >
                  <span className="text-[var(--ink)] font-medium">{skill.name}</span>
                  <span className="text-[10px] text-[var(--accent)] px-1.5 py-0.2 rounded bg-[var(--accent)]/10 font-semibold">
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
