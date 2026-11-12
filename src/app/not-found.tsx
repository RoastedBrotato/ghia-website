import { Button, Container, Eyebrow } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section className="bg-paper">
      <Container className="flex min-h-[60vh] flex-col justify-center py-20">
        <Eyebrow className="mb-5">404</Eyebrow>
        <h1 className="t-display-lg max-w-[40rem] text-ink">
          Page <span className="grad">not found</span>.
        </h1>
        <p className="t-body-lg mt-6 max-w-[34rem]">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or it may have moved.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg">
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
