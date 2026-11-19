export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'Live Product' | 'Full-Stack' | 'Cloud-Native';
  url: string;
  githubUrl?: string;
  techStack: string[];
  gradient: string;
  borderGlow: string;
  highlightMetric?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: 'Full-time' | 'Internship';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  file: string;
  category: 'Cloud' | 'AI & ML' | 'Development' | 'Security';
}

export interface SkillCategory {
  category: string;
  description: string;
  items: {
    name: string;
    level: string;
    tag?: string;
  }[];
}

export const PERSONAL_INFO = {
  name: 'Dhanush A',
  title: 'Software Engineer',
  rotatingTitles: [
    'Full-Stack Developer',
    'Cloud-Native Engineer',
    'GitOps and IaC',
  ],
  headline: 'Dhanush A, Software Engineer',
  subline: 'I build full-stack web apps and the cloud pipelines that ship them.',
  resumePdf: '/resume/Dhanush_A_Resume.pdf',
  email: 'adhanush596@gmail.com',
  github: 'https://github.com/dhanusha-png',
  linkedin: 'https://linkedin.com/in/dhanush-a',
};

export const STATS = [
  { value: 12, label: 'Websites Built', suffix: '' },
  { value: 4, label: 'Live in Production', suffix: '' },
  { value: 2, label: 'Internships Completed', suffix: '' },
  { value: 8, label: 'Certifications', suffix: '+' },
];

export const LIVE_SITES: Project[] = [
  {
    id: 'marichin-homestay',
    title: 'Marichin Homestay',
    slug: 'marichin-homestay',
    description: 'Nature Coffee Estate Retreat in Kushalnagar, Coorg. Complete booking system, accommodation showcases, and real-time reservation workflow.',
    category: 'Live Product',
    url: 'https://marichinhomestay.in/',
    techStack: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Render'],
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderGlow: 'hover:border-emerald-400/50',
    highlightMetric: 'Live Commercial Booking',
  },
  {
    id: 'karnataka-kalyanothsava',
    title: 'Karnataka Kalyanothsava',
    slug: 'karnataka-kalyanothsava',
    description: 'Premier matrimonial and cultural matchmaking platform serving regional wedding registrations, profile matchmaking, and events.',
    category: 'Live Product',
    url: 'https://karnatakakalyanothsava.com/',
    techStack: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderGlow: 'hover:border-amber-400/50',
    highlightMetric: 'Active Community Platform',
  },
  {
    id: 'alankar-fashion',
    title: 'Alankar Fashion',
    slug: 'alankar-fashion',
    description: 'Modern e-commerce platform for ethnic sarees, designer apparel, spectacles, and optical wear with dynamic product catalogs.',
    category: 'Live Product',
    url: 'https://alankarfashion.in/',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    borderGlow: 'hover:border-rose-400/50',
    highlightMetric: 'High-Conversion E-Commerce',
  },
  {
    id: 'bangalore-vibes',
    title: 'Bangalore Vibes',
    slug: 'bangalore-vibes',
    description: 'Dynamic city media portal, entertainment directory, and event hub celebrating Bangalore nightlife, community culture, and local businesses.',
    category: 'Live Product',
    url: 'https://bangalorevibes.in/',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express'],
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    borderGlow: 'hover:border-purple-400/50',
    highlightMetric: 'Fast City Media Platform',
  },
];

