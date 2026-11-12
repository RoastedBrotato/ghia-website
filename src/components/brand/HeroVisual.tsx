import { useId } from "react";
import { FOLD_PATH, MARK_COLORS, MARK_PATH } from "@/components/brand/Logo";

/**
 * Hero illustration: a laptop with the glowing G on screen, circled by rings
 * of light. Pure SVG, so it is sharp at any size and costs no image download.
 * The rings are drawn twice — the back half behind the laptop, the front half
 * over it — so they wrap around it.
 */
export function HeroVisual({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const ring = (rx: number, ry: number, rot: number, w: number, o: number) => (
    <g transform={`rotate(${rot} 450 340)`} opacity={o}>
      <ellipse cx="450" cy="340" rx={rx} ry={ry} fill="none" stroke="#3d5cff" strokeWidth={w * 5} filter={`url(#${id}-blur)`} />
      <ellipse cx="450" cy="340" rx={rx} ry={ry} fill="none" stroke="#9fb4ff" strokeWidth={w} />
    </g>
  );
  const rings = (
    <>
      {ring(380, 120, -14, 2.2, 1)}
      {ring(330, 150, 8, 1.2, 0.55)}
      {ring(395, 92, -4, 0.8, 0.35)}
    </>
  );

  return (
    <svg viewBox="40 40 820 600" className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id={`${id}-blur`} x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
        <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#3d5cff" stopOpacity=".45" />
          <stop offset="1" stopColor="#3d5cff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0d1530" />
          <stop offset="1" stopColor="#03060f" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".12" />
          <stop offset=".4" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-deck`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d97c9" />
          <stop offset="1" stopColor="#4a5487" />
        </linearGradient>
        <linearGradient id={`${id}-lip`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#5b66a3" />
          <stop offset=".5" stopColor="#c3cbf2" />
          <stop offset="1" stopColor="#3a4377" />
        </linearGradient>
        <linearGradient id={`${id}-g`} x1="150" y1="1050" x2="1100" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={MARK_COLORS.light} />
          <stop offset=".45" stopColor={MARK_COLORS.mid} />
          <stop offset="1" stopColor={MARK_COLORS.deep} />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="560" y1="760" x2="1000" y2="1060" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={MARK_COLORS.fold} stopOpacity=".75" />
          <stop offset="1" stopColor={MARK_COLORS.fold} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${id}-back`}>
          <rect x="0" y="0" width="900" height="330" />
        </clipPath>
        <clipPath id={`${id}-front`}>
          <rect x="0" y="330" width="900" height="400" />
        </clipPath>
      </defs>

      {/* glow behind everything */}
      <ellipse cx="460" cy="320" rx="330" ry="250" fill={`url(#${id}-halo)`} />

      {/* back half of the rings */}
      <g clipPath={`url(#${id}-back)`}>{rings}</g>

      {/* reflection on the floor */}
      <ellipse cx="450" cy="520" rx="300" ry="26" fill="#3d5cff" opacity=".35" filter={`url(#${id}-glow)`} />

      {/* lid */}
      <path d="M318,150 Q320,138 332,137 L628,108 Q642,107 641,121 L616,404 Q615,414 604,414 L300,402 Q290,401 291,391 Z" fill="#2b356d" stroke="#aab6ee" strokeWidth="2" strokeOpacity=".7" />
      <path d="M326,155 L630,124 L606,404 L302,393 Z" fill={`url(#${id}-screen)`} />
      <path d="M326,155 L630,124 L606,404 L302,393 Z" fill={`url(#${id}-shine)`} />

      {/* the G on screen, with its glow */}
      <circle cx="466" cy="266" r="70" fill="#2b4dff" opacity=".45" filter={`url(#${id}-glow)`} />
      <g transform="translate(466 266) skewY(-4) scale(0.112) translate(-613 -625)">
        <path d={MARK_PATH} fill={`url(#${id}-g)`} />
        <path d={FOLD_PATH} fill={`url(#${id}-f)`} />
      </g>

      {/* deck, keyboard and trackpad */}
      <path d="M300,402 L616,414 L742,488 Q748,494 738,496 L168,480 Q158,478 165,472 Z" fill={`url(#${id}-deck)`} />
      <path d="M318,412 L600,422 L660,456 L262,444 Z" fill="#1d2550" opacity=".85" />
      <g stroke="#3b4683" strokeWidth="1">
        <path d="M300,423 L618,433" />
        <path d="M285,434 L637,445" />
        <path d="M290,412 L235,448" opacity="0" />
      </g>
      <path d="M418,458 L520,461 L530,478 L410,475 Z" fill="#a8b2e3" opacity=".55" />
      <path d="M165,472 L738,496 L736,504 Q734,508 726,508 L176,492 Q166,491 165,484 Z" fill={`url(#${id}-lip)`} />

      {/* front half of the rings, over the laptop */}
      <g clipPath={`url(#${id}-front)`}>{rings}</g>
    </svg>
  );
}
