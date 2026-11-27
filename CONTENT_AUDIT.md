# Complete Content Audit & Preservation Verification

This document verifies that **100% of all personal data, metrics, experiences, academic credentials, certifications, and project case studies** from `lib/data.ts` and `lib/projects.ts` are preserved and active across the consolidated single-page acts on the site.

---

## 1. Personal Information (`lib/data.ts`)

| Data Field | Stored Value | Location in Redesign | Status |
| :--- | :--- | :--- | :--- |
| **`name`** | `"Dhanush A"` | Hero headline, Splash intro, TopBar pill, Journey profile, MegaFooter wordmark | **Preserved (100%)** |
| **`title`** | `"Software Engineer"` | Hero, TopBar, Journey profile, Metadata | **Preserved (100%)** |
| **`rotatingTitles`** | `["Full-Stack Developer", "Cloud-Native Engineer", "GitOps and IaC"]` | Hero rotating typography (`RotatingWords.tsx`) | **Preserved (100%)** |
| **`headline`** | `"Dhanush A, Software Engineer"` | Act 01 Hero headline with staggered word animation | **Preserved (100%)** |
| **`subline`** | `"I build full-stack web apps and the cloud pipelines that ship them."` | Act 01 Hero body description | **Preserved (100%)** |
| **`resumePdf`** | `"/resume/Dhanush_A_Resume.pdf"` | TopBar Resume pill, Contact download button, MegaFooter sitemap, Command Palette, `/resume` redirect | **Preserved (100%)** |
| **`email`** | `"adhanush596@gmail.com"` | Act 05 Contact letter-by-letter wave link, Copy button, TopBar "Let's build" mailto, MegaFooter | **Preserved (100%)** |
| **`github`** | `"https://github.com/dhanusha-png"` | MegaFooter Elsewhere, Command Palette | **Preserved (100%)** |
| **`linkedin`** | `"https://linkedin.com/in/dhanush-a"` | MegaFooter Elsewhere | **Preserved (100%)** |

---

## 2. Global Metrics (`lib/data.ts -> STATS`)

| Metric | Stored Value | Display Location in Redesign | Status |
| :--- | :--- | :--- | :--- |
| **Websites Built** | `12` | Act 01 "Receipts, not vibes" ProofStrip (`TiltCard` 1 with count-up) | **Preserved (100%)** |
| **Live in Production** | `4` | Act 01 ProofStrip (`TiltCard` 2) + Act 02 `LiveDeck` (4 fanned cards) | **Preserved (100%)** |
| **Internships Completed**| `2` | Act 01 ProofStrip (`TiltCard` 3) + Act 03 Timeline (Rooman & Encode) | **Preserved (100%)** |
| **Certifications** | `9+` | Act 01 ProofStrip (`TiltCard` 4) + Act 04 `CertPile` (all verified PDFs) | **Preserved (100%)** |

---

## 3. Commercial Live Deployments (`lib/data.ts -> LIVE_SITES`)

| Live Site ID | URL | Key Features & Stack | Where Shown in Redesign | Status |
| :--- | :--- | :--- | :--- | :--- |
| **`marichin-homestay`** | `https://marichinhomestay.in/` | React, Node.js, Express, Tailwind CSS, Render | Act 02 `LiveDeck` (Card 1), MegaFooter uptime bar, WorkIndex | **Preserved (100%)** |
| **`karnataka-kalyanothsava`** | `https://karnatakakalyanothsava.com/` | Next.js, React, Tailwind CSS, Node.js, MongoDB | Act 02 `LiveDeck` (Card 2), MegaFooter uptime bar, WorkIndex | **Preserved (100%)** |
| **`alankar-fashion`** | `https://alankarfashion.in/` | React, Node.js, Express, MongoDB, Tailwind CSS | Act 02 `LiveDeck` (Card 3), MegaFooter uptime bar, WorkIndex | **Preserved (100%)** |
| **`bangalore-vibes`** | `https://bangalorevibes.in/` | React, Vite, Tailwind CSS, Node.js, Express | Act 02 `LiveDeck` (Card 4), MegaFooter uptime bar, WorkIndex | **Preserved (100%)** |

---

## 4. Career History & Internships (`lib/data.ts -> EXPERIENCES`)

