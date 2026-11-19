# Dhanush A — Software Engineer Portfolio

Modern, high-performance portfolio engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **React Three Fiber**.

Live at: [https://dhanush.dev](https://dhanush.dev)

---

## Key Features

- **Interactive 3D Node Network**: Physics-driven 3D background canvas in Three.js / React Three Fiber leaning toward the cursor, with a graceful static ambient gradient fallback on mobile and reduced-motion environments.
- **Dynamic Work Section**: Bento-grid showcase with real-time category filtering (`Company`, `Internship`, `Self-practice`) and status badges (`LIVE`, `REAL-TIME PROJECT`, `PRACTICE`) persisted in URL query parameters.
- **Route-Driven Dynamic Theming**: Smooth 0.5s CSS color transitions between 8 specialized palettes driven by `data-theme` attributes.
- **3D Interactive UI**: `TiltCard`s with dynamic radial glare highlights, `MagneticButton`s, and `Reveal` scroll animations.
- **Fluid Momentum Scrolling**: Powered by `lenis` smooth scroll with full `prefers-reduced-motion` compliance and visible keyboard focus styling.
- **Case Study Deep Dives**: Dynamic static route pre-rendering for all production and real-time client projects with problem/solution challenge analysis.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Motion & 3D**: Three.js, `@react-three/fiber`, `@react-three/drei`, `framer-motion`
- **Scrolling**: `lenis`
- **Icons**: `lucide-react`

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Build for Production

```bash
npm run build
npm start
```
