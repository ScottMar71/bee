import { pubJsonLd } from "@/lib/seo";
import type { SiteContent } from "@/lib/types";

export function PubJsonLd({ site }: { site: SiteContent }) {
  const json = JSON.stringify(pubJsonLd(site)).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
