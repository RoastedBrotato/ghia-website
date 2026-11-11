import { Hero } from "@/components/sections/Hero";
import { PlatformStrip } from "@/components/sections/PlatformStrip";
import { SystemSection } from "@/components/sections/SystemSection";
import { ReelSection } from "@/components/sections/ReelSection";
import { ShiftSection } from "@/components/sections/ShiftSection";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { ServiceExplorer } from "@/components/sections/ServiceExplorer";
import { SolutionRows } from "@/components/sections/SolutionRows";
import { IndustryGrid, PlaybookCards, RuleColumns, Steps } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button, Container, Section, SectionHeader } from "@/components/ui/primitives";
import { commitments, processSteps } from "@/content/approach";

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformStrip />
      <SystemSection />
      <ReelSection />

      <Section tone="sunken" data-section="Services">
        <Container wide>
          <SectionHeader
            eyebrow="Services"
            title="Everything your brand needs to grow online."
            intro="Two pillars, one team. Pick a single service or run the whole system."
            action={
              <Button href="/services/" variant="secondary" icon="arrow-right">
                All services
              </Button>
            }
          />
          <div className="mt-12">
            <ServiceExplorer />
          </div>
        </Container>
      </Section>

      <VelocityMarquee
        words={["Growth, engineered", "Marketplaces", "Search", "Paid media", "Websites", "AI agents", "Automation"]}
      />
      <ShiftSection />

      <Section tone="sunken" data-section="Solutions">
        <Container wide>
          <SectionHeader
            eyebrow="Flagship AI solutions"
            title="AI systems that do the work, not the demo."
            intro="Packaged solutions we deploy, connect to your tools and keep improving after launch."
            action={
              <Button href="/solutions/" variant="secondary" icon="arrow-right">
                All solutions
              </Button>
            }
          />
          <div className="mt-16 lg:mt-24">
            <SolutionRows />
          </div>
        </Container>
      </Section>

      <Section data-section="Industries">
        <Container wide>
          <SectionHeader
            eyebrow="Industries"
            title="Built for businesses that run on enquiries."
            intro="We start where the same problems repeat: missed calls, slow follow-up, scattered channels and manual admin."
            action={
              <Button href="/industries/" variant="secondary" icon="arrow-right">
                All industries
              </Button>
            }
          />
          <div className="mt-12">
            <IndustryGrid />
          </div>
        </Container>
      </Section>

      <Section tone="sunken" data-section="Approach">
        <Container wide>
          <SectionHeader
            eyebrow="Approach"
            title="From audit to compounding growth."
            intro="One process across growth and automation, judged on revenue."
            action={
              <Button href="/approach/" variant="secondary" icon="arrow-right">
                How we work
              </Button>
            }
          />
          <Steps steps={processSteps} className="mt-14" />
          <div className="mt-20 border-t border-line pt-14">
            <p className="t-label mb-8">What you can expect</p>
            <RuleColumns items={commitments} />
          </div>
        </Container>
      </Section>

      <Section data-section="Playbooks">
        <Container wide>
          <SectionHeader
            eyebrow="Playbooks"
            title="How we think about growth."
            intro="Practical notes from the work — methods you can use whether or not you hire us."
            action={
              <Button href="/playbooks/" variant="secondary" icon="arrow-right">
                All playbooks
              </Button>
            }
          />
          <div className="mt-12">
            <PlaybookCards limit={3} />
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
