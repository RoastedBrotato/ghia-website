import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CtaBand } from "@/components/layout/CtaBand";
import { WorkVisual } from "@/components/brand/PageVisuals";
import { Button, Container, Section } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "Brand films, campaigns, marketplace stores, AI platforms and more — the work Ghia Technologies creates across creative, growth, commerce and technology.",
};

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
          <p className="t-body-sm mt-6 text-center text-ink-subtle sm:mt-8">
            The kinds of project each division delivers. Detailed case studies are coming soon — ask us for relevant examples on a call.
          </p>
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
