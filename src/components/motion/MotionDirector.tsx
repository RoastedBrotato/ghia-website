"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  animate,
  createTimeline,
  onScroll,
  scrambleText,
  splitText,
  stagger,
  svg,
} from "animejs";

/**
 * Site-wide motion, driven by data attributes so pages stay server components.
 *
 *   data-split="words|chars"   headline rises out of a clipping mask
 *   data-split-now             …on load instead of on scroll (hero)
 *   data-scramble              mono text decodes from random glyphs
 *   data-draw                  SVG strokes draw themselves in
 *   data-stagger               direct children cascade in
 *   data-scrub-words           words light up as you scroll through (manifesto)
 *   data-magnetic              element leans toward the pointer
 *
 * Everything is skipped under prefers-reduced-motion, and CSS reveals
 * anything still hidden after 2.5s if this script never runs.
 */
export function MotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    const cleanups: (() => void)[] = [];
    const shown = (el: Element) => {
      (el as HTMLElement).style.animation = "none";
      (el as HTMLElement).style.opacity = "1";
    };

    if (reduce) {
      document.querySelectorAll("[data-split],[data-scramble],[data-stagger]").forEach(shown);
      root.classList.add("motion-ready");
      return;
    }

    // Set up after first paint so hydration isn't blocked; hero copy is hidden
    // by CSS until then, so there's no flash.
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      setup();
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const useIdle = typeof idle === "function";
    const handle = useIdle ? idle!(run, { timeout: 250 }) : window.setTimeout(run, 50);

    function setup() {
    // One observer fires each element's intro once, when it enters the viewport.
    const intros = new Map<Element, () => void>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          intros.get(e.target)?.();
          intros.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    const onEnter = (el: Element, fn: () => void, now = false) => {
      if (now) return fn();
      intros.set(el, fn);
      io.observe(el);
    };

    /* ---------------------------------------------------------- split text */
    document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
      const mode = el.dataset.split === "chars" ? "chars" : "words";
      const split = splitText(el, {
        words: { wrap: "clip" },
        ...(mode === "chars" ? { chars: true } : {}),
      });
      const targets = mode === "chars" ? split.chars : split.words;
      targets.forEach((t: HTMLElement) => {
        t.style.transform = "translateY(110%)";
      });
      shown(el);
      onEnter(
        el,
        () => {
          animate(targets, {
            y: ["110%", "0%"],
            rotate: mode === "chars" ? [6, 0] : [3, 0],
            duration: mode === "chars" ? 1100 : 900,
            delay: stagger(mode === "chars" ? 28 : 55, { start: el.hasAttribute("data-split-now") ? 250 : 0 }),
            ease: "out(4)",
          });
        },
        el.hasAttribute("data-split-now"),
      );
      cleanups.push(() => split.revert());
    });

    /* ------------------------------------------------------------ scramble */
    document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
      // Cache the real text once — effects can run twice (React dev) and the
      // scramble blanks the element before it decodes.
      if (el.dataset.text === undefined) el.dataset.text = el.textContent ?? "";
      const text = el.dataset.text;
      el.textContent = text;
      shown(el);
      el.style.visibility = "hidden";
      onEnter(
        el,
        () => {
          el.style.visibility = "visible";
          animate(el, {
            innerHTML: scrambleText({ text, chars: "A-Z0-9#%_", from: "left", override: "" }),
            duration: 900,
            ease: "linear",
          });
        },
        el.hasAttribute("data-split-now"),
      );
    });

    /* ---------------------------------------------------------------- draw */
    document.querySelectorAll<SVGElement>("svg[data-draw]").forEach((el) => {
      const shapes = el.querySelectorAll<SVGGeometryElement>(
        'path:not([fill]):not([data-nodraw]), [fill="none"] > path, [fill="none"] > circle, path[fill="none"], line',
      );
      if (!shapes.length) return;
      const drawables = svg.createDrawable(Array.from(shapes));
      animate(drawables, { draw: "0 0", duration: 0 });
      const dots = el.querySelectorAll<SVGElement>("[data-dot]");
      dots.forEach((d) => (d.style.opacity = "0"));
      onEnter(el, () => {
        const tl = createTimeline({
          defaults: { ease: "inOut(3)" },
          // anime flattens caps while drawing; restore the brand's round ends.
          onComplete: () => shapes.forEach((s) => (s.style.strokeLinecap = "round")),
        });
        tl.add(drawables, { draw: ["0 0", "0 1"], duration: 1600, delay: stagger(90) });
        if (dots.length)
          tl.add(dots, { opacity: [0, 1], scale: [0, 1], duration: 700, ease: "outElastic(1, .5)" }, "-=500");
      });
    });

    /* ------------------------------------------------------------- stagger */
    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
      const kids = Array.from(el.children) as HTMLElement[];
      kids.forEach((k) => {
        k.style.opacity = "0";
        k.style.transform = "translateY(40px)";
      });
      shown(el);
      onEnter(el, () => {
        animate(kids, {
          opacity: [0, 1],
          y: [40, 0],
          duration: 900,
          delay: stagger(90, { from: el.dataset.stagger === "center" ? "center" : "first" }),
          ease: "out(4)",
        });
      });
    });

    /* --------------------------------------------------------- scrub words */
    document.querySelectorAll<HTMLElement>("[data-scrub-words]").forEach((el) => {
      const split = splitText(el, { words: true });
      shown(el);
      const anim = animate(split.words, {
        opacity: [0.18, 1],
        duration: 1000,
        delay: stagger(1000 / Math.max(1, split.words.length)),
        ease: "linear",
        autoplay: onScroll({ target: el, enter: "85% start", leave: "40% end", sync: 0.4 }),
      });
      cleanups.push(() => {
        anim.revert();
        split.revert();
      });
    });

    /* ------------------------------------------------------------ magnetic */
    if (window.matchMedia("(pointer: fine)").matches) {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = 0.28;
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * strength;
          const y = (e.clientY - (r.top + r.height / 2)) * strength;
          animate(el, { x, y, duration: 350, ease: "out(3)" });
        };
        const leave = () => animate(el, { x: 0, y: 0, duration: 900, ease: "outElastic(1, .4)" });
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    }

    /* ----------------------------------------------------- card spotlight */
    const spot = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest?.(".spotlight") as HTMLElement | null;
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", spot, { passive: true });
    cleanups.push(() => window.removeEventListener("pointermove", spot));

    root.classList.add("motion-ready");
    cleanups.push(() => io.disconnect());
    }

    return () => {
      cancelled = true;
      if (useIdle) (window as Window & { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(handle);
      else window.clearTimeout(handle);
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}
