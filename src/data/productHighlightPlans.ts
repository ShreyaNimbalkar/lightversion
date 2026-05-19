import type { ProductHighlightCard, ServiceCatalogItem } from "@/data/serviceProductLists";

/** Desktop / PC on rent */
export const COMPUTER_RENTAL_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Core i5 Computer on Rent",
    features: [
      "Intel Core i5 Processor",
      "4 - 8 GB RAM",
      "250 GB - 500 GB HDD",
      "10/100 MBPS LAN CARD",
      "Logitech KBD & Mouse",
      '18.5" TFT Screen',
    ],
  },
  {
    title: "Core i7 Computer on Rent",
    features: [
      "Intel Core i7 Processor",
      "8 - 16 GB RAM",
      "500 GB - 1 TB HDD",
      "Graphics Card",
      "Logitech KBD & Mouse",
      '18.5" or 21.5" TFT Screen',
    ],
  },
  {
    title: "Dual Core Computer on Rent",
    features: [
      "Intel Dual Core Processor",
      "2 - 4 GB RAM",
      "160 GB - 250 GB HDD",
      "10/100 MBPS LAN CARD",
      "Logitech KBD & Mouse",
      '18" TFT Screen',
    ],
  },
  {
    title: "Core i3 Computer on Rent",
    features: [
      "Intel Core i3 Processor",
      "4 - 8 GB RAM",
      "160 GB - 250 GB HDD",
      "10/100 MBPS LAN CARD",
      "Logitech KBD & Mouse",
      '18" TFT Screen',
    ],
  },
];

export const LAPTOP_RENTAL_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Dell Latitude on Rent",
    features: [
      "Intel Core i5 / i7",
      "8 - 16 GB RAM",
      "256 GB - 512 GB SSD",
      '14" HD / Full HD display',
      "Windows 11 Pro ready",
      "Logitech KBD & Mouse (optional dock)",
    ],
  },
  {
    title: "HP ProBook on Rent",
    features: [
      "Intel Core i5 / i7",
      "8 - 16 GB RAM",
      "256 GB - 512 GB SSD",
      '14" or 15.6" display',
      "BitLocker-ready imaging",
      "Carry bag available",
    ],
  },
  {
    title: "Lenovo ThinkPad on Rent",
    features: [
      "Intel Core i5 / i7",
      "8 - 16 GB RAM",
      "256 GB - 1 TB SSD",
      '14" anti-glare display',
      "TrackPoint + standard keyboard",
      "Docking station optional",
    ],
  },
  {
    title: "Acer TravelMate on Rent",
    features: [
      "Intel Core i3 / i5",
      "4 - 8 GB RAM",
      "256 GB SSD",
      '15.6" display',
      "Lightweight chassis",
      "Ideal for training batches",
    ],
  },
];

export const M365_LICENSE_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Microsoft 365 Business Basic",
    subtitle: "(Formerly Office 365 Business Essentials)",
    price: "₹ 125.00 User/Month",
    priceNote: "(Monthly Commitment) (GST Extra)",
    body: "Best for businesses that need Microsoft Teams and cloud storage. Desktop versions of Office apps not included.",
    features: [
      "Office apps — Web & mobile: Word, Excel, PowerPoint",
      "Microsoft Teams",
      "OneDrive cloud storage",
      "MS Office 365 monthly subscription",
    ],
  },
  {
    title: "Microsoft 365 Business Standard",
    subtitle: "(Formerly Office 365 Business Premium)",
    price: "₹ 600.00 User/Month",
    priceNote: "(Monthly Commitment) (GST Extra)",
    body: "Best for businesses that need Office apps across devices plus business email, cloud file storage, and online meetings and chat.",
    features: [
      "Desktop + web + mobile Office apps",
      "Outlook, Teams, OneDrive & SharePoint",
      "MS Office 365 monthly subscription",
    ],
  },
  {
    title: "Microsoft 365 Business Premium",
    subtitle: "(Formerly Microsoft 365 Business)",
    price: "₹ 850.00 User/Month",
    priceNote: "(Monthly Commitment) (GST Extra)",
    body: "Best for enterprises who need everything in Business Standard plus advanced cyber threat protection and device management.",
    features: [
      "All Business Standard apps & services",
      "Advanced threat protection",
      "Device management",
      "MS Office 365 Business Premium monthly subscription",
    ],
  },
];

