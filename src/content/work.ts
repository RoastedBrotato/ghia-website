import type { ThumbKind } from "@/components/brand/PageVisuals";
import type { Pillar } from "@/content/services";

/**
 * Our Work: the kinds of project each division delivers. These are
 * illustrative project types, not client case studies — swap in real
 * projects (with verified results) as they are approved for publication.
 */
export type WorkItem = {
  title: string;
  pillar: Pillar;
  tags: string[];
  body: string;
  thumb: ThumbKind;
  service: string;
};

export const work: WorkItem[] = [
  {
    title: "Brand film",
    pillar: "creative",
    tags: ["Concept", "Production", "Post-production"],
    body: "A story about your people and product, cut for every screen it runs on.",
    thumb: "film",
    service: "media-film-production",
  },
  {
    title: "Digital marketing campaign",
    pillar: "growth",
    tags: ["Strategy", "Ads", "Analytics"],
    body: "Paid search and social planned around one goal, with tracking you can check.",
    thumb: "campaign",
    service: "ppc-performance",
  },
  {
    title: "Amazon store optimisation",
    pillar: "commerce",
    tags: ["Listings", "Advertising", "Growth"],
    body: "Listings, A+ content and sponsored ads rebuilt around margin.",
    thumb: "store",
    service: "amazon-walmart",
  },
  {
    title: "AI-powered web platform",
    pillar: "digital",
    tags: ["Development", "AI", "Automation"],
    body: "A fast website with AI chat, lead capture and dashboards built in.",
    thumb: "platform",
    service: "design-development",
  },
  {
    title: "3D product visualisation",
    pillar: "creative",
    tags: ["3D", "Rendering", "Animation"],
    body: "Photoreal renders and product animations, before a single unit is made.",
    thumb: "product",
    service: "animation-vfx",
  },
  {
    title: "Social media campaign",
    pillar: "growth",
    tags: ["Content", "Strategy", "Engagement"],
    body: "A month of short-form content planned, produced and published.",
    thumb: "social",
    service: "social-content",
  },
  {
    title: "Brand identity system",
    pillar: "creative",
    tags: ["Strategy", "Identity", "Guidelines"],
    body: "Logo, colour, type and the guidelines that keep it consistent.",
    thumb: "identity",
    service: "branding-creative",
  },
  {
    title: "SEO growth programme",
    pillar: "growth",
    tags: ["Technical SEO", "Content", "Local"],
    body: "Site fixes and content that earn rankings for the searches that convert.",
    thumb: "search",
    service: "seo",
  },
  {
    title: "AI receptionist deployment",
    pillar: "digital",
    tags: ["Voice", "Chat", "Booking"],
    body: "Calls and messages answered at any hour, booked straight into your calendar.",
    thumb: "agent",
    service: "ai-automation",
  },
];
