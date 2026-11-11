import { renderOg, ogSize } from "@/lib/og";

export const alt = "Ghia Technologies — Growth, engineered.";
export const size = ogSize;
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return renderOg({ eyebrow: "Digital growth & AI automation", title: "Growth, engineered." });
}
