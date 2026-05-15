import { site } from "@/data/site";

export type ServiceProductInterest =
  | "Repair & rental"
  | "Networking & cabling"
  | "Software licences"
  | "CCTV / security"
  | "WFH service";

export type ProductHighlightCard = {
  title: string;
  body: string;
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

const img = {
  laptop: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=800&auto=format&fit=crop",
  desktop: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=800&auto=format&fit=crop",
  network: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop",
  cctv: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
  wifi: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
  server: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  desk: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
  phone: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop",
  attendance: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
  m365: "https://images.unsplash.com/photo-1633265486064-086219bdb9a4?q=80&w=800&auto=format&fit=crop",
  win: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=800&auto=format&fit=crop",
  tally: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
  qh: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
  seq: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop",
  office: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  adobe: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=800&auto=format&fit=crop",
  globe: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
} as const;

type Img = keyof typeof img;

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
  imageKey: Img,
  imageAlt: string,
  enquiryTag: string,
  defaultInterest: ServiceProductInterest,
  categoryTitle: string,
  serviceLine: string,
  specs: string[],
  summary: string,
): ServiceCatalogItem {
  const copy = productCopy(name, categoryTitle, serviceLine, specs, summary);
  return {
    name,
    slug: catalogItemSlug(enquiryTag),
    iconKey,
    image: img[imageKey],
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
      card("Preventive maintenance", "desktop", "desktop", "Desktop cleaning service", "Preventive desktop maintenance", RR, "Desktop repair & upgrade", RR_LINE, ["Internal dust extraction and fan service", "Thermal interface renewal", "CMOS battery replacement if due", "Cable dress and label touch-up", "Health report for IT asset register"], "Reduce heat-related failures in office environments."),
    ],
  },
  {
    title: "Equipment rental",
    description:
      "Short-term laptops, desktops, and peripherals for projects, training, and business continuity — with documented return dates.",
    items: [
      card("Business laptop rental", "laptop", "laptop", "Business laptop on rent", "Business laptop rental", RR, "Equipment rental", RR_LINE, ["Core i5/i7 class devices with SSD", "Standard image: Windows, Office-ready, antivirus", "Daily, weekly, and monthly rate cards", "Deposit and return checklist documented", "Bulk kits for training rooms"], "Keep teams productive during upgrades or repairs."),
      card("Desktop PC rental", "desktop", "desktop", "Desktop computer rental", "Desktop PC rental", RR, "Equipment rental", RR_LINE, ["Mini-tower or SFF with monitor optional", "Peripheral bundle available", "Network-ready imaging", "On-site swap for dead units in PCMC", "GST invoice with asset tags"], "Temporary seats for contractors and events."),
      card("Monitor & dock rental", "desk", "desk", "Monitor rental", "Monitor and dock rental", RR, "Equipment rental", RR_LINE, ["22–27\" IPS panels", "USB-C and universal docks", "HDMI/DP cables included", "Stand and VESA mount options", "Pickup from Navi Peth or delivery"], "Presentation and dual-screen setups without capital spend."),
      card("Projector & display hire", "desk", "desk", "Projector rental", "Projector and display hire", RR, "Equipment rental", RR_LINE, ["Business-grade lumens for conference rooms", "HDMI and wireless presenter options", "On-site setup available", "Lamp hours logged on return", "Insurance terms explained upfront"], "Board meetings and seminars without buying hardware."),
      card("Server & NAS loan", "server", "server", "Server rental", "Server and NAS loan", RR, "Equipment rental", RR_LINE, ["Short-term rack or tower loan during migration", "RAID configuration documented", "Data destruction policy on return", "Escorted delivery for sensitive sites", "Engineer standby optional"], "Bridge capacity during hardware refresh."),
    ],
  },
];

