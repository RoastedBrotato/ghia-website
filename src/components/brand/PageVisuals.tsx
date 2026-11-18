import { useId, type ReactNode } from "react";
import { FOLD_PATH, MARK_COLORS, MARK_PATH } from "@/components/brand/Logo";
import { ICONS, type IconName } from "@/components/brand/Icon";
import type { Pillar } from "@/content/services";

/**
 * Inner-page illustrations: glass panels, the glowing G and rings of light,
 * drawn in SVG so they stay sharp and cost no image download. Each export is
 * a still scene — no animation.
 */

type Ctx = { id: string };

function useSvgId() {
  return useId().replace(/[^a-zA-Z0-9_-]/g, "");
}

function Defs({ id }: Ctx) {
  return (
    <defs>
      <filter id={`${id}-blur`} x="-30%" y="-60%" width="160%" height="220%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="22" />
      </filter>
      <radialGradient id={`${id}-halo`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#3d5cff" stopOpacity=".5" />
        <stop offset="1" stopColor="#3d5cff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#2a3a8f" stopOpacity=".75" />
        <stop offset="1" stopColor="#0b1233" stopOpacity=".85" />
      </linearGradient>
      <linearGradient id={`${id}-screen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#101a44" />
        <stop offset="1" stopColor="#04071a" />
      </linearGradient>
      <linearGradient id={`${id}-top`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#25307a" />
        <stop offset="1" stopColor="#0c1238" />
      </linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#7d93ff" />
        <stop offset="1" stopColor="#2b42e8" />
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
    </defs>
  );
}

function Halo({ id, cx, cy, rx, ry }: Ctx & { cx: number; cy: number; rx: number; ry: number }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-halo)`} />;
}

function Ring({ id, cx, cy, rx, ry, rot = 0, o = 1, w = 1.6 }: Ctx & { cx: number; cy: number; rx: number; ry: number; rot?: number; o?: number; w?: number }) {
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`} opacity={o}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#3d5cff" strokeWidth={w * 5} filter={`url(#${id}-blur)`} />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="#a8bbff" strokeWidth={w} />
    </g>
  );
}

/** The G, centred on (x, y); `size` is its width in px. */
function G({ id, x, y, size, glow = true }: Ctx & { x: number; y: number; size: number; glow?: boolean }) {
  const s = size / 974;
  return (
    <g>
      {glow && <circle cx={x} cy={y} r={size * 0.55} fill="#2b4dff" opacity=".45" filter={`url(#${id}-glow)`} />}
      <g transform={`translate(${x} ${y}) scale(${s}) translate(-613 -625)`}>
        <path d={MARK_PATH} fill={`url(#${id}-g)`} />
        <path d={FOLD_PATH} fill={`url(#${id}-f)`} />
      </g>
    </g>
  );
}

/** A round glowing platform; the top face is centred on (cx, cy). */
function Pedestal({ id, cx, cy, rx, depth = 22 }: Ctx & { cx: number; cy: number; rx: number; depth?: number }) {
  const ry = rx * 0.22;
  return (
    <g>
      <ellipse cx={cx} cy={cy + depth + 6} rx={rx * 1.15} ry={ry * 1.3} fill="#3d5cff" opacity=".4" filter={`url(#${id}-glow)`} />
      <path
        d={`M${cx - rx},${cy} L${cx - rx},${cy + depth} A${rx},${ry} 0 0 0 ${cx + rx},${cy + depth} L${cx + rx},${cy} Z`}
        fill="#0a1030"
        stroke="#5c74ff"
        strokeOpacity=".6"
      />
      <ellipse cx={cx} cy={cy + depth} rx={rx} ry={ry} fill="none" stroke="#8ea0ff" strokeWidth="2" opacity=".9" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={`url(#${id}-top)`} stroke="#9fb2ff" strokeWidth="1.5" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.78} ry={ry * 0.78} fill="none" stroke="#526dff" strokeOpacity=".7" />
    </g>
  );
}

/** Rounded glass tile with a line icon from the kit. */
function Tile({ id, x, y, size, icon, r = 14 }: Ctx & { x: number; y: number; size: number; icon: IconName; r?: number }) {
  const pad = size * 0.24;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={r} fill="#3d5cff" opacity=".35" filter={`url(#${id}-blur)`} />
      <rect x={x} y={y} width={size} height={size} rx={r} fill={`url(#${id}-glass)`} stroke="#8ea0ff" strokeOpacity=".8" strokeWidth="1.5" />
      <svg x={x + pad} y={y + pad} width={size - pad * 2} height={size - pad * 2} viewBox="0 0 24 24">
        <path d={ICONS[icon].d} fill="none" stroke="#b4c3ff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </g>
  );
}

