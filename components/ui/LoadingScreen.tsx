"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 95) return prev + Math.random() * 30;
        return prev;
      });
    }, 300);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoaded(true), 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (isLoaded) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-dark-primary z-50 flex items-center justify-center"
    >
      {/* Kubernetes Cluster Animation */}
      <div className="relative w-32 h-32">
        {/* Center Node */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue"
          style={{ boxShadow: "0 0 40px rgba(6, 182, 212, 0.8)" }}
        />

        {/* Orbiting Nodes */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div
              className="absolute w-4 h-4 bg-neon-blue rounded-full"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${i * 90}deg) translateX(70px)`,
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
              }}
            />
          </motion.div>
        ))}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: "drop-shadow(0 0 10px rgba(6, 182, 212, 0.5))" }}>
          {[0, 90, 180, 270].map((angle) => (
            <motion.line
              key={angle}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${Math.cos((angle * Math.PI) / 180) * 35}px)`}
              y2={`calc(50% + ${Math.sin((angle * Math.PI) / 180) * 35}px)`}
              stroke="rgba(6, 182, 212, 0.4)"
              strokeWidth="2"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          ))}
        </svg>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-20 w-64">
        <motion.div
          className="h-1 bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple rounded-full"
          style={{ width: `${progress}%` }}
        />
        <p className="text-center text-neon-cyan mt-4 font-poppins font-semibold">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Status Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-20 text-sm text-gray-400 font-inter"
      >
        Initializing Infrastructure...
      </motion.p>
    </motion.div>
  );
}