export const networkingCatalog: ServiceCatalogCategory[] = [
  {
    title: "Structured cabling & switching",
    description: "Cat6/Cat6A copper, patch panels, and managed switching with labelled documentation.",
    items: [
      card("Managed network switches", "network", "network", "Managed network switch", "Managed network switches", NW, "Structured cabling & switching", NW_LINE, ["Gigabit and 10G uplinks as required", "VLAN and QoS baseline configuration", "PoE budget calculated for endpoints", "Rack layout drawing supplied", "Spare SFP modules quoted separately"], "Reliable east-west traffic for growing offices."),
      card("Enterprise Wi‑Fi deployment", "wifi", "wifi", "Enterprise WiFi access points", "Enterprise WiFi deployment", NW, "Structured cabling & switching", NW_LINE, ["Site survey for AP placement", "Controller or cloud-managed options", "Guest portal and staff SSID separation", "Throughput test report on handover", "Annual health check optional"], "Consistent wireless across floors and cabins."),
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
      card("Windows Server deployment", "server", "server", "Windows Server installation", "Windows Server deployment", NW, "Servers, NAS & backup", NW_LINE, ["Edition and CAL guidance", "AD, DNS, DHCP roles scoped clearly", "Patch baseline before handover", "Backup agent pre-installed when ordered", "Hyper-V or VM host optional"], "On-prem identity and file services done right."),
      card("Surveillance-grade HDD supply", "server", "server", "Enterprise hard drives", "Surveillance-grade HDD supply", NW, "Servers, NAS & backup", NW_LINE, ["WD Purple / enterprise class media", "Annualised workload guidance", "DOA handling via distributor", "Serials on tax invoice", "Compatible cage and tray fit check"], "Storage sized for NVR and NAS duty cycles."),
      card("RAID recovery & rebuild", "server", "server", "RAID data recovery advisory", "RAID recovery and rebuild", NW, "Servers, NAS & backup", NW_LINE, ["Degraded array triage before rebuild", "Backup verification strongly advised", "Spare disk staged before reassembly", "Recovery partners engaged when needed", "Post-incident report for management"], "Minimise downtime on failed arrays."),
      card("Cloud backup gateway", "server", "server", "Hybrid cloud backup", "Cloud backup gateway", NW, "Servers, NAS & backup", NW_LINE, ["3-2-1 strategy workshop", "Encrypted off-site sync options", "Retention policies documented", "Restore drill scheduled", "Bandwidth shaping for SME links"], "Off-site protection without abandoning on-prem."),
    ],
  },
  {
    title: "IP telephony & conferencing",
    description: "IP PBX, SIP trunks, handsets, and meeting-room audio configured before go-live.",
    items: [
      card("IP desk phones", "phone", "phone", "IP desk phone", "IP desk phones", NW, "IP telephony & conferencing", NW_LINE, ["PoE or adapter power options", "Extension, BLF, and speed-dial programming", "Codec and QoS alignment on switches", "Spare handsets for hot-desking", "Training sheet for reception staff"], "Clear voice on every desk."),
      card("IP PBX platform", "phone", "phone", "IP PBX server", "IP PBX platform", NW, "IP telephony & conferencing", NW_LINE, ["IVR, hunt groups, and business hours", "SIP trunk integration with Indian carriers", "Voicemail-to-email optional", "Disaster recovery extension routing", "Admin credentials in sealed handover"], "Control your own telephony stack."),
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
      card("Door access controllers", "lock", "desk", "Access control panel", "Door access controllers", NW, "Attendance & access control", NW_LINE, ["Maglock and strike wiring", "Fire release integration coordinated with vendor", "Time zones and holiday calendars", "Audit log export", "Battery backup on locks"], "Secure zones without key duplication."),
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
      card("Colour night vision cameras", "cctv", "cctv", "Color night vision camera", "Colour night vision cameras", CV, "IP cameras", CV_LINE, ["Full-colour imaging in low light", "Supplemental lighting plan when needed", "Lower false alarms on analytics", "Storage impact explained", "Demo clip provided to security"], "Identify clothing and vehicle colour at night."),
      card("Panoramic & fisheye cameras", "cctv", "cctv", "Fisheye surveillance camera", "Panoramic and fisheye cameras", CV, "IP cameras", CV_LINE, ["360° coverage for open plan areas", "Dewarping on client or NVR", "Ceiling mount height guidelines", "Single cable per zone", "Training on digital PTZ"], "Wide areas covered with fewer devices."),
    ],
  },
  {
    title: "Recording & infrastructure",
    description: "NVR/DVR platforms, surveillance drives, and PoE switching sized for retention targets.",
    items: [
      card("Network video recorders", "cctv", "cctv", "NVR recorder", "Network video recorders", CV, "Recording & infrastructure", CV_LINE, ["Channel count and bitrate planning", "RAID optional on enterprise models", "HTTPS and role-based users", "Automatic health alerts", "UPS runtime calculation"], "Centralised recording with audit trail."),
      card("Hybrid DVR systems", "cctv", "cctv", "Hybrid DVR", "Hybrid DVR systems", CV, "Recording & infrastructure", CV_LINE, ["Analogue camera reuse where sensible", "Gradual IP migration path", "Mobile app setup with 2FA", "Export procedures for police requests", "Firmware update policy"], "Bridge legacy coax to IP."),
      card("Surveillance hard drives", "cctv", "cctv", "Surveillance HDD", "Surveillance hard drives", CV, "Recording & infrastructure", CV_LINE, ["Workload-rated for 24/7 write", "Slot count and RAID level advice", "SMART monitoring enabled", "Spare on-site disk optional", "RMA process documented"], "Reliable retention without premature failure."),
      card("PoE switches for CCTV", "network", "network", "PoE switch CCTV", "PoE switches for CCTV", CV, "Recording & infrastructure", CV_LINE, ["Per-port power budget spreadsheet", "VLAN isolation from corporate LAN", "Extended reach with proper cable", "Loop prevention on uplinks", "Labelled patch panel"], "Clean power and data on one cable."),
      card("Rack UPS for recorders", "desk", "desk", "UPS for NVR", "Rack UPS for recorders", CV, "Recording & infrastructure", CV_LINE, ["Runtime for graceful shutdown", "SNMP monitoring optional", "Battery replacement schedule", "Earthing verification", "Load test on commissioning"], "Recording stays up through brief outages."),
    ],
  },
  {
    title: "Door entry & monitoring",
    description: "Video door phones, guard monitors, and display walls for reception and security desks.",
    items: [
      card("Video door phone systems", "cctv", "cctv", "Video door phone", "Video door phone systems", CV, "Door entry & monitoring", CV_LINE, ["Flat and villa kits available", "Electric lock integration", "Mobile app for remote answer", "Multiple indoor monitors", "Wiring schematic supplied"], "See visitors before granting access."),
      card("Guard station monitors", "cctv", "cctv", "Security monitor station", "Guard station monitors", CV, "Door entry & monitoring", CV_LINE, ["Wall and desk mounts", "HDMI matrix for video walls", "Burn-in protection settings", "Alignment with NVR layout", "Operator SOP draft optional"], "Central view for security staff."),
      card("Public view displays", "desk", "desk", "CCTV display monitor", "Public view displays", CV, "Door entry & monitoring", CV_LINE, ["Commercial-grade panels", "Privacy masking on live view", "Auto-timeout to default screen", "Ceiling mount hardware", "Cable concealment options"], "Deterrence without exposing private areas."),
      card("Camera mounting hardware", "cctv", "cctv", "CCTV mount bracket", "Camera mounting hardware", CV, "Door entry & monitoring", CV_LINE, ["Pole, wall, and corner brackets", "Stainless options for coastal sites", "Load rating for PTZ heads", "Tamper-proof screws", "Corrosion inspection schedule"], "Stable images in wind and vibration."),
      card("Cable management & conduit", "network", "network", "CCTV cable conduit", "Cable management and conduit", CV, "Door entry & monitoring", CV_LINE, ["PVC and metal trunking", "Fire-stop coordination", "Outdoor UV-rated conduit", "Home-run labelling", "As-built route photos"], "Maintainable installs that pass audit."),
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
      card("Short-term loan laptops", "laptop", "laptop", "WFH loan laptop", "Short-term loan laptops", WFH, "Computers for remote work", WFH_LINE, ["Minimum hire period stated on quote", "Return checklist and damage policy", "Pre-loaded collaboration stack", "Courier or pickup in Pune", "Bulk for hiring drives"], "Cover leave and repair gaps."),
      card("Refurbished fleet supply", "laptop", "laptop", "Refurbished business laptop", "Refurbished fleet supply", WFH, "Computers for remote work", WFH_LINE, ["Grade-A cosmetic standard", "Battery health report", "One-year workshop support optional", "Asset tagging service", "Sustainable IT option"], "Cost-effective scale for large WFH rollouts."),
    ],
  },
  {
    title: "Home connectivity",
    description: "Routers, mesh Wi‑Fi, and backup links tuned for video meetings and corporate VPN.",
    items: [
      card("Business home routers", "wifi", "wifi", "Business home router", "Business home routers", WFH, "Home connectivity", WFH_LINE, ["VLAN for work vs home when required", "VPN passthrough verified", "Guest network isolation", "Firmware update plan", "Remote admin with consent"], "Secure tunnel to office resources."),
      card("Mesh Wi‑Fi systems", "wifi", "wifi", "Mesh WiFi home office", "Mesh WiFi systems", WFH, "Home connectivity", WFH_LINE, ["Whole-home coverage survey", "Backhaul wired where possible", "QoS for Teams/Zoom", "Parental controls optional", "Speed test at handover"], "Stable calls from any room."),
      card("4G/5G failover", "network", "network", "4G backup internet", "4G and 5G failover", WFH, "Home connectivity", WFH_LINE, ["USB or Ethernet CPE options", "Automatic failover scripting", "Data plan advisory only", "Dual-WAN router configuration", "Monthly usage alerts"], "Uptime when broadband drops."),
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
      card("Microsoft 365 for remote users", "m365", "m365", "Microsoft 365 remote work", "Microsoft 365 for remote users", WFH, "Collaboration peripherals", WFH_LINE, ["Business Basic or Standard SKUs", "Tenant setup and user onboarding", "Teams policy baseline", "Multi-factor authentication guidance", "Renewal calendar shared"], "Mail, files, and meetings in one subscription."),
    ],
  },
];

