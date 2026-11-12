import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { servicesByPillar } from "@/content/services";
import { industries } from "@/content/industries";
import { site } from "@/lib/site";

const company = [
  { label: "Solutions", href: "/solutions/" },
  { label: "Approach", href: "/approach/" },
  { label: "Playbooks", href: "/playbooks/" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
];

function Col({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="t-label mb-4">{title}</p>
      <ul className="grid gap-2.5">
        {items.map((i) => (
          <li key={i.href}>
            <Link
              href={i.href}
              className="text-[14px] leading-5 text-ink-muted transition-colors hover:text-ink"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-ink border-t border-line">
      <Container wide className="pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="h-8 w-auto text-ink" />
            <p className="mt-6 max-w-[22rem] text-[15px] leading-6 text-ink-muted">
              {site.tagline} Brands, websites, films, campaigns and AI — one studio, measured on
              revenue.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block font-mono text-[13px] tracking-[0.02em] text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
            >
              {site.email}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            <Col
              title="Creative & Digital"
              items={[...servicesByPillar("creative"), ...servicesByPillar("digital")].map((s) => ({
                label: s.short,
                href: `/services/${s.slug}/`,
              }))}
            />
            <Col
              title="Growth"
              items={servicesByPillar("growth").map((s) => ({
                label: s.short,
                href: `/services/${s.slug}/`,
              }))}
            />
            <Col
              title="Industries"
              items={industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}/` }))}
            />
            <Col title="Company" items={company} />
          </div>
        </div>

        <div className="mt-20 text-ink" aria-hidden="true">
          <Logo className="h-auto w-full opacity-90" draw />
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[12px] tracking-[0.04em] text-ink-subtle">
            © {year} Ghia Technologies
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Social media">
            {site.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle transition-colors hover:text-ink"
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy/" className="text-[13px] text-ink-subtle hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms/" className="text-[13px] text-ink-subtle hover:text-ink">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
