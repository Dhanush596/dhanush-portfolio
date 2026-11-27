export type Category = "company" | "internship" | "mca" | "bca" | "practice";
export type Status = "live" | "realtime" | "practice";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  secondaryCategory?: Category;
  status?: Status;
  backend?: "full-stack" | "simulated-api";
  role: string;
  period?: string;
  stack: string[];
  features: string[];
  highlights?: string[];
  impact?: string;
  realVsSimulated?: string;
  challenges?: { problem: string; solution: string }[];
  links: { live?: string; repo?: string };
  accent: string;
  accent2: string;
  cover?: string;
  featured?: boolean;
};

export const siteStats = {
  companyWebsites: 13,
  liveSites: 5,
  realtimeSites: 8,
};

export const categoryLabels: Record<Category, string> = {
  company: "Company (PrimePro.ai)",
  internship: "Internship",
  mca: "MCA",
  bca: "BCA",
  practice: "Self-practice",
};

export const statusLabels: Record<Status, { label: string; description: string }> = {
  live: { label: "LIVE", description: "Publicly accessible online" },
  realtime: { label: "REAL-TIME PROJECT", description: "Commercial project built at PrimePro.ai" },
  practice: { label: "PRACTICE", description: "Technical implementation project" },
};

export const backendLabels: Record<"full-stack" | "simulated-api", string> = {
  "full-stack": "Full-stack",
  "simulated-api": "Frontend + simulated API",
};

