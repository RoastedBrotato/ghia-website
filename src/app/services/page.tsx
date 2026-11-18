import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { DivisionVisual, ServicesVisual } from "@/components/brand/PageVisuals";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Button, Container, cx } from "@/components/ui/primitives";
import { pillarBands, pillarOrder, pillars, servicesByPillar, type Pillar } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative & Production, Marketing & Growth, E-commerce & Marketplace, and Technology & Digital Solutions — end-to-end services from one studio.",
};

/** Band tone per division: navy, light, navy, light. */
const tone: Record<Pillar, "dark" | "light"> = {
  creative: "dark",
  growth: "light",
  commerce: "dark",
  digital: "light",
};

const facts: { icon: IconName; title: string; body: string }[] = [
  { icon: "diamond", title: "4 core disciplines", body: "Creative, growth, commerce and technology" },
  { icon: "layers", title: "11 specialist services", body: "Each with its own team and process" },
  { icon: "users", title: "One team", body: "One brief, one plan, one point of contact" },
  { icon: "growth", title: "Real business growth", body: "Reported on leads and revenue, not likes" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={
          <>
            End-to-end solutions for your <span className="grad">growth</span>.
          </>
        }
        intro="From creative ideas to scalable technology — we deliver integrated services that help your brand grow."
        actions={
          <Button href="#creative" size="lg" icon="arrow-right">
            Explore our services
          </Button>
        }
        aside={<ServicesVisual className="block h-auto w-full" />}
      />

      {pillarOrder.map((p, i) => {
        const d = pillars[p];
        const band = pillarBands[p];
        const list = servicesByPillar(p);
        const visualFirst = i % 2 === 0;
        return (
          <section
            key={p}
            id={p}
            aria-labelledby={`division-${p}`}
            className={cx(
              "scroll-mt-20 py-16 sm:py-20",
              tone[p] === "dark" ? "theme-dark ai-glow border-t border-line" : "bg-sunken",
            )}
          >
            <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className={cx("lg:col-span-6", !visualFirst && "lg:order-2")}>
                <div className="theme-dark ai-glow overflow-hidden rounded-[24px] border border-line">
                  <DivisionVisual pillar={p} className="block h-auto w-full" />
                </div>
              </div>
              <div className={cx("lg:col-span-6", !visualFirst && "lg:order-1")}>
                <p className="eyebrow eyebrow--plain flex items-center gap-3">
                  <span aria-hidden="true" className="h-0.5 w-5 rounded bg-volt" />
                  {d.name}
                </p>
                <h2 id={`division-${p}`} className="t-h1 mt-4 text-ink">
                  {band.title} <span className="grad">{band.accent}</span>
                </h2>
                <p className="t-body-lg mt-4 max-w-[34rem]">{band.body}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {band.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] leading-6 text-ink">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-btn text-on-volt">
                        <Icon name="check" className="size-3.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button href={`/services/${list[0].slug}/`} variant="secondary" icon="arrow-right">
                    Learn more
                  </Button>
                  {list.length > 1 && (
                    <p className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-ink-muted">
                      {list.map((s) => (
                        <Link key={s.slug} href={`/services/${s.slug}/`} className="underline decoration-line-control underline-offset-4 hover:text-volt-text hover:decoration-volt">
                          {s.short}
                        </Link>
                      ))}
                    </p>
                  )}
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="pt-16 sm:pt-20">
        <Container>
          <ul className="glass grid divide-y divide-line rounded-[22px] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {facts.map((f) => (
              <li key={f.title} className="flex items-center gap-4 p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-volt-soft text-cyan">
                  <Icon name={f.icon} className="size-6" />
                </span>
                <div>
                  <p className="text-[16px] font-medium text-ink">{f.title}</p>
                  <p className="text-[13px] leading-5 text-ink-muted">{f.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
