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
  score?: string;
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

export interface AcademicDocument {
  id: string;
  title: string;
  degree: string;
  institution?: string;
  boardOrUniversity?: string;
  period?: string;
  grade?: string;
  description: string;
  projects?: string[];
  documents: {
    label: string;
    file: string;
    type: 'Semester Markscard' | 'Consolidated' | 'Board Certificate';
  }[];
}

export interface InternshipDocument {
  id: string;
  role: string;
  company: string;
  period: string;
  score?: string;
  certificateFile: string;
  description: string;
  skills: string[];
  project?: string;
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
    company: 'Rooman Technologies Ltd.',
    period: 'Feb 2026 – May 2026',
    type: 'Internship',
    score: '100/100',
    description:
      'Hands-on enterprise experience in containerization, infrastructure provisioning, and continuous deployment workflows. Achieved a perfect 100/100 score in DevOps engineering assessment.',
    achievements: [
      'Engineered the MERN GitOps CI/CD Pipeline Architecture (DevStream) with ArgoCD & K3s.',
      'Constructed CI/CD automation pipelines utilizing GitHub Actions with Trivy security scanning.',
      'Orchestrated repeatable cloud infrastructure using Terraform Infrastructure-as-Code (IaC) and Ansible on AWS EC2.',
      'Configured containerized microservices with Docker multi-stage builds and Kubernetes pod auto-scaling.',
    ],
    skills: ['Terraform', 'Ansible', 'Docker', 'Kubernetes K3s', 'ArgoCD', 'GitOps', 'AWS EC2', 'GitHub Actions', 'Trivy'],
  },
  {
    role: 'Full-Stack Development Intern',
    company: 'Encode Data Tech',
    period: 'Apr 2024 – Jun 2024',
    type: 'Internship',
    description:
      'Designed and developed end-to-end commercial web modules and digital commerce platforms in Agile sprint cycles.',
    achievements: [
      'Engineered the Online Grocery Store E-Commerce Platform with dynamic product catalog, shopping cart, and transactional checkout.',
      'Implemented responsive client interfaces with TypeScript, React, and PHP backends.',
      'Structured normalized MySQL relational database schemas with atomic order processing.',
      'Managed Git collaborative workflows and participated in bi-weekly sprint releases.',
    ],
    skills: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'React', 'Node.js', 'Express', 'Agile'],
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

export const INTERNSHIP_CREDENTIALS: InternshipDocument[] = [
  {
    id: 'intern-rooman',
    role: 'DevOps Engineering Intern',
    company: 'Rooman Technologies Ltd.',
    period: 'Feb 2026 – May 2026',
    score: '100/100',
    project: 'MERN GitOps CI/CD Pipeline Architecture',
    certificateFile: '/Certificates/InternshipCompletionCertificate.pdf',
    description:
      'Verified internship completion in containerized deployment, CI/CD pipeline automation with GitHub Actions, Kubernetes clustering (K3s), Terraform infrastructure as code, and ArgoCD GitOps. Built the MERN GitOps CI/CD Pipeline Architecture (DevStream) and achieved a perfect 100/100 evaluation score.',
    skills: ['Terraform', 'Ansible', 'Docker', 'Kubernetes K3s', 'ArgoCD', 'GitOps', 'AWS EC2', 'GitHub Actions', 'Trivy'],
  },
  {
    id: 'intern-encode',
    role: 'Full-Stack Development Intern',
    company: 'Encode Data Tech',
    period: 'Apr 2024 – Jun 2024 (2 Months)',
    project: 'Online Grocery Store E-Commerce Platform',
    certificateFile: '/Certificates/FullStackInternship.pdf',
    description:
      'Verified internship completion designing and engineering a full-stack digital commerce web application, API integrations, and MySQL relational database management. Engineered the Online Grocery Store platform across two months in an Agile sprint environment.',
    skills: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'React', 'Node.js', 'Express', 'Agile'],
  },
];

