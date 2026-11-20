import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { ArrowSteps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { AboutVisual, DisciplinesVisual } from "@/components/brand/PageVisuals";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Button, Container, Section } from "@/components/ui/primitives";
import { pillarOrder, pillars } from "@/content/services";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ghia Technologies is a creative and technology studio: creative, marketing, e-commerce and technology brought together under one roof to help brands grow.",
};

const approach: { icon: IconName; title: string }[] = [
  { icon: "bulb", title: "Understand your goals" },
  { icon: "brand", title: "Create solutions" },
  { icon: "gear", title: "Build & execute" },
  { icon: "growth", title: "Grow together" },
];

const disciplineIcon = { creative: "film", growth: "growth", commerce: "cart", digital: "web-dev" } as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Ghia"
        title={
          <>
            A studio where <span className="grad">ideas</span> take shape.
          </>
        }
        intro="We're a creative and technology agency, bringing strategy, creativity and innovation together to help brands grow in a digital-first world."
        actions={
          <>
            <Button href="/services/" size="lg" icon="arrow-right">
              Our services
            </Button>
            <Button href="/approach/" size="lg" variant="secondary">
              How we work
            </Button>
          </>
        }
        aside={<AboutVisual className="block h-auto w-full" />}
      />

      {/* Our story */}
      <Section>
        <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow--plain flex items-center gap-3">
              <span aria-hidden="true" className="h-0.5 w-5 rounded bg-volt" />
              Our story
            </p>
            <h2 className="t-h1 mt-4 text-ink">
              Four disciplines. One powerful <span className="grad">team.</span>
            </h2>
            <p className="t-body-lg mt-4">
              Ghia Technologies was born from a simple idea: businesses shouldn&rsquo;t have to juggle
              multiple agencies for creative, marketing, e-commerce and technology. So we brought it
              all together — under one roof.
            </p>
          </div>
          <div className="hidden lg:col-span-6 lg:col-start-7 lg:block">
            <div className="theme-dark ai-glow overflow-hidden rounded-[24px] border border-line">
              <DisciplinesVisual className="block h-auto w-full" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Disciplines */}
      <Section className="theme-dark ai-glow border-y border-line">
        <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow-pill">Our disciplines</p>
            <h2 className="t-h1 mt-4 text-ink">
              More than an agency. <span className="grad">A growth partner.</span>
            </h2>
            <p className="t-body-lg mt-4">
              From bold creative to smart technology, we help you every step of the way.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-8 lg:grid-cols-4">
            {pillarOrder.map((p) => (
              <li key={p}>
                <Link
                  href={`/services/#${p}`}
                  className="glass lift flex h-full flex-col rounded-[16px] border-volt/40 p-4 sm:rounded-[18px] sm:p-5"
                >
                  <Icon name={disciplineIcon[p]} className="size-7 text-volt-text sm:size-8" />
                  <h3 className="t-h4 mt-3 text-ink sm:mt-4">{pillars[p].name}</h3>
                  <p className="t-body-sm mt-2 hidden sm:block">{pillars[p].summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Our approach */}
      <section className="pt-8 sm:pt-12">
        <Container>
          <div className="theme-dark ai-glow grid gap-8 rounded-[24px] border border-line p-5 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow eyebrow--plain flex items-center gap-3">
                <span aria-hidden="true" className="h-0.5 w-5 rounded bg-volt" />
                Our approach
              </p>
              <h2 className="t-h2 mt-4 text-ink">Strategy. Creativity. Technology. Growth.</h2>
              <p className="t-body mt-3">A seamless process to turn ideas into impact.</p>
            </div>
            <ArrowSteps steps={approach} className="lg:col-span-7" />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
