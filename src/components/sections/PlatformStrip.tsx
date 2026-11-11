import { Container } from "@/components/ui/primitives";

// Platforms named as plain text (no third-party logos).
const platforms = [
  "Amazon",
  "Walmart",
  "Google",
  "Meta",
  "Shopify",
  "YouTube",
  "WhatsApp",
  "HubSpot",
  "Salesforce",
  "OpenAI",
  "Anthropic",
  "n8n",
];

export function PlatformStrip() {
  const row = [...platforms, ...platforms];
  return (
    <section aria-label="Platforms we work across" className="border-y border-line bg-paper">
      <Container wide className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
        <p className="t-label shrink-0">Built on the platforms you already use</p>
        <div className="marquee relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="marquee-track flex w-max items-center gap-12 motion-reduce:flex-wrap motion-reduce:gap-y-3">
            {row.map((p, i) => (
              <li
                key={`${p}-${i}`}
                aria-hidden={i >= platforms.length ? true : undefined}
                className="whitespace-nowrap font-display text-[20px] tracking-[-0.02em] text-ink-subtle"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
