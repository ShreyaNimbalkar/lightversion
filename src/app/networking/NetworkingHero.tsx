"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function NetworkingHero() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="sky"
      showEnquiryCta
      ctaLabel="Browse categories"
      ctaHref="#product-catalog"
      title="Networking solutions built for reliability."
      description="Cabling, switching, Wi‑Fi, NAS, voice, and access control for Pune offices — labelled ports, test records, and documentation your IT team can maintain."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Networking" },
      ]}
    />
  );
}
