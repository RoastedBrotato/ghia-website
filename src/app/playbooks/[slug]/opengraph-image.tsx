import { renderOg, ogSize } from "@/lib/og";
import { getPlaybook, playbooks } from "@/content/playbooks";

export const alt = "Ghia Technologies playbook";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return playbooks.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPlaybook(slug)!;
  return renderOg({ eyebrow: `Playbook · ${p.category}`, title: p.title });
}
