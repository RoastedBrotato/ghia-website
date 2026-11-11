import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { mockups } from "@/components/mockups/Mockups";
import {
  Badge,
  Button,
  Card,
  CardArrow,
  CheckList,
  Container,
  IconTile,
  Num,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { getService, pillars, services } from "@/content/services";
import { processSteps } from "@/content/approach";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return { title: s.name, description: s.intro };
}

const heroMockup: Record<string, keyof typeof mockups> = {
  "amazon-walmart": "channels",
  "ai-agents": "receptionist",
  "ai-sales-engine": "pipeline",
  "ai-operations": "workflow",
};

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const Mock = heroMockup[s.slug] ? mockups[heroMockup[s.slug]] : null;
  const related = s.related.map(getService).filter(Boolean) as NonNullable<
    ReturnType<typeof getService>
  >[];

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services/" },
          { label: s.short },
        ]}
        eyebrow={`${pillars[s.pillar].name} · ${s.name}`}
        title={s.headline}
        intro={s.intro}
        actions={
          <>
            <Button href={site.bookingUrl} size="lg" icon="arrow-right">
              Book a growth audit
            </Button>
            <Button href="#capabilities" size="lg" variant="secondary">
              What&rsquo;s included
            </Button>
          </>
        }
        aside={Mock ? <Mock /> : undefined}
      >
        <div className="mt-10 flex flex-wrap gap-2">
          {s.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
      </PageHero>

      <Section id="capabilities">
        <Container wide>
          <SectionHeader eyebrow="What we do" title="Capabilities" />
          <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <div
                key={c.title}
                className="reveal border-t border-line-strong pt-5"
                style={{ ["--reveal-delay" as string]: `${(i % 3) * 80}ms` }}
              >
                <Num n={i + 1} />
                <h3 className="t-h3 mt-4 text-ink">{c.title}</h3>
                <p className="t-body-sm mt-2 max-w-[22rem]">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="What you get"
                title="Clear deliverables from the start."
                intro="Every engagement begins with an audit and a plan you can read, question and keep."
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="reveal">
              <Card>
                <p className="t-label mb-6">Included</p>
                <CheckList items={s.outcomes} />
                <div className="mt-8 border-t border-line pt-6">
                  <Button href={site.bookingUrl} icon="arrow-right">
                    Book a growth audit
                  </Button>
                </div>
              </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <SectionHeader eyebrow="How it runs" title="One process, judged on revenue." />
          <Steps steps={processSteps} className="mt-14" />
        </Container>
      </Section>

      <Section tone="sunken">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <SectionHeader eyebrow="FAQ" title="Questions we hear." />
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={s.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <SectionHeader eyebrow="Works with" title="Part of one system." />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} href={`/services/${r.slug}/`} className="min-h-[220px]">
                <IconTile name={r.icon} />
                <h3 className="t-h3 mt-6 text-ink">{r.name}</h3>
                <p className="t-body-sm mt-2">{r.summary}</p>
                <CardArrow />
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
