import type { ReactNode } from "react";
import { Container, Eyebrow, cx } from "@/components/ui/primitives";
import { Breadcrumb } from "@/components/sections/Blocks";

/** Inner-page header: breadcrumb, eyebrow, thin display headline, intro, actions. */
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
  /** Optional right-hand panel (e.g. a summary card). */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="theme-dark hero-glow relative">
      <Container className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        {crumbs && <Breadcrumb items={crumbs} />}
        <div className={cx("grid gap-12", !!aside && "lg:grid-cols-12 lg:items-center lg:gap-8")}>
          <div className={cx(aside ? "lg:col-span-6" : "max-w-[52rem]")}>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
            <h1 className="t-display-lg text-ink">{title}</h1>
            {intro && <p className="t-body-lg mt-6 max-w-[40rem]">{intro}</p>}
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {children}
          </div>
          {aside && <div className="lg:col-span-6 lg:col-start-7">{aside}</div>}
        </div>
      </Container>
    </section>
  );
}
