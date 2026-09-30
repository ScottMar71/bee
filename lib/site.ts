import { promises as fs } from "fs";
import path from "path";
import { unstable_cache, updateTag } from "next/cache";
import type { SiteContent } from "./types";
import { commitFiles, readRepoFile } from "./github";

const SITE_PATH = path.join(process.cwd(), "content", "site.json");
const SITE_CACHE_TAG = "site-content";

function parseSite(raw: string): SiteContent {
  const site = JSON.parse(raw) as SiteContent;
  site.socials.instagram ??= "";
  return site;
}

// Admin saves commit content/site.json on GitHub. Those commits do not start
// a Vercel deployment, so the published file in the deployment stays stale.
async function readSiteJson(): Promise<string> {
  if (process.env.GITHUB_TOKEN) return readRepoFile("content/site.json");
  return fs.readFile(SITE_PATH, "utf8");
}

const readCachedSiteJson = unstable_cache(readSiteJson, ["site-content"], {
  tags: [SITE_CACHE_TAG],
  revalidate: 30,
});

export async function getSite(): Promise<SiteContent> {
  if (!process.env.GITHUB_TOKEN) {
    return parseSite(await fs.readFile(SITE_PATH, "utf8"));
  }

  try {
    return parseSite(await readCachedSiteJson());
  } catch {
    return parseSite(await fs.readFile(SITE_PATH, "utf8"));
  }
}

export async function saveSite(
  site: SiteContent,
  message = "Update what’s on at The Beehive",
) {
  const json = `${JSON.stringify(site, null, 2)}\n`;

  if (process.env.GITHUB_TOKEN) {
    await commitFiles(
      [{ path: "content/site.json", content: json }],
      message,
    );
    updateTag(SITE_CACHE_TAG);
    return;
  }

  if (process.env.VERCEL) {
    throw new Error(
      "GITHUB_TOKEN is not set, so the live site cannot save changes.",
    );
  }

  await fs.writeFile(SITE_PATH, json, "utf8");
}

export function mapEmbedUrl(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}
