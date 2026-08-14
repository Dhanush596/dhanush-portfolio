"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdDownload } from "react-icons/md";
import useScrollProgress from "@/hooks/useScrollProgress";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < 150) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple z-40"
        style={{ scaleX: scrollProgress }}
        initial={{ scaleX: 0 }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          scrolled ? "glassmorphism-dark" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero");
              }}
              className="text-xl font-poppins font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dhanush A
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-inter transition-all ${
                    activeSection === section.id
                      ? "bg-neon-cyan/20 text-neon-cyan"
                      : "text-gray-400 hover:text-neon-cyan"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              {/* Social Links */}
              <motion.a
                href="https://github.com/Dhanush596"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <FaGithub size={20} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/dhanush-a-02a806294"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <FaLinkedin size={20} />
              </motion.a>

              {/* Download Resume Button */}
              <motion.a
                href="/resume/Dhanush_A_Resume.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-cyan to-neon-blue rounded-lg font-inter font-semibold text-dark-primary hover:shadow-lg hover:shadow-neon-cyan/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MdDownload size={18} />
                <span className="hidden sm:inline">Resume</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