const WINDOWS_LICENSE_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Windows 11 Pro — OEM",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    body: "For new PCs purchased with Windows pre-licensed through authorised channels.",
    features: [
      "Tied to device motherboard",
      "Activation on first setup",
      "Ideal for new laptop & desktop purchases",
      "GST invoice with licence details",
    ],
  },
  {
    title: "Windows 11 Pro — Retail",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    body: "Transferable licence for upgrades and standalone installs on qualifying hardware.",
    features: [
      "Upgrade from Windows 10 where eligible",
      "Clean install support",
      "Product key supplied on invoice",
      "Workshop activation assistance",
    ],
  },
  {
    title: "Windows 11 Pro — Volume",
    price: "Quote on request",
    priceNote: "(GST Extra · seat volume)",
    body: "For offices rolling out 5+ seats with centralised deployment.",
    features: [
      "Volume key or KMS-style deployment guidance",
      "Standard corporate image support",
      "Serial tracking for audit",
      "Renewal and true-up advice",
    ],
  },
];

const OFFICE_LICENSE_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Microsoft Office Home & Business",
    price: "Quote on request",
    priceNote: "(Perpetual · GST Extra)",
    body: "Word, Excel, PowerPoint and Outlook for small offices and home businesses.",
    features: [
      "One-time licence option",
      "1 PC or Mac per licence",
      "Activation support included",
      "Suitable for single-seat users",
    ],
  },
  {
    title: "Microsoft Office Professional",
    price: "Quote on request",
    priceNote: "(Perpetual · GST Extra)",
    body: "Full desktop suite with Outlook and Publisher/Access where edition includes them.",
    features: [
      "Desktop apps — no subscription",
      "Volume discounts on 5+ seats",
      "Installation on workshop bench optional",
      "Licence card or digital delivery",
    ],
  },
  {
    title: "Microsoft Office — volume / OLP",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    body: "For organisations standardising Office on many desktops.",
    features: [
      "Edition matched to IT policy",
      "Centralised deployment notes",
      "GST-compliant tax invoice",
      "Upgrade path to Microsoft 365 explained",
    ],
  },
];

const QUICK_HEAL_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Quick Heal Total Security — 1 PC",
    price: "Quote on request",
    priceNote: "(1 year · GST Extra)",
    features: [
      "Antivirus + anti-ransomware",
      "Internet & email protection",
      "Automatic updates",
      "Activation on delivery",
    ],
  },
  {
    title: "Quick Heal Total Security — 3 PCs",
    price: "Quote on request",
    priceNote: "(1 year · GST Extra)",
    features: [
      "Covers 3 devices — office or home",
      "Central renewal reminder",
      "Firewall & web security",
      "Remote activation support",
    ],
  },
  {
    title: "Quick Heal Total Security — 5 PCs",
    price: "Quote on request",
    priceNote: "(1 year · GST Extra)",
    features: [
      "SME bundle pricing",
      "Endpoint protection for workstations",
      "GST invoice for IT records",
      "Renewal aligned to financial year",
    ],
  },
];

const TALLY_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Tally Prime — Silver (Single user)",
    price: "Quote on request",
    priceNote: "(GST Extra · TSS renewal separate)",
    features: [
      "Single company, single user",
      "GST billing & returns ready",
      "Installation & activation",
      "Basic training handout",
    ],
  },
  {
    title: "Tally Prime — Gold (Multi-user)",
    price: "Quote on request",
    priceNote: "(GST Extra · LAN edition)",
    features: [
      "Multiple users on LAN",
      "Inventory & payroll modules",
      "Remote access configuration optional",
      "TSS renewal support",
    ],
  },
  {
    title: "Tally Prime — Auditor / CA edition",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    features: [
      "Audit & compliance workflows",
      "Data export for CA review",
      "Multi-company access",
      "Activation & upgrade assistance",
    ],
  },
];

const VMWARE_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "VMware Workstation Pro — Single user",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    features: [
      "Desktop hypervisor for IT & dev",
      "Multiple VM snapshots",
      "Windows & Linux guests",
      "Installation guidance",
    ],
  },
  {
    title: "VMware Workstation Pro — Team pack",
    price: "Quote on request",
    priceNote: "(GST Extra · 3+ seats)",
    features: [
      "Lab standardisation",
      "Clone templates for QA",
      "Licence keys on invoice",
      "Version upgrade advice",
    ],
  },
  {
    title: "VMware — renewal & support",
    price: "Quote on request",
    priceNote: "(GST Extra)",
    features: [
      "Subscription renewal processing",
      "Major version upgrade path",
      "GST-compliant billing",
      "Email support for activation issues",
    ],
  },
];

