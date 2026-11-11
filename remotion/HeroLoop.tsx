import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, MARK_PATH } from "./theme";

/**
 * Seamless hero background loop. Every motion is periodic over the
 * composition length, so frame N === frame 0.
 *
 * - Ripples: concentric rings continuously expanding from the signal origin
 * - Orbiters: nodes circling on the rings (integer revolutions per loop)
 * - Pulses: comet trails sweeping along the arcs
 * - Aurora: soft blue/cyan light fields drifting on closed paths
 * - Dot grid: a wave of light travelling across a perspective-free grid
 */
export const HeroLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames; // 0 → 1, loops
  const TAU = Math.PI * 2;

  // Signal origin sits right of centre, so the left of the frame stays calm for text.
  const ox = width * 0.74;
  const oy = height * 0.56;

  // --- Ripples ---------------------------------------------------------
  const spacing = 120;
  const ringCount = 12;
  // Expand by exactly one spacing per loop → seamless.
  const ripple = Array.from({ length: ringCount }, (_, i) => 40 + (i + t) * spacing);

  // --- Orbiters ----------------------------------------------------------
  const orbiters = [
    { r: 40 + 2 * spacing, speed: 1, phase: 0.1, size: 7, color: C.cyan },
    { r: 40 + 3 * spacing, speed: -1, phase: 0.45, size: 6, color: C.blue },
    { r: 40 + 4 * spacing, speed: 1, phase: 0.7, size: 9, color: C.blue },
    { r: 40 + 5 * spacing, speed: -1, phase: 0.2, size: 6, color: C.cyan },
    { r: 40 + 6 * spacing, speed: 1, phase: 0.9, size: 5, color: C.white },
  ];

  // --- Pulses: arc segments sweeping round -------------------------------
  const pulses = [
    { r: 40 + 2.5 * spacing, speed: 2, phase: 0, len: 0.12 },
    { r: 40 + 4.5 * spacing, speed: -1, phase: 0.33, len: 0.08 },
    { r: 40 + 6.5 * spacing, speed: 1, phase: 0.66, len: 0.06 },
  ];

  // --- Aurora blobs on closed loops --------------------------------------
  const blobs = [
    { cx: 0.72, cy: 0.38, rx: 0.08, ry: 0.06, size: 900, color: "rgba(22,120,232,0.38)", k: 1 },
    { cx: 0.88, cy: 0.72, rx: 0.06, ry: 0.08, size: 760, color: "rgba(0,200,255,0.20)", k: -1 },
    { cx: 0.55, cy: 0.85, rx: 0.1, ry: 0.04, size: 820, color: "rgba(42,47,158,0.35)", k: 1 },
  ];

  // --- Dot grid wave -----------------------------------------------------
  const gap = 48;
  const cols = Math.ceil(width / gap);
  const rows = Math.ceil(height / gap);

  return (
    <AbsoluteFill style={{ background: C.deep, overflow: "hidden" }}>
      {blobs.map((b, i) => {
        const a = TAU * t * b.k + i;
        const x = (b.cx + b.rx * Math.cos(a)) * width;
        const y = (b.cy + b.ry * Math.sin(a)) * height;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - b.size / 2,
              top: y - b.size / 2,
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${b.color} 0%, rgba(7,21,45,0) 65%)`,
              filter: "blur(20px)",
            }}
          />
        );
      })}

      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id="fade" cx={ox} cy={oy} r={width * 0.75} gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width={width} height={height} fill="url(#fade)" />
          </mask>
          <linearGradient id="comet" x1="0" x2="1">
            <stop offset="0" stopColor={C.cyan} stopOpacity="0" />
            <stop offset="1" stopColor={C.cyan} stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dot grid with a travelling light wave */}
        <g mask="url(#fadeMask)">
          {Array.from({ length: rows }, (_, ry) =>
            Array.from({ length: cols }, (_, cx) => {
              const x = cx * gap + gap / 2;
              const y = ry * gap + gap / 2;
              const d = Math.hypot(x - ox, y - oy);
              const wave = Math.sin(d / 90 - TAU * t * 2);
              const o = 0.05 + Math.max(0, wave) ** 6 * 0.5;
              return <circle key={`${cx}-${ry}`} cx={x} cy={y} r={1.4} fill={C.body} opacity={o} />;
            }),
          )}
        </g>

        {/* Ripples */}
        <g mask="url(#fadeMask)">
          {ripple.map((r, i) => {
            const life = Math.min(1, Math.max(0, (r - 40) / 160)); // born invisible at the origin → seamless
            return (
              <circle
                key={i}
                cx={ox}
                cy={oy}
                r={r}
                fill="none"
                stroke={i % 3 === 0 ? "#24447A" : C.ring}
                strokeWidth={i % 3 === 0 ? 2 : 1.4}
                opacity={life}
              />
            );
          })}
        </g>

        {/* Pulses */}
        <g filter="url(#glow)">
          {pulses.map((p, i) => {
            const circ = TAU * p.r;
            const head = (p.phase + t * p.speed) % 1;
            const offset = -((head + 1) % 1) * circ;
            return (
              <circle
                key={i}
                cx={ox}
                cy={oy}
                r={p.r}
                fill="none"
                stroke={i === 1 ? C.blue : C.cyan}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray={`${p.len * circ} ${circ}`}
                strokeDashoffset={offset}
                opacity={0.9}
              />
            );
          })}
        </g>

        {/* Orbiters */}
        <g filter="url(#glow)">
          {orbiters.map((o, i) => {
            const a = TAU * (o.phase + t * o.speed);
            return (
              <circle
                key={i}
                cx={ox + o.r * Math.cos(a)}
                cy={oy + o.r * Math.sin(a)}
                r={o.size}
                fill={o.color}
              />
            );
          })}
        </g>

        {/* The signal: Ghia mark at the origin, breathing */}
        <g
          transform={`translate(${ox - 60} ${oy - 60}) scale(1.2)`}
          opacity={0.95}
        >
          <circle cx="50" cy="50" r="70" fill={C.deep} />
          <path
            d={MARK_PATH}
            fill="none"
            stroke={C.white}
            strokeWidth={7}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="91.57"
            cy="31.49"
            r={6.5 + Math.sin(TAU * t * 2) * 1.2}
            fill={C.blue}
            filter="url(#glow)"
          />
        </g>
      </svg>

      {/* Subtle vignette */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 90% at 70% 55%, rgba(7,21,45,0) 40%, rgba(3,11,26,0.85) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
