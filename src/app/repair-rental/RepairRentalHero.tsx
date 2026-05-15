"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function RepairRentalHero() {
  return (
    <PageServiceHero
      title="Repair and rental services you can plan for."
      description="Professional laptop and desktop repair, performance upgrades, and interim hardware rental for Pune businesses — workshop tickets, transparent parts pricing, and GST-compliant documentation."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Repair & rental" },
      ]}
    />
  );
}
