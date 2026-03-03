"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ─── TYPES ──────────────────────────────────────────────── */
interface MagBtnProps {
  children: React.ReactNode;
  href: string;
  gold?: boolean;
  className?: string;
}
interface CounterProps { end: number; suffix?: string; label: string; }
interface ProjectCardProps { img: string; title: string; cat: string; year: string; tall?: boolean; }
interface ServiceRowProps { num: string; title: string; desc: string; }

/* ─── LOADER ─────────────────────────────────────────────── */
function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = [15, 35, 55, 72, 88, 100];
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        setTimeout(tick, i === steps.length ? 300 : 380);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    tick();
  }, [onComplete]);

  return (
    <motion.div
      key="loader"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#0a0a0a",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "2rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: "center" }}
      >
        <p style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "0.4em", fontSize: "0.7rem", color: "#c9a84c", textTransform: "uppercase", marginBottom: "1rem" }}>
          OM G Designs
        </p>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,5vw,3.5rem)", color: "#f5f0e8", fontWeight: 300, letterSpacing: "-0.02em" }}>
          Crafting Excellence
        </p>
      </motion.div>
      <div style={{ width: "min(300px, 60vw)", height: "1px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
            width: `${progress}%`, transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em" }}>
        {progress}%
      </p>
    </motion.div>
  );
}

/* ─── CURSOR ─────────────────────────────────────────────── */
function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const move = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ring.current) {
        ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
        ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
        ring.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, borderRadius: "50%", background: "#c9a84c", pointerEvents: "none", zIndex: 9998, top: 0, left: 0, mixBlendMode: "difference" }} />
      <div ref={ring} style={{ position: "fixed", width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.6)", pointerEvents: "none", zIndex: 9997, top: 0, left: 0, transition: "width 0.2s, height 0.2s" }} />
    </>
  );
}

/* ─── MAGNETIC BUTTON ────────────────────────────────────── */
function MagBtn({ children, href, gold = false, className = "" }: MagBtnProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        x: sx, y: sy,
        display: "inline-flex", alignItems: "center", gap: "0.75rem",
        padding: gold ? "0.9rem 2.2rem" : "0.9rem 2.2rem",
        fontFamily: "var(--font-dm-sans)",
        fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase",
        textDecoration: "none",
        background: gold ? "#c9a84c" : "transparent",
        color: gold ? "#0a0a0a" : "#f5f0e8",
        border: gold ? "none" : "1px solid rgba(245,240,232,0.3)",
        cursor: "none",
        transition: "background 0.3s, color 0.3s, border-color 0.3s",
      }}
      whileHover={gold ? { background: "#e8c97a" } : { borderColor: "rgba(245,240,232,0.8)" }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── COUNTER ────────────────────────────────────────────── */
function Counter({ end, suffix = "", label }: CounterProps) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = end / 60;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setVal(end); clearInterval(timer); }
            else setVal(Math.floor(start));
          }, 25);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, color: "#c9a84c", lineHeight: 1 }}>
        {val}{suffix}
      </p>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginTop: "0.5rem" }}>
        {label}
      </p>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────── */
function ProjectCard({ img, title, cat, year, tall = false }: ProjectCardProps) {
  return (
    <motion.div
      whileHover="hover"
      style={{ position: "relative", overflow: "hidden", cursor: "none", gridRow: tall ? "span 2" : "span 1", background: "#111" }}
    >
      <motion.div
        variants={{ hover: { scale: 1.06, filter: "brightness(0.7)" } }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        style={{ width: "100%", height: "100%", minHeight: tall ? 580 : 280 }}
      >
        <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
      </motion.div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.5rem" }}>
          {cat} · {year}
        </p>
        <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.2rem,2.5vw,1.6rem)", color: "#f5f0e8", fontWeight: 400 }}>
          {title}
        </p>
      </div>
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: 40, height: 40, borderRadius: "50%", border: "1px solid #c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ─── SERVICE ROW ────────────────────────────────────────── */
function ServiceRow({ num, title, desc }: ServiceRowProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: "relative", padding: "2rem 0", borderBottom: "1px solid rgba(245,240,232,0.1)", cursor: "none", overflow: "hidden" }}
    >
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "100%", background: "rgba(201,168,76,0.04)", transformOrigin: "left", pointerEvents: "none" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", alignItems: "start", gap: "1.5rem", position: "relative" }}>
        <motion.span
          animate={{ color: hovered ? "#c9a84c" : "rgba(245,240,232,0.2)" }}
          transition={{ duration: 0.3 }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.1em", paddingTop: "0.2rem" }}
        >
          {num}
        </motion.span>
        <div>
          <motion.p
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 400, color: "#f5f0e8", marginBottom: "0.4rem" }}
          >
            {title}
          </motion.p>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.7 }}>
            {desc}
          </p>
        </div>
        <motion.svg
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
          width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginTop: "0.3rem", flexShrink: 0 }}
        >
          <path d="M3 17L17 3M17 3H6M17 3V14" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
        </motion.svg>
      </div>
    </motion.div>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────── */
