"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import {
  faLaptop,
  faDesktop,
  faNetworkWired,
  faVideo,
  faWifi,
  faServer,
  faComputer,
  faPhoneVolume,
  faFingerprint,
  faLock,
  faCloud,
  faWindowMaximize,
  faFileInvoiceDollar,
  faShieldHalved,
  faFile,
  faImage,
  faGlobe,
  faDatabase,
  faCompassDrafting,
  faPaintbrush,
  faAppleWhole,
  faCode,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";

import type { CatalogIconKey } from "@/data/serviceProductLists";

const ICON_MAP: Record<CatalogIconKey, IconDefinition> = {
  laptop: faLaptop,
  desktop: faDesktop,
  network: faNetworkWired,
  cctv: faVideo,
  wifi: faWifi,
  server: faServer,
  desk: faComputer,
  phone: faPhoneVolume,
  attendance: faFingerprint,
  lock: faLock,
  m365: faCloud,
  windows: faWindowMaximize,
  tally: faFileInvoiceDollar,
  shield: faShieldHalved,
  office: faFile,
  adobe: faImage,
  globe: faGlobe,
  oracle: faDatabase,
  autodesk: faCompassDrafting,
  corel: faPaintbrush,
  apple: faAppleWhole,
  jetbrains: faCode,
  ibm: faBuilding,
};

export default function CatalogIcon({
  iconKey,
  className = "text-xl",
}: {
  iconKey: CatalogIconKey;
  className?: string;
}) {
  return <FontAwesomeIcon icon={ICON_MAP[iconKey]} className={className} aria-hidden />;
}
