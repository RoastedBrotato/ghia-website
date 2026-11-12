import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceCatalog } from "@/components/sections/ServiceCatalog";
import { CtaBand } from "@/components/layout/CtaBand";
import { Button } from "@/components/ui/primitives";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, design and development, film, 3D and VFX, marketing strategy, paid media, SEO, Amazon & Walmart, social, AI automation and IT support — one studio.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        eyebrow="Services"
        title={
          <>
            Everything your brand <span className="grad">needs</span>.
          </>
        }
        intro="Three teams under one roof — creative, growth and digital. Pick a service, or let us run the whole system."
        actions={
          <Button href={site.bookingUrl} size="lg" icon="arrow-right">
            Start a project
          </Button>
        }
      />
      <ServiceCatalog />
      <CtaBand />
    </>
  );
}
