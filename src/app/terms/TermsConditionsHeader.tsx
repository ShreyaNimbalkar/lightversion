"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function TermsConditionsHeader() {
  return (
    <PageServiceHero
      tag="Terms & conditions"
      title={
        <h1 className="text-[1.65rem] font-black leading-tight text-foreground sm:text-3xl md:text-5xl">
          Terms &
          <span className="block text-brand">conditions</span>
        </h1>
      }
      description="Please review these terms before using our website, requesting quotations, or engaging us for workshop, on-site, or licensing work. They describe how we quote, invoice, and deliver services for Pune businesses."
      highlights={[
        "GST-ready quotations and invoices for IT goods and services",
        "Clear scope before billable labour or cable pulls begin",
        "Intellectual property and branding remain protected",
        "Updates posted here — continued use means acceptance",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Terms & conditions" },
      ]}
    />
  );
}
