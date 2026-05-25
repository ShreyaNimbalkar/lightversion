/**
 * Marketing and page copy — import here to keep tone consistent sitewide.
 */

import { site } from "@/data/site";

export const siteContent = {
  tagline: "Trusted IT partner in Pune since 2012",
  hero: {
    badge: `Trusted in Pune since ${site.establishedYear}`,
    headlineLines: ["IT support your", "business can rely on"],
    titleAccent: "in Pune & PCMC",
    description:
      "Laptop repair, office networking, CCTV, and genuine software — with clear quotes and engineers you can speak with directly.",
    highlights: [
      {
        title: `Since ${site.establishedYear}`,
        desc: "Local workshop & on-site visits in Pune",
      },
      {
        title: "1,000+",
        desc: "Homes and businesses served",
      },
      {
        title: "GST-ready",
        desc: "Written scope before work starts",
      },
    ],
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
    sectionTitle: "Our Core",
    sectionAccent: "Expertise.",
    sectionIntro:
      "Comprehensive IT infrastructure and support services designed for growth — hardware, networking, security, remote work, and licensed software.",
    cards: [
      {
        title: "Repair & rental",
        // tags: ["HARDWARE", "SUPPORT"],
        desc: "Expert maintenance for desktops and laptops.",
        link: "/repair-rental",
        image:
          "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Technician diagnosing laptop hardware in workshop",
        enquiryInterest: "Repair & rental" as const,
        enquiryContext: "Home — Repair & rental",
      },
      {
        title: "Networking solutions",
        tags: ["INFRASTRUCTURE", "SECURITY"],
        desc: "Networking, Wi-Fi, IP telephony & secure office connectivity.",
        link: "/networking",
        image:
          "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Network rack and structured cabling in office",
        enquiryInterest: "Networking & cabling" as const,
        enquiryContext: "Home — Networking",
      },
      {
        title: "CCTV services",
        // tags: ["SECURITY", "INFRASTRUCTURE"],
        desc: "CCTV surveillance, video door systems & secure remote monitoring.",
        link: "/cctv-services",
        image:
          "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Security camera and surveillance monitor in office",
        enquiryInterest: "CCTV / security" as const,
        enquiryContext: "Home — CCTV services",
      },
      {
        title: "WFH service",
        // tags: ["REMOTE", "SUPPORT"],
        desc: "WFH setups with laptops, monitors, connectivity & collaboration tools.",
        link: "/wfh-service",
        image:
          "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1000&auto=format&fit=crop",
        imageAlt: "Professional home office workstation",
        enquiryInterest: "WFH service" as const,
        enquiryContext: "Home — WFH service",
      },
      {
        title: "Software licensing",
        // tags: ["COMPLIANCE", "SOFTWARE"],
        desc: "Software licensing & activation support.",
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
