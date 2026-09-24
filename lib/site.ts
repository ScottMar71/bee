import { promises as fs } from "fs";
import path from "path";
import type { SiteContent } from "./types";
import { commitFiles } from "./github";

const SITE_PATH = path.join(process.cwd(), "content", "site.json");

export async function getSite(): Promise<SiteContent> {
  const raw = await fs.readFile(SITE_PATH, "utf8");
  return JSON.parse(raw) as SiteContent;
}

export async function saveSite(site: SiteContent) {
  const json = `${JSON.stringify(site, null, 2)}\n`;

  if (process.env.GITHUB_TOKEN) {
    await commitFiles(
      [{ path: "content/site.json", content: json }],
      "Update what’s on at The Beehive",
    );
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
