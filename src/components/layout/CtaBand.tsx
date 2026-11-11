import { SignalRings } from "@/components/brand/SignalRings";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** Full ink CTA band with signal rings — closes most pages. */
export function CtaBand({
  section = "Get started",
  eyebrow = "Growth audit",
  title = "See where your growth is leaking.",
  body = "We review your marketplaces, search, ads, site and workflows, then hand you a prioritised plan — whether or not you work with us.",
}: {
  section?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
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
      <Container wide className="relative py-24 sm:py-32">
        <div className="max-w-[40rem]">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <h2 className="t-display-lg text-ink" data-split="words">
            {title}
          </h2>
          <p className="t-body-lg mt-6 max-w-[34rem]">{body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <span data-magnetic className="inline-block">
              <Button href={site.bookingUrl} size="lg" icon="arrow-right">
                Book a growth audit
              </Button>
            </span>
            <Button href="/approach/" size="lg" variant="secondary">
              How we work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
