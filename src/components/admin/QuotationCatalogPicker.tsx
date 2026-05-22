"use client";

import { useMemo } from "react";

import MultiSelectDropdown, {
  type MultiSelectOptionGroup,
} from "@/components/ui/MultiSelectDropdown";
import {
  buildCatalogServiceGroups,
  catalogLineDescription,
  findCatalogProduct,
  parseIndicativeRate,
} from "@/lib/quotation-catalog-options";
import {
  createEmptyLineItem,
  type QuotationFormData,
  type QuotationLineItem,
} from "@/lib/quotation-types";

type Props = {
  form: QuotationFormData;
  onChange: (next: QuotationFormData) => void;
};

export default function QuotationCatalogPicker({ form, onChange }: Props) {
  const catalogGroups = useMemo((): MultiSelectOptionGroup[] => {
    return buildCatalogServiceGroups().map((service) => ({
      id: service.servicePath,
      label: service.serviceLabel,
      options: service.categories.flatMap((category) =>
        category.products.map((product) => ({
          value: product.productSlug,
          label: product.productName,
          hint: `${category.categoryTitle} · ${product.priceFrom}`,
        })),
      ),
    }));
  }, []);

  function applySelection(nextSlugs: string[]) {
    const prevSet = new Set(form.selectedCatalogSlugs);
    const nextSet = new Set(nextSlugs);

    let lineItems = form.lineItems.filter(
      (row) => !row.catalogSlug || nextSet.has(row.catalogSlug),
    );

    for (const slug of nextSlugs) {
      if (prevSet.has(slug)) continue;
      const product = findCatalogProduct(slug);
      if (!product) continue;
      const rate = parseIndicativeRate(product.priceFrom);
      const row: QuotationLineItem = {
        ...createEmptyLineItem(form.defaultGstPercent),
        catalogSlug: product.productSlug,
        description: catalogLineDescription(product),
        rate,
        qty: 1,
      };
      const emptyIdx = lineItems.findIndex((r) => !r.description.trim() && !r.catalogSlug);
      if (emptyIdx >= 0) {
        lineItems[emptyIdx] = row;
      } else {
        lineItems.push(row);
      }
    }

    if (lineItems.length === 0) {
      lineItems = [createEmptyLineItem()];
    }

    const subject =
      form.subject.trim() ||
      (nextSlugs.length > 0
        ? `Quotation — ${nextSlugs
            .map((slug) => findCatalogProduct(slug)?.productName)
            .filter(Boolean)
            .slice(0, 3)
            .join(", ")}${nextSlugs.length > 3 ? "…" : ""}`
        : "");

    onChange({ ...form, selectedCatalogSlugs: nextSlugs, lineItems, subject });
  }

  const selectedCount = form.selectedCatalogSlugs.length;

  return (
    <section className="card-elevated p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-foreground">Service & product catalogue</h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-foreground/60 sm:text-sm">
            Pick products by service group. Each selection adds a line item below — you can edit
            quantity, rate, and GST per row.
          </p>
        </div>
        {selectedCount > 0 ? (
          <span className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-3 py-1 text-xs font-semibold tabular-nums text-brand">
            {selectedCount} in quote
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        <MultiSelectDropdown
          label="Products & services"
          hint="(search and select)"
          placeholder="Search catalogue…"
          countNoun="products"
          groups={catalogGroups}
          value={form.selectedCatalogSlugs}
          onChange={applySelection}
          searchable
          searchPlaceholder="Search by product, category, or service…"
          maxVisiblePills={2}
        />
      </div>
    </section>
  );
}
