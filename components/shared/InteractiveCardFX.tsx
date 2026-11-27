'use client';

import { useEffect } from 'react';

/**
 * Global delegated pointer tracker for `.multi-card` surfaces.
 * Updates CSS custom properties (--mx, --my, --spot) strictly via rAF
 * on the active hovered/tapped card so colors shift interactively under
 * the cursor without React re-renders or CSS rotation transforms.
 */
export function InteractiveCardFX() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let activeCard: HTMLElement | null = null;
    let rafId: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;
    let touchTimer: ReturnType<typeof setTimeout> | null = null;

    const clearCard = (card: HTMLElement | null) => {
      if (!card) return;
      card.style.setProperty('--spot', '0');
    };

    const applyPosition = () => {
      rafId = null;
      const target = document.elementFromPoint(lastClientX, lastClientY);
      const card = target instanceof Element ? (target.closest('.multi-card') as HTMLElement | null) : null;

      if (activeCard && activeCard !== card) {
        clearCard(activeCard);
      }

      if (!card) {
        activeCard = null;
        return;
      }

      activeCard = card;
      const rect = card.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const px = Math.min(100, Math.max(0, ((lastClientX - rect.left) / rect.width) * 100));
      const py = Math.min(100, Math.max(0, ((lastClientY - rect.top) / rect.height) * 100));

      card.style.setProperty('--mx', `${px.toFixed(1)}%`);
      card.style.setProperty('--my', `${py.toFixed(1)}%`);
      card.style.setProperty('--spot', '1');
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyPosition);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      applyPosition();
      if (e.pointerType === 'touch' && activeCard) {
        const tappedCard = activeCard;
        if (touchTimer) clearTimeout(touchTimer);
        touchTimer = setTimeout(() => clearCard(tappedCard), 900);
      }
    };

    const handleWindowLeave = () => {
      clearCard(activeCard);
      activeCard = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('mouseleave', handleWindowLeave, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (touchTimer) clearTimeout(touchTimer);
      clearCard(activeCard);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('mouseleave', handleWindowLeave);
    };
  }, []);

  return null;
}
