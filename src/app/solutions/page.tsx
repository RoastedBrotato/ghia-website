import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { SolutionRows } from "@/components/sections/SolutionRows";
import { ArrowSteps, FaqList } from "@/components/sections/Blocks";
import { CtaBand } from "@/components/layout/CtaBand";
import { AiVisual } from "@/components/brand/PageVisuals";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Button, Container, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "AI solutions",
  description:
    "AI strategy, custom AI tools, AI agents and automation — plus the Ghia AI Receptionist, AI Sales Engine and AI Operations, deployed on your tools and run by us.",
};

const capabilities: { icon: IconName; title: string; body: string; href: string }[] = [
  {
    icon: "compass",
    title: "AI strategy & consulting",
    body: "Find where AI pays back in your business, and where it shouldn't be used.",
    href: "/services/ai-automation/",
  },
  {
    icon: "web-dev",
    title: "Custom AI solutions",
    body: "Intelligent tools and workflows built around your data and processes.",
    href: "/services/ai-automation/",
  },
  {
    icon: "agent",
    title: "AI agents & automation",
    body: "Agents that answer, book, follow up and handle routine tasks for your team.",
    href: "#solutions",
  },
  {
    icon: "shield",
    title: "Secure & scalable AI",
    body: "Deployed on reliable cloud infrastructure, with logs, access controls and human review.",
    href: "/services/it-tech-support/",
  },
];

const process = [
  { title: "Discover your goals", body: "We map the process, the people and the numbers that matter." },
  { title: "Design your solution", body: "What the AI handles, what stays with your team, and how it's measured." },
  { title: "Build & integrate", body: "Built, connected to your tools and tested on real scenarios." },
  { title: "Scale & grow", body: "Launched on one channel first, reviewed monthly, then expanded." },
];

const faqs = [
  {
    q: "Are these off-the-shelf products?",
    a: "They're built on a shared foundation we maintain, then configured for each business — your information, rules, tools and tone.",
  },
  {
    q: "Which tools do they connect to?",
    a: "Calendars, CRMs, help desks, phone systems, WhatsApp and most software with an API. We confirm the integrations during the audit.",
  },
  {
    q: "Do we need technical staff to run them?",
    a: "No. We deploy, monitor and improve them. Your team gets a simple way to review conversations and update information.",
  },
  {
    q: "Can we start small?",
    a: "Yes. Most deployments start with one channel or process as a pilot, then expand once it's working the way you want.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Solutions"
        title={
          <>
            Intelligent solutions for a <span className="grad">smarter</span> tomorrow.
          </>
        }
        intro="From AI agents to automation, we help you work smarter, move faster and find new ways to grow."
        actions={
          <>
            <Button href="#solutions" size="lg" icon="arrow-right">
              Explore AI solutions
            </Button>
            <Button href="#process" size="lg" variant="secondary">
              See how it works
            </Button>
          </>
        }
        aside={<AiVisual className="block h-auto w-full" />}
      />

      {/* Capabilities */}
      <Section>
        <Container>
          <div className="text-center">
            <p className="eyebrow eyebrow--plain">Our capabilities</p>
            <h2 className="t-h1 mt-3 text-ink">End-to-end AI solutions</h2>
            <p className="t-body-lg mx-auto mt-3 max-w-[36rem]">
              Strategy, development and deployment — all under one roof.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-4">
            {capabilities.map((c) => (
              <Link key={c.title} href={c.href} className="glass lift group/card flex flex-col rounded-[18px] p-4 sm:rounded-[22px] sm:p-6">
                <Icon name={c.icon} className="size-7 text-volt-text sm:size-9" />
                <h3 className="t-h4 mt-3 text-ink sm:mt-5">{c.title}</h3>
                <p className="t-body-sm mt-1.5 hidden sm:block">{c.body}</p>
                <span className="mt-auto hidden self-end pt-6 sm:block">
                  <span className="grid size-8 place-items-center rounded-full bg-btn text-on-volt transition-transform duration-200 group-hover/card:translate-x-0.5">
                    <Icon name="arrow-right" className="size-4" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Flagship products */}
      <Section id="solutions" className="scroll-mt-20">
        <Container>
          <div className="mb-8 max-w-[44rem] sm:mb-12">
            <p className="eyebrow eyebrow--plain">Flagship solutions</p>
            <h2 className="t-h1 mt-3 text-ink">
              AI systems that do the <span className="grad">work</span>.
            </h2>
            <p className="t-body-lg mt-4">
              Three packaged solutions for the problems we see most: missed enquiries, slow follow-up
              and repetitive admin. Deployed on your tools, run by us.
            </p>
          </div>
          <SolutionRows />
        </Container>
      </Section>

      {/* Process */}
      <Section tone="sunken" id="process" className="scroll-mt-20">
        <Container>
          <div className="text-center">
            <p className="eyebrow-pill">Our process</p>
            <h2 className="t-h1 mt-4 text-ink">From idea to impact</h2>
            <p className="t-body-lg mx-auto mt-3 max-w-[36rem]">
              A proven process to help you adopt and scale AI with confidence.
            </p>
          </div>
          <ArrowSteps steps={process} className="mt-8 sm:mt-10" />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <p className="eyebrow eyebrow--plain">FAQ</p>
              <h2 className="t-h1 mt-3 text-ink">Questions we hear.</h2>
            </div>
            <div className="lg:col-span-8">
              <FaqList faqs={faqs} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        title={
          <>
            Let&rsquo;s build intelligent solutions <span className="grad">together.</span>
          </>
        }
        body="Partner with Ghia Technologies and turn AI into your competitive advantage."
      />
    </>
  );
}
