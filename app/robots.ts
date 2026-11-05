import type { MetadataRoute } from "next";
import { maintenanceEnabled } from "@/lib/maintenance";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  if (await maintenanceEnabled()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/maintenance"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
