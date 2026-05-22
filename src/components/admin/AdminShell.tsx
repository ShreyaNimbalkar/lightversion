"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/quotations", label: "Quotation form" },
];

export default function AdminShell({
  children,
  title,
  description,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="border-b border-foreground/10 bg-card">
        <div className="page-container flex flex-wrap items-center justify-between gap-3 py-3">
          <nav
            className="flex gap-1 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Admin"
          >
            {nav.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                    active
                      ? "bg-brand/10 text-brand"
                      : "text-foreground/70 hover:bg-section hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => void logout()}
            className="btn-secondary shrink-0 px-3 py-2 text-xs sm:text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="page-container py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Admin</p>
          <h1 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h1>
          {description ? (
            <p className="mt-2 max-w-3xl text-sm text-foreground/65">{description}</p>
          ) : null}
        </div>
        {children}
      </div>
    </>
  );
}
