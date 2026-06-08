import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteChrome } from "./components/SiteChrome";

const SITE_URL = "https://leanhippo.io";
const TITLE = "Lean Hippo Systems & Tech — Connected Business Systems";
const DESCRIPTION =
  "Lean Hippo builds connected business systems — dashboards, workflows, databases, automation, and AI intelligence (MIND+) — so businesses gain control and visibility and stop running on memory.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Lean Hippo Systems & Tech",
  },
  description: DESCRIPTION,
  applicationName: "Lean Hippo Systems & Tech",
  keywords: [
    "business systems",
    "business automation",
    "operations dashboard",
    "workflow automation",
    "AI for business",
    "MIND+",
    "P&L reporting",
    "CRM",
    "SOP management",
    "Lean Hippo",
    "connected operating system",
    "business control",
  ],
  authors: [{ name: "Lean Hippo Systems & Tech" }],
  creator: "Lean Hippo Systems & Tech",
  publisher: "Lean Hippo Systems & Tech",
  alternates: { canonical: SITE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "Lean Hippo Systems & Tech",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
    images: [{ url: "/logos/leanhippo-white.png", width: 1200, height: 630, alt: "Lean Hippo Systems & Tech" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/logos/leanhippo-white.png"],
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

// JSON-LD structured data — helps both classic SEO and AI answer engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Lean Hippo Systems & Tech",
      url: SITE_URL,
      logo: `${SITE_URL}/logos/leanhippo-white.png`,
      email: "contact@leanhippo.io",
      description: DESCRIPTION,
      slogan: "We build the systems businesses run on.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Lean Hippo Systems & Tech",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "Service",
      name: "Business Systems",
      provider: { "@id": `${SITE_URL}/#organization` },
      serviceType: "Connected business systems, automation, dashboards, and AI intelligence",
      areaServed: "Global",
      url: `${SITE_URL}/business-systems`,
      description:
        "A connected operating system across visibility, money, customers, knowledge, procurement, and decisions — with human approval and full auditability.",
    },
    {
      "@type": "Product",
      name: "MIND+",
      brand: { "@id": `${SITE_URL}/#organization` },
      description:
        "An AI intelligence layer that comes with every Lean Hippo product or runs standalone — it answers questions, summarises activity, detects issues, and suggests what needs attention next.",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/fonts/klik-light.otf" as="font" type="font/otf" crossOrigin="" />
        <link rel="preload" href="/fonts/klik-regular.otf" as="font" type="font/otf" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
