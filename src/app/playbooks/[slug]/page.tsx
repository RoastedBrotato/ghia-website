import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, PlaybookCards } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Container, Eyebrow, Section, SectionHeader } from "@/components/ui/primitives";
import { formatDate, getPlaybook, playbooks, type Block } from "@/content/playbooks";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlaybook(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { type: "article", publishedTime: p.date },
  };
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case "p":
      return <p key={i}>{b.text}</p>;
    case "h2":
      return <h2 key={i}>{b.text}</h2>;
    case "h3":
      return <h3 key={i}>{b.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i}>
          {b.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return <blockquote key={i}>{b.text}</blockquote>;
  }
}

export default async function PlaybookPage({ params }: Props) {
  const { slug } = await params;
  const p = getPlaybook(slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.summary,
    datePublished: p.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <article>
        <header className="border-b border-line bg-paper">
          <Container className="pb-16 pt-12 sm:pt-16">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Playbooks", href: "/playbooks/" },
                { label: p.category },
              ]}
            />
            <Eyebrow className="mb-6">{p.category}</Eyebrow>
            <h1 className="t-display-lg max-w-[56rem] text-ink">{p.title}</h1>
            <p className="t-body-lg mt-6 max-w-[40rem]">{p.summary}</p>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle">
              {formatDate(p.date)} · {p.readMinutes} min read · Ghia team
            </p>
          </Container>
        </header>
        <Container className="py-10 sm:py-14">
          <div className="prose-ghia mx-auto lg:mx-0 lg:ml-[calc((100%-68ch)/4)]">
            {p.body.map(renderBlock)}
          </div>
        </Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </article>

      <Section tone="sunken">
        <Container>
          <SectionHeader eyebrow="More playbooks" title="Keep reading." />
          <div className="mt-8">
            <PlaybookCards exclude={p.slug} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