export const projects: Project[] = [
  // =========================================================================
  // 1. PRACTICE PROJECTS (Self-Practice & Lab)
  // =========================================================================
  {
    slug: "primepro-platform",
    title: "PrimePro Platform",
    tagline: "Production-grade full-stack digital product engineering platform with unified monorepo & serverless Express",
    category: "practice",
    status: "practice",
    backend: "full-stack",
    role: "Full-Stack Lead Engineer & Architect",
    period: "Practice Platform (2025 – 2026)",
    cover: "/media/sites/primepro.png",
    accent: "#00F0FF",
    accent2: "#A855F7",
    featured: true,
    stack: [
      "React 18 (18.3.1)",
      "TypeScript (5.7.2)",
      "Vite 6",
      "React Router DOM v6",
      "Axios",
      "Lucide React",
      "CSS Grid & Glassmorphism",
      "Node.js (ESM)",
      "Express.js 4",
      "MongoDB Atlas",
      "Mongoose",
      "Helmet",
      "express-rate-limit",
      "express-mongo-sanitize",
      "npm workspaces",
      "Vercel Serverless",
    ],
    features: [
      "Unified npm workspaces monorepo uniting React 18 SPA frontend and rate-limited Express REST API deployed serverlessly on Vercel",
      "Alternating visual rhythm: obsidian cyber dark alternating with clean architectural bright slate with strict WCAG-compliant contrast",
      "Zero-empty-state resilient data layer in React Context providing sub-10ms response times with optimistic fallback caching",
      "Interactive 3D multi-axis perspective phone frames and architectural teardowns of 30+ market-defining apps (Uber, Spotify, Airbnb, Stripe, Notion)",
      "Serverless MongoDB connection pooling via memoized promise cache (cachedPromise in connectToDatabase) preventing socket exhaustion on warm invocations",
      "Comprehensive security suite: Helmet HTTP headers, rate limiting (100 req/15min), environment-aware CORS whitelist, and NoSQL injection sanitization",
      "Automated Node.js build orchestrator (build.js) synchronizing compiled client/dist chunks directly into root /dist for Vercel deployment",
      "Client asset optimization pipeline with Vite tree-shaking, vendor chunking, and SVG sprite loading maintaining bundles under 150kB gzipped",
    ],
    highlights: [
      "Unified npm workspaces monorepo deployed serverlessly on Vercel",
      "Sub-10ms optimistic fallback data layer eliminating UI empty states",
      "Serverless MongoDB connection pooling with zero socket exhaustion",
      "Alternating dark/bright high-contrast design system",
      "Comprehensive enterprise security suite (Helmet, rate-limiting, CORS, Mongo sanitize)",
    ],
    impact:
      "Engineered a unified monorepo deployed serverlessly on Vercel with sub-10ms UI renders, zero client downtime, and 100% showcase reliability via optimistic fallback caching.",
    realVsSimulated:
      "Full-Stack Architecture: Dual-mounted Express API (/api & /) with MongoDB Atlas cloud cluster. The client hydrates immediately from curated fallback benchmarks (FALLBACK_HOME_DATA, FALLBACK_SERVICES, FALLBACK_PRODUCTS) in React Context, updating optimistically when the backend responds.",
    challenges: [
      {
        problem:
          "Vercel was configured for static frontends or isolated APIs; Vite compiled to client/dist, but Vercel looked for ./dist at root, triggering [STATIC_BUILD_NO_OUT_DIR].",
        solution:
          "Authored a standalone Node.js build runner (build.js) that invokes npm run build --prefix client and synchronizes generated chunks directly into root /dist, and configured vercel.json with explicit outputDirectory and rewrites.",
      },
      {
        problem:
          "Root package.json used unpinned tags, causing React 19 to install alongside React 18 third-party libraries (lucide-react, framer-motion), triggering runtime error #525 (white screen).",
        solution:
          "Enforced strict React 18.3.1 pinning via npm overrides, locked @types/react to 18.3.18, cleared conflicting lockfiles, and added resolve.dedupe: ['react', 'react-dom'] in client/vite.config.ts.",
      },
      {
        problem:
          "Creating a new Mongoose connection on each serverless API invocation quickly exceeded MongoDB Atlas connection limits during traffic spikes.",
        solution:
          "Engineered connection caching in server/src/index.ts that inspects mongoose.connection.readyState to reuse existing open sockets across invocations rather than opening a new TCP handshake.",
      },
      {
        problem:
          "Default backend seeds had missing or single-link data creating large empty card spaces, and continuous dark backgrounds caused visual monotony.",
        solution:
          "Implemented multi-point validity checks in Footer.tsx and engineered an alternating section rhythm (obsidian dark alternating with bright slate #f8fafc) with dark slate text on white cards for strict contrast compliance.",
      },
    ],
    links: {
      live: "https://prime-pro-u4b9-taupe.vercel.app",
      repo: "https://github.com/Dhanush596/PrimePro.git",
    },
  },
  {
    slug: "auravault",
    title: "AuraVault (WarrantyVault)",
    tagline: "Intelligent digital ownership, warranty tracking, receipt OCR, and lifecycle protection platform",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Full-Stack Software Engineer / Frontend Architect",
    period: "Practice Platform (2025 – 2026)",
    cover: "/media/sites/auravault.png",
    accent: "#6366F1",
    accent2: "#14B8A6",
    featured: true,
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router 7",
      "Framer Motion",
      "TanStack Query (React Query)",
      "Lucide React",
      "Modern Dark Glassmorphism",
      "CSS clamp() Fluid Typography",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT & Bcrypt",
      "RBAC",
      "Vercel Edge",
    ],
    features: [
      "Digital Document Vault & Receipt OCR: Extracts brand, model, purchase date, serial number, and price from receipt photos and archives PDFs/images",
      "Visual Warranty Health Engine: Dynamic radial gauge and status timelines (Active, Expiring Soon, Expired) with predictive lead-time notifications",
      "Interactive Client-Side Tools: Real-time Warranty Calculator (/tools/warranty-calculator), 8-point Claim Checklist (/tools/warranty-checklist), and Custom Policy Builder (/tools/warranty-policy-builder)",
      "End-to-End Claims Engine: Generates structured evidence dossiers associating defect descriptions and repair urgency across a 5-stage status pipeline (Submitted -> Under Review -> Approved -> In Repair -> Resolved)",
      "Connected Maintenance Scheduler: Pairs appliance lifecycles with routine preventative servicing (e.g., HVAC filters, espresso descaling) directly within product context",
      "Standalone Showcase Mode: Floating persona switcher allowing instant toggle between 4 live personas (Family Organizer, Power User, Field Technician, System Administrator) with zero backend setup",
      "Search & Knowledge Directory: Instant search covering all platform utilities, guides, and warranty policies with popular keyword tags",
      "Role-Based Admin Console: User role management (Consumer, Technician, Admin, Super Admin), system audit logs, and service center dispatch",
    ],
    highlights: [
      "Zero-friction Standalone Showcase Mode with 4 switchable demo personas",
      "Receipt OCR simulation and visual radial warranty health gauge",
      "Suite of client-side interactive tools (Calculator, Checklist, Policy Builder)",
      "5-stage claim evidence dossier generator and repair tracking",
      "Hardware-accelerated Framer Motion primitives maintaining 60 FPS",
    ],
    impact:
      "Tree-shaken modern JavaScript bundle compiled in < 2 seconds with zero compilation warnings, delivering a 100% functional client-side demo with zero backend cold start.",
    realVsSimulated:
      "Dual Architecture: The live showcase on Vercel runs entirely in the browser with localStorage and TanStack Query, simulating receipt OCR, claims, and persona switching. The repository also includes a full Node.js/Express/MongoDB/JWT REST backend.",
    challenges: [
      {
        problem:
          "Reviewers, recruiters, and clients needed to experience 100% of the platform without registration friction or waiting for a live database to wake up.",
        solution:
          "Decoupled API queries using TanStack Query and built an in-browser state engine with localStorage persistence supporting instant live switching between 4 personas (Family Organizer, Power User, Field Technician, System Administrator).",
      },
      {
        problem:
          "Thermal paper receipts degrade into illegible blanks within 6-12 months, causing consumers to lose hundreds of dollars on expired warranty claims.",
        solution:
          "Engineered simulated smart receipt OCR capturing manufacturer, model number, serial number, and purchase proof, paired with a visual radial health gauge and predictive expiration alerts.",
      },
      {
        problem:
          "Filing warranty claims requires scouring manuals, invoices, and serial numbers under stress.",
        solution:
          "Built an evidence dossier generator that bundles product proofs, purchase receipts, and defect descriptions into a structured 5-stage claims pipeline.",
      },
      {
        problem:
          "Heavy animation libraries cause layout thrashing and sluggish mobile performance.",
        solution:
          "Created custom composable motion primitives using Framer Motion (Reveal, StaggerContainer, AnimatedButton) leveraging CSS variables, fluid clamp() sizing, and hardware-accelerated transforms (translate3d, scale) for 60 FPS performance.",
      },
    ],
    links: {
      live: "https://auravault-app.vercel.app/",
      repo: "https://github.com/Dhanush596/Auravault",
    },
  },
  {
    slug: "cakedelight",
    title: "CakeDelight",
    tagline: "Artisanal cake e-commerce platform and visual headless CMS with dual-mode API & 135+ catalog items",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Full-Stack / Frontend Developer",
    period: "Practice Platform (2025 – 2026)",
    cover: "/media/sites/cakedelight.png",
    accent: "#F472B6",
    accent2: "#FBBF24",
    featured: true,
    stack: [
      "React 19",
      "TypeScript",
      "Vite 8",
      "React Router v7",
      "Tailwind CSS v4",
      "Zustand (Persist)",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "React Three Drei",
      "Node.js",
      "Express v5",
      "MongoDB",
      "Mongoose",
      "JWT & Bcrypt.js",
      "Multer",
      "Vercel",
    ],
    features: [
      "Extensive artisanal catalog of 135+ products across 6 categories (Classic, Designer, Photo Cakes, Bento, Pinata, Combos) and 20+ flavours",
      "Dynamic multi-criteria search and filtering by flavour, occasion, dietary preference (100% Eggless vs Contains Egg), price brackets, and delivery speed (Same Day vs Midnight)",
      "Product Customization Engine: Real-time weight selection (500g, 1kg, 2kg) with dynamic price calculation, custom cake inscription, and dietary toggles",
      "Celebration UI with fluid micro-interactions powered by Framer Motion and 3D visual elements using Three.js & React Three Fiber",
      "Slide-out cart drawer with live subtotal calculation, instant coupon validation (FIRST10, CAKE200), and multi-step checkout (UPI, Cards, Net Banking, COD)",
      "Real-time order tracking (/track) visualising delivery milestones (Pending -> Processing -> Baking -> Out for Delivery -> Delivered)",
      "In-Browser Visual Page Builder (CMS) enabling non-technical operators to modify and reorder storefront sections for Home, Cakes, Occasions, Combos, and Offers",
      "Executive Admin Suite with high-level KPI metrics (Revenue, Orders, Low Stock Alerts), product CRUD with SKU tracking, coupon manager, and media upload library",
    ],
    highlights: [
      "135+ customizable artisanal cake catalog with real-time dietary & weight calculation",
      "In-Browser Visual Page Builder (CMS) for instant drag-and-reorder layout changes",
      "Dual-mode API layer seamlessly shifting between Express/MongoDB REST and localStorage mock engine",
      "Interactive celebration 3D visuals with Three.js and bouncy Framer Motion animations",
      "Real-time order tracking and executive admin operations portal",
    ],
    impact:
      "Engineered a dual-engine architecture that reduced simulated order processing time by 40% and maintained 60 FPS transitions across 135+ catalog items on Vercel.",
    realVsSimulated:
      "Dual-Mode Architecture: Live demo on Vercel runs entirely on an in-browser mock database (mockDatabase.ts) and API interceptor (mockApi.ts) with localStorage persistence. The repository contains a complete Express v5, MongoDB, and JWT REST backend.",
    challenges: [
      {
        problem:
          "Deploying a live, publicly accessible showcase on Vercel without managing, spinning up, or paying for a live MongoDB Atlas cluster and Node.js backend.",
        solution:
          "Engineered a client-side mock database (mockDatabase.ts) and API interceptor (mockApi.ts) inside apiFetch, synchronizing all 135 products, orders, coupons, customer accounts, and CMS configurations with localStorage.",
      },
      {
        problem:
          "Direct navigation or browser refresh on sub-routes (/cakes, /product/:id, /admin) triggered 404s on static hosting.",
        solution:
          "Configured vercel.json with universal wildcard rewrites (/(.*) -> /index.html), allowing React Router v7 to handle all client-side paths smoothly.",
      },
      {
        problem:
          "Several third-party image URLs from external CDNs had expired or thrown 404s, degrading visual presentation.",
        solution:
          "Built Node.js automated verification scripts testing all image endpoints via HTTP HEAD requests, replacing 11 failing references with reliable, high-resolution alternatives across catalog and CMS data files.",
      },
    ],
    links: {
      live: "https://cake-delight-teal.vercel.app/",
      repo: "https://github.com/Dhanush596/CakeDelight",
    },
  },
  {
    slug: "kaveri-heritage-kitchen",
    title: "Kaveri Heritage Kitchen",
    tagline: "Traditional Karnataka foods & spice blends store with in-browser transactional database & zero cold-start",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Full-Stack Developer",
    period: "Practice Platform (2025 – 2026)",
    cover: "/media/sites/kaveri-kitchen.png",
    accent: "#68145B",
    accent2: "#F59E0B",
    featured: true,
    stack: [
      "React 19",
      "Vite 7",
      "React Router DOM v7",
      "Custom CSS & Micro-Animations",
      "Lucide React",
      "LocalStorage Transactional Engine",
      "Vercel Edge CDN",
    ],
    features: [
      "Full-featured South Indian e-commerce web platform for Puliyogare mixes, traditional masala powders, pickles, gojju avalakki, and combo packs",
      "Collection shelves (Best Sellers, Featured, New Arrivals) with pack sizes, real-time stock levels, pricing, ingredients, allergen warnings, and cooking instructions",
      "Shopping cart with persistent browser storage and an isolated 'Buy Now' flow that preserves existing cart items",
      "Dynamic coupon validation (WELCOME10, KAVERI50) with subtotal recalculation, percentage/flat discounts, and free delivery eligibility (Rs. 999+)",
      "Order placement and real-time tracking timeline (Processing -> Shipped -> Out for Delivery -> Delivered) with unique tracking IDs (KHK-DEMO-XXXX) and courier assignment",
      "Admin Operations Portal: Live KPI calculations (AOV, gross revenue, conversion rates), product CRUD, inventory threshold controls, and review moderation",
      "Chronological audit trail logging every administrative mutation with actor details, timestamps, and before/after state snapshots",
      "Sticky Top Demo Bar allowing instantaneous 1-click elevation between Super Admin (K. Rajesh Rao) and Customer modes with a 1-click database reset tool",
    ],
    highlights: [
      "100% self-contained web application on Vercel Edge with sub-1-second global load times",
      "In-browser transactional database with realistic 20ms-60ms async latency simulation",
      "Two-way live data synchronization between Admin portal and Customer storefront",
      "Sticky Top Demo Bar for instantaneous 1-click role elevation",
      "Handcrafted royal plum (#68145b) & warm amber South Indian editorial aesthetic",
    ],
    impact:
      "Eliminated 50+ second free-tier backend cold starts to deliver instantaneous (<1s) global edge loading with zero downtime risk and complete full-stack transaction simulation.",
    realVsSimulated:
      "In-Browser Database & Simulated REST API: All API requests (api.get, api.post, api.patch, api.delete) are handled by an internal mock engine (client/src/lib/api.js) backed by localStorage with simulated async latency (20ms-60ms), completely removing remote database dependencies.",
    challenges: [
      {
        problem:
          "Hosting on free-tier platforms (Render, Railway, free MongoDB) caused 50+ second cold-start delays and database connectivity drops, causing recruiter bounce.",
        solution:
          "Engineered a 100% self-contained web app with an in-browser transactional database and Axios-compatible REST API layer hosted directly on Vercel's global edge network.",
      },
      {
        problem:
          "Admin updates to product pricing, stock levels, or order status needed to reflect across the customer storefront immediately without manual page refreshes.",
        solution:
          "Architected a normalized mock database in localStorage shared bi-directionally between Admin and Customer contexts, ensuring instant reactivity.",
      },
      {
        problem:
          "Reviewers needed a frictionless way to test both customer checkout and administrative management without logging in or out.",
        solution:
          "Implemented a sticky Top Demo Bar with 1-click switching between Super Admin (K. Rajesh Rao) and Demo Customer with pre-seeded order history and addresses.",
      },
    ],
    links: {
      live: "https://puliyogare.vercel.app/",
      repo: "https://github.com/Dhanush596/Puliyogare.git",
    },
  },

    // =========================================================================
  // 2. COMPANY - LIVE COMMERCIAL PLATFORMS (PrimePro.ai)
  // =========================================================================
  {
    slug: "marichin-homestay",
    title: "Marichin Homestay",
    tagline: "Live luxury coffee estate retreat booking platform in Kushalnagar, Coorg with dedicated admin panel",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "Full-Stack Engineer (Planned & Fully Developed from Scratch for PrimePro.ai)",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/marichin-homestay.png",
    accent: "#34D399",
    accent2: "#14B8A6",
    featured: true,
    stack: ["React", "Node.js", "Express", "Tailwind CSS", "MongoDB", "Render", "Vercel"],
    features: [
      "Planned and fully developed 100% from scratch by Dhanush for PrimePro.ai client requirements",
      "Engineered dedicated Admin Panel from scratch for room reservation management, guest inquiries, and pricing control",
      "Real-time guest booking inquiry pipeline with automated date availability validation",
      "Immersive coffee estate visual gallery, amenities tour, and local Coorg travel guide",
      "Mobile-first responsive architecture delivering sub-second page performance",
    ],
    highlights: [
      "100% planned and built end-to-end from scratch by Dhanush for PrimePro.ai",
      "Custom administrative management panel built from scratch",
      "Live production website operating with 100% uptime",
    ],
    impact:
      "Engineered from scratch for PrimePro.ai, automating direct guest reservations and cutting third-party commission overhead.",
    realVsSimulated:
      "Live commercial website developed for the company (PrimePro.ai). Planned and engineered 100% from scratch by Dhanush, including the customer booking flow and dedicated Admin Panel.",
    challenges: [
      {
        problem:
          "Guests booking high-end estate retreats require instant date verification and high-res photo exploration on mobile devices without lag.",
        solution:
          "Engineered a responsive calendar picker and optimized WebP image pipeline, achieving sub-second loads and fluid mobile reservations.",
      },
      {
        problem:
          "Homestay managers needed an intuitive way to manage seasonal tariffs, block dates, and review guest booking requests.",
        solution:
          "Designed and built an Admin Operations Panel from scratch with date blocking, rate adjustments, and real-time reservation notifications.",
      },
    ],
    links: {
      live: "https://marichinhomestay.in/",
    },
  },
  {
    slug: "karnataka-kalyanothsava",
    title: "Karnataka Kalyanothsava",
    tagline: "Live regional matrimonial and cultural matchmaking platform with dedicated administrator control panel",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "Full-Stack Engineer (Planned & Fully Developed from Scratch for PrimePro.ai)",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/karnataka-kalyanothsava.png",
    accent: "#FB7185",
    accent2: "#FBBF24",
    featured: true,
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    features: [
      "Planned and fully developed 100% from scratch by Dhanush for PrimePro.ai client requirements",
      "Engineered dedicated Admin Panel from scratch for member verification, profile moderation, and event management",
      "Structured member registration flows with regional matrimonial matchmaking filters (religion, caste, location, mother tongue)",
      "Privacy-first photo protection and verified badge credentialing for genuine profiles",
      "Scalable MongoDB relational schema modeling supporting high-concurrency member traffic with zero downtime",
      "Community celebration schedules and cultural event announcement feeds",
    ],
    highlights: [
      "100% planned and built end-to-end from scratch by Dhanush for PrimePro.ai",
      "Custom administrative management panel built from scratch",
      "Active regional platform serving community celebrations and matchmaking",
    ],
    impact:
      "Architected and delivered from scratch for PrimePro.ai, supporting high-concurrency cultural registrations and automated member verification.",
    realVsSimulated:
      "Live commercial website developed for the company (PrimePro.ai). Planned and engineered 100% from scratch by Dhanush, including member matchmaking filters and dedicated Admin Panel.",
    challenges: [
      {
        problem:
          "Regional matrimony platforms require sensitive profile verification and privacy controls to prevent unauthorized photo access.",
        solution:
          "Implemented privacy-first photo protection toggles and an administrative approval queue where profiles are reviewed before publishing.",
      },
      {
        problem:
          "High concurrent traffic spikes during cultural event registration periods causing database slowdowns.",
        solution:
          "Optimized MongoDB indexing across search attributes (caste, district, age bracket) and cached active member counts.",
      },
    ],
    links: {
      live: "https://karnatakakalyanothsava.com/",
    },
  },
  {
    slug: "alankarstyles",
    title: "Alankar Fashion (AlankarStyles)",
    tagline: "Modernized ethnic fashion & optical e-commerce platform migrated to MERN with custom admin suite",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "Full-Stack Engineer (MERN Migration & Admin Panel Architect for PrimePro.ai)",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/alankar-fashion.png",
    accent: "#D4AF37",
    accent2: "#800020",
    featured: true,
    stack: [
      "MERN Stack",
      "React 18",
      "Vite 8",
      "React Router DOM v6",
      "Three.js",
      "HTML5 Canvas API",
      "Recharts",
      "Lucide React",
      "Vanilla Modern CSS3",
      "React Context (Shop & Auth)",
      "Node.js",
      "Express.js",
      "MongoDB Atlas",
      "Mongoose",
      "JWT & Bcrypt",
      "RBAC",
      "Vercel",
    ],
    features: [
      "First live commercial website Dhanush worked on in the software industry (developed for PrimePro.ai)",
      "Technological Migration: Switched the legacy architecture to the MERN stack (MongoDB, Express, React, Node.js) from normal HTML, CSS, and PHP",
      "Complete UI/UX makeover from scratch with responsive luxury editorial aesthetics",
      "Designed and created the full-featured Admin Panel from scratch for catalog management, order processing, and customer reviews",
      "Added new interactive features including multi-category filtering, shopping cart, and customer reviews",
      "Also engineered an interactive 3D Virtual Try-On showcase demo (Shringar Luxury) deployed on Vercel with Three.js",
    ],
    highlights: [
      "First live commercial website worked on in the industry",
      "Migrated legacy HTML/CSS/PHP to modern MERN stack with complete UI/UX overhaul",
      "Created custom administrative control panel from scratch",
      "Interactive 3D Virtual Try-On showcase demo available",
    ],
    impact:
      "Transformed a legacy static website into a modern MERN e-commerce application with a custom admin portal, slashing catalog update turnaround time.",
    realVsSimulated:
      "Live commercial website modernized for the company (PrimePro.ai). Not developed from scratch initially: switched to MERN stack from HTML/CSS/PHP, completely overhauled UI/UX, and built the Admin Panel from scratch. Includes 3D virtual try-on showcase demo.",
    challenges: [
      {
        problem:
          "The client's original website was built on static HTML/CSS/PHP, making inventory and price updates slow and prone to inconsistency.",
        solution:
          "Migrated the entire architecture to a modern MERN stack (MongoDB, Express, React, Node.js), giving it a complete UI/UX overhaul and building an Admin Panel from scratch.",
      },
      {
        problem:
          "Customers wanted to preview eyewear and fabric drapes before purchasing ethnic sarees.",
        solution:
          "Engineered an interactive 3D Virtual Try-On Studio using Three.js and HTML5 Canvas, allowing users to rotate spectacles in 3D and simulate drape fabrics.",
      },
    ],
    links: {
      live: "https://alankarfashion.in/",
      repo: "https://github.com/Dhanush596/alankarstyles.git",
    },
  },
  {
    slug: "bangalore-32-vibes",
    title: "Bangalore Vibes (Celebration Lounge)",
    tagline: "Urban private celebration venue booking portal and nightlife directory with revamped UI/UX",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "Frontend & Process Engineer (UI/UX Revamp & Process Workflow for PrimePro.ai)",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/bangalore-vibes.png",
    accent: "#22D3EE",
    accent2: "#8B5CF6",
    stack: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
    features: [
      "Contributed to this commercial platform built for PrimePro.ai (not built from scratch, worked on existing system)",
      "Redesigned the full process workflow and engineered new features for hourly private lounge reservations",
      "Revamped and modernized the UI/UX for party package selection, add-on booking, and car celebrations",
      "Optimized single-page navigation speed with lightweight React and Tailwind CSS bundle loading",
      "Integrated interactive Instagram reel showcases and WhatsApp booking concierge",
    ],
    highlights: [
      "Complete process workflow redesign and feature expansion",
      "Modernized luxury dark lounge UI/UX aesthetic",
      "Live commercial platform operating in Bangalore",
    ],
    impact:
      "Streamlined the private celebration reservation process with clear hourly booking steps and transparent package pricing.",
    realVsSimulated:
      "Live commercial platform built for the company (PrimePro.ai). Contributed by re-engineering the booking process workflow, adding new features, and revamping UI/UX.",
    challenges: [
      {
        problem:
          "The original booking flow was confusing for customers trying to choose between hourly lounge packages and custom party add-ons.",
        solution:
          "Redesigned the full booking process into a clear step-by-step experience with transparent package tiers and visual add-on selection.",
      },
    ],
    links: {
      live: "https://bangalorevibes.in/",
    },
  },
  {
    slug: "instacartowing",
    title: "Insta Car Towing Services",
    tagline: "Live 24/7 on-demand vehicle emergency towing and rescue platform across Bengaluru with revamped UI/UX",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "UI/UX & Content Engineer (Information Architecture & UI/UX Redesign for PrimePro.ai)",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/instacar-towing.png",
    accent: "#EAB308",
    accent2: "#16A34A",
    stack: ["React", "Tailwind CSS", "WhatsApp GPS Dispatch", "Emergency UI/UX", "Vercel"],
    features: [
      "Contributed to this commercial live website built for PrimePro.ai (not built from scratch, worked on existing platform)",
      "Overhauled the core UI/UX workflows for emergency roadside assistance, flatbed towing, and 25-minute rescue dispatch",
      "Restructured and updated critical service information, location coverage, and pricing transparency",
      "Engineered high-converting emergency mobile CTAs: 1-tap phone calls and WhatsApp live GPS location sharing",
      "Streamlined 3-step dispatch stepper: Call/WhatsApp -> Truck Dispatched -> Safe Hook-up & Delivery",
      "Optimized high-contrast visual design for day and night emergency readability across mobile devices",
    ],
    highlights: [
      "Information architecture and emergency dispatch UI/UX overhaul",
      "1-tap emergency mobile call & WhatsApp live location routing",
      "Live commercial platform serving Bengaluru drivers 24/7",
    ],
    impact:
      "Enhanced roadside emergency conversion flow with instant WhatsApp GPS dispatch and clear step-by-step rescue status, reducing caller friction during breakdowns.",
    realVsSimulated:
      "Live commercial website built for the company (PrimePro.ai). Contributed by updating core content/information and completely revamping the emergency roadside assistance UI/UX.",
    challenges: [
      {
        problem:
          "Drivers stranded on busy highways require sub-second page access and zero navigation friction to request assistance.",
        solution:
          "Streamlined the UI into a high-visibility dark/yellow emergency theme with prominent 1-tap Call and WhatsApp live location sharing buttons.",
      },
      {
        problem:
          "Unclear towing options and ambiguous pricing caused driver hesitation during emergency breakdowns.",
        solution:
          "Restructured vehicle service categories (flatbed, wheel-lift, luxury, accident recovery) with upfront pricing and an interactive step-by-step dispatch roadmap.",
      },
    ],
    links: {
      live: "https://instacartowing.com/",
    },
  },

  // =========================================================================
  // 3. COMPANY - REAL-TIME COMMERCIAL PLATFORMS (PrimePro.ai)
  // =========================================================================
  {
    slug: "security-service",
    title: "Haneesha Security Enterprise Platform",
    tagline: "PSARA 2005 compliant physical security ERP, 24/7 guard rostering, and client command portal",
    category: "company",
    status: "realtime",
    backend: "simulated-api",
    role: "Full-Stack Engineer / Lead Developer",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/security-service.png",
    accent: "#1E3A8A",
    accent2: "#3B82F6",
    featured: true,
    stack: [
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Vite 6",
      "TanStack Query v5",
      "React Router DOM v6",
      "React Helmet Async",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Razorpay SDK",
      "Nodemailer",
      "Blob Streaming",
      "PSARA 2005 Engine",
      "Vercel",
    ],
    features: [
      "Public enterprise discovery portal covering 20 specialized security services (Static Guarding, Armed VIP PSOs, K9 Patrols, Healthcare Triage, Campus Access Control)",
      "Interactive security cost estimator calculating live quotes based on guard headcounts, 8h/12h/24h shifts, armed licensing, and facility requirements",
      "Admin Operations Command ERP: Personnel & Force Directory tracking armed/unarmed guards, badge numbers, weapon license verification, and biometric Aadhaar clearance",
      "24/7 Shift Rostering & Attendance: Sector allocation, supervisor check-ins, automated relief guard assignment, and real-time attendance logging",
      "Commercial Quotation & Proposal Engine: Multi-role personnel line items, margin calculations, 18% GST (SAC 998525), discount approvals, and instant PDF proposals",
      "Incident Management & Rapid Triage: Severity-tagged incident tracking (low, medium, high, critical) with response-time metrics and police escalation logging",
      "PSARA Statutory Audit & Compliance Reports: Verified police clearance percentages, operational SLAs, and 1-click regulatory PDF audit pack export",
      "Client Self-Service Portal: Real-time deployment tracking, digital proposal review & sign-off, contract SLA monitoring, and GST SAC 998525 tax invoicing",
    ],
    highlights: [
      "Statutory PSARA 2005 compliance & Section 31 CGST (SAC 998525) tax engine",
      "Universal Demo Adapter (1,000+ line mock router) running 100% serverless on Vercel",
      "24/7 shift rostering and biometric attendance for 40+ security personnel",
      "Automated incident escalation protocol and searchable AI knowledge SOP corpus",
      "Floating Demo Switcher for 1-click role swapping (Visitor, Admin, Customer)",
    ],
    impact:
      "Consolidated security force dispatch, regulatory compliance, and client billing into a single dashboard, eliminating manual paper rosters and cutting quotation creation time from hours to minutes.",
    realVsSimulated:
      "Universal Demo Mode: Engineered with a TypeScript Axios interceptor (handleDemoRequest) routing all /api/* REST calls through an in-browser mock router with localStorage persistence. The repository contains a complete Node.js/Express/MongoDB backend.",
    challenges: [
      {
        problem:
          "Hosting a full-stack security ERP with MongoDB on free cloud tiers led to slow cold starts, database sleep timeouts, and broken reviewer experiences.",
        solution:
          "Engineered a 1,000+ line handleDemoRequest mock router in TypeScript intercepting Axios at the adapter level, providing stateful CRUD and pagination via localStorage.",
      },
      {
        problem:
          "Statutory PSARA 2005 compliance (160h training, police verification, arms licenses) and GST SAC 998525 require strict relational modeling.",
        solution:
          "Designed strict TypeScript interfaces and Mongoose schemas connecting Quote -> Booking -> Contract -> Personnel -> Roster -> Incident -> Invoice with automatic 18% GST math.",
      },
      {
        problem:
          "Complex nested dashboard tables crashing when encountering legacy mock records or optional fields (clientInfo.name, billing.totalAmount).",
        solution:
          "Implemented recursive optional chaining, safe fallback cascades, and isolated Error Boundaries with pure HTML fallbacks to prevent cascading white-screen freezes.",
      },
    ],
    links: {
      live: "https://securityservice.vercel.app/",
      repo: "https://github.com/Dhanush596/SecurityService",
    },
  },
  {
    slug: "mahanya-furniture-interiors",
    title: "Fernooo Furniture & Interiors",
    tagline: "Solid-wood furniture storefront, 5-step custom configurator, AI interior specialist, and Recharts telemetry",
    category: "company",
    status: "realtime",
    backend: "simulated-api",
    role: "Full-Stack Engineer / Frontend Architect",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/fernooo.png",
    accent: "#0B4F5C",
    accent2: "#D9583B",
    featured: true,
    stack: [
      "React 19 (19.3.1)",
      "Vite 8",
      "Tailwind CSS v4",
      "Tailwind Forms & Typography",
      "React Router DOM v7",
      "Zustand v5 (Persist)",
      "Recharts",
      "Lucide React",
      "react-helmet-async",
      "Oxlint",
      "Vercel",
    ],
    features: [
      "High-fashion editorial storefront with 44 handcrafted solid-wood products across 6 room categories and 7 bespoke interior service showcases",
      "Interactive 5-step custom furniture blueprint configurator (category, dimensions, core timber, exterior Italian PU finish, budget tier, and reference uploads) with WhatsApp prefill",
      "Rule-based AI Furniture & Interior Specialist chat drawer with 15-intent keyword engine, product recommendations, and localStorage chat history",
      "Variant-aware cart with composite key deduplication, 18% GST computation, dynamic promo codes (WELCOME10, FERNOOO15, FESTIVE20, LUXE5000), and free shipping threshold meter",
      "4-step checkout with simulated payment gateways (UPI, Cards, Net Banking, COD) and printable tax invoices",
      "6-stage order tracking lifecycle (Placed -> Confirmed -> Manufacturing -> Shipped -> Out for Delivery -> Delivered)",
      "14-route Admin Management Center: Recharts analytics (AreaChart, PieChart, BarChart), catalog & inventory CRUD, timber reserves tracker, order stage progression, and 1-click CSV sales export",
      "Indian Pincode delivery time calculator (validates next-day Bengaluru delivery and pan-India delivery timelines)",
    ],
    highlights: [
      "34 lazy-loaded routes with React.lazy and Suspense code-splitting",
      "6 persistent Zustand localStorage stores managing cart, wishlist, auth, orders, and custom enquiries",
      "5-step interactive custom furniture configurator with WhatsApp spec builder",
      "15-intent deterministic client-side AI interior specialist",
      "Recharts telemetry dashboard with monthly trends and one-click CSV export",
    ],
    impact:
      "Compiled cleanly with Vite v8 (2,544 modules transformed in 2.24s) with zero runtime warnings, running 100% client-side with complete operational simulation.",
    realVsSimulated:
      "Client-Side SPA Architecture: Operates entirely in the browser using 6 Zustand localStorage stores with zero external backend dependencies, cleanly simulating full e-commerce checkout, 6-stage order tracking, customer enquiries, and administrative telemetry.",
    challenges: [
      {
        problem:
          "Handling deep-link routing refreshes and direct navigation on 34 nested public and administrative routes on static hosting.",
        solution:
          "Configured vercel.json with an SPA rewrite rule (/(.*) -> /index.html) ensuring all client-side routes resolve cleanly without 404s.",
      },
      {
        problem:
          "Ensuring distinct product variants (size, finish, color) don't overwrite each other in the shopping cart.",
        solution:
          "Engineered composite cartKey generation (product.id + color + size + finish) in cartStore to treat different combinations as discrete line items.",
      },
      {
        problem:
          "Broken third-party image URLs causing unsightly missing image icons across the catalog.",
        solution:
          "Built SafeImage.jsx with a 3-tier fallback cascade (original source -> Unsplash fallback -> local SVG placeholder).",
      },
      {
        problem:
          "Providing a smart AI chat assistant without incurring external LLM API costs or token latency.",
        solution:
          "Developed a deterministic client-side NLP intent matcher (aiKnowledgeEngine.js) recognizing 15 domain categories and embedding clickable product cards.",
      },
    ],
    links: {
      live: "https://fernooo.vercel.app/",
      repo: "https://github.com/Dhanush596/fernooo.git",
    },
  },
  {
    slug: "sports-spot",
    title: "SPORTS SPOT",
    tagline: "Athletic apparel e-commerce platform, 13 performance fabrics, and multi-role enterprise admin console",
    category: "company",
    status: "realtime",
    backend: "simulated-api",
    role: "Full-Stack Lead Engineer & Architect",
    period: "Commercial Project (PrimePro.ai)",
    cover: "/media/sites/sports-spot.png",
    accent: "#22C55E",
    accent2: "#3B82F6",
    featured: true,
    stack: [
      "React",
      "Vite",
      "React Router",
      "Axios",
      "Recharts",
      "Lucide React",
      "React Context (Auth & Shop)",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose (15 schemas)",
      "JWT",
      "Bcrypt.js",
      "Multer",
      "Vercel",
    ],
    features: [
      "Athletic apparel storefront with 30 products across 5 categories (T-Shirt, Track Pant, Track Upper, Shorts, Cap) and 13 technical performance fabrics (Jacquard, Dri-Fit, Laycra, Box Knit, Honeycomb, etc.)",
      "Dynamic Size x Colour x Fabric variant SKU resolution with real-time per-variant stock, pricing, and multi-image gallery",
      "Variant-aware shopping bag and wishlist state synchronization with composite itemKey (productId__variantSku__size__colour)",
      "Instant demo onboarding: one-click instant login, demo detail autofill, and password reset shortcuts",
      "Slide-out cart drawer with coupon validation (SPOT10, PERFORM20, WELCOME100) and simulated UPI/Card/COD checkout",
      "12-tab customer account hub: order history, interactive 7-stage fulfillment timeline, printable tax invoice, AWB tracking popup, cancellation/return workflows, and support ticket threading",
      "Multi-role Enterprise Admin Suite protected by 5 RBAC profiles (Super Admin, Store Manager, Product Manager, Order Manager, Support Manager)",
      "Recharts analytics dashboard (revenue timelines, order status pie charts), catalog & SKU variant editor, inventory audit logs, draggable banner CMS, and unified wholesale/support inbox",
    ],
    highlights: [
      "30 products, 13 technical performance fabrics, and dynamic variant SKU resolution",
      "Zero-backend Axios request adapter translating 40+ REST endpoints to localStorage",
      "Bi-directional real-time sync between storefront actions and admin queue",
      "12-tab customer account hub with printable tax invoices and return workflows",
      "5-profile RBAC enterprise admin suite with Recharts visualizations",
    ],
    impact:
      "Successfully translated an enterprise MERN architecture with 15 Mongoose schemas into an instant-loading, zero-cost Vercel demonstration with zero server latency.",
    realVsSimulated:
      "Dual Architecture: Designed on the MERN stack with 15 Mongoose schemas and Express REST routes. The live showcase on Vercel runs via an in-browser Axios adapter (api.js & demoStore.js) intercepting 40+ REST endpoints and persisting state in localStorage.",
    challenges: [
      {
        problem:
          "Translating a complex 15-model MERN backend to a serverless static showcase while keeping all 40+ REST endpoints interactive.",
        solution:
          "Engineered handleMockRequest inside api.js that intercepts both customer and admin Axios calls, simulating latency and reading/writing to a normalized localStorage database.",
      },
      {
        problem:
          "Keeping storefront customer operations (orders, reviews, support tickets) and admin dashboard updates synchronized in real time.",
        solution:
          "Structured a centralized state sync model where admin status updates (e.g. SHIPPED) and customer checkouts immediately update the shared localStorage store.",
      },
      {
        problem:
          "Handling file uploads (product images, banners, user avatars) without a cloud S3/Multer backend.",
        solution:
          "Implemented client-side FileReader.readAsDataURL simulation in the mock adapter so uploaded images render immediately and persist in browser storage.",
      },
    ],
    links: {
      live: "https://sportsspot-eight.vercel.app/",
      repo: "https://github.com/Dhanush596/sportsspot",
    },
  },
  {
    slug: "yohan-travels",
    title: "Yohan Travels",
    tagline: "Commercial travel booking and fleet reservation website built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#38BDF8",
    accent2: "#F59E0B",
    features: [
      "Vehicle fleet explorer, booking quote calculations, and itinerary inquiries",
      "Tour packages showcase and customer inquiry management pipeline",
      "Responsive layout optimized for mobile travel bookings",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    links: {},
  },
  {
    slug: "rangu-colour-of-print",
    title: "Rangu – Colour of Print",
    tagline: "Commercial printing services and custom merchandise showcase built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#EC4899",
    accent2: "#06B6D4",
    features: [
      "Product and commercial print service catalog with quote estimation",
      "Responsive UI with high-contrast custom branding and typography",
      "Administrative order inquiry tracking and customer specification forms",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    links: {},
  },
  {
    slug: "madanna-enterprises",
    title: "Madanna Enterprises (G.K. Foods)",
    tagline: "Wholesale food manufacturing and industrial services showcase built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#EAB308",
    accent2: "#16A34A",
    features: [
      "B2B food product catalog and industrial bulk supply details",
      "Administrative catalog management and customer inquiry dashboard",
      "Responsive supplier profile and factory capacity highlights",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    links: {},
  },
  {
    slug: "sri-seetarama",
    title: "Sri Seetarama",
    tagline: "Commercial business e-commerce and retail product showcase built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#F97316",
    accent2: "#DC2626",
    features: [
      "Retail product presentations with structured category browsing",
      "Customer-focused inquiry funnel and order management workflows",
      "Responsive client interface with modern layout architecture",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    links: {},
  },
  {
    slug: "hanger-commerce",
    title: "Hanger Commerce",
    tagline: "Custom retail hardware and space-saving organization e-commerce platform built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#8B5CF6",
    accent2: "#14B8A6",
    features: [
      "Hardware and organizer product catalog with high-resolution image galleries",
      "Wishlist tracking, customer reviews, and automated product recommendations",
      "Interactive customer inquiry assistant and responsive mobile shopping",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS"],
    links: {},
  },

  // =========================================================================
  // 4. INTERNSHIP PROJECTS
  // =========================================================================
  {
    slug: "mern-gitops-pipeline",
    title: "MERN GitOps CI/CD Pipeline Architecture",
    tagline: "Automated GitOps deployment pipeline, vulnerability scanning, and self-healing Kubernetes synchronization",
    category: "internship",
    status: "practice",
    backend: "full-stack",
    role: "DevOps Engineer Intern, Rooman Technologies Ltd.",
    period: "Feb 2026 – May 2026 (Score: 100/100)",
    accent: "#00F0FF",
    accent2: "#3B82F6",
    featured: true,
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Docker",
      "GitHub Actions",
      "Trivy",
      "AWS EC2",
      "K3s",
      "ArgoCD",
      "Terraform",
      "Ansible",
    ],
    features: [
      "End-to-end type safety with TypeScript across frontend and backend microservices",
      "Automated container vulnerability scanning with Trivy in CI/CD pipelines before publishing",
      "GitOps continuous delivery with ArgoCD for declarative, self-healing Kubernetes workloads",
      "Production-grade container orchestration on K3s with Horizontal Pod Autoscaling (HPA)",
      "Infrastructure as Code (IaC) provisioning using Terraform on AWS EC2 with Ansible configuration",
      "Multi-stage Docker build optimizations minimizing container image footprints and attack surface",
    ],
    highlights: [
      "End-to-end type safety with TypeScript across frontend and backend",
      "Automated vulnerability scanning with Trivy in CI/CD pipelines",
      "GitOps synchronization with ArgoCD for self-healing deployments",
      "Production-grade Kubernetes infrastructure on K3s with auto-scaling",
      "Comprehensive monitoring and logging stack",
    ],
    impact:
      "Reduced deployment time by 60% and improved system reliability to 99.95% uptime with zero-intervention GitOps synchronization.",
    realVsSimulated:
      "Engineered during the DevOps internship at Rooman Technologies Ltd. (Achieved 100/100 score). Demonstrates production-grade GitOps infrastructure on AWS EC2 & K3s.",
    challenges: [
      {
        problem:
          "Manual multi-environment deployments caused configuration drift between staging and production clusters.",
        solution:
          "Structured an automated GitOps repository with ArgoCD tracking declarative Kubernetes manifests and enforcing continuous drift reconciliation.",
      },
      {
        problem:
          "Deploying untested container images introduced security CVEs and high downtime risks.",
        solution:
          "Integrated Trivy container scanner into GitHub Actions workflow to block PR merges and image pushes whenever severity thresholds are breached.",
      },
    ],
    links: {
      repo: "https://github.com/Dhanush596/devstream-app.git",
    },
  },
  {
    slug: "online-grocery-store",
    title: "GStore — Full-Stack Grocery E-Commerce Platform",
    tagline: "Legacy PHP 8 + MySQL (XAMPP) monolithic store modernized into a React 18 + MERN architecture with interactive Vercel showcase",
    category: "internship",
    secondaryCategory: "bca",
    status: "live",
    backend: "full-stack",
    role: "Full-Stack Development Intern, Encode Data Tech & BCA Capstone Lead",
    period: "Apr 2024 – Jun 2024 (Modernized 2025)",
    cover: "/media/sites/gstore.png",
    accent: "#16A34A",
    accent2: "#22C55E",
    featured: true,
    stack: [
      "React 18",
      "Vite 5",
      "Tailwind CSS 3",
      "React Router v6",
      "React Context API",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose (7 models)",
      "JWT & Bcryptjs",
      "Cloudinary",
      "localStorage REST Adapter",
      "Legacy PHP 8.2 & MySQL (XAMPP)",
      "Vercel",
    ],
    features: [
      "Modern React 18 + Vite SPA: High-performance Single Page Application with dynamic client-side routing, protected user/admin route guards, and sub-second transitions",
      "Dual User & Admin Portals: 8 customer pages (Home, Shop with category filter, Details, Reviews, Cart, Shipping Checkout, Order Tracking) and 7 admin management centers",
      "Admin Operations Command: Analytics KPI stat cards, Category CRUD with inline editing, Product CRUD with image uploads, Customer Directory, Feedback Viewer, and Order Workflow (Pending → Processing → Shipped → Delivered / Cancelled)",
      "Zero-Backend Serverless Showcase: In-browser localStorage REST simulation engine (client/src/api.js) supporting async simulated delays, full CRUD, pre-seeded catalog, and FileReader DataURL image uploads on Vercel",
      "Production MERN Architecture in /api: Node.js, Express, Mongoose schemas mapped from legacy gstore.sql (Admin, Customer, Category, Product, Order, Shipping, Feedback) with JWT auth middleware and Cloudinary storage",
      "1-Click Demo Onboarding: Built-in credentials auto-fill for both Customer (dhanush@gmail.com / 1234) and Admin (admin@gstore.com / admin123) for instant reviewer exploration",
      "Non-Blocking Toast System: Replaced intrusive legacy browser alert() dialogs with modern react-hot-toast notifications across all user actions",
    ],
    highlights: [
      "Full legacy modernization from monolithic PHP 8.2 + MySQL (XAMPP) to decoupled React 18 + MERN architecture",
      "7 Mongoose models cleanly mapped from legacy gstore.sql relational schema",
      "Zero-backend localStorage REST adapter with FileReader DataURL image persistence for instant Vercel demo",
      "Dual role authentication (JWT protectUser and protectAdmin guards) with auto-fill demo credentials",
      "Live production deployment on Vercel with smooth react-hot-toast notifications",
    ],
    impact:
      "Modernized a legacy local XAMPP application into a cloud-native, responsive e-commerce platform with dual User/Admin dashboards, instant sub-second page transitions, and 100% interactive serverless demo mode.",
    realVsSimulated:
      "Dual Architecture: Repository contains a production-ready Node.js/Express/MongoDB REST API with Cloudinary image storage, alongside an interactive in-browser localStorage REST engine enabling full zero-backend testing on Vercel (https://gstore-nt2i.vercel.app).",
    challenges: [
      {
        problem:
          "Original PHP/MySQL monolith ran strictly on local XAMPP Apache servers, with PHP PDO inline queries and $_SESSION cookies that prevented cloud hosting on Vercel.",
        solution:
          "Audited PHP base controllers (Main.php, Admin.php) and normalized the 7 MySQL tables into Mongoose models, decoupling the frontend into a React 18 + Vite SPA.",
      },
      {
        problem:
          "Serverless static hosts cannot persist binary image files uploaded through traditional PHP move_uploaded_file() or local multer disk storage.",
        solution:
          "Implemented Cloudinary cloud storage in the Express backend, and engineered a client-side FileReader DataURL encoder in the localStorage demo adapter so uploaded product images render and persist immediately in the browser.",
      },
      {
        problem:
          "Legacy architecture triggered full page reloads and disruptive, blocking browser alert() dialogs on every cart addition or order status change.",
        solution:
          "Migrated to React Router v6 declarative routing with centralized AuthContext and non-blocking react-hot-toast notifications for a seamless mobile-first UX.",
      },
      {
        problem:
          "Admin updates to product stock and order statuses causing state desynchronization between customer views and admin tables.",
        solution:
          "Structured a unified reactive state layer where admin order progression (Pending -> Processing -> Shipped -> Delivered) immediately synchronizes with customer order tracking timelines.",
      },
    ],
    links: {
      live: "https://gstore-nt2i.vercel.app",
      repo: "https://github.com/Dhanush596/gstore",
    },
  },

  // =========================================================================
  // 5. MCA PROJECTS
  // =========================================================================
  {
    slug: "mental-health-monitor",
    title: "Student Wellness Monitor — AI-Powered Mental Health & Stress Analytics",
    tagline: "Serverless wellness tracking & generative AI therapy platform analyzing student lifestyle telemetry and conversational sentiment",
    category: "mca",
    status: "live",
    backend: "full-stack",
    role: "MCA Project Developer, Srinivas Institute of Technology",
    period: "2025 – 2026",
    cover: "/media/sites/student-wellness-monitor.png",
    accent: "#10B981",
    accent2: "#06B6D4",
    featured: true,
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Recharts (Radar & Trends)",
      "Google Gemini API (gemini-3.5-flash)",
      "Firebase Authentication",
      "Cloud Firestore",
      "Lucide React",
      "PDF Export Utility",
      "Vercel Serverless",
    ],
    features: [
      "Command Center Telemetry: 5-axis Wellness Balance Radar (Sleep, Study, Screen Time, Social Hours, Physical Activity) rendered dynamically with Recharts",
      "Real-Time Threat Level Gauge: Circular SVG indicator calculating live stress percentage (Low ≤30%, Moderate 31–70%, High >70%) with context-aware micro-interventions",
      "7-Day Trend Analytics: Historical stress progression tracking behavioral patterns and exam-week fatigue spikes",
      "Therapy Space & Conversational Sentiment: Multiturn mental health chat with Google Gemini 3.5 Flash returning structured JSON telemetry (reply, stress_score, sentiment)",
      "Student Journey Milestones: Chronological date-slider and status badges monitoring daily stress trajectory and recovery",
      "One-Click PDF Report Export: Generates downloadable clinical-style wellness report (My_Wellness_Report.pdf) capturing telemetry charts and personalized AI recommendations",
      "Cloud-Active Persistence: User-scoped Cloud Firestore synchronizing real-time telemetry (students/{userId}) and chat history (student_chats/{userId})",
    ],
    highlights: [
      "5-axis Recharts Wellness Balance radar & dynamic circular stress threat gauge",
      "Google Gemini 3.5 Flash generative AI therapy space with structured JSON responses",
      "User-scoped Cloud Firestore persistence and Firebase Auth security",
      "Client-side formatted PDF wellness summary report generation",
      "Live serverless deployment on Vercel with dark/light theme toggle",
    ],
    impact:
      "Empowered students with proactive mental health monitoring, combining 5-parameter biometric radar visualization with empathetic Gemini conversational therapy and instant PDF wellness summaries.",
    realVsSimulated:
      "Live serverless production application deployed on Vercel with Firebase Cloud Firestore real-time database and Google Gemini 3.5 Flash integration.",
    challenges: [
      {
        problem:
          "Gemini generative model wrapping JSON output in Markdown code fences (```json ... ```), breaking downstream client-side telemetry state parsing.",
        solution:
          "Engineered a regex markdown sanitizer and schema validation fallback that strips code blocks and validates required JSON keys before updating the UI state.",
      },
      {
        problem:
          "Recharts ResponsiveContainer triggering dimension calculation warnings and layout jumps within dynamic grid containers.",
        solution:
          "Enforced explicit aspect ratios and dedicated container heights (height={300}) across radar and trend charts to guarantee smooth zero-shift rendering.",
      },
      {
        problem:
          "Preventing accidental API key leaks while deploying serverless frontend builds to public repositories.",
        solution:
          "Sanitized repository history, isolated credentials in Vercel environment variables, and applied runtime .trim() sanitization to eliminate trailing whitespace injection.",
      },
    ],
    links: {
      live: "https://mental-health-monitor-rust.vercel.app",
      repo: "https://github.com/Dhanush596/mental-health-monitor.git",
    },
  },
  {
    slug: "ai-study-assistant",
    title: "AI Study Assistant (Study Buddy)",
    tagline: "Document-aware AI study platform with fuzzy retrieval, Gemini 2.5 Flash conversational Q&A, and Brevo email OTP",
    category: "mca",
    status: "live",
    backend: "full-stack",
    role: "MCA Final Year Project Developer, Srinivas Institute of Technology",
    period: "2025 – 2026",
    cover: "/media/sites/ai-study-assistant.png",
    accent: "#8B5CF6",
    accent2: "#EC4899",
    featured: true,
    stack: [
      "React.js",
      "Axios (Interceptors)",
      "CSS3 Variables & dvh",
      "Python",
      "Flask REST API",
      "Flask-JWT-Extended",
      "Flask-Bcrypt",
      "Gunicorn",
      "SQLite",
      "Flask-SQLAlchemy",
      "Google Gemini API (gemini-2.5-flash)",
      "spaCy (en_core_web_sm)",
      "TheFuzz / RapidFuzz",
      "PyMuPDF & python-docx",
      "Brevo HTTPS API (v3)",
      "Vercel (Frontend)",
      "Render (Backend)",
    ],
    features: [
      "Recruiter-Friendly Lazy Authentication: Guests explore the workspace and UI freely; protected upload and chat actions trigger a lightweight floating auth modal",
      "Email OTP Verification & JWT Security: 6-digit verification code delivered over HTTPS via Brevo API with Bcrypt password hashing and Axios Bearer interceptors",
      "Multi-Format Document Ingestion: Uploads PDF, DOCX, and TXT with secure filename sanitization and chunking into searchable Topic database records",
      "Fuzzy-Search Retrieval Pipeline: Ranks document passages using TheFuzz partial token sort ratio to extract the top 3 highest-relevance context chunks",
      "Grounded Generative Q&A: Injects document excerpts and multi-turn chat history into Google Gemini 2.5 Flash to synthesize direct, hallucination-free explanations",
      "In-App Document Viewer: Streams binary blobs via Axios and renders files directly in an iframe modal via temporary browser object URLs",
      "Session-Scoped Revision History: Organizes conversational threads and topic tags grouped by UUID session_id per document for structured exam preparation",
    ],
    highlights: [
      "Fuzzy-matching retrieval engine combined with Google Gemini 2.5 Flash",
      "Render-resilient Brevo HTTPS email delivery bypassing blocked SMTP ports",
      "Gunicorn memory tuning hosting Flask + spaCy NLP within free-tier cloud limits",
      "Guest lazy-auth flow with client-side Axios JWT token injection",
      "Live dual-cloud deployment: Vercel SPA frontend + Render Python REST backend",
    ],
    impact:
      "Engineered a zero-cold-start document Q&A assistant combining fuzzy search with Gemini 2.5 Flash, providing sub-second semantic retrieval across academic courseware.",
    realVsSimulated:
      "Live production dual-cloud architecture: React frontend hosted on Vercel connecting to a Python Flask REST API with SQLite and spaCy on Render (https://ai-study-assistant-backend-i6qq.onrender.com).",
    challenges: [
      {
        problem:
          "Cloud email deliverability blocked on Render's free tier because outbound SMTP ports 587 and 465 are permanently disabled.",
        solution:
          "Migrated from traditional SMTP to Brevo's REST API over standard HTTPS port 443 with secure JSON payloads and API key authentication.",
      },
      {
        problem:
          "Memory spikes from loading spaCy NLP models and PDF parsers causing Gunicorn worker timeout kills on memory-constrained hosting.",
        solution:
          "Configured Gunicorn with '--workers 1 --threads 2 --timeout 120' and optimized document chunking to fit comfortably within free-tier RAM limits.",
      },
      {
        problem:
          "Mobile virtual keyboards shifting chat containers and breaking viewport height on mobile browsers.",
        solution:
          "Implemented dynamic viewport height units ('dvh') combined with sticky input positioning to prevent iOS/Android keyboard layout distortion.",
      },
    ],
    links: {
      live: "https://mca-project-beta.vercel.app",
      repo: "https://github.com/Dhanush596/MCAProject.git",
    },
  },

  {
    slug: "payflow-payroll",
    title: "PayFlow — Full-Stack Payroll & Payslip Management System",
    tagline: "Full-stack web application with gross-to-net salary computation, INR-first multi-currency conversion, and print-ready payslip generation",
    category: "mca",
    status: "live",
    backend: "full-stack",
    role: "MCA 2nd Sem Project Developer, Srinivas Institute of Technology",
    period: "2024 – 2025",
    cover: "/media/sites/payflow-payroll.png",
    accent: "#2563EB",
    accent2: "#10B981",
    featured: true,
    stack: [
      "Python",
      "Flask (3.1.3)",
      "Flask-CORS (6.0.5)",
      "Flask-Login (0.6.3)",
      "Werkzeug Security (pbkdf2:sha256)",
      "PostgreSQL (Neon Serverless)",
      "SQLite (Local Dev)",
      "Flask-SQLAlchemy (3.1.1)",
      "Psycopg 3 (psycopg[binary])",
      "Bootstrap 5 & Icons",
      "Jinja2 Templates",
      "Vanilla JavaScript (app.js)",
      "CSS @media print",
      "Vercel Serverless (WSGI)",
    ],
    features: [
      "Public Landing Page showcasing platform capabilities, 3-step payroll workflow, and instant dashboard navigation",
      "Authentication & Lazy Cloud Bootstrapping with Flask-Login, pbkdf2:sha256 password hashing, and auto-seeding of default currencies on cold starts",
      "Admin Dashboard computing real-time KPIs (Active Employees, Payroll Runs, Total Net Disbursed) with live search and action shortcuts",
      "Live Salary Calculation Engine with dynamic gross-to-net estimates updating in real-time as admins type salary and tax inputs",
      "INR-Base Multi-Currency Engine supporting INR ₹ (en-IN digit grouping), USD, EUR, GBP, AED, SGD with live exchange rate adjustments",
      "Print-Ready Payslip Generation with dedicated CSS @media print styling for 1-click clean PDF saving directly from the browser",
      "Full Employee Directory Lifecycle with unique constraints, profile editing, and cascade-deletion orphan cleanup",
    ],
    highlights: [
      "PostgreSQL (Neon) serverless database with connection recycling and pool_pre_ping",
      "Canonical INR base ledger preventing currency rounding drift and double conversion",
      "Live Gross-to-Net client-side estimator with automated tax and deduction computation",
      "Print-ready compensation payslips with print media styling requiring zero external PDF binaries",
      "Production deployment on Vercel Serverless Functions with Psycopg 3",
    ],
    impact:
      "Automated monthly employee compensation workflows and tax calculations with instant en-IN formatted currency conversion and print-ready payslips on serverless cloud infrastructure.",
    realVsSimulated:
      "Live serverless Python production application deployed on Vercel with Neon cloud PostgreSQL database and Psycopg 3 driver (https://payrollsystem-one.vercel.app/).",
    challenges: [
      {
        problem:
          "Hosting stateful SQLite writes on Vercel's read-only serverless filesystem caused database write crashes on cold starts.",
        solution:
          "Migrated to Neon serverless PostgreSQL via DATABASE_URL parsing with pool_pre_ping=True and pool_recycle=300 to survive serverless freeze cycles.",
      },
      {
        problem:
          "SQLAlchemy 2.1 driver mismatch expecting Psycopg v3 while connection URLs contained legacy parameters or channel_binding flags.",
        solution:
          "Configured psycopg[binary] driver compatibility and engineered robust URL sanitization to strip unsupported query flags.",
      },
      {
        problem:
          "Multi-currency rounding drift and double-conversion inconsistencies when calculating gross-to-net salary.",
        solution:
          "Architected a canonical INR-base ledger storing all values in INR (1.0) and dynamically computing multi-currency views at template render time.",
      },
      {
        problem:
          "Deleting employees with historical compensation records triggering foreign key constraint violations.",
        solution:
          "Enforced cascade='all, delete-orphan' on the Employee-to-SalaryRecord relationship to ensure clean referential integrity.",
      },
    ],
    links: {
      live: "https://payrollsystem-one.vercel.app/",
      repo: "https://github.com/Dhanush596/payrollsystem",
    },
  },
];
