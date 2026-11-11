/**
 * Signal rings — the brand's graphic device. Concentric quarter arcs anchored
 * to a corner, round caps, even spacing, exactly one Volt dot on the outer ring.
 * Pure SVG + CSS (no JS); animation is disabled under prefers-reduced-motion.
 */
type Corner = "bottom-right" | "top-right" | "bottom-left" | "top-left";

export function SignalRings({
  count = 5,
  spacing = 100,
  inner = 90,
  strokeWidth = 2,
  dotAngle = 58,
  dotRadius = 11,
  corner = "bottom-right",
  animate = false,
  className,
}: {
  count?: number;
  spacing?: number;
  inner?: number;
  strokeWidth?: number;
  /** Degrees from the horizontal arm of the outer ring (0–90) */
  dotAngle?: number;
  dotRadius?: number;
  corner?: Corner;
  animate?: boolean;
  className?: string;
}) {
  const outer = inner + spacing * (count - 1);
  const pad = dotRadius + strokeWidth;
  const size = outer + pad;
  // Draw for bottom-right, then mirror with a transform for other corners.
  const cx = size;
  const cy = size;
  const radii = Array.from({ length: count }, (_, i) => inner + spacing * i);
  const a = (dotAngle * Math.PI) / 180;
  const dx = cx - outer * Math.cos(a);
  const dy = cy - outer * Math.sin(a);

  const flip =
    corner === "bottom-left"
      ? `translate(${size} 0) scale(-1 1)`
      : corner === "top-right"
        ? `translate(0 ${size}) scale(1 -1)`
        : corner === "top-left"
          ? `translate(${size} ${size}) scale(-1 -1)`
          : undefined;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={[animate ? "rings--animate" : "", className].filter(Boolean).join(" ")}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMaxYMax meet"
    >
      <g transform={flip}>
        {radii.map((r, i) => (
          <path
            key={r}
            className="ring"
            style={{ ["--i" as string]: count - 1 - i }}
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
            pathLength={1}
            fill="none"
            stroke="var(--ring-stroke)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
        <g
          className="ring-dot"
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "view-box" }}
        >
          <circle cx={dx} cy={dy} r={dotRadius} fill="var(--volt)" />
        </g>
      </g>
    </svg>
  );
}
