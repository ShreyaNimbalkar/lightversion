"use client";

import { useMemo } from "react";

import MultiSelectDropdown, {
  type MultiSelectOptionGroup,
} from "@/components/ui/MultiSelectDropdown";
import {
  buildCatalogServiceGroups,
  catalogLineDescription,
  CATALOG_OTHER_SLUG,
  findCatalogProduct,
  isCatalogOtherSlug,
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
    const fromCatalog = buildCatalogServiceGroups().map((service) => ({
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

    return [
      {
        id: "other",
        label: "Not in catalogue",
        options: [
          {
            value: CATALOG_OTHER_SLUG,
            label: "Other",
            hint: "Custom item or service — describe below",
          },
        ],
      },
      ...fromCatalog,
    ];
  }, []);

  const hasOther = form.selectedCatalogSlugs.includes(CATALOG_OTHER_SLUG);
  const productSlugCount = form.selectedCatalogSlugs.filter((s) => !isCatalogOtherSlug(s)).length;
  const selectedCount = productSlugCount + (hasOther ? 1 : 0);

  function applySelection(nextSlugs: string[]) {
    const prevSet = new Set(form.selectedCatalogSlugs);
    const nextSet = new Set(nextSlugs);
    const includesOther = nextSet.has(CATALOG_OTHER_SLUG);
    const productSlugs = nextSlugs.filter((s) => !isCatalogOtherSlug(s));

    let lineItems = form.lineItems.filter(
      (row) => !row.catalogSlug || nextSet.has(row.catalogSlug),
    );

    for (const slug of productSlugs) {
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

    const subjectParts = productSlugs
      .map((slug) => findCatalogProduct(slug)?.productName)
      .filter(Boolean) as string[];
    if (includesOther && form.otherServiceDetail.trim()) {
      subjectParts.push("Other");
    }

    const subject =
      form.subject.trim() ||
      (subjectParts.length > 0
        ? `Quotation — ${subjectParts.slice(0, 3).join(", ")}${subjectParts.length > 3 ? "…" : ""}`
        : "");

    onChange({
      ...form,
      selectedCatalogSlugs: nextSlugs,
      otherServiceDetail: includesOther ? form.otherServiceDetail : "",
      lineItems,
      subject,
    });
  }

  return (
    <section className="card-elevated p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-foreground">Service & product catalogue</h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-foreground/60 sm:text-sm">
            Pick products by service group, or choose <strong className="font-semibold text-foreground">Other</strong>{" "}
            for custom scope. Catalogue picks add line items below — edit quantity, rate, and GST per row.
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
          countNoun="selected"
          groups={catalogGroups}
          value={form.selectedCatalogSlugs}
          onChange={applySelection}
          searchable
          searchPlaceholder="Search by product, category, or service…"
          maxVisiblePills={2}
          expandableOption={{
            value: CATALOG_OTHER_SLUG,
            detail: form.otherServiceDetail,
            onDetailChange: (detail) => onChange({ ...form, otherServiceDetail: detail }),
            detailLabel: "Describe other product or service",
            detailPlaceholder:
              "e.g. Biometric attendance, printer AMC, mixed hardware + licence bundle…",
            detailHint:
              "This appears on the PDF under catalogue items. Add matching line items in the table below if you need pricing.",
            required: false,
          }}
        />
      </div>
    </section>
  );
}
