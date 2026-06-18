/**
 * Single source of truth for business facts used across the site.
 * Update phone/domain here and it propagates everywhere.
 */
export const site = {
  name: "Blue Mesa Pools & Spas",
  tagline: "Building Backyard Luxury",
  // Domain per the brief. Flyer footer says bluemesapools.com — confirm registration. [BRAND INPUT]
  domain: "bluemesapoolandspa.com",
  url: "https://bluemesapoolandspa.com",
  phoneDisplay: "+1 (915) 229-1558",
  phoneHref: "tel:+19152291558",
  smsHref: "sms:+19152291558",
  serviceArea: "El Paso & the surrounding 915 area",
  offer: "$500 off your new pool or spa",
} as const;

// Root-relative so they resolve from any route (e.g. the /gallery page).
export const nav = [
  { label: "What We Build", href: "/#services" },
  { label: "Why Blue Mesa", href: "/#why" },
  { label: "Gallery", href: "/gallery" },
  { label: "The Offer", href: "/#offer" },
] as const;
