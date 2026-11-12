import Link from "next/link";
import { IconTile } from "@/components/ui/primitives";
import { pillarOrder, pillars, services, servicesByPillar } from "@/content/services";

const num = (n: number) => String(n).padStart(2, "0");
/** Each service keeps its original 01–11 number. */
const serviceNumber = (slug: string) => num(services.findIndex((s) => s.slug === slug) + 1);

/**
 * The four divisions as cards: number, name and summary. Used on the
 * homepage.
 */
export function DivisionCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {pillarOrder.map((p, i) => {
        const d = pillars[p];
        return (
          <div key={p} className="glass flex flex-col rounded-[22px] p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <IconTile name={d.icon} className="size-14 rounded-[14px]" />
              <span className="font-mono text-[12px] tracking-[0.24em] text-volt-text">{num(i + 1)}</span>
            </div>
            <h3 className="mt-6 font-display text-[26px] font-light leading-8 tracking-[-0.01em] text-ink">
              {d.name}
            </h3>
            <p className="mt-3 text-[15px] leading-6 text-ink-muted">{d.summary}</p>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Every service grouped under its division: a heading per division, then
 * plain studio cards (number, name, everything included). Used on the
 * services page. Each card opens that service's detail page.
 */
export function ServiceCards() {
  return (
    <div className="grid gap-16">
      {pillarOrder.map((p, i) => {
        const d = pillars[p];
        return (
          <section key={p} id={p} aria-labelledby={`division-${p}`} className="scroll-mt-28">
            <div className="grid gap-3 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
              <span className="font-mono text-[12px] tracking-[0.24em] text-volt-text lg:col-span-1">
                {num(i + 1)}
              </span>
              <h2
                id={`division-${p}`}
                className="font-display text-[30px] font-light leading-9 tracking-[-0.015em] text-ink lg:col-span-5"
              >
                {d.name}
              </h2>
              <p className="text-[16px] leading-7 text-ink-muted lg:col-span-6">{d.summary}</p>
            </div>
            <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
              {servicesByPillar(p).map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}/`}
                  className="glass lift flex flex-col rounded-[22px] p-7"
                >
                  <span className="font-mono text-[12px] tracking-[0.24em] text-volt-text">
                    {serviceNumber(s.slug)}
                  </span>
                  <h3 className="mt-3 font-display text-[22px] font-light leading-7 tracking-[-0.01em] text-ink">
                    {s.name}
                  </h3>
                  <ul className="mt-4 grid list-disc gap-1 pl-[1.1em] text-[15px] leading-6 text-ink-muted marker:text-line-control">
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