const ACRONIS_HIGHLIGHTS: ProductHighlightCard[] = [
  {
    title: "Acronis Cyber Protect — Workstation",
    price: "Quote on request",
    priceNote: "(Per device · GST Extra)",
    features: [
      "Local + cloud backup",
      "Anti-malware integrated",
      "Recovery media creation",
      "Central console optional",
    ],
  },
  {
    title: "Acronis Cyber Protect — Server",
    price: "Quote on request",
    priceNote: "(Per server · GST Extra)",
    features: [
      "Bare-metal restore",
      "Application-aware backup",
      "Retention policies",
      "Disaster recovery planning",
    ],
  },
  {
    title: "Acronis Cyber Protect — Bundle",
    price: "Quote on request",
    priceNote: "(Mixed fleet · GST Extra)",
    features: [
      "Workstation + server mix",
      "Ransomware protection",
      "Encrypted cloud target",
      "Restore drill documentation",
    ],
  },
];

/** Category-level cards — shared by all products in that catalogue section */
const CATEGORY_HIGHLIGHTS: Record<string, ProductHighlightCard[]> = {
  "Laptop repair": [
    {
      title: "Dell laptop service",
      features: [
        "Latitude & Inspiron series",
        "Genuine or compatible parts quoted",
        "2–5 day typical turnaround",
        "Workshop ticket for status tracking",
        "GST invoice with part serials",
      ],
    },
    {
      title: "HP laptop service",
      features: [
        "ProBook & EliteBook support",
        "Battery, screen, keyboard jobs",
        "Liquid damage assessment first",
        "Loan device subject to stock",
        "Pune pickup & drop available",
      ],
    },
    {
      title: "Lenovo laptop service",
      features: [
        "ThinkPad & IdeaPad repairs",
        "RAM & SSD upgrades",
        "Firmware update after repair",
        "Warranty-safe parts where possible",
        "Bench QC before handover",
      ],
    },
    {
      title: "Acer / Asus / other brands",
      features: [
        "Diagnosis before parts order",
        "Compatible panels & batteries",
        "All brands diagnosed on request",
        "Lead time depends on parts",
        "Written estimate upfront",
      ],
    },
  ],
  "Desktop repair & upgrade": [
    {
      title: "Basic desktop service",
      features: [
        "Cleaning & thermal service",
        "Power supply check",
        "Driver & Windows health scan",
        "Virus scan optional",
        "Same-week turnaround typical",
      ],
    },
    {
      title: "RAM & storage upgrade",
      features: [
        "DDR4 / DDR5 matched to board",
        "SSD clone or fresh OS",
        "SMART report on delivery",
        "Cable management included",
        "Performance test after install",
      ],
    },
    {
      title: "Motherboard & PSU repair",
      features: [
        "No-power diagnosis",
        "PSU wattage sized correctly",
        "Capacitor & power rail check",
        "Burn-in before return",
        "Parts quoted before order",
      ],
    },
    {
      title: "Workstation / GPU service",
      features: [
        "NVIDIA Quadro & AMD Pro",
        "Driver clean install",
        "Benchmark after repair",
        "Loan GPU if available",
        "CAD & design workload tested",
      ],
    },
  ],
  "Structured cabling & switching": [
    {
      title: "Small office — up to 24 ports",
      features: [
        "Cat6 cabling per point",
        "24-port managed switch",
        "Patch panel labelling",
        "Fluke test on request",
        "As-built PDF diagram",
      ],
    },
    {
      title: "Mid-size office — 25–48 ports",
      features: [
        "VLAN & QoS baseline",
        "48-port PoE switch option",
        "Rack or wall cabinet",
        "Spare ports for growth",
        "GST quotation before site work",
      ],
    },
    {
      title: "Fiber backbone add-on",
      features: [
        "Single-mode / multimode",
        "Building-to-building links",
        "SFP pairing documented",
        "OTDR report when specified",
        "Media converter if required",
      ],
    },
    {
      title: "Rack & power package",
      features: [
        "42U or wall-mount rack",
        "PDU & cable management",
        "Earthing check advised",
        "Photo pack for IT records",
        "Thermal review",
      ],
    },
  ],
  "Servers, NAS & backup": [
    {
      title: "2-bay NAS — SOHO",
      features: [
        "Synology or QNAP 2-bay",
        "RAID 1 mirroring",
        "User shares & permissions",
        "UPS pairing recommended",
        "Remote support with consent",
      ],
    },
    {
      title: "4–8 bay NAS — SME",
      features: [
        "RAID 5/6 capacity planning",
        "Snapshot replication",
        "Off-site sync optional",
        "Quota per department",
        "Handover training included",
      ],
    },
    {
      title: "Cloud backup gateway",
      features: [
        "3-2-1 backup strategy",
        "Encrypted off-site target",
        "Retention policy documented",
        "Restore drill scheduled",
        "Bandwidth shaping for SME links",
      ],
    },
  ],
  "IP telephony & conferencing": [
    {
      title: "Entry desk phone",
      features: [
        "PoE or adapter power",
        "2–8 line appearances",
        "Speed dial programming",
        "QoS on managed switch",
        "User quick-start sheet",
      ],
    },
    {
      title: "Executive IP phone",
      features: [
        "Colour display & BLF keys",
        "Headset port",
        "HD voice codecs",
        "Hot-desking profile optional",
        "Spare handset available",
      ],
    },
    {
      title: "Conference room audio",
      features: [
        "360° mic pickup",
        "Teams / Zoom certified models",
        "USB & Bluetooth options",
        "Ceiling mic for boardrooms",
        "Acoustic survey on request",
      ],
    },
    {
      title: "SIP intercom & paging",
      features: [
        "Door station integration",
        "Zone paging",
        "Recorded announcements",
        "Secure VLAN recommended",
        "Tested with facilities team",
      ],
    },
  ],
  "Attendance & access control": [
    {
      title: "Fingerprint terminal",
      features: [
        "Card + fingerprint hybrid",
        "Shift rules to HR policy",
        "Excel / CSV export",
        "TCP/IP or PoE",
        "Tamper alerts",
      ],
    },
    {
      title: "Face recognition terminal",
      features: [
        "Touchless check-in",
        "Mask-friendly models",
        "Liveness detection option",
        "HRMS integration on request",
        "Consent signage advised",
      ],
    },
    {
      title: "RFID card system",
      features: [
        "Card printing optional",
        "Anti-passback rules",
        "Visitor badge flow",
        "Offline buffer on power loss",
        "AMC available",
      ],
    },
    {
      title: "Visitor management kiosk",
      features: [
        "Photo badge printing",
        "Host SMS / email alert",
        "NDA screen optional",
        "Evacuation report",
        "Branded welcome screen",
      ],
    },
  ],
  "IP cameras": [
    {
      title: "2 MP dome — indoor",
      features: [
        "PoE powered",
        "WDR for reception areas",
        "Privacy masking",
        "Night IR range quoted",
        "ONVIF compatible",
      ],
    },
    {
      title: "4 MP bullet — outdoor",
      features: [
        "IP66 weather housing",
        "Varifocal lens option",
        "Vandal-resistant mount",
        "Perimeter IR coverage",
        "Sample night image on handover",
      ],
    },
    {
      title: "Motorised varifocal",
      features: [
        "Remote zoom & focus",
        "Gate & loading bay ideal",
        "Preset positions",
        "Bandwidth estimate per channel",
        "Calibration included",
      ],
    },
    {
      title: "360° / fisheye",
      features: [
        "Open-plan coverage",
        "Ceiling mount",
        "Dewarp on NVR or client",
        "Single cable per zone",
        "Digital PTZ training",
      ],
    },
  ],
  "Recording & infrastructure": [
    {
      title: "8-channel NVR kit",
      features: [
        "Up to 8 IP cameras",
        "1–4 TB surveillance HDD",
        "Mobile app setup",
        "HTTPS remote access",
        "UPS runtime advice",
      ],
    },
    {
      title: "16-channel NVR kit",
      features: [
        "Mid-size office & retail",
        "RAID optional",
        "Role-based users",
        "Health alert email",
        "Retention calculator provided",
      ],
    },
    {
      title: "32+ channel NVR",
      features: [
        "Enterprise channel count",
        "RAID 5/6 recommended",
        "Dual NIC isolation",
        "Integration with access control",
        "Operator training",
      ],
    },
    {
      title: "PoE switch for CCTV",
      features: [
        "Per-port power budget sheet",
        "VLAN from corporate LAN",
        "Extended reach with Cat6",
        "Labelled patch panel",
        "Loop prevention on uplink",
      ],
    },
  ],
  "Door entry & monitoring": [
    {
      title: "Guard station — single screen",
      features: [
        '22"–24" commercial monitor',
        "HDMI from NVR",
        "Wall or desk mount",
        "Burn-in protection",
        "Operator SOP optional",
      ],
    },
    {
      title: "Video wall — multi screen",
      features: [
        "HDMI matrix",
        "2×2 or 3×3 layout",
        "Central monitoring desk",
        "Aligned to NVR layout",
        "Cable concealment",
      ],
    },
    {
      title: "Public view display",
      features: [
        "Live view only (no controls)",
        "Privacy mask on sensitive areas",
        "Timeout to logo screen",
        "Ceiling mount option",
        "Deterrent for reception",
      ],
    },
  ],
  "Computers for remote work": LAPTOP_RENTAL_HIGHLIGHTS,
  "Home connectivity": [
    {
      title: "Basic home router",
      features: [
        "Dual-band Wi-Fi",
        "Guest network",
        "VPN passthrough tested",
        "Firmware update plan",
        "Remote setup optional",
      ],
    },
    {
      title: "Mesh Wi-Fi — 2 pack",
      features: [
        "Whole flat coverage",
        "Wired backhaul preferred",
        "QoS for video calls",
        "Parental controls optional",
        "Speed test at handover",
      ],
    },
    {
      title: "Mesh Wi-Fi — 3 pack",
      features: [
        "Large home / duplex",
        "Dedicated work VLAN option",
        "Ethernet port on node",
        "Teams / Zoom prioritisation",
        "On-site survey in PCMC",
      ],
    },
    {
      title: "VPN router package",
      features: [
        "IPsec / SSL to office",
        "Split tunnel per IT policy",
        "DNS leak check",
        "Documentation for helpdesk",
        "Rollback if incompatible",
      ],
    },
  ],
  "Collaboration peripherals": [
    {
      title: "HD webcam kit",
      features: [
        "1080p minimum",
        "Privacy shutter",
        "Ring light optional",
        "Monitor & tripod mount",
        "Plug-and-play test",
      ],
    },
    {
      title: "UC headset — wired",
      features: [
        "Teams / Zoom certified",
        "Noise-cancelling mic",
        "USB-A / USB-C",
        "Inline mute & volume",
        "Spare ear pads quoted",
      ],
    },
    {
      title: "UC headset — wireless",
      features: [
        "Bluetooth + USB dongle",
        "All-day battery",
        "Busy light optional",
        "Multi-device pairing",
        "Carry case available",
      ],
    },
    {
      title: "Speakerphone & UPS",
      features: [
        "360° conference mic",
        "Bluetooth to mobile",
        "650–1500 VA UPS",
        "Surge for router & PC",
        "Battery replacement service",
      ],
    },
  ],
  "Microsoft & productivity": M365_LICENSE_HIGHLIGHTS,
  "Accounting & security software": TALLY_HIGHLIGHTS,
};

