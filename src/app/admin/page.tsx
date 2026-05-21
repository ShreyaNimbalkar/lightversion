import Link from "next/link";

import AdminShell from "@/components/admin/AdminShell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  return (
    <AdminShell
      title="Dashboard"
      description="Create GST-ready quotations and download PDFs to email or WhatsApp customers."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/quotations"
          className="card-elevated group flex flex-col p-6 transition hover:border-brand/30"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">Primary</p>
          <h2 className="mt-2 text-lg font-bold text-foreground">New quotation</h2>
          <p className="mt-2 flex-1 text-sm text-foreground/65">
            Fill client details, line items, GST, and download a branded PDF with signature blocks.
          </p>
          <span className="mt-4 text-sm font-semibold text-brand group-hover:underline">
            Open form →
          </span>
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="card-elevated flex flex-col p-6 transition hover:border-brand/30"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">Public site</p>
          <h2 className="mt-2 text-lg font-bold text-foreground">View website</h2>
          <p className="mt-2 flex-1 text-sm text-foreground/65">
            Open the customer-facing site in a new tab.
          </p>
          <span className="mt-4 text-sm font-semibold text-brand">softlinkcomputers.co.in →</span>
        </a>
      </div>
    </AdminShell>
  );
}
