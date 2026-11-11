import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C, FONT, MARK_PATH } from "./theme";

const TAU = Math.PI * 2;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/* ------------------------------------------------------------------ helpers */

function Aurora({ shift = 0 }: { shift?: number }) {
  const frame = useCurrentFrame();
  const a = (frame / 300) * TAU + shift;
  return (
    <AbsoluteFill style={{ background: C.deep, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1200,
          height: 1200,
          left: 1100 + Math.cos(a) * 120 - 600,
          top: 300 + Math.sin(a) * 90 - 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(22,120,232,0.35), rgba(7,21,45,0) 62%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          left: 500 + Math.sin(a) * 140 - 500,
          top: 820 + Math.cos(a) * 80 - 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,200,255,0.14), rgba(7,21,45,0) 62%)",
        }}
      />
    </AbsoluteFill>
  );
}

/** Per-letter spring rise inside a clipping line — the anime.js-style stagger. */
function KineticLine({
  text,
  start = 0,
  size = 180,
  stagger = 1.4,
  exitAt,
  color = C.white,
  weight = 400,
}: {
  text: string;
  start?: number;
  size?: number;
  stagger?: number;
  exitAt?: number;
  color?: string;
  weight?: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const exit =
    exitAt !== undefined
      ? interpolate(frame, [exitAt, exitAt + 8], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
      : 0;
  return (
    <div
      style={{
        display: "flex",
        overflow: "hidden",
        paddingBottom: size * 0.18,
        fontFamily: FONT.display,
        fontWeight: weight,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.04em",
        color,
        transform: `translateY(${-exit * size * 0.6}px)`,
        opacity: 1 - exit,
        filter: `blur(${exit * 14}px)`,
      }}
    >
      {[...text].map((ch, i) => {
        const s = spring({
          frame: frame - start - i * stagger,
          fps,
          config: { damping: 14, stiffness: 140, mass: 0.7 },
        });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              transform: `translateY(${(1 - s) * 110}%) rotate(${(1 - s) * 8}deg)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
}

function Mono({ children, opacity = 1 }: { children: React.ReactNode; opacity?: number }) {
  return (
    <div
      style={{
        fontFamily: FONT.mono,
        fontSize: 24,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: C.body,
        display: "flex",
        alignItems: "center",
        gap: 14,
        opacity,
      }}
    >
      <span style={{ width: 10, height: 10, borderRadius: 99, background: C.blue }} />
      {children}
    </div>
  );
}

function Mark({ draw = 1, dot = 1, size = 220 }: { draw?: number; dot?: number; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="-5 -5 110 110">
      <path
        d={MARK_PATH}
        fill="none"
        stroke={C.white}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        strokeDasharray="1 1"
        strokeDashoffset={1 - draw}
      />
      <circle cx="91.57" cy="31.49" r={6.5 * dot} fill={C.blue} />
    </svg>
  );
}

/* ------------------------------------------------------------------- scenes */

function SceneMark() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const draw = interpolate(frame, [4, 40], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const dot = spring({ frame: frame - 38, fps, config: { damping: 8, stiffness: 160 } });
  const out = interpolate(frame, [62, 75], [1, 0], clamp);
  const ringR = interpolate(frame, [38, 75], [0, 900], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: out }}>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={960}
            cy={540}
            r={Math.max(0, ringR - i * 140)}
            fill="none"
            stroke={C.cyan}
            strokeOpacity={interpolate(ringR - i * 140, [0, 900], [0.6, 0], clamp)}
            strokeWidth={2}
          />
        ))}
      </svg>
      <div style={{ transform: `scale(${interpolate(frame, [0, 75], [0.92, 1.04])})` }}>
        <Mark draw={draw} dot={dot} size={260} />
      </div>
    </AbsoluteFill>
  );
}

const WORDS = ["Marketplaces.", "Search.", "Paid media.", "Websites.", "AI agents."];
const PER = 30;

function SceneWords() {
  const frame = useCurrentFrame();
  const idx = Math.min(WORDS.length - 1, Math.floor(frame / PER));
  const bar = interpolate(frame % PER, [0, 14], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ padding: "0 160px", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: 120, left: 160 }}>
        <Mono>
          {String(idx + 1).padStart(2, "0")} / {String(WORDS.length).padStart(2, "0")} · Every channel
        </Mono>
      </div>
      {WORDS.map((w, i) => (
        <Sequence key={w} from={i * PER} durationInFrames={PER} layout="none">
          <div style={{ position: "absolute", left: 160, top: 400 }}>
            {/* exit fully before the next word starts rising — no overlap */}
            <KineticLine text={w} size={210} start={i === 0 ? 0 : 4} exitAt={i < WORDS.length - 1 ? PER - 9 : 999} />
          </div>
        </Sequence>
      ))}
      <div
        style={{
          position: "absolute",
          left: 160,
          top: 700,
          height: 6,
          width: 520 * bar,
          borderRadius: 6,
          background: `linear-gradient(90deg, ${C.blue}, ${C.cyan})`,
        }}
      />
    </AbsoluteFill>
  );
}

const NODES = ["Marketplaces", "Search", "Paid media", "Web & UX", "AI agents", "Automation"];

function SceneSystem() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cx = 1240;
  const cy = 560;
  const R = 330;
  const spin = interpolate(frame, [0, 105], [-0.12, 0.05]);
  const out = interpolate(frame, [92, 105], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 160, top: 360, width: 640 }}>
        <Mono>One system</Mono>
        <div style={{ height: 28 }} />
        <KineticLine text="Run as" size={120} start={4} />
        <KineticLine text="one system." size={120} start={12} />
      </div>
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <circle cx={cx} cy={cy} r={R} fill="none" stroke={C.ring} strokeWidth={1.5} strokeDasharray="4 10" />
        {NODES.map((_, i) => {
          const a = (i / NODES.length) * TAU + spin * TAU - Math.PI / 2;
          const x = cx + R * Math.cos(a);
          const y = cy + R * Math.sin(a);
          const d = interpolate(frame, [10 + i * 5, 34 + i * 5], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
          const p = ((frame - 30 - i * 7) % 40) / 40;
          const showPulse = frame > 30 + i * 7;
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={cx + (x - cx) * d} y2={cy + (y - cy) * d} stroke={C.blue} strokeOpacity={0.55} strokeWidth={2} />
              {showPulse && (
                <circle cx={x + (cx - x) * p} cy={y + (cy - y) * p} r={6} fill={C.cyan} opacity={1 - p * 0.6} />
              )}
            </g>
          );
        })}
      </svg>
      {NODES.map((n, i) => {
        const a = (i / NODES.length) * TAU + spin * TAU - Math.PI / 2;
        const s = spring({ frame: frame - 14 - i * 5, fps, config: { damping: 11, stiffness: 150 } });
        return (
          <div
            key={n}
            style={{
              position: "absolute",
              left: cx + R * Math.cos(a),
              top: cy + R * Math.sin(a),
              transform: `translate(-50%,-50%) scale(${s})`,
              padding: "14px 22px",
              borderRadius: 999,
              border: `1.5px solid ${i === 4 ? C.cyan : "#2A4774"}`,
              background: C.raised,
              color: i === 4 ? C.white : C.body,
              fontFamily: FONT.sans,
              fontWeight: 500,
              fontSize: 26,
              whiteSpace: "nowrap",
              boxShadow: i === 4 ? "0 0 40px rgba(0,200,255,0.45)" : "none",
            }}
          >
            {n}
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: cx - 90,
          top: cy - 90,
          width: 180,
          height: 180,
          borderRadius: 999,
          background: C.raised,
          border: `1.5px solid #2A4774`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${spring({ frame, fps, config: { damping: 12 } })})`,
        }}
      >
        <Mark size={110} />
      </div>
    </AbsoluteFill>
  );
}

function UICard({
  delay,
  x,
  y,
  rot,
  label,
  title,
  meta,
  accent = false,
}: {
  delay: number;
  x: number;
  y: number;
  rot: number;
  label: string;
  title: string;
  meta: string;
  accent?: boolean;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 110 } });
  const float = Math.sin((frame / 30) * 1.4 + delay) * 8;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + float,
        width: 560,
        padding: 32,
        borderRadius: 24,
        background: C.raised,
        border: `1.5px solid ${accent ? C.cyan : "#22406B"}`,
        boxShadow: accent ? "0 30px 80px rgba(0,200,255,0.25)" : "0 30px 80px rgba(0,0,0,0.45)",
        transform: `perspective(1400px) translateY(${(1 - s) * 260}px) rotateX(${(1 - s) * 35}deg) rotateZ(${rot * s}deg)`,
        opacity: s,
        fontFamily: FONT.sans,
      }}
    >
      <div style={{ fontFamily: FONT.mono, fontSize: 18, letterSpacing: "0.1em", color: C.subtle, textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 34, fontWeight: 500, color: C.white, letterSpacing: "-0.01em" }}>{title}</div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 99,
            background: accent ? C.cyan : C.blue,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M4.5 12.5l5 5 10-11" fill="none" stroke={accent ? C.midnight : C.white} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 22, color: C.body }}>{meta}</div>
    </div>
  );
}

