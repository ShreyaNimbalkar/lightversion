/**
 * Marketing and page copy — import here to keep tone consistent sitewide.
 */

import { site } from "@/data/site";

export const siteContent = {
  tagline: "Trusted IT partner in Pune since 2012",
  hero: {
    badge: `Trusted IT partner · Pune & PCMC · Since ${site.establishedYear}`,
    headline: "Technology services",
    titleAccent: "your business can rely on",
    description:
      "Online solutions to boost your business — repair & rental, networking, CCTV, WFH setups, and genuine software licences. 1,000+ happy customers in Pune & PCMC since 2012, with GST-ready billing and direct access to our engineers.",
    offeringsLabel: "What we provide",
    offerings: [
      {
        title: "Repair & rental",
        href: "/repair-rental",
        desc: "Laptop & desktop repair, upgrades, and short-term hardware rental.",
      },
      {
        title: "Networking",
        href: "/networking",
        desc: "Cabling, switches, NAS, IP telephony, and access control.",
      },
      {
        title: "CCTV services",
        href: "/cctv-services",
        desc: "IP cameras, NVR, PoE switching, and guard-station monitoring.",
      },
      {
        title: "WFH service",
        href: "/wfh-service",
        desc: "Remote-work laptops, home connectivity, and meeting peripherals.",
      },
      {
        title: "Software licensing",
        href: "/licenses",
        desc: "Microsoft, Adobe, Autodesk, antivirus, and other genuine software licences.",
      },
    ],
    ctaPrimary: "Get free quote",
    ctaSecondary: "Explore services",
    journeyTitle: "How it works",
    journeySteps: [
      { step: "1", title: "Tell us your need", desc: "Repair, rental, network, CCTV, or licences — pick a service or call us." },
      { step: "2", title: "Receive written scope", desc: "We share parts, labour, and timelines before work starts." },
      { step: "3", title: "Delivery & support", desc: "Workshop or on-site handover with GST invoice and follow-up." },
    ],
    trustStats: [
      { value: "1,000+", label: "Happy customers since 2012" },
      { value: String(site.establishedYear), label: "Serving Pune & PCMC" },
      { value: "2", label: "Workshop & walk-in shops" },
      { value: "GST", label: "Compliant invoicing" },
    ],
  },
  services: {
    sectionTitle: "Our service lines",
    sectionAccent: "Built for growing businesses",
    sectionIntro: `What we can do for your business — laptops, desktops, printers, routers, antivirus, CCTV, and licensed software. Browse by category, see indicative pricing, and request a written quotation. Serving Pune and PCMC since ${site.establishedYear}.`,
    cards: [
      {
        title: "Repair & rental",
        // eyebrow: "Workshop & interim hardware",
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
        // eyebrow: "Infrastructure",
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
        // eyebrow: "Security & surveillance",
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
        // eyebrow: "Remote workforce",
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
        // eyebrow: "Authorised distribution",
        desc: "Microsoft, Adobe, Autodesk, Oracle, Corel, Apple, JetBrains, and IBM — supplied with correct editions, seats, activation, and renewal tracking.",
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
    storyLead: `${site.brandName} has provided technical support, hardware, and networking in Pune since ${site.establishedYear}. Owned and operated by ${site.proprietor} — when you call, you speak to people who know your job, not an offshore call centre.`,
    storyDetail: `Repairs are handled at our Manikbaug workshop; walk in at Navi Peth for sales, licences, and enquiries. We supply new and rental laptops, desktops, networking hardware, CCTV, attendance systems, and Microsoft / Tally / Quick Heal licensing at competitive rates with GST documentation.`,
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
