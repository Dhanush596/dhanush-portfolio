export type Category = "company" | "internship" | "mca" | "bca" | "practice";
export type Status = "live" | "realtime" | "practice";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  status?: Status;
  backend?: "full-stack" | "simulated-api";
  role: string;
  period?: string;
  stack: string[];
  features: string[];
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
  // 1. PRACTICE PROJECTS
  {
    slug: "primepro-platform",
    title: "PrimePro Platform",
    tagline: "Full-stack digital product engineering showcase platform",
    category: "practice",
    status: "practice",
    backend: "full-stack",
    role: "Solo developer",
    accent: "#00F0FF",
    accent2: "#A855F7",
    featured: true,
    stack: [
      "React 18",
      "TypeScript",
      "Vite 6",
      "React Router 6",
      "Express",
      "MongoDB Atlas",
      "Mongoose",
      "npm workspaces",
      "Vercel",
    ],
    features: [
      "Unified monorepo with a React SPA and a serverless Express API",
      "Alternating dark and bright section design",
      "Interactive 3D device mockups",
      "Teardowns of 30+ well-known apps",
      "Fallback showcase data so the UI never renders empty",
      "Security middleware (Helmet, rate limiting at 100 requests per 15 minutes, CORS whitelist, Mongo sanitization)",
    ],
    realVsSimulated:
      "Full-stack: Express API with MongoDB Atlas. The UI also ships fallback showcase data so pages never render empty during a database cold start.",
    challenges: [
      {
        problem:
          "Vercel could not find the build output of the monorepo (client/dist instead of root dist).",
        solution:
          "Wrote a custom build script that builds the client and syncs the output to root dist, and configured vercel.json with an explicit output directory and rewrites.",
      },
      {
        problem:
          "Unpinned dependencies installed React 19 next to libraries built for React 18, causing a production white screen (React error 525).",
        solution:
          "Pinned React 18.3.1 with npm overrides, locked the type packages and deduplicated react in the Vite config.",
      },
      {
        problem: "Every serverless invocation opened a new MongoDB connection.",
        solution:
          "Cached the connection promise so warm invocations reuse the existing connection.",
      },
      {
        problem: "Cold starts and empty seed data left blank areas on the page.",
        solution:
          "Added fallback data in a React Context layer that updates once the API responds.",
      },
    ],
    links: {
      live: "https://prime-pro-u4b9-taupe.vercel.app",
      repo: "https://github.com/Dhanush596/PrimePro",
    },
  },
  {
    slug: "auravault",
    title: "AuraVault",
    tagline: "Warranty tracking and claim workflow app with a zero-signup demo",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Solo developer",
    accent: "#6366F1",
    accent2: "#14B8A6",
    featured: true,
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router 7",
      "Framer Motion",
      "TanStack Query",
      "Express",
      "MongoDB",
      "JWT",
    ],
    features: [
      "Warranty calculator, checklist and policy builder tools",
      "Searchable knowledge directory",
      "Dashboard with a warranty health gauge",
      "Claims pipeline (Submitted, Under Review, Approved, In Repair, Resolved)",
      "Maintenance scheduler",
      "Reports",
      "Role-based admin console",
      "Four switchable demo personas (Family Organizer, Power User, Field Technician, System Administrator)",
    ],
    realVsSimulated:
      "The live demo runs entirely in the browser with localStorage and mock data, and receipt OCR is simulated. The repository also contains an Express, MongoDB and JWT backend.",
    challenges: [
      {
        problem:
          "Reviewers should be able to try the whole app without signing up or waiting for a backend.",
        solution:
          "Decoupled data access with TanStack Query and built an in-browser state engine that persists changes and switches between four personas instantly.",
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
    tagline: "Cake e-commerce storefront with a visual page-builder CMS",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Solo developer",
    accent: "#F472B6",
    accent2: "#FBBF24",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "React Router 7",
      "Tailwind CSS 4",
      "Zustand",
      "Framer Motion",
      "Three.js",
      "React Three Fiber",
      "Express",
      "MongoDB",
    ],
    features: [
      "Catalog of 135+ products",
      "Filters for flavour, occasion, diet and price",
      "Weight selection with live pricing",
      "Cart drawer with coupon codes",
      "Order tracking",
      "Admin dashboard",
      "Visual page builder to reorder and hide storefront sections",
      "Product CRUD",
      "Coupons and flash sales",
      "Media library",
    ],
    realVsSimulated:
      "The live site runs on a client-side mock API persisted in localStorage. The repository also contains an Express and MongoDB backend.",
    challenges: [
      {
        problem:
          "A public deployment was needed without paying for or maintaining a live database server.",
        solution:
          "Built a mock database and API interceptor that loads data into memory and syncs it with localStorage.",
      },
      {
        problem: "Refreshing on deep links returned 404 on Vercel.",
        solution: "Added a catch-all rewrite to index.html in vercel.json.",
      },
      {
        problem: "Some third-party image URLs had expired.",
        solution:
          "Wrote a script that checks every image URL with HTTP HEAD requests, found 11 broken ones and replaced them.",
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
    tagline: "South Indian foods store with a customer storefront and admin portal",
    category: "practice",
    status: "practice",
    backend: "simulated-api",
    role: "Solo developer",
    accent: "#68145B",
    accent2: "#F59E0B",
    stack: ["React 19", "Vite 7", "React Router 7", "Custom CSS", "Lucide icons"],
    features: [
      "Product pages with pack sizes, ingredients and nutrition",
      "Persistent cart and Buy Now flow",
      "Coupon checkout with free delivery above Rs. 999",
      "Order tracking",
      "Admin KPI dashboard, inventory CRUD, order status and courier updates, review moderation, audit log",
      "One-click Reset Demo Data and a Customer/Admin role switcher",
    ],
    realVsSimulated:
      "All data lives in the browser (localStorage) behind a simulated REST layer, so the demo has no server to wake up.",
    challenges: [
      {
        problem:
          "Free-tier backends often cold-start for a long time, so reviewers may leave before the app loads.",
        solution:
          "Built an in-browser database with an Axios-style mock API that adds a small async delay, so loading states still behave realistically.",
      },
      {
        problem: "Admin edits must show up in the storefront immediately.",
        solution: "Both roles read and write the same state layer.",
      },
    ],
    links: {
      live: "https://puliyogare.vercel.app/",
      repo: "https://github.com/Dhanush596/Puliyogare",
    },
  },

  // 2. COMPANY - LIVE (status "live")
  {
    slug: "marichin-homestay",
    title: "Marichin Homestay",
    tagline: "Live website built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    accent: "#34D399",
    accent2: "#14B8A6",
    features: [],
    stack: [],
    links: {
      live: "https://marichinhomestay.in/",
    },
  },
  {
    slug: "karnataka-kalyanothsava",
    title: "Karnataka Kalyanothsava",
    tagline: "Live website built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    accent: "#FB7185",
    accent2: "#FBBF24",
    features: [],
    stack: [],
    links: {
      live: "https://karnatakakalyanothsava.com/",
    },
  },
  {
    slug: "alankarstyles",
    title: "AlankarStyles",
    tagline: "Live website built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    accent: "#A78BFA",
    accent2: "#F472B6",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    features: [
      "Product and catalog management",
      "Admin dashboard",
      "Image storage",
      "Orders, customers and reviews",
      "Responsive UI",
    ],
    links: {
      live: "https://alankarfashion.in/",
    },
  },
  {
    slug: "bangalore-32-vibes",
    title: "Bangalore 32 Vibes",
    tagline: "Live website built at PrimePro.ai",
    category: "company",
    status: "live",
    role: "Developer, PrimePro.ai",
    accent: "#22D3EE",
    accent2: "#8B5CF6",
    features: [],
    stack: [],
    links: {
      live: "https://bangalorevibes.in/",
    },
  },

  // 3. COMPANY - REAL-TIME (status "realtime")
  {
    slug: "yohan-travels",
    title: "Yohan Travels",
    tagline: "Real-time project built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#38BDF8",
    accent2: "#F59E0B",
    features: [],
    stack: [],
    links: {},
  },
  {
    slug: "mahanya-furniture-interiors",
    title: "Mahanya Furniture & Interiors",
    tagline: "Real-time project built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#C2873A",
    accent2: "#78350F",
    features: [],
    stack: [],
    links: {},
  },
  {
    slug: "sports-spot",
    title: "Sports Spot",
    tagline: "Real-time project built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#22C55E",
    accent2: "#3B82F6",
    features: [],
    stack: [],
    links: {},
  },
  {
    slug: "security-service",
    title: "Security Service",
    tagline: "Real-time project built at PrimePro.ai",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#60A5FA",
    accent2: "#334155",
    features: [],
    stack: [],
    links: {},
  },
  {
    slug: "rangu-colour-of-print",
    title: "Rangu – Colour of Print",
    tagline: "Printing business website with product and service showcase",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#EC4899",
    accent2: "#06B6D4",
    features: [
      "Product and service showcase",
      "Responsive UI with custom branding",
      "Admin management",
    ],
    stack: [],
    links: {},
  },
  {
    slug: "madanna-enterprises",
    title: "Madanna Enterprises (G.K. Foods)",
    tagline: "Food products and industrial services platform",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#EAB308",
    accent2: "#16A34A",
    features: [
      "Product catalog for food products and industrial services",
      "Admin dashboard",
      "Responsive product management",
    ],
    stack: [],
    links: {},
  },
  {
    slug: "sri-seetarama",
    title: "Sri Seetarama",
    tagline: "Business and e-commerce website",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#F97316",
    accent2: "#DC2626",
    features: [
      "Product and service presentation",
      "Structured content with customer-focused navigation",
      "Management features",
      "Responsive UI",
    ],
    stack: [],
    links: {},
  },
  {
    slug: "hanger-commerce",
    title: "Hanger Commerce",
    tagline: "Hangers and shoe-rack e-commerce website",
    category: "company",
    status: "realtime",
    role: "Developer, PrimePro.ai",
    accent: "#8B5CF6",
    accent2: "#14B8A6",
    features: [
      "Product catalog and gallery",
      "Wishlist",
      "Services and customer reviews",
      "Chatbot",
      "Responsive UI",
    ],
    stack: [],
    links: {},
  },

  // 4. INTERNSHIP (no status, show only its Internship category badge)
  {
    slug: "online-grocery-store",
    title: "Online Grocery Store",
    tagline: "Grocery shopping site with separate customer and admin sides",
    category: "internship",
    backend: "full-stack",
    role: "Full-Stack Development Intern, Encode Data Tech",
    period: "Apr 2024 – Jun 2024",
    accent: "#FB923C",
    accent2: "#F59E0B",
    stack: ["PHP", "JavaScript", "HTML", "CSS", "MySQL", "XAMPP"],
    features: [
      "Customer storefront with product browsing and cart-based shopping",
      "Admin panel for order management with status updates: Ordered, Packed, On the way, Delivered",
      "User management",
    ],
    realVsSimulated:
      "Built during the internship and run locally on XAMPP. Not publicly hosted.",
    links: {},
  },
];
