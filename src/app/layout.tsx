import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { MotionDirector } from "@/components/motion/MotionDirector";
import { Cursor } from "@/components/motion/Cursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SectionRail } from "@/components/motion/SectionRail";
import { isPreview, site } from "@/lib/site";
import "./globals.css";

const interDisplay = localFont({
  src: [
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
  themeColor: "#07152D",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/ghia-logo-primary.svg`,
  slogan: site.tagline,
  email: site.email,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      suppressHydrationWarning
      className={`${interDisplay.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-dvh bg-paper text-ink">
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <MotionDirector />
        <Cursor />
        <SmoothScroll />
        <SectionRail />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
