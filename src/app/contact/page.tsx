import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { FaqList } from "@/components/sections/Blocks";
import { SocialLinks } from "@/components/layout/Footer";
import { ContactVisual } from "@/components/brand/PageVisuals";
import { Mark } from "@/components/brand/Logo";
import { Icon } from "@/components/brand/Icon";
import { Button, Container, Section } from "@/components/ui/primitives";
import { industries } from "@/content/industries";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Ghia Technologies about your project — branding, film, marketing, marketplaces, websites or AI. We'll come back with a clear plan and the team to run it.",
};

const nextSteps = [
  { title: "We read your message", body: "A real person reviews every enquiry — no bots, no sales scripts." },
  { title: "We reply with next steps", body: "Questions, a suggested call time, or a first idea of the approach." },
  { title: "You get a clear plan", body: "Scope, timeline and price agreed in writing before any work starts." },
];

const faqs = [
  {
    q: "What industries do you work with?",
    a: `Businesses of every size, with deep experience in ${industries
      .map((i) => i.name.toLowerCase())
      .join(", ")
      .replace(/, ([^,]*)$/, " and $1")}.`,
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. A brand identity or website is usually a matter of weeks; marketing and marketplace work runs month to month. We confirm the timeline in writing before we start.",
  },
  {
    q: "How do you price your work?",
    a: "Audits are fixed-price. Projects are quoted on scope. Retainers are monthly. You get a clear number before any work starts.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={
          <>
            Let&rsquo;s build something great <span className="grad">together.</span>
          </>
        }
        intro="Have a project in mind? Get in touch with our team and let's turn your ideas into measurable results."
        actions={
          <Button href="#enquiry" size="lg" icon="arrow-right">
            Get in touch
          </Button>
        }
        aside={<ContactVisual className="block h-auto w-full" />}
      >
        <div className="glass mt-8 grid gap-5 rounded-[20px] p-5 sm:mt-10 sm:grid-cols-2 sm:gap-0 sm:divide-x sm:divide-line sm:p-0">
          <div className="flex items-start gap-4 sm:p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-btn text-on-volt">
              <Icon name="mail" className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="t-h4 text-ink">Email us</p>
              <a href={`mailto:${site.email}`} className="block break-all text-[15px] text-ink-muted hover:text-volt-text">
                {site.email}
              </a>
              <p className="mt-1 text-[13px] text-ink-subtle">A real person replies to every message</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 sm:p-6">
            <p className="t-h4 text-ink">Follow us</p>
            <SocialLinks />
          </div>
        </div>
      </PageHero>

      <Section id="enquiry" className="scroll-mt-20">
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow-pill">Get in touch</p>
            <h2 className="t-h1 mt-4 text-ink">Send us a message</h2>
            <p className="t-body-lg mt-3 max-w-[32rem]">
              A real person reads every enquiry and replies with clear next steps.
            </p>
            <EnquiryForm className="mt-6 sm:mt-8" />
          </div>
          <aside className="theme-dark ai-glow hidden flex-col overflow-hidden rounded-[24px] border border-line p-7 sm:p-9 lg:col-span-5 lg:flex">
            <Mark className="size-14" title="" />
            <h2 className="t-h2 mt-6 text-ink">What happens next</h2>
            <ol className="mt-6 grid gap-6">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-btn font-mono text-[14px] text-on-volt">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="t-h4 text-ink">{s.title}</h3>
                    <p className="t-body-sm mt-1">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-auto border-t border-line pt-6">
              <p className="t-body-sm">Helpful to include: your website, what you want to launch, grow or automate, and any deadlines.</p>
            </div>
          </aside>
        </Container>
      </Section>

      <Section className="theme-dark ai-glow border-t border-line">
        <Container className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="eyebrow-pill">FAQs</p>
            <h2 className="t-h1 mt-4 text-ink">Frequently asked questions</h2>
            <div className="mt-6 hidden lg:block">
              <Button href="/approach/" variant="secondary" icon="arrow-right">
                How we work
              </Button>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={faqs} />
          </div>
        </Container>
      </Section>

    </>
  );
}
