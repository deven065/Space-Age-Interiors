"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── DATA ───────────────────────────────────────────────── */
const TEAM = [
  { name: "Aarav Mehta", role: "Principal Designer & Founder", bio: "With 15+ years across India and Europe, Aarav leads with a philosophy that beauty must serve life.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "Priya Nair", role: "Senior Interior Architect", bio: "A graduate of NID Ahmedabad, Priya specialises in spatial narratives blending culture with contemporary design.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" },
  { name: "Kabir Sharma", role: "Creative Director", bio: "Kabir brings a cinematic sensibility to each project — ensuring every space has a visual story worth telling.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80" },
  { name: "Neha Patel", role: "3D Visualisation Lead", bio: "Neha's renders are indistinguishable from photography, giving clients a perfect preview of their future space.", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
];

const AWARDS = [
  { year: "2024", title: "Best Luxury Residential Design", org: "India Design Awards" },
  { year: "2024", title: "Most Innovative Studio", org: "Elle Décor India" },
  { year: "2023", title: "Excellence in Hospitality Design", org: "Commercial Design India" },
  { year: "2023", title: "Young Designer of the Year", org: "Architectural Digest India" },
  { year: "2022", title: "Best Sustainable Interior", org: "GreenBuild India" },
  { year: "2021", title: "Iconic Interior Studio", org: "Houzz India Awards" },
];

const VALUES = [
  { n: "01", title: "Timeless Elegance", desc: "We design beyond trends — creating spaces that remain beautiful, functional and relevant for decades." },
  { n: "02", title: "Bespoke Craftsmanship", desc: "Every element is considered, customised and curated for the unique individual we serve." },
  { n: "03", title: "Story-Driven Spaces", desc: "Great interiors tell stories. We listen to yours and translate it into an environment that feels unmistakably you." },
  { n: "04", title: "Collaborative Vision", desc: "Your home is your canvas. We are here to help you paint it — with expertise, empathy and imagination." },
];

const STATS = [
  { end: 350, suffix: "+", label: "Projects Completed" },
  { end: 10, suffix: "+", label: "Years of Excellence" },
  { end: 28, suffix: "", label: "Design Awards" },
  { end: 20, suffix: "+", label: "Team Members" },
];

/* ─── COUNTER ────────────────────────────────────────────── */
function Counter({ end, suffix = "", label }: { end: number; suffix?: string; label: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let s = 0;
        const step = end / 60;
        const timer = setInterval(() => {
          s += step;
          if (s >= end) { setVal(end); clearInterval(timer); } else setVal(Math.floor(s));
        }, 25);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3rem,6vw,5rem)", fontWeight: 300, color: "#c9a84c", lineHeight: 1 }}>{val}{suffix}</p>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", marginTop: "0.5rem" }}>{label}</p>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div style={{ background: "#0a0a0a" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80" alt="OM G Designs Studio" fill style={{ objectFit: "cover" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.88) 0%, rgba(5,5,5,0.65) 50%, rgba(10,10,10,1) 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "8rem clamp(1.5rem,6vw,7rem) 5rem", maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.8rem" }}>
            <div style={{ width: 40, height: 1, background: "#c9a84c" }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Our Story</span>
            <div style={{ width: 40, height: 1, background: "#c9a84c" }} />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.5rem,10vw,8rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "1.8rem" }}>
            About <em style={{ color: "#c9a84c" }}>OM G</em><br />Designs
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.9, maxWidth: 560, margin: "0 auto" }}>
            A team of passionate designers, artists and thinkers dedicated to creating spaces that transform how people feel in their environment.
          </motion.p>
        </div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #c9a84c)" }} />
        </motion.div>
      </section>

      {/* ── VISION ── */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1618219740975-d40978bb7378?w=1600&q=60" alt="" fill style={{ objectFit: "cover", filter: "grayscale(50%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)" }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem,8vw,7rem)", alignItems: "center", position: "relative", zIndex: 1 }} className="about-split">

          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1rem" }}>Who We Are</p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
              A studio driven by <em style={{ color: "#c9a84c" }}>passion</em><br />and precision
            </h2>
            <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: "1.8rem" }} />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.9, marginBottom: "1.2rem" }}>
              Founded in Mumbai in 2014, OM G Designs has grown from a two-person boutique into a 20-strong multidisciplinary studio. Our work spans luxury residences, flagship commercial spaces and award-winning hospitality venues across India.
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
              We believe great design is never accidental — it is the product of rigorous thinking, deep empathy and an unrelenting commitment to craft. From the first pencil sketch to the final installation, every step is executed with the same level of care.
            </p>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.9rem 2.2rem", fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0a0a0a", background: "#c9a84c", textDecoration: "none", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8c97a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#c9a84c")}>
              Work With Us
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80", mt: "0" },
              { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", mt: "2rem" },
              { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", mt: "-2rem" },
              { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", mt: "0" },
            ].map((img, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", marginTop: img.mt }}>
                <Image src={img.src} alt="OM G Designs project" fill style={{ objectFit: "cover" }} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,6vw,7rem)", background: "#060606", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }} className="stats-row">
          {STATS.map(s => <Counter key={s.label} end={s.end} suffix={s.suffix} label={s.label} />)}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Our Philosophy</span>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>
              What We <em style={{ color: "#c9a84c" }}>Believe</em>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(245,240,232,0.06)" }} className="values-grid">
            {VALUES.map((v, i) => (
              <motion.div key={v.n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}
                style={{ background: "#0a0a0a", padding: "3rem", display: "flex", gap: "1.5rem", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "3rem", fontWeight: 300, color: "rgba(201,168,76,0.2)", lineHeight: 1, flexShrink: 0 }}>{v.n}</span>
                <div>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.4rem", fontWeight: 400, color: "#f5f0e8", marginBottom: "0.75rem" }}>{v.title}</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.85 }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#080808", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=50" alt="" fill style={{ objectFit: "cover", filter: "grayscale(70%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.95)" }} />
        </div>
        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>The People</span>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>
              Meet the <em style={{ color: "#c9a84c" }}>Team</em>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem" }} className="team-grid">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.8 }}>
                <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", marginBottom: "1.2rem" }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1.06)"; }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector("img") as HTMLImageElement; if (img) img.style.transform = "scale(1)"; }}>
                  <Image src={m.img} alt={m.name} fill style={{ objectFit: "cover", transition: "transform 0.7s cubic-bezier(0.25,1,0.5,1)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 55%)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 400, color: "#f5f0e8", marginBottom: "0.3rem" }}>{m.name}</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.75rem" }}>{m.role}</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.8 }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(1.5rem,6vw,7rem)", background: "#0a0a0a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Recognition</span>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,5vw,4.5rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>
              Our <em style={{ color: "#c9a84c" }}>Awards</em>
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(201,168,76,0.1)" }} className="awards-grid">
            {AWARDS.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.6 }}
                style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.6rem 1rem", borderBottom: "1px solid rgba(201,168,76,0.1)", transition: "background 0.3s", cursor: "default" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,0.03)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.3rem", fontWeight: 300, color: "rgba(201,168,76,0.5)", flexShrink: 0, width: "3.5rem" }}>{a.year}</span>
                <div style={{ width: 1, height: 36, background: "rgba(201,168,76,0.2)", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.1rem", fontWeight: 400, color: "#f5f0e8", marginBottom: "0.2rem" }}>{a.title}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>{a.org}</p>
                </div>
                <span style={{ color: "#c9a84c", fontSize: "0.9rem", opacity: 0.4, flexShrink: 0 }}>→</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ position: "relative", padding: "clamp(6rem,12vw,10rem) clamp(1.5rem,6vw,7rem)", overflow: "hidden", textAlign: "center" }}>
        <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" alt="CTA" fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.8)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.2rem" }}>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Let&apos;s Create</span>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
            </div>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.5rem,6vw,4.5rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            Start your <em style={{ color: "#c9a84c" }}>project</em>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.9rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
            Ready to transform your space? Get in touch for a complimentary design consultation.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <Link href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "1rem 2.5rem", fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0a0a0a", background: "#c9a84c", textDecoration: "none", transition: "background 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#e8c97a")}
              onMouseLeave={e => (e.currentTarget.style.background = "#c9a84c")}>
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-split { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .awards-grid { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .team-grid, .stats-row { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
