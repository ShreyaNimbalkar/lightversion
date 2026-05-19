"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function ContactHeader() {
  return (
    <PageServiceHero
      title="Call, email, or visit either Pune location."
      description={`Use ${site.phoneLine} for the fastest triage, or write to ${site.email}. Prefer to walk in? Navi Peth is suited for sales and quick drops; Manikbaug handles dispatch and workshop intake. ${site.workingHours}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        // { label: "Services", href: "/#services" },
        { label: "Contact" },
      ]}
    />
  );
}
