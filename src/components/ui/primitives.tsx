import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "@/components/brand/Icon";
import { isExternal } from "@/lib/site";

export function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

/* ---------- Layout ---------- */

export function Container({
  className,
  wide,
  children,
}: {
  className?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        wide ? "max-w-[1440px]" : "max-w-[1264px]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type Tone = "paper" | "sunken" | "ink";

export function Section({
  tone = "paper",
  className,
  id,
  children,
  ...rest
}: {
  tone?: Tone;
  className?: string;
  id?: string;
  children: ReactNode;
} & Omit<ComponentProps<"section">, "className" | "id" | "children">) {
  return (
    <section
      id={id}
      className={cx(
        "relative py-20 sm:py-24 lg:py-32",
        tone === "sunken" && "bg-sunken",
        tone === "ink" && "theme-ink",
        tone === "paper" && "bg-paper",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/* ---------- Text ---------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("eyebrow", className)} data-scramble={typeof children === "string" ? "" : undefined}>
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  as: As = "h2",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cx("max-w-[44rem]", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        <As className="t-h1 text-ink" data-split="words">
          {title}
        </As>
        {intro && <p className="t-body-lg mt-5 max-w-[38rem]">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------- Buttons ---------- */

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost";

const buttonBase =
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border font-sans font-medium tracking-[-0.005em] transition-[transform,box-shadow,color,border-color,background-color,filter] duration-300 ease-brand";
const buttonSize = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-[54px] px-[30px] text-[16px]",
};
const glowButton =
  "btn-cta hover:-translate-y-0.5";
const buttonVariant: Record<ButtonVariant, string> = {
  primary: glowButton,
  accent: glowButton,
  secondary:
    "border-white/20 bg-white/[0.03] text-ink backdrop-blur-sm hover:-translate-y-0.5 hover:border-cyan hover:text-cyan",
  ghost: "border-transparent bg-transparent px-2 text-ink hover:text-cyan",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  size?: keyof typeof buttonSize;
  icon?: IconName | false;
  className?: string;
  children: ReactNode;
}) {
  const external = isExternal(href) || href.startsWith("mailto:");
  const content = (
    <>
      {children}
      {icon && (
        <Icon
          name={icon}
          className="size-[18px] transition-transform duration-200 ease-brand group-hover/btn:translate-x-0.5"
        />
      )}
    </>
  );
  const cls = cx(buttonBase, buttonSize[size], buttonVariant[variant], className);
  if (external) {
    return (
      <a
        href={href}
        className={cls}
        {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "group/link inline-flex items-center gap-1.5 text-[15px] font-medium text-ink transition-colors hover:text-cyan",
        className,
      )}
    >
      {children}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-200 ease-brand group-hover/link:translate-x-[3px]"
      />
    </Link>
  );
}

/* ---------- Badges, tiles, cards ---------- */

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "volt" | "solid";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 font-mono text-[12px] font-medium tracking-[0.04em]",
        tone === "default" && "border-line bg-sunken text-ink-muted",
        tone === "volt" && "border-transparent bg-volt-soft text-volt-text",
        tone === "solid" && "border-transparent bg-ink text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function IconTile({ name, className }: { name: IconName; className?: string }) {
  return (
    <span
      className={cx(
        "grid size-11 shrink-0 place-items-center rounded-sm border border-line bg-volt-soft text-cyan",
        className,
      )}
    >
      <Icon name={name} className="size-6" />
    </span>
  );
}

export function Card({
  className,
  children,
  href,
  interactive,
}: {
  className?: string;
  children: ReactNode;
  href?: string;
  interactive?: boolean;
}) {
  const cls = cx(
    "glass spotlight group/card relative flex flex-col rounded-[22px] p-6 sm:p-8",
    (href || interactive) && "tilt",
    className,
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return <div className={cls}>{children}</div>;
}

export function CardArrow({ label = "Learn more" }: { label?: string }) {
  return (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-medium text-ink">
      {label}
      <Icon
        name="arrow-right"
        className="size-4 transition-transform duration-200 ease-brand group-hover/card:translate-x-[3px]"
      />
    </span>
  );
}

/** Mono list number, e.g. 01 */
export function Num({ n, className }: { n: number; className?: string }) {
  return (
    <span className={cx("font-mono text-[12px] tracking-[0.04em] text-volt-text", className)}>
      {String(n).padStart(2, "0")}
    </span>
  );
}

/** Hairline grid of checks used on service/industry pages */
export function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cx("grid gap-3", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-6 text-ink-muted">
          <Icon name="check" className="mt-0.5 size-5 shrink-0 text-cyan" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
