"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MdEmail size={24} />,
      label: "Email",
      value: "adhanush596@gmail.com",
      href: "mailto:adhanush596@gmail.com",
    },
    {
      icon: <FaPhone size={24} />,
      label: "Phone",
      value: "+91 8075861718",
      href: "tel:+918075861718",
    },
    {
      icon: <MdLocationOn size={24} />,
      label: "Location",
      value: "Kasaragod, Kerala, India",
      href: "#",
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4">
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
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-blue">Connect</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have a project in mind? Let&apos;s build something amazing together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactInfo.map((info, idx) => (
            <motion.a
              key={idx}
              href={info.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard glowColor="cyan" className="text-center h-full">
                <div className="flex justify-center text-neon-cyan mb-3">
                  {info.icon}
                </div>
                <h3 className="font-poppins font-bold text-neon-cyan mb-2">
                  {info.label}
                </h3>
                <p className="text-gray-300">{info.value}</p>
              </GlassCard>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <GlassCard glowColor="blue" className="glassmorphism-dark">
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-neon-cyan mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-dark-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-neon-cyan mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-dark-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-neon-cyan mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                    className="w-full bg-dark-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-poppins font-semibold text-neon-cyan mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="w-full bg-dark-secondary/50 border border-white/10 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/20 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSubmitted ? 1 : 0 }}
                  className="flex items-center gap-2 text-neon-emerald text-sm font-semibold"
                >
                  ✓ Message sent successfully!
                </motion.div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-full"
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-6">Or connect with me on social media</p>
          <div className="flex gap-4 justify-center">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
