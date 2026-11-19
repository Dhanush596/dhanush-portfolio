import { Metadata } from 'next';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { CERTIFICATIONS } from '@/lib/data';
import { GlassCard } from '@/components/shared/GlassCard';
import { Award, FileText, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credentials & Certifications | Dhanush A',
  description: 'Verified certificates and technical credentials earned by Dhanush A in Cloud, AI, and Full-Stack Engineering.',
};

export default function CredentialsPage() {
  return (
    <ThemedPlaceholder
      title="Credentials & Certifications"
      theme="credentials"
      accent="#FBBF24"
      accent2="#F59E0B"
      description="Formal certifications in Cloud Computing, AI & Machine Learning, Python, and Software Development."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto my-6">
        {CERTIFICATIONS.map((cert) => (
          <GlassCard key={cert.id} className="p-5 border-[var(--accent)]/20 hover:border-[var(--accent)]/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--accent)]">
                  {cert.category}
                </span>
                <Award className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <h3 className="font-heading font-bold text-base text-[var(--text)]">
                {cert.title}
              </h3>
              <p className="text-xs text-[var(--text)]/70 mt-1">{cert.issuer}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--card-border)]">
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Certificate PDF</span>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </a>
            </div>
          </GlassCard>
        ))}
      </div>
    </ThemedPlaceholder>
  );
}
