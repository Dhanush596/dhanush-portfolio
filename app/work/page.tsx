import { Suspense } from 'react';
import { Metadata } from 'next';
import { WorkList } from '@/components/work/WorkList';
import { Footer } from '@/components/shared/Footer';

export const metadata: Metadata = {
  title: 'Work & Projects | Dhanush A',
  description:
    'Commercial client websites, engineering internships, and full-stack software architectures built by Dhanush A.',
};

export default function WorkPage() {
  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-[var(--accent)] border-t-transparent animate-spin" />
          </div>
        }
      >
        <WorkList />
      </Suspense>
      <Footer />
    </div>
  );
}
