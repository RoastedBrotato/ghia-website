import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/brand/Icon";
import {
  Button,
  Card,
  Container,
  IconTile,
  Num,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { getIndustry, industries } from "@/content/industries";
import { getService } from "@/content/services";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return { title: ind.name, description: ind.intro };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const others = industries.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries/" },
          { label: ind.name },
        ]}
        eyebrow={`Industries · ${ind.name}`}
        title={ind.headline}
        intro={ind.intro}
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Book a growth audit
          </Button>
        }
      />

      <Section>
        <Container wide>
          <SectionHeader eyebrow="The problem" title="Where growth gets stuck." />
          <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {ind.challenges.map((c, i) => (
              <div
                key={c.title}
                className="reveal border-t border-line-strong pt-5"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
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
          <SectionHeader
            eyebrow="What we deploy"
            title="Growth and automation, working together."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {ind.deploy.map((d) => {
              const svc = getService(d.service);
              return (
                <div key={d.title} className="reveal">
                  <Card href={`/services/${d.service}/`} className="h-full">
                    <div className="flex items-start justify-between gap-6">
                      {svc && <IconTile name={svc.icon} />}
                      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle">
                        {svc?.short}
                      </span>
                    </div>
                    <h3 className="t-h3 mt-8 text-ink">{d.title}</h3>
                    <p className="t-body-sm mt-2 max-w-[28rem]">{d.body}</p>
                  </Card>
                </div>
              );
            })}
          </div>
          {ind.note && (
            <p className="mt-10 max-w-[44rem] border-l-2 border-volt pl-5 text-[15px] leading-6 text-ink-muted">
              {ind.note}
            </p>
          )}
        </Container>
      </Section>

      <Section>
        <Container wide>
          <p className="t-label mb-6">Other industries</p>
          <ul className="divide-y divide-line border-y border-line">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/industries/${o.slug}/`}
                  className="group flex items-center justify-between gap-6 py-6"
                >
                  <span className="t-h2 text-ink transition-colors group-hover:text-cyan">
                    {o.name}
                  </span>
                  <span className="flex items-center gap-6">
                    <span className="t-body-sm hidden max-w-[24rem] md:block">{o.summary}</span>
                    <Icon
                      name="arrow-right"
                      className="size-5 shrink-0 text-ink transition-[transform,color] group-hover:translate-x-1 group-hover:text-cyan"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
