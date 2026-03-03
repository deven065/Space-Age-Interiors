"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── DATA ─────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    title: "Residential Design",
    subtitle: "Luxury Homes & Apartments",
    desc: "From compact urban apartments to sprawling villas, we design homes that are deeply personal. We collaborate closely with homeowners to understand how they live, what they love and how they want to feel — translating lifestyle into a curated living environment.",
    features: ["Full home design", "Furniture & fixture selection", "Custom millwork", "Material & finish curation", "Styling & accessorising"],
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80",
  },
  {
    number: "02",
    title: "Commercial Design",
    subtitle: "Offices & Corporate Spaces",
    desc: "We design commercial environments that reflect your brand identity while energising the people who work within them. From boardrooms to break-out zones, we balance aesthetics with functionality to create workplaces that attract talent and drive performance.",
    features: ["Workplace strategy", "Brand-aligned environments", "Ergonomic planning", "Meeting & collaborative spaces", "Sustainable design solutions"],
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
  {
    number: "03",
    title: "Hospitality Design",
    subtitle: "Hotels, Restaurants & Resorts",
    desc: "Exceptional guest experiences are designed, not happenstance. Our hospitality practice creates immersive environments that tell a story from arrival to departure — spaces where guests return, linger and share.",
    features: ["Hotel lobby & suite design", "Restaurant & bar environments", "Resort & spa concepts", "Brand storytelling through space", "Operational efficiency planning"],
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    number: "04",
    title: "Space Planning",
    subtitle: "Strategic Layout Optimisation",
    desc: "Space is one of the most valuable assets in any project. Our space planning service ensures every square foot is purposeful, traffic flows intuitively and the layout supports the way people actually use the space.",
    features: ["Functional layout analysis", "Traffic flow optimization", "Zoning & programming", "AutoCAD & BIM planning", "Compliance & accessibility"],
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    number: "05",
    title: "3D Visualization",
    subtitle: "Photorealistic Renders & Walkthroughs",
    desc: "See your space before it exists. Our visualization team creates photorealistic renders and immersive virtual walkthroughs that allow you to experience and refine every detail of your space before a single nail is driven.",
    features: ["Photorealistic 3D renders", "Virtual walkthroughs", "Animated fly-throughs", "Material & lighting simulation", "Design iteration support"],
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  },
  {
    number: "06",
    title: "Project Management",
    subtitle: "End-to-End Execution",
    desc: "Great design must be executed with the same precision it was conceived with. Our project management team oversees every element of delivery — vendors, timelines, budgets and quality — so you experience a seamless journey from concept to completion.",
    features: ["Vendor selection & coordination", "Timeline & budget management", "On-site supervision", "Quality control", "Snag-free handover"],
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
  },
];

const process = [
  { step: "01", title: "Initial Consultation", desc: "A complimentary 60-minute session to explore your vision, requirements and budget — no obligations." },
  { step: "02", title: "Concept Development", desc: "Mood boards, spatial concepts and material palettes tailored to your brief and presented for feedback." },
  { step: "03", title: "Design Development", desc: "Detailed drawings, specifications and 3D visualizations refined until every element is perfected." },
  { step: "04", title: "Implementation", desc: "Meticulous on-site management ensuring every detail is executed precisely as designed." },
];

