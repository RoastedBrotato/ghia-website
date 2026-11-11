"use client";

import { useId, useRef, useState } from "react";
import { Badge, Button, Card, CardArrow, IconTile, cx } from "@/components/ui/primitives";
import { site } from "@/lib/site";
import { pillars, servicesByPillar, type Pillar } from "@/content/services";

const order: Pillar[] = ["growth", "ai"];

/** Tabbed explorer across the two service pillars (WAI-ARIA tabs pattern). */
export function ServiceExplorer() {
  const [tab, setTab] = useState<Pillar>("growth");
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + order.length) % order.length;
    setTab(order[next]);
    tabRefs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Service pillars"
        className="inline-flex rounded-sm border border-line bg-raised p-1"
      >
        {order.map((p, i) => (
          <button
            key={p}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${id}-tab-${p}`}
            aria-selected={tab === p}
            aria-controls={`${id}-panel-${p}`}
            tabIndex={tab === p ? 0 : -1}
            onClick={() => setTab(p)}
            onKeyDown={(e) => onKey(e, i)}
            className={cx(
              "h-10 rounded-[6px] px-4 text-[15px] font-medium transition-colors sm:px-5",
              tab === p ? "bg-btn text-white" : "text-ink-muted hover:text-ink",
            )}
          >
            {pillars[p].name}
          </button>
        ))}
      </div>

      {order.map((p) => (
        <div
          key={p}
          role="tabpanel"
          id={`${id}-panel-${p}`}
          aria-labelledby={`${id}-tab-${p}`}
          hidden={tab !== p}
          className="mt-10"
        >
          <p className="t-body-lg max-w-[40rem]">{pillars[p].summary}</p>
          <div
            className={cx(
              "mt-8 grid gap-4 sm:grid-cols-2",
              p === "growth" ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-4",
            )}
          >
            {servicesByPillar(p).map((s) => (
              <Card key={s.slug} href={`/services/${s.slug}/`} className="min-h-[260px]">
                <IconTile name={s.icon} />
                <h3 className="t-h3 mt-6 text-ink">{s.name}</h3>
                <p className="t-body-sm mt-2">{s.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.slice(0, 3).map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <CardArrow />
              </Card>
            ))}
            {p === "growth" && (
              <div className="theme-ink flex min-h-[260px] flex-col rounded-md p-6 sm:p-8">
                <p className="t-label">Not sure where to start?</p>
                <p className="mt-4 max-w-[18rem] font-display text-[26px] leading-8 tracking-[-0.02em] text-ink">
                  A growth audit shows which channel to fix first.
                </p>
                <div className="mt-auto pt-6">
                  <Button href={site.bookingUrl} size="sm" icon="arrow-right">
                    Book a growth audit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
