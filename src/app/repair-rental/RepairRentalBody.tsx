"use client";

import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import { repairRentalCatalog } from "@/data/serviceProductLists";

export default function RepairRentalBody() {
  return (
    <ServiceCategoryGrid
      id="product-catalog"
      servicePath="repair-rental"
      eyebrow="Rental & repair"
      title={
        <>
          Browse by category
          <span className="text-brand"> — laptops, desktops &amp; rental</span>
        </>
      }
      subtitle="Choose a category to see products, indicative pricing, and plan options."
      categories={repairRentalCatalog}
    />
  );
}