/* ─── SERVICE ROW COMPONENT ─────────────────────────────── */
function ServiceSection({ service, i }: { service: typeof services[0]; i: number }) {
  const [hovered, setHovered] = useState(false);
  const isEven = i % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        minHeight: 480,
      }}
      className="service-row"
    >
      {/* ── Image ─────────────────────────────────────────── */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          overflow: "hidden",
          order: isEven ? 0 : 1,
          minHeight: 440,
        }}
      >
        <Image
          src={service.img}
          alt={service.title}
          fill
          unoptimized
          style={{
            objectFit: "cover",
            transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.07)" : "scale(1.0)",
          }}
        />
        {/* Directional overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isEven
              ? "linear-gradient(to left, rgba(10,10,10,0.5) 0%, transparent 60%)"
              : "linear-gradient(to right, rgba(10,10,10,0.5) 0%, transparent 60%)",
          }}
        />
        {/* Large ghost number */}
        <div
          style={{
            position: "absolute",
            bottom: 24,
            ...(isEven ? { right: 28 } : { left: 28 }),
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(80px,10vw,140px)",
            fontWeight: 300,
            lineHeight: 1,
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,168,76,0.3)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {service.number}
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(40px,5vw,80px) clamp(32px,5vw,72px)",
          background: i % 2 === 1 ? "#080808" : "#0a0a0a",
          order: isEven ? 1 : 0,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.6rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: 12,
          }}
        >
          {service.subtitle}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(30px,3.2vw,48px)",
            fontWeight: 400,
            color: "#f5f0e8",
            lineHeight: 1.15,
            marginBottom: 20,
          }}
        >
          {service.title}
        </h2>
        {/* Gold rule */}
        <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: 24, opacity: 0.6 }} />
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.85rem",
            lineHeight: 1.9,
            color: "rgba(245,240,232,0.55)",
            marginBottom: 28,
            maxWidth: 480,
          }}
        >
          {service.desc}
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 36 }}>
          {service.features.map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 18, height: 1, background: "#c9a84c", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.8rem", color: "rgba(245,240,232,0.75)" }}>{f}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
            border: "1px solid rgba(201,168,76,0.4)",
            padding: "12px 28px",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "#c9a84c";
            (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            (e.currentTarget as HTMLAnchorElement).style.color = "#c9a84c";
          }}
        >
          Enquire Now
          <span style={{ fontSize: "0.9rem" }}>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ──────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div style={{ background: "#0a0a0a", overflowX: "hidden" }}>
      <style>{`
        @media (max-width: 860px) {
          .service-row { grid-template-columns: 1fr !important; }
          .service-row > div { order: unset !important; min-height: 320px !important; }
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .process-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .why-grid > div { border-right: none !important; border-bottom: 1px solid rgba(201,168,76,0.1); }
        }
        .process-card { transition: border-color 0.35s ease, background 0.35s ease; }
        .process-card:hover { border-color: rgba(201,168,76,0.35) !important; background: rgba(201,168,76,0.04) !important; }
        .process-number {
          transition: -webkit-text-stroke-color 0.4s ease, filter 0.4s ease;
        }
        .process-card:hover .process-number {
          -webkit-text-stroke-color: #c9a84c;
          filter: drop-shadow(0 0 10px rgba(201,168,76,0.8)) drop-shadow(0 0 28px rgba(201,168,76,0.35));
        }
      `}</style>

      {/* ═══════════════ HERO ═══════════════════════════════ */}
      <section style={{ position: "relative", minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&q=80"
          alt="Services hero"
          fill
          unoptimized
          priority
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.7) 50%, rgba(10,10,10,0.97) 100%)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent, #c9a84c 30%, #c9a84c 70%, transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "120px 24px 80px" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 28 }}
          >
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>
              What We Offer
            </span>
            <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
          </motion.div>

          <div style={{ overflow: "hidden", marginBottom: 12 }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(52px,9vw,110px)",
                fontWeight: 300,
                lineHeight: 1,
                color: "#f5f0e8",
                margin: 0,
              }}
            >
              Our{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Services
              </em>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "clamp(0.85rem,1.2vw,1rem)",
              lineHeight: 1.8,
              color: "rgba(245,240,232,0.5)",
              maxWidth: 520,
              margin: "24px auto 0",
            }}
          >
            A comprehensive suite of design services — crafted to transform every kind of space into something extraordinary.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 56, gap: 6 }}
          >
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)" }}>Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ QUICK NAV ══════════════════════════ */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          position: "sticky",
          top: 64,
          zIndex: 30,
          background: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.12)",
          display: "flex",
          justifyContent: "center",
          gap: "clamp(16px,3vw,48px)",
          padding: "0 24px",
          overflowX: "auto",
        }}
      >
        {services.map((s) => (
          <a
            key={s.number}
            href={`#service-${s.number}`}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.45)",
              textDecoration: "none",
              padding: "18px 0",
              whiteSpace: "nowrap",
              transition: "color 0.2s, border-bottom-color 0.2s",
              borderBottom: "1px solid transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#c9a84c"; e.currentTarget.style.borderBottomColor = "#c9a84c"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(245,240,232,0.45)"; e.currentTarget.style.borderBottomColor = "transparent"; }}
          >
            {s.title}
          </a>
        ))}
      </motion.nav>

      {/* ═══════════════ SERVICE ROWS ═══════════════════════ */}
      <section style={{ background: "#0a0a0a" }}>
        {services.map((service, i) => (
          <div key={service.number} id={`service-${service.number}`}>
            <ServiceSection service={service} i={i} />
          </div>
        ))}
      </section>

      {/* ═══════════════ PROCESS ════════════════════════════ */}
      <section style={{ position: "relative", padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", overflow: "hidden" }}>
        <Image
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1800&q=80"
          alt="Process background"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.93)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "clamp(40px,6vw,80px)" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 20 }}>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Our Process</span>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(36px,5vw,72px)", fontWeight: 300, color: "#f5f0e8", margin: 0, lineHeight: 1.1 }}>
              How It{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Works
              </em>
            </h2>
          </motion.div>

          <div className="process-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="process-card"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.1)",
                  padding: "clamp(28px,3vw,48px) clamp(20px,2.5vw,36px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  className="process-number"
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: 80,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "transparent",
                    WebkitTextStroke: "1px rgba(201,168,76,0.15)",
                    marginBottom: 20,
                    userSelect: "none",
                  }}
                >
                  {p.step}
                </div>
                <div style={{ position: "absolute", top: 0, left: 0, width: 24, height: 24, borderTop: "1px solid rgba(201,168,76,0.5)", borderLeft: "1px solid rgba(201,168,76,0.5)" }} />
                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px,1.8vw,26px)", fontWeight: 400, color: "#f5f0e8", marginBottom: 14, lineHeight: 1.2 }}>
                  {p.title}
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.78rem", lineHeight: 1.8, color: "rgba(245,240,232,0.45)", margin: 0 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY US STRIP ═══════════════════════ */}
      <section style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div
          className="why-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px)",
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 1,
          }}
        >
          {[
            { stat: "12+", label: "Years of Excellence", note: "Crafting luxury spaces since 2014" },
            { stat: "250+", label: "Projects Completed", note: "Residential, commercial & hospitality" },
            { stat: "100%", label: "Client Satisfaction", note: "We don't stop until you love it" },
          ].map((item, i) => (
            <motion.div
              key={item.stat}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{
                textAlign: "center",
                padding: "clamp(32px,4vw,60px) 24px",
                borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(48px,5vw,72px)",
                  fontWeight: 300,
                  background: "linear-gradient(90deg,#c9a84c,#e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {item.stat}
              </div>
              <div style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(16px,1.4vw,20px)", fontWeight: 400, color: "#f5f0e8", marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "rgba(245,240,232,0.35)", letterSpacing: "0.05em" }}>{item.note}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CTA ════════════════════════════════ */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,140px) 24px", textAlign: "center" }}>
        <Image
          src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1800&q=80"
          alt="CTA background"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.92)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(to right,transparent,#c9a84c 30%,#c9a84c 70%,transparent)" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 24 }}>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c" }}>Begin Today</span>
              <span style={{ width: 40, height: 1, background: "#c9a84c", opacity: 0.5 }} />
            </div>
            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(40px,6vw,80px)",
                fontWeight: 300,
                color: "#f5f0e8",
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Ready to{" "}
              <em style={{ background: "linear-gradient(90deg,#c9a84c,#e8c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontStyle: "italic" }}>
                Begin?
              </em>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "clamp(0.85rem,1.2vw,1rem)",
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.5)",
                maxWidth: 500,
                margin: "0 auto 44px",
              }}
            >
              Start with a complimentary 60-minute design consultation. No obligations — just a conversation about your vision.
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
              Book Free Consultation
              <span style={{ fontSize: "1rem" }}>→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
