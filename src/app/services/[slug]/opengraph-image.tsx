import { renderOg, ogSize } from "@/lib/og";
import { getService, services } from "@/content/services";

export const alt = "Ghia Technologies service";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug)!;
  return renderOg({ eyebrow: `Services · ${s.short}`, title: s.headline });
}
