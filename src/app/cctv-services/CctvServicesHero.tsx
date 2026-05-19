"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function CctvServicesHero() {
  return (
    <PageServiceHero
      title="CCTV services designed for accountability."
      description="Professional surveillance for offices, retail, healthcare, and industrial sites in Pune and PCMC — engineered for image quality, storage retention, and secure access without compromising your corporate network."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services"},
        { label: "CCTV services" },
      ]}
    />
  );
}
