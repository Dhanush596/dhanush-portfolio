"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { useState, useEffect } from "react";

export default function About() {
  const [stats, setStats] = useState({
    projects: 0,
    score: 0,
    certifications: 0,
    internships: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        projects: Math.min(prev.projects + 1, 5),
        score: Math.min(prev.score + 3, 100),
        certifications: Math.min(prev.certifications + 1, 9), 
        internships: Math.min(prev.internships + 1, 2),
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const timeline = [
    {
      year: "2024 - 2026",
      title: "Master of Computer Applications (MCA)",
      org: "Srinivas Institute of Technology, Mangalore",
      details: "Graduating 2026 • Specialized in Cloud-Native Engineering & AI",
      links: [
        { label: "Sem 1", url: "/certificates/MCAsem1.pdf" },
        { label: "Sem 2", url: "/certificates/MCAsem2.pdf" },
        { label: "Sem 3", url: "/certificates/MCAsem3.pdf" },
        { label: "Sem 4", url: "/certificates/MCAsem4.pdf" },
      ], 
    },
    {
      year: "Feb 2026 – May 2026",
      title: "DevOps Intern",
      org: "Rooman Technologies Ltd.",
      details: "Infrastructure as Code (Terraform) • Kubernetes (K3s) & GitOps (ArgoCD) • Score: 100/100",
      links: [
        { label: "Internship Certificate", url: "/certificates/InternshipCompletionCertificate.pdf" }
      ],
    },
    {
      year: "2 Months",
      title: "Full-Stack Development Intern",
      org: "Encode Data Tech",
      details: "React Frontend • Node.js/Express REST APIs • Agile Workflows",
      links: [
        { label: "Internship Certificate", url: "/certificates/FullStackInternship.pdf" } // Update this later when ready
      ],
    },
    {
      year: "2021 - 2024",
      title: "Bachelor of Computer Applications (BCA)",
      org: "Sharada Degree College, Mangalore",
      details: "CGPA: 8.2 • Built full-featured E-Commerce Platforms",
      links: [
        { label: "All Semesters / Degree", url: "/certificates/all-sem.pdf" },
        { label: "Sem 1", url: "/certificates/Sem1.pdf" },
        { label: "Sem 2", url: "/certificates/Sem2.pdf" },
        { label: "Sem 3", url: "/certificates/Sem3.pdf" },
        { label: "Sem 4", url: "/certificates/Sem4.pdf" },
        { label: "Sem 5", url: "/certificates/Sem5.pdf" },
        { label: "Sem 6", url: "/certificates/Sem6.pdf" },
      ],
    },
    {
      year: "2019 - 2021",
      title: "Pre-University Course — Science",
      org: "Parignana PU College",
      details: "Completed Pre-University education (PCMC: Physics, Chemistry, Maths, Computer Science).",
      links: [
         { label: "1st PUC", url: "/certificates/1stpuc.pdf" },
         { label: "2nd PUC", url: "/certificates/2ndpuc.pdf" }
      ], 
    },
    {
      year: "2019",
      title: "Secondary School Examination (10th)",
      org: "National Institute of Open Schooling",
      details: "Completed secondary education with foundational focus on Mathematics and Science.",
      links: [
         { label: "10th Marks Card", url: "/certificates/10th.pdf" }
      ], 
    },
  ];

  return (
    <section id="about" className="relative py-20 md:py-32 px-4">
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
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Me</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A cloud-native engineer combining deep expertise across the full engineering stack, from Terraform-provisioned infrastructure to AI-powered solutions.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "Production Projects", value: stats.projects, suffix: "+", color: "cyan" },
            { label: "DevOps Score", value: stats.score, suffix: "/100", color: "blue" },
            { label: "Certifications", value: stats.certifications, suffix: "+", color: "purple" },
            { label: "Internships", value: stats.internships, suffix: "", color: "emerald" },
          ].map((stat, idx) => (
            <GlassCard key={idx} delay={idx * 0.1} glowColor={stat.color as "cyan" | "blue" | "purple" | "emerald"}>
              <div className="text-center">
                <motion.p className="text-3xl md:text-4xl font-poppins font-bold text-neon-cyan mb-2">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </motion.p>
                <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-8 text-center">
            Education & Experience
          </h3>
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline Line */}
                {idx < timeline.length - 1 && (
                  <div className="absolute left-3 md:left-1/2 top-12 h-12 w-0.5 bg-gradient-to-b from-neon-cyan to-transparent" />
                )}

                {/* Timeline Node */}
                <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-neon-cyan border-4 border-dark-primary md:-translate-x-4 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-dark-primary" />
                </div>

                {/* Content */}
                <GlassCard
                  className="md:ml-[calc(50%+2rem)] md:w-5/12"
                  glowColor="cyan"
                  delay={idx * 0.2}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-full">
                      <div className="flex justify-between items-start w-full">
                        <h4 className="text-lg font-poppins font-bold">{item.title}</h4>
                        <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded-full whitespace-nowrap ml-2 h-fit">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-neon-cyan text-sm mb-2">{item.org}</p>
                      
                      {/* Render Multiple Links as small chips */}
                      {item.links && item.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 mt-1">
                          {item.links.map((link, linkIdx) => (
                            <a 
                              key={linkIdx}
                              href={link.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="group flex items-center gap-1.5 bg-dark-primary/50 border border-neon-cyan/30 hover:border-neon-cyan/80 text-gray-300 hover:text-neon-cyan px-2.5 py-1 rounded-md text-xs transition-all duration-300"
                            >
                              <span className="group-hover:underline">{link.label}</span>
                              <svg className="w-3 h-3 opacity-50 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{item.details}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <GlassCard className="glassmorphism-dark">
          <p className="text-gray-300 leading-relaxed mb-4">
            I&apos;m a Cloud-Native Engineer and Full-Stack Developer passionate about architecting resilient infrastructure and building production-ready applications. My expertise bridges the gap between software development and modern DevOps practices, ensuring systems are both robust and scalable.
          </p>
          <p className="text-gray-300 leading-relaxed">
            My journey spans from engineering responsive MERN-stack dashboards to deploying zero-intervention GitOps pipelines using Kubernetes, Terraform, and ArgoCD. Furthermore, I have a strong focus on AI integrations—utilizing Python, NLP, and Scikit-learn to embed machine learning directly into modern web applications.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}