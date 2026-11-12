import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Icon } from "@/components/brand/Icon";
import { CheckList, Container, Section } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Ghia Technologies about your project — branding, websites, film, marketing or AI. We'll come back with a clear plan and the team to run it.",
};

const helpful = [
  "Your website and the channels you use today",
  "What you want to launch, grow, fix or automate first",
  "Any deadlines or launch dates we should know about",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Start a project"
        title={
          <>
            Let&rsquo;s work <span className="grad">together.</span>
          </>
        }
        intro="Tell us about your project. A real person reads every enquiry and replies with next steps."
      />

      <Section className="!pt-12 sm:!pt-16">
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>
            <aside className="grid content-start gap-4 lg:col-span-4 lg:col-start-9">
              <div className="glass rounded-[22px] p-6 sm:p-8">
                <Icon name="mail" className="size-6 text-cyan" />
                <p className="t-label mt-5">Prefer email?</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 block break-all text-[17px] text-ink underline decoration-white/20 underline-offset-4 hover:decoration-cyan"
                >
                  {site.email}
                </a>
              </div>
              <div className="glass rounded-[22px] p-6 sm:p-8">
                <p className="t-label mb-5">Helpful to include</p>
                <CheckList items={helpful} />
              </div>
              <div className="px-1 pt-2">
                <p className="t-label mb-3">Follow us</p>
                <ul className="flex flex-wrap gap-2">
                  {site.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        className="inline-flex h-9 items-center rounded-full border border-white/15 px-4 text-[14px] text-ink-muted transition-colors hover:border-cyan hover:text-cyan"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
