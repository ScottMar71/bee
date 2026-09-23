import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "beehive_admin";

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "dev-only";
}

function expectedToken() {
  return createHmac("sha256", secret()).update("ok").digest("hex");
}

export async function isAdmin() {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === expectedToken();
}

export async function login(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) return false;

  const jar = await cookies();
  jar.set(COOKIE, expectedToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return true;
}

export async function logout() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
