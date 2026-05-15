import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";

import { site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brandName} | Pune — repairs, networking & genuine software`,
    template: `%s | ${site.brandName}`,
  },
  description:
    "Soft Link Computers — Pune IT services since 2012: repair & rental, networking, CCTV, WFH kits, and genuine software licensing. GST-ready quotes and documented project handovers.",
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
          <Navbar />

          <FloatingThemeToggle />

          <main className="min-w-0 overflow-x-hidden bg-section pt-[4.25rem] text-foreground transition-colors sm:pt-20">
            {children}
          </main>

          <Footer />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
