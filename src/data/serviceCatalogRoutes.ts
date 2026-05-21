import type { ServiceCatalogCategory, ServiceProductInterest } from "@/data/serviceProductLists";
import {
  cctvCatalog,
  licenseCatalog,
  networkingCatalog,
  repairRentalCatalog,
  wfhCatalog,
} from "@/data/serviceProductLists";

export type ServiceCatalogRoute = {
  /** URL path segment, e.g. repair-rental */
  path: string;
  label: string;
  eyebrow: string;
  defaultInterest: ServiceProductInterest;
  catalog: ServiceCatalogCategory[];
  catalogSubtitle: string;
};

export const SERVICE_CATALOG_ROUTES: ServiceCatalogRoute[] = [
  {
    path: "repair-rental",
    label: "Repair & rental",
    eyebrow: "Rental & repair",
    defaultInterest: "Repair & rental",
    catalog: repairRentalCatalog,
    catalogSubtitle:
      "Choose a category — laptops, desktops, or rental — then browse products, plans, and indicative pricing.",
  },
  {
    path: "networking",
    label: "Networking & cabling",
    eyebrow: "Networking",
    defaultInterest: "Networking & cabling",
    catalog: networkingCatalog,
    catalogSubtitle:
      "Structured cabling, NAS, telephony, and access control — organised by category for faster browsing.",
  },
  {
    path: "cctv-services",
    label: "CCTV / security",
    eyebrow: "CCTV",
    defaultInterest: "CCTV / security",
    catalog: cctvCatalog,
    catalogSubtitle: "Cameras, recording, and monitoring hardware grouped by deployment type.",
  },
  {
    path: "wfh-service",
    label: "WFH service",
    eyebrow: "WFH",
    defaultInterest: "WFH service",
    catalog: wfhCatalog,
    catalogSubtitle: "Remote-work kits — computers, connectivity, and meeting-room peripherals.",
  },
  {
    path: "licenses",
    label: "Software licences",
    eyebrow: "Licences",
    defaultInterest: "Software licences",
    catalog: licenseCatalog,
    catalogSubtitle: "Microsoft, accounting, and security software with plan-level pricing.",
  },
];

export function getServiceRouteByPath(path: string): ServiceCatalogRoute | undefined {
  return SERVICE_CATALOG_ROUTES.find((r) => r.path === path);
}

export function getServicePathForInterest(interest: ServiceProductInterest): string {
  const route = SERVICE_CATALOG_ROUTES.find((r) => r.defaultInterest === interest);
  return route?.path ?? "repair-rental";
}
