"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const experiences = [
  {
    role: "DevOps Engineer Intern",
    company: "Rooman Technologies Ltd.",
    period: "Feb 2026 – May 2026",
    score: "100/100",
    highlights: [
      "Orchestrated repeatable cloud infrastructure using Terraform Infrastructure-as-Code (IaC) and configuration management via Ansible",
      "Containerized microservices using Docker/Docker Compose multi-stage builds for production parity across environments",
      "Spearheaded GitOps delivery models using ArgoCD for self-healing Kubernetes (K3s) workloads with automated synchronization",
      "Implemented Trivy security scanning in CI/CD pipelines for vulnerability detection and compliance",
      "Designed and deployed highly available cloud infrastructure on AWS with auto-scaling policies",
    ],
    tech: ["Terraform", "Ansible", "Docker", "Kubernetes K3s", "ArgoCD", "GitOps", "AWS EC2", "GitHub Actions", "Trivy"],
  },
  {
    role: "Full-Stack Development Intern",
    company: "Encode Data Tech",
    period: "2 Months",
    highlights: [
      "Engineered responsive React front-end components with TypeScript type safety and React best practices",
      "Developed Node.js RESTful backends with Express.js handling complex business logic",
      "Implemented Agile sprint cycles with bi-weekly releases and continuous integration",
      "Managed version-controlled collaborative workflows using Git branching strategies and code reviews",
      "Collaborated with cross-functional teams on feature development and bug fixes",
    ],
    tech: ["React.js", "Node.js", "Express.js", "TypeScript", "MongoDB", "REST APIs", "Git", "Agile"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-32 px-4">
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
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Experience</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Real-world enterprise experience in DevOps and full-stack development
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <GlassCard glowColor="blue" className="group">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-poppins font-bold text-neon-cyan">
                      {exp.role}
                    </h3>
                    <p className="text-gray-400">{exp.company}</p>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <p className="text-sm text-gray-400">{exp.period}</p>
                    {exp.score && (
                      <span className="inline-block bg-neon-emerald/20 text-neon-emerald px-3 py-1 rounded-full text-sm font-semibold">
                        {exp.score}
                      </span>
                    )}
                  </div>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((highlight, hIdx) => (
                    <motion.li
                      key={hIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: hIdx * 0.05 }}
                      viewport={{ once: true }}
                      className="flex gap-3 text-gray-300"
                    >
                      <span className="text-neon-cyan font-bold mt-1">✓</span>
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, tIdx) => (
                    <motion.span
                      key={tIdx}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: tIdx * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 rounded-full text-xs text-gray-300 hover:border-neon-blue transition-all"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