export const licenseCatalog: ServiceCatalogCategory[] = [
  {
    title: "Microsoft & productivity",
    description: "Cloud and perpetual licences supplied with correct edition, seat count, and activation support.",
    items: [
      card("Microsoft 365 Business", "m365", "m365", "Microsoft 365 Business", "Microsoft 365 Business", SL, "Microsoft & productivity", SL_LINE, ["Plan comparison for your headcount", "Tenant migration assistance optional", "Compliance archive options explained", "Annual vs monthly billing", "GST tax invoice"], "Email, Teams, and OneDrive for SMEs."),
      card("Windows 11 Pro licences", "windows", "win", "Windows 11 Pro licence", "Windows 11 Pro licences", SL, "Microsoft & productivity", SL_LINE, ["OEM vs volume guidance", "Upgrade path from Windows 10", "Activation troubleshooting", "Downgrade rights where applicable", "Serial recorded on invoice"], "Licensed desktop operating system."),
      card("Microsoft Office perpetual", "office", "office", "Microsoft Office perpetual", "Microsoft Office perpetual", SL, "Microsoft & productivity", SL_LINE, ["Home & Business vs Professional Plus", "Bind to device policy explained", "Medialess fulfilment", "Transfer rules on hardware change", "Support lifecycle dates shared"], "One-time purchase for fixed PCs."),
      card("Azure & server advisory", "globe", "globe", "Azure licensing advisory", "Azure and server advisory", SL, "Microsoft & productivity", SL_LINE, ["Hybrid benefit overview", "Reserved instance guidance high-level", "Partner escalation for complex estates", "Cost guardrails recommended", "Architecture workshop optional"], "Right-size cloud spend."),
    ],
  },
  {
    title: "Accounting & security software",
    description: "Tally, endpoint protection, and renewal management for finance and IT teams.",
    items: [
      card("Tally Prime licensing", "tally", "tally", "Tally Prime licence", "Tally Prime licensing", SL, "Accounting & security software", SL_LINE, ["Single and multi-user editions", "TSS renewal dates tracked", "Remote access add-ons explained", "GST-ready invoice from us", "Activation on-site optional"], "Statutory-ready books for Indian businesses."),
      card("Quick Heal endpoint security", "shield", "qh", "Quick Heal antivirus", "Quick Heal endpoint security", SL, "Accounting & security software", SL_LINE, ["Total Security and server SKUs", "Centralised console setup", "Policy templates for SMEs", "Renewal reminders", "Removal of conflicting AV"], "Defence against malware and ransomware."),
      card("Seqrite endpoint protection", "shield", "seq", "Seqrite endpoint security", "Seqrite endpoint protection", SL, "Accounting & security software", SL_LINE, ["SME and enterprise bundles", "DLP modules optional", "Deployment assistance", "Incident escalation path", "Licence true-up guidance"], "Layered protection for regulated sectors."),
      card("Adobe Acrobat & Creative Cloud", "adobe", "adobe", "Adobe Creative Cloud", "Adobe Acrobat and Creative Cloud", SL, "Accounting & security software", SL_LINE, ["Named user vs device licences", "Team and enterprise plans", "Admin console handover", "Training pointers for design teams", "True-up on user growth"], "PDF and creative tools under compliance."),
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

export type ServiceProductCard = ServiceCatalogItem;
