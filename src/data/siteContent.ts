

import { site } from "@/data/site";

export const siteContent = {
  tagline: "Trusted IT partner in Pune since 2012",
  hero: {
    badge: `Trusted IT partner · Pune & PCMC · Since ${site.establishedYear}`,
    headline: "Technology services",
    titleAccent: "your business can rely on",
    description:
      "We repair and rent hardware, build office networks, deploy CCTV, equip remote teams, and supply genuine software — with written scope, GST-ready billing, and engineers who stay accountable through delivery.",
    offeringsLabel: "What we provide",
    offerings: [
      {
        title: "Repair & rental",
        desc: "Workshop repairs, upgrades, and interim devices",
        href: "/repair-rental",
      },
      {
        title: "Networking",
        desc: "Cabling, Wi‑Fi, NAS, voice, and access control",
        href: "/networking",
      },
      {
        title: "CCTV services",
        desc: "Cameras, NVR, and secure remote viewing",
        href: "/cctv-services",
      },
      {
        title: "WFH service",
        desc: "Home-office kits and connectivity",
        href: "/wfh-service",
      },
      {
        title: "Software licensing",
        desc: "Microsoft, Tally, and endpoint security",
        href: "/licenses",
      },
    ],
    ctaPrimary: "Request quotation",
    ctaSecondary: "View all services",
    trustStats: [
      { value: String(site.establishedYear), label: "Serving Pune since" },
      { value: "2", label: "Workshop & walk-in locations" },
      { value: "GST", label: "Compliant invoicing" },
    ],
  },
  services: {
    sectionTitle: "Our service lines",
    sectionAccent: "Built for growing businesses",
    sectionIntro: `Five focused practices — each with a published product catalogue, GST-ready documentation, and engineers who own the ticket from first call to sign-off. Serving Pune and PCMC since ${site.establishedYear}.`,
    cards: [
      {
        title: "Repair & rental",
        eyebrow: "Workshop & interim hardware",
        desc: "Component-level laptop and desktop repair, performance upgrades, and short-term device rental with clear return terms and serial-tracked invoices.",
        link: "/repair-rental",
        image:
          "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Technician diagnosing laptop hardware in workshop",
        enquiryInterest: "Repair & rental" as const,
        enquiryContext: "Home — Repair & rental",
      },
      {
        title: "Networking solutions",
        eyebrow: "Infrastructure",
        desc: "Structured cabling, switching, business Wi‑Fi, NAS, IP telephony, and attendance integration — installed with labelled ports and handover documentation.",
        link: "/networking",
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Network rack and structured cabling in office",
        enquiryInterest: "Networking & cabling" as const,
        enquiryContext: "Home — Networking",
      },
      {
        title: "CCTV services",
        eyebrow: "Security & surveillance",
        desc: "IP camera systems, NVR/DVR design, PoE switching, video door entry, and secure remote viewing — planned for coverage, retention, and network isolation.",
        link: "/cctv-services",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Security camera and surveillance monitor in office",
        enquiryInterest: "CCTV / security" as const,
        enquiryContext: "Home — CCTV services",
      },
      {
        title: "WFH service",
        eyebrow: "Remote workforce",
        desc: "Curated home-office kits: business laptops, connectivity, monitors, collaboration peripherals, and optional Microsoft 365 — deployed with imaging and support notes.",
        link: "/wfh-service",
        image:
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Professional home office workstation",
        enquiryInterest: "WFH service" as const,
        enquiryContext: "Home — WFH service",
      },
      {
        title: "Software licensing",
        eyebrow: "Authorised distribution",
        desc: "Microsoft 365, Windows, Tally, endpoint security, and advisory on server/CAL requirements — supplied with correct editions, seats, and renewal tracking.",
        link: "/licenses",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Business team reviewing software licensing documents",
        enquiryInterest: "Software licences" as const,
        enquiryContext: "Home — Software licensing",
      },
    ],
  },
  about: {
    features: [
      "Written estimates before billable workshop labour or on-site deployment",
      "Common parts stocked to reduce turnaround on laptop and desktop repairs",
      "Rack photos, port maps, and test records supplied with network and CCTV installs",
      "Licences sourced through authorised channels with GST documentation your finance team can file",
    ],
    stats: {
      relationships: "1,000+",
      callback: "24-hour",
      estimate: "Written scope",
    },
  },
  footer: {
  blurb:
      "Workshop repairs, infrastructure projects, surveillance, remote-work deployments, and genuine software licensing — led by experienced engineers with GST-ready paperwork.",
  },
} as const;
