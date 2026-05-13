"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function PrivacyPolicyHeader() {
  return (
    <PageServiceHero
      tag="Privacy & data"
      title={
        <h1 className="text-[1.65rem] font-black leading-tight text-foreground sm:text-3xl md:text-5xl">
          Your privacy
          <span className="block text-brand">matters to us</span>
        </h1>
      }
      description={`${site.brandName} collects only what we need to respond to enquiries, deliver services, and meet legal obligations. This page explains what we hold, how we use it, and how you can reach us with questions.`}
      highlights={[
        "Contact and enquiry data used only to respond and quote",
        "No sale of personal data to third-party marketers",
        "Reasonable safeguards on workshop and office systems",
        "Policy updates published on this page with a clear date",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Privacy policy" },
      ]}
    />
  );
}
