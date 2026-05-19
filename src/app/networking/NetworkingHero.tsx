"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function NetworkingHero() {
  return (
    <PageServiceHero
      title="Networking solutions built for reliability."
      description="End-to-end infrastructure for Pune offices: cabling, switching, Wi‑Fi, storage, voice, and access control — with labelled ports, test records, and as-built documentation your IT team can maintain."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services"},
        { label: "Networking" },
      ]}
    />
  );
}
