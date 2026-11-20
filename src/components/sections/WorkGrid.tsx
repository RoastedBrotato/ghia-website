"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { WorkThumb } from "@/components/brand/PageVisuals";
import { cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, type Pillar } from "@/content/services";
import { work } from "@/content/work";

const filterIcon = { creative: "film", growth: "growth", commerce: "cart", digital: "web-dev" } as const;

/** Category filter + project cards. Filtering is instant, with no animation. */
export function WorkGrid() {
  const [filter, setFilter] = useState<Pillar | "all">("all");
  const items = filter === "all" ? work : work.filter((w) => w.pillar === filter);

  const tab = (value: Pillar | "all", label: string, icon?: (typeof filterIcon)[Pillar]) => (
    <button
      key={value}
      type="button"
      aria-pressed={filter === value}
      onClick={() => setFilter(value)}
      className={cx(
        "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-4 text-[14px] font-medium transition-colors",
        filter === value
          ? "border-transparent bg-btn text-on-volt"
          : "border-line text-ink-muted hover:border-volt hover:text-ink",
      )}
    >
      {icon && <Icon name={icon} className="size-[18px]" />}
      {label}
    </button>
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by category"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {tab("all", "All")}
        {pillarOrder.map((p) => tab(p, pillars[p].name, filterIcon[p]))}
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-5 lg:grid-cols-3">
        {items.map((w) => (
          <li key={w.title}>
            <Link
              href={`/services/${w.service}/`}
              className="theme-dark lift group/card relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line sm:rounded-[20px]"
            >
              <WorkThumb kind={w.thumb} className="block aspect-[5/3] h-auto w-full" />
              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <span className="hidden self-start rounded-full bg-volt-soft px-2.5 py-1 text-[12px] font-medium text-volt-text sm:inline">
                  {pillars[w.pillar].name}
                </span>
                <h3 className="text-[14px] font-medium leading-5 text-ink sm:mt-3 sm:text-[1.0625rem] sm:leading-6">{w.title}</h3>
                <p className="t-body-sm mt-1 hidden sm:block">{w.body}</p>
                <div className="mt-auto hidden items-center justify-between gap-4 pt-4 sm:flex">
                  <p className="text-[13px] text-ink-subtle">{w.tags.join(" · ")}</p>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-btn text-on-volt transition-transform duration-200 group-hover/card:translate-x-0.5">
                    <Icon name="arrow-right" className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
