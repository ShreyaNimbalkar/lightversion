"use client";

import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import { wfhCatalog } from "@/data/serviceProductLists";

export default function WfhServiceBody() {
  return (
    <ServiceCategoryGrid
      id="product-catalog"
      servicePath="wfh-service"
      eyebrow="WFH service"
      title={
        <>
          Browse by category
          <span className="text-brand"> — computers, connectivity &amp; peripherals</span>
        </>
      }
      subtitle="Choose a category to see WFH packages, pricing, and feature options."
      categories={wfhCatalog}
    />
  );
}
