# Dhanush A — Portfolio

A production-ready Next.js 14 portfolio: glassmorphism UI, animated Kubernetes-style loading screen, scroll-tracking navbar, typewriter hero, animated stats, timeline, project modals, and a contact form.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Add your resume
# Replace the placeholder at public/resume/Dhanush_A_Resume.pdf with your real PDF

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000 to view it.

## Build & deploy

```bash
npm run build
npm start
```

Or deploy straight to Vercel:

```bash
npx vercel deploy
```

## Project structure

```
app/
  layout.tsx          Root layout, fonts, navbar, cursor, scroll bar
  page.tsx             Assembles all sections
  globals.css          Global styles, glassmorphism, animated grid
  api/contact/route.ts Contact form POST endpoint (stub — wire up an email provider)
components/
  sections/            Hero, About, Skills, Experience, Projects, Certifications, Contact, Footer
  ui/                  Navbar, GlassCard, Button, LoadingScreen
  effects/             CursorFollower, ScrollProgress
hooks/
  useMousePosition.ts
  useScrollProgress.ts
public/resume/          Drop your resume PDF here
```

## Notes

- All personal content (name, links, experience, projects, certifications) lives directly in the section components under `components/sections/` — edit those to update your info.
- The contact form currently simulates a submission in the UI. `app/api/contact/route.ts` gives you a real POST endpoint to wire it to — hook in Resend, SendGrid, or Nodemailer and call `fetch("/api/contact", ...)` from `Contact.tsx`.
- Images are set to `unoptimized: true` in `next.config.mjs` for easy static hosting; remove that if you deploy somewhere with Next.js Image Optimization support.
