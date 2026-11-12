/**
 * Ghia website Worker.
 *
 * Serves the static export from ./out and handles one API route:
 *   POST /api/enquiry  → validates the form and emails it to ENQUIRY_TO
 *
 * Email goes out through Cloudflare Email Service (the EMAIL binding). The
 * sending domain (ENQUIRY_FROM) must be onboarded to Email Sending on the
 * account that deploys this; until then sends fail and the endpoint answers
 * 503 so the form can offer its mailto fallback instead.
 */

const LIMITS = {
  name: 120,
  email: 200,
  company: 160,
  phone: 40,
  service: 120,
  message: 5000,
} as const;

type Field = keyof typeof LIMITS;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body: unknown, status = 200, headers: HeadersInit = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...headers },
  });

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Single-line fields lose control characters so they can't break the subject line. */
const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

async function handleEnquiry(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);

  // Same-origin only: the form lives on this site.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== url.host) return json({ ok: false, error: "forbidden" }, 403);

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) return json({ ok: false, error: "too_large" }, 413);

  let data: Record<string, unknown>;
  try {
    data = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: "invalid" }, 400);
  }

  // Spam traps: a hidden field humans never fill, and a minimum fill time.
  // Bots get a normal-looking success so they don't learn anything.
  const trap = typeof data.website === "string" && data.website.trim() !== "";
  const elapsed = Number(data.elapsed ?? 0);
  if (trap || !Number.isFinite(elapsed) || elapsed < 2500) return json({ ok: true });

  const f = {} as Record<Field, string>;
  for (const key of Object.keys(LIMITS) as Field[]) {
    const raw = typeof data[key] === "string" ? (data[key] as string) : "";
    const v = key === "message" ? raw.trim() : oneLine(raw);
    if (v.length > LIMITS[key]) return json({ ok: false, error: "invalid", field: key }, 400);
    f[key] = v;
  }
  if (!f.name) return json({ ok: false, error: "invalid", field: "name" }, 400);
  if (!EMAIL_RE.test(f.email)) return json({ ok: false, error: "invalid", field: "email" }, 400);
  if (f.message.length < 10) return json({ ok: false, error: "invalid", field: "message" }, 400);

  if (!env.EMAIL || !env.ENQUIRY_TO || !env.ENQUIRY_FROM) {
    return json({ ok: false, error: "unavailable" }, 503);
  }

  const rows: [string, string][] = [
    ["Name", f.name],
    ["Email", f.email],
    ["Company", f.company],
    ["Phone", f.phone],
    ["Service", f.service],
  ].filter(([, v]) => v) as [string, string][];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", f.message, "", `— Sent from ${url.host}`].join("\n");
  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#0b1a33;line-height:1.5">
<h2 style="margin:0 0 16px">New enquiry from ${escapeHtml(f.name)}</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#5b6b86;padding-right:16px">${k}</td><td>${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>
<p style="white-space:pre-wrap;margin-top:20px;padding:16px;background:#f2f6fc;border-radius:8px">${escapeHtml(f.message)}</p>
<p style="color:#5b6b86;font-size:12px">Sent from ${escapeHtml(url.host)}. Reply to this email to answer ${escapeHtml(f.name)} directly.</p>
</body></html>`;

  try {
    await env.EMAIL.send({
      to: env.ENQUIRY_TO,
      from: { email: env.ENQUIRY_FROM, name: "Ghia website" },
      replyTo: { email: f.email, name: f.name },
      subject: `New enquiry: ${f.name}${f.service ? ` — ${f.service}` : ""}`,
      text,
      html,
    });
  } catch (e) {
    const code = (e as { code?: string }).code ?? "unknown";
    console.error("enquiry send failed", code, (e as Error).message);
    return json({ ok: false, error: code === "E_RATE_LIMIT_EXCEEDED" ? "busy" : "unavailable" }, 503);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/enquiry" || pathname === "/api/enquiry/") {
      if (request.method !== "POST") return json({ ok: false, error: "method" }, 405, { allow: "POST" });
      return handleEnquiry(request, env);
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
