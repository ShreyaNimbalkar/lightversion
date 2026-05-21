"use client";

import CatalogIcon from "@/components/CatalogIcon";
import ProductDetailActions from "@/app/products/[slug]/ProductDetailActions";
import type { ServiceCatalogItem } from "@/data/serviceProductLists";

type Props = {
  item: ServiceCatalogItem;
  categoryTitle: string;
  productLabel: string;
};

export default function ProductDetailSummary({ item, categoryTitle, productLabel }: Props) {
  return (
    <div className="card-elevated flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
          <CatalogIcon iconKey={item.iconKey} className="text-lg" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">{categoryTitle}</p>
          <p className="mt-0.5 truncate text-base font-bold text-foreground sm:text-lg">{item.name}</p>
          <div className="mt-2 flex flex-wrap items-baseline gap-2">
            <p className="text-lg font-bold text-brand">{item.priceFrom}</p>
            {item.priceNote ? <p className="text-xs text-foreground/55">{item.priceNote}</p> : null}
          </div>
        </div>
      </div>
      <div className="w-full shrink-0 sm:max-w-md sm:flex-1 sm:justify-end">
        <ProductDetailActions item={item} productLabel={productLabel} />
      </div>
    </div>
  );
}
