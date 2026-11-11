import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { PlaybookCards } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Playbooks",
  description:
    "Practical playbooks on Amazon, SEO, paid media and AI automation from the Ghia Technologies team.",
};

export default function PlaybooksPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Playbooks" }]}
        eyebrow="Playbooks"
        title="How we think about growth."
        intro="Practical notes from the work — methods you can use whether or not you hire us."
      />
      <Section>
        <Container wide>
          <PlaybookCards />
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
