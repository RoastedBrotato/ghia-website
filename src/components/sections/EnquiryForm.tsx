"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, services, servicesByPillar } from "@/content/services";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-[14px] border border-line-strong bg-field px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-subtle transition-[border-color,background-color] duration-200 focus:border-volt focus:outline-none";

/**
 * Project enquiry form. Posts to the Worker at /api/enquiry, which emails it
 * to the team. If sending isn't available (no Worker in `next dev`, or the
 * email domain isn't onboarded yet) the visitor gets a pre-filled email link
 * instead, so no lead is lost.
 */
export function EnquiryForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorField, setErrorField] = useState<string | null>(null);
  const [service, setService] = useState("");
  const [mailto, setMailto] = useState(`mailto:${site.email}`);
  const started = useRef(0);

  useEffect(() => {
    started.current = Date.now();
    // Service pages link here with ?service=<slug> to pre-select it.
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (match) {
      const raf = requestAnimationFrame(() => setService(match.name));
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setErrorField(null);
    setStatus("sending");

    const body = [
      data.message,
      "",
      `Name: ${data.name}`,
      data.company && `Company: ${data.company}`,
      data.phone && `Phone: ${data.phone}`,
      data.service && `Service: ${data.service}`,
    ]
      .filter(Boolean)
      .join("\n");
    setMailto(
      `mailto:${site.email}?subject=${encodeURIComponent(`Project enquiry${data.service ? ` — ${data.service}` : ""}`)}&body=${encodeURIComponent(body)}`,
    );

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data, elapsed: Date.now() - started.current }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; field?: string };
      if (res.ok && out.ok) {
        setStatus("sent");
        form.reset();
        return;
      }
      if (res.status === 400 && out.field) {
        setErrorField(out.field);
        setStatus("idle");
        form.querySelector<HTMLElement>(`[name="${out.field}"]`)?.focus();
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className={cx("glass flex flex-col items-start rounded-[26px] p-8 sm:p-10", className)} role="status">
        <span className="grid size-14 place-items-center rounded-full border border-cyan/40 text-cyan">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="t-h2 mt-6 text-ink">Thanks — we&rsquo;ve got it.</h3>
        <p className="t-body mt-3 max-w-[28rem]">
          Your message is with the team. We&rsquo;ll reply to the email you gave us with next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-[14px] text-volt-text underline underline-offset-4 hover:text-cyan"
        >
          Send another message
        </button>
      </div>
    );
  }

  const invalid = (name: string) => errorField === name;

  return (
    <form
      onSubmit={onSubmit}
      className={cx("glass grid gap-3 rounded-[20px] p-4 sm:rounded-[26px] sm:p-8", className)}
      aria-label="Project enquiry"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="sr-only">Name</span>
          <input
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Name *"
            aria-invalid={invalid("name") || undefined}
            className={cx(field, invalid("name") && "border-danger")}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="sr-only">Email</span>
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="Email *"
            aria-invalid={invalid("email") || undefined}
            className={cx(field, invalid("email") && "border-danger")}
          />
        </label>
        <label className="grid gap-1.5">
          <span className="sr-only">Company</span>
          <input name="company" maxLength={160} autoComplete="organization" placeholder="Company" className={field} />
        </label>
        <label className="grid gap-1.5">
          <span className="sr-only">Phone</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" placeholder="Phone" className={field} />
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="sr-only">Service</span>
        <select
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          className={cx(field, "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888d9b' stroke-width='1.75' stroke-linecap='round'%3E%3Cpath d='M7 10l5 5 5-5'/%3E%3C/svg%3E\")] bg-[length:18px] bg-[right_16px_center] bg-no-repeat pr-11", !service && "text-ink-subtle")}
        >
          <option value="">What do you need help with?</option>
          {pillarOrder.map((p) => (
            <optgroup key={p} label={pillars[p].name}>
              {servicesByPillar(p).map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>

      <label className="grid gap-1.5">
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
          placeholder="Tell us about the project and what you want to achieve *"
          aria-invalid={invalid("message") || undefined}
          className={cx(field, "resize-y", invalid("message") && "border-danger")}
        />
      </label>

      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-[14px] border border-warning/40 bg-warning/10 px-4 py-3 text-[14px] leading-6 text-ink">
          We couldn&rsquo;t send that just now.{" "}
          <a href={mailto} className="font-medium text-cyan underline underline-offset-4">
            Email it to us instead
          </a>{" "}
          — your message is already filled in.
        </p>
      )}

      <div className="mt-2 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] leading-5 text-ink-subtle">
          Or email{" "}
          <a href={`mailto:${site.email}`} className="text-ink-muted underline underline-offset-4 hover:text-cyan">
            {site.email}
          </a>
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex h-[52px] items-center justify-center gap-2 btn-cta rounded-full border px-7 text-[16px] transition-[transform,box-shadow,border-color,filter] duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <Icon
            name="arrow-right"
            className={cx(
              "size-[18px] transition-transform duration-200 group-hover/btn:translate-x-0.5",
              status === "sending" && "animate-pulse",
            )}
          />
        </button>
      </div>
    </form>
  );
}
