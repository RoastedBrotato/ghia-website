"use client";

import { Icon } from "@/components/brand/Icon";
import { cx } from "@/components/ui/primitives";

/**
 * Light / dark switch. The current theme lives on <html data-theme>, set
 * before paint by the script in layout.tsx, so this button keeps no state of
 * its own: CSS shows the icon for the theme you'd switch to.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode: the choice just won't persist */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className={cx(
        "grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-volt hover:text-volt-text",
        className,
      )}
    >
      <Icon name="sun" className="theme-icon-dark size-[18px]" />
      <Icon name="moon" className="theme-icon-light size-[18px]" />
    </button>
  );
}
