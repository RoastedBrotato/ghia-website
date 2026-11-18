import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CtaBand } from "@/components/layout/CtaBand";
import { WorkVisual } from "@/components/brand/PageVisuals";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Button, Container, Section } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Brand films, campaigns, marketplace stores, AI platforms and more — the work Ghia Technologies creates across creative, growth, commerce and technology.",
};

const caseStudyParts: { icon: IconName; title: string; body: string }[] = [
  { icon: "target", title: "The starting point", body: "The goal, the market and the numbers before we began." },
  { icon: "layers", title: "What we did", body: "The strategy, the creative and the systems we built." },
  { icon: "analytics", title: "Verified results", body: "Outcomes measured with a method you can check." },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={
          <>
            Creativity. Strategy. <span className="grad">Real results.</span>
          </>
        }
        intro="Explore the creative campaigns, digital solutions and growth-driven projects we deliver — planned and run by one team."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Let&rsquo;s talk about your project
          </Button>
        }
        aside={<WorkVisual className="block h-auto w-full" />}
      />

      <Section>
        <Container>
          <WorkGrid />
          <p className="t-body-sm mt-8 text-center text-ink-subtle">
            The kinds of project each division delivers. Detailed client case studies are coming soon.
          </p>
        </Container>
      </Section>

      <Section className="theme-dark ai-glow border-y border-line">
        <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow eyebrow--plain flex items-center gap-3">
              <span aria-hidden="true" className="h-0.5 w-5 rounded bg-volt" />
              Case studies
            </p>
            <h2 className="t-h1 mt-4 text-ink">From vision to market success</h2>
            <p className="t-body-lg mt-4">
              We&rsquo;re writing up our client work now, with results we can verify. Until it&rsquo;s
              published, we&rsquo;re happy to walk you through relevant projects on a call.
            </p>
            <div className="mt-8">
              <Button href={site.bookingUrl} icon="arrow-right">
                Ask for examples
              </Button>
            </div>
          </div>
          <ul className="glass grid divide-y divide-line rounded-[22px] sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:col-span-7">
            {caseStudyParts.map((c) => (
              <li key={c.title} className="p-7 text-center">
                <Icon name={c.icon} className="mx-auto size-9 text-volt-text" />
                <h3 className="t-h4 mt-4 text-ink">{c.title}</h3>
                <p className="t-body-sm mt-2">{c.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Let&rsquo;s create something exceptional <span className="grad">together.</span>
          </>
        }
        body="Bring your ideas to life with Ghia Technologies."
      />
    </>
  );
}
