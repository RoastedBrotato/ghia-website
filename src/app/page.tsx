import { Hero } from "@/components/sections/Hero";
import { ReelSection } from "@/components/sections/ReelSection";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { ServiceSlider } from "@/components/sections/ServiceSlider";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Button, Card, CheckList, Container, Section, SectionHeader } from "@/components/ui/primitives";

/**
 * Home is a landing page: hook → proof of craft (reel) → what we do → why us →
 * how it works → one clear ask. Everything deeper lives on its own page.
 */

const reasons: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "compass",
    title: "Strategy first",
    body: "Research-led thinking behind every pixel, every frame and every pound of ad spend.",
  },
  {
    icon: "film",
    title: "Craft & motion",
    body: "Brand, web, film, 3D and animation made in-house — so it all looks like one brand.",
  },
  {
    icon: "growth",
    title: "Built to convert",
    body: "Fast sites, tracked campaigns and reporting on leads and revenue, not likes.",
  },
  {
    icon: "agent",
    title: "AI that follows up",
    body: "Every enquiry answered in minutes, day or night, and handed to your team ready to close.",
  },
];

const steps = [
  { title: "Discover", body: "A call and an audit of your brand, channels and numbers." },
  { title: "Plan", body: "One roadmap, ranked by impact, with the targets we'll be judged on." },
  { title: "Create & build", body: "Creative, websites, campaigns and AI — produced by one team." },
  { title: "Launch & grow", body: "Ship fast, measure everything, double down on what works." },
];

export default function Home() {
  return (
    <>
      <Hero />
      <ReelSection />
      <PlatformStrip />

      <ServiceSlider />

      <Section tone="sunken" data-section="Why Ghia">
        <Container wide>
          <SectionHeader
            eyebrow="Why Ghia"
            title={
              <>
                Creative thinking, <span className="grad">technical precision.</span>
              </>
            }
            intro="One studio for the idea, the build and the results — so nothing gets lost between agencies."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <Card interactive className="h-full">
                  <span className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cyan">
                    <Icon name={r.icon} className="size-[22px]" />
                  </span>
                  <h3 className="t-h3 mt-6 text-ink">{r.title}</h3>
                  <p className="t-body-sm mt-2">{r.body}</p>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section data-section="Process">
        <Container wide>
          <SectionHeader
            eyebrow="How it works"
            title={
              <>
                From first call to <span className="grad">first results.</span>
              </>
            }
            action={
              <Button href="/approach/" variant="secondary" icon="arrow-right">
                Our approach
              </Button>
            }
          />
          <ol className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6" data-stagger>
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-volt via-cyan to-transparent lg:block"
            />
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative grid size-11 place-items-center rounded-full border border-cyan/40 bg-paper font-mono text-[13px] text-cyan shadow-[0_0_24px_-6px_rgba(0,200,255,0.6)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 mt-6 text-ink">{s.title}</h3>
                <p className="t-body-sm mt-2 max-w-[18rem]">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <section id="start" data-section="Start a project" className="theme-ink glow-tr relative overflow-hidden">
        <Container wide className="relative py-20 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-6" data-scramble>
                Start a project
              </p>
              <h2 className="t-display-lg text-ink" data-split="words">
                Have a project in <span className="grad">mind?</span>
              </h2>
              <p className="t-body-lg mt-6 max-w-[30rem]">
                Tell us about your brand and where you want to grow. We&rsquo;ll come back with a
                clear plan and the team to run it.
              </p>
              <CheckList
                className="mt-8"
                items={[
                  "A real person reads every enquiry",
                  "A clear plan, not a sales script",
                  "No commitment until you're sure",
                ]}
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <EnquiryForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
