import Link from "next/link";
import { services } from "@/content/services";

/**
 * All 11 services as plain studio cards: number, name and everything
 * included, no descriptions. Used on the homepage and the services page.
 * Each card opens that service's detail page.
 */
export function ServiceCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}/`}
          className="glass lift flex flex-col rounded-[22px] p-7"
        >
          <span className="font-mono text-[12px] tracking-[0.24em] text-volt-text">
            {String(i + 1).padStart(2, "0")}
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
  );
}
