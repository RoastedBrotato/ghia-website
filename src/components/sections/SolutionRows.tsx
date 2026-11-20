import { CheckList, Eyebrow, TextLink, cx } from "@/components/ui/primitives";
import { mockups } from "@/components/mockups/Mockups";
import { solutions } from "@/content/solutions";

/** Alternating text + product-UI rows for the three flagship AI solutions. */
export function SolutionRows({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-10 sm:gap-14 lg:gap-20">
      {solutions.map((s, i) => {
        const Mock = mockups[s.mockup];
        return (
          <article
            key={s.slug}
            id={s.slug}
            className="grid scroll-mt-24 items-center gap-8 lg:grid-cols-12 lg:gap-8"
          >
            <div className={cx("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
              <Eyebrow className="eyebrow--plain mb-3">
                {String(i + 1).padStart(2, "0")} · {s.name}
              </Eyebrow>
              <H className="t-h1 text-ink">{s.promise}</H>
              <p className="t-body mt-3 max-w-[30rem] sm:mt-4">{s.summary}</p>
              <CheckList items={s.features} className="mt-5 gap-2 sm:mt-6 sm:gap-3" />
              <p className="mt-6 hidden font-mono text-[12px] sm:block tracking-[0.04em] text-ink-subtle">
                BEST FOR · {s.bestFor.join(" · ").toUpperCase()}
              </p>
              <TextLink href={`/services/${s.service}/`} className="mt-5 sm:mt-6">
                How it works
              </TextLink>
            </div>
            <div
              className={cx(
                "hidden md:block lg:col-span-6",
                i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
              )}
            >
              <Mock />
            </div>
          </article>
        );
      })}
    </div>
  );
}
