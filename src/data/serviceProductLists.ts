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

const CATEGORY_BADGE_MIN = 5;
const CATEGORY_BADGE_MAX = 8;
const CATEGORY_BADGE_FALLBACKS = [
  "Written quotation",
  "GST invoicing",
  "Pune & PCMC",
  "Genuine parts",
  "Workshop QC",
  "Parts quoted upfront",
  "Bench tested",
  "On-site support",
] as const;

export function shortenFeatureLabel(text: string, max = 24): string {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trim()}…`;
}

function padCategoryBadges(badges: string[]): string[] {
  const result = [...badges];
  for (const fallback of CATEGORY_BADGE_FALLBACKS) {
    if (result.length >= CATEGORY_BADGE_MIN) break;
    if (!result.includes(fallback)) result.push(fallback);
  }
  return result.slice(0, CATEGORY_BADGE_MAX);
}

function deriveCategoryFeatureBadges(category: ServiceCatalogCategoryInput): string[] {
  if (category.featureBadges?.length) {
    return padCategoryBadges(
      category.featureBadges.map((b) => shortenFeatureLabel(b, 24)),
    );
  }

  const badges: string[] = [];
  for (const item of category.items) {
    for (const spec of item.specs) {
      const label = shortenFeatureLabel(spec, 24);
      if (!badges.includes(label)) badges.push(label);
      if (badges.length >= CATEGORY_BADGE_MAX) return padCategoryBadges(badges);
    }
  }

  return padCategoryBadges(badges);
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
    title: "Laptop repair",
    description:
      "Component-level repairs for business laptops — diagnosis, genuine or compatible parts, and warranty on workmanship.",
    items: [
      card("Laptop display replacement", "laptop", "laptop", "Laptop LCD panel replacement", "Laptop display replacement", RR, "Laptop repair", RR_LINE, ["Panel matched to chassis and resolution", "Dead-pixel and hinge damage assessed before order", "Calibration and bezel fit checked on bench", "Old panel disposal documented where required", "Typical turnaround 2–5 working days subject to stock"]),
      card("Laptop battery service", "laptop", "laptop", "Laptop battery replacement", "Laptop battery service", RR, "Laptop repair", RR_LINE, ["OEM and high-grade compatible packs", "Cycle count and swelling inspection on intake", "Power profile test after installation", "Recycling advice for spent cells", "Invoice lists serial and capacity"]),
      card("Keyboard & trackpad repair", "laptop", "laptop", "Laptop keyboard repair", "Keyboard and trackpad repair", RR, "Laptop repair", RR_LINE, ["Individual keys or full palm-rest assemblies", "Liquid damage triage before parts commit", "Firmware and driver verification post-repair", "Spare keyboard stocked for common business models", "Cleaning included on completed jobs"]),
      card("SSD & storage upgrade", "laptop", "laptop", "Laptop SSD upgrade", "SSD and storage upgrade laptop", RR, "Laptop repair", RR_LINE, ["NVMe and SATA SSD options with clone or clean install", "Data migration scope agreed in writing", "TRIM and health check on delivery", "Old drive secure wipe or return on request", "Performance baseline shared with IT"]),
      card("RAM expansion", "laptop", "laptop", "Laptop RAM upgrade", "RAM expansion laptop", RR, "Laptop repair", RR_LINE, ["SO-DIMM matched to chipset limits", "Dual-channel configuration where supported", "Stress test after installation", "Compatible with in-warranty devices when policy allows", "Upgrade noted on workshop ticket"]),
    ],
  },
  {
    title: "Desktop repair & upgrade",
    description: "Tower and SFF systems — power-safe component swaps, deep cleaning, and performance tuning.",
    items: [
      card("Desktop memory upgrade", "desktop", "desktop", "Desktop RAM upgrade", "Desktop memory upgrade", RR, "Desktop repair & upgrade", RR_LINE, ["DDR4/DDR5 modules matched to board QVL where available", "ECC options for supported workstations", "MemTest pass before release", "Static-safe handling in workshop", "Invoice shows part serials"]),
      card("SSD & HDD installation", "desktop", "desktop", "Desktop storage upgrade", "SSD and HDD installation desktop", RR, "Desktop repair & upgrade", RR_LINE, ["OS clone or fresh image per IT policy", "Separate data volumes configured on request", "SMART status report supplied", "Cable management and airflow check", "Backup reminder before destructive work"]),
      card("Motherboard & power repair", "desktop", "desktop", "Desktop motherboard service", "Motherboard and power repair", RR, "Desktop repair & upgrade", RR_LINE, ["No-power and random shutdown diagnosis", "PSU wattage sized to GPU and disk load", "Thermal paste renewal on CPU service", "Post-repair burn-in period", "Parts quote before order"]),
      card("Workstation GPU service", "desktop", "desktop", "Desktop graphics card service", "Workstation GPU service", RR, "Desktop repair & upgrade", RR_LINE, ["Driver clean-install and benchmark", "Power connector and riser inspection", "Dust removal on blower-style cards", "RMA coordination when under manufacturer warranty", "Loan card subject to availability"]),
      
    ],
  },
  {
    title: "Equipment rental",
    description:
      "Short-term laptops, desktops, and peripherals for projects, training, and business continuity — with documented return dates.",
    items: [
      card("Business laptop rental", "laptop", "laptop", "Business laptop on rent", "Business laptop rental", RR, "Equipment rental", RR_LINE, ["Core i5/i7 class devices with SSD", "Standard image: Windows, Office-ready, antivirus", "Daily, weekly, and monthly rate cards", "Deposit and return checklist documented", "Bulk kits for training rooms"]),
      card("Desktop PC rental", "desktop", "desktop", "Desktop computer rental", "Desktop PC rental", RR, "Equipment rental", RR_LINE, ["Mini-tower or SFF with monitor optional", "Peripheral bundle available", "Network-ready imaging", "On-site swap for dead units in PCMC", "GST invoice with asset tags"]),
    ],
  },
];
export const repairRentalCatalog = finalizeCatalog(repairRentalCatalogInput);

const networkingCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Structured cabling & switching",
    description: "Cat6/Cat6A copper, patch panels, and managed switching with labelled documentation.",
    items: [
      card("Managed network switches", "network", "network", "Managed network switch", "Managed network switches", NW, "Structured cabling & switching", NW_LINE, ["Gigabit and 10G uplinks as required", "VLAN and QoS baseline configuration", "PoE budget calculated for endpoints", "Rack layout drawing supplied", "Spare SFP modules quoted separately"],{
  priceFrom: "₹20,999",
  priceNote: "Starting Price + GST",
}),
      card("Cat6 structured cabling", "network", "network", "Cat6 structured cabling", "Cat6 structured cabling", NW, "Structured cabling & switching", NW_LINE, ["Fluke test results on request", "Conduit and trunking per site standards", "Patch panel labelling standard agreed", "As-built diagram in PDF", "Compliance with local fire-stop rules"],{
  priceFrom: "₹21,999",
  priceNote: "Starting Price + GST",
}),
      card("Fiber backbone links", "network", "network", "Fiber optic cabling", "Fiber backbone links", NW, "Structured cabling & switching", NW_LINE, ["Single-mode and multimode options", "Splice or LC termination documented", "OTDR report when specified", "Media converters or SFP pairing", "Building-to-building paths planned"],{
  priceFrom: "₹22,999",
  priceNote: "Starting Price + GST",
}),
      card("Network rack build-out", "server", "server", "Network equipment rack", "Network rack build-out", NW, "Structured cabling & switching", NW_LINE, ["42U or wall-mount cabinets", "PDU and cable management", "Thermal and power load review", "Earthing check recommended", "Photo pack for IT records"],{
  priceFrom: "₹23,999",
  priceNote: "Starting Price + GST",
}),
    ],
  },
  {
    title: "Servers, NAS & backup",
    description: "On-premise storage and light server roles with RAID planning and backup targets.",
    items: [
      card("Synology & QNAP NAS", "server", "server", "NAS storage system", "Synology and QNAP NAS", NW, "Servers, NAS & backup", NW_LINE, ["RAID level chosen for capacity vs redundancy", "Snapshot and replication options explained", "User quotas and share permissions", "UPS pairing recommended", "Remote support tunnel with consent"],{
  priceFrom: "₹24,999",
  priceNote: "Starting Price + GST",
}),
      card("Cloud backup gateway", "server", "server", "Hybrid cloud backup", "Cloud backup gateway", NW, "Servers, NAS & backup", NW_LINE, ["3-2-1 strategy workshop", "Encrypted off-site sync options", "Retention policies documented", "Restore drill scheduled", "Bandwidth shaping for SME links"],{
  priceFrom: "₹25,999",
  priceNote: "Starting Price + GST",
}),
    ],
  },
  {
    title: "IP telephony & conferencing",
    description: "IP PBX, SIP trunks, handsets, and meeting-room audio configured before go-live.",
    items: [
      card("IP desk phones", "phone", "phone", "IP desk phone", "IP desk phones", NW, "IP telephony & conferencing", NW_LINE, ["PoE or adapter power options", "Extension, BLF, and speed-dial programming", "Codec and QoS alignment on switches", "Spare handsets for hot-desking", "Training sheet for reception staff"],{
  priceFrom: "₹26,999",
  priceNote: "Starting Price + GST",
}),
      card("VoIP gateways", "phone", "phone", "VoIP gateway appliance", "VoIP gateways", NW, "IP telephony & conferencing", NW_LINE, ["FXO/FXS for legacy lines", "Failover rules documented", "Echo cancellation tuned", "Firmware baseline recorded", "Maintenance window agreed"],{
  priceFrom: "₹27,999",
  priceNote: "Starting Price + GST",
}),
      card("Conference room phones", "phone", "phone", "Conference speakerphone", "Conference room phones", NW, "IP telephony & conferencing", NW_LINE, ["360° mic pickup for huddle rooms", "USB and Bluetooth models available", "Teams/Zoom certified options", "Acoustic site survey on request", "Ceiling mic arrays for boardrooms"],{
  priceFrom: "₹28,999",
  priceNote: "Starting Price + GST",
}),
      card("SIP intercom & paging", "phone", "phone", "SIP intercom system", "SIP intercom and paging", NW, "IP telephony & conferencing", NW_LINE, ["Door station integration", "Zone paging from reception", "Recorded announcements", "Secure VLAN recommended", "Testing with facilities team"],{
  priceFrom: "₹29,999",
  priceNote: "Starting Price + GST",
}),
    ],
  },
  {
    title: "Attendance & access control",
    description: "Biometric terminals, RFID readers, and door control integrated with HR export formats.",
    items: [
      card("Biometric time terminals", "attendance", "attendance", "Biometric attendance terminal", "Biometric time terminals", NW, "Attendance & access control", NW_LINE, ["Fingerprint and card hybrid models", "Shift rules configured to HR policy", "Excel/CSV export templates", "TCP/IP and PoE wiring", "Tamper alerts enabled"],{
  priceFrom: "₹30,999",
  priceNote: "Starting Price + GST",
}),
      card("Face recognition attendance", "attendance", "attendance", "Face recognition terminal", "Face recognition attendance", NW, "Attendance & access control", NW_LINE, ["Mask and lighting guidance on install", "Liveness options where required", "GDPR-style consent signage advised", "Integration with existing HRMS on request", "Fallback card mode configured"],{
  priceFrom: "₹31,999",
  priceNote: "Starting Price + GST",
}),
      card("RFID card readers", "attendance", "attendance", "RFID attendance reader", "RFID card readers", NW, "Attendance & access control", NW_LINE, ["Card issuance and printing optional", "Anti-passback rules available", "Visitor badge workflow", "Offline buffer on power loss", "Annual maintenance contracts"],{
  priceFrom: "₹32,999",
  priceNote: "Starting Price + GST",
}),
      card("Visitor management kiosk", "attendance", "attendance", "Visitor management system", "Visitor management kiosk", NW, "Attendance & access control", NW_LINE, ["Photo badge printing", "Host notification by SMS/email", "NDA screen optional", "Evacuation report capability", "Branding with company logo"],{
  priceFrom: "₹33,999",
  priceNote: "Starting Price + GST",
}),
    ],
  },
];
export const networkingCatalog = finalizeCatalog(networkingCatalogInput);

const cctvCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "IP cameras",
    description: "Dome, bullet, and varifocal models selected for scene, lighting, and storage budget.",
    items: [
      card("Indoor dome IP cameras", "cctv", "cctv", "Indoor dome IP camera", "Indoor dome IP cameras", CV, "IP cameras", CV_LINE, ["2–8 MP options with WDR", "PoE class and switch budget verified", "Privacy masking for sensitive areas", "ONVIF profile compatibility", "Night scene sample on handover"],{
  priceFrom: "₹24,999",
  priceNote: "Starting Price + GST",
}),
      card("Outdoor bullet cameras", "cctv", "cctv", "Outdoor bullet IP camera", "Outdoor bullet IP cameras", CV, "IP cameras", CV_LINE, ["IP66/IK10 rated housings", "IR range matched to perimeter length", "Vandal-resistant mounts", "Lightning protection advised on poles", "Lens field-of-view documented"],{
  priceFrom: "₹25,999",
  priceNote: "Starting Price + GST",
}),
      card("Motorised varifocal cameras", "cctv", "cctv", "Varifocal IP camera", "Motorised varifocal cameras", CV, "IP cameras", CV_LINE, ["Remote zoom and focus setup", "Ideal for gates and loading bays", "Presets for incident review", "Bandwidth estimate per channel", "Calibration after install"],{
  priceFrom: "₹26,999",
  priceNote: "Starting Price + GST",
}),
      card("Panoramic & fisheye cameras", "cctv", "cctv", "Fisheye surveillance camera", "Panoramic and fisheye cameras", CV, "IP cameras", CV_LINE, ["360° coverage for open plan areas", "Dewarping on client or NVR", "Ceiling mount height guidelines", "Single cable per zone", "Training on digital PTZ"],{
  priceFrom: "₹27,999",
  priceNote: "Starting Price + GST",
}),
    ],
  },
  {
    title: "Recording & infrastructure",
    description: "NVR/DVR platforms, surveillance drives, and PoE switching sized for retention targets.",
    items: [
      card("Network video recorders", "cctv", "cctv", "NVR recorder", "Network video recorders", CV, "Recording & infrastructure", CV_LINE, ["Channel count and bitrate planning", "RAID optional on enterprise models", "HTTPS and role-based users", "Automatic health alerts", "UPS runtime calculation"],{
  priceFrom: "₹28,999",
  priceNote: "Starting Price + GST",
}),
      card("Surveillance hard drives", "cctv", "cctv", "Surveillance HDD", "Surveillance hard drives", CV, "Recording & infrastructure", CV_LINE, ["Workload-rated for 24/7 write", "Slot count and RAID level advice", "SMART monitoring enabled", "Spare on-site disk optional", "RMA process documented"],{
  priceFrom: "₹29,999",
  priceNote: "Starting Price + GST",
}),
      card("PoE switches for CCTV", "network", "network", "PoE switch CCTV", "PoE switches for CCTV", CV, "Recording & infrastructure", CV_LINE, ["Per-port power budget spreadsheet", "VLAN isolation from corporate LAN", "Extended reach with proper cable", "Loop prevention on uplinks", "Labelled patch panel"],{
  priceFrom: "₹30,999",
  priceNote: "Starting Price + GST",
}),
      
    ],
  },
  {
    title: "Door entry & monitoring",
    description: "Video door phones, guard monitors, and display walls for reception and security desks.",
    items: [
      card("Guard station monitors", "cctv", "cctv", "Security monitor station", "Guard station monitors", CV, "Door entry & monitoring", CV_LINE, ["Wall and desk mounts", "HDMI matrix for video walls", "Burn-in protection settings", "Alignment with NVR layout", "Operator SOP draft optional"],{
  priceFrom: "₹31,999",
  priceNote: "Starting Price + GST",
}),
      card("Public view displays", "desk", "desk", "CCTV display monitor", "Public view displays", CV, "Door entry & monitoring", CV_LINE, ["Commercial-grade panels", "Privacy masking on live view", "Auto-timeout to default screen", "Ceiling mount hardware", "Cable concealment options"],{
  priceFrom: "₹32,999",
  priceNote: "Starting Price + GST",
}),
      card("Camera mounting hardware", "cctv", "cctv", "CCTV mount bracket", "Camera mounting hardware", CV, "Door entry & monitoring", CV_LINE, ["Pole, wall, and corner brackets", "Stainless options for coastal sites", "Load rating for PTZ heads", "Tamper-proof screws", "Corrosion inspection schedule"],{
  priceFrom: "₹33,999",
  priceNote: "Starting Price + GST",
}),
      
    ],
  },
];
export const cctvCatalog = finalizeCatalog(cctvCatalogInput);

const wfhCatalogInput: ServiceCatalogCategoryInput[] = [
  {
    title: "Computers for remote work",
    description: "Business-class laptops and desktops imaged for VPN, collaboration, and security baselines.",
    items: [
      card("WFH laptop packages", "laptop", "laptop", "WFH laptop package", "WFH laptop packages", WFH, "Computers for remote work", WFH_LINE, ["Core i5/i7 with 16 GB RAM standard", "BitLocker or encryption per policy", "Dock and carry case options", "Loan or purchase pricing", "14–15\" lightweight chassis"]),
      card("WFH desktop setups", "desktop", "desktop", "WFH desktop computer", "WFH desktop setups", WFH, "Computers for remote work", WFH_LINE, ["Quiet SFF chassis", "Dual-monitor ready GPU", "Wired keyboard and mouse", "On-site setup optional in PCMC", "Warranty registered to company"]),
      card("Dual-monitor kits", "desk", "desk", "Dual monitor home office", "Dual-monitor kits", WFH, "Computers for remote work", WFH_LINE, ["Matched panel sizes", "VESA arms or stands", "USB-C and HDMI cables", "Colour calibration basic", "Cable clips included"]),
    ],
  },
  {
    title: "Home connectivity",
    description: "Routers, mesh Wi‑Fi, and backup links tuned for video meetings and corporate VPN.",
    items: [
      card("Business home routers", "wifi", "wifi", "Business home router", "Business home routers", WFH, "Home connectivity", WFH_LINE, ["VLAN for work vs home when required", "VPN passthrough verified", "Guest network isolation", "Firmware update plan", "Remote admin with consent"]),
      card("Mesh Wi‑Fi systems", "wifi", "wifi", "Mesh WiFi home office", "Mesh WiFi systems", WFH, "Home connectivity", WFH_LINE, ["Whole-home coverage survey", "Backhaul wired where possible", "QoS for Teams/Zoom", "Parental controls optional", "Speed test at handover"]),
      card("VPN router configuration", "network", "network", "VPN router setup", "VPN router configuration", WFH, "Home connectivity", WFH_LINE, ["IPsec and SSL VPN profiles", "Split tunnel per security policy", "DNS leak checks", "Documentation for IT", "Rollback plan if issues"]),
      card("Structured home cabling", "network", "network", "Home Ethernet cabling", "Structured home cabling", WFH, "Home connectivity", WFH_LINE, ["Cat6 home runs to study", "Faceplates and patch panel", "Neat trunking along skirting", "Test results on request", "Coordination with interior work"]),
    ],
  },
  {
    title: "Collaboration peripherals",
    description: "Audio, video, and power accessories that make remote meetings professional.",
    items: [
      card("HD webcams & lighting", "desk", "desk", "HD webcam kit", "HD webcams and lighting", WFH, "Collaboration peripherals", WFH_LINE, ["1080p minimum for corporate standards", "Ring light or key light kits", "Privacy shutter models", "Mount for monitor and tripod", "Quick start guide"]),
      card("UC headsets", "phone", "phone", "Unified communications headset", "UC headsets", WFH, "Collaboration peripherals", WFH_LINE, ["Teams/Zoom certified models", "USB and Bluetooth options", "Noise-cancelling microphones", "Spare ear cushions quoted", "Warranty registration"]),
      card("Speakerphones for home", "phone", "phone", "Home office speakerphone", "Speakerphones for home", WFH, "Collaboration peripherals", WFH_LINE, ["360° pickup for small rooms", "Bluetooth pairing to mobile", "Echo cancellation tuned", "Carry case for hybrid workers", "Firmware updates"]),
      card("Desk power protection", "desk", "desk", "Home office UPS", "Desk power protection", WFH, "Collaboration peripherals", WFH_LINE, ["650–1500 VA typical sizing", "Runtime for safe shutdown", "Surge protection for broadband", "Wall-mount or tower", "Battery replacement service"]),
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
    card(
      "Microsoft 365 Business Basic",
      "m365",
      "m365",
      "Microsoft 365 Business Basic",
      "Microsoft 365 Business Basic",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Web versions of Office apps",
        "Teams included",
        "1 TB OneDrive storage",
        "Business email",
        "SharePoint included",
      ],
      {
        priceFrom: "₹145/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Microsoft 365 Business Standard",
      "m365",
      "m365",
      "Microsoft 365 Business Standard",
      "Microsoft 365 Business Standard",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Desktop Office apps",
        "Teams included",
        "1 TB OneDrive",
        "Business email",
        "SharePoint included",
      ],
      {
        priceFrom: "₹770/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Microsoft 365 Business Premium",
      "m365",
      "m365",
      "Microsoft 365 Business Premium",
      "Microsoft 365 Business Premium",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Desktop Office apps",
        "Microsoft Defender",
        "Intune included",
        "Advanced security",
        "Teams included",
      ],
      {
        priceFrom: "₹1,830/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Microsoft 365 Apps for Business",
      "m365",
      "m365",
      "Microsoft 365 Apps for Business",
      "Microsoft 365 Apps for Business",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Word, Excel, PowerPoint",
        "Desktop applications",
        "1 TB OneDrive",
        "Up to 5 devices",
        "No business email",
      ],
      {
        priceFrom: "₹660/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Windows 11 Pro",
      "windows",
      "win",
      "Windows 11 Pro License",
      "Windows 11 Pro",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Business-ready OS",
        "BitLocker encryption",
        "Remote Desktop",
        "Domain Join",
        "Enterprise security",
      ],
      {
        priceFrom: "₹15,499",
        priceNote: "Per device + GST",
      }
    ),

    card(
      "Microsoft Teams Essentials",
      "m365",
      "teams",
      "Microsoft Teams Essentials",
      "Microsoft Teams Essentials",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Online meetings",
        "Team collaboration",
        "Chat & calls",
        "Calendar integration",
        "Cloud storage",
      ],
      {
        priceFrom: "₹330/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Microsoft OneDrive for Business",
      "m365",
      "onedrive",
      "OneDrive for Business",
      "OneDrive for Business",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "1 TB cloud storage",
        "Secure file sharing",
        "Version history",
        "Backup protection",
        "Business sync",
      ],
      {
        priceFrom: "₹440/user/mo",
        priceNote: "+ GST",
      }
    ),

    card(
      "Microsoft Azure",
      "server",
      "azure",
      "Microsoft Azure Cloud",
      "Microsoft Azure",
      SL,
      "Microsoft",
      SL_LINE,
      [
        "Cloud servers",
        "Virtual machines",
        "Storage services",
        "Backup solutions",
        "Pay-as-you-go",
      ],
      {
        priceFrom: "Quote on Request",
        priceNote: "Based on usage",
      }
    ),
  ],
},
  {
    title: "Adobe",
    iconKey: "adobe",
    description:
      "Creative Cloud and individual Adobe apps for design, video, document, and UX teams.",
    items: [
      card("Adobe Photoshop", "adobe", "ps", "Adobe Photoshop licensing", "Adobe Photoshop", SL, "Adobe", SL_LINE, [
        "Adobe Photoshop — image editing",
        "Single-app or Creative Cloud All Apps",
        "Photography Plan for creators",
        "Team and enterprise seat packs",
        "Activation and admin console support",
      ]),
      card("Adobe Illustrator", "adobe", "ai", "Adobe Illustrator licensing", "Adobe Illustrator", SL, "Adobe", SL_LINE, [
        "Adobe Illustrator — vector design",
        "Print, brand, and packaging workflows",
        "Bundled in Creative Cloud All Apps",
        "Version updates included on subscription",
        "Device deployment guidance",
      ]),
      card("Adobe Premiere Pro", "adobe", "pr", "Adobe Premiere Pro licensing", "Adobe Premiere Pro", SL, "Adobe", SL_LINE, [
        "Adobe Premiere Pro — video editing",
        "Pro video and marketing teams",
        "Works with After Effects in All Apps plan",
        "GPU guidance for edit stations",
        "Team libraries and shared assets",
      ]),
      card("Adobe XD", "adobe", "xd", "Adobe XD licensing", "Adobe XD", SL, "Adobe", SL_LINE, [
        "Adobe XD — UX and UI design",
        "Wireframes and interactive prototypes",
        "Included in Creative Cloud All Apps",
        "Handoff to development teams",
        "Co-editing for distributed design groups",
      ]),
      card("Adobe Lightroom", "adobe", "lr", "Adobe Lightroom licensing", "Adobe Lightroom", SL, "Adobe", SL_LINE, [
        "Adobe Lightroom — photo workflow",
        "Lightroom and Lightroom Classic options",
        "Photography Plan bundles",
        "Cloud sync for studio archives",
        "Preset and catalog migration advice",
      ]),
      card("Adobe Acrobat", "adobe", "acrobat", "Adobe Acrobat licensing", "Adobe Acrobat", SL, "Adobe", SL_LINE, [
        "Adobe Acrobat — PDF and e-sign",
        "Acrobat Standard and Pro tiers",
        "PDF editing, redaction, and forms",
        "Adobe Sign integrations quoted separately",
        "Volume packs for legal and finance teams",
      ]),
      card("Adobe Creative Cloud", "adobe", "cc", "Adobe Creative Cloud licensing", "Adobe Creative Cloud", SL, "Adobe", SL_LINE, [
        "Adobe Creative Cloud — full app suite",
        "Photoshop, Illustrator, Premiere Pro, XD & more",
        "All Apps individual and team plans",
        "Admin console for IT-managed seats",
        "True-up and renewal management",
      ]),
    ],
  },
  {
    title: "Antivirus",
    iconKey: "shield",
    description:
      "Endpoint and server protection for offices and home users — renewal, activation, and multi-device packs with GST invoices.",
    items: [
      card("Quick Heal Total Security", "shield", "qh", "Quick Heal Total Security", "Quick Heal Total Security", SL, "Antivirus", SL_LINE, [
        "Quick Heal — antivirus and anti-ransomware",
        "Total Security for Windows PCs",
        "Internet, email, and USB shield",
        "1, 3, 5, and 10-device packs",
        "Renewal reminders before expiry",
      ]),
      card("Kaspersky Endpoint Security", "shield", "kaspersky", "Kaspersky Endpoint Security", "Kaspersky Endpoint Security", SL, "Antivirus", SL_LINE, [
        "Kaspersky — business endpoint protection",
        "Workstation and file-server coverage",
        "Central management console",
        "Exploit prevention and web control",
        "Volume licensing for SMEs",
      ]),
      card("Norton 360", "shield", "norton", "Norton 360 antivirus", "Norton 360", SL, "Antivirus", SL_LINE, [
        "Norton 360 — device security suite",
        "Antivirus, firewall, and VPN options",
        "Individual and family subscriptions",
        "Cloud backup tiers on select plans",
        "Activation support on delivery",
      ]),
      card("McAfee Total Protection", "shield", "mcafee", "McAfee Total Protection", "McAfee Total Protection", SL, "Antivirus", SL_LINE, [
        "McAfee — multi-device protection",
        "Windows, Mac, Android, and iOS",
        "Identity and privacy tools",
        "Annual subscription renewals",
        "GST documentation for IT records",
      ]),
      card("Bitdefender Business Security", "shield", "bitdefender", "Bitdefender Business Security", "Bitdefender Business Security", SL, "Antivirus", SL_LINE, [
        "Bitdefender — business endpoint suite",
        "GravityZone cloud console",
        "Advanced threat defence",
        "Full disk encryption options",
        "Server and workstation bundles",
      ]),
      card("ESET Endpoint Antivirus", "shield", "eset", "ESET Endpoint Antivirus", "ESET Endpoint Antivirus", SL, "Antivirus", SL_LINE, [
        "ESET — lightweight endpoint AV",
        "Low system impact on older PCs",
        "ESET PROTECT hub for IT teams",
        "Mail security add-ons available",
        "Renewal aligned to financial year",
      ]),
      card("Avast Business Antivirus", "shield", "avast", "Avast Business Antivirus", "Avast Business Antivirus", SL, "Antivirus", SL_LINE, [
        "Avast — small-business antivirus",
        "Cloud-managed deployment",
        "Patch and device inventory options",
        "Premium remote control add-on",
        "Seat packs for growing teams",
      ]),
      card("Sophos Endpoint", "shield", "sophos", "Sophos Endpoint protection", "Sophos Endpoint", SL, "Antivirus", SL_LINE, [
        "Sophos — enterprise-grade endpoint",
        "Intercept X advanced protection",
        "Synchronized security with firewall",
        "Central cloud administration",
        "MSP and volume programmes",
      ]),
      card("Trend Micro Worry-Free", "shield", "trend", "Trend Micro Worry-Free", "Trend Micro Worry-Free", SL, "Antivirus", SL_LINE, [
        "Trend Micro — SMB security suite",
        "Worry-Free Services Advanced",
        "Ransomware and web threat protection",
        "Simple licensing for non-IT teams",
        "Renewal and true-up support",
      ]),
      card("Malwarebytes Teams", "shield", "malwarebytes", "Malwarebytes Teams", "Malwarebytes Teams", SL, "Antivirus", SL_LINE, [
        "Malwarebytes — anti-malware for teams",
        "Remediation-first scanning",
        "Windows and Mac endpoints",
        "Neighbourhood threat blocking",
        "Flexible seat counts",
      ]),
    ],
  },
  {
    title: "Autodesk",
    iconKey: "autodesk",
    description: "CAD, BIM, 3D, and product-design tools for architecture, engineering, and media pipelines.",
    items: [
      card("AutoCAD", "autodesk", "cad", "AutoCAD licensing", "AutoCAD", SL, "Autodesk", SL_LINE, [
        "AutoCAD — 2D/3D drafting",
        "Commercial and educational subscriptions",
        "Network and single-user deployment",
        "Version upgrade paths",
        "Installation support in Pune",
      ]),
      card("Autodesk Maya", "autodesk", "maya", "Autodesk Maya licensing", "Autodesk Maya", SL, "Autodesk", SL_LINE, [
        "Autodesk Maya — 3D animation",
        "Media and entertainment pipelines",
        "Collection bundles with 3ds Max available",
        "Render farm licensing guidance",
        "GPU workstation sizing advice",
      ]),
      card("Autodesk Revit", "autodesk", "revit", "Autodesk Revit licensing", "Autodesk Revit", SL, "Autodesk", SL_LINE, [
        "Autodesk Revit — BIM modelling",
        "Architecture, structure, and MEP disciplines",
        "AEC Collection option",
        "Collaboration and cloud worksharing explained",
        "Training partner referrals on request",
      ]),
      card("3ds Max", "autodesk", "3ds", "3ds Max licensing", "3ds Max", SL, "Autodesk", SL_LINE, [
        "3ds Max — 3D modelling and rendering",
        "Visualisation and game-ready assets",
        "Bundled in Media & Entertainment Collection",
        "Plugin compatibility notes",
        "Workstation recommendations",
      ]),
      card("Fusion 360", "autodesk", "fusion", "Fusion 360 licensing", "Fusion 360", SL, "Autodesk", SL_LINE, [
        "Fusion 360 — cloud CAD/CAM",
        "Start-ups and machine shops",
        "Commercial vs personal licence guidance",
        "Generative design extensions",
        "Renewal aligned to project timelines",
      ]),
      card("Autodesk Inventor", "autodesk", "inv", "Autodesk Inventor licensing", "Autodesk Inventor", SL, "Autodesk", SL_LINE, [
        "Autodesk Inventor — mechanical design",
        "Product design and manufacturing drawings",
        "PDM and Vault integration scope",
        "Product Design & Manufacturing Collection",
        "True-up for expanding engineering teams",
      ]),
    ],
  },
  // {
  //   title: "Oracle Corporation",
  //   iconKey: "oracle",
  //   description: "Database, cloud, Java, ERP, and enterprise data platforms with compliant licensing metrics.",
  //   items: [
  //     card("Oracle Database", "oracle", "odb", "Oracle Database licensing", "Oracle Database", SL, "Oracle Corporation", SL_LINE, [
  //       "Oracle Database — enterprise RDBMS",
  //       "Standard Edition and Enterprise Edition",
  //       "Processor and Named User Plus metrics",
  //       "Audit-readiness documentation",
  //       "Support renewal (Oracle Support) coordination",
  //     ]),
  //     card("Oracle Cloud", "oracle", "ocloud", "Oracle Cloud licensing", "Oracle Cloud", SL, "Oracle Corporation", SL_LINE, [
  //       "Oracle Cloud — IaaS and PaaS",
  //       "OCI credits and pay-as-you-go",
  //       "Autonomous Database and Exadata Cloud",
  //       "Migration assessment referrals",
  //       "Billing account setup support",
  //     ]),
  //     card("Java", "oracle", "java", "Java licensing", "Java", SL, "Oracle Corporation", SL_LINE, [
  //       "Java — SE subscriptions for commercial use",
  //       "JDK updates and long-term support",
  //       "Desktop and server deployment counts",
  //       "Compliance review for legacy installs",
  //       "Subscription term aligned to financial year",
  //     ]),
  //     card("NetSuite", "oracle", "netsuite", "NetSuite licensing", "NetSuite", SL, "Oracle Corporation", SL_LINE, [
  //       "NetSuite — cloud ERP",
  //       "Financials, CRM, and inventory modules",
  //       "User tiers and add-on modules",
  //       "Implementation partner introductions",
  //       "GST and multi-subsidiary scoping",
  //     ]),
  //     card("MySQL Enterprise", "oracle", "mysql", "MySQL Enterprise licensing", "MySQL Enterprise", SL, "Oracle Corporation", SL_LINE, [
  //       "MySQL Enterprise — supported database",
  //       "Monitoring, backup, and security plugins",
  //       "Cluster and replication guidance",
  //       "Migration from community edition",
  //       "Annual subscription renewals",
  //     ]),
  //   ],
  // },
  // {
  //   title: "Corel Corporation",
  //   iconKey: "corel",
  //   description: "Graphics, video, and utility software for design studios and business desktops.",
  //   items: [
  //     card("CorelDRAW Graphics Suite", "corel", "cdr", "CorelDRAW licensing", "CorelDRAW Graphics Suite", SL, "Corel Corporation", SL_LINE, [
  //       "CorelDRAW Graphics Suite — vector layout",
  //       "Illustration, layout, and photo tools",
  //       "Perpetual and subscription licences",
  //       "Volume packs for print shops",
  //       "File compatibility with PDF/X workflows",
  //     ]),
  //     card("Corel Painter", "corel", "painter", "Corel Painter licensing", "Corel Painter", SL, "Corel Corporation", SL_LINE, [
  //       "Corel Painter — digital art",
  //       "Natural media brushes for artists",
  //       "Subscription and perpetual options",
  //       "Tablet and pen display tuning",
  //       "Upgrade pricing for existing users",
  //     ]),
  //     card("VideoStudio", "corel", "vs", "VideoStudio licensing", "VideoStudio", SL, "Corel Corporation", SL_LINE, [
  //       "VideoStudio — consumer and pro-sumer video",
  //       "Multi-track editing and effects",
  //       "Licence for marketing teams",
  //       "Export presets for social platforms",
  //       "Training material links provided",
  //     ]),
  //     card("WinZip", "corel", "winzip", "WinZip licensing", "WinZip", SL, "Corel Corporation", SL_LINE, [
  //       "WinZip — compression and encryption",
  //       "Enterprise deployment packages",
  //       "PDF features and cloud connectors",
  //       "Seat volume discounts",
  //       "Central licence key management",
  //     ]),
  //   ],
  // },
  // {
  //   title: "Apple",
  //   iconKey: "apple",
  //   description: "macOS, creative pro apps, and Apple services for design, media, and executive teams.",
  //   items: [
  //     card("macOS", "apple", "macos", "macOS licensing", "macOS", SL, "Apple", SL_LINE, [
  //       "macOS — operating system for Mac",
  //       "Ships with Mac hardware purchases",
  //       "Volume and DEP/ABM guidance for fleets",
  //       "macOS upgrade compatibility checks",
  //       "Integration with Microsoft 365 explained",
  //     ]),
  //     card("iCloud+", "apple", "icloud", "iCloud+ licensing", "iCloud+", SL, "Apple", SL_LINE, [
  //       "iCloud+ — cloud storage for Apple IDs",
  //       "50 GB to 2 TB plans",
  //       "Family and business Apple ID policies",
  //       "Backup scope for iPhone and Mac",
  //       "Procurement via Apple gift cards or ABM",
  //     ]),
  //     card("Final Cut Pro", "apple", "fcp", "Final Cut Pro licensing", "Final Cut Pro", SL, "Apple", SL_LINE, [
  //       "Final Cut Pro — professional video editing",
  //       "One-time Mac App Store purchase",
  //       "ProRes and HDR workflows",
  //       "Mac Studio and MacBook Pro sizing",
  //       "Volume Content Programme for studios",
  //     ]),
  //     card("Logic Pro", "apple", "logic", "Logic Pro licensing", "Logic Pro", SL, "Apple", SL_LINE, [
  //       "Logic Pro — music production",
  //       "DAW for composers and podcast teams",
  //       "Audio interface compatibility",
  //       "One-time licence per Mac",
  //       "Project archive on NAS guidance",
  //     ]),
  //     card("Apple Music", "apple", "music", "Apple Music licensing", "Apple Music", SL, "Apple", SL_LINE, [
  //       "Apple Music — streaming subscription",
  //       "Individual and family plans",
  //       "Corporate perk and retail display licences",
  //       "Apple ID setup for staff devices",
  //       "Renewal reminders",
  //     ]),
  //     card("Apple TV+", "apple", "tv", "Apple TV+ licensing", "Apple TV+", SL, "Apple", SL_LINE, [
  //       "Apple TV+ — video streaming",
  //       "Bundled offers with Apple One",
  //       "Conference room and hospitality use cases",
  //       "Subscription management support",
  //       "GST invoices where applicable",
  //     ]),
  //   ],
  // },
  // {
  //   title: "JetBrains",
  //   iconKey: "jetbrains",
  //   description: "IDEs and developer tools for Java, Python, .NET, web, and data engineering teams.",
  //   items: [
  //     card("IntelliJ IDEA", "jetbrains", "idea", "IntelliJ IDEA licensing", "IntelliJ IDEA", SL, "JetBrains", SL_LINE, [
  //       "IntelliJ IDEA — Java and Kotlin IDE",
  //       "Community, Ultimate, and All Products Pack",
  //       "Commercial seat assignment",
  //       "Plugin and JDK compatibility",
  //       "Renewal true-up for growing teams",
  //     ]),
  //     card("PyCharm", "jetbrains", "pycharm", "PyCharm licensing", "PyCharm", SL, "JetBrains", SL_LINE, [
  //       "PyCharm — Python IDE",
  //       "Professional for Django and data science",
  //       "Included in All Products Pack",
  //       "Remote interpreter setup guidance",
  //       "Educational licence eligibility explained",
  //     ]),
  //     card("WebStorm", "jetbrains", "webstorm", "WebStorm licensing", "WebStorm", SL, "JetBrains", SL_LINE, [
  //       "WebStorm — JavaScript and TypeScript IDE",
  //       "React, Vue, and Node.js projects",
  //       "All Products Pack bundle option",
  //       "ESLint and Prettier integration",
  //       "Team server licence keys",
  //     ]),
  //     card("Rider", "jetbrains", "rider", "Rider licensing", "Rider", SL, "JetBrains", SL_LINE, [
  //       "Rider — .NET and Unity IDE",
  //       "Cross-platform on Windows and macOS",
  //       "ReSharper capabilities included",
  //       "Unity game dev teams",
  //       "Volume discount tiers",
  //     ]),
  //     card("CLion", "jetbrains", "clion", "CLion licensing", "CLion", SL, "JetBrains", SL_LINE, [
  //       "CLion — C and C++ IDE",
  //       "CMake and embedded toolchains",
  //       "Remote GDB debug setup",
  //       "All Products Pack bundle",
  //       "Student vs commercial licensing",
  //     ]),
  //     card("DataGrip", "jetbrains", "datagrip", "DataGrip licensing", "DataGrip", SL, "JetBrains", SL_LINE, [
  //       "DataGrip — database IDE",
  //       "SQL clients for PostgreSQL, MySQL, Oracle & more",
  //       "DBA and analytics teams",
  //       "Credential vault best practices",
  //       "Bundled in All Products Pack",
  //     ]),
  //   ],
  // },
  // {
  //   title: "IBM",
  //   iconKey: "ibm",
  //   description: "Analytics, AI, cloud, and data platforms for research, finance, and enterprise IT.",
  //   items: [
  //     card("IBM SPSS", "ibm", "spss", "IBM SPSS licensing", "IBM SPSS", SL, "IBM", SL_LINE, [
  //       "IBM SPSS — statistical analysis",
  //       "Statistics and Modeler editions",
  //       "Academic and commercial licences",
  //       "Server and desktop deployment",
  //       "Renewal and version upgrade paths",
  //     ]),
  //     card("Watson AI", "ibm", "watson", "IBM Watson AI licensing", "Watson AI", SL, "IBM", SL_LINE, [
  //       "Watson AI — enterprise AI services",
  //       "Assistant, Discovery, and Speech APIs",
  //       "Cloud Pak for Data options",
  //       "Use-case scoping workshops",
  //       "Consumption and commitment pricing",
  //     ]),
  //     card("IBM Cloud", "ibm", "ibmcloud", "IBM Cloud licensing", "IBM Cloud", SL, "IBM", SL_LINE, [
  //       "IBM Cloud — hybrid cloud platform",
  //       "IaaS, Kubernetes, and managed databases",
  //       "Credits and enterprise agreements",
  //       "Migration from on-prem VMware",
  //       "Billing account governance",
  //     ]),
  //     card("Cognos Analytics", "ibm", "cognos", "Cognos Analytics licensing", "Cognos Analytics", SL, "IBM", SL_LINE, [
  //       "Cognos Analytics — business intelligence",
  //       "Dashboards and governed reporting",
  //       "User and capacity licensing",
  //       "Data warehouse connectivity",
  //       "Training for finance teams",
  //     ]),
  //     card("Db2 Database", "ibm", "db2", "Db2 Database licensing", "Db2 Database", SL, "IBM", SL_LINE, [
  //       "Db2 Database — enterprise data store",
  //       "Linux, UNIX, and Windows editions",
  //       "High availability and partitioning",
  //       "Backup and HADR guidance",
  //       "Licence metric audit support",
  //     ]),
  //   ],
  // },
  
];
export const licenseCatalog = finalizeCatalog(licenseCatalogInput);

export function getCategoryInCatalog(
  categories: ServiceCatalogCategory[],
  categorySlug: string,
): ServiceCatalogCategory | undefined {
  return categories.find((c) => c.slug === categorySlug);
}

