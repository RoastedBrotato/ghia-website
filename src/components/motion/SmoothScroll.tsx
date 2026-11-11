"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  easeOutQuart,
  getLenis,
  getSections,
  scrollToTarget,
  sectionTop,
  setLenis,
} from "@/lib/scroll";

/**
 * Relaxed, guided scrolling.
 *
 * 1. Smooth: Lenis eases wheel input so the page glides instead of stepping.
 * 2. Settle: when you stop scrolling close to the start of a section, the page
 *    drifts the rest of the way there — forward if you were heading down, back
 *    if you were heading up. Mid-section reading is never interrupted.
 * 3. Page keys: Page Up/Down and Space move section to section (or by most of
 *    a screen inside long sections).
 * 4. Depth: hero content eases up and fades as you leave it ([data-parallax]).
 *
 * Touch devices keep native momentum scrolling; everything is off under
 * prefers-reduced-motion.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.14, // responsive glide; lower = floatier
      wheelMultiplier: 1,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true,
      anchors: { duration: 0.8, easing: easeOutQuart }, // scroll-padding-top handles the nav offset
    });
    setLenis(lenis);

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let direction = 1;
    let lastY = lenis.scroll;
    let settleTimer = 0;
    let guiding = false;
    let wheeling = false; // a wheel/trackpad gesture is in progress

    /* ------------------------------------------------------- parallax depth */
    const parallax = () => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const k = Number(el.dataset.parallax) || 0.2;
        const y = window.scrollY;
        const vh = window.innerHeight;
        if (y > vh * 1.2) return;
        el.style.transform = `translate3d(0, ${y * k}px, 0)`;
        el.style.opacity = String(Math.max(0, 1 - y / (vh * 0.75)));
      });
    };

    /* --------------------------------------------------------------- settle */
    const settle = () => {
      if (guiding || !finePointer) return;
      // Where the current glide will come to rest — decide from that, so we can
      // redirect the glide mid-flight instead of stopping and moving again.
      const y = lenis.targetScroll;
      const vh = window.innerHeight;
      const sections = getSections();
      if (!sections.length) return;

      let best: { el: HTMLElement; d: number } | null = null;
      for (const el of sections) {
        const d = sectionTop(el) - y; // + below, − above
        // Prefer the section in the direction of travel; allow a small pull the other way.
        const reach = Math.sign(d) === direction ? vh * 0.45 : vh * 0.12;
        if (Math.abs(d) > 6 && Math.abs(d) < reach && (!best || Math.abs(d) < Math.abs(best.d))) {
          best = { el, d };
        }
      }
      if (!best) return;
      // Don't fight the bottom of the page.
      if (y + best.d > lenis.limit - 2) return;
      guiding = true;
      // Numeric target: Lenis applies scroll-padding to element targets, which would double the nav offset.
      const from = lenis.scroll;
      const dist = Math.abs(y + best.d - from);
      lenis.scrollTo(y + best.d, {
        duration: 0.45 + Math.min(0.3, dist / vh * 0.4),
        easing: easeOutQuart,
        onComplete: () => {
          guiding = false;
        },
      });
      window.setTimeout(() => (guiding = false), 1000);
    };

    // Wheel input: guide as soon as the gesture ends (~90ms of no input),
    // while the glide is still moving — no waiting for a full stop.
    const offWheel = lenis.on("virtual-scroll", ({ deltaY }) => {
      if (Math.abs(deltaY) > 0.5) direction = deltaY > 0 ? 1 : -1;
      wheeling = true;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        wheeling = false;
        settle();
      }, 90);
    });

    const offScroll = lenis.on("scroll", () => {
      const y = lenis.scroll;
      if (!wheeling && Math.abs(y - lastY) > 0.5) direction = y > lastY ? 1 : -1;
      lastY = y;
      parallax();
    });

    /* ------------------------------------------------------------ page keys */
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, button, summary, [contenteditable], [role=tab], #mobile-menu"))
        return;
      const down = e.key === "PageDown" || (e.key === " " && !e.shiftKey);
      const up = e.key === "PageUp" || (e.key === " " && e.shiftKey);
      if (!down && !up) return;
      const y = lenis.scroll;
      const vh = window.innerHeight;
      const tops = getSections().map(sectionTop);
      const next = down ? tops.find((top) => top > y + 8) : [...tops].reverse().find((top) => top < y - 8);
      // Long section ahead? Move most of a screen instead of skipping content.
      const step = down ? y + vh * 0.85 : y - vh * 0.85;
      const target =
        next === undefined ? step : Math.abs(next - y) > vh * 1.1 ? step : next;
      e.preventDefault();
      lenis.scrollTo(Math.max(0, target), { duration: 0.7, easing: easeOutQuart });
    };
    window.addEventListener("keydown", onKey);

    /* -------------------------------------------------- "next section" cues */
    const onClick = (e: MouseEvent) => {
      const cue = (e.target as HTMLElement).closest("[data-scroll-next]");
      if (!cue) return;
      e.preventDefault();
      const y = lenis.scroll;
      const next = getSections().find((el) => sectionTop(el) > y + 8);
      if (next) scrollToTarget(next);
    };
    document.addEventListener("click", onClick);

    return () => {
      offScroll();
      offWheel();
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.clearTimeout(settleTimer);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // New page: start at the top (unless it's an in-page link) and re-measure.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    lenis.resize();
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
