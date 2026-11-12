"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { Button, Container, cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, servicesByPillar, type Pillar } from "@/content/services";

const SLIDE_MS = 7000;
const N = pillarOrder.length;
const STEP = 360 / N;
const mod = (a: number, n: number) => ((a % n) + n) % n;

/**
 * "What we do" carousel: the three main categories sit on a circle. The front
 * card is frosted glass, so the other two show through it and peek out behind
 * it — a cue that the cards can be changed. Rotating moves every card along
 * the circle. Auto-rotates (pauses on hover/focus and while off-screen);
 * click a back card, use the tabs, arrows, swipe or ← → to rotate.
 */
export function ServiceSlider() {
  // `turn` is unbounded so the ring always rotates the short way round.
  const [turn, setTurn] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const active = mod(turn, N);
  const key = pillarOrder[active];
  const cat = pillars[key];

  const step = useCallback((d: number) => {
    setTurn((t) => t + d);
    setHovered(null);
  }, []);
  const goTo = useCallback(
    (i: number) => {
      const d = mod(i - active + 1, N) - 1; // -1, 0 or +1 for three cards
      if (d) step(d);
    },
    [active, step],
  );

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

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.4), {
      threshold: [0, 0.4, 1],
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    step(d);
    tabs.current[mod(i + d, N)]?.focus();
  };

  return (
    <section
      ref={root}
      data-section="Services"
      id="services"
      className="relative overflow-hidden bg-paper py-20 sm:py-24"
    >
      {/* Category-tinted glow that shifts with the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-35 blur-3xl transition-[background] duration-1000"
        style={{ background: `radial-gradient(circle, ${cat.hue}66, transparent 62%)` }}
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
                aria-controls={`svc-card-${p}`}
                tabIndex={i === active ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="group text-left"
              >
                <span className="block h-[2px] overflow-hidden rounded-full bg-white/10">
                  {i === active && (
                    <span
                      key={`${turn}-${reduce}`}
                      className={cx("slide-progress block h-full bg-gradient-to-r from-volt to-cyan", reduce && "w-full")}
                      style={{
                        animationDuration: `${SLIDE_MS}ms`,
                        animationPlayState: paused || reduce || !inView ? "paused" : "running",
                      }}
                      onAnimationEnd={() => step(1)}
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

        {/* The ring */}
        <div
          className="carousel-stage relative mt-12 touch-pan-y select-none [perspective:1800px]"
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
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - d.y)) step(dx < 0 ? 1 : -1);
          }}
        >
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            {pillarOrder.map((p, i) => {
              // Position on the circle. `theta` grows without bound so the ring
              // always turns the short way; it's cancelled out exactly below
              // (rotateY(-theta)) so the card faces the viewer on every lap, and
              // the slight side tilt comes from sin(theta), which repeats every
              // 360°, so the 4th, 7th… rotation looks the same as the 1st.
              const theta = (i - turn) * STEP;
              const tilt = Math.sin((theta * Math.PI) / 180) * 22;
              const front = mod(i - turn, N) === 0;
              return (
                <div
                  key={p}
                  id={`svc-card-${p}`}
                  role="tabpanel"
                  aria-labelledby={`svc-tab-${p}`}
                  aria-hidden={!front}
                  inert={!front}
                  onClick={front ? undefined : () => goTo(i)}
                  className={cx(
                    "carousel-card absolute inset-y-0 left-1/2 w-[84%] sm:w-[min(90%,1140px)]",
                    front ? "z-10" : "cursor-pointer",
                  )}
                  style={{
                    transform: `translateX(-50%) translateZ(calc(var(--r) * -1)) rotateY(${theta}deg) translateZ(var(--r)) rotateY(${-theta}deg) rotateY(${tilt.toFixed(2)}deg)`,
                    opacity: front ? 1 : 0.55,
                    filter: front ? "none" : "blur(5px) saturate(0.75)",
                  }}
                >
                  <CategoryCard
                    pillar={p}
                    index={i}
                    front={front}
                    hovered={front ? hovered : null}
                    onHover={setHovered}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous category"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-ink transition-colors hover:border-cyan hover:text-cyan"
          >
            <Icon name="arrow-right" className="size-5 rotate-180" />
          </button>
          <div className="flex items-center gap-2" aria-hidden="true">
            {pillarOrder.map((p, i) => (
              <span
                key={p}
                className={cx(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === active ? "w-6 bg-cyan" : "w-1.5 bg-white/25",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next category"
            className="grid size-11 place-items-center rounded-full border border-white/15 text-ink transition-colors hover:border-cyan hover:text-cyan"
          >
            <Icon name="arrow-right" className="size-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({
  pillar,
  index,
  front,
  hovered,
  onHover,
}: {
  pillar: Pillar;
  index: number;
  front: boolean;
  hovered: string | null;
  onHover: (slug: string | null) => void;
}) {
  const cat = pillars[pillar];
  const subs = servicesByPillar(pillar);
  return (
    <div
      className={cx(
        "relative grid h-full grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] border transition-[border-color,box-shadow,background-color] duration-700 lg:grid-cols-12",
        front
          ? "border-white/15 bg-[rgba(10,27,58,0.86)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_100px_-30px_rgba(0,0,0,0.9)]"
          : "border-white/10 bg-[rgba(10,27,58,0.55)] hover:border-cyan/40",
      )}
    >
      {/* Tint and sheen so each card reads as a pane of glass */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(120% 80% at 100% 0%, ${cat.hue}26, transparent 55%), linear-gradient(160deg, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />

      <div className="relative flex min-w-0 flex-col p-6 sm:p-10 lg:col-span-7 lg:p-12">
        <p className="eyebrow">
          0{index + 1} / 0{N} · {cat.eyebrow}
        </p>
        <h3 className="t-display-lg mt-4 text-ink">
          {cat.title} <span className="grad">{cat.accent}</span>
        </h3>
        <p className="t-body mt-3 max-w-[34rem] sm:t-body-lg">{cat.summary}</p>

        <ul className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-2 sm:grid-cols-2">
          {subs.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}/`}
                onMouseEnter={() => onHover(s.slug)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(s.slug)}
                onBlur={() => onHover(null)}
                className="group/sub flex items-center gap-3 rounded-[16px] border border-white/[0.07] bg-white/[0.03] p-2.5 pr-4 transition-[border-color,background-color] duration-300 hover:border-cyan/40 hover:bg-white/[0.06]"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-cyan">
                  <Icon name={s.icon} className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] leading-5 text-ink">{s.short}</span>
                  <span className="hidden truncate text-[12.5px] leading-5 text-ink-subtle sm:block">{s.summary}</span>
                </span>
                <Icon
                  name="arrow-up-right"
                  className="size-4 shrink-0 text-ink-subtle transition-[transform,color] duration-300 group-hover/sub:-translate-y-0.5 group-hover/sub:translate-x-0.5 group-hover/sub:text-cyan"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <Button href={`/services/#${pillar}`} variant="secondary" icon="arrow-right">
            Explore {cat.name}
          </Button>
        </div>
      </div>

      <div className="relative hidden items-center justify-center border-l border-white/[0.06] p-10 lg:col-span-5 lg:flex">
        <Orbit hue={cat.hue} label={cat.name} items={subs} hovered={hovered} spin={front} />
      </div>
    </div>
  );
}

function Orbit({
  hue,
  label,
  items,
  hovered,
  spin,
}: {
  hue: string;
  label: string;
  items: ReturnType<typeof servicesByPillar>;
  hovered: string | null;
  spin: boolean;
}) {
  return (
    <div className="relative aspect-square w-full max-w-[360px] [container-type:inline-size]">
      {[100, 70, 40].map((s) => (
        <span
          key={s}
          aria-hidden="true"
          className="absolute rounded-full border border-white/10"
          style={{ inset: `${(100 - s) / 2}%` }}
        />
      ))}
      <div
        className="absolute inset-[34%] grid place-items-center rounded-full text-center"
        style={{
          background: `radial-gradient(circle at 35% 30%, color-mix(in srgb, #ffffff 45%, ${hue}) 0%, ${hue} 42%, #07152d 100%)`,
          boxShadow: `0 0 80px -10px ${hue}, inset 0 0 30px #ffffff25`,
        }}
      >
        <span className="px-2 font-display text-[15px] font-light leading-tight text-white">{label}</span>
      </div>
      <div
        aria-hidden="true"
        className="orbit-spin absolute inset-0"
        style={{ animationPlayState: spin ? "running" : "paused" }}
      >
        {items.map((s, i) => {
          const angle = (360 / items.length) * i - 90;
          const on = hovered === s.slug;
          return (
            <div
              key={s.slug}
              className="absolute left-1/2 top-1/2 size-0"
              style={{ transform: `rotate(${angle}deg) translateX(50cqw) rotate(${-angle}deg)` }}
            >
              <span
                className="orbit-counter absolute -left-6 -top-6 block"
                style={{ animationPlayState: spin ? "running" : "paused" }}
              >
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
