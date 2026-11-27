# Dhanush A — Software Engineer Portfolio

Modern, high-performance, single-page scroll-driven portfolio engineered with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **GSAP ScrollTrigger**, **Framer Motion**, and **React Three Fiber**.

Live at: [https://dhanush.dev](https://dhanush.dev)

---

## Key Architecture & Acts

- **Splash Act (Act 00)**: First-time session greeting (`Welcome to my cloud corner`) with a clean clip-path wipe transition.
- **Act 01: Hello (`#hello`)**: Hero, live availability chip (Bangalore), rotating words, floating parallax terminal notification toasts (`ArgoCD synced 0 drift`, `Trivy scan passed`), two opposite-direction tech marquees, and "Receipts, not vibes" proof strip with count-up metrics.
- **Act 02: The Making (`#work`)**:
  - **2.1 Live in Production**: Fanned deck of 4 commercial platforms with spring physics and browser-chrome mockups.
  - **2.2 Selected Work**: Sticky stacked cards with 3D glare and cursor view badges.
  - **2.3 Expandable Work Index**: Complete filterable index of all 21 projects with category and status chips.
  - **2.4 DevOps & Cloud Lab**: Interactive automated delivery pipeline diagram (Commit → Trivy → Docker → ArgoCD → K3s → Terraform).
  - **2.5 Motion Reel**: Horizontal video reel with lightbox player and timecodes.
- **Act 03: The Journey (`#journey`)**: Dual-tracked career timeline (PrimePro.ai, Rooman Technologies [100/100 score], Encode Data Tech, MCA, BCA, PUC, 10th) with official semester PDF transcripts, plus draggable polaroid stickers around the profile.
- **Act 04: The Toolkit (`#toolkit`)**: 3D skill spiral covering Frontend, Backend, and Cloud-Native primitives, plus the trophy pile of 20+ verified certificates and markscards.
- **Act 05: Contact & Mega Footer (`#contact`)**: Direct email wave interaction with one-click copy, contact API transmission form, and a full DevOps mega footer featuring live Bangalore time, live site status pulses, and terminal easter eggs.

---

## Motion Map

| Animation | Library / Technique | Target Component | Tweak Location / Timings |
| :--- | :--- | :--- | :--- |
| **Smooth Momentum Scroll** | Lenis + GSAP Ticker | `components/shared/SmoothScroll.tsx` | Duration: `1.2s`, Easing: `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |
| **Act Background Color Shifts** | GSAP ScrollTrigger | `components/home/ActBackground.tsx` | Trigger: `top 50%` / `bottom 50%`, CSS variable `--act-bg` transition: `0.8s` |
| **Top Bar Hide / Reveal** | Framer Motion | `components/shared/TopBar.tsx` | Animate `y: 0` vs `y: -90`, transition: `0.35s`, ease: `[0.22, 1, 0.36, 1]` |
| **Splash Clip-Path Wipe** | Framer Motion | `components/home/SplashIntro.tsx` | Exit `clipPath: polygon(...)`, duration: `0.65s` |
| **Headline Per-Word Slide-up** | Framer Motion | `components/home/HeroAct.tsx` | Stagger delay: `0.08s` per word, duration: `0.6s` |
| **Floating Toasts Parallax** | React Mouse Events + Spring | `components/home/HeroAct.tsx` | Damping: `30`, Stiffness: `200`, Divisor: `/35` |
| **Opposite Tech Marquees** | Framer Motion Infinite | `components/home/HeroMarquee.tsx` | Track 1: `28s`, Track 2: `32s`, hover: `paused` |
| **Stats Count-Up Animation** | Framer Motion `useInView` | `components/home/ProofStrip.tsx` | Duration: `1200ms`, step interval |
| **Live Deck Fan & Spread** | Framer Motion Spring | `components/work/LiveDeck.tsx` | Rotation: `-9°` to `+9°`, Spring Stiffness: `260`, Damping: `22` |
| **Sticky Stack Scroll Scaling** | CSS Sticky + Framer Motion | `components/work/WorkStack.tsx` | Top offset: `top-24` sm:`top-28`, Z-index: `idx + 10` |
| **Interactive Pipeline Stepper** | React State Timer | `components/work/PipelineLab.tsx` | Interval: `3200ms` auto-cycle, click override |
| **Draggable Polaroid Stickers** | Framer Motion Drag | `components/journey/Polaroids.tsx` | `dragElastic: 0.2`, `whileHover: scale(1.08)`, `whileDrag: scale(1.12)` |
| **Trophy Pile Random Rotation** | Framer Motion Spring | `components/toolkit/CertPile.tsx` | Rotation: `-5°` to `+5°`, hover resets to `0°`, lift `y: -6px` |
| **Custom Morphing Cursor** | Framer Motion `useSpring` | `components/shared/CustomCursor.tsx` | Damping: `25`, Stiffness: `300`, pill width `68px` |

---

## Media Files Checklist (Recordings & Screenshots)

All asset placeholders are typed in `lib/assets.ts`. Once files are ready, drop them into the appropriate path and flip `ready: true` in `lib/assets.ts`:

### 1. Motion Reel Video Clips (`/public/clips/`)
- [ ] `clip-01-terraform-apply.mp4` (16:9, 1080p, H.264, <3MB, 8s): Terminal run of `terraform apply` provisioning AWS EC2 & K3s.
- [ ] `clip-02-argocd-sync.mp4` (16:9, 1080p, H.264, <3MB, 7s): ArgoCD dashboard self-healing sync turning green.
- [ ] `clip-03-github-trivy.mp4` (16:9, 1080p, H.264, <3MB, 9s): GitHub Actions pipeline passing Trivy vulnerability security scan.
- [ ] `clip-04-marichin-booking.mp4` (9:16, 1080p, H.264, <3MB, 8s): Marichin Homestay booking workflow screen recording.
- [ ] `clip-05-kalyanothsava.mp4` (16:9, 1080p, H.264, <3MB, 6s): Karnataka Kalyanothsava matchmaking portal interaction.
- [ ] `clip-06-alankar-catalog.mp4` (9:16, 1080p, H.264, <3MB, 7s): Alankar Fashion catalog filtering and cart logic.
- [ ] `clip-07-bangalore-vibes.mp4` (16:9, 1080p, H.264, <3MB, 8s): Bangalore Vibes directory and entertainment portal navigation.
- [ ] `clip-08-shader-hero.mp4` (16:9, 1080p, H.264, <3MB, 6s): Three.js interactive wave deformation reacting to cursor physics.

### 2. Live Site Desktop Screenshots (`/public/media/sites/`)
- [ ] `marichin-homestay.webp` (1440x900): Clean desktop screenshot of [marichinhomestay.in](https://marichinhomestay.in/).
- [ ] `karnataka-kalyanothsava.webp` (1440x900): Clean desktop screenshot of [karnatakakalyanothsava.com](https://karnatakakalyanothsava.com/).
- [ ] `alankar-fashion.webp` (1440x900): Clean desktop screenshot of [alankarfashion.in](https://alankarfashion.in/).
- [ ] `bangalore-vibes.webp` (1440x900): Clean desktop screenshot of [bangalorevibes.in](https://bangalorevibes.in/).

### 3. Draggable Polaroid Photos (`/public/media/`)
- [ ] `polaroid-journey.webp` (1:1): Photo / collage representing journey from Kasaragod to Bangalore.
- [ ] `polaroid-mca.webp` (1:1): Photo representing MCA graduation / tech events.
- [ ] `polaroid-devops.webp` (1:1): Certificate photo / terminal screenshot representing 100/100 score.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```
