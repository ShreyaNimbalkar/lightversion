"use client";

import { useMemo } from "react";

import MultiSelectDropdown, { type MultiSelectOption } from "@/components/ui/MultiSelectDropdown";
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
  const catalogOptions = useMemo((): MultiSelectOption[] => {
    const groups = buildCatalogServiceGroups();
    const opts: MultiSelectOption[] = [];
    for (const service of groups) {
      for (const category of service.categories) {
        for (const product of category.products) {
          opts.push({
            value: product.productSlug,
            label: product.productName,
            hint: `${product.serviceLabel} · ${product.categoryTitle} · ${product.priceFrom}`,
          });
        }
      }
    }
    return opts;
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

  return (
    <section className="card-elevated p-4 sm:p-6">
      <p className="mb-1 text-sm font-bold text-foreground">Service & product catalogue</p>
      <p className="text-xs text-foreground/60 sm:text-sm">
        Select services and products required. Selected items are added to line items below (you can edit
        rates and quantities).
      </p>

      <div className="mt-4">
        <MultiSelectDropdown
          label="Catalogue items"
          hint="(select all that apply)"
          placeholder="Select products from catalogue…"
          countNoun="products"
          options={catalogOptions}
          value={form.selectedCatalogSlugs}
          onChange={applySelection}
          searchable
          searchPlaceholder="Search"
        />
      </div>
    </section>
  );
}
