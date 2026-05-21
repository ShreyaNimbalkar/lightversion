"use client";

import PageServiceHero from "@/components/PageServiceHero";

export default function LicenseHero() {
  return (
    <PageServiceHero
      variant="immersive"
      accent="sky"
      showEnquiryCta
      ctaLabel="Browse categories"
      ctaHref="#product-catalog"
      title="Software licensing made simple for businesses."
      description="Microsoft, Adobe, Autodesk, Oracle, Corel, Apple, JetBrains, IBM, and antivirus suites — authorised licensing, GST-ready quotes, activation help, and renewal tracking."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Software licences" },
      ]}
    />
  );
}
