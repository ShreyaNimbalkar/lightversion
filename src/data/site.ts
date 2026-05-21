/**
 * Public business facts — aligned with https://www.softlinkcomputers.co.in/
 * Update here to refresh contact blocks, footers, and mailto targets sitewide.
 */

export const site = {
  legalName: "Soft Link Computers",
  /** Shorter name for nav / meta where space is tight */
  brandName: "Soft Link Computers",
  /** Legacy product line name still used on invoices in some stacks */
  tradingAs: "Soft Link Computers",
  url: "https://www.softlinkcomputers.co.in",
  establishedYear: 2012,
  proprietor: "Nagesh Salunke",
  serviceArea:
    "Pune, Pimpri-Chinchwad (PCMC), and surrounding industrial areas — workshop service and scheduled on-site visits.",
  phones: [
    { tel: "+919881099456", display: "+91 98810 99456" },
    { tel: "+918007500737", display: "+91 80075 00737" },
  ],
  /** Single-line for compact UI (footer strip, etc.) */
  phoneLine: "+91 98810 99456 · +91 80075 00737",
  /** Corrected domain spelling (live site historically showed a typo). */
  email: "info@softlinkcomputers.co.in",
  /** Update with your registered GSTIN for quotations and invoices */
  gstin: "27XXXXXXXXXX1ZX",
  workingHours:
    "Monday – Saturday · 9:30 AM – 7:00 PM (IST). Sunday closed. Call ahead for urgent workshop drop-offs.",
  locations: [
    {
      label: "Registered office · Vadgaon (Manikbaug)",
      lines: [
        "L-1, Amrutganga Housing Society, Flat 308, 3rd Floor",
        "Manikbaug, Sinhagad Road, Vadgaon, Pune 411041",
      ],
      mapQuery: "Amrutganga Housing Society Flat 308 Manikbaug Sinhagad Road Pune 411041",
    },
    {
      label: "Sales & walk-in · Navi Peth",
      lines: [
        "Shop 2A & 2B, 216, Shree Alok Society",
        "Behind Sai Mobile Shopee, near Lokmanya Nagar Post Office, Navi Peth, Pune 411030",
      ],
      mapQuery: "Shree Alok Society 216 Navi Peth Pune 411030",
    },
  ],
  /**
   * Replace `#` with your public profile URLs when ready.
   * Icons are chosen in `Footer.tsx` by `network` id.
   */
  socials: [
    { network: "facebook" as const, href: "#", label: "Facebook" },
    { network: "instagram" as const, href: "#", label: "Instagram" },
    { network: "linkedin" as const, href: "#", label: "LinkedIn" },
    { network: "twitter" as const, href: "#", label: "X (Twitter)" },
  ],
} as const;

export function siteTelHref(tel: string) {
  return `tel:${tel.replace(/\s/g, "")}`;
}
