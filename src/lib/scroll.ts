import type Lenis from "lenis";

/** Shared handle to the page's Lenis instance (null under reduced motion / before mount). */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

export const NAV_OFFSET = 72;

/** Smoothly scroll to an element (or y position), falling back to native scrolling. */
export function scrollToTarget(target: Element | number, opts: { duration?: number } = {}) {
  const lenis = instance;
  if (lenis) {
    // Always a numeric target: Lenis applies scroll-padding to element targets.
    lenis.scrollTo(typeof target === "number" ? target : sectionTop(target), {
      duration: opts.duration ?? 0.8,
      easing: easeOutQuart,
    });
    return;
  }
  const y =
    typeof target === "number"
      ? target
      : target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top: y, behavior: "smooth" });
}

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * The page's "chapters": elements marked data-section, or — on pages without
 * labels — the top-level sections that are at least ~40% of a screen tall.
 */
export function getSections(): HTMLElement[] {
  const labelled = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
  if (labelled.length >= 3) return labelled;
  const vh = window.innerHeight;
  return Array.from(document.querySelectorAll<HTMLElement>("main > section, main > article")).filter(
    (el) => el.offsetHeight > vh * 0.4,
  );
}

export const sectionTop = (el: Element) =>
  el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