const LAPTOP_RENTAL_SLUGS = new Set(["business-laptop-rental", "wfh-laptop-packages"]);

const SLUG_HIGHLIGHTS: Record<string, ProductHighlightCard[]> = {
  "business-laptop-rental": LAPTOP_RENTAL_HIGHLIGHTS,
  "wfh-laptop-packages": LAPTOP_RENTAL_HIGHLIGHTS,
  "desktop-pc-rental": COMPUTER_RENTAL_HIGHLIGHTS,
  "wfh-desktop-setups": COMPUTER_RENTAL_HIGHLIGHTS,
  "microsoft-365": M365_LICENSE_HIGHLIGHTS,
  "microsoft-teams": M365_LICENSE_HIGHLIGHTS,
  "microsoft-office": OFFICE_LICENSE_HIGHLIGHTS,
  "windows-11-pro": WINDOWS_LICENSE_HIGHLIGHTS,
  "quick-heal-total-security": QUICK_HEAL_HIGHLIGHTS,
  "tally-prime": TALLY_HIGHLIGHTS,
  "vmware-workstation-pro": VMWARE_HIGHLIGHTS,
  "acronis-cyber-protect": ACRONIS_HIGHLIGHTS,
};

/** Build 3 tier cards from product specs when no preset exists */
function highlightsFromSpecs(item: ServiceCatalogItem): ProductHighlightCard[] {
  const specs = item.specs.length > 0 ? item.specs : [item.summary];
  const tiers = ["Standard package", "Recommended package", "Premium package"];
  const perTier = Math.max(2, Math.ceil(specs.length / tiers.length));

  return tiers.map((tier, index) => ({
    title: tier,
    body: index === 1 ? item.summary : undefined,
    features: specs.slice(index * perTier, index * perTier + perTier),
  }));
}

export function resolveProductHighlights(
  item: ServiceCatalogItem,
  categoryTitle: string,
): ProductHighlightCard[] {
  if (SLUG_HIGHLIGHTS[item.slug]) {
    return SLUG_HIGHLIGHTS[item.slug];
  }

  if (categoryTitle === "Equipment rental") {
    return LAPTOP_RENTAL_SLUGS.has(item.slug)
      ? LAPTOP_RENTAL_HIGHLIGHTS
      : COMPUTER_RENTAL_HIGHLIGHTS;
  }

  const categoryCards = CATEGORY_HIGHLIGHTS[categoryTitle];
  if (categoryCards) {
    return categoryCards;
  }

  return highlightsFromSpecs(item);
}
