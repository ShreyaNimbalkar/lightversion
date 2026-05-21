"use client";

import { usePathname } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActionBar from "@/components/FlotingActionBar";
import FloatingThemeToggle from "@/components/FloatingThemeToggle";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <FloatingThemeToggle />
      {!isAdmin ? <FloatingActionBar /> : null}
      <main className="min-w-0 overflow-x-hidden bg-section pt-[4.25rem] pb-[max(1rem,env(safe-area-inset-bottom))] text-foreground transition-colors sm:pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
}
