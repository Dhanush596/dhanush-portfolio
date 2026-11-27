'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Lock } from 'lucide-react';
import { CERTIFICATIONS, INTERNSHIP_CREDENTIALS, ACADEMIC_CREDENTIALS } from '@/lib/data';
import { BorderBeam } from '@/components/shared/BorderBeam';
import { ProtectedDocumentModal } from '@/components/shared/ProtectedDocumentModal';

type CertTab = 'all' | 'certs' | 'internships' | 'academic';

export function CertPile() {
  const [activeTab, setActiveTab] = useState<CertTab>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [selectedDoc, setSelectedDoc] = useState<{
    isOpen: boolean;
    title: string;
    issuer: string;
    fileUrl: string;
    category: string;
  }>({
    isOpen: false,
    title: '',
    issuer: '',
    fileUrl: '',
    category: '',
  });

  const openProtectedDoc = (title: string, issuer: string, fileUrl: string, category: string) => {
    setSelectedDoc({
      isOpen: true,
      title,
      issuer,
      fileUrl,
      category,
    });
  };

  const closeProtectedDoc = () => {
    setSelectedDoc((prev) => ({ ...prev, isOpen: false }));
  };

  // Flattened items list
  const allItems = React.useMemo(() => {
    const list: {
      id: string;
      title: string;
      issuer: string;
      file: string;
      category: 'Certification' | 'Internship' | 'Academic';
      score?: string;
      accent: string;
    }[] = [];

    // 1. Technical Certifications
    CERTIFICATIONS.forEach((c) => {
      list.push({
        id: c.id,
        title: c.title,
        issuer: c.issuer,
        file: c.file,
        category: 'Certification',
        accent: 'var(--accent-2)',
      });
    });

    // 2. Verified Internships
    INTERNSHIP_CREDENTIALS.forEach((i) => {
      list.push({
        id: i.id,
        title: `${i.role} (${i.company})`,
        issuer: i.score ? `Score: ${i.score}` : 'Verified Industry Internship',
        file: i.certificateFile,
        category: 'Internship',
        score: i.score,
        accent: 'var(--ok)',
      });
    });

    // 3. Academic Markscards
    ACADEMIC_CREDENTIALS.forEach((p) => {
      p.documents.forEach((d) => {
        list.push({
          id: `${p.id}-${d.label}`,
          title: `${p.title} · ${d.label}`,
          issuer: p.institution || p.boardOrUniversity || 'Board Transcripts',
          file: d.file,
          category: 'Academic',
          accent: 'var(--accent)',
        });
      });
    });

    return list;
  }, []);

  const filteredItems = React.useMemo(() => {
    if (activeTab === 'certs') return allItems.filter((i) => i.category === 'Certification');
    if (activeTab === 'internships') return allItems.filter((i) => i.category === 'Internship');
    if (activeTab === 'academic') return allItems.filter((i) => i.category === 'Academic');
    return allItems;
  }, [activeTab, allItems]);

  // Tape strip rotating colors: accent / accent-2 / pop / ok
  const tapeColors = ['var(--accent)', 'var(--accent-2)', 'var(--pop)', 'var(--ok)'];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 border-b border-[var(--line)] pb-6">
        <div>
          <span className="text-[11px] font-mono text-[var(--accent-2)] uppercase tracking-widest block mb-2 font-semibold">
            [4.2 TROPHY PILE & VERIFIED RECORDS]
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] uppercase tracking-tight">
            Credentials &{' '}
            <span className="font-serif-accent bg-gradient-to-r from-[var(--accent-2)] to-[var(--pop)] bg-clip-text text-transparent font-normal italic lowercase">
              records
            </span>
            .
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[var(--muted)] max-w-md">
          Official academic markscards (MCA, BCA, PUC, 10th), verified internship credentials, and industry technical certifications. (Protected View-Only).
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
            activeTab === 'all'
              ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
              : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)] shadow-sm'
          }`}
        >
          All Records ({allItems.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certs')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
            activeTab === 'certs'
              ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
              : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)] shadow-sm'
          }`}
        >
          Certifications ({CERTIFICATIONS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('internships')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
            activeTab === 'internships'
              ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
              : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)] shadow-sm'
          }`}
        >
          Internships ({INTERNSHIP_CREDENTIALS.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('academic')}
          className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-200 border ${
            activeTab === 'academic'
              ? 'bg-[var(--accent)] text-white font-bold border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
              : 'bg-[var(--surface)] text-[var(--muted)] border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--ink)] shadow-sm'
          }`}
        >
          Academic Transcripts ({allItems.filter((i) => i.category === 'Academic').length})
        </button>
      </div>

      {/* Trophy Pile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item, idx) => {
          const tapeColor = tapeColors[idx % tapeColors.length];

          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => openProtectedDoc(item.title, item.issuer, item.file, `${item.category} Document`)}
              data-cursor="Open"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', damping: 20, stiffness: 280 }}
              className="relative p-6 pt-7 rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-md hover:border-[var(--accent)] hover:shadow-2xl flex flex-col justify-between group transition-all select-none overflow-hidden text-left cursor-pointer"
            >
              {/* Animated Light Moving Around the Card */}
              <BorderBeam
                duration={6 + (idx % 3) * 1.5}
                borderWidth={1.5}
                colorFrom={item.accent}
                colorTo="var(--accent)"
                colorPop="var(--pop)"
              />

              {/* Coloured Top Tape Strip rotating through accent / accent-2 / pop / ok */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2.5 rounded-b-md opacity-85 shadow-sm z-20"
                style={{ backgroundColor: tapeColor }}
              />

              <div className="relative z-10 w-full h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-[var(--line)] bg-[var(--act-tint)] text-[var(--ink)] font-semibold">
                      {item.category}
                    </span>

                    <div className="flex items-center gap-1 text-[var(--muted)] group-hover:text-[var(--accent)]">
                      <Lock className="w-3.5 h-3.5" />
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Certificate Title with SVG Highlighter Underline Marker */}
                  <div className="relative inline-block mb-3">
                    <h3 className="font-heading font-black text-lg text-[var(--ink)] tracking-tight leading-snug relative z-10">
                      {item.title}
                    </h3>
                    {/* Highlighter / Underline SVG Marker (35% opacity in --pop) */}
                    <svg
                      className="absolute -bottom-1 left-0 w-full h-2 text-[var(--pop)] opacity-35 pointer-events-none -z-0"
                      viewBox="0 0 100 8"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 4 Q 50 8 100 3"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>

                  <p className="text-xs font-mono text-[var(--muted)] mt-1">
                    {item.issuer}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line)] mt-4 flex items-center justify-between text-[11px] font-mono text-[var(--muted)]">
                  <span>Protected Record</span>
                  <span className="text-[var(--accent)] font-semibold group-hover:underline">
                    View Only (No Download)
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Protected Document Viewer Modal */}
      <ProtectedDocumentModal
        isOpen={selectedDoc.isOpen}
        onClose={closeProtectedDoc}
        title={selectedDoc.title}
        issuer={selectedDoc.issuer}
        fileUrl={selectedDoc.fileUrl}
        category={selectedDoc.category}
      />
    </div>
  );
}
