import { NextResponse } from "next/server";

import {
  ADMIN_COOKIE,
  adminSessionCookieOptions,
  createAdminSessionToken,
  verifyAdminPassword,
} from "@/lib/admin-auth";

const ERROR_MESSAGES = {
  missing_password: "Enter your password.",
  invalid: "Incorrect password. See the hint below for which password to use.",
  not_configured:
    "Admin login is not configured. Set ADMIN_PASSWORD in .env.local and restart the server.",
} as const;

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const failure = verifyAdminPassword(body.password ?? "");
  if (failure) {
    return NextResponse.json({ error: ERROR_MESSAGES[failure], code: failure }, { status: 401 });
  }

  const token = await createAdminSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, token, adminSessionCookieOptions);
  return response;
}
