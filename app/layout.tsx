import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

// Manrope: geométrica, fina en pesos ligeros → títulos. Inter: máxima legibilidad → textos.
const display = Manrope({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s · ${site.brand.name}` },
  description: site.seo.description,
  applicationName: site.brand.fullName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.seo.locale,
    url: "/",
    siteName: site.brand.fullName,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F7F5F2",
};

const { contact } = site;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#negocio`,
  name: site.brand.fullName,
  description: site.seo.description,
  url: site.url,
  image: `${site.url}/opengraph-image`,
  telephone: contact.phone.value,
  email: contact.email.value,
  priceRange: site.seo.priceRange,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.street,
    addressLocality: contact.address.city,
    addressRegion: contact.address.region,
    addressCountry: contact.address.country,
  },
  geo: { "@type": "GeoCoordinates", ...site.seo.geo },
  openingHours: contact.hours.schema,
  sameAs: site.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <noscript>
          <style>{".preloader{display:none!important}"}</style>
        </noscript>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
