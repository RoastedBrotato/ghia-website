import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/brand/Icon";
import { cx } from "@/components/ui/primitives";

/**
 * Product-UI mockups — "show the work" without claiming results.
 * Screens are framed flat in 20px-radius panels (brand imagery rule) and
 * always carry an "Illustrative" label. No performance figures.
 */
export function MockFrame({
  title,
  meta,
  children,
  className,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative rounded-lg border border-line bg-sunken p-2 sm:p-3",
        className,
      )}
    >
      <div className="overflow-hidden rounded-md border border-line bg-raised shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-line" />
              <span className="size-2 rounded-full bg-line" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-subtle">
              {title}
            </span>
          </div>
          {meta && (
            <span className="font-mono text-[11px] tracking-[0.04em] text-ink-subtle">{meta}</span>
          )}
        </div>
        <div className="p-4 sm:p-5">{children}</div>
      </div>
      <p className="mt-2.5 px-1 text-right font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
        Illustrative interface
      </p>
    </div>
  );
}

function Status({ children, tone = "ok" }: { children: ReactNode; tone?: "ok" | "wait" | "idle" }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.04em]",
        tone === "ok" && "text-success",
        tone === "wait" && "text-ink",
        tone === "idle" && "text-ink-subtle",
      )}
    >
      <span
        className={cx(
          "size-1.5 rounded-full",
          tone === "ok" && "bg-success",
          tone === "wait" && "bg-cyan",
          tone === "idle" && "bg-line-strong",
        )}
      />
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Receptionist */

function Bubble({ who, children }: { who: "caller" | "agent"; children: ReactNode }) {
  const agent = who === "agent";
  return (
    <div className={cx("flex flex-col gap-1", agent ? "items-start" : "items-end")}>
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-subtle">
        {agent ? "AI receptionist" : "Caller"}
      </span>
      <p
        className={cx(
          "max-w-[85%] rounded-md px-3.5 py-2.5 text-[13px] leading-5",
          agent ? "rounded-tl-xs border border-line bg-paper text-ink" : "rounded-tr-xs bg-btn text-white",
        )}
      >
        {children}
      </p>
    </div>
  );
}

