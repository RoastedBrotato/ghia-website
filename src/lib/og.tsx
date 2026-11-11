import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const MARK_PATH =
  "M76.10,12.73 A45.5,45.5 0 1 0 95.50,50.00 M63.77,30.34 A24,24 0 1 0 74.00,50.00 M95.5,50 H74";

/** Brand OG card: ink ground, signal rings bottom-right, mono eyebrow, display headline. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [display, mono] = await Promise.all([
    readFile(join(process.cwd(), "assets/og/InterDisplay-Regular.otf")),
    readFile(join(process.cwd(), "assets/og/GeistMono-Regular.ttf")),
  ]);

  const W = ogSize.width;
  const H = ogSize.height;
  const radii = [110, 200, 290, 380, 470, 560];
  const outer = radii[radii.length - 1];
  const a = (58 * Math.PI) / 180;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07152D",
          backgroundImage: "radial-gradient(circle at 85% 35%, rgba(22,120,232,0.28), rgba(7,21,45,0) 55%)",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: "absolute", left: 0, top: 0 }}
        >
          {radii.map((r) => (
            <path
              key={r}
              d={`M ${W - r} ${H} A ${r} ${r} 0 0 1 ${W} ${H - r}`}
              fill="none"
              stroke="#1D3560"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ))}
          <circle cx={W - outer * Math.cos(a)} cy={H - outer * Math.sin(a)} r={11} fill="#1678E8" />
        </svg>

        <svg width="56" height="56" viewBox="-5 -5 110 110">
          <path
            d={MARK_PATH}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="91.57" cy="31.49" r="6.5" fill="#1678E8" />
        </svg>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontFamily: "Geist Mono",
              fontSize: 22,
              letterSpacing: "0.08em",
              color: "#B9C9E1",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#1678E8" }} />
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: "Inter Display",
              fontSize: title.length > 40 ? 64 : 80,
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter Display", data: display, style: "normal", weight: 400 },
        { name: "Geist Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
