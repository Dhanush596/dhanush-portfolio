import { Metadata } from 'next';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { GlassCard } from '@/components/shared/GlassCard';
import { Terminal, Cpu, Cloud, GitBranch, Layers, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DevOps & Cloud-Native Lab | Dhanush A',
  description: 'GitOps, Kubernetes clusters, Docker containerization, and Terraform infrastructure as code.',
};

export default function DevOpsLabPage() {
  const labModules = [
    {
      title: 'Containerization & Docker',
      icon: Layers,
      items: ['Multi-stage Dockerfiles', 'Alpine optimization', 'Docker Compose networks'],
    },
    {
      title: 'Kubernetes Orchestration',
      icon: Cpu,
      items: ['Deployments, Pods & Services', 'ConfigMaps & Secrets', 'Ingress controllers'],
    },
    {
      title: 'Infrastructure as Code',
      icon: Cloud,
      items: ['Declarative Terraform HCL', 'State management', 'Reusable cloud modules'],
    },
    {
      title: 'GitOps & CI/CD Pipelines',
      icon: GitBranch,
      items: ['GitHub Actions Workflows', 'ArgoCD automated sync', 'Continuous validation'],
    },
  ];

  return (
    <ThemedPlaceholder
      title="DevOps & Cloud Lab"
      theme="devops"
      accent="#4ADE80"
      accent2="#3B82F6"
      description="Interactive playground and documentation of containerized services, automated CI/CD pipelines, and GitOps deployments."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto my-6">
        {labModules.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <GlassCard key={idx} className="p-5 border-[var(--accent)]/20 hover:border-[var(--accent)]/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-[var(--text)]">
                  {mod.title}
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-[var(--text)]/75">
                {mod.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          );
        })}
      </div>
    </ThemedPlaceholder>
  );
}
