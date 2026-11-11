import { SignalRings } from "@/components/brand/SignalRings";
import { Button, Container, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper">
      <SignalRings
        count={5}
        spacing={96}
        inner={80}
        dotAngle={58}
        dotRadius={10}
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[80%] w-auto md:block"
      />
      <Container wide className="relative flex min-h-[70vh] flex-col justify-center py-24">
        <Eyebrow className="mb-6">404 · Signal lost</Eyebrow>
        <h1 className="t-display-lg max-w-[40rem] text-ink">This page isn&rsquo;t here.</h1>
        <p className="t-body-lg mt-6 max-w-[34rem]">
          The link may be out of date, or the page may have moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg" icon="arrow-right">
            Back to home
          </Button>
          <Button href="/services/" size="lg" variant="secondary">
            See services
          </Button>
        </div>
      </Container>
    </section>
  );
}
