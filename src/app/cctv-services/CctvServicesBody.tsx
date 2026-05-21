"use client";

import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import { cctvCatalog } from "@/data/serviceProductLists";

export default function CctvServicesBody() {
  return (
    <ServiceCategoryGrid
      id="product-catalog"
      servicePath="cctv-services"
      eyebrow="CCTV services"
      title={
        <>
          Browse by category
          <span className="text-brand"> — cameras, recording &amp; monitoring</span>
        </>
      }
      subtitle="Select a category to explore products with indicative pricing."
      categories={cctvCatalog}
    />
  );
}
