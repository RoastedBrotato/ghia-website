import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { FaqList, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Icon } from "@/components/brand/Icon";
import {
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

/** Wrap the last word of a headline in the gradient accent. */
function accentLast(text: string) {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <span className="grad">{text}</span>;
  return (
    <>
      {text.slice(0, i)} <span className="grad">{text.slice(i + 1)}</span>
    </>
  );
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const n = services.indexOf(s) + 1;
  const pillar = pillars[s.pillar];
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
        eyebrow={`Service ${String(n).padStart(2, "0")} · ${pillars[s.pillar].name}`}
        title={accentLast(s.headline)}
        intro={s.intro}
        actions={
          <>
            <Button href={`/contact/?service=${s.slug}`} size="lg" icon="arrow-right">
              Start a project
            </Button>
            <Button href="#capabilities" size="lg" variant="secondary">
              What&rsquo;s included
            </Button>
          </>
        }
        aside={
          <div className="glass relative overflow-hidden rounded-[22px] p-7 sm:p-9">
            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[12px] tracking-[0.24em] text-volt-text">
                {String(n).padStart(2, "0")}
              </span>
              <span className="grid size-12 place-items-center rounded-full border border-line-strong text-cyan">
                <Icon name={s.icon} className="size-6" />
              </span>
            </div>
            <h2 className="t-h2 relative mt-6 text-ink">{s.name}</h2>
            <ul className="relative mt-6 grid gap-3">
              {s.list.map((item) => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-ink">
                  <Icon name="check" className="size-5 shrink-0 text-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      />

      <Section id="capabilities">
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title={
              <>
                How we <span className="grad">deliver</span> it.
              </>
            }
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {s.capabilities.map((c, i) => (
              <Card key={c.title} className="h-full">
                <Num n={i + 1} />
                <h3 className="t-h3 mt-4 text-ink">{c.title}</h3>
                <p className="t-body-sm mt-2">{c.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <SectionHeader
            eyebrow={`How it runs · ${pillar.name}`}
            title="How a project runs, step by step."
            intro="You see the work at every stage, and nothing moves forward until you've signed it off."
          />
          <Steps steps={pillar.process} className="mt-8" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="Who it's for" title="A good fit if you're…" />
            </div>
            <div className="grid gap-4 lg:col-span-7">
              {pillar.goodFit.map((f) => (
                <div key={f} className="glass flex items-center gap-4 rounded-[18px] px-6 py-5">
                  <Icon name="check" className="size-5 shrink-0 text-cyan" />
                  <span className="text-[16px] text-ink">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionHeader eyebrow="What you get" title="Clear from day one." />
              <div className="mt-6">
                <Card>
                  <CheckList items={s.outcomes} />
                  <div className="mt-8 border-t border-line pt-6">
                    <Button href={`/contact/?service=${s.slug}`} icon="arrow-right">
                      Start a project
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <p className="eyebrow mb-6">FAQ</p>
              <FaqList faqs={s.faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Pairs well with"
            title="Part of one system."
            action={
              <Button href="/services/" variant="secondary" icon="arrow-right">
                All services
              </Button>
            }
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <Card key={r.slug} href={`/services/${r.slug}/`} className="min-h-[220px]">
                <IconTile name={r.icon} className="rounded-full" />
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
