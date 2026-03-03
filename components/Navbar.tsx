"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.6, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          padding: "1.2rem clamp(1.5rem,6vw,7rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease",
          background: scrolled ? "rgba(10,10,10,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.08em", color: "#f5f0e8", cursor: "none" }}
        >
          OM G<span style={{ color: "#c9a84c" }}> ·</span> Designs
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setActiveLink(link.href)}
              onMouseLeave={() => setActiveLink(null)}
              style={{
                position: "relative",
                padding: "0.5rem 1rem",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: activeLink === link.href ? "#f5f0e8" : "rgba(245,240,232,0.6)",
                transition: "color 0.3s",
                cursor: "none",
              }}
            >
              {link.label}
              {activeLink === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  style={{ position: "absolute", bottom: 0, left: "1rem", right: "1rem", height: 1, background: "#c9a84c" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            style={{
              marginLeft: "1rem",
              padding: "0.6rem 1.4rem",
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#0a0a0a",
              background: "#c9a84c",
              cursor: "none",
              transition: "background 0.3s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e8c97a")}
            onMouseLeave={e => (e.currentTarget.style.background = "#c9a84c")}
          >
            Contact
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          className="hamburger-btn"
          style={{ display: "none", flexDirection: "column", gap: 5, padding: "0.5rem", cursor: "none", background: "none", border: "none" }}
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }} style={{ display: "block", width: 24, height: 1, background: "#f5f0e8", transformOrigin: "center" }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: "block", width: 24, height: 1, background: "#f5f0e8" }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }} style={{ display: "block", width: 24, height: 1, background: "#f5f0e8", transformOrigin: "center" }} />
        </button>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99,
              background: "#0a0a0a",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(2.5rem,8vw,4rem)",
                    fontWeight: 300,
                    color: "#f5f0e8",
                    cursor: "none",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a84c", cursor: "none" }}
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
