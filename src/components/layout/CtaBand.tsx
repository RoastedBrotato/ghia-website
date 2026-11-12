import type { ReactNode } from "react";
import { SignalRings } from "@/components/brand/SignalRings";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** Full ink CTA band with signal rings — closes most pages. */
export function CtaBand({
  section = "Get started",
  eyebrow = "Growth audit",
  title = (
    <>
      See where your growth is <span className="grad">leaking.</span>
    </>
  ),
  body = "We review your marketplaces, search, ads, site and workflows, then hand you a prioritised plan — whether or not you work with us.",
  secondary = { href: "/approach/", label: "How we work" },
}: {
  section?: string;
  eyebrow?: string;
  title?: ReactNode;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="theme-ink glow-tr relative overflow-hidden" data-section={section}>
      <SignalRings
        count={6}
        spacing={92}
        inner={80}
        dotAngle={60}
        dotRadius={10}
        className="pointer-events-none absolute bottom-0 right-0 h-[85%] max-h-[620px] w-auto opacity-100 max-md:h-[55%]"
      />
      <Container wide className="relative py-20 sm:py-28">
        <div className="glass mx-auto flex max-w-[60rem] flex-col items-center rounded-[28px] px-6 py-16 text-center backdrop-blur-md sm:px-12 sm:py-20">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="t-display-lg text-ink" data-split="words">
            {title}
          </h2>
          <p className="t-body-lg mt-6 max-w-[34rem]">{body}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <span data-magnetic className="inline-block">
              <Button href={site.bookingUrl} size="lg" icon="arrow-right">
                Start a project
              </Button>
            </span>
            <Button href={secondary.href} size="lg" variant="secondary">
              {secondary.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
