"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function ContactHeader() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="brand"
      showEnquiryCta
      ctaLabel="View locations"
      ctaHref="#locations"
      title="Call, email, or visit either Pune location."
      description={`${site.phoneLine} · ${site.email}. Navi Peth for walk-in sales; Manikbaug for workshop and repairs. ${site.workingHours}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
    />
  );
}
