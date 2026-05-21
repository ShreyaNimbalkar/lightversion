"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function AboutHeader() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="brand"
      showEnquiryCta
      ctaLabel="Our locations"
      ctaHref="#locations"
      title="Your local IT partner in Pune."
      description={`${site.brandName} has helped 1,000+ homes and businesses since ${site.establishedYear}. Led by ${site.proprietor} — laptop repair, networking, CCTV, and genuine software with clear quotes and GST bills.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About us" },
      ]}
    />
  );
}
