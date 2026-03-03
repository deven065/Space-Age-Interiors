"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  mode?: "words" | "chars" | "lines";
}

export default function AnimatedText({
  text,
  className = "",
  tag: Tag = "h2",
  delay = 0,
  staggerDelay = 0.04,
  once = true,
  mode = "words",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const items = mode === "words" ? text.split(" ") : text.split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const itemVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <div ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={`inline-flex flex-wrap ${mode === "chars" ? "gap-0" : "gap-x-2"} overflow-hidden`}
      >
        {items.map((item, i) => (
          <span key={i} className="overflow-clip inline-block">
            <motion.span
              variants={itemVariants}
              className={`inline-block ${className}`}
            >
              {item}
              {mode === "words" && i < items.length - 1 ? "" : ""}
            </motion.span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
