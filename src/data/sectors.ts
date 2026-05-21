import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faGraduationCap,
  faHospital,
  faHotel,
  faIndustry,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

import type { ServiceProductInterest } from "@/data/serviceProductLists";

export type Sector = {
  title: string;
  icon: IconDefinition;
  image: string;
  imageAlt: string;
  desc: string;
  /** Typical services we quote for this sector */
  services: string[];
  defaultInterest: ServiceProductInterest;
  enquiryContext: string;
};

/** Sectors aligned with Soft Link Computers' Pune & PCMC client base */
export const sectorsServed: Sector[] = [
  {
    title: "Healthcare",
    icon: faHospital,
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Modern hospital corridor",
    desc: "Clinics and hospitals — secure Wi‑Fi, workstation support, CCTV, and software licensing with documentation for audits.",
    services: ["CCTV", "Networking", "Laptop repair", "Microsoft 365"],
    defaultInterest: "CCTV / security",
    enquiryContext: "Healthcare sector enquiry",
  },
  {
    title: "Education",
    icon: faGraduationCap,
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
    imageAlt: "University lecture hall",
    desc: "Schools and institutes — lab refreshes, classroom networks, device rental for exams, and licensed software for staff rooms.",
    services: ["Device rental", "Networking", "Licences", "WFH kits"],
    defaultInterest: "Repair & rental",
    enquiryContext: "Education sector enquiry",
  },
  {
    title: "Corporate offices",
    icon: faBuilding,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Open plan corporate office",
    desc: "SMEs and offices in Pune & PCMC — desk moves, structured cabling, printers, Microsoft licensing, and AMC-style support.",
    services: ["Networking", "Repair", "Microsoft 365", "CCTV"],
    defaultInterest: "Networking & cabling",
    enquiryContext: "Corporate office enquiry",
  },
  {
    title: "Retail",
    icon: faStore,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Retail store interior",
    desc: "Shops and showrooms — POS reliability, back-office connectivity, and surveillance tuned to trading hours.",
    services: ["CCTV", "Networking", "Desktop repair"],
    defaultInterest: "CCTV / security",
    enquiryContext: "Retail sector enquiry",
  },
  {
    title: "Manufacturing",
    icon: faIndustry,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Industrial facility and equipment",
    desc: "Plant and warehouse sites — rugged hardware, office links, attendance terminals, and realistic on-site SLAs.",
    services: ["Networking", "Attendance", "CCTV", "Rental"],
    defaultInterest: "Networking & cabling",
    enquiryContext: "Manufacturing sector enquiry",
  },
  {
    title: "Hospitality",
    icon: faHotel,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Hotel lobby reception",
    desc: "Hotels and guest houses — segmented guest Wi‑Fi, lobby cameras, and after-hours support for front-desk teams.",
    services: ["Wi‑Fi", "CCTV", "IP telephony"],
    defaultInterest: "Networking & cabling",
    enquiryContext: "Hospitality sector enquiry",
  },
];
