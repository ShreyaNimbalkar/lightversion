import { Suspense } from "react";

import AdminLoginForm from "@/app/admin/login/AdminLoginForm";
import { getAdminLoginHint } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const hint = getAdminLoginHint();

  return (
    <Suspense fallback={<div className="min-h-screen bg-section" />}>
      <AdminLoginForm hint={hint} />
    </Suspense>
  );
}
