"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/brand/Icon";
import { Button, Container, cx } from "@/components/ui/primitives";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { navLinks } from "@/content/nav";
import { site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation (adjust state during render).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    const h = href.replace(/\/$/, "");
    const p = pathname.replace(/\/$/, "");
    return h === "" ? p === "" : p === h || p.startsWith(h + "/");
  };

  return (
    <header className="theme-dark sticky top-0 z-50 border-b border-line !bg-paper/90 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="flex h-[var(--nav-height)] items-center justify-between gap-6">
        <Link href="/" aria-label="Ghia Technologies — home" className="shrink-0 text-ink">
          <Logo className="h-8 w-auto sm:h-9" />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={cx(
                    "relative py-1 text-[15px] transition-colors hover:text-ink",
                    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-volt after:opacity-0 after:transition-opacity hover:after:opacity-100",
                    isActive(l.href) ? "text-ink after:opacity-100" : "text-ink-muted",
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button href={site.bookingUrl} size="sm" className="hidden sm:inline-flex">
            Start a project
          </Button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-line bg-paper lg:hidden"
        >
          <Container className="pb-6 pt-2">
            <ul className="divide-y divide-line">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cx(
                      "block py-3.5 font-display text-[22px] tracking-[-0.02em]",
                      isActive(l.href) ? "text-ink" : "text-ink-muted",
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button href={site.bookingUrl} size="lg" className="mt-6 w-full">
              Start a project
            </Button>
          </Container>
        </nav>
      )}
    </header>
  );
}
