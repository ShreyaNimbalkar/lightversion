"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function WfhServiceHero() {
  return (
    <PageServiceHero
      title="WFH service for productive remote teams."
      description="Deploy consistent home-office technology across your organisation — hardware, connectivity, collaboration tools, and support documentation from a single Pune-based partner."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "WFH service" },
      ]}
    />
  );
}
