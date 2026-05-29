import { site } from "@/data/site";

export type ServiceProductInterest =
  | "Repair & rental"
  | "Networking & cabling"
  | "Software licences"
  | "CCTV / security"
  | "WFH service";

export type ProductHighlightCard = {
  title: string;
  /** Short intro under the title (e.g. plan description). */
  body?: string;
  subtitle?: string;
  price?: string;
  priceNote?: string;
  /** Spec or feature rows shown in the card list. */
  features?: string[];
};

/** Maps to FontAwesome in ServiceProductCatalog */
export type CatalogIconKey =
  | "laptop"
  | "desktop"
  | "network"
  | "cctv"
  | "wifi"
  | "server"
  | "desk"
  | "phone"
  | "attendance"
  | "lock"
  | "m365"
  | "windows"
  | "tally"
  | "shield"
  | "office"
  | "adobe"
  | "globe"
  | "oracle"
  | "autodesk"
  | "corel"
  | "apple"
  | "jetbrains"
  | "ibm";

export type ServiceCatalogItem = {
  name: string;
  slug: string;
  iconKey: CatalogIconKey;
  image: string;
  imageAlt: string;
  defaultInterest: ServiceProductInterest;
  enquiryTag: string;
  /** Short line on catalogue cards */
  summary: string;
  /** Indicative starting price, e.g. "From ₹2,499" */
  priceFrom: string;
  priceNote?: string;
  overview: string;
  specs: string[];
  highlights: ProductHighlightCard[];
};

export type ServiceCatalogCategory = {
  title: string;
  slug: string;
  description?: string;
  iconKey: CatalogIconKey;
  /** Category card image (defaults to first product image). */
  image: string;
  imageAlt: string;
  /** Short feature pills on category catalogue cards. */
  featureBadges: string[];
  items: ServiceCatalogItem[];
};

type ServiceCatalogCategoryInput = Omit<
  ServiceCatalogCategory,
  "slug" | "iconKey" | "image" | "imageAlt" | "featureBadges"
> & {
  slug?: string;
  iconKey?: CatalogIconKey;
  image?: string;
  imageAlt?: string;
  featureBadges?: string[];
};

function pubAsset(...pathParts: string[]): string {
  return `/${pathParts.map((part) => encodeURIComponent(part)).join("/")}`;
}

/** Maps each service line to its folder under /public. */
const PRODUCT_IMAGE_FOLDER: Partial<Record<ServiceProductInterest, string>> = {
  "Repair & rental": "repair",
  "Networking & cabling": "network",
  "CCTV / security": "cctv",
  "Software licences": "licenses",
};

const FALLBACK_PRODUCT_IMAGE = pubAsset("repair", "Business laptop rental.jpg");

/**
 * Filenames in /public when they differ from "{enquiryTag}.jpg".
 * Values starting with "/" are used as-is (encoded).
 */
const PRODUCT_IMAGE_FILE_BY_SLUG: Record<string, string> = {
  // repair — filename differs from enquiry tag
  "laptop-display-replacement": "Laptop Screen Replacement.jpg",
  "laptop-battery-service": "Laptop Battery.jpg",
  "keyboard-and-trackpad-repair": "Keyboard replacement.jpg",
  "ssd-and-storage-upgrade-laptop": "SSD.jpg",
  "ram-expansion-laptop": "RAM expansion.jpg",
  "desktop-memory-upgrade": "Desktop memory.jpg",
  "ssd-and-hdd-installation-desktop": "SSD & HDD installation.jpg",
  "motherboard-and-power-repair": "PC Cleaning Service.jpg",
  "sip-intercom-and-paging": "SIP intercom & paging.jpg",
  "outdoor-bullet-ip-cameras": "Outdoor bullet cameras.jpg",
  "panoramic-and-fisheye-cameras": "Panoramic & fisheye cameras.jpg",
  // wfh — add /public/wfh/ and matching .jpg files to use dedicated images
  "wfh-laptop-packages": pubAsset("repair", "Business laptop rental.jpg"),
  "wfh-desktop-setups": pubAsset("repair", "Desktop PC rental.jpg"),
  "dual-monitor-kits": pubAsset("repair", "Monitor & dock rental.jpg"),
  "business-home-routers": pubAsset("network", "Managed network switches.jpg"),
  "mesh-wifi-systems": pubAsset("network", "Cat6 structured cabling.jpg"),
  "vpn-router-configuration": pubAsset("network", "Managed network switches.jpg"),
  "structured-home-cabling": pubAsset("network", "Cat6 structured cabling.jpg"),
  "hd-webcams-and-lighting": pubAsset("repair", "Monitor & dock rental.jpg"),
  "uc-headsets": pubAsset("network", "Conference room phones.jpg"),
  "speakerphones-for-home": pubAsset("network", "Conference room phones.jpg"),
  "desk-power-protection": pubAsset("repair", "Server & NAS loan.jpg"),
};

