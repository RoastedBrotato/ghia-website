"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Mark } from "@/components/brand/Logo";
import { Container, Eyebrow, cx } from "@/components/ui/primitives";

type Node = {
  key: string;
  label: string;
  icon: IconName;
  title: string;
  body: string;
  href: string;
  cta: string;
};

const nodes: Node[] = [
  {
    key: "marketplaces",
    label: "Marketplaces",
    cta: "Amazon & Walmart",
    icon: "storefront",
    title: "Marketplaces run as one P&L",
    body: "Amazon and Walmart listings, ads and inventory managed together, so ad spend never outruns stock or margin.",
    href: "/services/amazon-walmart/",
  },
  {
    key: "search",
    label: "Search",
    cta: "SEO",
    icon: "seo",
    title: "Search that compounds",
    body: "Technical SEO and content that keep earning traffic from Google and AI answers long after they ship.",
    href: "/services/seo/",
  },
  {
    key: "paid",
    label: "Paid media",
    cta: "Meta & Google Ads",
    icon: "paid-social",
    title: "Paid media measured on revenue",
    body: "Meta and Google campaigns built around creative testing and tracking that reports real sales.",
    href: "/services/paid-media/",
  },
  {
    key: "web",
    label: "Web & UX",
    cta: "web development",
    icon: "web-dev",
    title: "A site built to convert",
    body: "Fast, search-ready sites and stores, designed around how your customers actually decide.",
    href: "/services/web-development/",
  },
  {
    key: "agents",
    label: "AI agents",
    cta: "AI agents",
    icon: "agent",
    title: "Every enquiry answered",
    body: "Voice and chat agents that reply to the demand those channels create — instantly, at any hour.",
    href: "/services/ai-agents/",
  },
  {
    key: "ops",
    label: "Automation",
    cta: "AI operations",
    icon: "workflow",
    title: "Operations that keep up",
    body: "Lead follow-up, documents and reporting automated, so growth doesn't mean more admin.",
    href: "/services/ai-operations/",
  },
];

// Node positions on a circle (percent of the square diagram), starting top-left.
const R = 39;
const positions = nodes.map((_, i) => {
  const angle = (-120 + i * 60) * (Math.PI / 180);
  return { x: 50 + R * Math.cos(angle), y: 50 + R * Math.sin(angle) };
});

export function SystemSection() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section data-section="One system" className="theme-ink relative overflow-x-clip py-20 sm:py-28 lg:py-36" aria-labelledby="system-title">
      <Container wide>
        <div className="max-w-[64rem]">
          <Eyebrow className="mb-6">One system</Eyebrow>
          <h2 id="system-title" className="t-display-lg text-ink">
            One team for every channel a brand grows on.
          </h2>
          <p className="t-body-lg mt-6 max-w-[38rem]">
            Most businesses hire a different vendor for each channel and hope the numbers add up. We
            run demand, conversion and the operations behind them as one system.
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          {/* Sticky diagram */}
          <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <div className="lg:sticky lg:top-[calc(var(--nav-height)+48px)]">
              <Diagram active={active} onSelect={setActive} />
            </div>
          </div>

          {/* Steps */}
          <ol className="lg:col-span-5 lg:row-start-1">
            {nodes.map((n, i) => (
              <li
                key={n.key}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                data-index={i}
                className={cx(
                  "border-t border-line py-8 transition-opacity duration-500 lg:flex lg:min-h-[42vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0",
                  active === i ? "lg:opacity-100" : "lg:opacity-30",
                )}
              >
                <span className="font-mono text-[12px] tracking-[0.06em] text-ink-subtle">
                  {String(i + 1).padStart(2, "0")} / {String(nodes.length).padStart(2, "0")} ·{" "}
                  {n.label.toUpperCase()}
                </span>
                <h3 className="t-h2 mt-3 text-ink">{n.title}</h3>
                <p className="t-body mt-3 max-w-[30rem]">{n.body}</p>
                <Link
                  href={n.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink hover:text-cyan"
                >
                  Explore {n.cta}
                  <Icon name="arrow-right" className="size-4" />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-16 border-t border-line pt-8 font-mono text-[13px] tracking-[0.04em] text-ink-muted lg:mt-8">
          EVERY CHANNEL REPORTS INTO ONE NUMBER → REVENUE
        </p>
      </Container>
    </section>
  );
}

function Diagram({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* Lines + orbit */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="var(--line)"
          strokeWidth="0.25"
          strokeDasharray="0.6 1.2"
        />
        <circle cx="50" cy="50" r="24" fill="none" stroke="var(--line)" strokeWidth="0.25" />
        {positions.map((p, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={p.x}
            y2={p.y}
            stroke={i === active ? "var(--volt)" : "var(--line)"}
            strokeWidth={i === active ? 0.35 : 0.25}
            style={{ transition: "stroke 400ms" }}
          />
        ))}
        {/* The signal: one Volt dot travelling from the node into the system */}
        {reduce ? (
          <circle
            cx={(positions[active].x + 50) / 2}
            cy={(positions[active].y + 50) / 2}
            r="1.1"
            fill="var(--volt)"
          />
        ) : (
          <circle key={active} r="1.1" fill="var(--cyan)">
            <animate
              attributeName="cx"
              from={positions[active].x}
              to={50}
              dur="1.6s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.4 0 0.2 1"
            />
            <animate
              attributeName="cy"
              from={positions[active].y}
              to={50}
              dur="1.6s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.4 0 0.2 1"
            />
            <animate attributeName="opacity" values="0;1;1;0" dur="1.6s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Centre mark */}
      <div className="absolute left-1/2 top-1/2 grid size-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line bg-raised">
        <Mark className="size-[52%] text-ink" title="" strokeWidth={7} />
      </div>

      {/* Nodes */}
      {nodes.map((n, i) => (
        <button
          key={n.key}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={active === i}
          className={cx(
            "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border p-3 text-[13px] whitespace-nowrap transition-all duration-300 sm:px-3.5 sm:py-2 sm:text-[14px]",
            active === i
              ? "border-cyan/60 bg-raised text-ink shadow-[0_0_28px_-4px_rgba(0,200,255,0.45)] [&_svg]:text-cyan"
              : "border-line bg-paper text-ink-subtle hover:text-ink",
          )}
          style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
        >
          <Icon name={n.icon} className="size-4" />
          <span className="max-sm:sr-only">{n.label}</span>
        </button>
      ))}
    </div>
  );
}
