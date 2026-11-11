import type { ReactNode } from "react";
import { SignalRings } from "@/components/brand/SignalRings";
import { Container, Eyebrow, cx } from "@/components/ui/primitives";
import { Breadcrumb } from "@/components/sections/Blocks";

/** Inner-page hero: breadcrumb, eyebrow, display headline, intro, actions. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  rings = true,
  children,
}: {
  crumbs?: { label: string; href?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  /** Right-hand visual (e.g. a mockup). Replaces the rings when given. */
  aside?: ReactNode;
  rings?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="glow-tr relative overflow-hidden border-b border-line bg-paper">
      {!aside && rings && (
        <SignalRings
          animate
          count={5}
          spacing={96}
          inner={80}
          dotAngle={58}
          dotRadius={10}
          className="pointer-events-none absolute bottom-0 right-0 hidden h-[88%] max-h-[560px] w-auto md:block"
        />
      )}
      <Container wide className="relative pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div
          className={cx(
            "grid gap-12",
            aside ? "lg:grid-cols-12 lg:items-center lg:gap-8" : "",
          )}
        >
          <div className={cx(aside ? "lg:col-span-6" : "max-w-[50rem]")}>
            <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
            <h1 className="t-display-lg text-ink" data-split="words" data-split-now>
              {title}
            </h1>
            {intro && <p className="t-body-lg mt-6 max-w-[38rem]">{intro}</p>}
            {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {aside && <div className="lg:col-span-6 lg:col-start-7">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
