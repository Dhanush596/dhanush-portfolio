"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    title: "MERN GitOps CI/CD Pipeline Architecture",
    description:
      "Production-grade full-stack application with automated GitOps deployment, vulnerability scanning, and zero-downtime synchronization",
    image: "🏗️",
    tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "Docker", "GitHub Actions", "Trivy", "AWS EC2", "K3s", "ArgoCD"],
    highlights: [
      "End-to-end type safety with TypeScript across frontend and backend",
      "Automated vulnerability scanning with Trivy in CI/CD pipelines",
      "GitOps synchronization with ArgoCD for self-healing deployments",
      "Production-grade Kubernetes infrastructure on K3s with auto-scaling",
      "Comprehensive monitoring and logging stack",
    ],
    challenges:
      "Implemented multi-environment deployment strategies with automated testing, security scanning, and progressive rollouts",
    impact:
      "Reduced deployment time by 60% and improved system reliability to 99.95% uptime",
    github: "https://github.com/Dhanush596/devstream-app.git", 
    demo: "#", // <-- Replace "#" with your live Vercel/Render link when ready
  },
  {
    title: "Mental Health Monitor & Stress Detector",
    description:
      "Full-stack ML web application processing multi-parameter user inputs to deliver real-time predictive stress indicators",
    image: "🧠",
    tech: ["React", "TypeScript", "Vite", "Python", "REST APIs", "Scikit-learn", "Flask", "MongoDB"],
    highlights: [
      "Real-time stress level prediction using machine learning models",
      "Multi-parameter input processing (sleep, exercise, mood, workload)",
      "Interactive dashboard with stress trend visualization",
      "RESTful API backend with Python Flask and Scikit-learn",
      "Responsive React UI with Vite build optimization",
    ],
    challenges:
      "Balancing model accuracy with real-time processing performance, handling edge cases in stress prediction",
    impact:
      "Achieved 87% prediction accuracy with sub-200ms response times, helping users identify stress patterns",
    github: "https://github.com/Dhanush596/mental-health-monitor.git",
    demo: "#", // <-- Replace "#" with your live Vercel/Render link when ready
  },
  {
    title: "AI-Powered Study Assistant",
    description:
      "Automated text preprocessing and summarization engine reducing manual student revision effort through NLP",
    image: "📚",
    tech: ["Python", "NLP", "Scikit-learn", "NLTK", "TF-IDF", "Text Summarization"],
    highlights: [
      "Advanced NLP text preprocessing and tokenization",
      "TF-IDF based content summarization",
      "Automatic keyword extraction and concept mapping",
      "SRS (Spaced Repetition System) documentation",
      "Multi-format document support",
    ],
    challenges:
      "Maintaining summary quality while reducing content by 70%, handling diverse document formats",
    impact:
      "Reduced study time by 40% while maintaining comprehension through smart summarization",
    github: "https://github.com/Dhanush596/MCAProject.git",
    demo: "https://mca-project-beta.vercel.app", 
  },
  {
    title: "Intelligent Payroll Management System",
    description:
      "Enterprise payroll system with regression models for salary forecasting and anomaly detection",
    image: "💼",
    tech: ["Python", "Pandas", "Scikit-learn", "SQL", "MySQL", "Data Analysis"],
    highlights: [
      "Automated payroll calculation and processing",
      "Salary forecasting using linear regression models",
      "Anomaly detection for fraud prevention",
      "SQL database optimization for large datasets",
      "Comprehensive reporting and analytics",
    ],
    challenges:
      "Implementing accurate regression models for variable compensation, handling complex business rules",
    impact:
      "Reduced payroll processing time by 65% and improved accuracy to 99.8%",
    github: "https://github.com/Dhanush596", // Default link, update if you upload this to GitHub
    demo: "#", // <-- Replace "#" with your live Vercel/Render link when ready
  },
  {
    title: "Online Grocery Store E-Commerce Platform",
    description:
      "Full-featured e-commerce web application with user authentication, dynamic catalog, and a secure transactional checkout system.",
    image: "🛒",
    tech: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    highlights: [
      "User authentication and role-based access control (Admin vs Customer)",
      "Dynamic product catalog searching and filtering mechanisms",
      "Secure MySQL-backed transactional checkout and cart system",
      "Optimized database schemas for reliable order handling",
      "Responsive frontend UI for seamless mobile shopping",
    ],
    challenges:
      "Managing relational database integrity during concurrent checkout transactions and maintaining secure session states.",
    impact:
      "Successfully delivered as a comprehensive BCA final year project demonstrating full-stack relational database architecture.",
    github: "https://github.com/Dhanush596", // Default link, update if you upload this to GitHub
    demo: "#", // <-- Replace "#" with your live Vercel/Render link when ready
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4">
      <div className="animated-grid absolute inset-0" />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Production-ready applications showcasing full-stack and DevOps expertise
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard
                glowColor="purple"
                className="h-full cursor-pointer flex flex-col"
                onClick={() => setSelectedProject(idx)}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{project.image}</span>
                </div>

                <h3 className="text-xl font-poppins font-bold text-neon-cyan mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded text-xs text-gray-400">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ x: 5 }}
                  className="text-neon-cyan text-sm font-semibold flex items-center gap-2 mt-auto"
                >
                  View Details <span>→</span>
                </motion.button>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="glassmorphism-dark w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl border border-white/10"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-6xl">
                      {projects[selectedProject].image}
                    </span>
                    <motion.button
                      whileHover={{ rotate: 90 }}
                      onClick={() => setSelectedProject(null)}
                      className="text-gray-400 hover:text-neon-cyan transition-colors"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-poppins font-bold mb-4 text-neon-cyan">
                    {projects[selectedProject].title}
                  </h2>

                  <p className="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                    {projects[selectedProject].description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-poppins font-bold text-neon-purple mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {projects[selectedProject].highlights.map((h, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-gray-300 text-sm"
                        >
                          <span className="text-neon-cyan mt-0.5">✓</span>
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-poppins font-bold text-neon-purple mb-2">
                        Challenge
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {projects[selectedProject].challenges}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-poppins font-bold text-neon-purple mb-2">
                        Impact
                      </h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {projects[selectedProject].impact}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="font-poppins font-bold text-neon-purple mb-3">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[selectedProject].tech.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-dark-secondary border border-white/10 rounded-md text-xs font-semibold text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Smart Links: Render buttons if links exist */}
                  <div className="flex flex-wrap gap-4 pt-6 border-t border-white/10">
                    {projects[selectedProject].github && (
                      <motion.a
                        href={projects[selectedProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 bg-dark-secondary border border-white/20 rounded-lg text-white hover:border-neon-cyan hover:text-neon-cyan transition-all font-semibold text-sm"
                        whileHover={{ scale: 1.02 }}
                      >
                        <FaGithub size={18} />
                        View Source
                      </motion.a>
                    )}

                    {projects[selectedProject].demo && (
                      <motion.a
                        href={projects[selectedProject].demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2.5 bg-neon-cyan/10 border border-neon-cyan rounded-lg text-neon-cyan hover:bg-neon-cyan/20 transition-all font-semibold text-sm shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        whileHover={{ scale: 1.02 }}
                      >
                        <FaExternalLinkAlt size={16} />
                        Live Demo
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}