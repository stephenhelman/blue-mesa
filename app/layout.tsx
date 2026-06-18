import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { site } from "@/lib/site";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Custom Pools & Spas | ${site.serviceArea}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Blue Mesa Pools & Spas designs and builds custom pools and spas that turn your backyard into your favorite place. Free in-home consultation across El Paso and the 915 area.",
  applicationName: site.name,
  keywords: [
    "custom pools El Paso",
    "spa builder El Paso",
    "pool builder 915",
    "backyard pools",
    "Blue Mesa Pools",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Building Backyard Luxury`,
    description:
      "Custom pools and spas, designed and built for your backyard. Free in-home consultation across El Paso and the 915 area.",
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Building Backyard Luxury`,
    description:
      "Custom pools and spas, designed and built for your backyard. Free in-home consultation across El Paso and the 915 area.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1b3a5f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable}`}>
      <body className="bg-white antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
