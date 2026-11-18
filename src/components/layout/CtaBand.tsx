import type { ReactNode } from "react";
import { Button, Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** The closing card on every page: one line, one button. */
export function CtaBand({
  title = (
    <>
      Let&rsquo;s build something great <span className="grad">together.</span>
    </>
  ),
  body = "Partner with Ghia Technologies and turn your ideas into measurable growth.",
  cta = "Get in touch",
  href = site.bookingUrl,
}: {
  title?: ReactNode;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="theme-dark ai-glow flex flex-col gap-8 rounded-[24px] border border-line px-6 py-12 sm:px-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="t-h1 text-ink">{title}</h2>
            <p className="t-body-lg mt-3 max-w-[38rem]">{body}</p>
          </div>
          <Button href={href} size="lg" icon="arrow-right" className="shrink-0 self-start md:self-auto">
            {cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
