"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function TermsConditionsHeader() {
  return (
    <PageServiceHero
      title="Terms and conditions."
      description="Please review these terms before using our website, requesting quotations, or engaging us for workshop, on-site, or licensing work. They describe how we quote, invoice, and deliver services for Pune businesses."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Terms & conditions" },
      ]}
    />
  );
}
