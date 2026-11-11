import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionRows } from "@/components/sections/SolutionRows";
import { FaqList, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { deploymentSteps } from "@/content/solutions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI solutions",
  description:
    "Ghia AI Receptionist, AI Sales Engine and AI Operations — packaged AI systems we deploy, connect to your tools and keep improving.",
};

const faqs = [
  {
    q: "Are these off-the-shelf products?",
    a: "They're built on a shared foundation we maintain, then configured for each business — your information, rules, tools and tone.",
  },
  {
    q: "Which tools do they connect to?",
    a: "Calendars, CRMs, help desks, phone systems, WhatsApp and most software with an API. We confirm the integrations during the audit.",
  },
  {
    q: "Do we need technical staff to run them?",
    a: "No. We deploy, monitor and improve them. Your team gets a simple way to review conversations and update information.",
  },
  {
    q: "Can we start small?",
    a: "Yes. Most deployments start with one channel or process as a pilot, then expand once it's working the way you want.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Solutions" }]}
        eyebrow="Flagship AI solutions"
        title="AI systems that do the work."
        intro="Three packaged solutions for the problems we see most: missed enquiries, slow follow-up and repetitive admin. Deployed on your tools, run by us."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />

      <Section>
        <Container wide>
          <SolutionRows headingLevel="h2" />
        </Container>
      </Section>

      <Section tone="sunken">
        <Container wide>
          <SectionHeader
            eyebrow="Deployment"
            title="From first call to live, step by step."
            intro="A person reviews early conversations and outcomes before anything runs on its own."
          />
          <Steps steps={deploymentSteps} className="mt-14" />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="FAQ" title="Questions we hear." />
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Start with one"
        title="Pick the process that hurts most."
        body="We'll map it, show you what an AI system would handle and what should stay with your team, and give you a clear plan."
      />
    </>
  );
}
