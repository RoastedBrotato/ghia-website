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

const different = [
  {
    title: "One integrated team",
    body: "Brand, web, film, marketing and AI under one roof — one brief, one plan, one point of contact.",
  },
  {
    title: "Transparent process",
    body: "Clear milestones, honest timelines and pricing agreed before any work begins.",
  },
  {
    title: "Results focus",
    body: "Every project is tied to a business goal, and reported on leads and revenue, not likes.",
  },
];

const markParts = [
  {
    title: "One ribbon",
    body: "The G is a single folded band: every service made by one team, with no hand-offs between agencies.",
  },
  {
    title: "The fold",
    body: "Where the ribbon turns under itself, ideas become execution and creative work becomes growth.",
  },
  {
    title: "The open G",
    body: "Left open on the right, always moving forward with room to grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        eyebrow="About Ghia"
        title={
          <>
            A studio where <span className="grad">ideas</span> take shape.
          </>
        }
        intro="Ghia Technologies blends strategy, design and technology to build brands that last — and the websites, campaigns and AI systems that make them grow."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />

      <Section className="!pt-4">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="glass rounded-[22px] p-7 sm:p-9">
              <p className="t-label">Our story</p>
              <h2 className="t-h2 mt-3 text-ink">Growth is one problem. We treat it like one.</h2>
              <p className="t-body mt-4">
                Too many businesses split their growth across a branding agency, a web developer, an
                SEO team, a paid media agency and now an AI vendor — each reporting a different
                number. Ghia brings that work together in one studio, so the brand, the website, the
                campaigns and the follow-up are planned and judged as one system.
              </p>
            </div>
            <div className="glass rounded-[22px] p-7 sm:p-9">
              <p className="t-label">Vision</p>
              <h2 className="t-h2 mt-3 text-ink">The only partner a growing business needs.</h2>
              <p className="t-body mt-4">
                We want great creative work and reliable growth systems to be within reach of every
                ambitious business — not just the ones that can afford five agencies. That means
                doing the work well, explaining it plainly and measuring ourselves on your results.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow="Why Ghia" title="What makes Ghia different." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {different.map((d) => (
              <div key={d.title} className="glass rounded-[22px] p-7">
                <h3 className="t-h3 text-ink">{d.title}</h3>
                <p className="t-body-sm mt-2">{d.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
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

      <Section>
        <Container>
          <SectionHeader eyebrow="Principles" title="How we work." />
          <RuleColumns items={principles} className="mt-12" />
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="mx-auto aspect-square w-full max-w-[380px] rounded-lg border border-line bg-raised p-[18%]">
                <Mark className="size-full" title="The Ghia G" />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeader eyebrow="The mark" title="One ribbon, folded into a G." />
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
        <Container>
          <SectionHeader eyebrow="Commitments" title="What you can expect from us." />
          <RuleColumns items={commitments} className="mt-12" />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
