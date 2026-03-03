"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const categories = ["All", "Residential", "Commercial", "Hospitality", "Retail"];

const projects = [
  { id: 1, title: "The Ivory Residence", category: "Residential", location: "Mumbai", year: "2024", img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80", tall: true },
  { id: 2, title: "Azure Corporate Hub", category: "Commercial", location: "Bengaluru", year: "2024", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80", tall: false },
  { id: 3, title: "The Golden Suite", category: "Hospitality", location: "Goa", year: "2023", img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80", tall: false },
  { id: 4, title: "Maison Blanc Penthouse", category: "Residential", location: "Delhi", year: "2023", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80", tall: true },
  { id: 5, title: "The Serenity Spa & Lounge", category: "Hospitality", location: "Udaipur", year: "2023", img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80", tall: false },
  { id: 6, title: "Prestige Retail Flagship", category: "Retail", location: "Chennai", year: "2022", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80", tall: false },
  { id: 7, title: "The Garden Villa", category: "Residential", location: "Pune", year: "2022", img: "https://images.unsplash.com/photo-1600607687939-ce8a6eb19a00?w=1200&q=80", tall: true },
  { id: 8, title: "Atrium Business Centre", category: "Commercial", location: "Hyderabad", year: "2022", img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80", tall: false },
  { id: 9, title: "The Pearl Boutique Hotel", category: "Hospitality", location: "Jaipur", year: "2021", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80", tall: false },
];

/* ─── PROJECT CARD ──────────────────────────────────── */
function ProjectCard({ project, i }: { project: typeof projects[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{ breakInside: "avoid", marginBottom: 3 }}
    >
      <Link
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ display: "block", textDecoration: "none", position: "relative", overflow: "hidden" }}
      >
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: project.tall ? "3/4" : "4/3", overflow: "hidden" }}>
          <Image
            src={project.img}
            alt={project.title}
            fill
            unoptimized
            style={{
              objectFit: "cover",
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.07)" : "scale(1.0)",
            }}
          />
          {/* Dark gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, rgba(10,10,10,${hovered ? "0.95" : "0.75"}) 0%, rgba(10,10,10,0.1) 55%)`,
              transition: "background 0.45s ease",
            }}
          />

          {/* Category badge */}
          <div
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.55rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#c9a84c",
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "5px 12px",
              backdropFilter: "blur(8px)",
              background: "rgba(10,10,10,0.5)",
            }}
          >
            {project.category}
          </div>

          {/* Arrow icon top-right on hover */}
          <div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              border: "1px solid rgba(201,168,76,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c9a84c",
              fontSize: "0.9rem",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scale(1)" : "scale(0.8)",
              backdropFilter: "blur(8px)",
              background: "rgba(10,10,10,0.5)",
            }}
          >
            ↗
          </div>

          {/* Bottom info */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "clamp(16px,2vw,28px)",
              transform: hovered ? "translateY(0)" : "translateY(6px)",
              transition: "transform 0.45s ease",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,240,232,0.45)",
                marginBottom: 6,
              }}
            >
              {project.location} · {project.year}
            </p>
            <h3
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(18px,1.8vw,24px)",
                fontWeight: 400,
                color: hovered ? "#e8c97a" : "#f5f0e8",
                lineHeight: 1.2,
                margin: 0,
                transition: "color 0.3s ease",
              }}
            >
              {project.title}
            </h3>

            {/* Gold rule reveal */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 10,
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.35s ease",
              }}
            >
              <span style={{ width: 24, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c" }}>
                View Project
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── PAGE ──────────────────────────────────────────── */
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div style={{ background: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 860px) { .portfolio-cols { columns: 2 !important; } }
        @media (max-width: 540px) { .portfolio-cols { columns: 1 !important; } }
        .filter-btn { transition: color 0.25s, background 0.25s, border-color 0.25s; }
      `}</style>

      {/* ══════════ HERO ════════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "75vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1800&q=80"
          alt="Portfolio hero"
          fill
          unoptimized
          priority
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.98) 100%)" }} />
        {/* Gold top line */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "130px 24px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}
          >
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Our Work</span>
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(52px,9vw,116px)",
                fontWeight: 300,
                lineHeight: 1,
                color: "#f5f0e8",
                margin: 0,
              }}
            >
              Curated{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Portfolio
              </em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.85rem,1.2vw,1rem)",
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.5)",
              maxWidth: 500,
              margin: "24px auto 0",
            }}
          >
            A selection of our finest work — from intimate residences to grand commercial spaces across India.
          </motion.p>

          {/* Stat line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.7 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 40, marginTop: 52 }}
          >
            {[["250+", "Projects"], ["12+", "Years"], ["5", "Categories"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 300, background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{num}</div>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════ FILTER BAR ══════════════════════════════ */}
      <div
        style={{
          position: "sticky",
          top: 64,
          zIndex: 40,
          background: "rgba(10,10,10,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "clamp(8px,2vw,32px)",
          padding: "0 24px",
          flexWrap: "wrap",
        }}
      >
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat}
              className="filter-btn"
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                background: active ? "#c9a84c" : "transparent",
                color: active ? "#0a0a0a" : "rgba(245,240,232,0.45)",
                border: `1px solid ${active ? "#c9a84c" : "transparent"}`,
                padding: "14px 20px",
                cursor: "pointer",
                outline: "none",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "rgba(245,240,232,0.45)"; e.currentTarget.style.borderColor = "transparent"; } }}
            >
              {cat}
            </button>
          );
        })}
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "rgba(245,240,232,0.2)", marginLeft: 8 }}>
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ══════════ MASONRY GRID ════════════════════════════ */}
      <section style={{ padding: "clamp(32px,4vw,56px) clamp(16px,3vw,48px)", background: "#0a0a0a" }}>
        <motion.div
          layout
          className="portfolio-cols"
          style={{ columns: 3, gap: 3 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px,2vw,28px)", color: "rgba(245,240,232,0.35)" }}>
              No projects in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* ══════════ FEATURED LARGE CALLOUT ═════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        style={{
          position: "relative",
          height: "clamp(380px,50vw,640px)",
          overflow: "hidden",
          margin: "3px 0",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=1800&q=80"
          alt="Featured project"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "clamp(32px,5vw,80px)" }}>
          <div style={{ maxWidth: 520 }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 16 }}>
              Featured Project
            </p>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 20 }}>
              The Obsidian{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Penthouse
              </em>
            </h2>
            <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: 20, opacity: 0.6 }} />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.82rem", lineHeight: 1.8, color: "rgba(245,240,232,0.5)", marginBottom: 32, maxWidth: 420 }}>
              A rooftop sanctuary spanning 4,200 sq ft in South Mumbai. Every surface tells a story of material mastery and restrained luxury.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a84c",
                border: "1px solid rgba(201,168,76,0.4)",
                padding: "12px 28px",
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#c9a84c"; e.currentTarget.style.color = "#0a0a0a"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#c9a84c"; }}
            >
              Start a Similar Project <span>→</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ══════════ CTA ═════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,140px) 24px", textAlign: "center" }}>
        <Image
          src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1800&q=80"
          alt="CTA background"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Your Space</span>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px,6vw,80px)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 20 }}>
              Envision Your{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Dream Space
              </em>
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.85rem,1.2vw,1rem)", lineHeight: 1.8, color: "rgba(245,240,232,0.5)", maxWidth: 460, margin: "0 auto 44px" }}>
              Every great project starts with a conversation. Let&apos;s create yours.
            </p>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0a0a0a",
                background: "linear-gradient(90deg,#c9a84c,#e8c97a)",
                textDecoration: "none",
                padding: "16px 40px",
                transition: "opacity 0.25s, transform 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Start a Project <span style={{ fontSize: "1rem" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

