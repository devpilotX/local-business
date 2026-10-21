"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(4px)" }}
      whileInView={
        reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{
        once: true,
        amount: 0.14,
        margin: "0px 0px -40px 0px",
      }}
      transition={{
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
