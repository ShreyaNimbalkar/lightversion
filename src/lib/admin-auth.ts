import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "softlink_admin_session";

function getSecret() {
  const raw = process.env.ADMIN_SESSION_SECRET;
  if (!raw || raw.length < 16) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET must be set (min 16 characters) in production.");
    }
    return new TextEncoder().encode("dev-only-softlink-admin-secret");
  }
  return new TextEncoder().encode(raw);
}

export async function createAdminSession(): Promise<void> {
  const token = await createAdminSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, adminSessionCookieOptions);
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

function configuredAdminPassword(): string | undefined {
  const raw = process.env.ADMIN_PASSWORD?.trim();
  return raw && raw.length > 0 ? raw : undefined;
}

export function getAdminLoginHint(): string {
  if (configuredAdminPassword()) {
    return "Use the password from ADMIN_PASSWORD in your .env.local file (restart the dev server after changing it).";
  }
  if (process.env.NODE_ENV === "production") {
    return "ADMIN_PASSWORD is not set. Add it to .env.local, then run npm run dev again.";
  }
  return "No ADMIN_PASSWORD in .env.local — default dev password is: admin123";
}

export type AdminLoginFailure =
  | "missing_password"
  | "not_configured"
  | "invalid";

export function verifyAdminPassword(password: string): AdminLoginFailure | null {
  const submitted = password.trim();
  if (!submitted) return "missing_password";

  const expected = configuredAdminPassword();
  if (!expected) {
    if (process.env.NODE_ENV === "production") return "not_configured";
    return submitted === "admin123" ? null : "invalid";
  }

  if (submitted.length !== expected.length) return "invalid";

  let mismatch = 0;
  for (let i = 0; i < submitted.length; i++) {
    mismatch |= submitted.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0 ? null : "invalid";
}

/** Returns signed session token for setting on the login response cookie. */
export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export const adminSessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 8,
};