| Role & Organization | Period & Score | Key Achievements Preserved | Location in Redesign | Status |
| :--- | :--- | :--- | :--- | :--- |
| **PrimePro.ai** (Web & App Developer) | Sep 2026 – Present (Full-time) | 12 production-ready websites built, cloud hosting, speed optimization | Act 03 `Timeline` (Card 1), MegaFooter "Now" column | **Preserved (100%)** |
| **Rooman Technologies Ltd.** (DevOps Intern) | Feb 2026 – May 2026 · **Score: 100/100** | MERN GitOps pipeline with ArgoCD, K3s, Terraform, Docker, Trivy | Act 03 `Timeline` (Card 2 with Score badge), Act 04 `CertPile` | **Preserved (100%)** |
| **Encode Data Tech** (Full-Stack Intern) | Apr 2024 – Jun 2024 · 2 Months | Online Grocery Store e-commerce platform, React, PHP, MySQL schemas | Act 03 `Timeline` (Card 3), Act 04 `CertPile` | **Preserved (100%)** |

---

## 5. Academic Degrees & Verified Documents (`lib/data.ts -> ACADEMIC_CREDENTIALS`)

| Degree Program | Institution / University | Dates & Metrics | Verified Document Links Preserved | Location in Redesign |
| :--- | :--- | :--- | :--- | :--- |
| **Master of Computer Applications (MCA)** | Srinivas Institute of Technology, Mangalore (VTU) | 2024 – 2026 · Cloud-Native & AI | `/Certificates/MCAsem1.pdf`<br>`/Certificates/MCAsem2.pdf`<br>`/Certificates/MCAsem3.pdf`<br>`/Certificates/MCAsem4.pdf` | Act 03 `Timeline`, Act 04 `CertPile` |
| **Bachelor of Computer Applications (BCA)** | Sharada Degree College, Mangalore | 2021 – 2024 · **CGPA: 8.2** | `/Certificates/all-sem.pdf`<br>`/Certificates/Sem1.pdf` through `Sem6.pdf` | Act 03 `Timeline`, Act 04 `CertPile` |
| **Pre-University Course (PUC)** | Parignana PU College (Karnataka PUE) | 2019 – 2021 · PCMC Science | `/Certificates/1stpuc.pdf`<br>`/Certificates/2ndpuc.pdf` | Act 03 `Timeline`, Act 04 `CertPile` |
| **10th Standard (SSLC)** | National Institute of Open Schooling | 2019 · Secondary School Examination | `/Certificates/10th.pdf` | Act 03 `Timeline`, Act 04 `CertPile` |

---

## 6. Technical Industry Certifications (`lib/data.ts -> CERTIFICATIONS`)

| Certification ID | Certificate Title | Issuing Body | Direct Verified File Path | Where Shown in Redesign |
| :--- | :--- | :--- | :--- | :--- |
| `cert-cloud` | Cloud Computing | Professional Certification | `/Certificates/CloudComputing.pdf` | Act 04 `CertPile` |
| `cert-google-aiml` | AI & Machine Learning | Google | `/Certificates/AI-MLGoogle.pdf` | Act 04 `CertPile` |
| `cert-aws-aiml` | AI & Machine Learning | AWS | `/Certificates/AI-MLaws.pdf` | Act 04 `CertPile` |
| `cert-adv-python` | Advanced Python Programming | Professional Certification | `/Certificates/AdvancedPythonProgramming.pdf` | Act 04 `CertPile` |
| `cert-ml-python` | Machine Learning with Python | Professional Certification | `/Certificates/MachineLearningWithPython.pdf` | Act 04 `CertPile` |
| `cert-html5` | HTML5 Application Development | Professional Certification | `/Certificates/HTML5ApplicationDevelopment.pdf` | Act 04 `CertPile` |
| `cert-ethical-hacking` | Ethical Hacking | Cybersecurity Certification | `/Certificates/Ethical Hacking.pdf` | Act 04 `CertPile` |
| `cert-it-skills` | Advanced IT Skill Training | Professional Certification | `/Certificates/Advanced_IT_Skill_Training_Certificate.pdf` | Act 04 `CertPile` |
| `cert-research-ipr` | Research Methodologies & IPR | Academic Certification | `/Certificates/ResearchMethodologiesAndIPR.pdf` | Act 04 `CertPile` |

---

## 7. Technical Skills & Primitives (`lib/data.ts -> SKILL_CATEGORIES`)

