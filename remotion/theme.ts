import { continueRender, delayRender, staticFile } from "remotion";

export const C = {
  deep: "#07152D",
  midnight: "#030B1A",
  raised: "#0C1F3D",
  blue: "#1678E8",
  cyan: "#00C8FF",
  white: "#FFFFFF",
  body: "#B9C9E1",
  subtle: "#8597B5",
  ring: "#1D3560",
  line: "#15294B",
  indigo: "#2A2F9E",
};

export const MARK_PATH =
  "M76.10,12.73 A45.5,45.5 0 1 0 95.50,50.00 M63.77,30.34 A24,24 0 1 0 74.00,50.00 M95.5,50 H74";

const fonts: [string, string, string][] = [
  ["Inter Display", "fonts/InterDisplay-Regular.woff2", "400"],
  ["Inter Display", "fonts/InterDisplay-Medium.woff2", "500"],
  ["Inter", "fonts/Inter-Medium.woff2", "500"],
  ["Geist Mono", "fonts/GeistMono-Regular.woff2", "400"],
];

let loaded = false;
/** Load brand fonts once before the first frame renders. */
export function loadBrandFonts() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("brand fonts");
  Promise.all(
    fonts.map(([family, file, weight]) => {
      const face = new FontFace(family, `url(${staticFile(file)}) format("woff2")`, { weight });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch(() => continueRender(handle));
}

export const FONT = {
  display: '"Inter Display", Inter, sans-serif',
  sans: "Inter, sans-serif",
  mono: '"Geist Mono", monospace',
};
