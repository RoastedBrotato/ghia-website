"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { Button, Container, cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, servicesByPillar } from "@/content/services";

const SLIDE_MS = 7000;

/**
 * Home services showcase: one slide per main category, auto-advancing with a
 * progress bar on each tab (pauses on hover/focus), swipe and arrow keys.
 * Each slide lists its sub-services as links and shows them orbiting a core.
 */
export function ServiceSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [reduce, setReduce] = useState(false);
  const [inView, setInView] = useState(false);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const n = pillarOrder.length;
  const go = useCallback((i: number) => {
    setActive((i + n) % n);
    setHovered(null);
  }, [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    const raf = requestAnimationFrame(sync);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", sync);
    };
  }, []);

  // Only auto-advance while the slider is actually being looked at.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.4), {
      threshold: [0, 0.4, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const key = pillarOrder[active];
  const cat = pillars[key];
  const subs = servicesByPillar(key);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const j = (next + n) % n;
    go(j);
    tabs.current[j]?.focus();
  };

  return (
    <section
      ref={root}
      data-section="Services"
      id="services"
      className="relative overflow-hidden bg-paper py-20 sm:py-24"
      style={{ ["--hue" as string]: cat.hue }}
    >
      {/* Category-tinted glow that shifts with the slide */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[720px] rounded-full opacity-40 blur-3xl transition-[background] duration-1000"
        style={{ background: `radial-gradient(circle, ${cat.hue}55, transparent 65%)` }}
      />

      <Container wide className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[40rem]">
            <p className="eyebrow mb-5" data-scramble>
              What we do
            </p>
            <h2 className="t-h1 text-ink" data-split="words">
              Three teams. <span className="grad">One studio.</span>
            </h2>
          </div>

          {/* Tabs with progress */}
          <div role="tablist" aria-label="Service categories" className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[34rem]">
            {pillarOrder.map((p, i) => (
              <button
                key={p}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`svc-tab-${p}`}
                aria-selected={i === active}
                aria-controls="svc-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => go(i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group text-left"
              >
                <span className="block h-[2px] overflow-hidden rounded-full bg-white/10">
                  {i === active && (
                    <span
                      key={`${active}-${reduce}`}
                      className={cx("slide-progress block h-full bg-gradient-to-r from-volt to-cyan", reduce && "w-full")}
                      style={{
                        animationDuration: `${SLIDE_MS}ms`,
                        animationPlayState: paused || reduce || !inView ? "paused" : "running",
                      }}
                      onAnimationEnd={() => go(active + 1)}
                    />
                  )}
                </span>
                <span className="mt-3 flex items-baseline gap-2">
                  <span className={cx("font-mono text-[11px] tracking-[0.16em]", i === active ? "text-cyan" : "text-ink-subtle")}>
                    0{i + 1}
                  </span>
                  <span
                    className={cx(
                      "text-[14px] transition-colors sm:text-[15px]",
                      i === active ? "text-ink" : "text-ink-muted group-hover:text-ink",
                    )}
                  >
                    {pillars[p].name}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${key}`}
          className="glass relative mt-10 touch-pan-y overflow-hidden rounded-[28px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onPointerDown={(e) => (drag.current = { x: e.clientX, y: e.clientY })}
          onPointerUp={(e) => {
            const d = drag.current;
            drag.current = null;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - d.y)) go(active + (dx < 0 ? 1 : -1));
          }}
        >
          <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-12">
            {/* Copy + sub-services */}
            <div key={key} className="relative min-w-0 p-6 sm:p-10 lg:col-span-7 lg:p-12">
              <p className="slide-in eyebrow" style={{ ["--d" as string]: "0ms" }}>
                {String(active + 1).padStart(2, "0")} / 0{n} · {cat.eyebrow}
              </p>
              <h3 className="slide-in t-display-lg mt-5 text-ink" style={{ ["--d" as string]: "60ms" }}>
                {cat.title} <span className="grad">{cat.accent}</span>
              </h3>
              <p className="slide-in t-body-lg mt-4 max-w-[34rem]" style={{ ["--d" as string]: "120ms" }}>
                {cat.summary}
              </p>

              <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2">
                {subs.map((s, i) => (
                  <li key={s.slug} className="slide-in" style={{ ["--d" as string]: `${180 + i * 60}ms` }}>
                    <Link
                      href={`/services/${s.slug}/`}
                      onMouseEnter={() => setHovered(s.slug)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(s.slug)}
                      onBlur={() => setHovered(null)}
                      className="group/sub flex items-center gap-3 rounded-[16px] border border-white/[0.06] bg-white/[0.02] p-3 pr-4 transition-[border-color,background-color] duration-300 hover:border-cyan/40 hover:bg-white/[0.05]"
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-cyan">
                        <Icon name={s.icon} className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[15px] leading-5 text-ink">{s.short}</span>
                        <span className="block truncate text-[12.5px] leading-5 text-ink-subtle">{s.summary}</span>
                      </span>
                      <Icon
                        name="arrow-up-right"
                        className="size-4 shrink-0 text-ink-subtle transition-[transform,color] duration-300 group-hover/sub:-translate-y-0.5 group-hover/sub:translate-x-0.5 group-hover/sub:text-cyan"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="slide-in mt-8 flex flex-wrap items-center gap-4" style={{ ["--d" as string]: "420ms" }}>
                <Button href={`/services/#${key}`} variant="secondary" icon="arrow-right">
                  Explore {cat.name}
                </Button>
                <div className="ml-auto flex gap-2">
                  <button
                    type="button"
                    onClick={() => go(active - 1)}
                    aria-label="Previous category"
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-ink transition-colors hover:border-cyan hover:text-cyan"
                  >
                    <Icon name="arrow-right" className="size-5 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(active + 1)}
                    aria-label="Next category"
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-ink transition-colors hover:border-cyan hover:text-cyan"
                  >
                    <Icon name="arrow-right" className="size-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Orbit visual */}
            <div className="relative hidden items-center justify-center border-l border-white/[0.06] p-10 lg:col-span-5 lg:flex">
              <Orbit key={key} hue={cat.hue} label={cat.name} items={subs} hovered={hovered} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Orbit({
  hue,
  label,
  items,
  hovered,
}: {
  hue: string;
  label: string;
  items: ReturnType<typeof servicesByPillar>;
  hovered: string | null;
}) {
  return (
    <div className="orbit-in relative aspect-square w-full max-w-[400px] [container-type:inline-size]">
      {/* Rings */}
      {[100, 70, 40].map((s) => (
        <span
          key={s}
          aria-hidden="true"
          className="absolute rounded-full border border-white/10"
          style={{ inset: `${(100 - s) / 2}%` }}
        />
      ))}
      {/* Core */}
      <div
        className="absolute inset-[34%] grid place-items-center rounded-full text-center"
        style={{
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, #ffffff 45%, ${hue}) 0%, ${hue} 42%, #07152d 100%)`,
          boxShadow: `0 0 80px -10px ${hue}, inset 0 0 30px #ffffff25`,
        }}
      >
        <span className="px-2 font-display text-[15px] font-light leading-tight text-white">{label}</span>
      </div>
      {/* Orbiting sub-services */}
      <div aria-hidden="true" className="orbit-spin absolute inset-0">
        {items.map((s, i) => {
          const angle = (360 / items.length) * i - 90;
          const on = hovered === s.slug;
          return (
            <div
              key={s.slug}
              className="absolute left-1/2 top-1/2 size-0"
              style={{ transform: `rotate(${angle}deg) translateX(min(200px, 50cqw)) rotate(${-angle}deg)` }}
            >
              <span className="orbit-counter absolute -left-6 -top-6 block">
                <span
                  className={cx(
                    "grid size-12 place-items-center rounded-full border bg-[#0a1b38] transition-all duration-300",
                    on ? "scale-125 border-cyan text-cyan" : "border-white/15 text-ink",
                  )}
                  style={on ? { boxShadow: `0 0 30px ${hue}` } : undefined}
                >
                  <Icon name={s.icon} className="size-5" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
