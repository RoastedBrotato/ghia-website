import { CheckList, Eyebrow, TextLink, cx } from "@/components/ui/primitives";
import { mockups } from "@/components/mockups/Mockups";
import { solutions } from "@/content/solutions";

/** Alternating text + product-UI rows for the three flagship AI solutions. */
export function SolutionRows({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-20 lg:gap-28">
      {solutions.map((s, i) => {
        const Mock = mockups[s.mockup];
        return (
          <article
            key={s.slug}
            id={s.slug}
            className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8"
          >
            <div className={cx("reveal lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              <Eyebrow className="eyebrow--plain mb-4">
                {String(i + 1).padStart(2, "0")} · {s.name}
              </Eyebrow>
              <H className="t-h1 text-ink">{s.promise}</H>
              <p className="t-body mt-5 max-w-[30rem]">{s.summary}</p>
              <CheckList items={s.features} className="mt-7" />
              <p className="mt-7 font-mono text-[12px] tracking-[0.04em] text-ink-subtle">
                BEST FOR · {s.bestFor.join(" · ").toUpperCase()}
              </p>
              <TextLink href={`/services/${s.service}/`} className="mt-7">
                How it works
              </TextLink>
            </div>
            <div
              className={cx(
                "reveal lg:col-span-6",
                i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
              )}
              style={{ ["--reveal-delay" as string]: "120ms" }}
            >
              <Mock />
            </div>
          </article>
        );
      })}
    </div>
  );
}
