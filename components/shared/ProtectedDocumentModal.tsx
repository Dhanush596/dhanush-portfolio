'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, ZoomIn, ZoomOut, RotateCcw, Lock } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/data';

interface ProtectedDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer?: string;
  category?: string;
  fileUrl: string;
}

export function ProtectedDocumentModal({
  isOpen,
  onClose,
  title,
  issuer,
  category = 'Verified Document',
  fileUrl,
}: ProtectedDocumentModalProps) {
  const [mounted, setMounted] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);
  const [securityTriggered, setSecurityTriggered] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset zoom & shield cleanly each time modal opens
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1.0);
      setIsWindowBlurred(false);
      setSecurityTriggered(false);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Defeat Snipping Tools WITHOUT locking up when user clicks/scrolls inside our PDF iframe
  useEffect(() => {
    if (!isOpen) return;

    const handleWindowBlur = () => {
      // Allow time for activeElement to update cleanly when focusing inside our own iframe
      setTimeout(() => {
        const active = document.activeElement;
        if (active && (active === iframeRef.current || active.tagName === 'IFRAME')) {
          return;
        }
        if (!document.hasFocus()) {
          setIsWindowBlurred(true);
        }
      }, 60);
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowBlurred(true);
      } else {
        setIsWindowBlurred(false);
      }
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isOpen]);

  // Keyboard Close (Esc) & Screenshot/Save/Print interception
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        setSecurityTriggered(true);
        setTimeout(() => setSecurityTriggered(false), 3000);
        return;
      }

      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'u' || e.key === 'U')
      ) {
        e.preventDefault();
        setSecurityTriggered(true);
        setTimeout(() => setSecurityTriggered(false), 3000);
        return;
      }

      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'C' || e.key === 'c' || e.key === 'J' || e.key === 'j'))
      ) {
        e.preventDefault();
        setSecurityTriggered(true);
        setTimeout(() => setSecurityTriggered(false), 3000);
        return;
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [handleKeyDown]);

  if (!mounted) return null;

  const viewerUrl = fileUrl ? `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH` : '';

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="protected-doc-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
          onContextMenu={(e) => e.preventDefault()}
          className="fixed inset-0 z-[200] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 select-none pointer-events-auto"
        >
          {/* Main Viewer Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[92vh] sm:h-[90vh] rounded-2xl border border-white/15 bg-slate-900 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Top Protected Header (Pinned above zoom stage) */}
            <div className="relative z-40 shrink-0 flex items-center justify-between gap-3 py-3 px-3.5 sm:px-5 border-b border-white/15 bg-slate-900/95 backdrop-blur-md">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
                      {title}
                    </span>
                    <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                      VIEW ONLY · NO DOWNLOAD
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-mono text-slate-300 truncate">
                    {issuer ? `${issuer} · ` : ''}
                    {category}
                  </p>
                </div>
              </div>

              {/* Controls: Zoom In, Zoom Out, Reset + High-Contrast Close Button */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="hidden md:flex items-center gap-1 bg-white/10 rounded-xl p-1 border border-white/15">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
                    className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-white px-1 min-w-[46px] text-center tabular-nums">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
                    className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1.0)}
                    className="p-1.5 rounded-lg hover:bg-white/15 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title="Reset Zoom"
                    aria-label="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Clear, Always-Clickable Close Pill */}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white border border-rose-400/50 font-mono text-xs font-bold shadow-lg shadow-rose-600/25 transition-all active:scale-95 cursor-pointer"
                  title="Close Viewer (Esc)"
                  aria-label="Close Viewer"
                >
                  <span>Close</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Document Stage with Scrollable Zoom Viewport */}
            <div className="relative flex-1 min-h-0 overflow-auto bg-slate-950/80 p-2 sm:p-4">
              {/* Security Trigger Toast */}
              <AnimatePresence>
                {securityTriggered && (
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    className="sticky top-2 left-1/2 -translate-x-1/2 w-fit mx-auto z-50 px-4 py-2 rounded-xl bg-rose-600 text-white font-mono text-xs flex items-center gap-2 shadow-2xl border border-rose-400"
                  >
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Screen capture and downloads are disabled for this verified document.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Window Blur Screen Capture Shield (With direct Resume & Close actions!) */}
              {isWindowBlurred && (
                <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 text-white">
                  <ShieldAlert className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
                  <h4 className="font-heading font-bold text-lg text-white mb-1">
                    Security Shield Active
                  </h4>
                  <p className="text-xs font-mono text-slate-300 max-w-sm mb-5">
                    Document is obscured while the window is out of focus to protect sensitive academic markscards.
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsWindowBlurred(false)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                    >
                      Resume Viewing
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close Document
                    </button>
                  </div>
                </div>
              )}

              {/* Overlaid Tiled Security Watermark Grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 z-30 pointer-events-none select-none opacity-20 overflow-hidden flex flex-wrap gap-12 p-8"
              >
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="transform -rotate-25 text-[11px] font-mono font-bold text-white tracking-widest uppercase shrink-0"
                  >
                    VIEW ONLY · DHANUSH A · VERIFIED DOCUMENT · NO CAPTURE
                  </div>
                ))}
              </div>

              {/* Scroll-Contained Zoomable Document Frame */}
              <div
                style={{
                  width: `${zoomLevel * 100}%`,
                  height: `${zoomLevel * 100}%`,
                  minWidth: '100%',
                  minHeight: '100%',
                }}
                className="transition-all duration-150 flex items-center justify-center"
              >
                <iframe
                  ref={iframeRef}
                  src={viewerUrl}
                  title={title}
                  className="w-full h-full rounded-xl bg-white border-0 shadow-2xl"
                  style={{ pointerEvents: isWindowBlurred ? 'none' : 'auto' }}
                />
              </div>
            </div>

            {/* Bottom Action & Security Footer */}
            <div className="relative z-40 shrink-0 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-300 px-3.5 sm:px-5 py-2.5 border-t border-white/15 bg-slate-900/95 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Read-Only Verification Mode · Click outside or press Esc to close</span>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <span className="hidden lg:inline text-slate-400">
                  Verification contact: {PERSONAL_INFO.email}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-rose-600 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