/** A glass screen with optional children drawn inside. */
function Screen({ id, x, y, w, h, children, r = 16 }: Ctx & { x: number; y: number; w: number; h: number; children?: ReactNode; r?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={r} fill="#3d5cff" opacity=".35" filter={`url(#${id}-blur)`} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill={`url(#${id}-screen)`} stroke="#8ea0ff" strokeOpacity=".85" strokeWidth="2" />
      {children}
    </g>
  );
}

/** Rising bars, bottom-left corner at (x, y). */
function Bars({ id, x, y, heights, w = 18, gap = 10 }: Ctx & { x: number; y: number; heights: number[]; w?: number; gap?: number }) {
  return (
    <g>
      {heights.map((h, i) => (
        <rect key={i} x={x + i * (w + gap)} y={y - h} width={w} height={h} rx="3" fill={`url(#${id}-bar)`} />
      ))}
    </g>
  );
}

function Frame({ className, viewBox = "0 0 600 440", children }: { className?: string; viewBox?: string; children: ReactNode }) {
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

/* ---------- Page heroes ---------- */

export function ServicesVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Halo id={id} cx={310} cy={210} rx={290} ry={200} />
      <Ring id={id} cx={300} cy={330} rx={270} ry={60} rot={-6} o={0.7} />
      <Pedestal id={id} cx={300} cy={340} rx={190} />
      <Screen id={id} x={185} y={90} w={230} h={210}>
        <G id={id} x={300} y={195} size={110} />
      </Screen>
      <Tile id={id} x={95} y={70} size={74} icon="play" />
      <Tile id={id} x={70} y={210} size={84} icon="cart" />
      <Tile id={id} x={445} y={60} size={80} icon="analytics" />
      <Tile id={id} x={460} y={200} size={76} icon="web-dev" />
      <Ring id={id} cx={300} cy={220} rx={290} ry={70} rot={-14} o={0.45} w={1} />
    </Frame>
  );
}

export function AiVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Halo id={id} cx={300} cy={200} rx={290} ry={210} />
      <Ring id={id} cx={300} cy={200} rx={280} ry={90} rot={-18} o={0.55} w={1.2} />
      <Pedestal id={id} cx={300} cy={330} rx={210} depth={18} />
      <Pedestal id={id} cx={300} cy={305} rx={160} depth={16} />
      {/* chip pins */}
      <g stroke="#8ea0ff" strokeWidth="3" strokeLinecap="round" opacity=".85">
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <path d={`M${222 + i * 39},86 v-22`} />
            <path d={`M${222 + i * 39},274 v22`} />
            <path d={`M192,${118 + i * 32} h-22`} />
            <path d={`M408,${118 + i * 32} h22`} />
          </g>
        ))}
      </g>
      <Screen id={id} x={192} y={86} w={216} h={188} r={22}>
        <rect x={212} y={106} width={176} height={148} rx={14} fill="none" stroke="#526dff" strokeOpacity=".6" />
        <circle cx={300} cy={180} r={70} fill="#2b4dff" opacity=".4" filter={`url(#${id}-glow)`} />
        <text
          x="300"
          y="208"
          textAnchor="middle"
          fontSize="88"
          fontWeight="600"
          fill="#b4c3ff"
          style={{ fontFamily: "var(--font-sans), sans-serif", letterSpacing: "-0.02em" }}
        >
          AI
        </text>
      </Screen>
      <Tile id={id} x={70} y={120} size={64} icon="agent" />
      <Tile id={id} x={470} y={110} size={64} icon="workflow" />
      <Ring id={id} cx={300} cy={200} rx={250} ry={60} rot={10} o={0.35} w={1} />
    </Frame>
  );
}

