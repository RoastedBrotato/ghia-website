import { ShiftingGradient } from "@/components/motion/ShiftingGradient";
import { SignalRings } from "@/components/brand/SignalRings";
import { Button, Container } from "@/components/ui/primitives";

const ticker = ["Branding", "Web & apps", "Film", "3D & VFX", "Performance ads", "SEO", "Amazon", "AI agents"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-paper" data-section="Intro">
      {/* Shifting gradient field + signal rings */}
      <div className="absolute inset-0 -z-10">
        <ShiftingGradient className="absolute inset-0" />
        <SignalRings
          animate
          count={6}
          spacing={112}
          inner={96}
          dotAngle={57}
          dotRadius={12}
          className="pointer-events-none absolute bottom-0 right-0 h-[48%] w-auto [--ring-stroke:rgba(255,255,255,0.22)] md:h-[78%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,11,26,0.85)_0%,rgba(3,11,26,0.6)_38%,rgba(3,11,26,0.35)_70%,rgba(3,11,26,0.3)_100%)] max-md:bg-[linear-gradient(180deg,rgba(3,11,26,0.3)_0%,rgba(3,11,26,0.7)_55%,rgba(3,11,26,0.85)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      </div>

      <Container
        wide
        className="relative flex min-h-[calc(100svh-var(--nav-height))] flex-col justify-center pb-28 pt-20 lg:min-h-[min(calc(100svh-var(--nav-height)),920px)]"
      >
        <div className="max-w-[62rem] will-change-transform" data-parallax="0.22">
          <p className="eyebrow mb-7" data-scramble data-split-now>
            Creative, growth &amp; AI studio
          </p>
          <h1 className="t-display-xl text-ink" data-split="words" data-split-now>
            Growth, <span className="grad">engineered.</span>
          </h1>
          <p className="t-body-lg hero-fade mt-7 max-w-[36rem]">
            We design brands, build websites, produce films and run the campaigns and AI systems
            that turn attention into customers — one studio, measured on revenue.
          </p>
          <div className="hero-fade mt-10 flex flex-wrap gap-3 [animation-delay:1.1s]">
            <span data-magnetic className="inline-block">
              <Button href="#start" size="lg" icon="arrow-right">
                Start a project
              </Button>
            </span>
            <span data-magnetic className="inline-block">
              <Button href="/services/" size="lg" variant="secondary">
                Explore services
              </Button>
            </span>
          </div>
        </div>

        {/* Bottom rail: capabilities ticker + scroll cue */}
        <div className="hero-fade absolute inset-x-4 bottom-8 flex items-end justify-between gap-6 sm:inset-x-6 lg:inset-x-8 [animation-delay:1.4s]">
          <ul className="hidden flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-subtle md:flex">
            {ticker.map((t, i) => (
              <li key={t} className="flex items-center gap-5">
                {t}
                {i < ticker.length - 1 && <span className="size-1 rounded-full bg-line-control" />}
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-scroll-next
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-subtle transition-colors hover:text-cyan"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-line">
              <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-cyan" />
            </span>
          </button>
        </div>
      </Container>
    </section>
  );
}
