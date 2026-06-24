"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos para encadear revelações. */
  delay?: number;
  /** Direção de entrada. */
  y?: number;
  /** Permite ancorar a secção (links internos). */
  id?: string;
}

/**
 * Scroll reveal premium e acessível: respeita prefers-reduced-motion,
 * anima apenas uma vez e usa easing suave.
 */
export function Reveal({ children, className, delay = 0, y = 28, id }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
