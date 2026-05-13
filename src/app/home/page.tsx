import HeroSection from "@/app/home/HeroSection";
import TrustedBrands from "@/app/home/TrustedBrands";
import ServicesSection from "@/app/home/ServicesSection";
import AboutSection from "@/app/home/AboutSection";
import WhyChooseUs from "@/app/home/WhyChooseUs";
import IndustriesSection from "@/app/home/IndustriesSection";
import ProcessSection from "@/app/home/ProcessSection";
import TestimonialsSection from "@/app/home/TestimonialsSection";
import QuotationRequestSection from "@/app/home/QuotationRequestSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBrands />
      <ServicesSection />
      <AboutSection />
      {/* <WhyChooseUs /> */}
      <IndustriesSection />
      <ProcessSection />
      <TestimonialsSection />
      <QuotationRequestSection />
    </>
  );
}