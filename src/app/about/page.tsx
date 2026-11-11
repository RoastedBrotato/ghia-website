import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { RuleColumns } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Mark } from "@/components/brand/Logo";
import { Button, Container, Num, Section, SectionHeader } from "@/components/ui/primitives";
import { commitments, principles } from "@/content/approach";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ghia Technologies is a digital growth and AI automation partner: one team running marketplaces, search, paid media, web and AI systems, measured on revenue.",
};

const markParts = [
  {
    title: "Two arcs",
    body: "Reach that ripples outward across every channel a brand sells on — marketplaces, search, social.",
  },
  {
    title: "One crossbar",
    body: "One team connecting the channels, closing the G. Everything runs through one system.",
  },
  {
    title: "The signal dot",
    body: "The result that leaves the system. The same dot sits over the i in our name.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Ghia"
        title="Growth is one problem. We treat it like one."
        intro="Most businesses split growth across a marketplace agency, an SEO agency, a paid media agency, a web developer and now an AI vendor. Each reports a different number. We built Ghia to be the one team that owns the whole system."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />

      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="What we do" title="Engineers, marketers and designers on one team." />
            </div>
            <div className="t-body-lg grid gap-6 lg:col-span-6 lg:col-start-7">
              <p>
                Ghia Technologies runs a brand&rsquo;s marketplaces, search and paid media, builds the
                website that converts that demand, and deploys the AI systems that answer and follow up
                every enquiry.
              </p>
              <p>
                Because one team does all of it, the work connects: ad spend follows inventory, content
                follows search demand, and every lead gets a reply — whatever channel it came from.
              </p>
              <p>
                We measure all of it the same way: on revenue, with methods you can check.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container wide>
          <SectionHeader eyebrow="Principles" title="How we work." />
          <RuleColumns items={principles} className="mt-12" />
        </Container>
      </Section>

      <Section tone="ink">
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="mx-auto aspect-square w-full max-w-[380px] rounded-lg border border-line bg-raised p-[18%]">
                <Mark className="size-full text-ink" title="The Ghia Signal G" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader eyebrow="The mark" title="Arcs, one crossbar, one dot." />
              <ol className="mt-10 divide-y divide-line border-y border-line">
                {markParts.map((p, i) => (
                  <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-2 py-6">
                    <Num n={i + 1} className="pt-1" />
                    <div>
                      <h3 className="t-h3 text-ink">{p.title}</h3>
                      <p className="t-body-sm mt-2">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <SectionHeader eyebrow="Commitments" title="What you can expect from us." />
          <RuleColumns items={commitments} className="mt-12" />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
