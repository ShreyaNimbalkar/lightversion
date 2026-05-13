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
    "Pune-based IT partner since 2012: laptop & desktop workshop, rentals, structured cabling, Wi‑Fi, CCTV, IP PBX, attendance systems, and Microsoft / Tally / security licensing — with GST-ready estimates and documented site work.",
  keywords: [
    "Soft Link Computers Pune",
    "laptop repair Pune",
    "computer rental Pune",
    "networking cabling Pune",
    "Microsoft 365 license Pune",
    "Tally license Pune",
    "CCTV installation Pune",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
