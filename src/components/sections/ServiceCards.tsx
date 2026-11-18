import { Button, IconTile } from "@/components/ui/primitives";
import { pillarOrder, pillars } from "@/content/services";

const num = (n: number) => String(n).padStart(2, "0");

/**
 * The four divisions as cards: number, name, summary and an "Explore more"
 * button to that division on the services page. Used on the homepage.
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
            <div className="mt-auto pt-6">
              <Button href={`/services/#${p}`} variant="secondary" icon="arrow-right">
                Explore more
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
