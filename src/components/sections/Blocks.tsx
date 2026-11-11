import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { Card, IconTile, Num, cx } from "@/components/ui/primitives";
import { industries } from "@/content/industries";
import { playbooks, formatDate } from "@/content/playbooks";

/** Numbered steps across a top rule — process, deployment, etc. */
export function Steps({
  steps,
  className,
}: {
  steps: { title: string; body: string }[];
  className?: string;
}) {
  return (
    <ol
      className={cx(
        "grid gap-x-6 gap-y-10 sm:grid-cols-2",
        steps.length === 5 ? "lg:grid-cols-5" : steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
        className,
      )}
    >
      {steps.map((s, i) => (
        <li
          key={s.title}
          className="reveal border-t border-volt pt-5"
          style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
        >
          <Num n={i + 1} />
          <h3 className="t-h3 mt-4 text-ink">{s.title}</h3>
          <p className="t-body-sm mt-2">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Principle / commitment columns: hairline top rule, title, body */
export function RuleColumns({
  items,
  className,
}: {
  items: { title: string; body: string }[];
  className?: string;
}) {
  return (
    <div className={cx("grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((p, i) => (
        <div key={p.title} className="reveal border-t border-line-strong pt-5" style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
          <Num n={i + 1} />
          <h3 className="t-h3 mt-4 text-ink">{p.title}</h3>
          <p className="t-body-sm mt-2 max-w-[18rem]">{p.body}</p>
        </div>
      ))}
    </div>
  );
}

export function IndustryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {industries.map((ind) => (
        <div key={ind.slug} className="reveal">
        <Card href={`/industries/${ind.slug}/`} className="h-full min-h-[240px]">
          <div className="flex items-start justify-between gap-6">
            <IconTile name={ind.icon} />
            <Icon
              name="arrow-up-right"
              className="size-5 text-ink-subtle transition-colors group-hover/card:text-ink"
            />
          </div>
          <h3 className="t-h2 mt-auto pt-10 text-ink">{ind.name}</h3>
          <p className="t-body-sm mt-2 max-w-[26rem]">{ind.summary}</p>
        </Card>
        </div>
      ))}
    </div>
  );
}

export function PlaybookCards({ limit, exclude }: { limit?: number; exclude?: string }) {
  const list = playbooks.filter((p) => p.slug !== exclude);
  const items = limit ? list.slice(0, limit) : list;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((p) => (
        <div key={p.slug} className="reveal">
        <Card href={`/playbooks/${p.slug}/`} className="h-full min-h-[300px]">
          <div className="flex items-center justify-between gap-4">
            <span className="t-label">{p.category}</span>
            <span className="font-mono text-[12px] text-ink-subtle">{p.readMinutes} min</span>
          </div>
          <h3 className="t-h3 mt-8 text-ink">{p.title}</h3>
          <p className="t-body-sm mt-3">{p.summary}</p>
          <div className="mt-auto flex items-center justify-between pt-8">
            <span className="font-mono text-[12px] text-ink-subtle">{formatDate(p.date)}</span>
            <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
              Read
              <Icon
                name="arrow-right"
                className="size-4 transition-transform duration-200 ease-brand group-hover/card:translate-x-[3px]"
              />
            </span>
          </div>
        </Card>
        </div>
      ))}
    </div>
  );
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="t-h4 text-ink">{f.q}</span>
            <Icon
              name="plus"
              className="size-5 shrink-0 text-ink transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="t-body max-w-[46rem] pb-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
                {it.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink-muted">
                {it.label}
              </span>
            )}
            {i < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
