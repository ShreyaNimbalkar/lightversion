import type { ProductHighlightCard, ServiceCatalogItem } from "@/data/serviceProductLists";
import { resolveProductHighlights } from "@/data/productHighlightPlans";

export type ProductPageContent = {
  intro: string;
  specs: string[];
  highlights: ProductHighlightCard[];
};

export function getProductPageContent(
  item: ServiceCatalogItem,
  categoryTitle: string,
): ProductPageContent {
  return {
    intro: item.overview,
    specs: item.specs,
    highlights: resolveProductHighlights(item, categoryTitle),
  };
}
