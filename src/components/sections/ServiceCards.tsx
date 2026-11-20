import Link from "next/link";
import { Icon } from "@/components/brand/Icon";
import { IconTile } from "@/components/ui/primitives";
import { pillarOrder, pillars } from "@/content/services";

const num = (n: number) => String(n).padStart(2, "0");

/**
 * The four divisions as compact linked cards: icon, name and summary, each
 * linking to that division on the services page. Used on the homepage.
 */
export function DivisionCards() {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
      {pillarOrder.map((p, i) => {
        const d = pillars[p];
        return (
          <Link
            key={p}
            href={`/services/#${p}`}
            className="glass lift group/card flex items-start gap-4 rounded-[18px] p-4 sm:gap-5 sm:rounded-[22px] sm:p-6"
          >
            <IconTile name={d.icon} className="size-11 rounded-[12px] sm:size-12" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[19px] font-light leading-6 tracking-[-0.01em] text-ink sm:text-[22px] sm:leading-7">
                  {d.name}
                </h3>
                <span className="font-mono text-[11px] tracking-[0.2em] text-volt-text">{num(i + 1)}</span>
              </div>
              <p className="mt-1 text-[14px] leading-[1.375rem] text-ink-muted sm:text-[15px] sm:leading-6">
                {d.summary}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink group-hover/card:text-volt-text">
                Explore
                <Icon
                  name="arrow-right"
                  className="size-4 transition-transform duration-200 ease-brand group-hover/card:translate-x-[3px]"
                />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
