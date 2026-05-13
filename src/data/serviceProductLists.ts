export type ServiceProductInterest =
  | "Repair & rental"
  | "Networking & cabling"
  | "Software licences"
  | "CCTV / security";

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

/** Product card: icon + title + image + Enquiry (no bullet list). */
export type ServiceCatalogItem = {
  name: string;
  iconKey: CatalogIconKey;
  image: string;
  imageAlt: string;
  defaultInterest: ServiceProductInterest;
  enquiryTag: string;
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
  cctv: "https://images.unsplash.com/photo-1584433144859-1fc3ab64a728?q=80&w=800&auto=format&fit=crop",
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

function card(
  name: string,
  iconKey: CatalogIconKey,
  imageKey: Img,
  imageAlt: string,
  enquiryTag: string,
  defaultInterest: ServiceProductInterest,
): ServiceCatalogItem {
  return {
    name,
    iconKey,
    image: img[imageKey],
    imageAlt,
    enquiryTag,
    defaultInterest,
  };
}

const RR = "Repair & rental" as const;
const NW = "Networking & cabling" as const;
const CV = "CCTV / security" as const;
const SL = "Software licences" as const;

export const repairRentalCatalog: ServiceCatalogCategory[] = [
  {
    title: "Laptop repair",
    description: "Workshop repairs with ticket notes and parts quoted before we order.",
    items: [
      card("Laptop screen replacement", "laptop", "laptop", "Laptop screen repair", "Laptop screen replacement", RR),
      card("Laptop battery replacement", "laptop", "laptop", "Laptop battery replacement", "Laptop battery replacement", RR),
      card("Keyboard repair", "laptop", "laptop", "Laptop keyboard repair", "Keyboard repair", RR),
      card("SSD upgrade", "laptop", "laptop", "SSD upgrade in laptop", "SSD upgrade (laptop)", RR),
      card("RAM upgrade", "laptop", "laptop", "Laptop RAM upgrade", "RAM upgrade (laptop)", RR),
    ],
  },
  {
    title: "Desktop services",
    description: "Tower and SFF upgrades, cleaning, and power-safe swaps.",
    items: [
      card("Desktop RAM upgrade", "desktop", "desktop", "Desktop RAM upgrade", "Desktop RAM upgrade", RR),
      card("SSD installation", "desktop", "desktop", "Desktop SSD installation", "SSD installation (desktop)", RR),
      card("Motherboard repair", "desktop", "desktop", "Desktop motherboard service", "Motherboard repair", RR),
      card("Power supply replacement", "desktop", "desktop", "Desktop power supply replacement", "Power supply replacement", RR),
      card("Desktop cleaning & servicing", "desktop", "desktop", "Desktop cleaning and servicing", "Desktop cleaning & servicing", RR),
    ],
  },
  {
    title: "Networking hardware",
    description: "Routers, switches, cable plant, and Wi‑Fi — GST invoice with serials.",
    items: [
      card("WiFi routers", "wifi", "network", "WiFi router hardware", "WiFi routers (supply)", RR),
      card("Network switches", "network", "network", "Network switch", "Network switches (supply)", RR),
      card("LAN cables", "network", "network", "Ethernet LAN cables", "LAN cables", RR),
      card("Access points", "wifi", "wifi", "Wireless access point", "Access points (supply)", RR),
      card("Modems", "network", "network", "Network modem", "Modems", RR),
    ],
  },
  {
    title: "CCTV systems",
    description: "Cameras, recorders, storage, and door phones with retention sizing in the quote.",
    items: [
      card("Dome CCTV cameras", "cctv", "cctv", "Dome CCTV camera", "Dome CCTV cameras", CV),
      card("Bullet CCTV cameras", "cctv", "cctv", "Bullet CCTV camera", "Bullet CCTV cameras", CV),
      card("DVR / NVR recording systems", "cctv", "cctv", "DVR NVR recorder", "DVR/NVR recording systems", CV),
      card("CCTV hard drives", "cctv", "cctv", "CCTV surveillance hard drive", "CCTV hard drives", CV),
      card("Video door phones", "cctv", "cctv", "Video door phone", "Video door phones", CV),
    ],
  },
];

export const networkingCatalog: ServiceCatalogCategory[] = [
  {
    title: "Wired & wireless networking",
    description: "LAN and Wi‑Fi supply plus documentation for handover.",
    items: [
      card("WiFi routers", "wifi", "wifi", "WiFi router", "WiFi routers (networking)", NW),
      card("Network switches", "network", "network", "Network switches", "Network switches (networking)", NW),
      card("Access points", "wifi", "wifi", "Access points", "Access points (networking)", NW),
      card("LAN cables", "network", "network", "LAN cables", "LAN cables (networking)", NW),
      card("Network racks", "server", "server", "Network rack", "Network racks", NW),
    ],
  },
  {
    title: "NAS & server setup",
    description: "Shared storage and light server roles with RAID explained plainly.",
    items: [
      card("NAS storage devices", "server", "server", "NAS storage", "NAS storage devices", NW),
      card("Rack servers", "server", "server", "Rack server", "Rack servers", NW),
      card("Server hard drives", "server", "server", "Server hard drives", "Server hard drives", NW),
      card("RAID controllers", "server", "server", "RAID controller", "RAID controllers", NW),
      card("Backup storage systems", "server", "server", "Backup storage", "Backup storage systems", NW),
    ],
  },
  {
    title: "Hardware & accessories",
    description: "Peripherals and power for desks and small offices.",
    items: [
      card("Keyboards & mouse", "desk", "desk", "Keyboard and mouse", "Keyboards & mouse", NW),
      card("SSD & RAM", "desk", "desk", "SSD and RAM", "SSD & RAM (accessories)", NW),
      card("UPS systems", "desk", "desk", "UPS system", "UPS systems", NW),
      card("Laptop chargers", "desk", "desk", "Laptop charger", "Laptop chargers", NW),
      card("USB hubs & adapters", "desk", "desk", "USB hub and adapters", "USB hubs & adapters", NW),
    ],
  },
  {
    title: "IP PBX systems",
    description: "Voice paths, handsets, and trunks programmed before admin handover.",
    items: [
      card("IP phones", "phone", "phone", "IP phone", "IP phones", NW),
      card("PBX servers", "phone", "phone", "PBX server", "PBX servers", NW),
      card("VoIP gateways", "phone", "phone", "VoIP gateway", "VoIP gateways", NW),
      card("Conference phones", "phone", "phone", "Conference phone", "Conference phones", NW),
      card("SIP intercom systems", "phone", "phone", "SIP intercom", "SIP intercom systems", NW),
    ],
  },
  {
    title: "CCTV & surveillance",
    description: "Supply and install with VLAN and storage math on paper.",
    items: [
      card("Dome cameras", "cctv", "cctv", "Dome camera", "Dome cameras (networking)", CV),
      card("Bullet cameras", "cctv", "cctv", "Bullet camera", "Bullet cameras (networking)", CV),
      card("DVR / NVR systems", "cctv", "cctv", "DVR NVR", "DVR/NVR systems (networking)", CV),
      card("CCTV hard drives", "cctv", "cctv", "CCTV hard drive", "CCTV hard drives (networking)", CV),
      card("Video door phones", "cctv", "cctv", "Video door phone", "Video door phones (networking)", CV),
    ],
  },
  {
    title: "Attendance systems",
    description: "Biometric and RFID — export format confirmed before first mount.",
    items: [
      card("Biometric attendance machines", "attendance", "attendance", "Biometric attendance", "Biometric attendance machines", NW),
      card("Face recognition systems", "attendance", "attendance", "Face recognition attendance", "Face recognition systems", NW),
      card("RFID attendance devices", "attendance", "attendance", "RFID attendance", "RFID attendance devices", NW),
      card("Access control systems", "attendance", "attendance", "Access control", "Access control systems", NW),
      card("Smart door locks", "lock", "desk", "Smart door lock", "Smart door locks", NW),
    ],
  },
];

export const licenseCatalog: ServiceCatalogCategory[] = [
  {
    title: "Licence products",
    description: "Authorised distribution — tap Enquiry for seats, editions, and renewal dates.",
    items: [
      card("Microsoft 365", "m365", "m365", "Microsoft 365", "Microsoft 365", SL),
      card("Windows 11 Pro", "windows", "win", "Windows 11", "Windows 11 Pro", SL),
      card("Tally Prime", "tally", "tally", "Tally Prime", "Tally Prime", SL),
      card("Quick Heal Total Security", "shield", "qh", "Quick Heal security", "Quick Heal Total Security", SL),
      card("Seqrite Endpoint Security", "shield", "seq", "Seqrite endpoint", "Seqrite Endpoint Security", SL),
      card("Microsoft Office (perpetual)", "office", "office", "Microsoft Office", "Microsoft Office perpetual", SL),
      card("Adobe Acrobat & Creative Cloud", "adobe", "adobe", "Adobe Creative Cloud", "Adobe Acrobat / Creative Cloud", SL),
      card("Server & CAL advisory", "globe", "globe", "Server licensing", "Server & CAL licensing", SL),
    ],
  },
];

export type ServiceProductCard = ServiceCatalogItem;