function resolveProductImage(
  slug: string,
  enquiryTag: string,
  interest: ServiceProductInterest,
): string {
  const override = PRODUCT_IMAGE_FILE_BY_SLUG[slug];
  if (override?.startsWith("/")) {
    return override;
  }

  const folder = PRODUCT_IMAGE_FOLDER[interest];
  if (!folder) {
    return FALLBACK_PRODUCT_IMAGE;
  }

  const fileName = override ?? `${enquiryTag}.jpg`;
  return pubAsset(folder, fileName);
}

function catalogItemSlug(enquiryTag: string): string {
  return enquiryTag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categorySlugFromTitle(title: string): string {
  return catalogItemSlug(title);
}

const DEFAULT_PRICE = {
  from: "Quote on request",
  note: "+ GST · final amount after scope confirmation",
} as const;

/** Indicative catalogue pricing — confirmed on written quotation */
const PRICE_BY_SLUG: Record<string, { from: string; note?: string }> = {
  "laptop-display-replacement": { from: "From ₹2,499", note: "+ panel cost & GST" },
  "laptop-battery-service": { from: "From ₹1,899", note: "+ battery & GST" },
  "keyboard-and-trackpad-repair": { from: "From ₹1,499", note: "+ parts & GST" },
  "ssd-and-storage-upgrade-laptop": { from: "From ₹999", note: "+ SSD capacity & GST" },
  "ram-expansion-laptop": { from: "From ₹799", note: "+ RAM module & GST" },
  "desktop-memory-upgrade": { from: "From ₹799", note: "+ RAM module & GST" },
  "ssd-and-hdd-installation-desktop": { from: "From ₹999", note: "+ drive & GST" },
  "motherboard-and-power-repair": { from: "From ₹1,499", note: "Diagnosis + parts extra" },
  "workstation-gpu-service": { from: "From ₹1,999", note: "Labour + parts extra" },
  "business-laptop-rental": { from: "From ₹800/day", note: "Weekly & monthly rates available" },
  "desktop-pc-rental": { from: "From ₹600/day", note: "Monitor bundle optional" },
  "microsoft-365": { from: "From ₹125/user/mo", note: "Plan-dependent · GST extra" },
  "windows-11": { from: "From ₹15,499", note: "OEM / volume pricing" },
  "microsoft-azure": { from: "Quote on request", note: "Consumption or commitment · GST extra" },
  "adobe-creative-cloud": { from: "From ₹1,999/user/mo", note: "All Apps vs single-app · GST extra" },
  "autocad": { from: "Quote on request", note: "Subscription term · GST extra" },
  "oracle-database": { from: "Quote on request", note: "Processor or NUP licensing" },
  "coreldraw-graphics-suite": { from: "Quote on request", note: "Perpetual or subscription" },
  "final-cut-pro": { from: "Quote on request", note: "Mac App Store / volume" },
  "intellij-idea": { from: "From ₹599/mo", note: "Individual vs commercial · GST extra" },
  "ibm-spss": { from: "Quote on request", note: "Edition & modules · GST extra" },
  "quick-heal-total-security": { from: "From ₹1,099/device/yr", note: "Multi-device packs available" },
  "kaspersky-endpoint-security": { from: "From ₹1,499/device/yr", note: "Endpoint & server tiers · GST extra" },
  "norton-360": { from: "From ₹999/device/yr", note: "Device packs · GST extra" },
  "eset-endpoint-antivirus": { from: "From ₹1,299/device/yr", note: "Business edition · GST extra" },
};

function resolvePricing(slug: string): { from: string; note?: string } {
  return PRICE_BY_SLUG[slug] ?? DEFAULT_PRICE;
}

export function shortenFeatureLabel(text: string, max = 36): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trim()}…`;
}

export function featureBadgesFromSpecs(specs: string[], limit = 3): string[] {
  const badges: string[] = [];
  for (const spec of specs) {
    const label = shortenFeatureLabel(spec);
    if (!badges.includes(label)) badges.push(label);
    if (badges.length >= limit) break;
  }
  return badges;
}

function deriveCategoryFeatureBadges(category: ServiceCatalogCategoryInput): string[] {
  if (category.featureBadges?.length) {
    return category.featureBadges.slice(0, 4).map((b) => shortenFeatureLabel(b, 40));
  }

  const badges: string[] = [];
  for (const item of category.items) {
    for (const spec of item.specs) {
      const label = shortenFeatureLabel(spec);
      if (!badges.includes(label)) badges.push(label);
      if (badges.length >= 3) return badges;
    }
  }

  if (badges.length > 0) return badges;

  return ["Written quotation", "GST invoicing", "Pune & PCMC"];
}

function finalizeCatalog(input: ServiceCatalogCategoryInput[]): ServiceCatalogCategory[] {
  return input.map((category) => {
    const first = category.items[0];
    return {
      ...category,
      slug: category.slug ?? categorySlugFromTitle(category.title),
      iconKey: category.iconKey ?? first?.iconKey ?? "network",
      image: category.image ?? first?.image ?? FALLBACK_PRODUCT_IMAGE,
      imageAlt: category.imageAlt ?? first?.imageAlt ?? category.title,
      featureBadges: deriveCategoryFeatureBadges(category),
      items: category.items,
    };
  });
}

function productCopy(
  name: string,
  categoryTitle: string,
  serviceLine: string,
  specs: string[],
  ): Pick<ServiceCatalogItem, "overview" | "specs" | "highlights"> {
  return {
    overview: `${name} is part of our ${categoryTitle} catalogue under ${serviceLine}. ${site.brandName} supplies and supports organisations in Pune and PCMC with written quotations, GST-compliant invoicing, and accountable delivery. Use Enquiry for technical clarification or Request quotation for bundled deployments.`,
    specs,
    highlights: [
      {
        title: "Clear commercial terms",
        body: `Hardware, labour, and licensing for ${name} are quoted separately so finance can approve with confidence.`,
      },
      {
        title: "Tested delivery",
        body: "Equipment is configured, burn-in tested, or workshop-QC checked before handover to your team.",
      },
      {
        title: "Continuity of support",
        body: `Service records are maintained at our Pune locations for renewals, RMA, and future expansion.`,
      },
    ],
  };
}

function card(
  name: string,
  iconKey: CatalogIconKey,
  _imageKey: string,
  imageAlt: string,
  enquiryTag: string,
  defaultInterest: ServiceProductInterest,
  categoryTitle: string,
  serviceLine: string,
  specs: string[],
  pricing?: { priceFrom?: string; priceNote?: string },
): ServiceCatalogItem {
  const slug = catalogItemSlug(enquiryTag);
  const copy = productCopy(name, categoryTitle, serviceLine, specs);
  const resolved = resolvePricing(slug);
  return {
    name,
    slug,
    iconKey,
    image: resolveProductImage(slug, enquiryTag, defaultInterest),
    imageAlt,
    enquiryTag,
    defaultInterest,
    summary: specs[0] ?? name,
    priceFrom: pricing?.priceFrom ?? resolved.from,
    priceNote: pricing?.priceNote ?? resolved.note,
    ...copy,
  };
}

const RR = "Repair & rental" as const;
const NW = "Networking & cabling" as const;
const CV = "CCTV / security" as const;
const SL = "Software licences" as const;
const WFH = "WFH service" as const;
const RR_LINE = "Repair & rental";
const NW_LINE = "Networking solutions";
const CV_LINE = "CCTV services";
const WFH_LINE = "WFH service";
const SL_LINE = "Software licensing";

const repairRentalCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Laptop Repair Services",
    description:
      "Business laptop repair, upgrades, replacement parts, and performance optimisation.",
    items: [
      card(
        "Laptop display replacement",
        "laptop",
        "laptop",
        "Laptop LCD panel replacement",
        "Laptop display replacement",
        RR,
        "Laptop Repair Services",
        RR_LINE,
        [
          "Screen Replacement",
          "LED/LCD Panels",
          "Dead Pixel Fix",
          "Display Cable Repair",
          "Business Laptops",
        ],
      ),

      card(
        "Laptop battery replacement",
        "laptop",
        "laptop",
        "Laptop battery replacement",
        "Laptop battery replacement",
        RR,
        "Laptop Repair Services",
        RR_LINE,
        [
          "Battery Replacement",
          "Charging Issues",
          "OEM Batteries",
          "Power Backup Fix",
          "Battery Health Check",
        ],
      ),

      card(
        "Keyboard & trackpad repair",
        "laptop",
        "laptop",
        "Laptop keyboard repair",
        "Keyboard and trackpad repair",
        RR,
        "Laptop Repair Services",
        RR_LINE,
        [
          "Keyboard Replacement",
          "Trackpad Repair",
          "Liquid Damage Fix",
          "Key Issues",
          "Internal Cleaning",
        ],
      ),

      card(
        "SSD & storage upgrade",
        "laptop",
        "laptop",
        "Laptop SSD upgrade",
        "SSD and storage upgrade laptop",
        RR,
        "Laptop Repair Services",
        RR_LINE,
        [
          "SSD Upgrade",
          "HDD to SSD",
          "Data Migration",
          "Performance Boost",
          "Storage Expansion",
        ],
      ),

      card(
        "RAM expansion",
        "laptop",
        "laptop",
        "Laptop RAM upgrade",
        "RAM expansion laptop",
        RR,
        "Laptop Repair Services",
        RR_LINE,
        [
          "RAM Upgrade",
          "Performance Upgrade",
          "DDR4 / DDR5",
          "Multitasking Boost",
          "Memory Installation",
        ],
      ),
    ],
  },

  {
    title: "Desktop Repair Services",
    description:
      "Desktop repair, hardware replacement, upgrades, cleaning, and workstation servicing.",
    items: [
      card(
        "Desktop memory upgrade",
        "desktop",
        "desktop",
        "Desktop RAM upgrade",
        "Desktop memory upgrade",
        RR,
        "Desktop Repair Services",
        RR_LINE,
        [
          "RAM Upgrade",
          "Performance Boost",
          "Desktop Optimization",
          "DDR4 / DDR5",
          "Memory Installation",
        ],
      ),

      card(
        "SSD & HDD installation",
        "desktop",
        "desktop",
        "Desktop storage upgrade",
        "SSD and HDD installation desktop",
        RR,
        "Desktop Repair Services",
        RR_LINE,
        [
          "SSD Installation",
          "HDD Upgrade",
          "Storage Expansion",
          "OS Installation",
          "Data Migration",
        ],
      ),

      card(
        "Motherboard & power repair",
        "desktop",
        "desktop",
        "Desktop motherboard service",
        "Motherboard and power repair",
        RR,
        "Desktop Repair Services",
        RR_LINE,
        [
          "Motherboard Repair",
          "SMPS Repair",
          "No Display Fix",
          "Power Issue Repair",
          "Component Diagnosis",
        ],
      ),

      card(
        "Workstation GPU service",
        "desktop",
        "desktop",
        "Desktop graphics card service",
        "Workstation GPU service",
        RR,
        "Desktop Repair Services",
        RR_LINE,
        [
          "GPU Repair",
          "Graphics Upgrade",
          "Workstation Support",
          "Thermal Cleaning",
          "Rendering Systems",
        ],
      ),
    ],
  },

  {
    title: "Rental Products",
    description:
      "Business IT rental products for offices, events, training, and temporary workforce setup.",
    items: [
      card(
        "Business laptop rental",
        "laptop",
        "laptop",
        "Business laptop on rent",
        "Business laptop rental",
        RR,
        "Rental Products",
        RR_LINE,
        [
          "Laptop Rental",
          "i5 / i7 Systems",
          "Short & Long Term",
          "Corporate Use",
          "Ready-to-Deploy",
        ],
      ),

      card(
        "Desktop PC rental",
        "desktop",
        "desktop",
        "Desktop computer rental",
        "Desktop PC rental",
        RR,
        "Rental Products",
        RR_LINE,
        [
          "Desktop Rental",
          "Office PCs",
          "Training Setup",
          "Temporary Workforce",
          "Business Deployment",
        ],
      ),

      card(
        "Monitor & dock rental",
        "desk",
        "desk",
        "Monitor and docking station rental",
        "Monitor and dock rental",
        RR,
        "Rental Products",
        RR_LINE,
        [
          "Monitor Rental",
          "Docking Stations",
          "Dual Monitor Setup",
          "Workstation Expansion",
          "Plug & Play",
        ],
      ),

      card(
        "Printer rental",
        "office",
        "office",
        "Printer rental service",
        "Printer rental",
        RR,
        "Rental Products",
        RR_LINE,
        [
          "Printer Rental",
          "Laser Printers",
          "Office Printing",
          "Short-Term Rental",
          "AMC Available",
        ],
      ),

      card(
        "Server & NAS rental",
        "server",
        "server",
        "Server rental service",
        "Server and NAS rental",
        RR,
        "Rental Products",
        RR_LINE,
        [
          "Server Rental",
          "NAS Storage",
          "Backup Servers",
          "Business Data Setup",
          "Enterprise Hardware",
        ],
      ),
    ],
  },

  {
    title: "Data Recovery Services",
    description:
      "Professional recovery of deleted, corrupted, or inaccessible business data from laptops and desktops.",
    items: [
      card(
        "Hard drive data recovery",
        "desktop",
        "desktop",
        "Hard drive recovery service",
        "Hard drive data recovery",
        RR,
        "Data Recovery Services",
        RR_LINE,
        [
          "Deleted File Recovery",
          "HDD Recovery",
          "Corrupt Disk Repair",
          "Business Data",
          "Secure Recovery",
        ],
      ),

      card(
        "SSD data recovery",
        "desktop",
        "desktop",
        "SSD recovery service",
        "SSD data recovery",
        RR,
        "Data Recovery Services",
        RR_LINE,
        [
          "SSD Recovery",
          "NVMe Drives",
          "Formatted Drive Recovery",
          "Critical Data",
          "Secure Process",
        ],
      ),

      card(
        "Laptop data recovery",
        "laptop",
        "laptop",
        "Laptop recovery service",
        "Laptop data recovery",
        RR,
        "Data Recovery Services",
        RR_LINE,
        [
          "Laptop Recovery",
          "OS Crash Recovery",
          "File Restoration",
          "Business Documents",
          "Emergency Support",
        ],
      ),
    ],
  },
];
export const repairRentalCatalog = finalizeCatalog(repairRentalCatalogInput);

const networkingCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Structured cabling & switching",
    description:
      "Cat6/Cat6A cabling, managed switching, fibre backbone, and rack deployment for office networks.",
    items: [
      card(
        "Managed network switches",
        "network",
        "network",
        "Managed network switch",
        "Managed network switches",
        NW,
        "Structured cabling & switching",
        NW_LINE,
        ["Gigabit", "VLAN", "PoE", "Rack", "SFP"],
      ),

      card(
        "Cat6 structured cabling",
        "network",
        "network",
        "Cat6 structured cabling",
        "Cat6 structured cabling",
        NW,
        "Structured cabling & switching",
        NW_LINE,
        ["Fluke", "Conduits", "Labelling", "Diagrams", "Compliance"],
      ),

      card(
        "Fiber backbone links",
        "network",
        "network",
        "Fiber optic cabling",
        "Fiber backbone links",
        NW,
        "Structured cabling & switching",
        NW_LINE,
        ["Singlemode", "Splicing", "OTDR", "Converters", "Backbone"],
      ),

      card(
        "Network rack build-out",
        "server",
        "server",
        "Network equipment rack",
        "Network rack build-out",
        NW,
        "Structured cabling & switching",
        NW_LINE,
        ["42U", "PDU", "Cooling", "Earthing", "Documentation"],
      ),
    ],
  },

  {
    title: "Servers, NAS & backup",
    description:
      "NAS storage, backup systems, RAID setup, and cloud backup solutions for businesses.",
    items: [
      card(
        "Synology & QNAP NAS",
        "server",
        "server",
        "NAS storage system",
        "Synology and QNAP NAS",
        NW,
        "Servers, NAS & backup",
        NW_LINE,
        ["RAID", "Snapshots", "Permissions", "UPS", "Remote"],
      ),

      card(
        "Cloud backup gateway",
        "server",
        "server",
        "Hybrid cloud backup",
        "Cloud backup gateway",
        NW,
        "Servers, NAS & backup",
        NW_LINE,
        ["Backup", "Encryption", "Retention", "Recovery", "Bandwidth"],
      ),
    ],
  },

  {
    title: "IP telephony & conferencing",
    description:
      "VoIP phones, SIP systems, conference devices, and office communication deployment.",
    items: [
      card(
        "IP desk phones",
        "phone",
        "phone",
        "IP desk phone",
        "IP desk phones",
        NW,
        "IP telephony & conferencing",
        NW_LINE,
        ["PoE", "Extensions", "QoS", "Hotdesk", "Training"],
      ),

      card(
        "VoIP gateways",
        "phone",
        "phone",
        "VoIP gateway appliance",
        "VoIP gateways",
        NW,
        "IP telephony & conferencing",
        NW_LINE,
        ["FXO", "Failover", "Echo", "Firmware", "Maintenance"],
      ),

      card(
        "Conference room phones",
        "phone",
        "phone",
        "Conference speakerphone",
        "Conference room phones",
        NW,
        "IP telephony & conferencing",
        NW_LINE,
        ["Microphones", "Bluetooth", "Teams", "Acoustics", "Boardroom"],
      ),

      card(
        "SIP intercom & paging",
        "phone",
        "phone",
        "SIP intercom system",
        "SIP intercom and paging",
        NW,
        "IP telephony & conferencing",
        NW_LINE,
        ["Intercom", "Paging", "Announcements", "VLAN", "Testing"],
      ),
    ],
  },

  {
    title: "Attendance & access control",
    description:
      "Biometric attendance, RFID systems, visitor management, and access control deployment.",
    items: [
      card(
        "Biometric time terminals",
        "attendance",
        "attendance",
        "Biometric attendance terminal",
        "Biometric time terminals",
        NW,
        "Attendance & access control",
        NW_LINE,
        ["Fingerprint", "Shifts", "CSV", "PoE", "Alerts"],
      ),

      card(
        "Face recognition attendance",
        "attendance",
        "attendance",
        "Face recognition terminal",
        "Face recognition attendance",
        NW,
        "Attendance & access control",
        NW_LINE,
        ["FaceID", "Liveness", "Consent", "HRMS", "Fallback"],
      ),

      card(
        "RFID card readers",
        "attendance",
        "attendance",
        "RFID attendance reader",
        "RFID card readers",
        NW,
        "Attendance & access control",
        NW_LINE,
        ["RFID", "Passback", "Visitors", "Offline", "AMC"],
      ),

      card(
        "Visitor management kiosk",
        "attendance",
        "attendance",
        "Visitor management system",
        "Visitor management kiosk",
        NW,
        "Attendance & access control",
        NW_LINE,
        ["Badges", "Notifications", "NDA", "Evacuation", "Branding"],
      ),
    ],
  },
];

export const networkingCatalog = finalizeCatalog(networkingCatalogInput);

const cctvCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "IP cameras",
    description: "Dome, bullet, and varifocal models selected for scene, lighting, and storage budget.",
    items: [
      card(
        "Indoor dome IP cameras",
        "cctv",
        "cctv",
        "Indoor dome IP camera",
        "Indoor dome IP cameras",
        CV,
        "IP cameras",
        CV_LINE,
        ["WDR", "PoE", "Privacy", "ONVIF", "NightVision"]
      ),

      card(
        "Outdoor bullet cameras",
        "cctv",
        "cctv",
        "Outdoor bullet IP camera",
        "Outdoor bullet IP cameras",
        CV,
        "IP cameras",
        CV_LINE,
        ["IP66", "Infrared", "Vandalproof", "Lightning", "WideAngle"]
      ),

      card(
        "Motorised varifocal cameras",
        "cctv",
        "cctv",
        "Varifocal IP camera",
        "Motorised varifocal cameras",
        CV,
        "IP cameras",
        CV_LINE,
        ["Zoom", "Focus", "Presets", "Bandwidth", "Calibration"]
      ),

      card(
        "Panoramic & fisheye cameras",
        "cctv",
        "cctv",
        "Fisheye surveillance camera",
        "Panoramic and fisheye cameras",
        CV,
        "IP cameras",
        CV_LINE,
        ["360View", "Dewarping", "Ceiling", "SingleCable", "DigitalPTZ"]
      ),
    ],
  },

  {
    title: "Recording & infrastructure",
    description: "NVR/DVR platforms, surveillance drives, and PoE switching sized for retention targets.",
    items: [
      card(
        "Network video recorders",
        "cctv",
        "cctv",
        "NVR recorder",
        "Network video recorders",
        CV,
        "Recording & infrastructure",
        CV_LINE,
        ["Channels", "RAID", "HTTPS", "Alerts", "UPS"]
      ),

      card(
        "Surveillance hard drives",
        "cctv",
        "cctv",
        "Surveillance HDD",
        "Surveillance hard drives",
        CV,
        "Recording & infrastructure",
        CV_LINE,
        ["24x7", "RAID", "SMART", "Backup", "RMA"]
      ),

      card(
        "PoE switches for CCTV",
        "network",
        "network",
        "PoE switch CCTV",
        "PoE switches for CCTV",
        CV,
        "Recording & infrastructure",
        CV_LINE,
        ["PoE", "VLAN", "Extended", "LoopGuard", "PatchPanel"]
      ),
    ],
  },

  {
    title: "Door entry & monitoring",
    description: "Video door phones, guard monitors, and display walls for reception and security desks.",
    items: [
      card(
        "Guard station monitors",
        "cctv",
        "cctv",
        "Security monitor station",
        "Guard station monitors",
        CV,
        "Door entry & monitoring",
        CV_LINE,
        ["WallMount", "HDMI", "BurnProtection", "NVRSync", "Operator"]
      ),

      card(
        "Public view displays",
        "desk",
        "desk",
        "CCTV display monitor",
        "Public view displays",
        CV,
        "Door entry & monitoring",
        CV_LINE,
        ["Commercial", "Privacy", "AutoTimeout", "CeilingMount", "CableHide"]
      ),

      card(
        "Camera mounting hardware",
        "cctv",
        "cctv",
        "CCTV mount bracket",
        "Camera mounting hardware",
        CV,
        "Door entry & monitoring",
        CV_LINE,
        ["PoleMount", "Stainless", "LoadRated", "Tamperproof", "Corrosion"]
      ),
    ],
  },
];

export const cctvCatalog = finalizeCatalog(cctvCatalogInput);

const wfhCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Computers for remote work",
    description: "Business-class laptops and desktops imaged for VPN, collaboration, and security baselines.",
    items: [
      card("WFH laptop packages", "laptop", "laptop", "WFH laptop package", "WFH laptop packages", WFH, "Computers for remote work", WFH_LINE, [
        "i5/i7",
        "Encrypted",
        "Docking",
        "Portable",
        "Rental",
      ]),
      card("WFH desktop setups", "desktop", "desktop", "WFH desktop computer", "WFH desktop setups", WFH, "Computers for remote work", WFH_LINE, [
        "Compact",
        "DualScreen",
        "Peripherals",
        "Setup",
        "Warranty",
      ]),
      card("Dual-monitor kits", "desk", "desk", "Dual monitor home office", "Dual-monitor kits", WFH, "Computers for remote work", WFH_LINE, [
        "DualDisplay",
        "VESA",
        "USB-C",
        "HDMI",
        "Cables",
      ]),
    ],
  },
  {
    title: "Home connectivity",
    description: "Routers, mesh Wi-Fi, and backup links tuned for video meetings and corporate VPN.",
    items: [
      card("Business home routers", "wifi", "wifi", "Business home router", "Business home routers", WFH, "Home connectivity", WFH_LINE, [
        "VLAN",
        "VPN",
        "GuestWiFi",
        "Firmware",
        "RemoteAccess",
      ]),
      card("Mesh Wi-Fi systems", "wifi", "wifi", "Mesh WiFi home office", "Mesh WiFi systems", WFH, "Home connectivity", WFH_LINE, [
        "Mesh",
        "Coverage",
        "QoS",
        "Backhaul",
        "SpeedTest",
      ]),
      card("VPN router configuration", "network", "network", "VPN router setup", "VPN router configuration", WFH, "Home connectivity", WFH_LINE, [
        "IPsec",
        "SSLVPN",
        "SplitTunnel",
        "DNS",
        "Security",
      ]),
      card("Structured home cabling", "network", "network", "Home Ethernet cabling", "Structured home cabling", WFH, "Home connectivity", WFH_LINE, [
        "Cat6",
        "Faceplate",
        "PatchPanel",
        "Trunking",
        "Testing",
      ]),
    ],
  },
  {
    title: "Collaboration peripherals",
    description: "Audio, video, and power accessories that make remote meetings professional.",
    items: [
      card("HD webcams & lighting", "desk", "desk", "HD webcam kit", "HD webcams and lighting", WFH, "Collaboration peripherals", WFH_LINE, [
        "1080p",
        "Lighting",
        "Privacy",
        "Tripod",
        "Webcam",
      ]),
      card("UC headsets", "phone", "phone", "Unified communications headset", "UC headsets", WFH, "Collaboration peripherals", WFH_LINE, [
        "Teams",
        "Bluetooth",
        "NoiseCancel",
        "USB",
        "Warranty",
      ]),
      card("Speakerphones for home", "phone", "phone", "Home office speakerphone", "Speakerphones for home", WFH, "Collaboration peripherals", WFH_LINE, [
        "Speakerphone",
        "Bluetooth",
        "EchoCancel",
        "Portable",
        "Hybrid",
      ]),
      card("Desk power protection", "desk", "desk", "Home office UPS", "Desk power protection", WFH, "Collaboration peripherals", WFH_LINE, [
        "UPS",
        "Runtime",
        "Surge",
        "Battery",
        "Protection",
      ]),
    ],
  },
];

export const wfhCatalog = finalizeCatalog(wfhCatalogInput);

const licenseCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Microsoft",
    iconKey: "m365",
    description:
      "Microsoft 365, Windows, Azure, Teams, and enterprise apps — correct edition, seat count, activation, and renewal tracking.",
    items: [
      card("Microsoft 365", "m365", "m365", "Microsoft 365 licensing", "Microsoft 365", SL, "Microsoft", SL_LINE, [
        "Productivity",
        "Business",
        "Teams",
        "Migration",
        "GST",
      ]),
      card("Windows 11", "windows", "win", "Windows 11 licensing", "Windows 11", SL, "Microsoft", SL_LINE, [
        "Windows",
        "Licensing",
        "Upgrade",
        "Activation",
        "Invoice",
      ]),
      card("Microsoft Azure", "server", "azure", "Microsoft Azure licensing", "Microsoft Azure", SL, "Microsoft", SL_LINE, [
        "Cloud",
        "Compute",
        "Subscriptions",
        "Scaling",
        "Billing",
      ]),
      card("Microsoft Teams", "m365", "teams", "Microsoft Teams licensing", "Microsoft Teams", SL, "Microsoft", SL_LINE, [
        "Meetings",
        "Chat",
        "Calling",
        "Policies",
        "Onboarding",
      ]),
      card("OneDrive", "m365", "onedrive", "Microsoft OneDrive licensing", "OneDrive", SL, "Microsoft", SL_LINE, [
        "Storage",
        "Sync",
        "Sharing",
        "Retention",
        "Backup",
      ]),
      card("Visual Studio", "globe", "vscode", "Visual Studio licensing", "Visual Studio", SL, "Microsoft", SL_LINE, [
        "Development",
        "Enterprise",
        "DevOps",
        "Seats",
        "Renewal",
      ]),
      card("Dynamics 365", "office", "d365", "Dynamics 365 licensing", "Dynamics 365", SL, "Microsoft", SL_LINE, [
        "ERP",
        "CRM",
        "Cloud",
        "Implementation",
        "CAL",
      ]),
      card("Xbox Game Pass", "globe", "xbox", "Xbox Game Pass licensing", "Xbox Game Pass", SL, "Microsoft", SL_LINE, [
        "Gaming",
        "Subscription",
        "Perks",
        "Accounts",
        "GST",
      ]),
    ],
  },
  {
    title: "Adobe",
    iconKey: "adobe",
    description:
      "Creative Cloud and individual Adobe apps for design, video, document, and UX teams.",
    items: [
      card("Adobe Photoshop", "adobe", "ps", "Adobe Photoshop licensing", "Adobe Photoshop", SL, "Adobe", SL_LINE, [
        "Editing",
        "Creative",
        "Photography",
        "Teams",
        "Activation",
      ]),
      card("Adobe Illustrator", "adobe", "ai", "Adobe Illustrator licensing", "Adobe Illustrator", SL, "Adobe", SL_LINE, [
        "Vector",
        "Branding",
        "Creative",
        "Updates",
        "Deployment",
      ]),
      card("Adobe Premiere Pro", "adobe", "pr", "Adobe Premiere Pro licensing", "Adobe Premiere Pro", SL, "Adobe", SL_LINE, [
        "Video",
        "Marketing",
        "Effects",
        "GPU",
        "Libraries",
      ]),
      card("Adobe XD", "adobe", "xd", "Adobe XD licensing", "Adobe XD", SL, "Adobe", SL_LINE, [
        "UX",
        "Wireframes",
        "Prototypes",
        "Handoff",
        "Collaboration",
      ]),
      card("Adobe Lightroom", "adobe", "lr", "Adobe Lightroom licensing", "Adobe Lightroom", SL, "Adobe", SL_LINE, [
        "Photography",
        "Catalogues",
        "Cloud",
        "Migration",
        "Presets",
      ]),
      card("Adobe Acrobat", "adobe", "acrobat", "Adobe Acrobat licensing", "Adobe Acrobat", SL, "Adobe", SL_LINE, [
        "PDF",
        "Editing",
        "Forms",
        "ESign",
        "Volume",
      ]),
      card("Adobe Creative Cloud", "adobe", "cc", "Adobe Creative Cloud licensing", "Adobe Creative Cloud", SL, "Adobe", SL_LINE, [
        "Suite",
        "Creative",
        "Teams",
        "Admin",
        "Renewal",
      ]),
    ],
  },
];

export const licenseCatalog = finalizeCatalog(licenseCatalogInput);

export type CatalogItemWithCategory = {
  categoryTitle: string;
  categorySlug: string;
  item: ServiceCatalogItem;
};

const CATALOG_SOURCES: ServiceCatalogCategory[][] = [
  repairRentalCatalog,
  networkingCatalog,
  cctvCatalog,
  wfhCatalog,
  licenseCatalog,
];

export function getAllCatalogEntries(): CatalogItemWithCategory[] {
  return CATALOG_SOURCES.flatMap((categories) =>
    categories.flatMap((category) =>
      category.items.map((item) => ({
        categoryTitle: category.title,
        categorySlug: category.slug,
        item,
      })),
    ),
  );
}

export function getCategoryInCatalog(
  categories: ServiceCatalogCategory[],
  categorySlug: string,
): ServiceCatalogCategory | undefined {
  return categories.find((c) => c.slug === categorySlug);
}

export function getProductBySlug(slug: string): CatalogItemWithCategory | undefined {
  return getAllCatalogEntries().find((entry) => entry.item.slug === slug);
}

const DEFAULT_RELATED_LIMIT = 4;

export function getRelatedCatalogItems(slug: string, limit = DEFAULT_RELATED_LIMIT): CatalogItemWithCategory[] {
  const current = getProductBySlug(slug);
  if (!current) {
    return [];
  }

  const all = getAllCatalogEntries();
  const sameCategory = all.filter(
    (e) => e.categoryTitle === current.categoryTitle && e.item.slug !== slug,
  );
  const sameInterestOtherCategory = all.filter(
    (e) =>
      e.item.slug !== slug &&
      e.categoryTitle !== current.categoryTitle &&
      e.item.defaultInterest === current.item.defaultInterest,
  );
  const remainder = all.filter((e) => e.item.slug !== slug);

  const ordered = [...sameCategory, ...sameInterestOtherCategory, ...remainder];

  const seen = new Set<string>();
  const out: CatalogItemWithCategory[] = [];
  for (const entry of ordered) {
    if (seen.has(entry.item.slug)) {
      continue;
    }
    seen.add(entry.item.slug);
    out.push(entry);
    if (out.length >= limit) {
      break;
    }
  }
  return out;
}

