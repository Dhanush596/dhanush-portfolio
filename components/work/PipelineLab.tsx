'use client';

import React, { useState, useEffect } from 'react';
import { GitCommit, ShieldCheck, Box, RefreshCw, Cpu, Cloud, Terminal } from 'lucide-react';
import { BorderBeam } from '@/components/shared/BorderBeam';

const PIPELINE_STAGES = [
  {
    id: 'stage-1',
    label: '01. Git Commit',
    title: 'Version Control & Trigger',
    icon: GitCommit,
    color: '#2563EB',
    log: 'git commit -m "feat(api): optimize connection pooling" -> webhook dispatched',
    description: 'Developer pushes code to branch; triggers automated GitHub Actions CI/CD workflows.',
  },
  {
    id: 'stage-2',
    label: '02. Trivy Scan',
    title: 'Container Security & SAST',
    icon: ShieldCheck,
    color: '#10B981',
    log: 'trivy fs --severity CRITICAL,HIGH . -> 0 vulnerabilities detected [PASS]',
    description: 'Scans filesystem and dependencies before containerization to prevent CVE deployments.',
  },
  {
    id: 'stage-3',
    label: '03. Docker Build',
    title: 'Multi-Stage Image Compilation',
    icon: Box,
    color: '#3B82F6',
    log: 'docker build --target production -t dhanush/app:v2.4 . -> image size 48MB [OK]',
    description: 'Multi-stage Alpine builds produce lightweight, stripped-down runtime containers.',
  },
  {
    id: 'stage-4',
    label: '04. ArgoCD GitOps',
    title: 'Declarative GitOps Sync',
    icon: RefreshCw,
    color: '#7C3AED',
    log: 'argocd app sync production-cluster -> status Synced & Healthy [0 drift]',
    description: 'ArgoCD reconciles live Kubernetes cluster state with declarative Git manifests.',
  },
  {
    id: 'stage-5',
    label: '05. K3s / K8s Cluster',
    title: 'Self-Healing Orchestration',
    icon: Cpu,
    color: '#F43F5E',
    log: 'kubectl rollout status deployment/web-gateway -> 3/3 pods running with HPA',
    description: 'Zero-downtime rolling update across container replicas on AWS EC2 K3s infrastructure.',
  },
  {
    id: 'stage-6',
    label: '06. Terraform IaC',
    title: 'Infrastructure as Code',
    icon: Cloud,
    color: '#F59E0B',
    log: 'terraform apply -auto-approve -> AWS VPC, Security Groups & EC2 synchronized',
    description: 'Declarative HCL state management provisioning cloud primitives idempotently.',
  },
];

export function PipelineLab() {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % PIPELINE_STAGES.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--ok)] uppercase tracking-widest block mb-2 font-semibold">
            [2.3 DEVOPS & CLOUD LAB]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Automated delivery{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--ok)] to-[var(--accent)] bg-clip-text text-transparent font-normal italic lowercase">
              pipeline
            </span>
            .
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Live simulated CI/CD execution pipeline: Commit → Security Gate → Containerization → GitOps Reconcile → Orchestration.
        </p>
      </div>

      {/* Interactive Pipeline Stepper */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {PIPELINE_STAGES.map((stg, idx) => {
          const isActive = idx === activeStage;
          const Icon = stg.icon;
          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                isActive
                  ? 'bg-[var(--surface)] border-[var(--accent)] shadow-lg shadow-[var(--accent)]/15 scale-105'
                  : 'bg-[var(--surface)] border-[var(--line)] hover:border-[var(--accent)]/40 shadow-sm opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[var(--muted)]">
                  0{idx + 1}
                </span>
                <div
                  className="p-1.5 rounded-lg"
                  style={{
                    backgroundColor: `${stg.color}15`,
                    color: stg.color,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs sm:text-sm text-[var(--ink)] leading-snug">
                  {stg.title}
                </h4>
                <span className="text-[10px] font-mono text-[var(--muted)] block mt-1">
                  {isActive ? '● ACTIVE' : '○ Standby'}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Terminal Log Console (Contrast Island: Kept Dark Navy #0B1220 with light text) */}
      <div className="relative rounded-2xl border border-slate-800 bg-[#0B1220] text-slate-100 shadow-2xl overflow-hidden animate-float-1">
        <BorderBeam duration={7} borderWidth={1.5} colorFrom="#10B981" colorTo="#2563EB" colorPop="#22D3EE" />

        <div className="relative z-10 p-6 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#2563EB]" />
            <span className="text-slate-300 font-bold">
              telemetry@pipeline-runner:~ (Step {activeStage + 1} of 6)
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>RUNNING</span>
          </div>
        </div>

          <div className="space-y-2">
            <p className="text-slate-400">
              <span className="text-[#38BDF8]">&gt;</span>{' '}
              {PIPELINE_STAGES[activeStage].description}
            </p>
            <p className="text-emerald-400 font-bold bg-black/40 p-2.5 rounded-lg border border-slate-800/80">
              $ {PIPELINE_STAGES[activeStage].log}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
