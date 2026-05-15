"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function PrivacyPolicyHeader() {
  return (
    <PageServiceHero
      title="Your privacy matters to us."
      description={`${site.brandName} collects only what we need to respond to enquiries, deliver services, and meet legal obligations. This page explains what we hold, how we use it, and how you can reach us with questions.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "Privacy policy" },
      ]}
    />
  );
}
