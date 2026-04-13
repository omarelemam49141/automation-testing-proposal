"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const next = max <= 0 ? 0 : el.scrollTop / max;
      setP(Math.min(1, Math.max(0, next)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed start-0 end-0 top-0 z-[60] h-1 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-gradient-to-l from-accent via-primary to-glow transition-[transform] duration-150 ease-out rtl:origin-right"
        style={{
          transform: `scaleX(${p})`,
          boxShadow: p > 0 ? "0 0 12px 2px var(--glow)" : "none",
        }}
      />
    </div>
  );
}
