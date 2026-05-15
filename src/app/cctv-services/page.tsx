import type { Metadata } from "next";

import CctvServicesHero from "@/app/cctv-services/CctvServicesHero";
import CctvServicesBody from "@/app/cctv-services/CctvServicesBody";

import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "CCTV services",
  description: `${site.brandName} — CCTV supply and installation in Pune & PCMC: IP cameras, NVR/DVR, PoE, video door phones, and documented handover.`,
};

export default function CctvServicesPage() {
  return (
    <>
      <CctvServicesHero />
      <CctvServicesBody />
    </>
  );
}
