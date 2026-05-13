"use client";

import PageServiceHero from "@/components/PageServiceHero";

import { site } from "@/data/site";

export default function AboutHeader() {
  return (
    <PageServiceHero
      tag={`About ${site.brandName}`}
      title={
        <h1 className="text-[1.65rem] font-black leading-tight text-foreground sm:text-3xl md:text-5xl">
          Grounded IT
          <span className="block text-brand">for Pune businesses</span>
        </h1>
      }
      description={`Since ${site.establishedYear}, ${site.proprietor} has built ${site.brandName} around workshop quality, honest timelines, and field work you can expense without embarrassment in a board meeting.`}
      highlights={[
        "Workshop repairs with ticket notes you can forward",
        "Structured cabling & Wi‑Fi with labelled handover packs",
        "Genuine Microsoft, Tally, and security licensing",
        "Field engineers who answer their phones during business hours",
      ]}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Services", href: "/#services" },
        { label: "About us" },
      ]}
    />
  );
}
