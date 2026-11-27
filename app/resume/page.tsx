import { Metadata } from 'next';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { GlassCard } from '@/components/shared/GlassCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume & Curriculum Vitae | Dhanush A',
  description: 'Download or view the official resume of Dhanush A, Software Engineer.',
};

export default function ResumePage() {
  return (
    <ThemedPlaceholder
      title="Resume / Curriculum Vitae"
      theme="credentials"
      accent="#FBBF24"
      accent2="#F59E0B"
      description="Official resume detailing technical competencies, commercial achievements, and engineering career history."
    >
      <GlassCard colorIndex={3} className="p-8 max-w-xl mx-auto text-center my-6">
        <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8" />
        </div>

        <h3 className="font-heading font-bold text-xl text-[var(--ink)] mb-2">
          Dhanush A - Resume.pdf
        </h3>
        <p className="text-xs text-[var(--muted)] mb-6 max-w-md mx-auto">
          Updated with production highlights at PrimePro.ai (12 websites built), DevOps internships, and 8+ verified certifications.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <MagneticButton
            href={PERSONAL_INFO.resumePdf}
            variant="primary"
            download="Dhanush_A_Resume.pdf"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </MagneticButton>

          <MagneticButton
            href={PERSONAL_INFO.resumePdf}
            variant="glass"
            target="_blank"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in New Tab</span>
          </MagneticButton>
        </div>
      </GlassCard>
    </ThemedPlaceholder>
  );
}