export function ReceptionistMockup() {
  return (
    <MockFrame title="Call · after hours" meta="21:42">
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
          <Icon name="phone" className="size-4" /> Inbound call
        </span>
        <Status>Live</Status>
      </div>
      <div className="grid gap-3">
        <Bubble who="caller">Hi — do you have anything this week for a check-up?</Bubble>
        <Bubble who="agent">
          Hi, you&rsquo;re speaking with the clinic&rsquo;s AI assistant. I can book that. Thursday at
          10:30 or Friday at 14:00?
        </Bubble>
        <Bubble who="caller">Friday, please.</Bubble>
        <Bubble who="agent">Done — Friday at 14:00. I&rsquo;ve sent a confirmation by text.</Bubble>
      </div>
      <div className="mt-4 grid gap-2 border-t border-line pt-4">
        {[
          ["calendar", "Appointment booked", "Fri 14:00"],
          ["mail", "Confirmation sent", "SMS"],
          ["content", "Summary sent to front desk", "Email"],
        ].map(([icon, label, meta]) => (
          <div key={label} className="flex items-center justify-between gap-3 text-[13px]">
            <span className="inline-flex items-center gap-2 text-ink">
              <Icon name={icon as IconName} className="size-4 text-ink-muted" />
              {label}
            </span>
            <span className="inline-flex items-center gap-2 font-mono text-[11px] text-ink-subtle">
              {meta}
              <Icon name="check" className="size-4 text-success" />
            </span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

/* -------------------------------------------------------------------- Pipeline */

const pipeline: { col: string; leads: { name: string; source: string; note: string }[] }[] = [
  {
    col: "New",
    leads: [
      { name: "M. Rossi", source: "Website form", note: "Replied" },
      { name: "S. Chen", source: "WhatsApp", note: "Replied" },
    ],
  },
  {
    col: "Qualified",
    leads: [
      { name: "A. Okafor", source: "Meta lead ad", note: "Budget confirmed" },
      { name: "J. Patel", source: "Portal enquiry", note: "Area matched" },
    ],
  },
  {
    col: "Booked",
    leads: [{ name: "L. Martin", source: "Google Ads", note: "Call booked" }],
  },
];

export function PipelineMockup() {
  return (
    <MockFrame title="Lead pipeline" meta="Today">
      <div className="grid grid-cols-3 gap-2.5">
        {pipeline.map((c) => (
          <div key={c.col} className="min-w-0 rounded-sm bg-sunken p-2">
            <div className="mb-2 flex items-center justify-between px-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-muted">
                {c.col}
              </span>
              <span className="font-mono text-[10px] text-ink-muted">{c.leads.length}</span>
            </div>
            <div className="grid gap-2">
              {c.leads.map((l) => (
                <div
                  key={l.name}
                  className="rounded-xs border border-line bg-raised p-2.5 shadow-sm"
                >
                  <p className="truncate text-[12px] font-medium leading-4 text-ink">{l.name}</p>
                  <p className="mt-1 truncate text-[11px] leading-4 text-ink-muted">{l.source}</p>
                  <p className="mt-2 inline-flex max-w-full items-center gap-1 truncate font-mono text-[10px] text-ink-subtle">
                    <Icon name="check" className="size-3 shrink-0 text-success" />
                    <span className="truncate">{l.note}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        <Status>CRM synced</Status>
        <Status tone="wait">Follow-ups scheduled</Status>
        <Status tone="idle">Duplicates merged</Status>
      </div>
    </MockFrame>
  );
}

/* -------------------------------------------------------------------- Workflow */

const flow: { title: string; meta: string; state: "done" | "review" | "queued" }[] = [
  { title: "Invoice received", meta: "accounts@ inbox", state: "done" },
  { title: "Fields extracted", meta: "Supplier · amount · due date", state: "done" },
  { title: "Matched to purchase order", meta: "ERP lookup", state: "done" },
  { title: "Approval needed", meta: "Above limit → finance lead", state: "review" },
  { title: "Posted to accounting", meta: "After approval", state: "queued" },
];

export function WorkflowMockup() {
  return (
    <MockFrame title="Workflow · invoices" meta="Run 1 of today">
      <ol className="relative grid gap-0">
        {flow.map((s, i) => (
          <li key={s.title} className="relative flex gap-3.5 pb-4 last:pb-0">
            {i < flow.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-7 h-[calc(100%-20px)] w-px bg-line"
              />
            )}
            <span
              className={cx(
                "relative z-10 grid size-[27px] shrink-0 place-items-center rounded-full border",
                s.state === "done" && "border-line bg-paper text-success",
                s.state === "review" && "border-volt bg-volt text-white",
                s.state === "queued" && "border-dashed border-line-strong bg-raised text-ink-subtle",
              )}
            >
              {s.state === "done" && <Icon name="check" className="size-3.5" />}
              {s.state === "review" && <span className="size-1.5 rounded-full bg-paper" />}
              {s.state === "queued" && <span className="size-1 rounded-full bg-line-strong" />}
            </span>
            <div className="flex min-w-0 flex-1 items-start justify-between gap-3 pt-0.5">
              <div className="min-w-0">
                <p className="text-[13px] font-medium leading-5 text-ink">{s.title}</p>
                <p className="truncate text-[12px] leading-5 text-ink-muted">{s.meta}</p>
              </div>
              <Status tone={s.state === "done" ? "ok" : s.state === "review" ? "wait" : "idle"}>
                {s.state === "done" ? "Done" : s.state === "review" ? "Waiting" : "Queued"}
              </Status>
            </div>
          </li>
        ))}
      </ol>
    </MockFrame>
  );
}

/* --------------------------------------------------------- Marketplace overview */

const channels: { name: string; icon: IconName; bars: number[]; status: string }[] = [
  { name: "Amazon", icon: "storefront", bars: [40, 52, 48, 61, 58, 70, 76], status: "Synced" },
  { name: "Walmart", icon: "marketplace", bars: [22, 25, 31, 30, 38, 41, 47], status: "Synced" },
  { name: "Google Ads", icon: "search-ads", bars: [35, 33, 40, 44, 43, 50, 54], status: "Synced" },
  { name: "Meta Ads", icon: "paid-social", bars: [30, 36, 34, 42, 47, 45, 52], status: "Synced" },
  { name: "Shopify", icon: "web-dev", bars: [28, 30, 35, 33, 39, 44, 46], status: "Synced" },
];

export function ChannelMockup() {
  return (
    <MockFrame title="One P&L · all channels" meta="Last 7 weeks">
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-0 text-[13px]">
        <span className="t-label pb-2 !text-[10px]">Channel</span>
        <span className="t-label pb-2 !text-[10px]">Trend</span>
        <span className="t-label pb-2 text-right !text-[10px]">Data</span>
        {channels.map((c) => (
          <div key={c.name} className="contents">
            <span className="flex items-center gap-2.5 border-t border-line py-2.5 text-ink">
              <Icon name={c.icon} className="size-4 text-ink-muted" />
              {c.name}
            </span>
            <span className="flex h-full items-end gap-[3px] border-t border-line py-2.5" aria-hidden="true">
              {c.bars.map((b, i) => (
                <span
                  key={i}
                  className={cx("w-[5px] rounded-[1px]", i === c.bars.length - 1 ? "bg-cyan" : "bg-line-strong")}
                  style={{ height: `${Math.round(b / 4)}px` }}
                />
              ))}
            </span>
            <span className="flex justify-end border-t border-line py-2.5">
              <Status>{c.status}</Status>
            </span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

export const mockups = {
  receptionist: ReceptionistMockup,
  pipeline: PipelineMockup,
  workflow: WorkflowMockup,
  channels: ChannelMockup,
} as const;
