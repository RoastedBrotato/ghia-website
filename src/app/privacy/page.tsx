import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy", robots: { index: false } };

// TODO(legal): placeholder text. Have this reviewed before launch, and update it
// when analytics, forms or a scheduler are added.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="November 2026">
      <p>
        <strong>Placeholder.</strong> This policy is a starting draft and must be reviewed before
        the site launches.
      </p>
      <h2>Who we are</h2>
      <p>
        {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates this website. You can contact us
        at <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <h2>What we collect</h2>
      <p>
        This website does not use contact forms or advertising cookies. If you email us, we receive
        the information you choose to send, such as your name, email address and message.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and arrange a call.</li>
        <li>To prepare a proposal if you ask us to.</li>
      </ul>
      <p>We do not sell your information.</p>
      <h2>How long we keep it</h2>
      <p>
        We keep enquiry emails for as long as needed to respond and for our reasonable business
        records, then delete them.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask to see, correct or delete the information we hold about you by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
