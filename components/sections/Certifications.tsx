"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const certifications = [
  {
    title: "AI-ML Virtual Internship",
    issuer: "Google for Developers & AICTE EduSkills",
    date: "June 2025",
    score: "Grade: O (Outstanding)",
    category: "AI/ML",
    icon: "🤖",
    link: "/certificates/AI-MLGoogle.pdf", 
  },
  {
    title: "AI-ML Virtual Internship",
    issuer: "AWS Academy & AICTE EduSkills",
    date: "March 2025",
    score: "Grade: O (Outstanding)",
    category: "AI/ML",
    icon: "☁️",
    link: "/certificates/AI-MLaws.pdf", 
  },
  {
    title: "Cloud Computing",
    issuer: "VTU Centre for Online Education",
    date: "July 2026",
    score: "Elite GOLD",
    category: "Cloud",
    icon: "☁️",
    link: "/certificates/CloudComputing.pdf",
  },
  {
    title: "Machine Learning with Python",
    issuer: "IBM Developer Skills Network",
    date: "March 2026",
    score: "Completed",
    category: "Machine Learning",
    icon: "🐍",
    link: "/certificates/MachineLearningWithPython.pdf", 
  },
  {
    title: "Advanced Python Programming",
    issuer: "Ethnotech Academy / NSDC",
    date: "July 2025",
    score: "Grade: A",
    category: "Programming",
    icon: "✨",
    link: "/certificates/AdvancedPythonProgramming.pdf", 
  },
  {
    title: "Data Analytics Training",
    issuer: "Mphasis Advanced IT Skill Training",
    date: "Feb 2024",
    score: "Grade: A",
    category: "Data Analytics",
    icon: "📊",
    link: "/certificates/Advanced_IT_Skill_Training_Certificate.pdf", 
  },
  {
    title: "Research Methodologies & IPR",
    issuer: "VTU Centre for Online Education",
    date: "April 2025",
    score: "Elite GOLD",
    category: "Academic",
    icon: "📜",
    link: "/certificates/ResearchMethodologiesAndIPR.pdf", 
  },
  {
    title: "HTML5 Application Development",
    issuer: "Ethnotech Academic Solutions @ SIT",
    date: "Feb 2025",
    score: "40 Hours Training",
    category: "Web Development",
    icon: "🌐",
    link: "/certificates/HTML5ApplicationDevelopment.pdf", 
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Srinivas Institute of Technology, Mangalore",
    period: "2024 - 2026",
    cgpa: "Specialized in Cloud & AI",
    status: "Graduating 2026",
    icon: "🎓",
    link: "/certificates/MCAsem4.pdf", 
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Sharada Degree College, Mangalore",
    period: "2021 - 2024",
    cgpa: "8.2 CGPA",
    status: "Graduated",
    icon: "🎓",
    link: "/certificates/all-sem.pdf",
  },
  {
    degree: "Pre-University Course — Science (PCMC)",
    institution: "Parignana PU College",
    period: "2019 - 2021",
    cgpa: "Science Focus",
    status: "Completed",
    icon: "🏫",
    link: "/certificates/2ndpuc.pdf",
  },
  {
    degree: "Secondary School Examination (10th)",
    institution: "National Institute of Open Schooling",
    period: "2019",
    cgpa: "Math & Science",
    status: "Completed",
    icon: "🏫",
    link: "/certificates/10th.pdf",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 md:py-32 px-4">
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
            Certifications & <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Education</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Professional credentials and academic achievements
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-8 text-center">
            Education
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassCard glowColor="cyan" className="group h-full">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{edu.icon}</span>
                    <div className="flex-1">
                      {/* Interactive Link for Education */}
                      {edu.link ? (
                        <a 
                          href={edu.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="group/link flex items-center gap-2 hover:text-neon-cyan transition-colors duration-300 w-fit mb-1"
                        >
                          <h4 className="text-lg font-poppins font-bold text-neon-cyan group-hover/link:underline">
                            {edu.degree}
                          </h4>
                          <svg className="w-4 h-4 opacity-50 group-hover/link:opacity-100 text-neon-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      ) : (
                        <h4 className="text-lg font-poppins font-bold text-neon-cyan mb-1">
                          {edu.degree}
                        </h4>
                      )}

                      <p className="text-gray-400 text-sm mb-2">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-neon-cyan/20 text-neon-cyan px-2 py-1 rounded">
                          {edu.period}
                        </span>
                        <span className="text-xs bg-neon-emerald/20 text-neon-emerald px-2 py-1 rounded">
                          {edu.cgpa}
                        </span>
                        <span className="text-xs bg-neon-blue/20 text-neon-blue px-2 py-1 rounded">
                          {edu.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-8 text-center">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ rotateY: 5, y: -5 }}
              >
                <GlassCard glowColor="purple" className="h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{cert.icon}</span>
                    <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">
                      {cert.category}
                    </span>
                  </div>

                  {/* Interactive Link for Certifications */}
                  {cert.link ? (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="group/link flex items-start gap-1.5 hover:text-neon-cyan transition-colors duration-300 w-fit mb-2"
                    >
                      <h4 className="text-sm font-poppins font-bold text-neon-cyan group-hover/link:underline">
                        {cert.title}
                      </h4>
                      <svg className="w-3 h-3 mt-1 opacity-50 group-hover/link:opacity-100 text-neon-cyan shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <h4 className="text-sm font-poppins font-bold text-neon-cyan mb-2">
                      {cert.title}
                    </h4>
                  )}

                  <p className="text-xs text-gray-400 mb-4 flex-grow">
                    {cert.issuer}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                    <span className="text-xs text-gray-500">{cert.date}</span>
                    {cert.score && (
                      <span className="text-xs bg-neon-emerald/20 text-neon-emerald px-2 py-1 rounded font-semibold">
                        {cert.score}
                      </span>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}