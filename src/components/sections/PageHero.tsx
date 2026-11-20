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
      <Container className="pb-8 pt-6 sm:pb-12 sm:pt-10 lg:pb-14">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className={cx("grid gap-10", !!aside && "lg:grid-cols-12 lg:items-center lg:gap-6")}>
          <div className={cx(aside ? "lg:col-span-6" : "max-w-[52rem]")}>
            <p className="eyebrow-pill mb-4 sm:mb-6">{eyebrow}</p>
            <h1 className="t-display-lg text-ink">{title}</h1>
            {intro && <p className="t-body-lg mt-4 max-w-[38rem] sm:mt-6">{intro}</p>}
            {actions && <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">{actions}</div>}
          </div>
          {/* Illustrations are decorative: desktop only, to keep mobile scroll short. */}
          {aside && <div className="hidden lg:col-span-6 lg:col-start-7 lg:-mr-6 lg:block">{aside}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
