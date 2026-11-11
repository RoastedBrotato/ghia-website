import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { IndustryGrid } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button, Container, Section } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Growth and AI automation for real estate, dental and healthcare clinics, e-commerce brands and professional services.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Industries"
        title="Built for businesses that run on enquiries."
        intro="We focus where the same problems repeat — missed calls, slow follow-up, scattered channels and manual admin — so every deployment builds on the last."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />
      <Section>
        <Container wide>
          <IndustryGrid />
          <p className="t-body mt-12 max-w-[40rem]">
            Don&rsquo;t see your industry? The same methods apply to most businesses that sell online
            or take bookings. Tell us what you do on a growth audit call.
          </p>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
