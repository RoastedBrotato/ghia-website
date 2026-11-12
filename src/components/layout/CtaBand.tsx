import type { ReactNode } from "react";
import { Button, Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

/** The closing card on every page: one question, one button. */
export function CtaBand({
  title = (
    <>
      Have a project in <span className="grad">mind?</span>
    </>
  ),
  body = "Tell us where you want to grow. We'll come back with a clear plan and the team to run it.",
  cta = "Start a project",
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
        <div className="theme-dark ai-glow mx-auto flex flex-col items-center rounded-[24px] px-6 py-14 text-center sm:py-20">
          <h2 className="t-h1 text-ink">{title}</h2>
          <p className="t-body-lg mt-4 max-w-[34rem]">{body}</p>
          <Button href={href} size="lg" className="mt-8">
            {cta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
