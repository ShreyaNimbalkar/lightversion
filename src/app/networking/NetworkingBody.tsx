"use client";

import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import { networkingCatalog } from "@/data/serviceProductLists";

export default function NetworkingBody() {
  return (
    <ServiceCategoryGrid
      id="product-catalog"
      servicePath="networking"
      eyebrow="Networking services"
      title={
        <>
          Browse by category
          <span className="text-brand"> — cabling, NAS, voice &amp; access</span>
        </>
      }
      subtitle="Pick a category to view products, pricing, and technical plans."
      categories={networkingCatalog}
    />
  );
}
