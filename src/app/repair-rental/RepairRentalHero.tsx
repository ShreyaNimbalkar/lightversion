"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function RepairRentalHero() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="brand"
      showEnquiryCta
      ctaLabel="Browse categories"
      ctaHref="#product-catalog"
      title="Repair and rental services you can plan for."
      description="Laptop and desktop repair, upgrades, and short-term rental for Pune businesses — workshop tickets, transparent parts pricing, and GST-compliant documentation."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Repair & rental" },
      ]}
    />
  );
}