export function WorkVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Halo id={id} cx={310} cy={210} rx={290} ry={200} />
      <Ring id={id} cx={300} cy={360} rx={280} ry={46} rot={-4} o={0.6} />
      <Screen id={id} x={40} y={120} w={190} h={140}>
        <circle cx={135} cy={180} r={34} fill="none" stroke="#8ea0ff" strokeOpacity=".7" />
        <path d="M60,240 l40,-36 30,24 50,-46 40,38" fill="none" stroke="#8ea0ff" strokeWidth="2" />
      </Screen>
      <Screen id={id} x={380} y={110} w={180} h={150}>
        <Bars id={id} x={405} y={240} heights={[30, 52, 44, 76, 100]} w={18} gap={12} />
      </Screen>
      <Screen id={id} x={185} y={60} w={230} h={190}>
        <G id={id} x={300} y={155} size={100} />
      </Screen>
      <Screen id={id} x={230} y={240} w={220} h={120} r={14}>
        <rect x={250} y={262} width={88} height={76} rx={8} fill="#1a2770" />
        <path d="M262,320 q20,-36 64,-28" fill="none" stroke="#b4c3ff" strokeWidth="3" strokeLinecap="round" />
        <rect x={352} y={266} width={80} height={8} rx={4} fill="#526dff" />
        <rect x={352} y={284} width={60} height={6} rx={3} fill="#2d3a7a" />
        <rect x={352} y={298} width={70} height={6} rx={3} fill="#2d3a7a" />
        <rect x={352} y={318} width={44} height={16} rx={8} fill="#4762f7" />
      </Screen>
      <Screen id={id} x={470} y={250} w={70} h={120} r={14}>
        <rect x={482} y={266} width={46} height={50} rx={6} fill="#1a2770" />
        <rect x={482} y={326} width={46} height={6} rx={3} fill="#526dff" />
        <rect x={482} y={340} width={30} height={6} rx={3} fill="#2d3a7a" />
      </Screen>
    </Frame>
  );
}

export function ContactVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Halo id={id} cx={300} cy={220} rx={300} ry={200} />
      <Ring id={id} cx={300} cy={230} rx={290} ry={80} rot={-12} o={0.6} />
      <g transform="rotate(-6 300 220)">
        <rect x={140} y={110} width={320} height={220} rx={22} fill="#3d5cff" opacity=".4" filter={`url(#${id}-blur)`} />
        <rect x={140} y={110} width={320} height={220} rx={22} fill={`url(#${id}-glass)`} stroke="#a8bbff" strokeWidth="2" />
        <path d="M152,124 L300,236 L448,124" fill="none" stroke="#a8bbff" strokeWidth="2" strokeLinejoin="round" />
        <path d="M152,318 L262,214 M448,318 L338,214" fill="none" stroke="#8ea0ff" strokeOpacity=".55" strokeWidth="1.5" />
        <G id={id} x={300} y={224} size={92} />
      </g>
      <Ring id={id} cx={300} cy={230} rx={250} ry={56} rot={8} o={0.4} w={1} />
    </Frame>
  );
}

export function AboutVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className}>
      <Defs id={id} />
      <Halo id={id} cx={300} cy={200} rx={290} ry={210} />
      <Ring id={id} cx={300} cy={190} rx={280} ry={96} rot={-16} o={0.6} />
      <Pedestal id={id} cx={300} cy={340} rx={200} depth={24} />
      <G id={id} x={300} y={200} size={230} />
      <Ring id={id} cx={300} cy={330} rx={250} ry={50} rot={-3} o={0.5} w={1} />
    </Frame>
  );
}

/** About → our story: the four divisions around the G. */
export function DisciplinesVisual({ className }: { className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className} viewBox="0 0 600 360">
      <Defs id={id} />
      <Halo id={id} cx={300} cy={180} rx={280} ry={170} />
      <Ring id={id} cx={300} cy={180} rx={250} ry={90} rot={-8} o={0.5} w={1.2} />
      <Tile id={id} x={110} y={50} size={96} icon="film" r={20} />
      <Tile id={id} x={394} y={50} size={96} icon="growth" r={20} />
      <Tile id={id} x={110} y={214} size={96} icon="cart" r={20} />
      <Tile id={id} x={394} y={214} size={96} icon="web-dev" r={20} />
      <G id={id} x={300} y={180} size={130} />
    </Frame>
  );
}

/* ---------- Services: one scene per division ---------- */

