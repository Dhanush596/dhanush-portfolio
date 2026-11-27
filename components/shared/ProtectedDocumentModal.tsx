'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, ZoomIn, ZoomOut, RotateCcw, Lock } from 'lucide-react';

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
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);
  const [securityTriggered, setSecurityTriggered] = useState(false);

  // 1. Defeat Snipping Tools (Win+Shift+S / screen capture tools shift focus away from browser window)
  useEffect(() => {
    if (!isOpen) return;

    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
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

  // 2. Intercept Screen Capture & Print Keyboard Shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      // Close on Escape
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Detect PrintScreen
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        setSecurityTriggered(true);
        setTimeout(() => setSecurityTriggered(false), 3000);
        return;
      }

      // Block Ctrl+S / Cmd+S (Save), Ctrl+P / Cmd+P (Print), Ctrl+U (View Source)
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'S' || e.key === 'p' || e.key === 'P' || e.key === 'u' || e.key === 'U')
      ) {
        e.preventDefault();
        setSecurityTriggered(true);
        setTimeout(() => setSecurityTriggered(false), 3000);
        return;
      }

      // Block DevTools shortcuts (F12, Ctrl+Shift+I)
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
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen) return null;

  // Clean URL hiding PDF download toolbar
  const viewerUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onContextMenu={(e) => e.preventDefault()}
        className="fixed inset-0 z-[150] bg-black/85 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 select-none"
      >
        {/* Top Protected Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/15 px-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight">
                  {title}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  VIEW ONLY · NO DOWNLOAD
                </span>
              </div>
              <p className="text-xs font-mono text-white/60">
                {issuer} · {category}
              </p>
            </div>
          </div>

          {/* Controls: Zoom In, Zoom Out, Reset, Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 bg-white/10 rounded-lg p-1 border border-white/15">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
                className="p-1.5 rounded hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-white/80 px-1 min-w-[45px] text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                className="p-1.5 rounded hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1.0)}
                className="p-1.5 rounded hover:bg-white/15 text-white/80 hover:text-white transition-colors"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-rose-500 text-white border border-white/15 hover:border-rose-500 transition-colors"
              title="Close Viewer (Esc)"
              aria-label="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Center Document Stage with Multi-Layer Screenshot & Download Protection */}
        <div className="relative flex-1 my-3 rounded-2xl overflow-hidden bg-slate-900 border border-white/15 flex items-center justify-center">
          {/* Security Trigger Toast */}
          <AnimatePresence>
            {securityTriggered && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-4 z-50 px-4 py-2 rounded-xl bg-rose-600 text-white font-mono text-xs flex items-center gap-2 shadow-2xl border border-rose-400"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Screen capture and downloads are disabled for this verified document.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Window Blur Screen Capture Shield (Protects against Snipping Tool, Win+Shift+S, Mac Cmd+Shift+4) */}
          {isWindowBlurred && (
            <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 text-white">
              <ShieldAlert className="w-12 h-12 text-amber-400 mb-3 animate-pulse" />
              <h4 className="font-heading font-bold text-lg mb-1">
                Security Shield Active
              </h4>
              <p className="text-xs font-mono text-white/60 max-w-sm">
                Document is obscured while the window is out of primary focus to protect sensitive academic markscards. Click inside this window to resume viewing.
              </p>
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

          {/* Document Content (Zoomable, No toolbar, No download) */}
          <div
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="w-full h-full transition-transform duration-150 flex items-center justify-center p-2"
          >
            <iframe
              src={viewerUrl}
              title={title}
              className="w-full h-full rounded-xl bg-white border-0 shadow-2xl"
              style={{ pointerEvents: isWindowBlurred ? 'none' : 'auto' }}
            />
          </div>
        </div>

        {/* Security Footer Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/60 px-2 pt-2 border-t border-white/10 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Digital Document Verification Engine · Read-Only Mode</span>
          </div>
          <span className="text-white/40">
            For employment verification inquiries, contact: dhanush596@gmail.com
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
