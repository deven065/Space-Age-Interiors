"use client";

import { useRef, useEffect, useState, ReactNode, CSSProperties } from "react";
import { motion, TargetAndTransition } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  style?: CSSProperties;
  duration?: number;
  once?: boolean;
}

type InitialState = { opacity: number; y?: number; x?: number };

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style,
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const initialMap: Record<string, InitialState> = {
    up: { opacity: 0, y: 50 },
    down: { opacity: 0, y: -50 },
    left: { opacity: 0, x: 60 },
    right: { opacity: 0, x: -60 },
    none: { opacity: 0 },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const initial = initialMap[direction] as TargetAndTransition;
  const animate: TargetAndTransition = inView
    ? { opacity: 1, x: 0, y: 0 }
    : (initialMap[direction] as TargetAndTransition);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}
