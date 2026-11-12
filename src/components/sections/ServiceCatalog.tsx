"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { Container, cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, services, servicesByPillar, type Pillar } from "@/content/services";

/**
 * Services index: one main category at a time (tabs, deep-linkable via
 * #creative / #growth / #digital), each sub-service shown with what's inside.
 */
export function ServiceCatalog() {
  const [active, setActive] = useState<Pillar>("creative");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const fromHash = () => {
      const h = window.location.hash.slice(1) as Pillar;
      if (pillarOrder.includes(h)) setActive(h);
    };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
    };
  }, []);

  const select = (p: Pillar) => {
    setActive(p);
    history.replaceState(null, "", `#${p}`);
  };

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const j = (i + d + pillarOrder.length) % pillarOrder.length;
    select(pillarOrder[j]);
    tabs.current[j]?.focus();
  };

  const cat = pillars[active];
  const subs = servicesByPillar(active);

  return (
    <section data-section="Services" className="relative bg-paper pb-20 pt-4 sm:pb-28 sm:pt-8">
      {/* Anchor targets so #creative etc. land on the catalogue */}
      {pillarOrder.map((p) => (
        <span key={p} id={p} className="absolute -top-24" aria-hidden="true" />
      ))}
      <Container wide>
        <div
          role="tablist"
          aria-label="Service categories"
          className="glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1"
        >
          {pillarOrder.map((p, i) => (
            <button
              key={p}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              id={`cat-tab-${p}`}
              aria-selected={active === p}
              aria-controls="cat-panel"
              tabIndex={active === p ? 0 : -1}
              onClick={() => select(p)}
              onKeyDown={(e) => onKey(e, i)}
              className={cx(
                "flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[15px] transition-[color,background,box-shadow] duration-300",
                active === p
                  ? "bg-[linear-gradient(120deg,#0f6bd6,#0a4aa6)] text-white shadow-[0_8px_24px_-8px_rgba(22,120,232,0.8)]"
                  : "text-ink-muted hover:text-ink",
              )}
            >
              {pillars[p].name}
              <span
                className={cx(
                  "rounded-full px-1.5 font-mono text-[11px]",
                  active === p ? "bg-white/20 text-white" : "bg-white/[0.06] text-ink-subtle",
                )}
              >
                {servicesByPillar(p).length}
              </span>
            </button>
          ))}
        </div>

        <div id="cat-panel" role="tabpanel" aria-labelledby={`cat-tab-${active}`} key={active} className="mt-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="slide-in t-h1 text-ink">
              {cat.title} <span className="grad">{cat.accent}</span>
            </h2>
            <p className="slide-in t-body max-w-[30rem]" style={{ ["--d" as string]: "80ms" }}>
              {cat.summary}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {subs.map((s, i) => (
              <div key={s.slug} className="slide-in" style={{ ["--d" as string]: `${140 + i * 70}ms` }}>
                <Link
                  href={`/services/${s.slug}/`}
                  className="glass tilt spotlight group/card relative flex h-full flex-col rounded-[22px] p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-cyan">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-volt-text">
                      {String(services.indexOf(s) + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="t-h3 mt-5 text-ink">{s.name}</h3>
                  <p className="t-body-sm mt-1.5">{s.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 px-2.5 py-0.5 text-[12px] leading-5 text-ink-muted"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-ink">
                    Explore
                    <Icon
                      name="arrow-right"
                      className="size-4 transition-transform duration-200 group-hover/card:translate-x-[3px]"
                    />
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
