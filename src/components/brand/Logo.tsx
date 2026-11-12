import { useId } from "react";

/**
 * Ghia logo: the folded-ribbon G (client artwork, redrawn as a vector so it
 * stays sharp and clean on any background) plus the two-line wordmark set in
 * Outfit. The wordmark uses currentColor, so it is white on dark grounds and
 * ink on light ones; the G keeps its blue gradient everywhere.
 */
type LogoProps = {
  className?: string;
  title?: string;
};

/** Outline of the G, in a 974×960 box starting at (126,145). */
export const MARK_PATH =
  "M478,145 L910,145 A120,120 0 0 1 910,385 L570,385 Q550,385 538,401 L384,597 Q370,618 383,640 L508,858 Q521,880 546,880 L713,880 Q733,880 748,863 L848,745 L628,745 A112.5,112.5 0 0 1 628,520 L1010,520 Q1100,520 1100,610 L1100,850 Q1100,870 1086,885 L878,1090 Q862,1105 840,1105 L482,1105 Q458,1105 444,1086 L142,642 Q126,617 142,592 L440,166 Q455,145 478,145 Z";

/** The darker fold where the ribbon turns under the crossbar. */
export const FOLD_PATH =
  "M378,610 L508,858 Q521,880 546,880 L713,880 Q733,880 748,863 L848,745 L1100,745 L1100,850 Q1100,870 1086,885 L878,1090 Q862,1105 840,1105 L700,1105 Q520,960 378,610 Z";

export const MARK_COLORS = { light: "#1FD0FF", mid: "#1E7BFF", deep: "#2B2BF5", fold: "#0A1FB8" };

/** The G as SVG children, drawn in the mark's own coordinates. */
function MarkShapes({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-g`} x1="150" y1="1050" x2="1100" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={MARK_COLORS.light} />
          <stop offset=".45" stopColor={MARK_COLORS.mid} />
          <stop offset="1" stopColor={MARK_COLORS.deep} />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="560" y1="760" x2="1000" y2="1060" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={MARK_COLORS.fold} stopOpacity=".75" />
          <stop offset="1" stopColor={MARK_COLORS.fold} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={MARK_PATH} fill={`url(#${id}-g)`} />
      <path d={FOLD_PATH} fill={`url(#${id}-f)`} />
    </>
  );
}

export function Logo({ className, title = "Ghia Technologies" }: LogoProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg
      viewBox="0 0 392 104"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="scale(0.1042) translate(-126 -145)">
        <MarkShapes id={id} />
      </g>
      <g fill="currentColor" style={{ fontFamily: "var(--font-outfit), sans-serif", fontWeight: 500 }} fontSize="48">
        <text x="114" y="42">Ghia</text>
        <text x="114" y="92">Technologies</text>
      </g>
    </svg>
  );
}

export function Mark({ className, title = "Ghia" }: LogoProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg
      viewBox="126 145 974 960"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <MarkShapes id={id} />
    </svg>
  );
}