export const ACADEMIC_CREDENTIALS: AcademicDocument[] = [
  {
    id: 'acad-mca',
    title: 'Master of Computer Applications (MCA)',
    degree: 'MCA',
    institution: 'Srinivas Institute of Technology, Mangalore',
    boardOrUniversity: 'Visvesvaraya Technological University (VTU)',
    period: '2024 – 2026',
    description:
      'Postgraduate degree curriculum in software engineering, cloud architecture, system design, data structures, and enterprise applications. Specialized in Cloud-Native Engineering & AI.',
    projects: [
      'Mental Health Monitor & Stress Detector (ML predictive system)',
      'AI-Powered Study Assistant (NLP text summarization on Vercel)',
    ],
    documents: [
      { label: 'MCA Semester 1 Markscard', file: '/Certificates/MCAsem1.pdf', type: 'Semester Markscard' },
      { label: 'MCA Semester 2 Markscard', file: '/Certificates/MCAsem2.pdf', type: 'Semester Markscard' },
      { label: 'MCA Semester 3 Markscard', file: '/Certificates/MCAsem3.pdf', type: 'Semester Markscard' },
      { label: 'MCA Semester 4 Markscard', file: '/Certificates/MCAsem4.pdf', type: 'Semester Markscard' },
    ],
  },
  {
    id: 'acad-bca',
    title: 'Bachelor of Computer Applications (BCA)',
    degree: 'BCA',
    institution: 'Sharada Degree College, Mangalore',
    boardOrUniversity: 'Undergraduate Computer Applications',
    period: '2021 – 2024',
    grade: 'CGPA: 8.2',
    description:
      'Comprehensive undergraduate study in core computer science, software programming, web development, object-oriented paradigms, and database management systems. Graduated with 8.2 CGPA and built production-grade web systems.',
    projects: [
      'Online Grocery Store E-Commerce Platform (Full-Stack PHP/MySQL)',
      'Intelligent Payroll Management System (Python/Data Analysis)',
    ],
    documents: [
      { label: 'BCA Consolidated All-Semesters', file: '/Certificates/all-sem.pdf', type: 'Consolidated' },
      { label: 'BCA Semester 1 Markscard', file: '/Certificates/Sem1.pdf', type: 'Semester Markscard' },
      { label: 'BCA Semester 2 Markscard', file: '/Certificates/Sem2.pdf', type: 'Semester Markscard' },
      { label: 'BCA Semester 3 Markscard', file: '/Certificates/Sem3.pdf', type: 'Semester Markscard' },
      { label: 'BCA Semester 4 Markscard', file: '/Certificates/Sem4.pdf', type: 'Semester Markscard' },
      { label: 'BCA Semester 5 Markscard', file: '/Certificates/Sem5.pdf', type: 'Semester Markscard' },
      { label: 'BCA Semester 6 Markscard', file: '/Certificates/Sem6.pdf', type: 'Semester Markscard' },
    ],
  },
  {
    id: 'acad-puc',
    title: 'Pre-University Course (PUC)',
    degree: '1st & 2nd PUC — Science',
    institution: 'Parignana PU College',
    boardOrUniversity: 'Department of Pre-University Education, Karnataka',
    period: '2019 – 2021',
    description:
      'Higher secondary pre-university coursework in PCMC (Physics, Chemistry, Mathematics, and Computer Science) with foundational analytics and algorithmic thinking.',
    documents: [
      { label: '1st PUC Markscard', file: '/Certificates/1stpuc.pdf', type: 'Semester Markscard' },
      { label: '2nd PUC Markscard', file: '/Certificates/2ndpuc.pdf', type: 'Board Certificate' },
    ],
  },
  {
    id: 'acad-10th',
    title: 'Secondary School Examination (SSLC / 10th)',
    degree: '10th Standard',
    institution: 'National Institute of Open Schooling (NIOS)',
    boardOrUniversity: 'National Institute of Open Schooling',
    period: '2019',
    description:
      'Secondary school examination certification with foundational disciplines in Mathematics, Science, and Computing.',
    documents: [
      { label: '10th Standard / SSLC Markscard', file: '/Certificates/10th.pdf', type: 'Board Certificate' },
    ],
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
