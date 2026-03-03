"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── DATA ──────────────────────────────────────────────── */
const categories = ["All", "Design Insights", "Materials", "Trends", "Project Stories", "Living Well"];

const posts = [
  {
    id: 1,
    category: "Design Insights",
    title: "The Art of Negative Space in Luxury Interiors",
    excerpt: "In a world that equates more with better, the most sophisticated spaces dare to breathe. We explore how restraint becomes the ultimate luxury.",
    date: "February 18, 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
    featured: true,
  },
  {
    id: 2,
    category: "Materials",
    title: "Marble, Limestone & Onyx: Choosing the Right Stone",
    excerpt: "Natural stone is the cornerstone of timeless interiors. A deep dive into veining, porosity, finish and the stories each slab tells.",
    date: "February 5, 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    featured: false,
  },
  {
    id: 3,
    category: "Trends",
    title: "Biophilic Design: Bringing the Outdoors In",
    excerpt: "Nature-inspired interiors are no longer a trend — they are a philosophy. How we weave living materials, light and organic forms into our projects.",
    date: "January 22, 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    featured: false,
  },
  {
    id: 4,
    category: "Project Stories",
    title: "Inside the Ivory Residence: A Mumbai Story",
    excerpt: "A South Mumbai penthouse reimagined as a sanctuary. We trace the journey from a blank concrete shell to a home that feels inevitable.",
    date: "January 10, 2026",
    readTime: "10 min read",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
    featured: false,
  },
  {
    id: 5,
    category: "Living Well",
    title: "How Your Home Shapes Your Wellbeing",
    excerpt: "The science of space — how ceiling height, natural light, texture and colour temperature subtly programme how we feel, think and recover.",
    date: "December 28, 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80",
    featured: false,
  },
  {
    id: 6,
    category: "Design Insights",
    title: "Lighting as Architecture: The Fourth Dimension",
    excerpt: "Light is not a finishing touch — it is a material. How we design with natural and artificial light to sculpt space, depth and emotion.",
    date: "December 12, 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    featured: false,
  },
  {
    id: 7,
    category: "Materials",
    title: "The Return of Solid Wood in Contemporary Interiors",
    excerpt: "Engineered panels had their moment. Today's most considered interiors are returning to solid timber — its warmth, imperfection and permanence.",
    date: "November 30, 2025",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    featured: false,
  },
  {
    id: 8,
    category: "Trends",
    title: "Quiet Luxury: The Aesthetic Taking Over Mumbai's Homes",
    excerpt: "No logos. No noise. No excess. A generation of homeowners is choosing interiors that whisper rather than shout — and the results are extraordinary.",
    date: "November 14, 2025",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?w=1200&q=80",
    featured: false,
  },
];

