"use client";

import React from "react";
import { motion } from "motion/react";

export function ScrollReveal({
  children,
  delay = 0,
  duration = 0.7,
  yOffset = 30,
  blur = true,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: blur ? "blur(12px)" : "none",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
