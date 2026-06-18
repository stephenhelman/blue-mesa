import { site } from "@/lib/site";

/**
 * LocalBusiness structured data — high value for a local builder's SEO.
 * [BRAND INPUT] Add a real street address, business hours, and social profiles
 * (sameAs) when available to strengthen the local listing.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "GeneralContractor"],
    name: site.name,
    description:
      "Custom pool and spa design and construction serving El Paso and the surrounding 915 area.",
    url: site.url,
    image: `${site.url}/opengraph-image`,
    telephone: site.phoneDisplay,
    priceRange: "$$$",
    areaServed: {
      "@type": "City",
      name: "El Paso",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Paso",
      addressRegion: "TX",
      addressCountry: "US",
    },
    knowsAbout: ["Custom pools", "Spas", "Backyard design"],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, server-rendered content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