| Skill Category | Preserved Items & Levels | Location in Redesign |
| :--- | :--- | :--- |
| **Frontend Engineering** | React (Advanced), Next.js App Router (Advanced), TypeScript (Advanced), Tailwind CSS (Advanced), Framer Motion (Proficient), Three.js/R3F (Intermediate), HTML5 & CSS3 (Advanced) | Act 04 `SkillSpiral` (Category 1) with interactive flip competency drawer |
| **Backend & Databases** | Node.js (Advanced), Express (Advanced), MongoDB (Advanced), MySQL (Proficient), RESTful APIs (Advanced), PHP (Intermediate), Python (Proficient) | Act 04 `SkillSpiral` (Category 2) with interactive flip competency drawer |
| **Cloud-Native & DevOps** | Docker (Proficient), Kubernetes (Proficient), Terraform (Proficient), ArgoCD (Proficient), GitHub Actions (Proficient), Linux (Proficient), Git & GitHub (Advanced) | Act 04 `SkillSpiral` (Category 3) with interactive flip competency drawer |

---

## 8. Complete Project Catalog & Case Studies (`lib/projects.ts` — 21 Projects)

| # | Project Slug | Project Title | Category | Status | Displayed in Redesign |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | `primepro-platform` | PrimePro Platform | Practice | PRACTICE | Act 02 `WorkStack` + `WorkIndex` + `/work/primepro-platform` |
| 2 | `auravault` | AuraVault | Practice | PRACTICE | Act 02 `WorkStack` + `WorkIndex` + `/work/auravault` |
| 3 | `cakedelight` | CakeDelight | Practice | PRACTICE | Act 02 `WorkIndex` + `/work/cakedelight` |
| 4 | `kaveri-heritage-kitchen` | Kaveri Heritage Kitchen | Practice | PRACTICE | Act 02 `WorkIndex` + `/work/kaveri-heritage-kitchen` |
| 5 | `marichin-homestay` | Marichin Homestay | Company | LIVE | Act 02 `LiveDeck` + `WorkIndex` + `/work/marichin-homestay` |
| 6 | `karnataka-kalyanothsava`| Karnataka Kalyanothsava | Company | LIVE | Act 02 `LiveDeck` + `WorkIndex` + `/work/karnataka-kalyanothsava` |
| 7 | `alankarstyles` | AlankarStyles | Company | LIVE | Act 02 `LiveDeck` + `WorkIndex` + `/work/alankarstyles` |
| 8 | `bangalore-32-vibes` | Bangalore 32 Vibes | Company | LIVE | Act 02 `LiveDeck` + `WorkIndex` + `/work/bangalore-32-vibes` |
| 9 | `yohan-travels` | Yohan Travels | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/yohan-travels` |
| 10 | `mahanya-furniture-interiors` | Mahanya Furniture & Interiors | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/mahanya-furniture-interiors` |
| 11 | `sports-spot` | Sports Spot | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/sports-spot` |
| 12 | `security-service` | Security Service | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/security-service` |
| 13 | `rangu-colour-of-print` | Rangu – Colour of Print | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/rangu-colour-of-print` |
| 14 | `madanna-enterprises` | Madanna Enterprises | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/madanna-enterprises` |
| 15 | `sri-seetarama` | Sri Seetarama | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/sri-seetarama` |
| 16 | `hanger-commerce` | Hanger Commerce | Company | REAL-TIME | Act 02 `WorkIndex` + `/work/hanger-commerce` |
| 17 | `mern-gitops-pipeline` | MERN GitOps CI/CD Pipeline Architecture | Internship | PRACTICE | Act 02 `WorkStack` + `WorkIndex` + `/work/mern-gitops-pipeline` |
| 18 | `online-grocery-store` | Online Grocery Store E-Commerce Platform | Internship/BCA | PRACTICE | Act 02 `WorkStack` + `WorkIndex` + `/work/online-grocery-store` |
| 19 | `mental-health-monitor` | Mental Health Monitor & Stress Detector | MCA | LIVE | Act 02 `WorkStack` + `WorkIndex` + `/work/mental-health-monitor` |
| 20 | `ai-study-assistant` | AI-Powered Study Assistant | MCA | LIVE | Act 02 `WorkStack` + `WorkIndex` + `/work/ai-study-assistant` |
| 21 | `intelligent-payroll-system` | Intelligent Payroll Management System | BCA | PRACTICE | Act 02 `WorkIndex` + `/work/intelligent-payroll-system` |

---

## 9. Conclusion of Audit

- **Total Data Preservation**: 100% of all data items, stats, metrics, links, and text entries preserved.
- **Redirection & Route Integrity**: Permanent 308 redirects mapped in `next.config.ts`; `/work/[slug]` route continues to dynamically pre-render all 21 project case studies.
- **Interactive Features**: WebGL wave shader restricted to hero viewport, GSAP ScrollTrigger active across acts, Command Palette (⌘K), custom morphing cursor, and synthesized audio easter eggs active.
