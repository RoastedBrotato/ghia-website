"use client";

import { useEffect, useRef } from "react";

/**
 * Oversized kinetic marquee. Drifts on its own; scrolling speeds it up and
 * shears it in the scroll direction, then it eases back.
 */
export function VelocityMarquee({ words }: { words: string[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let x = 0;
    let v = 0;
    let lastY = window.scrollY;
    let raf = 0;
    let running = false;

    const tick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      v += (dy * 0.6 - v) * 0.12;
      const speed = 1.1 + Math.abs(v) * 0.9;
      x -= speed * (v < -0.2 ? -1 : 1);
      const half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      const skew = Math.max(-12, Math.min(12, v * -0.6));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${skew}deg)`;
      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => {
      running = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (running) {
        lastY = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(track);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper py-8 sm:py-10" aria-hidden="true">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={
                i % 2 === 0
                  ? "whitespace-nowrap px-8 font-display text-[clamp(3.5rem,2rem+6vw,8.5rem)] leading-none tracking-[-0.04em] text-ink"
                  : "text-outline whitespace-nowrap px-8 font-display text-[clamp(3.5rem,2rem+6vw,8.5rem)] leading-none tracking-[-0.04em]"
              }
            >
              {w}
            </span>
            <span className="size-4 shrink-0 rounded-full bg-volt shadow-[0_0_24px_rgba(22,120,232,0.8)] sm:size-5" />
          </span>
        ))}
      </div>
    </div>
  );
}
