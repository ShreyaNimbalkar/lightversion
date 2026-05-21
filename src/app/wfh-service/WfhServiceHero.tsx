"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function WfhServiceHero() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="brand"
      showEnquiryCta
      ctaLabel="Browse categories"
      ctaHref="#product-catalog"
      title="WFH service for productive remote teams."
      description="Home-office kits — hardware, connectivity, collaboration tools, and support documentation from one Pune-based partner."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "WFH service" },
      ]}
    />
  );
}
