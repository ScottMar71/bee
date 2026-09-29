import type { Metadata } from "next";
import site from "@/content/site.json";
import type { SiteContent } from "@/lib/types";

export const SITE_NAME = "The Beehive";

export const SITE_URL = site.contact.website.replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "An award-winning traditional English real ale pub in Eaton, Norwich, since 1892. Friendly local, function room, quiz nights and Friday pizza.";

const OG_IMAGE = {
  url: "/photos/hero-leopold-2.jpg",
  alt: "The Beehive pub on Leopold Road, Norwich",
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = absoluteTitle ? title : `${title} | The Beehive Norwich`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_GB",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

function to24h(token: string): string | null {
  const value = token.trim().toLowerCase().replace(/\./g, "");
  if (value === "noon" || value === "midday") return "12:00";
  if (value === "midnight") return "00:00";

  const match = value.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!match) return null;

  let hour = Number(match[1]);
  const minutes = match[2] ?? "00";
  if (match[3] === "pm" && hour < 12) hour += 12;
  if (match[3] === "am" && hour === 12) hour = 0;

  return `${String(hour).padStart(2, "0")}:${minutes}`;
}

function openingHours(hours: SiteContent["hours"]) {
  return hours.flatMap((entry) => {
    if (/closed/i.test(entry.hours)) return [];
    const [open, close] = entry.hours.split(/\s*[–—-]\s*/);
    const opens = open ? to24h(open) : null;
    const closes = close ? to24h(close) : null;
    if (!opens || !closes) return [];

    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${entry.day}`,
        opens,
        closes,
      },
    ];
  });
}

export function pubJsonLd(content: SiteContent) {
  const [streetAddress, addressLocality, postalCode] = content.contact.addressLines;
  const sameAs = [
    content.socials.facebook,
    content.socials.twitter,
    content.socials.instagram,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/photos/hero-leopold-2.jpg`,
    email: content.contact.email || undefined,
    telephone: content.contact.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      postalCode,
      addressCountry: "GB",
    },
    servesCuisine: "Pub food",
    openingHoursSpecification: openingHours(content.hours),
    sameAs,
  };
}
