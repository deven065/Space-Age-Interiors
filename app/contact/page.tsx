"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/* ─── DATA ───────────────────────────────────────────────── */
const SERVICES = [
  "Residential Design",
  "Commercial Spaces",
  "Hospitality Design",
  "Space Planning",
  "Art Curation",
  "Consultation Only",
];

const INFO = [
  { icon: "◎", label: "Studio", value: "R No. 21, 2, Vaishet Pada, Triveni Nagar,\nMalad East, Mumbai, Maharashtra 400097", href: null },
  { icon: "✉", label: "Email", value: "hello@spaceageinteriors.com", href: "mailto:hello@spaceageinteriors.com" },
  { icon: "◇", label: "Phone", value: "+91 98921 14799", href: "tel:+919892114799" },
  { icon: "◈", label: "Hours", value: "Monday – Saturday\n9:00 AM – 7:00 PM", href: null },
];

const FAQS = [
  { q: "How long does a typical residential project take?", a: "Project timelines vary by scope. A single room redesign can take 6–8 weeks, while a full home project typically spans 4–8 months from concept to completion." },
  { q: "What is included in the initial consultation?", a: "Our complimentary 60-minute consultation covers your vision, budget expectations, timeline and project scope. It is completely obligation-free." },
  { q: "Do you work on projects outside Mumbai?", a: "Yes. While our studio is based in Mumbai, we actively work on projects across India and internationally for select clients." },
  { q: "What is your typical project budget range?", a: "Our residential projects typically begin at ₹20 lakhs. We work across a range of budgets for commercial and hospitality projects, with pricing discussed during consultation." },
];

/* ─── INPUT STYLE ────────────────────────────────────────── */
const baseInput: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: "0.88rem",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(201,168,76,0.2)",
  color: "#f5f0e8",
  padding: "0.9rem 0",
  width: "100%",
  outline: "none",
  transition: "border-color 0.3s",
  letterSpacing: "0.03em",
};

