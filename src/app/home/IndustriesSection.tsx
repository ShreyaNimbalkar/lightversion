"use client";

import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHospital,
  faGraduationCap,
  faBuilding,
  faStore,
  faIndustry,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";

import { site } from "@/data/site";

const industries = [
  {
    title: "Healthcare",
    icon: faHospital,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Modern hospital corridor",
    desc: "Secure guest Wi‑Fi, clinical workstation support, and CCTV coverage aligned to facility policies and audit requirements.",
  },

  {
    title: "Education",
    icon: faGraduationCap,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    imageAlt: "University lecture hall",
    desc: "Lab refreshes, classroom connectivity, and campus networks with scheduling that respects academic calendars.",
  },

  {
    title: "Corporate offices",
    icon: faBuilding,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Open plan corporate office",
    desc: "Moves, adds, and changes for growing teams — desk cabling, printers, Microsoft licensing, and handover documentation.",
  },

  {
    title: "Retail",
    icon: faStore,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Retail store interior",
    desc: "POS reliability, back-office connectivity, and surveillance systems designed around trading hours and loss-prevention needs.",
  },

  {
    title: "Manufacturing",
    icon: faIndustry,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Industrial facility and equipment",
    desc: "Plant-floor Wi‑Fi, ruggedised hardware, and office links with realistic SLAs for production-critical environments.",
  },

  {
    title: "Hospitality",
    icon: faHotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Hotel lobby reception",
    desc: "Guest internet segmentation, lobby security cameras, and after-hours support aligned to front-desk operations.",
  },
];

export default function IndustriesSection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/10 bg-section py-24 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
            Sectors served
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Industry-aligned
            <span className="text-brand"> IT delivery</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            Representative sectors where {site.brandName} routinely deploys infrastructure, support, and licensing — with
            documentation you can circulate internally before sign-off.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((item, index) => (
            <article
              key={index}
              className="group flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="relative h-40 w-full shrink-0 overflow-hidden border-b border-foreground/10">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-surface-deep/80 text-accent">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-foreground/55">
          Other verticals are supported on request. If your requirement involves
          cabling, networking, or Microsoft-based environments, we are happy to assess
          feasibility.
        </p>
      </div>
    </section>
  );
}
