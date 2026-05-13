"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function ContactHeader() {
  return (
    <PageServiceHero
      tag={`Reach ${site.brandName}`}
      title={
        <h1 className="text-[1.65rem] font-black leading-tight text-foreground sm:text-3xl md:text-5xl">
          Call, email, or visit
          <span className="block text-brand">either Pune location</span>
        </h1>
      }
      description={`Use ${site.phoneLine} for the fastest triage, or write to ${site.email}. Prefer to walk in? Navi Peth is suited for sales and quick drops; Manikbaug handles dispatch and workshop intake. ${site.workingHours}`}
      highlights={[
        "Same-day triage when parts are on the shelf",
        "Quotations before we book on-site labour",
        "GST invoices with clear HSN/SAC lines",
        "No ticket black holes — you get a reference number",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Contact" },
      ]}
    />
  );
}
