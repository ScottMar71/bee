"use server";

import { promises as fs } from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin, login, logout } from "@/lib/auth";
import { commitFiles, deleteGithubFile } from "@/lib/github";
import { getSite, saveSite } from "@/lib/site";
import type { SiteContent } from "@/lib/types";

function assertAdmin() {
  return isAdmin();
}

export type AdminResult = { ok: true } | { ok: false; error: string };

function resultError(error: unknown): AdminResult {
  const message = error instanceof Error ? error.message : "Could not save.";
  if (message.includes("GITHUB_TOKEN") || message.includes("EROFS")) {
    return {
      ok: false,
      error:
        "Saving on the live site needs a GitHub token. Add GITHUB_TOKEN in Vercel, with permission to update this repo, then try again.",
    };
  }
  return { ok: false, error: message };
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  const ok = await login(password);
  if (!ok) redirect("/admin/login?error=1");
  redirect("/admin");
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

export async function saveSiteAction(site: SiteContent): Promise<AdminResult> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Please log in again." };
  }
  try {
    await saveSite(site);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return resultError(error);
  }
}

export async function uploadPhotoAction(
  formData: FormData,
): Promise<AdminResult> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Please log in again." };
  }

  const file = formData.get("photo");
  const alt = String(formData.get("alt") || "The Beehive");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Choose a photo to upload." };
  }
  if (file.size > 6 * 1024 * 1024) {
    return { ok: false, error: "Please use a photo under 6MB." };
  }

  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    return { ok: false, error: "Use a JPG, PNG or WebP image." };
  }

  if (!process.env.GITHUB_TOKEN && process.env.VERCEL) {
    return {
      ok: false,
      error:
        "Saving on the live site needs a GitHub token. Add GITHUB_TOKEN in Vercel, with permission to update this repo, then try again.",
    };
  }

  const safeName = `upload-${Date.now()}${ext}`;
  const publicPath = `/photos/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    if (process.env.GITHUB_TOKEN) {
      await commitFiles(
        [
          {
            path: `public/photos/${safeName}`,
            content: buffer.toString("base64"),
            encoding: "base64",
          },
        ],
        `Add gallery photo ${safeName}`,
      );
    } else {
      await fs.writeFile(
        path.join(process.cwd(), "public", "photos", safeName),
        buffer,
      );
    }

    const site = await getSite();
    site.gallery = [...site.gallery, { src: publicPath, alt }];
    await saveSite(site);
    revalidatePath("/", "layout");
    return { ok: true };
  } catch (error) {
    return resultError(error);
  }
}

export async function deletePhotoAction(src: string): Promise<AdminResult> {
  if (!(await assertAdmin())) {
    return { ok: false, error: "Please log in again." };
  }

  const site = await getSite();
  site.gallery = site.gallery.filter((item) => item.src !== src);
  try {
    await saveSite(site);
  } catch (error) {
    return resultError(error);
  }

  if (src.startsWith("/photos/")) {
    const relative = `public${src}`;
    if (process.env.GITHUB_TOKEN) {
      try {
        await deleteGithubFile(relative, `Remove ${src}`);
      } catch {
        // Content already updated even if the blob is gone.
      }
    } else {
      await fs.unlink(path.join(process.cwd(), "public", src)).catch(() => {});
    }
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
