import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "webdono_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function expectedToken(): string | null {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return crypto.createHash("sha256").update(secret).digest("hex");
}

export function checkPassword(password: string): boolean {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  return password === secret;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === expected;
}

export async function setAdminSession(): Promise<void> {
  const expected = expectedToken();
  if (!expected) return;
  const store = await cookies();
  store.set(COOKIE_NAME, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
