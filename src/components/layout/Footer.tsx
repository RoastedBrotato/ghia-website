import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Icon, type IconName } from "@/components/brand/Icon";
import { Container, cx } from "@/components/ui/primitives";
import { footerLinks, navLinks } from "@/content/nav";
import { site } from "@/lib/site";

const socialIcon: Record<string, IconName> = {
  LinkedIn: "linkedin",
  Instagram: "instagram",
  X: "x",
  YouTube: "youtube",
  Facebook: "facebook",
};

/** Social profiles as round icon buttons. Shared by the footer and contact page. */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cx("flex flex-wrap gap-2", className)}>
      {site.socials.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            aria-label={s.label}
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-volt hover:text-volt-text"
            {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <Icon name={socialIcon[s.label] ?? "globe"} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  );
}

const linkCls = "text-[14px] text-ink-muted transition-colors hover:text-volt-text";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark border-t border-line">
      <Container className="pb-6 pt-10">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:border-r lg:border-line lg:pr-12">
            <Link href="/" aria-label="Ghia Technologies — home" className="inline-block text-ink">
              <Logo className="h-9 w-auto sm:h-11" />
            </Link>
            <p className="mt-4 text-[14px] text-ink-muted">
              Creative thinking. Technical precision. Measurable growth.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:flex-1 lg:px-12">
            <ul className="grid grid-cols-3 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
              {[...navLinks, ...footerLinks].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkCls}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={`mailto:${site.email}`} className={`${linkCls} mt-4 inline-block break-all`}>
              {site.email}
            </a>
          </nav>

          <SocialLinks />
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Ghia Technologies. All rights reserved.</p>
          <p className="flex items-center gap-3">
            <Link href="/privacy/" className="hover:text-ink">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link href="/terms/" className="hover:text-ink">
              Terms of Service
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
