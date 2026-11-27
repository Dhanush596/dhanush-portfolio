# Theme Architecture & Design Tokens Guide

## 🎨 Overview
The portfolio visual design is built with a **Bright, Light First-Class Theme** and an optional **Dark Theme** toggle. The experience is scroll-driven across 5 distinct narrative Acts, with smooth GSAP ScrollTrigger interpolations shifting `--act-bg` and `--act-tint` as the user navigates down the page.

---

## 🏛️ CSS Design Tokens (`app/globals.css`)

### Light Theme (`:root`, Default)
| Token | Value | Description / Usage | Contrast vs Act BGs |
| :--- | :--- | :--- | :--- |
| `--ink` | `#0F172A` | Primary high-contrast text, major headings, bold accents | > 14:1 (AAA) |
| `--muted` | `#475569` | Secondary descriptive copy, labels, timestamps | > 6.8:1 (AAA) |
| `--surface` | `#FFFFFF` | Solid card backgrounds, modals, dropdown surfaces | Surface contrast |
| `--surface-2`| `#F1F5F9` | Secondary card fills, browser chrome, code blocks | Light grey contrast |
| `--line` | `rgba(15, 23, 42, 0.10)` | Crisp 1px card borders, dividers, outlines | Subtle demarcation |
| `--accent` | `#2563EB` | Primary brand royal blue (buttons, links, active rings) | > 5.4:1 (AA) |
| `--accent-2` | `#7C3AED` | Secondary violet/purple (gradients, tags, secondary badges) | > 5.2:1 (AA) |
| `--pop` | `#F43F5E` | Rose highlight marker (SVG certificate underlines, accents) | Accent color |
| `--ok` | `#10B981` | Emerald status (Live in production, verified checks) | > 4.5:1 (AA) |
| `--warn` | `#F59E0B` | Amber alert / award status (100/100 score, honors) | Accent color |
| `--act-bg` | `#F6F9FF` | Scroll-interpolated background color (starts at Hello) | Base canvas |
| `--act-tint` | `#E2ECFE` | Matching deeper tint for chips, badges, hover fills | Base tint |
| `--card-shadow`| `0 10px 30px -12px rgba(37, 99, 235, 0.18)` | Soft elevated shadow on white surfaces | Card elevation |
| `--glass-glare`| `rgba(37, 99, 235, 0.08)` | Specular highlight for 3D tilt cards | Specular glaze |

### Dark Theme (`[data-theme="dark"]`, Optional Override)
| Token | Value | Description |
| :--- | :--- | :--- |
| `--ink` | `#F1F5F9` | Crisp off-white text |
| `--muted` | `#94A3B8` | Slate grey descriptions |
| `--surface` | `#0F172A` | Deep slate cards |
| `--surface-2`| `#1E293B` | Raised slate panels |
| `--line` | `rgba(255, 255, 255, 0.10)` | Soft white border |
| `--accent` | `#22D3EE` | Vibrant cyan |
| `--accent-2` | `#8B5CF6` | Radiant purple |
| `--act-bg` | `#070B12` | Deep ink background |
| `--act-tint` | `#131E32` | Dark navy tint |

---

## 🎭 The 5-Act Color Map

Each Act features a distinct, WCAG-compliant background and companion tint:

```
┌──────────────┬────────────────────────────┬────────────────────────────┬──────────────────────────────────────┐
│ Act          │ Light Background (--act-bg)│ Light Tint (--act-tint)    │ Dark Fallback                        │
├──────────────┼────────────────────────────┼────────────────────────────┼──────────────────────────────────────┤
│ 01. Hello    │ #F6F9FF (Powder White)     │ #E2ECFE (Sky Tint)         │ #070B12 / #131E32 (Deep Ink)         │
│ 02. Making   │ #E6F0FF (Powdery Azure)    │ #CFE2FE (Azure Tint)       │ #0A1224 / #15223F (Deep Navy)        │
│ 03. Journey  │ #E4F8EF (Soft Mint/Sage)   │ #C8F2DD (Mint Tint)        │ #06181B / #0F2F34 (Deep Teal)        │
│ 04. Toolkit  │ #EFE9FF (Pastel Lavender)  │ #DED2FE (Lavender Tint)    │ #0F0B24 / #231846 (Deep Indigo)      │
│ 05. Contact  │ #FFF3DC (Warm Peach/Amber) │ #FEE5B3 (Amber Tint)       │ #0C0C0F / #1C1C24 (Charcoal)         │
│ Footer       │ #2563EB (Royal Blue Solid) │ #1D4ED8 (Deep Blue)        │ #2563EB (Royal Blue Solid)           │
└──────────────┴────────────────────────────┴────────────────────────────┴──────────────────────────────────────┘
```

