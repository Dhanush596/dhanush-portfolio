'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface ActDefinition {
  id: string;
  lightBg: string;
  lightTint: string;
  darkBg: string;
  darkTint: string;
}

const ACT_COLORS: ActDefinition[] = [
  {
    id: 'hello',
    lightBg: '#F6F9FF',
    lightTint: '#E2ECFE',
    darkBg: '#070B12',
    darkTint: '#131E32',
  },
  {
    id: 'work',
    lightBg: '#E6F0FF',
    lightTint: '#CFE2FE',
    darkBg: '#0A1224',
    darkTint: '#15223F',
  },
  {
    id: 'journey',
    lightBg: '#E4F8EF',
    lightTint: '#C8F2DD',
    darkBg: '#06181B',
    darkTint: '#0F2F34',
  },
  {
    id: 'toolkit',
    lightBg: '#EFE9FF',
    lightTint: '#DED2FE',
    darkBg: '#0F0B24',
    darkTint: '#231846',
  },
  {
    id: 'contact',
    lightBg: '#FFF3DC',
    lightTint: '#FEE5B3',
    darkBg: '#0C0C0F',
    darkTint: '#1C1C24',
  },
];

export function ActBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const currentActRef = useRef<string>('hello');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const applyColors = (actDef: ActDefinition, immediate = false) => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const targetBg = isDark ? actDef.darkBg : actDef.lightBg;
      const targetTint = isDark ? actDef.darkTint : actDef.lightTint;

      if (immediate || prefersReducedMotion) {
        document.documentElement.style.setProperty('--act-bg', targetBg);
        document.documentElement.style.setProperty('--act-tint', targetTint);
      } else {
        gsap.to(document.documentElement, {
          '--act-bg': targetBg,
          '--act-tint': targetTint,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    const triggers: ScrollTrigger[] = [];

    ACT_COLORS.forEach((act) => {
      const el = document.getElementById(act.id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => {
          currentActRef.current = act.id;
          applyColors(act);
        },
        onEnterBack: () => {
          currentActRef.current = act.id;
          applyColors(act);
        },
      });

      triggers.push(trigger);
    });

    // Theme change listener to instantly refresh the current act's colors
    const handleThemeChange = () => {
      const currentActDef = ACT_COLORS.find((a) => a.id === currentActRef.current) || ACT_COLORS[0];
      applyColors(currentActDef, true);
    };

    window.addEventListener('theme-changed', handleThemeChange);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener('theme-changed', handleThemeChange);
    };
  }, [prefersReducedMotion]);

  return null;
}
