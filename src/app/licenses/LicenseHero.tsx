"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function LicenseHero() {
  return (
    <PageServiceHero
      title="Software licensing made simple for businesses."
      description="Microsoft 365, Windows, Tally Prime, Quick Heal, and enterprise software licences with proper billing, verified keys, and smooth renewal support."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Software licences" },
      ]}
    />
  );
}