function SceneUI() {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [80, 92], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ opacity: out }}>
      <div style={{ position: "absolute", left: 160, top: 400, width: 700 }}>
        <Mono>AI automation</Mono>
        <div style={{ height: 28 }} />
        <KineticLine text="AI that does" size={110} start={2} />
        <KineticLine text="the work." size={110} start={10} />
      </div>
      <UICard delay={6} x={1100} y={170} rot={-4} label="AI receptionist · 21:42" title="Appointment booked" meta="Fri 14:00 · confirmation sent" />
      <UICard delay={16} x={1220} y={420} rot={3} label="Sales engine" title="Lead qualified" meta="Meta lead ad · call booked" accent />
      <UICard delay={26} x={1060} y={670} rot={-2} label="Operations" title="Invoice processed" meta="Matched to PO · posted" />
    </AbsoluteFill>
  );
}

function SceneOutro() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const ringR = interpolate(frame, [0, 60], [200, 1100], { ...clamp, easing: Easing.out(Easing.cubic) });
  const logo = spring({ frame: frame - 26, fps, config: { damping: 14 } });
  const fadeOut = interpolate(frame, [durationInFrames - 12, durationInFrames], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: fadeOut }}>
      <svg width={1920} height={1080} style={{ position: "absolute" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={1920} cy={1080} r={Math.max(0, ringR - i * 170)} fill="none" stroke={C.ring} strokeWidth={2} />
        ))}
        <circle
          cx={1920 - ringR * Math.cos(1.0)}
          cy={1080 - ringR * Math.sin(1.0)}
          r={12}
          fill={C.blue}
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        <Mono>Digital growth &amp; AI automation</Mono>
        <KineticLine text="Growth, engineered." size={170} start={4} stagger={1.1} />
        <div style={{ opacity: logo, transform: `translateY(${(1 - logo) * 30}px)`, display: "flex", alignItems: "center", gap: 18 }}>
          <Mark size={64} />
          <span style={{ fontFamily: FONT.mono, fontSize: 24, letterSpacing: "0.1em", color: C.body }}>
            GHIA TECHNOLOGIES
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}

/* ---------------------------------------------------------------- timeline */

export const REEL_DURATION = 75 + WORDS.length * PER + 105 + 92 + 90;

export const Reel: React.FC = () => {
  const a = 75;
  const b = a + WORDS.length * PER;
  const c = b + 105;
  const d = c + 92;
  return (
    <AbsoluteFill style={{ background: C.deep }}>
      <Aurora />
      <Sequence durationInFrames={a}>
        <SceneMark />
      </Sequence>
      <Sequence from={a} durationInFrames={b - a}>
        <SceneWords />
      </Sequence>
      <Sequence from={b} durationInFrames={c - b}>
        <SceneSystem />
      </Sequence>
      <Sequence from={c} durationInFrames={d - c}>
        <SceneUI />
      </Sequence>
      <Sequence from={d} durationInFrames={90}>
        <SceneOutro />
      </Sequence>
    </AbsoluteFill>
  );
};