export function DivisionVisual({ pillar, className }: { pillar: Pillar; className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className} viewBox="0 0 600 380">
      <Defs id={id} />
      <Halo id={id} cx={300} cy={190} rx={290} ry={180} />
      {pillar === "creative" && (
        <>
          <Ring id={id} cx={300} cy={300} rx={260} ry={46} o={0.6} />
          <Pedestal id={id} cx={300} cy={300} rx={170} depth={18} />
          <Screen id={id} x={170} y={80} w={260} h={190}>
            <circle cx={300} cy={175} r={52} fill="none" stroke="#8ea0ff" strokeWidth="2" />
            <path d="M286,150 v50 l40,-25 Z" fill="#b4c3ff" />
            <rect x={190} y={244} width={220} height={4} rx={2} fill="#2d3a7a" />
            <rect x={190} y={244} width={120} height={4} rx={2} fill="#526dff" />
          </Screen>
          <Tile id={id} x={60} y={60} size={80} icon="film" />
          <Tile id={id} x={70} y={200} size={70} icon="cube" />
          <Tile id={id} x={460} y={70} size={76} icon="brand" />
          <Tile id={id} x={470} y={205} size={66} icon="ux-design" />
        </>
      )}
      {pillar === "growth" && (
        <>
          <Ring id={id} cx={300} cy={300} rx={260} ry={46} o={0.6} />
          <Screen id={id} x={110} y={60} w={300} h={230}>
            <Bars id={id} x={140} y={262} heights={[44, 70, 60, 104, 128, 170]} w={28} gap={14} />
            <path d="M140,190 L200,160 L250,176 L330,110 L380,84" fill="none" stroke="#c9d4ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M362,78 L384,82 L378,104" fill="none" stroke="#c9d4ff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </Screen>
          <Tile id={id} x={440} y={60} size={86} icon="target" />
          <Tile id={id} x={450} y={200} size={72} icon="paid-social" />
          <Tile id={id} x={40} y={210} size={64} icon="seo" />
        </>
      )}
      {pillar === "commerce" && (
        <>
          <Ring id={id} cx={300} cy={300} rx={260} ry={46} o={0.6} />
          <Pedestal id={id} cx={260} cy={290} rx={190} depth={20} />
          <g transform="translate(150 70) scale(9)">
            <path d={ICONS.cart.d} fill="none" stroke="#3d5cff" strokeWidth="1.2" filter={`url(#${id}-blur)`} opacity=".6" />
            <path d={ICONS.cart.d} fill="none" stroke="#c9d4ff" strokeWidth=".55" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <Tile id={id} x={440} y={60} size={84} icon="storefront" />
          <Tile id={id} x={470} y={190} size={70} icon="marketplace" />
          <Tile id={id} x={50} y={60} size={66} icon="shield" />
        </>
      )}
      {pillar === "digital" && (
        <>
          <Ring id={id} cx={300} cy={300} rx={270} ry={50} rot={-4} o={0.6} />
          {/* laptop */}
          <Screen id={id} x={120} y={60} w={300} h={196} r={14}>
            <G id={id} x={270} y={158} size={90} />
          </Screen>
          <path d="M96,268 L444,268 L470,296 Q472,302 464,302 L76,302 Q68,302 70,296 Z" fill="#5a66a8" stroke="#a8bbff" strokeOpacity=".6" />
          <rect x={232} y={276} width={76} height={10} rx={5} fill="#2d3a7a" />
          {/* phone */}
          <Screen id={id} x={460} y={110} w={96} h={180} r={18}>
            <G id={id} x={508} y={200} size={46} glow={false} />
          </Screen>
          <Tile id={id} x={470} y={20} size={64} icon="cloud" />
        </>
      )}
    </Frame>
  );
}

/* ---------- Work: card thumbnails ---------- */

export type ThumbKind = "film" | "campaign" | "store" | "platform" | "product" | "social" | "identity" | "search" | "agent";