/* ─── POST CARD ─────────────────────────────────────────── */
function PostCard({ post, i, large = false }: { post: typeof posts[0]; i: number; large?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", flexDirection: "column", background: "#0f0f0f", border: "1px solid rgba(201,168,76,0.08)", overflow: "hidden", transition: "border-color 0.3s ease" }}
    >
      {/* Image */}
      <Link href="#" style={{ display: "block", textDecoration: "none", overflow: "hidden", position: "relative", aspectRatio: large ? "16/9" : "3/2", flexShrink: 0 }}>
        <Image
          src={post.img}
          alt={post.title}
          fill
          unoptimized
          style={{
            objectFit: "cover",
            transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.06)" : "scale(1.0)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: `rgba(10,10,10,${hovered ? 0.3 : 0.15})`, transition: "background 0.4s" }} />
        {/* Category tag */}
        <div style={{
          position: "absolute", top: 14, left: 14,
          fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase",
          color: "#c9a84c", border: "1px solid rgba(201,168,76,0.45)", padding: "5px 12px",
          backdropFilter: "blur(8px)", background: "rgba(10,10,10,0.55)",
        }}>
          {post.category}
        </div>
      </Link>

      {/* Body */}
      <div style={{ padding: "clamp(20px,2.5vw,32px)", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.58rem", color: "rgba(245,240,232,0.3)", letterSpacing: "0.08em" }}>{post.date}</span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,168,76,0.4)", flexShrink: 0 }} />
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.58rem", color: "rgba(245,240,232,0.3)", letterSpacing: "0.08em" }}>{post.readTime}</span>
        </div>

        <Link href="#" style={{ textDecoration: "none" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: large ? "clamp(22px,2.2vw,32px)" : "clamp(18px,1.6vw,22px)",
            fontWeight: 400, color: hovered ? "#e8c97a" : "#f5f0e8",
            lineHeight: 1.25, marginBottom: 12,
            transition: "color 0.3s ease",
          }}>
            {post.title}
          </h2>
        </Link>

        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", lineHeight: 1.8,
          color: "rgba(245,240,232,0.45)", marginBottom: 20, flex: 1,
        }}>
          {post.excerpt}
        </p>

        <Link
          href="#"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none",
            fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.18em",
            textTransform: "uppercase", color: "#c9a84c",
            opacity: hovered ? 1 : 0.6, transition: "opacity 0.3s ease",
          }}
        >
          Read Article
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.25 }}>→</motion.span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const featured = posts[0];
  const rest = filtered.filter((p) => p.id !== featured.id || activeCategory !== "All");
  const showFeatured = activeCategory === "All";

  return (
    <div style={{ background: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        .journal-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; }
        .filter-btn { transition: color 0.25s, background 0.25s, border-color 0.25s; }
        @media (max-width: 900px) { .journal-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 700px) { .featured-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 540px) { .journal-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ══════════ HERO ═══════════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "68vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1497366754035-f200581f8b77?w=1800&q=80"
          alt="Journal hero"
          fill unoptimized priority
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.98) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "130px 24px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}
          >
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Perspectives & Stories</span>
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
          </motion.div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(52px,9vw,116px)", fontWeight: 300, lineHeight: 1, color: "#f5f0e8", margin: 0 }}
            >
              The{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Journal
              </em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.85rem,1.2vw,1rem)", lineHeight: 1.8, color: "rgba(245,240,232,0.5)", maxWidth: 500, margin: "24px auto 0" }}
          >
            Ideas, insights and inspiration from the world of design — curated by the OM G Designs studio.
          </motion.p>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 56, gap: 6 }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ══════════ FEATURED ARTICLE ════════════════════════ */}
      {showFeatured && (
        <motion.section
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ position: "relative", margin: "3px 0", overflow: "hidden" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 520 }} className="featured-grid">
            {/* Image */}
            <div style={{ position: "relative", minHeight: 400, overflow: "hidden" }}>
              <Image src={featured.img} alt={featured.title} fill unoptimized style={{ objectFit: "cover", transition: "transform 0.9s ease", }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 70%, rgba(10,10,10,0.95))" }} />
            </div>
            {/* Content */}
            <div style={{ background: "#0f0f0f", padding: "clamp(40px,5vw,72px)", display: "flex", flexDirection: "column", justifyContent: "center", borderLeft: "1px solid rgba(201,168,76,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.4)", padding: "4px 12px" }}>{featured.category}</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.08em", color: "rgba(245,240,232,0.25)" }}>Featured</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px,3vw,46px)", fontWeight: 400, color: "#f5f0e8", lineHeight: 1.15, marginBottom: 20 }}>
                {featured.title}
              </h2>
              <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: 22, opacity: 0.6 }} />
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", lineHeight: 1.9, color: "rgba(245,240,232,0.5)", marginBottom: 32, maxWidth: 440 }}>
                {featured.excerpt}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.58rem", color: "rgba(245,240,232,0.3)" }}>{featured.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(201,168,76,0.4)" }} />
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.58rem", color: "rgba(245,240,232,0.3)" }}>{featured.readTime}</span>
              </div>
              <Link
                href="#"
                style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0a0a0a", background: "linear-gradient(90deg,#c9a84c,#e8c97a)", textDecoration: "none", padding: "13px 32px", transition: "opacity 0.25s, transform 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Read Article <span style={{ fontSize: "1rem" }}>→</span>
              </Link>
            </div>
          </div>
        </motion.section>
      )}

      {/* ══════════ FILTER BAR ══════════════════════════════ */}
      <div style={{
        position: "sticky", top: 64, zIndex: 40,
        background: "rgba(10,10,10,0.96)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        display: "flex", justifyContent: "center", alignItems: "center",
        gap: "clamp(4px,1.5vw,24px)", padding: "0 24px", flexWrap: "wrap",
      }}>
        {categories.map((cat) => {
          const active = cat === activeCategory;
          return (
            <button
              key={cat} className="filter-btn"
              onClick={() => setActiveCategory(cat)}
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase",
                background: active ? "#c9a84c" : "transparent",
                color: active ? "#0a0a0a" : "rgba(245,240,232,0.45)",
                border: `1px solid ${active ? "#c9a84c" : "transparent"}`,
                padding: "14px 16px", cursor: "pointer", outline: "none", whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; } }}
              onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = "rgba(245,240,232,0.45)"; e.currentTarget.style.borderColor = "transparent"; } }}
            >
              {cat}
            </button>
          );
        })}
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.12em", color: "rgba(245,240,232,0.2)", marginLeft: 8, whiteSpace: "nowrap" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ══════════ ARTICLE GRID ════════════════════════════ */}
      <section style={{ padding: "3px", background: "#0a0a0a" }}>
        <motion.div layout className="journal-grid">
          <AnimatePresence mode="popLayout">
            {(showFeatured ? filtered.slice(1) : filtered).map((post, i) => (
              <PostCard key={post.id} post={post} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 24px" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px,2vw,28px)", color: "rgba(245,240,232,0.3)" }}>No articles in this category yet.</p>
          </div>
        )}
      </section>

      {/* ══════════ NEWSLETTER STRIP ════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px)" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", marginBottom: 12 }}>Stay Updated</p>
            <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.15, margin: 0 }}>
              Design thinking,{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                delivered
              </em>
            </h3>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", lineHeight: 1.8, color: "rgba(245,240,232,0.4)", marginTop: 12, marginBottom: 0 }}>
              New articles, project features and studio notes — straight to your inbox. No noise, only signal.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex", gap: 0, flex: "1 1 320px", maxWidth: 480 }}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.2)",
                borderRight: "none", padding: "14px 20px",
                fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "#f5f0e8", outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#0a0a0a", background: "linear-gradient(90deg,#c9a84c,#e8c97a)",
                border: "none", padding: "14px 28px", cursor: "pointer", whiteSpace: "nowrap",
                transition: "opacity 0.25s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </motion.section>

      {/* ══════════ CTA ═════════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,140px) 24px", textAlign: "center" }}>
        <Image src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1800&q=80" alt="CTA" fill unoptimized style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Your Story</span>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px,6vw,80px)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.1, marginBottom: 20 }}>
              Ready to Begin{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Yours?
              </em>
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(0.85rem,1.2vw,1rem)", lineHeight: 1.8, color: "rgba(245,240,232,0.5)", maxWidth: 460, margin: "0 auto 44px" }}>
              Every great space has a story. Let&apos;s start writing yours together.
            </p>
            <Link
              href="/contact"
              style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "var(--font-dm-sans)", fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0a0a0a", background: "linear-gradient(90deg,#c9a84c,#e8c97a)", textDecoration: "none", padding: "16px 40px", transition: "opacity 0.25s, transform 0.25s" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Book a Consultation <span style={{ fontSize: "1rem" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