const TESTIMONIALS = [
  { quote: "OM G Designs transformed our penthouse into an editorial masterpiece. Every detail speaks of thoughtfulness and timeless luxury.", author: "Priya Mehta", role: "Penthouse Owner, Bandra" },
  { quote: "Working with this team was a revelation. They understood our vision before we even articulated it — and elevated it beyond imagination.", author: "Rahul & Sneha Kapoor", role: "Villa Project, Lonavala" },
  { quote: "The hospitality project they delivered for us set a new benchmark in our portfolio. Guests consistently ask who designed the space.", author: "Arjun Malhotra", role: "Boutique Hotel Group" },
];

function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-0.1em", left: "clamp(1rem,4vw,5rem)", fontFamily: "var(--font-cormorant)", fontSize: "clamp(12rem,25vw,22rem)", color: "rgba(201,168,76,0.05)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontWeight: 300 }}>
        &ldquo;
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.3rem,3vw,2.1rem)", fontWeight: 300, fontStyle: "italic", color: "#f5f0e8", lineHeight: 1.7, marginBottom: "2.5rem" }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "#c9a84c", letterSpacing: "0.1em" }}>{t.author}</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "3rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              style={{ width: i === idx ? 28 : 8, height: 1, background: i === idx ? "#c9a84c" : "rgba(245,240,232,0.25)", border: "none", cursor: "none", transition: "all 0.4s ease", padding: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── DATA ───────────────────────────────────────────────── */
const PROJECTS = [
  { img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85", title: "The Sanjeev Residence", cat: "Residential", year: "2024", tall: true },
  { img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&q=85", title: "Kapoor Commercial Hub", cat: "Commercial", year: "2024" },
  { img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=700&q=85", title: "Azure Boutique Hotel", cat: "Hospitality", year: "2023" },
  { img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=85", title: "Malhotra Penthouse", cat: "Residential", year: "2023", tall: false },
];

const SERVICES = [
  { num: "01", title: "Residential Design", desc: "Bespoke sanctuaries tailored to how you live, breathe, and dream." },
  { num: "02", title: "Commercial Spaces", desc: "Environments that elevate brand identity and workplace performance." },
  { num: "03", title: "Hospitality Design", desc: "Guest experiences built around emotion, narrative, and sensory delight." },
  { num: "04", title: "Space Planning", desc: "Intelligent layouts maximising flow, light, and spatial poetry." },
  { num: "05", title: "Art Curation", desc: "Handpicked pieces that anchor the soul of every room we create." },
];

const MARQUEE_WORDS = ["Interior Design", "Space Planning", "Art Direction", "Residential", "Commercial", "Hospitality", "Award-Winning", "Since 2014"];

/* ─── HOME ───────────────────────────────────────────────── */
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  const headline = ["Designing", "Dreams", "Since 2014"];

  return (
    <>
      <AnimatePresence>{!loaded && <Loader onComplete={handleLoaded} />}</AnimatePresence>
      <Cursor />

      {/* HERO */}
      <section
        ref={heroRef}
        style={{ position: "relative", height: "100svh", overflow: "hidden", background: "#050505" }}
      >
        {/* Parallax image */}
        <motion.div style={{ position: "absolute", inset: "-10%", y: heroY }}>
          <Image src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=85" alt="OM G Designs hero" fill priority style={{ objectFit: "cover" }} />
        </motion.div>

        {/* Dark gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.35) 60%, rgba(5,5,5,0.6) 100%)", zIndex: 2 }} />

        {/* Hero content */}
        <motion.div
          style={{ position: "absolute", inset: 0, zIndex: 3, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(1.5rem,6vw,7rem)", paddingTop: "clamp(6rem,10vw,9rem)", opacity: heroOpacity }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.8rem" }}
          >
            Interior Design Studio · Mumbai
          </motion.p>

          <div style={{ overflow: "hidden" }}>
            {headline.map((word, i) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "110%" }}
                  animate={loaded ? { y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.13, duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                  style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.5rem,10vw,8.5rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.05, letterSpacing: "-0.03em", display: "block" }}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}
          >
            <MagBtn href="/projects" gold>Explore Work</MagBtn>
            <MagBtn href="/contact">Begin a Project</MagBtn>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "2.5rem", right: "clamp(1.5rem,6vw,7rem)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 60, background: "linear-gradient(to bottom, transparent, #c9a84c)" }}
          />
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", writingMode: "vertical-lr" }}>
            Scroll
          </p>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)", padding: "1rem 0", overflow: "hidden", background: "#0a0a0a" }}>
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", paddingRight: "3rem" }}>
              {i % 2 === 0 ? w : <span style={{ color: "#c9a84c" }}>✦</span>}
            </span>
          ))}
        </motion.div>
      </div>

      {/* STATS */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a", borderBottom: "1px solid rgba(245,240,232,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }} className="stats-grid">
          <Counter end={10} suffix="+" label="Years of Excellence" />
          <Counter end={350} suffix="+" label="Projects Completed" />
          <Counter end={28} label="Design Awards" />
          <Counter end={100} suffix="%" label="Client Satisfaction" />
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a", overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=60" alt="" fill style={{ objectFit: "cover", filter: "grayscale(40%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(10,10,10,0.88) 50%, rgba(8,8,8,0.97) 100%)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,8vw,7rem)", alignItems: "center", position: "relative", zIndex: 1 }} className="about-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ position: "relative" }}
          >
            <div style={{ position: "relative", aspectRatio: "4/5", overflow: "hidden" }}>
              <Image src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85" alt="OM G Designs studio" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "#c9a84c", padding: "1.5rem 2rem", maxWidth: 200 }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.6rem", color: "#0a0a0a", fontWeight: 400, lineHeight: 1.2 }}>28<br /><span style={{ fontSize: "0.8rem", fontFamily: "var(--font-dm-sans)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Awards</span></p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem" }}>
              Our Philosophy
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              Spaces that tell your story
            </h2>
            <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: "1.8rem" }} />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.9, marginBottom: "2rem" }}>
              We believe design is biography made tangible. Every project begins with listening — to you, to the space, to the light. What emerges is never decoration, but a living reflection of who you are.
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              Since 2014, our Mumbai studio has shaped residences, offices, and hospitality spaces across India with precision, passion, and purpose.
            </p>
            <MagBtn href="/about">Our Story</MagBtn>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,7rem)", background: "#080808" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.75rem" }}>Selected Work</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>Featured Projects</h2>
          </div>
          <MagBtn href="/projects">View All Projects</MagBtn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gridTemplateRows: "280px 280px", gap: "0.75rem" }} className="projects-grid">
          {PROJECTS.map((p) => <ProjectCard key={p.title} {...p} />)}
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1600&q=60" alt="" fill style={{ objectFit: "cover", filter: "grayscale(60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.92) 60%, rgba(10,10,10,0.98) 100%)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "clamp(3rem,8vw,7rem)", alignItems: "start", position: "relative", zIndex: 1 }} className="services-grid">
          <div style={{ position: "sticky", top: "7rem" }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1rem" }}>What We Do</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "2rem" }}>
              Our Services
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.8, marginBottom: "2rem" }}>
              A full spectrum of design disciplines — each delivered with the precision and artistry that defines OM G Designs.
            </p>
            <MagBtn href="/services">All Services</MagBtn>
          </div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.1)" }}>
            {SERVICES.map(s => <ServiceRow key={s.num} {...s} />)}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* PROCESS */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#080808", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1600&q=60" alt="" fill style={{ objectFit: "cover", filter: "grayscale(50%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.94)" }} />
        </div>
        <div style={{ textAlign: "center", marginBottom: "4rem", position: "relative", zIndex: 1 }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.75rem" }}>How We Work</p>
          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>Our Process</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", position: "relative", zIndex: 1 }} className="process-grid">
          {[
            { step: "01", title: "Discovery", desc: "Deep-dive conversations to understand your vision, lifestyle, and aspirations." },
            { step: "02", title: "Concept", desc: "Moodboards, spatial narratives, and design direction crafted with intention." },
            { step: "03", title: "Design", desc: "Technical drawings, material specifications, and 3D visualisations." },
            { step: "04", title: "Realisation", desc: "Meticulous execution with premium contractors and artisan craftspeople." },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              style={{ padding: "2rem 0", borderTop: "1px solid rgba(245,240,232,0.08)" }}
            >
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "3.5rem", fontWeight: 300, color: "rgba(201,168,76,0.15)", lineHeight: 1, marginBottom: "1.5rem" }}>{item.step}</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", color: "#f5f0e8", marginBottom: "0.75rem" }}>{item.title}</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.8 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "clamp(6rem,12vw,10rem) clamp(1.5rem,6vw,7rem)", overflow: "hidden", textAlign: "center" }}>
        <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85" alt="CTA background" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.75)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.2rem" }}
          >
            Begin Your Journey
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "2.5rem" }}
          >
            Let&apos;s create something extraordinary together
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}
          >
            <MagBtn href="/contact" gold>Start a Conversation</MagBtn>
            <MagBtn href="/projects">See Our Work</MagBtn>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid, .services-grid { grid-template-columns: 1fr !important; }
          .projects-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: auto !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .projects-grid, .stats-grid, .process-grid { grid-template-columns: 1fr !important; }
        }
        * { cursor: none !important; }
        @media (hover: none) { * { cursor: auto !important; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #c9a84c; }
      `}</style>
    </>
  );
}
