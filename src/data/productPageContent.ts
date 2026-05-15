import type { ServiceCatalogItem, ServiceProductInterest } from "@/data/serviceProductLists";

import { site } from "@/data/site";

import type { ProductHighlightCard } from "@/data/serviceProductLists";

export type ProductPageContent = {
  intro: string;
  specs: string[];
  highlights: ProductHighlightCard[];
};

function defaultHighlights(productName: string): ProductHighlightCard[] {
  return [
    {
      title: "Transparent quotation",
      body: `Pricing for ${productName} is itemised with hardware, labour, and taxes shown separately before you approve.`,
    },
    {
      title: "Professional handover",
      body: "Serial numbers, configuration notes, and warranty terms are recorded at delivery or installation.",
    },
    {
      title: "Local support",
      body: `${site.brandName} maintains service history at our Pune workshop and field teams for faster follow-up.`,
    },
  ];
}

export function getProductPageContent(item: ServiceCatalogItem): ProductPageContent {
  return {
    intro: item.overview,
    specs: item.specs,
    highlights: item.highlights.length > 0 ? item.highlights : defaultHighlights(item.name),
  };
}

/** @deprecated — specs now live on catalogue items; kept for type re-exports */
export function interestSpecs(interest: ServiceProductInterest): string[] {
  switch (interest) {
    case "Repair & rental":
      return [
        "Fault diagnosis with written estimate before parts are ordered",
        "Workshop ticket reference for status updates and warranty claims",
        "Loan devices available subject to stock and return agreement",
        "GST invoice listing part serials and labour charges",
        "Pickup and drop at Sinhagad Road workshop or Navi Peth walk-in",
      ];
    case "Networking & cabling":
      return [
        "Structured cabling tested to TIA/EIA practices where applicable",
        "Switch port maps and rack photographs included on handover",
        "Guest and corporate VLAN separation planned with your IT policy",
        "PoE budget validated for phones, cameras, and access points",
        "Spare patch leads and labels supplied for future moves",
      ];
    case "CCTV / security":
      return [
        "Camera placement survey for coverage, glare, and night performance",
        "Retention days calculated from resolution, channels, and drive size",
        "Remote access via secure methods without exposing internal servers",
        "Cable routes documented with conduit and trunking as required",
        "User training on playback, export, and password hygiene",
      ];
    case "Software licences":
      return [
        "Edition, seat count, and renewal date confirmed on every order",
        "Activation keys or tenant setup coordinated with your admin",
        "GST-compliant tax invoice suitable for statutory filing",
        "Upgrade paths explained when Microsoft or vendor SKUs change",
        "Renewal reminders aligned to your finance calendar",
      ];
    case "WFH service":
      return [
        "Standard build image with VPN, antivirus, and collaboration tools",
        "Home router or mesh sizing for concurrent video meetings",
        "Peripheral bundle: display, webcam, headset, and UPS options",
        "Loan versus purchase terms documented with return checkpoints",
        "Remote troubleshooting notes for your internal IT helpdesk",
      ];
    default:
      return [];
  }
}
