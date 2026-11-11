/**
 * Ghia logo and mark — geometry copied verbatim from the brand kit SVGs.
 * Strokes use currentColor (ink / paper); the signal dot uses --logo-accent
 * (defaults to Volt). Never retype the wordmark in a font.
 */
type LogoProps = {
  className?: string;
  /** Stroke-draw animation on scroll (MotionDirector) */
  draw?: boolean;
  /** "volt" grounds need an ink dot instead of a Volt one */
  accent?: "volt" | "ink" | "none";
  title?: string;
};

const MARK_PATH =
  "M76.10,12.73 A45.5,45.5 0 1 0 95.50,50.00 M63.77,30.34 A24,24 0 1 0 74.00,50.00 M95.5,50 H74";

function accentFill(accent: LogoProps["accent"]) {
  if (accent === "ink") return "var(--brand-ink)";
  if (accent === "none") return "currentColor";
  return "var(--logo-accent, var(--volt))";
}

export function Logo({ className, accent = "volt", title = "Ghia Technologies", draw }: LogoProps) {
  const fill = accentFill(accent);
  return (
    <svg
      viewBox="-5 -5 274 105"
      className={className}
      data-draw={draw ? "" : undefined}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(0.7)">
        <path
          d={MARK_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="91.57" cy="31.49" r="6.5" fill={fill} data-dot="" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </g>
      <g transform="translate(94 24)">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="23" cy="23" r="19.75" />
          <path d="M42.75,3.25 V48 A19.75,19.75 0 0 1 23.0,67.75 A19.75,19.75 0 0 1 5.25,56.8875" />
          <path d="M58.25,-24 V42.75" />
          <path d="M58.25,23.0 A19.75,19.75 0 0 1 97.75,23.0 V42.75" />
          <path d="M111.25,3.25 V42.75" />
          <circle cx="147" cy="23" r="19.75" />
          <path d="M166.75,3.25 V42.75" />
        </g>
        <circle cx="111.25" cy="-18.75" r="4.65" fill={fill} data-dot="" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
      </g>
    </svg>
  );
}

export function Mark({
  className,
  accent = "volt",
  title = "Ghia",
  strokeWidth = 8,
}: LogoProps & { strokeWidth?: number }) {
  return (
    <svg
      viewBox="-5 -5 110 110"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={MARK_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="91.57" cy="31.49" r="6.5" fill={accentFill(accent)} />
    </svg>
  );
}
