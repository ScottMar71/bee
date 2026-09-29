import type { MetadataRoute } from "next";
import { NAV } from "@/lib/nav";
import { SITE_URL } from "@/lib/seo";

const WEEKLY = new Set(["/", "/real-ales", "/quiz", "/food"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...NAV.map((item) => item.href), "/cookies"];

  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
    changeFrequency: WEEKLY.has(path) ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
