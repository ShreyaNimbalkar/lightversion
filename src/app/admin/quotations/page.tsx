import AdminShell from "@/components/admin/AdminShell";
import QuotationForm from "@/components/admin/QuotationForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminQuotationsPage() {
  const authed = await isAdminAuthenticated();
  if (!authed) redirect("/admin/login");

  return (
    <AdminShell
      title="Quotation form"
      description="Fill details, preview totals, and download a branded PDF with company logo, GST blocks, and signature lines."
    >
      <QuotationForm />
    </AdminShell>
  );
}
