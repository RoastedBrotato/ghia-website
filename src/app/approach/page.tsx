import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList, RuleColumns, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import {
  Button,
  CheckList,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { commitments, engagementModels, generalFaqs, processSteps } from "@/content/approach";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "How Ghia works: audit, plan, build, launch and compound — one process across growth and AI automation, judged on revenue.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Approach" }]}
        eyebrow="Approach"
        title="From audit to compounding growth."
        intro="One process for every channel and every system, so nothing is optimised in isolation and everything is judged on what it returned."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />

      <Section>
        <Container>
          <SectionHeader eyebrow="Process" title="Five steps, repeated." />
          <Steps steps={processSteps} className="mt-14" />
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <SectionHeader
            eyebrow="Ways to work together"
            title="Start small or run the whole system."
            intro="Every engagement starts with an audit. Pricing is agreed before any work begins."
          />
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {engagementModels.map((m, i) => (
              <div
                key={m.name}
                className={
                  i === 0
                    ? "flex flex-col rounded-[22px] border border-volt/50 bg-volt-soft p-6 sm:p-8"
                    : "glass flex flex-col rounded-[22px] p-6 sm:p-8"
                }
              >
                <p className="t-label">{m.kind}</p>
                <h3 className="t-h2 mt-4 text-ink">{m.name}</h3>
                <p className="t-body-sm mt-3">{m.body}</p>
                <CheckList items={m.points} className="mt-8 border-t border-line pt-6" />
                {i === 0 && (
                  <div className="mt-auto pt-8">
                    <Button href={site.bookingUrl} icon="arrow-right">
                      Book a growth audit
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Commitments" title="What you can expect from us." />
          <RuleColumns items={commitments} className="mt-12" />
        </Container>
      </Section>

      <Section tone="sunken">
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
