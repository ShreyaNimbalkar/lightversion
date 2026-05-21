import { SERVICE_CATALOG_ROUTES } from "@/data/serviceCatalogRoutes";

export type CatalogProductOption = {
  productSlug: string;
  productName: string;
  servicePath: string;
  serviceLabel: string;
  categoryTitle: string;
  categorySlug: string;
  priceFrom: string;
  priceNote?: string;
  summary: string;
};

export type CatalogServiceGroup = {
  servicePath: string;
  serviceLabel: string;
  categories: {
    categoryTitle: string;
    categorySlug: string;
    products: CatalogProductOption[];
  }[];
};

export function buildCatalogServiceGroups(): CatalogServiceGroup[] {
  return SERVICE_CATALOG_ROUTES.map((route) => ({
    servicePath: route.path,
    serviceLabel: route.label,
    categories: route.catalog.map((category) => ({
      categoryTitle: category.title,
      categorySlug: category.slug,
      products: category.items.map((item) => ({
        productSlug: item.slug,
        productName: item.name,
        servicePath: route.path,
        serviceLabel: route.label,
        categoryTitle: category.title,
        categorySlug: category.slug,
        priceFrom: item.priceFrom,
        priceNote: item.priceNote,
        summary: item.summary,
      })),
    })),
  }));
}

export function findCatalogProduct(slug: string): CatalogProductOption | undefined {
  for (const service of buildCatalogServiceGroups()) {
    for (const category of service.categories) {
      const product = category.products.find((p) => p.productSlug === slug);
      if (product) return product;
    }
  }
  return undefined;
}

/** Pull first numeric value from strings like "From ₹1,099/device/yr" */
export function parseIndicativeRate(priceFrom: string): number {
  const normalized = priceFrom.replace(/,/g, "");
  const match = normalized.match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}

export function catalogLineDescription(product: CatalogProductOption): string {
  return `${product.serviceLabel} › ${product.categoryTitle} › ${product.productName}`;
}
