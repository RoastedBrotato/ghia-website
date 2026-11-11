import { Button, Container } from "@/components/ui/primitives";
import { site } from "@/lib/site";

const pillars = [
  { k: "01", t: "Demand", d: "Marketplaces, search and paid media bring buyers in." },
  { k: "02", t: "Conversion", d: "Sites and stores built to turn that traffic into revenue." },
  { k: "03", t: "Response", d: "AI agents answer and follow up every enquiry, instantly." },
  { k: "04", t: "Operations", d: "Automation keeps the work behind every sale moving." },
];

/** The loud section: shader background that shifts with scroll, manifesto that lights up word by word. */
export function ShiftSection() {
  return (
    <section data-section="Why us" className="relative isolate overflow-hidden" aria-labelledby="manifesto">
      {/* Static mesh in the same palette as the hero field — no per-frame work here */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_82%_22%,rgba(22,120,232,0.6)_0%,transparent_62%),radial-gradient(45%_60%_at_8%_92%,rgba(107,61,255,0.45)_0%,transparent_62%),radial-gradient(40%_50%_at_62%_78%,rgba(0,200,255,0.28)_0%,transparent_60%),radial-gradient(60%_60%_at_35%_30%,rgba(42,47,158,0.5)_0%,transparent_70%)] bg-[#07152D]"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,11,26,0.5)_0%,rgba(3,11,26,0)_30%,rgba(3,11,26,0)_70%,rgba(3,11,26,0.6)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,11,26,0.62)_0%,rgba(3,11,26,0.25)_55%,rgba(3,11,26,0)_80%)]" />

      <Container wide className="py-28 sm:py-36 lg:py-48">
        <p className="eyebrow mb-10 !text-white/80" data-scramble>
          Why one system
        </p>
        <h2
          id="manifesto"
          className="max-w-[68rem] font-display text-[clamp(2.1rem,1.2rem+3.6vw,5rem)] leading-[1.06] tracking-[-0.035em] text-white"
          data-scrub-words
        >
          Most brands grow in pieces: one agency for ads, another for search, a freelancer for the
          site and now an AI vendor. We engineer it into one system that moves together.
        </h2>

        <div className="mt-20 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/10 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4" data-stagger>
          {pillars.map((p) => (
            <div key={p.t} className="bg-[rgba(3,11,26,0.45)] p-6 backdrop-blur-md sm:p-8">
              <span className="font-mono text-[12px] tracking-[0.08em] text-cyan">{p.k}</span>
              <h3 className="mt-6 font-display text-[28px] leading-8 tracking-[-0.02em] text-white">{p.t}</h3>
              <p className="mt-3 text-[15px] leading-6 text-white/75">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <span data-magnetic className="inline-block">
            <Button href={site.bookingUrl} size="lg" icon="arrow-right">
              Book a growth audit
            </Button>
          </span>
          <p className="font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">
            Demand → conversion → response → operations → revenue
          </p>
        </div>
      </Container>
    </section>
  );
}
