"use client";

import Image from "next/image";

import { site } from "@/data/site";

const brands = [
  { name: "Acer", logo: "/acer-laptop-logo-8.07.39-PM.webp" },
  { name: "Asus", logo: "/asus-laptop-logo.webp" },
  { name: "HP", logo: "/hp.webp" },
  { name: "IBall", logo: "/iball-laptop-logo.webp" },
  { name: "Intel", logo: "/intel-laptop-logo.png" },
  { name: "Lenovo", logo: "/lenovo-laptop-logo.png" },
  { name: "Microsoft", logo: "/microsoft-laptop-logo.webp" },
  { name: "MSI", logo: "/msi-laptop-logo.webp" },
  { name: "Sony Vaio", logo: "/sony-vaio-laptop-logo.png" },
  { name: "Toshiba", logo: "/toshiba-laptop-logo.png" },
];

export default function TrustedBrands() {
  const row = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden border-y border-foreground/10 bg-section py-16 text-foreground">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
            OEM & platform coverage
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Hardware brands we service regularly
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-foreground/70">
            Logos remain the property of their respective owners. {site.brandName} is an independent service provider — we
            stock common spares where it shortens your downtime, and we are honest when a part has to come from the OEM.
          </p>
        </div>

        <div className="relative mt-12 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-section to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-section to-transparent" />

          <div className="flex w-max gap-4 animate-marquee-scroll">
            {row.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex h-[120px] w-[200px] shrink-0 items-center justify-center rounded-xl border border-foreground/10 bg-card px-5 shadow-sm transition-shadow duration-200 hover:border-brand/20 hover:shadow-md"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={130}
                  height={52}
                  className="object-contain opacity-90 grayscale transition duration-200 hover:opacity-100 hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-foreground/55">
          Other manufacturers are diagnosed on request; lead times depend on parts
          availability from authorised supply channels.
        </p>
      </div>
    </section>
  );
}
