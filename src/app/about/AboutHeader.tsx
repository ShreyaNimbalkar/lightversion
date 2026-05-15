"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function AboutHeader() {
  return (
    <PageServiceHero
      title={`About ${site.brandName} — grounded IT for Pune businesses.`}
      description={`Since ${site.establishedYear}, ${site.proprietor} has built ${site.brandName} around workshop quality, honest timelines, and field work you can expense without embarrassment in a board meeting.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "About us" },
      ]}
    />
  );
}
