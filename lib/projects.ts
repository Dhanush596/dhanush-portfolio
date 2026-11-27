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
  companyWebsites: 12,
  liveSites: 4,
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
    tagline: "Live luxury estate retreat reservation and guest booking website built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#34D399",
    accent2: "#14B8A6",
    features: [
      "Real-time guest booking inquiry and date availability validation",
      "Immersive coffee estate visual gallery and amenities tour",
      "Fast, responsive mobile navigation and local attraction guides",
    ],
    stack: ["React", "Node.js", "Express", "Tailwind CSS", "Vercel"],
    links: {
      live: "https://marichinhomestay.in/",
    },
  },
  {
    slug: "karnataka-kalyanothsava",
    title: "Karnataka Kalyanothsava",
    tagline: "Live regional matrimonial and cultural matchmaking platform built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#FB7185",
    accent2: "#FBBF24",
    features: [
      "Member onboarding, profile registration, and privacy-first discovery",
      "Cultural celebration schedules and event management portal",
      "Scalable relational data models ensuring zero service interruption",
    ],
    stack: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS"],
    links: {
      live: "https://karnatakakalyanothsava.com/",
    },
  },
  {
    slug: "alankarstyles",
    title: "Shringar Luxury (AlankarStyles)",
    tagline: "Luxury D2C ethnic fashion e-commerce platform with 3D virtual try-on studio and 14-module admin suite",
    category: "company",
    status: "live",
    backend: "full-stack",
    role: "Full-Stack Lead Developer / Architect",
    period: "Commercial Project (PrimePro.ai)",
    accent: "#D4AF37",
    accent2: "#800020",
    featured: true,
    stack: [
      "React 18",
      "Vite 8",
      "React Router DOM v6",
      "Three.js",
      "HTML5 Canvas API",
      "Recharts",
      "Lucide React",
      "Vanilla Modern CSS3",
      "React Context (Shop & Auth)",
      "Custom Mock Axios Adapter (mockBackend.js)",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT & Bcrypt",
      "RBAC",
      "Vercel",
    ],
    features: [
      "Curated Indian luxury fashion storefront featuring heirloom silks, bridal couture, sarees, and eyewear with 30 high-resolution canonical product records",
      "Interactive 3D Virtual Try-On Studio: 3D Canvas spectacles viewer with rotate, pan, and zoom controls paired with a virtual drape simulation preview",
      "Slide-over bag drawer with live subtotal calculation, coupon validation (WELCOME10, FESTIVE20, SHRINGAR500), and simulated payment gateways (Card, UPI, COD)",
      "Customer account hub with visual 4-stage tracking timeline (Order Placed -> Confirmed -> Shipped -> Delivered), saved addresses, and personal wishlist",
      "Floating AI Concierge assistant answering drape fabric queries and safe WhatsApp demo concierge pre-filled with couture inquiry text",
      "14-Module Enterprise Admin Suite: Real-time Recharts analytics (revenue area curves, sales velocity, order status donuts), product CRUD drawer, inventory stock indicators, and customer CRM",
      "Storefront Content Studio (CMS): Real-time editor allowing non-technical administrators to modify homepage headlines, hero banners, brand mottos, and policies without code changes",
      "Chronological audit logging, team RBAC (Super Admin, Admin, Catalog Manager, Customer), and 1-click pre-configured demo credentials",
    ],
    highlights: [
      "3D Virtual Try-On Studio with Three.js canvas controls and drape simulation",
      "14 full enterprise admin modules with Recharts data visualizations",
      "Dual-mode architecture: connects to MongoDB cluster or runs offline via mockBackend.js",
      "Automated startup cache purging for secure client data sanitization",
      "1-click demo login buttons for Executive Admin and Demo Customer",
    ],
    impact:
      "Delivered a zero-downtime luxury showcase on Vercel with instant 0ms cold starts, offline relational joins, and complete full-stack transaction persistence.",
    realVsSimulated:
      "Seamless Dual-Mode Execution: Production-grade React (Vite) + Node.js/Express + MongoDB architecture with a 1,300+ line in-browser mock backend engine (mockBackend.js + mockAxiosAdapter) that intercepts Axios requests and persists CRUD changes to localStorage for zero-cost static showcase deployment.",
    challenges: [
      {
        problem:
          "Hosting on free-tier cloud backends caused 50+ second cold-start delays or server inactivity shutdowns, degrading reviewer impressions.",
        solution:
          "Engineered an in-browser mock backend and network adapter (mockAxiosAdapter) with 1,300+ lines of TypeScript/JS supporting full relational CRUD, coupon math, and localStorage persistence.",
      },
      {
        problem:
          "Sanitizing sensitive commercial client information before publishing the public portfolio demonstration.",
        solution:
          "Designed an automated startup cache purging and migration routine that scrubs existing browser storage and seeds sanitized showcase models and demo credentials.",
      },
      {
        problem:
          "Delivering an interactive 3D virtual try-on experience without heavy computational overhead or sluggish page rendering.",
        solution:
          "Built an isolated Three.js canvas viewer with manual orbit controls and an HTML5 Canvas virtual drape preview that runs smoothly at 60 FPS.",
      },
    ],
    links: {
      live: "https://shringar-luxury.vercel.app/",
      repo: "https://github.com/Dhanush596/alankarstyles.git",
    },
  },
  {
    slug: "bangalore-32-vibes",
    title: "Bangalore 32 Vibes",
    tagline: "Live urban media portal and local entertainment directory built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    period: "2024 – 2025",
    accent: "#22D3EE",
    accent2: "#8B5CF6",
    features: [
      "Curated local nightlife, dining, and city culture guides",
      "High-speed single page architecture with lightweight bundle size",
      "Community discovery feeds and social media spotlight integration",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "Tailwind CSS"],
    links: {
      live: "https://bangalorevibes.in/",
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
    title: "Online Grocery Store E-Commerce Platform",
    tagline: "Full-featured grocery e-commerce platform with customer storefront and transactional admin portal",
    category: "internship",
    secondaryCategory: "bca",
    status: "practice",
    backend: "full-stack",
    role: "Full-Stack Development Intern, Encode Data Tech & BCA Capstone",
    period: "Apr 2024 – Jun 2024",
    accent: "#FB923C",
    accent2: "#F59E0B",
    featured: true,
    stack: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "XAMPP", "Apache"],
    features: [
      "Customer storefront with dynamic product catalog searching, category filtering, and cart logic",
      "Secure MySQL-backed transactional checkout system with order history tracking",
      "Role-based authentication dividing Admin management and customer shopping interfaces",
      "Admin order management workflow with live status updates: Ordered, Packed, On the way, Delivered",
      "Inventory management, stock adjustments, and product CRUD with image uploads",
    ],
    highlights: [
      "User authentication and role-based access control (Admin vs Customer)",
      "Dynamic product catalog searching and filtering mechanisms",
      "Secure MySQL-backed transactional checkout and cart system",
      "Optimized database schemas for reliable order handling",
      "Responsive frontend UI for seamless mobile shopping",
    ],
    impact:
      "Successfully delivered as both a verified industry internship platform at Encode Data Tech and the BCA final-year capstone project at Sharada Degree College.",
    realVsSimulated:
      "Full-stack relational architecture engineered with PHP and MySQL during the internship at Encode Data Tech, also serving as the BCA capstone showcase.",
    challenges: [
      {
        problem:
          "Managing relational database integrity during concurrent checkout transactions and maintaining secure session states.",
        solution:
          "Structured atomic database transactions in MySQL with foreign key constraints, session protection, and transactional rollbacks.",
      },
      {
        problem:
          "Admin updates to product stock and order statuses causing state desynchronization.",
        solution:
          "Standardized session-based authentication and centralized order processing controllers.",
      },
    ],
    links: {
      repo: "https://github.com/Dhanush596",
    },
  },

  // =========================================================================
  // 5. MCA PROJECTS
  // =========================================================================
  {
    slug: "mental-health-monitor",
    title: "Mental Health Monitor & Stress Detector",
    tagline: "Full-stack ML web application delivering real-time predictive stress indicators via multi-parameter inputs",
    category: "mca",
    status: "live",
    backend: "full-stack",
    role: "MCA Project Developer, Srinivas Institute of Technology",
    period: "2025 – 2026",
    accent: "#10B981",
    accent2: "#06B6D4",
    featured: true,
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Python",
      "Flask",
      "Scikit-learn",
      "MongoDB",
      "REST APIs",
      "Tailwind CSS",
      "Vercel",
    ],
    features: [
      "Real-time stress level prediction using machine learning classification models",
      "Multi-parameter input processing evaluating sleep patterns, physical activity, mood metrics, and cognitive workload",
      "Interactive analytics dashboard with dynamic stress trend graphs and personalized lifestyle recommendations",
      "RESTful API backend powered by Python Flask with serialized Scikit-learn inference pipeline",
      "High-performance client application built with React, Vite, and TypeScript",
    ],
    highlights: [
      "Real-time stress level prediction using machine learning models",
      "Multi-parameter input processing (sleep, exercise, mood, workload)",
      "Interactive dashboard with stress trend visualization",
      "RESTful API backend with Python Flask and Scikit-learn",
      "Responsive React UI with Vite build optimization",
    ],
    impact:
      "Achieved 87% prediction accuracy with sub-200ms response times, helping users identify and mitigate early stress patterns.",
    realVsSimulated:
      "Live production ML web application deployed on Vercel with Python backend processing real-time user lifestyle telemetry.",
    challenges: [
      {
        problem:
          "Balancing machine learning inference accuracy with low-latency client response requirements (<200ms).",
        solution:
          "Optimized model feature weights and serialized Scikit-learn inference pipelines, achieving 87% accuracy with sub-200ms response times.",
      },
      {
        problem:
          "Handling missing and extreme outlier values in self-reported user lifestyle data.",
        solution:
          "Developed an input validation and data imputation preprocessing stage in Flask to normalize values before inference.",
      },
    ],
    links: {
      live: "https://mental-health-monitor-rust.vercel.app",
      repo: "https://github.com/Dhanush596/mental-health-monitor.git",
    },
  },
  {
    slug: "ai-study-assistant",
    title: "AI-Powered Study Assistant",
    tagline: "Automated NLP text summarization and smart revision engine reducing student study time by 40%",
    category: "mca",
    status: "live",
    backend: "full-stack",
    role: "MCA Final Year Project Developer, Srinivas Institute of Technology",
    period: "2025 – 2026",
    accent: "#8B5CF6",
    accent2: "#EC4899",
    featured: true,
    stack: [
      "Python",
      "NLP",
      "Scikit-learn",
      "NLTK",
      "TF-IDF",
      "Flask",
      "React",
      "Text Summarization",
      "Vercel",
    ],
    features: [
      "Natural Language Processing (NLP) pipeline for tokenization, stop-word elimination, and sentence scoring",
      "TF-IDF extractive summarization extracting core conceptual sentences from dense textbooks",
      "Automatic keyphrase identification and concept relationship mapping",
      "Spaced Repetition System (SRS) algorithm to optimize retention review schedules",
      "Multi-format document input supporting pasted notes, research articles, and chapter text",
    ],
    highlights: [
      "Advanced NLP text preprocessing and tokenization",
      "TF-IDF based content summarization",
      "Automatic keyword extraction and concept mapping",
      "SRS (Spaced Repetition System) documentation",
      "Multi-format document support",
    ],
    impact:
      "Reduced student study time by 40% while maintaining conceptual comprehension through smart extractive summarization.",
    realVsSimulated:
      "Live cloud deployment on Vercel running NLP summarization pipelines that compress academic texts by 70% while preserving conceptual fidelity.",
    challenges: [
      {
        problem:
          "Maintaining semantic context and information density when condensing technical texts by 70%.",
        solution:
          "Combined TF-IDF term scoring with sentence position weighting in NLTK to retain high-information paragraphs without losing context.",
      },
      {
        problem:
          "Heavy text processing causing client timeouts on longer documents.",
        solution:
          "Chunked text preprocessing pipeline with asynchronous response handling and client-side summary caching.",
      },
    ],
    links: {
      live: "https://mca-project-beta.vercel.app",
      repo: "https://github.com/Dhanush596/MCAProject.git",
    },
  },

  // =========================================================================
  // 6. BCA PROJECTS
  // =========================================================================
  {
    slug: "intelligent-payroll-system",
    title: "Intelligent Payroll Management System",
    tagline: "Enterprise payroll system with salary forecasting regression models and anomaly detection",
    category: "bca",
    status: "practice",
    backend: "full-stack",
    role: "BCA Project Developer, Sharada Degree College",
    period: "2023 – 2024",
    accent: "#3B82F6",
    accent2: "#10B981",
    featured: true,
    stack: ["Python", "Pandas", "Scikit-learn", "MySQL", "SQL", "Data Analysis"],
    features: [
      "Automated payroll computation supporting tiered tax deductions, bonuses, and overtime calculations",
      "Linear regression models for forecasting department salary trends and compensation budgeting",
      "Statistical anomaly detection alerting against irregular hours, payroll variance, and fraud indicators",
      "Normalized MySQL relational schema ensuring data integrity and transactional consistency",
      "Comprehensive reporting module generating executive payroll summaries and audit trails",
    ],
    highlights: [
      "Automated payroll calculation and processing",
      "Salary forecasting using linear regression models",
      "Anomaly detection for fraud prevention",
      "SQL database optimization for large datasets",
      "Comprehensive reporting and analytics",
    ],
    impact:
      "Reduced payroll processing time by 65% and improved calculation accuracy to 99.8% across large employee datasets.",
    realVsSimulated:
      "Full-stack Python & MySQL analytics application developed during BCA coursework at Sharada Degree College, demonstrating statistical regression and relational schema design.",
    challenges: [
      {
        problem:
          "Complex multi-tier tax and deduction rules causing logic conflicts and edge-case errors.",
        solution:
          "Engineered a modular, rule-based calculation engine with dedicated unit tests validating deductions across compensation brackets.",
      },
      {
        problem:
          "Slow query execution when compiling multi-year departmental expense aggregations.",
        solution:
          "Optimized relational indexing and created materialized SQL summary views, cutting report execution latency by 65%.",
      },
    ],
    links: {
      repo: "https://github.com/Dhanush596",
    },
  },
];