export const WHAT_I_DO = [
  {
    id: 'full-stack',
    title: 'Full-Stack Engineering',
    subtitle: 'From pixel-perfect UIs to robust APIs',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
    accent: '#22D3EE',
    accent2: '#8B5CF6',
    description:
      'Designing performant, scalable, and intuitive web applications. Clean architecture across client states, backend REST APIs, authentication, and database schemas.',
    highlights: [
      'Modern Single-Page & SSR Applications (React, Next.js)',
      'Secure, typed REST APIs & Microservices (Node.js, Express)',
      'Scalable NoSQL & Relational Datastores (MongoDB, MySQL)',
      'Responsive, accessible design systems with Tailwind CSS',
    ],
  },
  {
    id: 'cloud-native',
    title: 'Cloud-Native & DevOps',
    subtitle: 'Automated CI/CD, Containerization & IaC',
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'ArgoCD', 'GitHub Actions'],
    accent: '#4ADE80',
    accent2: '#3B82F6',
    description:
      'Architecting resilient cloud infrastructure, continuous deployment pipelines, and immutable deployments with GitOps best practices.',
    highlights: [
      'Containerization & Multi-Stage Builds (Docker)',
      'Container Orchestration & Cluster Management (Kubernetes)',
      'Infrastructure as Code (Terraform)',
      'GitOps Continuous Delivery & Automation (ArgoCD, GitHub Actions)',
    ],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    role: 'Web & App Developer',
    company: 'PrimePro.ai',
    period: 'Sep 2026 – Present',
    type: 'Full-time',
    description:
      'Architecting and deploying full-scale client web applications and high-performance digital solutions across varied industry verticals.',
    achievements: [
      'Engineered and delivered 12 production-ready websites and web applications.',
      'Implemented full-stack architectures integrating modern frontends with backend APIs and cloud hosting.',
      'Maintained uptime, optimized page load speeds, and delivered custom client requirements.',
    ],
    skills: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Cloud Deployment'],
  },
  {
    role: 'DevOps Intern',
    company: 'Rooman Technologies',
    period: 'Feb 2026 – May 2026',
    type: 'Internship',
    description:
      'Hands-on experience in containerization, infrastructure provisioning, and continuous deployment workflows.',
    achievements: [
      'Constructed CI/CD automation pipelines utilizing GitHub Actions.',
      'Configured containerized environments with Docker and container orchestration via Kubernetes.',
      'Worked with declarative infrastructure provisioning using Terraform and GitOps paradigms.',
    ],
    skills: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux', 'CI/CD'],
  },
  {
    role: 'Full-Stack Development Intern',
    company: 'Encode Data Tech',
    period: 'Apr 2024 – Jun 2024',
    type: 'Internship',
    description:
      'Designed and developed end-to-end web modules for commercial web applications and digital commerce.',
    achievements: [
      'Engineered a complete online grocery platform with product listings, cart logic, and order placement.',
      'Implemented responsive client interfaces and robust backend data processing with MySQL database storage.',
      'Collaborated on database query optimization and API request-response validation.',
    ],
    skills: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Full-Stack Development'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-cloud',
    title: 'Cloud Computing',
    issuer: 'Professional Certification',
    file: '/Certificates/CloudComputing.pdf',
    category: 'Cloud',
  },
  {
    id: 'cert-google-aiml',
    title: 'AI & Machine Learning',
    issuer: 'Google',
    file: '/Certificates/AI-MLGoogle.pdf',
    category: 'AI & ML',
  },
  {
    id: 'cert-aws-aiml',
    title: 'AI & Machine Learning',
    issuer: 'AWS',
    file: '/Certificates/AI-MLaws.pdf',
    category: 'AI & ML',
  },
  {
    id: 'cert-adv-python',
    title: 'Advanced Python Programming',
    issuer: 'Professional Certification',
    file: '/Certificates/AdvancedPythonProgramming.pdf',
    category: 'Development',
  },
  {
    id: 'cert-ml-python',
    title: 'Machine Learning with Python',
    issuer: 'Professional Certification',
    file: '/Certificates/MachineLearningWithPython.pdf',
    category: 'AI & ML',
  },
  {
    id: 'cert-html5',
    title: 'HTML5 Application Development',
    issuer: 'Professional Certification',
    file: '/Certificates/HTML5ApplicationDevelopment.pdf',
    category: 'Development',
  },
  {
    id: 'cert-ethical-hacking',
    title: 'Ethical Hacking',
    issuer: 'Cybersecurity Certification',
    file: '/Certificates/Ethical Hacking.pdf',
    category: 'Security',
  },
  {
    id: 'cert-it-skills',
    title: 'Advanced IT Skill Training',
    issuer: 'Professional Certification',
    file: '/Certificates/Advanced_IT_Skill_Training_Certificate.pdf',
    category: 'Development',
  },
  {
    id: 'cert-research-ipr',
    title: 'Research Methodologies & IPR',
    issuer: 'Academic Certification',
    file: '/Certificates/ResearchMethodologiesAndIPR.pdf',
    category: 'Development',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend Engineering',
    description: 'Component architecture, responsive layouts & interactive animations',
    items: [
      { name: 'React', level: 'Advanced', tag: 'Core' },
      { name: 'Next.js (App Router)', level: 'Advanced', tag: 'Core' },
      { name: 'TypeScript', level: 'Advanced', tag: 'Language' },
      { name: 'Tailwind CSS', level: 'Advanced', tag: 'Styling' },
      { name: 'Framer Motion', level: 'Proficient', tag: 'Animation' },
      { name: 'Three.js / React Three Fiber', level: 'Intermediate', tag: '3D/WebGL' },
      { name: 'HTML5 & CSS3', level: 'Advanced', tag: 'Foundation' },
    ],
  },
  {
    category: 'Backend & Databases',
    description: 'API design, server architecture, business logic & data modeling',
    items: [
      { name: 'Node.js', level: 'Advanced', tag: 'Runtime' },
      { name: 'Express', level: 'Advanced', tag: 'Framework' },
      { name: 'MongoDB', level: 'Advanced', tag: 'NoSQL' },
      { name: 'MySQL', level: 'Proficient', tag: 'SQL' },
      { name: 'RESTful APIs', level: 'Advanced', tag: 'Architecture' },
      { name: 'PHP', level: 'Intermediate', tag: 'Backend' },
      { name: 'Python', level: 'Proficient', tag: 'Language' },
    ],
  },
  {
    category: 'Cloud-Native & DevOps',
    description: 'Infrastructure automation, containerization & continuous delivery',
    items: [
      { name: 'Docker', level: 'Proficient', tag: 'Containers' },
      { name: 'Kubernetes', level: 'Proficient', tag: 'Orchestration' },
      { name: 'Terraform', level: 'Proficient', tag: 'IaC' },
      { name: 'ArgoCD', level: 'Proficient', tag: 'GitOps' },
      { name: 'GitHub Actions', level: 'Proficient', tag: 'CI/CD' },
      { name: 'Linux', level: 'Proficient', tag: 'OS' },
      { name: 'Git & GitHub', level: 'Advanced', tag: 'VCS' },
    ],
  },
];
