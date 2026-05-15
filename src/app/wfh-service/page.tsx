import type { Metadata } from "next";

import WfhServiceHero from "@/app/wfh-service/WfhServiceHero";
import WfhServiceBody from "@/app/wfh-service/WfhServiceBody";

import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "WFH service",
  description: `${site.brandName} — work-from-home kits in Pune & PCMC: laptops, home Wi‑Fi, monitors, headsets, and Microsoft 365 with GST-ready paperwork.`,
};

export default function WfhServicePage() {
  return (
    <>
      <WfhServiceHero />
      <WfhServiceBody />
    </>
  );
}
