/**
 * Ghia icon set — 24px grid, 1.75 stroke, round caps & joins (brand kit /icons).
 * Ink by default via currentColor; the Volt dot is the only fill.
 */
const ICONS = {
  analytics: { d: "M3.5 20.5h17 M6.5 17v-5 M12 17V7 M17.5 17V11" },
  "arrow-right": { d: "M4 12h15 M13 6l6 6-6 6" },
  "arrow-up-right": { d: "M6 18 18 6 M8.5 6H18v9.5" },
  calendar: { d: "M3.5 5.5h17v15h-17Z M3.5 10h17 M8 3v4.5 M16 3v4.5" },
  check: { d: "M4.5 12.5l5 5 10-11" },
  close: { d: "M6 6l12 12 M18 6 6 18" },
  content: { d: "M6 3h9l4 4v14H6Z M14.5 3v4.5H19 M9 12h7 M9 16h5" },
  globe: {
    d: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18Z M3 12h18 M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3Z",
  },
  growth: { d: "M4 19.5 10 13.5l3.5 3.5 6-6", dot: [20.3, 4.7, 2] },
  mail: { d: "M3 5.5h18v13H3Z M3 6l9 7 9-7" },
  marketplace: { d: "M4 8h16l-1.2 12H5.2L4 8Z M9 8V6.5a3 3 0 0 1 6 0V8" },
  menu: { d: "M3.5 7h17 M3.5 12h17 M3.5 17h11" },
  "paid-social": { d: "M3 10h4l9-5v14l-9-5H3Z M7 14v6 M19 9.5a3.5 3.5 0 0 1 0 5" },
  plus: { d: "M12 4.5v15 M4.5 12h15" },
  "search-ads": { d: "M5 4l13 5.5-5.5 2-2 5.5L5 4Z M13 13l6 6" },
  seo: { d: "M10.5 3.5a7 7 0 1 0 0 14a7 7 0 1 0 0-14Z M15.5 15.5 20.5 20.5 M8 13v-2 M10.5 13V8 M13 13v-3" },
  signal: { d: "M12 3.5a8.5 8.5 0 1 0 8.5 8.5 M12 7.5a4.5 4.5 0 1 0 4.5 4.5", dot: [19.2, 4.8, 1.8] },
  storefront: { d: "M3.5 9 5 4h14l1.5 5 M3.5 9h17 M5 9v11h14V9 M10 20v-5h4v5" },
  "ux-design": { d: "M4 4h16v16H4Z M4 9h16 M9 9v11" },
  "web-dev": { d: "M8 7l-5 5 5 5 M16 7l5 5-5 5 M13.5 4.5l-3 15" },
  // Additions drawn on the same grid/stroke for the AI pillar.
  agent: { d: "M5 6.5h14v9H11l-4 3.5v-3.5H5Z M9 11h.01 M15 11h.01" },
  workflow: { d: "M4 5h5v5H4Z M15 14h5v5h-5Z M6.5 10v4.5a2 2 0 0 0 2 2H15 M9 7.5h6.5a2 2 0 0 1 2 2V14" },
  chip: { d: "M7 7h10v10H7Z M10 3.5V7 M14 3.5V7 M10 17v3.5 M14 17v3.5 M3.5 10H7 M3.5 14H7 M17 10h3.5 M17 14h3.5" },
  funnel: { d: "M4 5h16l-6 7.5V19l-4-2v-4.5Z" },
  phone: { d: "M6.5 3.5h3l1.5 4-2 1.5a10 10 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" },
  layers: { d: "M12 3.5 20.5 8 12 12.5 3.5 8Z M3.5 12 12 16.5 20.5 12 M3.5 16 12 20.5 20.5 16" },
  chevron: { d: "M7 10l5 5 5-5" },
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({
  name,
  className = "size-6",
  title,
}: {
  name: IconName;
  className?: string;
  title?: string;
}) {
  const icon = ICONS[name] as { d: string; dot?: readonly number[] };
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={icon.d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {icon.dot && <circle cx={icon.dot[0]} cy={icon.dot[1]} r={icon.dot[2]} fill="var(--volt)" />}
    </svg>
  );
}
