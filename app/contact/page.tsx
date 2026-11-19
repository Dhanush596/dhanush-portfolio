'use client';

import React, { useState } from 'react';
import { ThemedPlaceholder } from '@/components/shared/ThemedPlaceholder';
import { GlassCard } from '@/components/shared/GlassCard';
import { MagneticButton } from '@/components/shared/MagneticButton';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message');
      }

      setStatus('success');
      setFeedback(data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <ThemedPlaceholder
      title="Let's Build Together"
      theme="contact"
      accent="#F43F5E"
      accent2="#FDBA74"
      description="Have an opportunity, project idea, or cloud engineering challenge? I'd love to hear from you."
    >
      <GlassCard className="p-8 max-w-xl mx-auto text-left border-[var(--accent)]/30 my-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text)]/80 mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Alex Smith"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text)]/80 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text)]/80 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Project Collaboration / Opportunity"
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[var(--text)]/80 mb-1.5">
              Message *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project, timeline, or requirements..."
              className="w-full px-4 py-2.5 rounded-xl border border-[var(--card-border)] bg-[var(--text)]/5 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
            />
          </div>

          {status === 'success' && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-between">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--accent)] text-[#0C0508] font-semibold text-sm hover:brightness-110 disabled:opacity-50 transition-all shadow-md shadow-[var(--accent)]/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-xs text-[var(--text)]/70 hover:text-[var(--accent)] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Email</span>
            </a>
          </div>
        </form>
      </GlassCard>
    </ThemedPlaceholder>
  );
}
