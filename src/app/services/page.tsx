import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { FaqList, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { generalFaqs, processSteps } from "@/content/approach";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, design and development, film, 3D and VFX, marketing strategy, paid media, SEO, Amazon & Walmart, social, AI automation and IT support — one studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Everything your brand <span className="grad">needs</span>.
          </>
        }
        intro="Eleven services under one roof. Pick a single service, or let us run the whole system so every part works with the others."
        actions={
          <>
            <Button href={site.bookingUrl} size="lg">
              Start a project
            </Button>
            <Button href="/approach/" size="lg" variant="secondary">
              How we work
            </Button>
          </>
        }
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <ServiceCards />
        </Container>
      </section>

      <Section tone="sunken">
        <Container>
          <SectionHeader
            eyebrow="How every project runs"
            title="One process, whatever the service."
            intro="Each engagement starts with an audit and ends with numbers you can check."
          />
          <Steps steps={processSteps} className="mt-12" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="FAQ" title="Questions we hear." />
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={generalFaqs} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
