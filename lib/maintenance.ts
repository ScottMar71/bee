import { readFile } from "fs/promises";
import path from "path";
import { readRepoFile } from "./github";

const SITE_PATH = path.join(process.cwd(), "content", "site.json");
const TTL_MS = 10_000;

let cache: { at: number; on: boolean } | null = null;

function flagFrom(raw: string) {
  return JSON.parse(raw).maintenance === true;
}

async function readFresh() {
  if (process.env.VERCEL && process.env.GITHUB_TOKEN) {
    try {
      return flagFrom(await readRepoFile("content/site.json"));
    } catch {
      // The published copy is the fallback if GitHub cannot be reached.
    }
  }

  try {
    return flagFrom(await readFile(SITE_PATH, "utf8"));
  } catch {
    return false;
  }
}

export async function maintenanceEnabled() {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.on;
  const on = await readFresh();
  cache = { at: Date.now(), on };
  return on;
}
