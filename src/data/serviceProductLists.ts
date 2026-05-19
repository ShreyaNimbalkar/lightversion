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
  | "globe";

export type ServiceCatalogItem = {
  name: string;
  slug: string;
  iconKey: CatalogIconKey;
  image: string;
  imageAlt: string;
  defaultInterest: ServiceProductInterest;
  enquiryTag: string;
  summary: string;
  overview: string;
  specs: string[];
  highlights: ProductHighlightCard[];
};

export type ServiceCatalogCategory = {
  title: string;
  description?: string;
  items: ServiceCatalogItem[];
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

function productCopy(
  name: string,
  categoryTitle: string,
  serviceLine: string,
  specs: string[],
  summary: string,
): Pick<ServiceCatalogItem, "summary" | "overview" | "specs" | "highlights"> {
  return {
    summary,
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
  summary: string,
): ServiceCatalogItem {
  const slug = catalogItemSlug(enquiryTag);
  const copy = productCopy(name, categoryTitle, serviceLine, specs, summary);
  return {
    name,
    slug,
    iconKey,
    image: resolveProductImage(slug, enquiryTag, defaultInterest),
    imageAlt,
    enquiryTag,
    defaultInterest,
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

export const repairRentalCatalog: ServiceCatalogCategory[] = [
  {
    title: "Laptop repair",
    description:
      "Component-level repairs for business laptops — diagnosis, genuine or compatible parts, and warranty on workmanship.",
    items: [
      card("Laptop display replacement", "laptop", "laptop", "Laptop LCD panel replacement", "Laptop display replacement", RR, "Laptop repair", RR_LINE, ["Panel matched to chassis and resolution", "Dead-pixel and hinge damage assessed before order", "Calibration and bezel fit checked on bench", "Old panel disposal documented where required", "Typical turnaround 2–5 working days subject to stock"], "Crisp, factory-fit laptop screens with quoted parts upfront."),
      card("Laptop battery service", "laptop", "laptop", "Laptop battery replacement", "Laptop battery service", RR, "Laptop repair", RR_LINE, ["OEM and high-grade compatible packs", "Cycle count and swelling inspection on intake", "Power profile test after installation", "Recycling advice for spent cells", "Invoice lists serial and capacity"], "Safe battery replacement to restore portable runtime."),
      card("Keyboard & trackpad repair", "laptop", "laptop", "Laptop keyboard repair", "Keyboard and trackpad repair", RR, "Laptop repair", RR_LINE, ["Individual keys or full palm-rest assemblies", "Liquid damage triage before parts commit", "Firmware and driver verification post-repair", "Spare keyboard stocked for common business models", "Cleaning included on completed jobs"], "Restore typing reliability after spills or wear."),
      card("SSD & storage upgrade", "laptop", "laptop", "Laptop SSD upgrade", "SSD and storage upgrade laptop", RR, "Laptop repair", RR_LINE, ["NVMe and SATA SSD options with clone or clean install", "Data migration scope agreed in writing", "TRIM and health check on delivery", "Old drive secure wipe or return on request", "Performance baseline shared with IT"], "Faster boot and application load for ageing fleets."),
      card("RAM expansion", "laptop", "laptop", "Laptop RAM upgrade", "RAM expansion laptop", RR, "Laptop repair", RR_LINE, ["SO-DIMM matched to chipset limits", "Dual-channel configuration where supported", "Stress test after installation", "Compatible with in-warranty devices when policy allows", "Upgrade noted on workshop ticket"], "Headroom for virtual machines and heavy spreadsheets."),
    ],
  },
  {
    title: "Desktop repair & upgrade",
    description: "Tower and SFF systems — power-safe component swaps, deep cleaning, and performance tuning.",
    items: [
      card("Desktop memory upgrade", "desktop", "desktop", "Desktop RAM upgrade", "Desktop memory upgrade", RR, "Desktop repair & upgrade", RR_LINE, ["DDR4/DDR5 modules matched to board QVL where available", "ECC options for supported workstations", "MemTest pass before release", "Static-safe handling in workshop", "Invoice shows part serials"], "Stable multitasking for design and ERP workloads."),
      card("SSD & HDD installation", "desktop", "desktop", "Desktop storage upgrade", "SSD and HDD installation desktop", RR, "Desktop repair & upgrade", RR_LINE, ["OS clone or fresh image per IT policy", "Separate data volumes configured on request", "SMART status report supplied", "Cable management and airflow check", "Backup reminder before destructive work"], "Reliable storage for growing file stores."),
      card("Motherboard & power repair", "desktop", "desktop", "Desktop motherboard service", "Motherboard and power repair", RR, "Desktop repair & upgrade", RR_LINE, ["No-power and random shutdown diagnosis", "PSU wattage sized to GPU and disk load", "Thermal paste renewal on CPU service", "Post-repair burn-in period", "Parts quote before order"], "Extend life of capital equipment responsibly."),
      card("Workstation GPU service", "desktop", "desktop", "Desktop graphics card service", "Workstation GPU service", RR, "Desktop repair & upgrade", RR_LINE, ["Driver clean-install and benchmark", "Power connector and riser inspection", "Dust removal on blower-style cards", "RMA coordination when under manufacturer warranty", "Loan card subject to availability"], "CAD and visual workloads back online quickly."),
      
    ],
  },
  {
    title: "Equipment rental",
    description:
      "Short-term laptops, desktops, and peripherals for projects, training, and business continuity — with documented return dates.",
    items: [
      card("Business laptop rental", "laptop", "laptop", "Business laptop on rent", "Business laptop rental", RR, "Equipment rental", RR_LINE, ["Core i5/i7 class devices with SSD", "Standard image: Windows, Office-ready, antivirus", "Daily, weekly, and monthly rate cards", "Deposit and return checklist documented", "Bulk kits for training rooms"], "Keep teams productive during upgrades or repairs."),
      card("Desktop PC rental", "desktop", "desktop", "Desktop computer rental", "Desktop PC rental", RR, "Equipment rental", RR_LINE, ["Mini-tower or SFF with monitor optional", "Peripheral bundle available", "Network-ready imaging", "On-site swap for dead units in PCMC", "GST invoice with asset tags"], "Temporary seats for contractors and events."),
    ],
  },
];

export const networkingCatalog: ServiceCatalogCategory[] = [
  {
    title: "Structured cabling & switching",
    description: "Cat6/Cat6A copper, patch panels, and managed switching with labelled documentation.",
    items: [
      card("Managed network switches", "network", "network", "Managed network switch", "Managed network switches", NW, "Structured cabling & switching", NW_LINE, ["Gigabit and 10G uplinks as required", "VLAN and QoS baseline configuration", "PoE budget calculated for endpoints", "Rack layout drawing supplied", "Spare SFP modules quoted separately"], "Reliable east-west traffic for growing offices."),
      card("Cat6 structured cabling", "network", "network", "Cat6 structured cabling", "Cat6 structured cabling", NW, "Structured cabling & switching", NW_LINE, ["Fluke test results on request", "Conduit and trunking per site standards", "Patch panel labelling standard agreed", "As-built diagram in PDF", "Compliance with local fire-stop rules"], "Foundation for phones, PCs, and cameras."),
      card("Fiber backbone links", "network", "network", "Fiber optic cabling", "Fiber backbone links", NW, "Structured cabling & switching", NW_LINE, ["Single-mode and multimode options", "Splice or LC termination documented", "OTDR report when specified", "Media converters or SFP pairing", "Building-to-building paths planned"], "High-speed links between buildings and floors."),
      card("Network rack build-out", "server", "server", "Network equipment rack", "Network rack build-out", NW, "Structured cabling & switching", NW_LINE, ["42U or wall-mount cabinets", "PDU and cable management", "Thermal and power load review", "Earthing check recommended", "Photo pack for IT records"], "Organised, serviceable network closets."),
    ],
  },
  {
    title: "Servers, NAS & backup",
    description: "On-premise storage and light server roles with RAID planning and backup targets.",
    items: [
      card("Synology & QNAP NAS", "server", "server", "NAS storage system", "Synology and QNAP NAS", NW, "Servers, NAS & backup", NW_LINE, ["RAID level chosen for capacity vs redundancy", "Snapshot and replication options explained", "User quotas and share permissions", "UPS pairing recommended", "Remote support tunnel with consent"], "Centralised files with controlled access."),
      card("Cloud backup gateway", "server", "server", "Hybrid cloud backup", "Cloud backup gateway", NW, "Servers, NAS & backup", NW_LINE, ["3-2-1 strategy workshop", "Encrypted off-site sync options", "Retention policies documented", "Restore drill scheduled", "Bandwidth shaping for SME links"], "Off-site protection without abandoning on-prem."),
    ],
  },
  {
    title: "IP telephony & conferencing",
    description: "IP PBX, SIP trunks, handsets, and meeting-room audio configured before go-live.",
    items: [
      card("IP desk phones", "phone", "phone", "IP desk phone", "IP desk phones", NW, "IP telephony & conferencing", NW_LINE, ["PoE or adapter power options", "Extension, BLF, and speed-dial programming", "Codec and QoS alignment on switches", "Spare handsets for hot-desking", "Training sheet for reception staff"], "Clear voice on every desk."),
      card("VoIP gateways", "phone", "phone", "VoIP gateway appliance", "VoIP gateways", NW, "IP telephony & conferencing", NW_LINE, ["FXO/FXS for legacy lines", "Failover rules documented", "Echo cancellation tuned", "Firmware baseline recorded", "Maintenance window agreed"], "Bridge analog and IP worlds cleanly."),
      card("Conference room phones", "phone", "phone", "Conference speakerphone", "Conference room phones", NW, "IP telephony & conferencing", NW_LINE, ["360° mic pickup for huddle rooms", "USB and Bluetooth models available", "Teams/Zoom certified options", "Acoustic site survey on request", "Ceiling mic arrays for boardrooms"], "Everyone heard on hybrid calls."),
      card("SIP intercom & paging", "phone", "phone", "SIP intercom system", "SIP intercom and paging", NW, "IP telephony & conferencing", NW_LINE, ["Door station integration", "Zone paging from reception", "Recorded announcements", "Secure VLAN recommended", "Testing with facilities team"], "Visitor management with voice."),
    ],
  },
  {
    title: "Attendance & access control",
    description: "Biometric terminals, RFID readers, and door control integrated with HR export formats.",
    items: [
      card("Biometric time terminals", "attendance", "attendance", "Biometric attendance terminal", "Biometric time terminals", NW, "Attendance & access control", NW_LINE, ["Fingerprint and card hybrid models", "Shift rules configured to HR policy", "Excel/CSV export templates", "TCP/IP and PoE wiring", "Tamper alerts enabled"], "Accurate payroll inputs."),
      card("Face recognition attendance", "attendance", "attendance", "Face recognition terminal", "Face recognition attendance", NW, "Attendance & access control", NW_LINE, ["Mask and lighting guidance on install", "Liveness options where required", "GDPR-style consent signage advised", "Integration with existing HRMS on request", "Fallback card mode configured"], "Touchless check-in for hygiene-sensitive sites."),
      card("RFID card readers", "attendance", "attendance", "RFID attendance reader", "RFID card readers", NW, "Attendance & access control", NW_LINE, ["Card issuance and printing optional", "Anti-passback rules available", "Visitor badge workflow", "Offline buffer on power loss", "Annual maintenance contracts"], "Fast throughput at shift change."),
      card("Visitor management kiosk", "attendance", "attendance", "Visitor management system", "Visitor management kiosk", NW, "Attendance & access control", NW_LINE, ["Photo badge printing", "Host notification by SMS/email", "NDA screen optional", "Evacuation report capability", "Branding with company logo"], "Professional reception experience."),
    ],
  },
];

export const cctvCatalog: ServiceCatalogCategory[] = [
  {
    title: "IP cameras",
    description: "Dome, bullet, and varifocal models selected for scene, lighting, and storage budget.",
    items: [
      card("Indoor dome IP cameras", "cctv", "cctv", "Indoor dome IP camera", "Indoor dome IP cameras", CV, "IP cameras", CV_LINE, ["2–8 MP options with WDR", "PoE class and switch budget verified", "Privacy masking for sensitive areas", "ONVIF profile compatibility", "Night scene sample on handover"], "Discreet coverage for offices and retail."),
      card("Outdoor bullet cameras", "cctv", "cctv", "Outdoor bullet IP camera", "Outdoor bullet IP cameras", CV, "IP cameras", CV_LINE, ["IP66/IK10 rated housings", "IR range matched to perimeter length", "Vandal-resistant mounts", "Lightning protection advised on poles", "Lens field-of-view documented"], "Perimeter deterrence with clear evidence."),
      card("Motorised varifocal cameras", "cctv", "cctv", "Varifocal IP camera", "Motorised varifocal cameras", CV, "IP cameras", CV_LINE, ["Remote zoom and focus setup", "Ideal for gates and loading bays", "Presets for incident review", "Bandwidth estimate per channel", "Calibration after install"], "One camera, multiple framing options."),
      card("Panoramic & fisheye cameras", "cctv", "cctv", "Fisheye surveillance camera", "Panoramic and fisheye cameras", CV, "IP cameras", CV_LINE, ["360° coverage for open plan areas", "Dewarping on client or NVR", "Ceiling mount height guidelines", "Single cable per zone", "Training on digital PTZ"], "Wide areas covered with fewer devices."),
    ],
  },
  {
    title: "Recording & infrastructure",
    description: "NVR/DVR platforms, surveillance drives, and PoE switching sized for retention targets.",
    items: [
      card("Network video recorders", "cctv", "cctv", "NVR recorder", "Network video recorders", CV, "Recording & infrastructure", CV_LINE, ["Channel count and bitrate planning", "RAID optional on enterprise models", "HTTPS and role-based users", "Automatic health alerts", "UPS runtime calculation"], "Centralised recording with audit trail."),
      card("Surveillance hard drives", "cctv", "cctv", "Surveillance HDD", "Surveillance hard drives", CV, "Recording & infrastructure", CV_LINE, ["Workload-rated for 24/7 write", "Slot count and RAID level advice", "SMART monitoring enabled", "Spare on-site disk optional", "RMA process documented"], "Reliable retention without premature failure."),
      card("PoE switches for CCTV", "network", "network", "PoE switch CCTV", "PoE switches for CCTV", CV, "Recording & infrastructure", CV_LINE, ["Per-port power budget spreadsheet", "VLAN isolation from corporate LAN", "Extended reach with proper cable", "Loop prevention on uplinks", "Labelled patch panel"], "Clean power and data on one cable."),
      
    ],
  },
  {
    title: "Door entry & monitoring",
    description: "Video door phones, guard monitors, and display walls for reception and security desks.",
    items: [
      card("Guard station monitors", "cctv", "cctv", "Security monitor station", "Guard station monitors", CV, "Door entry & monitoring", CV_LINE, ["Wall and desk mounts", "HDMI matrix for video walls", "Burn-in protection settings", "Alignment with NVR layout", "Operator SOP draft optional"], "Central view for security staff."),
      card("Public view displays", "desk", "desk", "CCTV display monitor", "Public view displays", CV, "Door entry & monitoring", CV_LINE, ["Commercial-grade panels", "Privacy masking on live view", "Auto-timeout to default screen", "Ceiling mount hardware", "Cable concealment options"], "Deterrence without exposing private areas."),
      card("Camera mounting hardware", "cctv", "cctv", "CCTV mount bracket", "Camera mounting hardware", CV, "Door entry & monitoring", CV_LINE, ["Pole, wall, and corner brackets", "Stainless options for coastal sites", "Load rating for PTZ heads", "Tamper-proof screws", "Corrosion inspection schedule"], "Stable images in wind and vibration."),
      
    ],
  },
];

export const wfhCatalog: ServiceCatalogCategory[] = [
  {
    title: "Computers for remote work",
    description: "Business-class laptops and desktops imaged for VPN, collaboration, and security baselines.",
    items: [
      card("WFH laptop packages", "laptop", "laptop", "WFH laptop package", "WFH laptop packages", WFH, "Computers for remote work", WFH_LINE, ["Core i5/i7 with 16 GB RAM standard", "BitLocker or encryption per policy", "Dock and carry case options", "Loan or purchase pricing", "14–15\" lightweight chassis"], "Standardised remote worker laptop."),
      card("WFH desktop setups", "desktop", "desktop", "WFH desktop computer", "WFH desktop setups", WFH, "Computers for remote work", WFH_LINE, ["Quiet SFF chassis", "Dual-monitor ready GPU", "Wired keyboard and mouse", "On-site setup optional in PCMC", "Warranty registered to company"], "Ergonomic home office without laptop compromise."),
      card("Dual-monitor kits", "desk", "desk", "Dual monitor home office", "Dual-monitor kits", WFH, "Computers for remote work", WFH_LINE, ["Matched panel sizes", "VESA arms or stands", "USB-C and HDMI cables", "Colour calibration basic", "Cable clips included"], "Productivity layout for analysts and developers."),
    ],
  },
  {
    title: "Home connectivity",
    description: "Routers, mesh Wi‑Fi, and backup links tuned for video meetings and corporate VPN.",
    items: [
      card("Business home routers", "wifi", "wifi", "Business home router", "Business home routers", WFH, "Home connectivity", WFH_LINE, ["VLAN for work vs home when required", "VPN passthrough verified", "Guest network isolation", "Firmware update plan", "Remote admin with consent"], "Secure tunnel to office resources."),
      card("Mesh Wi‑Fi systems", "wifi", "wifi", "Mesh WiFi home office", "Mesh WiFi systems", WFH, "Home connectivity", WFH_LINE, ["Whole-home coverage survey", "Backhaul wired where possible", "QoS for Teams/Zoom", "Parental controls optional", "Speed test at handover"], "Stable calls from any room."),
      card("VPN router configuration", "network", "network", "VPN router setup", "VPN router configuration", WFH, "Home connectivity", WFH_LINE, ["IPsec and SSL VPN profiles", "Split tunnel per security policy", "DNS leak checks", "Documentation for IT", "Rollback plan if issues"], "Align home edge with corporate standards."),
      card("Structured home cabling", "network", "network", "Home Ethernet cabling", "Structured home cabling", WFH, "Home connectivity", WFH_LINE, ["Cat6 home runs to study", "Faceplates and patch panel", "Neat trunking along skirting", "Test results on request", "Coordination with interior work"], "Wired backhaul for mesh and desktops."),
    ],
  },
  {
    title: "Collaboration peripherals",
    description: "Audio, video, and power accessories that make remote meetings professional.",
    items: [
      card("HD webcams & lighting", "desk", "desk", "HD webcam kit", "HD webcams and lighting", WFH, "Collaboration peripherals", WFH_LINE, ["1080p minimum for corporate standards", "Ring light or key light kits", "Privacy shutter models", "Mount for monitor and tripod", "Quick start guide"], "Clear video for client calls."),
      card("UC headsets", "phone", "phone", "Unified communications headset", "UC headsets", WFH, "Collaboration peripherals", WFH_LINE, ["Teams/Zoom certified models", "USB and Bluetooth options", "Noise-cancelling microphones", "Spare ear cushions quoted", "Warranty registration"], "All-day comfort on calls."),
      card("Speakerphones for home", "phone", "phone", "Home office speakerphone", "Speakerphones for home", WFH, "Collaboration peripherals", WFH_LINE, ["360° pickup for small rooms", "Bluetooth pairing to mobile", "Echo cancellation tuned", "Carry case for hybrid workers", "Firmware updates"], "Shared calls without laptop mic limits."),
      card("Desk power protection", "desk", "desk", "Home office UPS", "Desk power protection", WFH, "Collaboration peripherals", WFH_LINE, ["650–1500 VA typical sizing", "Runtime for safe shutdown", "Surge protection for broadband", "Wall-mount or tower", "Battery replacement service"], "Protect work during power cuts."),
    ],
  },
];

export const licenseCatalog: ServiceCatalogCategory[] = [
  {
    title: "Microsoft & productivity",
    description:
      "Cloud and perpetual licences supplied with correct edition, seat count, and activation support.",
    items: [
      card(
        "Microsoft 365",
        "m365",
        "m365",
        "Microsoft 365 subscription",
        "Microsoft 365",
        SL,
        "Microsoft & productivity",
        SL_LINE,
        [
          "Business Basic, Standard & Premium plans",
          "Teams, Outlook, OneDrive & SharePoint included",
          "Annual and monthly subscription options",
          "Tenant setup and migration support",
          "GST-compliant invoicing",
        ],
        "Cloud productivity and collaboration for modern businesses.",
      ),

      card(
        "Windows 11 Pro",
        "windows",
        "win",
        "Windows 11 Pro licence",
        "Windows 11 Pro",
        SL,
        "Microsoft & productivity",
        SL_LINE,
        [
          "OEM and volume licensing available",
          "Secure business operating system",
          "Activation and installation support",
          "Upgrade assistance from Windows 10",
          "Licence serials documented on invoice",
        ],
        "Professional Windows OS for business systems.",
      ),

      card(
        "Quick Heal Total Security",
        "shield",
        "qh",
        "Quick Heal Total Security",
        "Quick Heal Total Security",
        SL,
        "Accounting & security software",
        SL_LINE,
        [
          "Protection against malware and ransomware",
          "Internet and email security",
          "Endpoint protection for business systems",
          "Renewal and activation assistance",
          "Multi-device licence options",
        ],
        "Comprehensive antivirus and endpoint security solution.",
      ),

      card(
        "Microsoft Office",
        "office",
        "office",
        "Microsoft Office licence",
        "Microsoft Office",
        SL,
        "Microsoft & productivity",
        SL_LINE,
        [
          "Home & Business and Professional editions",
          "Word, Excel, PowerPoint & Outlook included",
          "Perpetual licence options available",
          "Activation and setup support",
          "Suitable for office desktops and laptops",
        ],
        "Essential productivity software for daily office work.",
      ),

      card(
        "Microsoft Teams",
        "m365",
        "m365",
        "Microsoft Teams collaboration",
        "Microsoft Teams",
        SL,
        "Microsoft & productivity",
        SL_LINE,
        [
          "Chat, meetings and collaboration platform",
          "Business communication setup assistance",
          "Integration with Microsoft 365",
          "Remote work and hybrid office support",
          "User onboarding guidance",
        ],
        "Professional communication and video conferencing solution.",
      ),
    ],
  },

  {
    title: "Accounting & security software",
    description:
      "Business accounting, endpoint security, and licensed enterprise software solutions.",
    items: [
      card(
        "Tally Prime",
        "tally",
        "tally",
        "Tally Prime licence",
        "Tally Prime",
        SL,
        "Accounting & security software",
        SL_LINE,
        [
          "Single-user and multi-user editions",
          "GST-ready accounting platform",
          "TSS renewal support",
          "Remote access configuration",
          "Installation and activation assistance",
        ],
        "Popular accounting and GST software for Indian businesses.",
      ),



      card(
        "VMware Workstation Pro",
        "server",
        "server",
        "VMware Workstation Pro",
        "VMware Workstation Pro",
        SL,
        "Accounting & security software",
        SL_LINE,
        [
          "Virtual machine creation and testing",
          "Multiple OS environments support",
          "Developer and IT lab usage",
          "Installation and configuration guidance",
          "Business virtualization solution",
        ],
        "Professional desktop virtualization software for IT teams.",
      ),

      card(
        "Acronis Cyber Protect",
        "shield",
        "seq",
        "Acronis Cyber Protect backup",
        "Acronis Cyber Protect",
        SL,
        "Accounting & security software",
        SL_LINE,
        [
          "Backup and disaster recovery solution",
          "Cybersecurity and ransomware protection",
          "Cloud and local backup support",
          "Automated recovery management",
          "Business continuity protection",
        ],
        "Integrated backup and cybersecurity platform for businesses.",
      ),
    ],
  },
];

export type CatalogItemWithCategory = {
  categoryTitle: string;
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
        item,
      })),
    ),
  );
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

