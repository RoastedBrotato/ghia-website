/**
 * Site-wide settings. Everything marked TODO is a placeholder to replace
 * before launch — it is the only file that needs editing for these.
 */
export const site = {
  name: "Ghia Technologies",
  shortName: "Ghia",
  tagline: "Growth, engineered.",
  description:
    "Ghia Technologies runs your marketplaces, search and paid media, and builds the AI systems that turn demand into customers — one team, measured on revenue.",

  // Production builds set NEXT_PUBLIC_SITE_URL; previews fall back to the live domain for canonicals.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ghiatechonlogies.com",

  email: "ghiatechonologies@gmail.com",

  // TODO(scheduler): replace with the Cal.com / Calendly link. Every
  // "Book a growth audit" / "Book a call" button points here.
  bookingUrl: "/contact/",

  // TODO(socials): replace "#" with profile URLs. Order follows the brand guidelines.
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Facebook", href: "#" },
  ],
} as const;

/** True until a real domain is configured — previews stay out of search engines. */
export const isPreview = !process.env.NEXT_PUBLIC_SITE_URL;

export const isExternal = (href: string) => /^https?:\/\//.test(href);
