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

export async function saveSiteAction(site: SiteContent) {
  if (!(await assertAdmin())) throw new Error("Unauthorized");
  await saveSite(site);
  revalidatePath("/", "layout");
}

export async function uploadPhotoAction(formData: FormData) {
  if (!(await assertAdmin())) throw new Error("Unauthorized");

  const file = formData.get("photo");
  const alt = String(formData.get("alt") || "The Beehive");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Choose a photo to upload.");
  }
  if (file.size > 6 * 1024 * 1024) {
    throw new Error("Please use a photo under 6MB.");
  }

  const ext = path.extname(file.name || "").toLowerCase() || ".jpg";
  if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
    throw new Error("Use a JPG, PNG or WebP image.");
  }

  const safeName = `upload-${Date.now()}${ext}`;
  const publicPath = `/photos/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());

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
}

export async function deletePhotoAction(src: string) {
  if (!(await assertAdmin())) throw new Error("Unauthorized");

  const site = await getSite();
  site.gallery = site.gallery.filter((item) => item.src !== src);
  await saveSite(site);

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
}
