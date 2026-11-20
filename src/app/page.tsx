import Link from "next/link";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button, Container, Eyebrow, IconTile } from "@/components/ui/primitives";
import { Icon } from "@/components/brand/Icon";
import { HeroVisual } from "@/components/brand/HeroVisual";
import { PhoneCall } from "@/components/mockups/PhoneCall";
import { DivisionCards } from "@/components/sections/ServiceCards";
import { solutions } from "@/content/solutions";
import { site } from "@/lib/site";

/**
 * Home is deliberately short: hero → what we do → flagship AI → one ask.
 * No scroll effects or animation; every detail lives on its own page.
 * Illustrations are desktop-only so mobile stays close to one screen per idea.
 */
export default function Home() {
  return (
    <>
      {/* Hero on the navy band */}
      <div className="theme-dark hero-glow">
        <section className="overflow-hidden pb-8 pt-8 sm:pb-14 sm:pt-14 lg:py-12">
          <Container className="grid items-center gap-6 lg:grid-cols-12 lg:gap-4">
            <div className="lg:col-span-6">
              <Eyebrow className="mb-4 sm:mb-5">Creative, growth &amp; AI studio</Eyebrow>
              <h1 className="t-display-xl max-w-[56rem] text-ink">
                We build <span className="grad">brands</span> that grow.
              </h1>
              <p className="t-body-lg mt-4 max-w-[36rem] sm:mt-6">
                One studio for brand, web, film, campaigns and AI — the idea, the
                build and the results, so nothing gets lost between agencies.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                <Button href={site.bookingUrl} size="lg">
                  Start a project
                </Button>
                <Button href="/services/" size="lg" variant="secondary">
                  Explore services
                </Button>
              </div>
            </div>
            <div className="hidden lg:col-span-6 lg:-mr-12 lg:block">
              <HeroVisual className="block h-auto w-full" />
            </div>
          </Container>
        </section>
      </div>

      {/* What we do */}
      <section className="py-8 sm:py-12 lg:py-14">
        <Container>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow className="mb-3">Services</Eyebrow>
              <h2 className="t-h1 text-ink">
                Four divisions, <span className="grad">one team</span>.
              </h2>
            </div>
            <div className="hidden sm:block">
              <Button href="/services/" variant="secondary" icon="arrow-right">
                All services
              </Button>
            </div>
          </div>
          <div className="mt-6 sm:mt-8">
            <DivisionCards />
          </div>
        </Container>
      </section>

      {/* Flagship solutions: the one futuristic band */}
      <section className="theme-dark ai-glow py-8 sm:py-12">
        <Container className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Eyebrow className="mb-3">Flagship solutions</Eyebrow>
            <h2 className="t-h1 text-ink">
              AI systems that do the <span className="grad">work</span>.
            </h2>
            <p className="t-body-lg mt-3 max-w-[34rem]">
              Answer every call, follow up every lead and clear the admin — day or night.
            </p>
            <ul className="mt-6 grid gap-2.5">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/solutions/#${s.slug}`}
                    className="glass lift group/card flex items-center gap-4 rounded-[16px] p-3.5 sm:p-4"
                  >
                    <IconTile name={s.icon} className="size-10 rounded-full" />
                    <span className="min-w-0 flex-1">
                      <span className="t-label block">{s.name}</span>
                      <span className="mt-0.5 block text-[15px] font-medium leading-6 text-ink">{s.promise}</span>
                    </span>
                    <Icon
                      name="arrow-right"
                      className="size-5 shrink-0 text-ink-muted transition-transform duration-200 group-hover/card:translate-x-[3px] group-hover/card:text-volt-text"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button href="/solutions/">Explore AI solutions</Button>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <PhoneCall />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
