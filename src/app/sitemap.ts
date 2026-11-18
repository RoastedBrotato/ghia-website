import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { playbooks } from "@/content/playbooks";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (path: string) => `${site.url}${path}`;
  const pages = ["/", "/services/", "/solutions/", "/work/", "/industries/", "/approach/", "/playbooks/", "/about/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: u(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...services.map((s) => ({ url: u(`/services/${s.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...industries.map((i) => ({ url: u(`/industries/${i.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...playbooks.map((p) => ({ url: u(`/playbooks/${p.slug}/`), lastModified: p.date, priority: 0.6 })),
  ];
}
