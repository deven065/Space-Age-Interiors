"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface StatCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  delay?: number;
}

export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  label,
  delay = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const step = 16;
      const increment = end / (duration / step);
      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, step);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [inView, end, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <div
        style={{
          fontFamily: "var(--font-cormorant, serif)",
          fontWeight: 300,
          fontSize: "clamp(56px, 8vw, 96px)",
          color: "var(--gold)",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {prefix}{count}{suffix}
      </div>
      <div
        style={{
          width: "40px",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
          margin: "14px auto",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: "10px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "var(--gray)",
        }}
      >
        {label}
      </p>
    </motion.div>
  );
}
