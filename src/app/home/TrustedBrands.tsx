"use client";

import Image from "next/image";

import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/data/site";

const brands = [
  { name: "Acer", logo: "/acer-laptop-logo-8.07.39-PM.webp" },
  { name: "Asus", logo: "/asus-laptop-logo.webp" },
  { name: "HP", logo: "/hp.webp" },
  { name: "Lenovo", logo: "/lenovo-laptop-logo.png" },
  { name: "Microsoft", logo: "/microsoft-laptop-logo.webp" },
  { name: "Intel", logo: "/intel-laptop-logo.png" },
];

export default function TrustedBrands() {
  const row = [...brands, ...brands];

  return (
    <PageSection border="top" className="!py-10 sm:!py-12">
      <SectionHeader
        eyebrow="Brands we work with"
        title="OEM hardware & software we service"
        description={`Independent ${site.brandName} — logos belong to their owners.`}
      />

      <div className="relative mt-8 overflow-hidden">
        <div className="flex w-max animate-marquee-scroll gap-10 sm:gap-14">
          {row.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex h-12 w-28 shrink-0 items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-32"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={48}
                className="h-8 w-auto max-w-full object-contain sm:h-10"
              />
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
}
