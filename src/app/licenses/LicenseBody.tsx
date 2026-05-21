"use client";

import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";
import { licenseCatalog } from "@/data/serviceProductLists";

export default function LicenseBody() {
  return (
    <ServiceCategoryGrid
      id="product-catalog"
      servicePath="licenses"
      eyebrow="Licence products"
      title={
        <>
          Browse by vendor
          <span className="text-brand"> — Microsoft, Adobe, Autodesk &amp; more</span>
        </>
      }
      subtitle="Nine categories including antivirus — compare products and request a written quotation."
      categories={licenseCatalog}
    />
  );
}
