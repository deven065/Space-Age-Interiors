"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [outlinePos, setOutlinePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let animFrame: number;
    let target = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    let current = { x: 0, y: 0 };
    const animate = () => {
      current.x = lerp(current.x, target.x, 0.12);
      current.y = lerp(current.y, target.y, 0.12);
      setOutlinePos({ x: current.x, y: current.y });
      animFrame = requestAnimationFrame(animate);
    };
    animate();

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const interactables = document.querySelectorAll(
      "a, button, .magnetic, input, textarea, select, label"
    );
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", () => setVisible(false));
    window.addEventListener("mouseenter", () => setVisible(true));

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animFrame);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className={`cursor-dot ${hovered ? "hovered" : ""}`}
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={`cursor-outline ${hovered ? "hovered" : ""}`}
        style={{ left: outlinePos.x, top: outlinePos.y }}
      />
    </>
  );
}
