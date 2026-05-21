import type { Metadata, Viewport } from "next";
import "./globals.css";

import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import SiteChrome from "@/components/SiteChrome";

import { site } from "@/data/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brandName} | Pune — repairs, networking & genuine software`,
    template: `%s | ${site.brandName}`,
  },
  description:
    "Soft Link Computers Pune — laptop & computer repair, rental, networking, CCTV, WFH setups, and genuine software licences. 1,000+ customers since 2012. Two Pune locations. GST-ready quotes.",
  keywords: [
    "Soft Link Computers Pune",
    "laptop repair Pune",
    "computer rental Pune",
    "networking company Pune",
    "CCTV installation Pune",
    "work from home IT Pune",
    "Microsoft 365 Pune",
    "Tally Prime dealer Pune",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="min-h-screen antialiased">
        <ThemeProviderWrapper>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
