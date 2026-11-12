import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/primitives";
import { navLinks } from "@/content/nav";
import { site } from "@/lib/site";

const quickLinks = [
  ...navLinks.filter((l) => l.href !== "/contact/"),
  { label: "Approach", href: "/approach/" },
  { label: "Playbooks", href: "/playbooks/" },
  { label: "Contact", href: "/contact/" },
];

const linkCls = "block py-1 text-[15px] text-ink-muted transition-colors hover:text-volt-text";

function ColTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 font-display text-[20px] font-light tracking-[-0.01em] text-ink">{children}</h2>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark border-t border-line">
      <Container className="pb-8 pt-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" aria-label="Ghia Technologies — home" className="inline-block text-ink">
              <Logo className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-[18rem] text-[15px] leading-6 text-ink-muted">
              Creative, growth and AI studio — brands, websites, campaigns and the systems that turn
              attention into customers.
            </p>
          </div>

          <div>
            <ColTitle>Quick links</ColTitle>
            <ul>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColTitle>Contact</ColTitle>
            <a href={`mailto:${site.email}`} className={`${linkCls} break-all`}>
              {site.email}
            </a>
            <Link href="/contact/" className={linkCls}>
              Send a project enquiry
            </Link>
          </div>

          <div>
            <ColTitle>Follow</ColTitle>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className={linkCls}
                    {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/privacy/" className={linkCls}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms/" className={linkCls}>
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-12 border-t border-line pt-6 text-center text-[13px] text-ink-subtle">
          &copy; {year} Ghia Technologies. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
