"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/brand/Icon";
import { SignalRings } from "@/components/brand/SignalRings";
import { Button, Container, cx } from "@/components/ui/primitives";
import { pillarOrder, pillars, services, servicesByPillar, type Pillar } from "@/content/services";
import { industries } from "@/content/industries";
import { site } from "@/lib/site";
import { getLenis } from "@/lib/scroll";

type MenuKey = "services" | "industries";

const links: { label: string; href: string; menu?: MenuKey }[] = [
  { label: "Services", href: "/services/", menu: "services" },
  { label: "Solutions", href: "/solutions/" },
  { label: "Industries", href: "/industries/", menu: "industries" },
  { label: "Approach", href: "/approach/" },
  { label: "Playbooks", href: "/playbooks/" },
  { label: "About", href: "/about/" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // After a link inside a menu is clicked, ignore hover until the pointer leaves the header.
  const suppressHover = useRef(false);

  const close = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setOpen(null);
    setMobileOpen(false);
  }, []);

  const closeOnLinkClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      suppressHover.current = true;
      close();
    }
  };

  // Close menus on navigation (adjust state during render, not in an effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape + click outside.
  useEffect(() => {
    if (!open && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const key = open;
        close();
        if (key) headerRef.current?.querySelector<HTMLButtonElement>(`[data-menu="${key}"]`)?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, mobileOpen, close]);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    const lenis = getLenis();
    if (mobileOpen) lenis?.stop();
    else lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [mobileOpen]);

  const hoverOpen = (key: MenuKey | null) => {
    if (key && suppressHover.current) return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setOpen(key), key ? 60 : 160);
  };

  const isActive = (href: string) => {
    const h = href.replace(/\/$/, "");
    const p = pathname.replace(/\/$/, "");
    return p === h || p.startsWith(h + "/");
  };

  return (
    <header
      ref={headerRef}
      className={cx(
        "sticky top-0 z-50 backdrop-blur-xl transition-[background-color,border-color] duration-300",
        scrolled || open || mobileOpen
          ? "border-b border-white/10 bg-[rgba(7,21,45,0.78)]"
          : "border-b border-transparent bg-[rgba(7,21,45,0.5)]",
      )}
      onMouseLeave={() => {
        suppressHover.current = false;
        hoverOpen(null);
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="scroll-progress pointer-events-none absolute inset-x-0 bottom-[-1px] h-px bg-gradient-to-r from-volt to-cyan" />
      <Container wide className="flex h-[var(--nav-height)] items-center gap-8">
        <Link href="/" aria-label="Ghia Technologies — home" className="shrink-0 text-ink">
          <Logo className="h-7 w-auto" />
        </Link>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href} onMouseEnter={() => hoverOpen(l.menu ?? null)}>
                {l.menu ? (
                  <button
                    type="button"
                    data-menu={l.menu}
                    aria-expanded={open === l.menu}
                    aria-controls={`menu-${l.menu}`}
                    onClick={() => setOpen((o) => (o === l.menu ? null : l.menu!))}
                    className={cx(
                      "inline-flex h-10 items-center gap-1 rounded-sm px-3 text-[15px] transition-colors hover:text-ink",
                      open === l.menu || isActive(l.href) ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {l.label}
                    <Icon
                      name="chevron"
                      className={cx(
                        "size-4 transition-transform duration-200",
                        open === l.menu && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cx(
                      "inline-flex h-10 items-center rounded-sm px-3 text-[15px] transition-colors hover:text-ink",
                      isActive(l.href) ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button href={site.bookingUrl} size="sm">
            Book a call
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-sm text-ink lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </Container>

      {/* Desktop mega menus */}
      {open && (
        <div
          key={open}
          id={`menu-${open}`}
          className="menu-enter absolute inset-x-0 top-full hidden border-b border-line bg-raised shadow-lg lg:block"
          onMouseEnter={() => hoverOpen(open)}
          onClick={closeOnLinkClick}
        >
          <Container wide className="py-10">
            {open === "services" ? <ServicesMenu /> : <IndustriesMenu />}
          </Container>
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="menu-enter fixed inset-x-0 bottom-0 top-[var(--nav-height)] z-40 overflow-y-auto bg-paper lg:hidden"
          onClick={closeOnLinkClick}
        >
          <MobileMenu isActive={isActive} />
        </div>
      )}
    </header>
  );
}

function MenuServiceList({ pillar }: { pillar: Pillar }) {
  return (
    <div>
      <p className="t-label mb-4">{pillars[pillar].name}</p>
      <ul className="grid gap-0.5">
        {servicesByPillar(pillar).map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}/`}
              className="group flex items-center gap-3 rounded-[12px] p-2 transition-colors hover:bg-sunken"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-paper text-ink transition-colors group-hover:border-cyan/50 group-hover:text-cyan">
                <Icon name={s.icon} className="size-[18px]" />
              </span>
              <span className="text-[15px] leading-5 text-ink">{s.short}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      {pillarOrder.map((p) => (
        <div key={p} className="col-span-3">
          <MenuServiceList pillar={p} />
        </div>
      ))}
      <div className="col-span-3">
        <MenuFeature
          eyebrow="Not sure where to start?"
          title="Tell us the goal. We'll pick the mix."
          body="One call, a clear plan, and a team that can run every part of it."
          href={site.bookingUrl}
          cta="Start a project"
          secondary={{ href: "/services/", label: "All services" }}
        />
      </div>
    </div>
  );
}

function IndustriesMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <p className="t-label mb-4">Industries</p>
        <ul className="grid grid-cols-2 gap-1">
          {industries.map((i) => (
            <li key={i.slug}>
              <Link
                href={`/industries/${i.slug}/`}
                className="flex gap-4 rounded-sm p-3 transition-colors hover:bg-sunken"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-line bg-paper text-ink">
                  <Icon name={i.icon} className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-medium leading-5 text-ink">{i.name}</span>
                  <span className="mt-1 block text-[13px] leading-5 text-ink-muted">{i.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4">
        <MenuFeature
          eyebrow="Flagship solutions"
          title="AI receptionist, sales engine and operations."
          body="Packaged AI systems we deploy and run for clinics, agencies and brands."
          href="/solutions/"
          cta="See solutions"
          secondary={{ href: "/industries/", label: "All industries" }}
        />
      </div>
    </div>
  );
}

function MenuFeature({
  eyebrow,
  title,
  body,
  href,
  cta,
  secondary,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  secondary: { href: string; label: string };
}) {
  return (
    <div className="theme-ink relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-md p-7">
      <SignalRings
        count={4}
        spacing={70}
        inner={60}
        dotAngle={62}
        dotRadius={8}
        className="pointer-events-none absolute -bottom-2 -right-2 h-[230px] w-auto"
      />
      <p className="t-label relative">{eyebrow}</p>
      <p className="relative mt-3 max-w-[18rem] font-display text-[26px] leading-[32px] tracking-[-0.02em] text-ink">
        {title}
      </p>
      <p className="relative mt-3 max-w-[18rem] text-[14px] leading-[22px] text-ink-muted">{body}</p>
      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-6">
        <Button href={href} size="sm" icon="arrow-right">
          {cta}
        </Button>
        <Button href={secondary.href} size="sm" variant="ghost">
          {secondary.label}
        </Button>
      </div>
    </div>
  );
}

function MobileMenu({ isActive }: { isActive: (href: string) => boolean }) {
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  return (
    <Container className="flex min-h-full flex-col pb-8 pt-2">
      <nav aria-label="Mobile">
        <ul className="divide-y divide-line border-b border-line">
          {links.map((l) => (
            <li key={l.href}>
              {l.menu ? (
                <>
                  <button
                    type="button"
                    aria-expanded={expanded === l.menu}
                    onClick={() => setExpanded((e) => (e === l.menu ? null : l.menu!))}
                    className="flex w-full items-center justify-between py-4 text-left font-display text-[24px] tracking-[-0.02em] text-ink"
                  >
                    {l.label}
                    <Icon
                      name="chevron"
                      className={cx("size-5 transition-transform", expanded === l.menu && "rotate-180")}
                    />
                  </button>
                  {expanded === l.menu && (
                    <ul className="grid gap-1 pb-4">
                      {(l.menu === "services"
                        ? services.map((s) => ({
                            href: `/services/${s.slug}/`,
                            label: s.short,
                            icon: s.icon,
                          }))
                        : industries.map((i) => ({
                            href: `/industries/${i.slug}/`,
                            label: i.name,
                            icon: i.icon,
                          }))
                      ).map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="flex items-center gap-3 rounded-sm px-1 py-2.5 text-[16px] text-ink-muted hover:text-ink"
                          >
                            <Icon name={item.icon} className="size-5 text-ink" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={l.href}
                          className="flex items-center gap-2 px-1 py-2.5 text-[15px] font-medium text-ink"
                        >
                          View all {l.label.toLowerCase()}
                          <Icon name="arrow-right" className="size-4" />
                        </Link>
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="block py-4 font-display text-[24px] tracking-[-0.02em] text-ink"
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-8 grid gap-3">
        <Button href={site.bookingUrl} size="lg" icon="arrow-right">
          Book a growth audit
        </Button>
        <Button href={`mailto:${site.email}`} size="lg" variant="secondary">
          {site.email}
        </Button>
      </div>
    </Container>
  );
}
