'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send, Download, FileText, ArrowUpRight, Loader2 } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';

export function ContactBlock() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

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
      setFeedback(data.message || 'Message sent successfully! I will reply shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setStatus('error');
      setFeedback(errorMessage);
    }
  };

  const emailLetters = PERSONAL_INFO.email.split('');

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-mono text-[var(--accent)] uppercase tracking-widest block mb-3 font-semibold">
          [ACT 05 · DIRECT TRANSMISSION]
        </span>
        <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black text-[var(--ink)] uppercase tracking-tight leading-[1.05]">
          Let&apos;s build what&apos;s{' '}
          <span className="font-serif-accent bg-gradient-to-r from-[var(--accent)] to-[var(--pop)] bg-clip-text text-transparent font-normal italic lowercase">
            next
          </span>
          .
        </h2>
        <p className="text-sm sm:text-base text-[var(--muted)] font-mono mt-4 leading-relaxed">
          Have an engineering opportunity, full-stack challenge, or cloud infrastructure project?
        </p>
      </div>

      {/* Huge Interactive Email Wave Link with Copy Button */}
      <div className="p-8 sm:p-12 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl mb-14 text-center flex flex-col items-center">
        <span className="text-[11px] font-mono text-[var(--muted)] uppercase tracking-widest mb-4">
          Click email to launch mail client or copy directly:
        </span>

        {/* Letter-by-letter wave link */}
        <a
          href={`mailto:${PERSONAL_INFO.email}?subject=Collaboration%20Inquiry`}
          className="inline-flex flex-wrap justify-center font-heading font-black text-2xl sm:text-4xl md:text-5xl text-[var(--ink)] hover:text-[var(--accent)] transition-colors group mb-6"
        >
          {emailLetters.map((char, cIdx) => (
            <motion.span
              key={cIdx}
              whileHover={{ y: -6, color: 'var(--accent)' }}
              transition={{ type: 'spring', damping: 10, stiffness: 400 }}
              className="inline-block transition-colors"
            >
              {char}
            </motion.span>
          ))}
        </a>

        {/* 1-Click Copy Email Pill */}
        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] text-xs font-mono hover:border-[var(--accent)] transition-colors shadow-sm"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--ok)]" />
              <span className="text-[var(--ok)] font-bold">Email Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--muted)]" />
              <span>Copy Email Address</span>
            </>
          )}
        </button>
      </div>

      {/* Two Column Grid: Contact Form (Left) & Quick Links (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 relative p-6 sm:p-8 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl overflow-hidden animate-float-1">
          <BorderBeam duration={7} borderWidth={1.5} colorFrom="var(--accent)" colorTo="var(--pop)" />

          <div className="relative z-10">
            <div className="mb-6 pb-4 border-b border-[var(--line)]">
            <h3 className="font-heading font-bold text-xl text-[var(--ink)]">
              Send a Transmission
            </h3>
            <p className="text-xs font-mono text-[var(--muted)] mt-1">
              Dispatches direct message via verified API webhook
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)] mb-1.5 font-semibold">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Developer"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)] mb-1.5 font-semibold">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@company.com"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)] mb-1.5 font-semibold">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Job Opportunity"
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm font-sans transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[var(--ink)] mb-1.5 font-semibold">
                Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hi Dhanush, we're looking for someone to lead our next cloud architecture..."
                className="w-full px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent text-sm font-sans resize-none transition-all"
              />
            </div>

            {feedback && (
              <div
                className={`p-3 rounded-xl text-xs font-mono ${
                  status === 'success'
                    ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20'
                }`}
              >
                {feedback}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 rounded-xl bg-[var(--accent)] text-white font-heading font-black text-xs uppercase tracking-wider hover:bg-[var(--accent-2)] transition-colors duration-200 shadow-md shadow-[var(--accent)]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
          </div>
        </div>

        {/* Direct Cards & Documents (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Resume Download Card */}
          <div className="relative p-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl overflow-hidden animate-float-2">
            <BorderBeam duration={6} borderWidth={1.5} colorFrom="var(--warn)" colorTo="var(--accent)" colorPop="var(--pop)" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono text-[var(--warn)] font-bold uppercase tracking-widest block mb-2">
                [CURRICULUM VITAE]
              </span>
              <h4 className="font-heading font-bold text-lg text-[var(--ink)] mb-2">
                Official Resume Document
              </h4>
              <p className="text-xs text-[var(--muted)] font-sans leading-relaxed mb-6">
                Includes full project histories, verifiable metrics, academic marks, and DevOps certifications.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-[var(--ink)] text-xs font-mono hover:border-[var(--accent)] transition-colors shadow-sm"
                >
                  <FileText className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>View PDF</span>
                  <ArrowUpRight className="w-3 h-3 text-[var(--muted)]" />
                </a>

                <a
                  href={PERSONAL_INFO.resumePdf}
                  download="Dhanush_A_Resume.pdf"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--accent)] text-white text-xs font-mono hover:bg-[var(--accent-2)] transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Contact Info Card */}
          <div className="relative p-6 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl space-y-3 font-mono text-xs overflow-hidden animate-float-3">
            <BorderBeam duration={6.8} borderWidth={1.5} colorFrom="var(--ok)" colorTo="var(--accent)" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--muted)]">Location</span>
                <span className="text-[var(--ink)] font-semibold">Bangalore, Karnataka, IN</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
                <span className="text-[var(--muted)]">Status</span>
                <span className="text-[var(--ok)] font-semibold">● Open to Opportunities</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Timezone</span>
                <span className="text-[var(--ink)] font-semibold">IST (UTC +5:30)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