export function WorkThumb({ kind, className }: { kind: ThumbKind; className?: string }) {
  const id = useSvgId();
  return (
    <Frame className={className} viewBox="0 0 400 240">
      <Defs id={id} />
      <rect width="400" height="240" fill="#0b1233" />
      <g stroke="#dce5f2" strokeOpacity=".05">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`v${i}`} d={`M${i * 48},0 V240`} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <path key={`h${i}`} d={`M0,${i * 48} H400`} />
        ))}
      </g>
      <Halo id={id} cx={260} cy={110} rx={220} ry={150} />
      {kind === "film" && (
        <>
          <Tile id={id} x={150} y={50} size={110} icon="film" r={20} />
          <Ring id={id} cx={205} cy={170} rx={170} ry={30} o={0.6} />
        </>
      )}
      {kind === "campaign" && (
        <Screen id={id} x={90} y={40} w={220} h={150}>
          <Bars id={id} x={115} y={170} heights={[24, 40, 34, 62, 86]} w={22} gap={14} />
          <path d="M115,120 L165,100 L215,108 L270,62" fill="none" stroke="#c9d4ff" strokeWidth="3" strokeLinecap="round" />
        </Screen>
      )}
      {kind === "store" && (
        <>
          <Screen id={id} x={110} y={36} w={100} h={168} r={16}>
            <rect x={122} y={52} width={76} height={70} rx={8} fill="#1a2770" />
            <rect x={122} y={134} width={60} height={7} rx={3} fill="#526dff" />
            <rect x={122} y={148} width={44} height={6} rx={3} fill="#2d3a7a" />
            <rect x={122} y={176} width={50} height={16} rx={8} fill="#4762f7" />
          </Screen>
          <Tile id={id} x={232} y={70} size={90} icon="cart" r={18} />
        </>
      )}
      {kind === "platform" && (
        <Screen id={id} x={60} y={36} w={280} h={168}>
          <rect x={76} y={52} width={60} height={136} rx={8} fill="#141f5a" />
          <Bars id={id} x={156} y={176} heights={[40, 64, 52, 88]} w={20} gap={10} />
          <rect x={276} y={56} width={48} height={48} rx={24} fill="none" stroke="#8ea0ff" strokeWidth="6" />
          <rect x={276} y={124} width={48} height={8} rx={4} fill="#526dff" />
          <rect x={276} y={142} width={36} height={6} rx={3} fill="#2d3a7a" />
        </Screen>
      )}
      {kind === "product" && (
        <>
          <Tile id={id} x={110} y={60} size={130} icon="cube" r={22} />
          <rect x={256} y={92} width={56} height={110} rx={14} fill={`url(#${id}-glass)`} stroke="#8ea0ff" strokeOpacity=".8" />
          <G id={id} x={284} y={150} size={30} glow={false} />
        </>
      )}
      {kind === "social" && (
        <>
          <Screen id={id} x={90} y={40} w={96} h={170} r={16}>
            <rect x={102} y={56} width={72} height={90} rx={8} fill="#1a2770" />
            <circle cx={138} cy={101} r={18} fill="none" stroke="#8ea0ff" strokeWidth="3" />
          </Screen>
          <Screen id={id} x={206} y={60} w={96} h={150} r={16}>
            <rect x={218} y={76} width={72} height={72} rx={8} fill="#1a2770" />
            <path d="M246,100 v26 l20,-13 Z" fill="#b4c3ff" />
          </Screen>
          <Tile id={id} x={316} y={44} size={58} icon="paid-social" />
        </>
      )}
      {kind === "identity" && (
        <>
          <G id={id} x={200} y={112} size={120} />
          <g opacity=".9">
            {["#111827", "#526dff", "#dce5f2", "#f8fafc"].map((c, i) => (
              <circle key={c} cx={140 + i * 40} cy={206} r={12} fill={c} stroke="#8ea0ff" strokeOpacity=".6" />
            ))}
          </g>
        </>
      )}
      {kind === "search" && (
        <Screen id={id} x={70} y={44} w={260} h={152}>
          <rect x={90} y={64} width={220} height={28} rx={14} fill="#141f5a" stroke="#526dff" />
          <svg x={98} y={68} width={20} height={20} viewBox="0 0 24 24">
            <path d={ICONS.seo.d} fill="none" stroke="#b4c3ff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {[108, 136, 164].map((y, i) => (
            <g key={y}>
              <rect x={90} y={y} width={i === 0 ? 150 : 120} height={8} rx={4} fill={i === 0 ? "#526dff" : "#2d3a7a"} />
              <rect x={90} y={y + 14} width={190} height={5} rx={2.5} fill="#1f2a60" />
            </g>
          ))}
        </Screen>
      )}
      {kind === "agent" && (
        <>
          <Screen id={id} x={140} y={30} w={110} h={186} r={18}>
            <rect x={154} y={56} width={70} height={22} rx={11} fill="#1a2770" />
            <rect x={168} y={88} width={70} height={22} rx={11} fill="#4762f7" />
            <rect x={154} y={120} width={60} height={22} rx={11} fill="#1a2770" />
            <rect x={168} y={152} width={70} height={22} rx={11} fill="#4762f7" />
          </Screen>
          <Tile id={id} x={268} y={70} size={80} icon="agent" />
        </>
      )}
    </Frame>
  );
}
