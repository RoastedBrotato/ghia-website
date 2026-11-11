import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Blocks";
import { Icon } from "@/components/brand/Icon";
import {
  Button,
  Card,
  CheckList,
  Container,
  Section,
  SectionHeader,
} from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a growth audit",
  description:
    "Book a growth audit with Ghia Technologies. We review your channels, data and workflows and hand you a prioritised plan.",
};

const auditSteps = [
  {
    title: "Intro call",
    body: "A short call to understand your business, goals and the channels and tools you use today.",
  },
  {
    title: "Audit",
    body: "We review your marketplaces, search, ads, site, tracking and workflows with the access you grant.",
  },
  {
    title: "Plan",
    body: "You get a prioritised plan with the opportunities we found, what we'd do first and why.",
  },
];

const sendUs = [
  "Your website and the marketplaces you sell on",
  "The channels you run today and who manages them",
  "What you want to grow, fix or automate first",
  "Any tools you already use, such as CRM, help desk or calendar",
];

export default function ContactPage() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Growth audit")}`;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Book a growth audit"
        title="See where your growth is leaking."
        intro="Tell us about your business. We'll review your channels, data and workflows and hand you a prioritised plan — whether or not you work with us."
        actions={
          <>
            {/* TODO(scheduler): swap for the booking link once it exists (see src/lib/site.ts) */}
            <Button href={mailto} size="lg" icon="arrow-right">
              Email us to book
            </Button>
          </>
        }
      />

      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <SectionHeader
                eyebrow="Get in touch"
                title="Start with an email."
                intro="Online booking is coming soon. Until then, email us and we'll reply with times for an intro call."
              />
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <Card>
                  <Icon name="mail" className="size-6 text-ink" />
                  <p className="t-label mt-6">Email</p>
                  <a
                    href={mailto}
                    className="mt-2 break-all text-[17px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                  >
                    {site.email}
                  </a>
                </Card>
                <Card>
                  <Icon name="calendar" className="size-6 text-ink" />
                  <p className="t-label mt-6">Online booking</p>
                  <p className="mt-2 text-[17px] font-medium text-ink-muted">Coming soon</p>
                </Card>
              </div>
              <div className="mt-8">
                <p className="t-label mb-4">Follow us</p>
                <ul className="flex flex-wrap gap-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="inline-flex h-9 items-center rounded-sm border border-line px-3.5 text-[14px] text-ink-muted transition-colors hover:border-ink hover:text-ink"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="rounded-md border border-line bg-sunken p-6 sm:p-8">
                <p className="t-label mb-6">Helpful to include</p>
                <CheckList items={sendUs} />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sunken">
        <Container wide>
          <SectionHeader eyebrow="What happens next" title="How a growth audit works." />
          <Steps steps={auditSteps} className="mt-14" />
        </Container>
      </Section>
    </>
  );
}
