"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/data/site";

export default function AdminLoginForm({ hint }: { hint: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Invalid password. Try again.");
        return;
      }

      const from = searchParams.get("from") || "/admin/quotations";
      router.push(from.startsWith("/admin") ? from : "/admin/quotations");
      router.refresh();
    } catch {
      setError("Could not sign in. Check your connection and restart npm run dev.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-container py-8 sm:py-12">
      <div className="mx-auto flex max-w-md flex-col">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md card-elevated p-6 sm:p-8">
          <div className="mb-6 flex justify-center">
            <div className="relative h-14 w-36">
              <Image
                src="/softlink_logowht.png"
                alt={site.brandName}
                fill
                className="object-contain invert dark:invert-0"
                priority
              />
            </div>
          </div>

          <h1 className="text-center text-xl font-bold text-foreground">Admin sign in</h1>
          <p className="mt-2 text-center text-sm text-foreground/60">
            Quotation PDF generator — authorised staff only.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
              >
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                placeholder="Enter admin password"
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
                {error}
              </p>
            ) : null}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2.5 text-center text-xs leading-relaxed text-foreground/75">
            {hint}
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
