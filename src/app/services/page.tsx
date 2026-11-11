import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  Badge,
  Button,
  Card,
  CardArrow,
  Container,
  IconTile,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { pillars, servicesByPillar, type Pillar } from "@/content/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Amazon & Walmart, SEO, Meta & Google Ads, UI/UX, web development and AI automation — one team, measured on revenue.",
};

function PillarSection({ pillar, tone }: { pillar: Pillar; tone: "paper" | "sunken" }) {
  const list = servicesByPillar(pillar);
  return (
    <Section tone={tone} id={pillar}>
      <Container wide>
        <SectionHeader
          eyebrow={pillars[pillar].eyebrow}
          title={pillar === "growth" ? "Demand and conversion." : "Response and operations."}
          intro={pillars[pillar].summary}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s) => (
            <div key={s.slug} className="reveal">
              <Card href={`/services/${s.slug}/`} className="h-full min-h-[300px]">
                <IconTile name={s.icon} />
                <h3 className="t-h2 mt-8 text-ink">{s.name}</h3>
                <p className="t-body-sm mt-3">{s.intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <CardArrow />
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title="Everything your brand needs to grow online."
        intro="Two pillars, one team. Growth brings demand in and converts it. AI automation answers it, follows it up and handles the work behind it."
        actions={
          <>
            <Button href={site.bookingUrl} size="lg" icon="arrow-right">
              Book a growth audit
            </Button>
            <Button href="#ai" size="lg" variant="secondary">
              Jump to AI automation
            </Button>
          </>
        }
      />
      <PillarSection pillar="growth" tone="paper" />
      <PillarSection pillar="ai" tone="sunken" />
      <CtaBand />
    </>
  );
}
