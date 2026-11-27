import type React from 'react';

export interface CardTheme {
  id: string;
  /** Primary vibrant hex for borders, icons, badges */
  c1Hex: string;
  /** Secondary vibrant hex for multi-color gradients & beams */
  c2Hex: string;
  /** Tertiary vibrant hex for 3-color depth & corner glows */
  c3Hex: string;
  /** RGB triplet for CSS rgba() surface washes */
  c1Rgb: string;
  c2Rgb: string;
  c3Rgb: string;
}

export const CARD_THEMES: CardTheme[] = [
  {
    id: 'cobalt-violet-cyan',
    c1Hex: '#2563EB',
    c2Hex: '#7C3AED',
    c3Hex: '#06B6D4',
    c1Rgb: '37, 99, 235',
    c2Rgb: '124, 58, 237',
    c3Rgb: '6, 182, 212',
  },
  {
    id: 'emerald-teal-gold',
    c1Hex: '#059669',
    c2Hex: '#0D9488',
    c3Hex: '#D97706',
    c1Rgb: '5, 150, 105',
    c2Rgb: '13, 148, 136',
    c3Rgb: '217, 119, 6',
  },
  {
    id: 'rose-magenta-indigo',
    c1Hex: '#E11D48',
    c2Hex: '#C026D3',
    c3Hex: '#4F46E5',
    c1Rgb: '225, 29, 72',
    c2Rgb: '192, 38, 211',
    c3Rgb: '79, 70, 229',
  },
  {
    id: 'amber-coral-violet',
    c1Hex: '#D97706',
    c2Hex: '#EA580C',
    c3Hex: '#9333EA',
    c1Rgb: '217, 119, 6',
    c2Rgb: '234, 88, 12',
    c3Rgb: '147, 51, 234',
  },
  {
    id: 'cyan-sky-emerald',
    c1Hex: '#0891B2',
    c2Hex: '#0284C7',
    c3Hex: '#10B981',
    c1Rgb: '8, 145, 178',
    c2Rgb: '2, 132, 199',
    c3Rgb: '16, 185, 129',
  },
  {
    id: 'violet-fuchsia-sky',
    c1Hex: '#7C3AED',
    c2Hex: '#DB2777',
    c3Hex: '#0EA5E9',
    c1Rgb: '124, 58, 237',
    c2Rgb: '219, 39, 119',
    c3Rgb: '14, 165, 233',
  },
  {
    id: 'orange-rose-gold',
    c1Hex: '#EA580C',
    c2Hex: '#E11D48',
    c3Hex: '#CA8A04',
    c1Rgb: '234, 88, 12',
    c2Rgb: '225, 29, 72',
    c3Rgb: '202, 138, 4',
  },
  {
    id: 'teal-indigo-lime',
    c1Hex: '#0D9488',
    c2Hex: '#4338CA',
    c3Hex: '#65A30D',
    c1Rgb: '13, 148, 136',
    c2Rgb: '67, 56, 202',
    c3Rgb: '101, 163, 13',
  },
  {
    id: 'fuchsia-blue-emerald',
    c1Hex: '#C026D3',
    c2Hex: '#2563EB',
    c3Hex: '#059669',
    c1Rgb: '192, 38, 211',
    c2Rgb: '37, 99, 235',
    c3Rgb: '5, 150, 105',
  },
  {
    id: 'crimson-violet-cyan',
    c1Hex: '#DC2626',
    c2Hex: '#7C3AED',
    c3Hex: '#0891B2',
    c1Rgb: '220, 38, 38',
    c2Rgb: '124, 58, 237',
    c3Rgb: '8, 145, 178',
  },
  {
    id: 'lime-cyan-indigo',
    c1Hex: '#65A30D',
    c2Hex: '#06B6D4',
    c3Hex: '#4F46E5',
    c1Rgb: '101, 163, 13',
    c2Rgb: '6, 182, 212',
    c3Rgb: '79, 70, 229',
  },
  {
    id: 'gold-rose-teal',
    c1Hex: '#CA8A04',
    c2Hex: '#F43F5E',
    c3Hex: '#0D9488',
    c1Rgb: '202, 138, 4',
    c2Rgb: '244, 63, 94',
    c3Rgb: '13, 148, 136',
  },
];

export function getCardTheme(index: number): CardTheme {
  const safeIdx = ((Math.floor(index) % CARD_THEMES.length) + CARD_THEMES.length) % CARD_THEMES.length;
  return CARD_THEMES[safeIdx];
}

export function getMultiCardStyle(index: number): React.CSSProperties {
  const t = getCardTheme(index);
  return {
    '--mc1': t.c1Rgb,
    '--mc2': t.c2Rgb,
    '--mc3': t.c3Rgb,
    '--mc1-hex': t.c1Hex,
    '--mc2-hex': t.c2Hex,
    '--mc3-hex': t.c3Hex,
  } as React.CSSProperties;
}
