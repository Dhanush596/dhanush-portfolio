"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "blue" | "purple" | "emerald";
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  glowColor = "cyan",
  delay = 0,
  onClick,
}: GlassCardProps) {
  const glowMap = {
    cyan: "hover:shadow-cyan-500/50",
    blue: "hover:shadow-blue-500/50",
    purple: "hover:shadow-purple-500/50",
    emerald: "hover:shadow-emerald-500/50",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className={`glassmorphism p-6 rounded-xl hover:shadow-lg transition-all cursor-pointer ${glowMap[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
