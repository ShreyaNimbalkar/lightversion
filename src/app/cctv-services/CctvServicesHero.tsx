"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function CctvServicesHero() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="slate"
      showEnquiryCta
      ctaLabel="Browse categories"
      ctaHref="#product-catalog"
      title="CCTV services designed for accountability."
      description="Surveillance for offices, retail, healthcare, and industrial sites in Pune and PCMC — image quality, retention, and secure access without compromising your network."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "CCTV services" },
      ]}
    />
  );
}
