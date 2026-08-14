"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/hooks/useMousePosition";

export default function CursorFollower() {
  const { x, y } = useMousePosition();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }
  }, [x, y]);

  return (
    <>
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed w-6 h-6 rounded-full border-2 border-neon-cyan mix-blend-screen z-50 transition-all duration-75 ease-out"
        style={{ transform: "translate(-50%, -50%)" }}
      />

      {/* Glow Effect */}
      <motion.div
        className="pointer-events-none fixed w-12 h-12 rounded-full bg-neon-cyan/10 mix-blend-screen z-40 blur-lg"
        animate={{ x: x - 24, y: y - 24 }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
