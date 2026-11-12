import { CtaBand } from "@/components/layout/CtaBand";
import {
  Button,
  Card,
  CardArrow,
  Container,
  Eyebrow,
  IconTile,
} from "@/components/ui/primitives";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { solutions } from "@/content/solutions";
import { site } from "@/lib/site";

/**
 * Home is deliberately plain: showreel → who we are → what we do → flagship
 * solutions → how we work → one ask. No scroll effects or animation; every
 * detail lives on its own page.
 */

const capabilities = [
  {
    title: "Strategy first",
    body: "Research-led thinking behind every pixel, every frame and every pound of ad spend.",
  },
  {
    title: "Craft in-house",
    body: "Brand, web, film, 3D and animation made by one team, so it all looks like one brand.",
  },
  {
    title: "Built to convert",
    body: "Fast websites, tracked campaigns and reporting on leads and revenue, not likes.",
  },
  {
    title: "AI that follows up",
    body: "Every enquiry answered in minutes, day or night, and handed to your team ready to close.",
  },
];

export default function Home() {
  return (
    <>
      {/* Showreel + hero share one navy band */}
      <div className="theme-dark hero-glow">
        <section className="pt-12 sm:pt-16">
          <Container>
            <Eyebrow className="mb-4">Showreel</Eyebrow>
            <div className="glass mx-auto max-w-[960px] rounded-[22px] p-2 sm:p-3">
              <video
                className="block aspect-video w-full rounded-[14px] bg-black object-cover"
                src="/motion/reel.mp4"
                poster="/motion/reel.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Ghia Technologies showreel"
              />
            </div>
          </Container>
        </section>

        <section className="pb-20 pt-16 sm:pb-28 sm:pt-24">
          <Container>
            <Eyebrow className="mb-5">Creative, growth &amp; AI studio</Eyebrow>
            <h1 className="t-display-xl max-w-[56rem] text-ink">
              We build <span className="grad">brands</span> that grow.
            </h1>
            <p className="t-body-lg mt-6 max-w-[36rem]">
              Ghia Technologies designs brands, builds websites, produces films
              and runs the campaigns and AI systems that turn attention into
              customers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.bookingUrl} size="lg">
                Start a project
              </Button>
              <Button href="/services/" size="lg" variant="secondary">
                Explore services
              </Button>
            </div>
          </Container>
        </section>
      </div>

      {/* Who we are */}
      <section className="pb-12 pt-20 sm:pb-16 sm:pt-24">
        <Container>
          <Eyebrow className="mb-5">Who we are</Eyebrow>
          <h2 className="t-h1 max-w-[44rem] text-ink">
            Creative thinking, <span className="grad">technical precision</span>
            .
          </h2>
          <p className="t-body-lg mt-5 max-w-[44rem]">
            From brand identity and film to paid media, marketplaces and AI
            agents, we&rsquo;re one studio for the idea, the build and the
            results — so nothing gets lost between agencies.
          </p>
        </Container>
      </section>

      {/* What we do */}
      <section className="py-12 sm:py-16">
        <Container>
          <Eyebrow className="mb-5">Services</Eyebrow>
          <h2 className="t-h1 text-ink">What we do</h2>
          <div className="mt-10">
            <ServiceCards />
          </div>
        </Container>
      </section>

      {/* Flagship solutions: the one futuristic band */}
      <section className="theme-dark ai-glow mt-12 py-20 sm:mt-16 sm:py-24">
        <Container>
          <Eyebrow className="mb-5">Flagship solutions</Eyebrow>
          <h2 className="t-h1 text-ink">
            AI systems that do the <span className="grad">work</span>.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {solutions.map((s) => (
              <Card
                key={s.slug}
                href={`/solutions/#${s.slug}`}
                className="h-full"
              >
                <IconTile name={s.icon} className="rounded-full" />
                <p className="t-label mt-6">{s.name}</p>
                <h3 className="t-h3 mt-2 text-ink">{s.promise}</h3>
                <p className="t-body-sm mt-2">{s.summary}</p>
                <CardArrow />
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <Button href="/solutions/" variant="secondary">
              All solutions
            </Button>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="py-12 sm:py-16">
        <Container>
          <Eyebrow className="mb-5">Our approach</Eyebrow>
          <h2 className="t-h1 text-ink">Capabilities</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c) => (
              <div key={c.title} className="glass rounded-[22px] p-7">
                <h3 className="t-h3 text-ink">{c.title}</h3>
                <p className="t-body-sm mt-2">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
