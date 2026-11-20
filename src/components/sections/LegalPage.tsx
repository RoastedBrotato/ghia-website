import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/sections/Blocks";
import { Container, Eyebrow } from "@/components/ui/primitives";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <header className="border-b border-line">
        <Container className="pb-14 pt-12 sm:pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: title }]} />
          <Eyebrow className="mb-6">Legal</Eyebrow>
          <h1 className="t-display-lg text-ink">{title}</h1>
          <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.08em] text-ink-subtle">
            Last updated {updated}
          </p>
        </Container>
      </header>
      <Container className="py-10 sm:py-14">
        <div className="prose-ghia">{children}</div>
      </Container>
    </>
  );
}
