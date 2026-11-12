import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { isPreview, site } from "@/lib/site";
import "./globals.css";

const interDisplay = localFont({
  src: [
    { path: "../fonts/InterDisplay-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/InterDisplay-Light.woff2", weight: "300", style: "normal" },
    { path: "../fonts/InterDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InterDisplay-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter-display",
  display: "swap",
});

const inter = localFont({
  src: [
    { path: "../fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = localFont({
  src: [{ path: "../fonts/GeistMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Only used for the "Ghia Technologies" wordmark in the logo. */
const outfit = localFont({
  src: [{ path: "../fonts/Outfit-Medium.woff2", weight: "500", style: "normal" }],
  variable: "--font-outfit",
  display: "block",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

/**
 * Runs before first paint so the saved theme never flashes. Light (soft
 * white with navy hero and footer) is the default; a visitor's choice from
 * the nav toggle is remembered.
 */
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`;

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/ghia-logo.png`,
  slogan: site.tagline,
  email: site.email,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      data-theme="light"
      suppressHydrationWarning
      className={`${interDisplay.variable} ${inter.variable} ${geistMono.variable} ${outfit.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
