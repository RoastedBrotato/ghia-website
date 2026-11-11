import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms", robots: { index: false } };

// TODO(legal): placeholder text. Have this reviewed before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="November 2026">
      <p>
        <strong>Placeholder.</strong> These terms are a starting draft and must be reviewed before
        the site launches.
      </p>
      <h2>Using this website</h2>
      <p>
        This website gives general information about {site.name} and our services. It is not
        professional advice for your specific situation.
      </p>
      <h2>Content</h2>
      <p>
        The text, design, logo and graphics on this site belong to {site.name}. You may share links
        to our pages and quote short extracts with attribution.
      </p>
      <h2>Third-party names</h2>
      <p>
        Platform and product names mentioned on this site are trademarks of their owners and are
        used only to describe the platforms we work with.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
