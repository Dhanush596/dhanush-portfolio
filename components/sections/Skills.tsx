"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const skillCategories = [
  {
    category: "Cloud & Infrastructure",
    color: "cyan",
    skills: ["Terraform", "Ansible", "AWS (EC2, IAM, Route53, CLI)", "Linux CLI", "Nginx"],
  },
  {
    category: "DevOps & CI/CD",
    color: "blue",
    skills: ["Docker", "Docker Compose", "Kubernetes (K3s)", "GitOps (ArgoCD)", "GitHub Actions", "Trivy Security Scanning"],
  },
  {
    category: "Programming & ML",
    color: "purple",
    skills: ["Python", "JavaScript (ES6+)", "TypeScript", "Java", "C", "C#", "Scikit-learn", "Pandas", "NLP"],
  },
  {
    category: "Web Development & Databases",
    color: "emerald",
    skills: ["MERN Stack", "MongoDB", "Express.js", "React.js", "Node.js", "Vite", "PHP", "HTML5", "CSS3", "MySQL", "SQL"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-32 px-4">
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
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Skills</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Comprehensive expertise across modern cloud-native and full-stack technologies
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, idx) => (
            <GlassCard
              key={idx}
              glowColor={category.color as "cyan" | "blue" | "purple" | "emerald"}
              delay={idx * 0.1}
              className="group"
            >
              <h3 className="text-xl font-poppins font-bold mb-4 text-neon-cyan">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIdx) => (
                  <motion.span
                    key={skillIdx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: skillIdx * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 rounded-full text-sm text-gray-300 hover:border-neon-cyan transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