/* ─── FAQ ITEM ───────────────────────────────────────────── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08, duration: 0.6 }}
      style={{ borderBottom: "1px solid rgba(245,240,232,0.07)" }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.6rem 0", background: "none", border: "none", cursor: "none", textAlign: "left", gap: "2rem" }}
      >
        <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.1rem,2vw,1.3rem)", fontWeight: 400, color: open ? "#c9a84c" : "#f5f0e8", transition: "color 0.3s", lineHeight: 1.4 }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ color: "#c9a84c", fontSize: "1.5rem", flexShrink: 0, lineHeight: 1 }}
        >+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.9, paddingBottom: "1.5rem" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1800);
  };

  const field = (id: string): React.CSSProperties => ({
    ...baseInput,
    borderBottomColor: focused === id ? "#c9a84c" : "rgba(201,168,76,0.2)",
  });

  return (
    <div style={{ background: "#0a0a0a" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "5rem" }}>
        <Image
          src="https://images.unsplash.com/photo-1618219944342-824e40a13285?w=1920&q=80"
          alt="Contact"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.65) 50%, rgba(10,10,10,1) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "4rem clamp(1.5rem,6vw,7rem)", maxWidth: 800, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}
          >
            <div style={{ width: 40, height: 1, background: "#c9a84c" }} />
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Let&apos;s Connect</span>
            <div style={{ width: 40, height: 1, background: "#c9a84c" }} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(3.5rem,10vw,7rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}
          >
            Get In{" "}
            <em style={{ color: "#c9a84c", fontStyle: "italic" }}>Touch</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.95rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.9, maxWidth: 520, margin: "0 auto" }}
          >
            Begin your design journey with a complimentary consultation. We&apos;d love to hear about your space.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,7rem)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: "clamp(3rem,8vw,6rem)", alignItems: "start" }} className="contact-grid">

          {/* ── LEFT INFO ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1rem" }}>Contact Info</p>
              <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "1.2rem" }}>
                We&apos;d love to<br /><em style={{ color: "#c9a84c" }}>hear from you</em>
              </h2>
              <div style={{ width: 40, height: 1, background: "#c9a84c", marginBottom: "1.5rem" }} />
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.9, marginBottom: "2.5rem" }}>
                Whether you&apos;re planning a complete renovation or simply curious about what&apos;s possible — reach out. The first consultation is always complimentary.
              </p>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {INFO.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.6 }}
                  style={{ display: "flex", gap: "1.2rem", alignItems: "flex-start" }}
                >
                  <span style={{ color: "#c9a84c", fontSize: "1.1rem", marginTop: "0.1rem", flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.35rem" }}>{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.75)", textDecoration: "none", transition: "color 0.3s", whiteSpace: "pre-line" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#c9a84c")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.75)")}
                      >{item.value}</a>
                    ) : (
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.75)", whiteSpace: "pre-line" }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Google Maps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{ marginTop: "2.5rem" }}
            >
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,232,0.3)", marginBottom: "0.75rem" }}>
                ◎ &nbsp;Find Us
              </p>
              <div style={{ position: "relative", border: "1px solid rgba(201,168,76,0.2)", overflow: "hidden" }}>
                {/* Gold corner accents */}
                <div style={{ position: "absolute", top: 0, left: 0, width: 20, height: 20, borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c", zIndex: 2, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, width: 20, height: 20, borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c", zIndex: 2, pointerEvents: "none" }} />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.295056811193!2d72.86154447580807!3d19.182310948625233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b700037d6f35%3A0xff4527de30dd34fe!2sSpace%20Age%20Interiors!5e0!3m2!1sen!2sin!4v1772606012175!5m2!1sen!2sin"
                  width="100%"
                  height="240"
                  style={{ border: 0, display: "block", filter: "invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.85)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Space Age Interiors Location"
                />
              </div>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.72rem", color: "rgba(245,240,232,0.3)", marginTop: "0.6rem", letterSpacing: "0.04em" }}>
                Space Age Interiors · Mumbai
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT FORM ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            style={{ border: "1px solid rgba(201,168,76,0.12)", padding: "clamp(2rem,5vw,3.5rem)", background: "rgba(255,255,255,0.015)", position: "relative", overflow: "hidden" }}
          >
            {/* Corner accent */}
            <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, borderTop: "1px solid #c9a84c", borderLeft: "1px solid #c9a84c" }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, borderBottom: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} onSubmit={handleSubmit}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.75rem" }}>Start the Conversation</p>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 300, color: "#f5f0e8", lineHeight: 1.2, marginBottom: "2.5rem", letterSpacing: "-0.02em" }}>
                    Tell us about<br /><em style={{ color: "#c9a84c" }}>your project</em>
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 2rem", marginBottom: "1.5rem" }} className="form-cols">
                    <div>
                      <label style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: "0.5rem" }}>Full Name *</label>
                      <input type="text" required value={form.name} placeholder="Your full name"
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={field("name")} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: "0.5rem" }}>Email Address *</label>
                      <input type="email" required value={form.email} placeholder="hello@email.com"
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={field("email")} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: "0.5rem" }}>Phone Number</label>
                      <input type="tel" value={form.phone} placeholder="+91 00000 00000"
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        style={field("phone")} />
                    </div>
                    <div>
                      <label style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: "0.5rem" }}>Service</label>
                      <select value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        onFocus={() => setFocused("service")} onBlur={() => setFocused(null)}
                        style={{ ...field("service"), appearance: "none", cursor: "none" }}>
                        <option value="" style={{ background: "#0a0a0a" }}>Select a service</option>
                        {SERVICES.map(s => <option key={s} value={s} style={{ background: "#0a0a0a" }}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.35)", display: "block", marginBottom: "0.5rem" }}>Tell Us About Your Space *</label>
                    <textarea required rows={5} value={form.message}
                      placeholder="Describe your space, vision and any specific requirements..."
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...baseInput, resize: "none", borderBottom: "none", border: `1px solid ${focused === "message" ? "#c9a84c" : "rgba(201,168,76,0.2)"}`, padding: "1rem", lineHeight: 1.8 }} />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ background: "#e8c97a" }}
                    style={{ width: "100%", padding: "1.1rem", background: "#c9a84c", border: "none", cursor: "none", fontFamily: "var(--font-dm-sans)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", transition: "background 0.3s" }}
                  >
                    {loading ? (
                      <>
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          style={{ display: "inline-block", width: 14, height: 14, border: "2px solid transparent", borderTopColor: "#0a0a0a", borderRightColor: "#0a0a0a", borderRadius: "50%" }} />
                        Sending…
                      </>
                    ) : <>Send Message <span style={{ fontSize: "1rem" }}>→</span></>}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div key="success"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "4rem 2rem", gap: "1.5rem" }}
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    style={{ width: 64, height: 64, borderRadius: "50%", border: "1px solid #c9a84c", background: "rgba(201,168,76,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#c9a84c", fontSize: "1.5rem" }}>✓</span>
                  </motion.div>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2.2rem", fontWeight: 300, color: "#f5f0e8" }}>
                    Message <em style={{ color: "#c9a84c" }}>Received</em>
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.9, maxWidth: 300 }}>
                    Thank you for reaching out. A member of our team will be in touch within 24 hours.
                  </p>
                  <div style={{ width: 40, height: 1, background: "#c9a84c" }} />
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", service: "", message: "" }); }}
                    style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.4)", background: "none", border: "none", cursor: "none", transition: "color 0.3s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#f5f0e8")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
                  >Send Another Message</button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,7rem)", borderTop: "1px solid rgba(245,240,232,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1600&q=60" alt="" fill style={{ objectFit: "cover", filter: "grayscale(60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.95)" }} />
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: "center", marginBottom: "3.5rem" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#c9a84c" }}>Common Questions</span>
              <div style={{ width: 30, height: 1, background: "#c9a84c" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 300, color: "#f5f0e8", letterSpacing: "-0.02em" }}>
              Frequently <em style={{ color: "#c9a84c" }}>Asked</em>
            </h2>
          </motion.div>
          <div style={{ borderTop: "1px solid rgba(245,240,232,0.07)" }}>
            {FAQS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} i={i} />)}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .form-cols { grid-template-columns: 1fr !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.2); }
        select option { background: #0a0a0a; color: #f5f0e8; }
      `}</style>
    </div>
  );
}
