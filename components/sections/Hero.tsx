"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload, FaEye } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Button from "@/components/ui/Button";

const titles = [
  "Cloud-Native Engineer",
  "DevOps Automation Specialist",
  "Full-Stack MERN Developer",
  "AI & ML Integration Engineer",
];

export default function Hero() {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTitleIndex]);

  const floatingIcons = [
    { icon: "☁️", delay: 0 },
    { icon: "🐳", delay: 0.5 },
    { icon: "⚙️", delay: 1 },
    { icon: "🚀", delay: 1.5 },
    { icon: "🔒", delay: 2 },
    { icon: "💻", delay: 2.5 },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Grid */}
      <div className="animated-grid absolute inset-0" />

      {/* Floating Background Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div
            key={idx}
            animate={{
              y: [0, -30, 0],
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: 360,
            }}
            transition={{
              duration: 8 + idx,
              repeat: Infinity,
              delay: item.delay,
            }}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        
        {/* UPDATED: Profile Image with your actual photo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full border-2 border-neon-cyan p-1 overflow-hidden bg-gradient-to-br from-dark-secondary to-dark-tertiary animate-pulse-glow">
            {/* Make sure "profile.jpg" is in your public folder! */}
            <img 
              src="/profile.jpg" 
              alt="Dhanush A" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-poppins font-bold mb-4"
        >
          Hey, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Dhanush A</span>
        </motion.h1>

        {/* Dynamic Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-16 md:h-20 flex items-center justify-center mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-poppins font-semibold text-neon-cyan">
            {displayText}
            <span className="animate-pulse ml-1">|</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-inter"
        >
          Crafting production-ready cloud infrastructure and full-stack solutions with enterprise-grade DevOps practices. Specialized in Kubernetes, Terraform, and modern web technologies.
        </motion.p>

        {/* Location & Contact */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-gray-400 mb-8 font-inter"
        >
          📍 Kasaragod, Kerala, India | ✉️ adhanush596@gmail.com | 📱 +91 8075861718
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => scrollToSection("projects")}
          >
            View Projects
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </Button>

          {/* Split Resume Buttons */}
          <div className="flex gap-2 rounded-lg bg-dark-secondary/50 p-1 border border-white/5">
            {/* View Button */}
            <a
              href="/resume/Dhanush_A_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan/20 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] font-inter font-semibold rounded-md transition-all duration-300"
            >
              <FaEye size={18} />
              View Resume
            </a>
            
            {/* Download Button */}
            <a
              href="/resume/Dhanush_A_Resume.pdf"
              download="Dhanush_A_Resume.pdf"
              className="flex items-center gap-2 px-6 py-3 bg-dark-tertiary text-gray-300 hover:text-white hover:bg-white/10 font-inter font-semibold rounded-md transition-all duration-300"
            >
              <FaDownload size={16} />
              Download
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex gap-6 justify-center"
        >
          <motion.a
            href="https://github.com/Dhanush596"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full glassmorphism text-neon-cyan hover:bg-neon-cyan/20 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <FaGithub size={28} />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/dhanush-a-02a806294"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full glassmorphism text-neon-cyan hover:bg-neon-cyan/20 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <FaLinkedin size={28} />
          </motion.a>

          <motion.a
            href="mailto:adhanush596@gmail.com"
            className="p-4 rounded-full glassmorphism text-neon-cyan hover:bg-neon-cyan/20 transition-all"
            whileHover={{ scale: 1.1, y: -5 }}
          >
            <MdEmail size={28} />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
          <motion.div
            animate={{ y: [5, 15, 5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-neon-cyan rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}