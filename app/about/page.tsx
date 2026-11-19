import { Metadata } from 'next';
import Image from 'next/image';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { GlassCard } from '@/components/shared/GlassCard';
import { CheckCircle2, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About Dhanush A | Software Engineer',
  description: 'Background, education, engineering values, and profile of Dhanush A.',
};

export default function AboutPage() {
  return (
    <ThemedPlaceholder
      title="About Me"
      theme="about"
      accent="#C2410C"
      accent2="#0F766E"
      description="Software engineer passionate about scalable full-stack applications, developer experience, and cloud infrastructure."
    >
      <GlassCard className="p-8 max-w-2xl mx-auto text-left border-[var(--accent)]/30 my-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[var(--accent)] shrink-0 shadow-lg">
            <Image
              src="/profile.jpg"
              alt="Dhanush A"
              fill
              className="object-cover"
              sizes="112px"
            />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--accent)] font-semibold">
              Software Engineer
            </span>
            <h2 className="font-heading font-bold text-2xl text-[var(--text)]">
              Dhanush A
            </h2>
            <p className="text-sm text-[var(--text)]/80 mt-1">
              Currently engineering web and mobile platforms at PrimePro.ai. Dedicated to shipping robust, clean, and accessible user experiences backed by reliable cloud architectures.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[var(--card-border)] text-sm text-[var(--text)]/85">
          <div className="flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[var(--text)]">Educational Foundation</div>
              <p className="text-xs text-[var(--text)]/70">
                Bachelor of Computer Applications (BCA) with focus on Computer Science, Web Technologies, Database Systems, and Cloud Services.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-[var(--text)]">Engineering Philosophy</div>
              <p className="text-xs text-[var(--text)]/70">
                Write readable code, automate repetitive deployments, build for accessibility, and prioritize real customer value over unnecessary complexity.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </ThemedPlaceholder>
  );
}
