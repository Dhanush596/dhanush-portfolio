"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 glassmorphism-dark py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-poppins font-bold bg-gradient-to-r from-neon-cyan to-neon-blue bg-clip-text text-transparent mb-2">
              Dhanush A
            </h3>
            <p className="text-gray-400 text-sm">
              Cloud-Native Engineer | Full-Stack Developer | DevOps Specialist
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-poppins font-semibold text-neon-cyan mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Home", "About", "Skills", "Projects", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="hover:text-neon-cyan transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-poppins font-semibold text-neon-cyan mb-4">
              Get in Touch
            </h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>
                <a
                  href="mailto:adhanush596@gmail.com"
                  className="hover:text-neon-cyan transition-colors"
                >
                  adhanush596@gmail.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+918075861718"
                  className="hover:text-neon-cyan transition-colors"
                >
                  +91 8075861718
                </a>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500 text-center md:text-left mb-4 md:mb-0"
            >
              © {currentYear} Dhanush A. All rights reserved. | Crafted with{" "}
              <span className="text-neon-cyan">❤️</span> using Next.js & Framer Motion.
            </motion.p>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
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

              <motion.a
                href="mailto:adhanush596@gmail.com"
                className="text-gray-400 hover:text-neon-cyan transition-colors"
                whileHover={{ scale: 1.2, rotate: 360 }}
              >
                <MdEmail size={20} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
