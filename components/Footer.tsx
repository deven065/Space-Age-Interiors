"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const PAGES = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Studio" },
  { href: "/projects", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const SERVICES = [
  "Residential Design",
  "Commercial Spaces",
  "Hospitality Design",
  "Space Planning",
  "Art Curation",
];

const SOCIALS = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "Pinterest" },
  { href: "#", label: "Houzz" },
  { href: "#", label: "LinkedIn" },
];

const label: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: "0.65rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "#c9a84c",
  marginBottom: "1.5rem",
  display: "block",
};

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: "0.85rem",
  color: "rgba(245,240,232,0.5)",
  textDecoration: "none",
  letterSpacing: "0.04em",
  lineHeight: 1,
  display: "inline-block",
  transition: "color 0.3s",
};

export default function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid rgba(201,168,76,0.12)", position: "relative" }}>
      {/* Gold gradient line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, #c9a84c 40%, #c9a84c 60%, transparent)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem clamp(1.5rem,6vw,7rem) 0" }}>

        {/* Top section */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: "4rem", paddingBottom: "4rem", borderBottom: "1px solid rgba(245,240,232,0.06)" }} className="footer-grid">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.4rem", fontWeight: 300, letterSpacing: "0.06em", color: "#f5f0e8", display: "block", lineHeight: 1 }}>
                OM G<span style={{ color: "#c9a84c" }}> ·</span> Designs
              </span>
            </Link>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.85rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.9, maxWidth: 280, marginBottom: "2rem" }}>
              Transforming spaces into timeless works of art. Premium interior design since 2014.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.35)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <span style={label}>Pages</span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {PAGES.map(p => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <span style={label}>Services</span>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
              {SERVICES.map(s => (
                <li key={s}>
                  <Link
                    href="/services"
                    style={linkStyle}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <span style={label}>Get In Touch</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { sub: "Email", val: "hello@omgdesigns.com", href: "mailto:hello@omgdesigns.com" },
                { sub: "Phone", val: "+91 98921 14799", href: "tel:+919892114799" },
                { sub: "Studio", val: "No. 2, Sharma Estate, Kokanipada, Malad East, Mumbai – 400 097", href: null },
              ].map(item => (
                <div key={item.sub}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.25)", marginBottom: "0.35rem" }}>
                    {item.sub}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.7)", textDecoration: "none", transition: "color 0.3s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
                    >
                      {item.val}
                    </a>
                  ) : (
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.7)" }}>{item.val}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.8rem 0", gap: "1.5rem", flexWrap: "wrap" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "rgba(245,240,232,0.25)", letterSpacing: "0.08em" }}>
            © 2026 OM G Designs. All rights reserved.
          </p>

          {/* Digital Signature */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 18, height: 1, background: "rgba(201,168,76,0.4)" }} />
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.12em", color: "rgba(245,240,232,0.2)" }}>
              Designed &amp; Developed by{" "}
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                  fontWeight: 400,
                  background: "linear-gradient(90deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.06em",
                }}
              >
                Deven Digital Labs
              </span>
            </p>
            <div style={{ width: 18, height: 1, background: "rgba(201,168,76,0.4)" }} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
