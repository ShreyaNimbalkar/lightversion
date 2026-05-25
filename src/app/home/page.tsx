import HeroSection from "@/app/home/HeroSection";
import TrustedBrands from "@/app/home/TrustedBrands";
import ProcessSection from "@/app/home/ProcessSection";
import HomeAboutTeaser from "@/app/home/HomeAboutTeaser";
import TestimonialsSection from "@/app/home/TestimonialsSection";
import HomeCtaBand from "@/app/home/HomeCtaBand";
import ServicesSection from "./ServiceSection";
import HomeStatsStrip from "./HomeStatsStrip";

/**
 * Home — one path: hero (services + quote) → trust → how we work → who we are → reviews → contact.
 * No repeated service grids, enquiry chips, or duplicate quote blocks.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeStatsStrip/>
      <ServicesSection/>
      <ProcessSection />
      <HomeAboutTeaser />
      <TrustedBrands />
      <TestimonialsSection />
      <HomeCtaBand />
    </>
  );
}