---

## 🔄 Where to Adjust Colors & Visuals

1. **Global Tokens & Theme Palettes**:
   - Location: [app/globals.css](file:///c:/Users/adhan/dhanush-portfolio-v2/app/globals.css)
   - Change `:root` for the light theme and `[data-theme="dark"]` for the dark theme.
2. **Per-Act Background Animation**:
   - Location: [components/home/ActBackground.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/home/ActBackground.tsx)
   - Modify `ACT_COLORS` array with your target hex values.
3. **Hero 3D Wave Shaders**:
   - Location: [components/canvas/TouchSensorScene.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/canvas/TouchSensorScene.tsx)
   - Modifies `fragmentShader`: `colorSky`, `colorLavender`, `colorIndigo`.
4. **Mega Footer Styles**:
   - Location: [components/contact/MegaFooter.tsx](file:///c:/Users/adhan/dhanush-portfolio-v2/components/contact/MegaFooter.tsx)
   - Background `#2563EB`, giant wordmark `-webkit-text-stroke`.

---

## ✅ Before / After Review Checklist

| Section / Component | Dark State (Before) | Light State (After) | Status |
| :--- | :--- | :--- | :--- |
| **Global Theme System** | Forced dark background `#070B12` | Bright dynamic canvas `var(--act-bg)` with Sun/Moon toggle (`D`) | Verified |
| **TopBar Navigation** | Hardcoded black glass `#070B12/85` | Translucent white surface `var(--surface)/80` with `--line` border | Verified |
| **Splash Screen** | Pitch black overlay `#070B12` | Clean `var(--act-bg)` canvas with light card & prompt | Verified |
| **WebGL Hero Wave** | Dark glossy black shader with silver sheen | Soft pastel gradient wave (`#BFDBFE`, `#DDD6FE`, `#FFFFFF`) | Verified |
| **Wireframe Hero Mode** | Grey wireframe lines on black | Semi-transparent indigo lines (`#2563EB`) on transparent canvas | Verified |
| **Live Telemetry Toasts**| Black cards with neon glow | Elevated white cards `var(--surface)` with crisp status tags | Verified |
| **Hero Marquee** | Black track with cyan dots | Soft `var(--surface-2)` track with chips in `--accent` & `--accent-2` | Verified |
| **Proof Strip Cards** | Black cards with neon glow | Clean `TiltCard` in `var(--surface)` with soft radial specular glare | Verified |
| **2.1 Live Sites Deck** | Dark navy cards `#0E1522` | White browser-chrome cards with traffic dots & `--act-tint` gradients | Verified |
| **2.2 Work Stack Cards**| Dark navy cards `#0A101D` | Crisp white cards `var(--surface)` with status badges in light tints | Verified |
| **2.2 Work Index Drawer**| Black rows with white border | Clean white rows with `--line` borders & smooth hover highlights | Verified |
| **2.3 DevOps Pipeline** | Full dark diagram | Light SVG stepper with white nodes; dark navy `#0B1220` terminal console as contrast island | Verified |
| **2.4 Motion Reel** | Dark video cards | Clean white video cards with `--act-tint` dashed placeholder boxes | Verified |
| **3.1 Career Timeline** | Dark timeline with cyan glow | Dual-track timeline with `--accent` to `--accent-2` gradient line & white cards | Verified |
| **3.2 Polaroids / Bio** | Dark profile card | White card with draggable stickers in `--surface` with colored accents | Verified |
| **4.1 Skill Spiral** | Black skill cards `#0E1322` | White skill cards with `--act-tint` tags & checkmarks | Verified |
| **4.2 Trophy Pile** | Dark cards with neon tags | White cards with colored top tape strips (accent/accent-2/pop/ok) & `--pop` SVG underline | Verified |
| **5.1 Contact Form** | Dark inputs with white text | White form inputs with `--line` border & `--accent` focus ring | Verified |
| **5.2 Mega Footer** | Black footer `#070A0F` | Royal blue `#2563EB` solid footer, white outlined wordmark, white status card | Verified |
| **Custom Cursor** | Cyan dot & white border ring | Dot in `--ink`, ring in `--accent`, labeled bubbles in `--ink` with white text | Verified |
| **Scroll Progress Bar** | Cyan to purple gradient | Gradient from `--accent` to `--accent-2` with light act pill counter | Verified |
