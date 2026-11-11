"use client";

import { useEffect, useRef } from "react";

/**
 * Studio-style cursor follower for fine pointers: a cyan dot that tracks
 * exactly and a ring that trails and swells over interactive elements.
 * The native cursor stays visible; this only adds emphasis.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      scale = 1,
      targetScale = 1,
      raf = 0;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const hit = (e.target as HTMLElement).closest("a,button,[data-magnetic],summary");
      targetScale = hit ? 2.4 : 1;
      d.style.opacity = r.style.opacity = "1";
    };
    const leave = () => (d.style.opacity = r.style.opacity = "0");
    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.15;
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div
        ref={ring}
        className="absolute -left-4 -top-4 size-8 rounded-full border border-cyan/60 opacity-0 transition-opacity duration-300"
      />
      <div
        ref={dot}
        className="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-cyan opacity-0 transition-opacity duration-300"
      />
    </div>
  );
}
