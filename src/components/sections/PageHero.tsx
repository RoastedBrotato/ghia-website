import type { ReactNode } from "react";
import { Container, cx } from "@/components/ui/primitives";
import { Breadcrumb } from "@/components/sections/Blocks";

/**
 * Inner-page header on the navy band: pill eyebrow, display headline, intro,
 * actions, and an optional illustration or panel on the right.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  actions,
  aside,
  children,
}: {
  crumbs?: { label: string; href?: string }[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  actions?: ReactNode;
  /** Optional right-hand illustration or panel. */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="theme-dark hero-glow relative overflow-hidden">
      <Container className={cx("pb-16 sm:pb-20", aside ? "pt-10 sm:pt-12" : "pt-10 sm:pt-14")}>
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className={cx("grid gap-10", !!aside && "lg:grid-cols-12 lg:items-center lg:gap-6")}>
          <div className={cx(aside ? "lg:col-span-6" : "max-w-[52rem]")}>
            <p className="eyebrow-pill mb-6">{eyebrow}</p>
            <h1 className="t-display-lg text-ink">{title}</h1>
            {intro && <p className="t-body-lg mt-6 max-w-[38rem]">{intro}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
          </div>
          {aside && <div className="-mx-4 sm:mx-0 lg:col-span-6 lg:col-start-7 lg:-mr-6">{aside}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
