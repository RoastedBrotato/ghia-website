"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cx } from "@/components/ui/primitives";
import { scrollToTarget } from "@/lib/scroll";

type Item = { label: string; el: HTMLElement };

/**
 * A quiet chapter rail on the right edge (wide screens): one tick per labelled
 * section, the current one lit in cyan with its name. Click to glide there.
 */
export function SectionRail() {
  const pathname = usePathname();
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    // Defer the state update out of the effect body.
    raf = requestAnimationFrame(() =>
      setItems(els.map((el) => ({ label: el.dataset.section || "", el }))),
    );
    if (els.length < 3) return () => cancelAnimationFrame(raf);

    const update = () => {
      const mid = window.innerHeight * 0.45;
      let idx = 0;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= mid) idx = i;
      });
      setActive(idx);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
    };
  }, [pathname]);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 min-[1560px]:block"
    >
      <ol className="flex flex-col items-end gap-2.5">
        {items.map((it, i) => (
          <li key={it.label}>
            <button
              type="button"
              onClick={() => scrollToTarget(it.el)}
              aria-current={i === active ? "true" : undefined}
              className="group flex items-center gap-3 py-0.5"
            >
              <span
                className={cx(
                  "rounded-full bg-[rgba(3,11,26,0.6)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] backdrop-blur transition-all duration-300",
                  i === active
                    ? "translate-x-0 text-cyan opacity-100"
                    : "translate-x-1 text-ink-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                {it.label}
              </span>
              <span
                className={cx(
                  "block h-px transition-all duration-500",
                  i === active ? "w-6 bg-cyan shadow-[0_0_10px_rgba(0,200,255,0.8)]" : "w-3 bg-line-control group-hover:w-5 group-hover:bg-ink-muted",
                )}
              />
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
