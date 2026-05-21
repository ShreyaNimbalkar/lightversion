"use client";

import { useMemo, useState } from "react";

import {
  buildCatalogServiceGroups,
  catalogLineDescription,
  findCatalogProduct,
  parseIndicativeRate,
  type CatalogProductOption,
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
  const groups = useMemo(() => buildCatalogServiceGroups(), []);
  const [filter, setFilter] = useState("");
  const [openServices, setOpenServices] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(groups.map((g, i) => [g.servicePath, i === 0])),
  );

  const selectedSet = useMemo(() => new Set(form.selectedCatalogSlugs), [form.selectedCatalogSlugs]);

  const filteredGroups = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((service) => ({
        ...service,
        categories: service.categories
          .map((cat) => ({
            ...cat,
            products: cat.products.filter(
              (p) =>
                p.productName.toLowerCase().includes(q) ||
                p.categoryTitle.toLowerCase().includes(q) ||
                p.serviceLabel.toLowerCase().includes(q) ||
                p.summary.toLowerCase().includes(q),
            ),
          }))
          .filter((cat) => cat.products.length > 0),
      }))
      .filter((service) => service.categories.length > 0);
  }, [groups, filter]);

  function toggleService(path: string) {
    setOpenServices((prev) => ({ ...prev, [path]: !prev[path] }));
  }

  function toggleProduct(product: CatalogProductOption, checked: boolean) {
    let selectedCatalogSlugs = [...form.selectedCatalogSlugs];
    let lineItems = [...form.lineItems];

    if (checked) {
      if (!selectedCatalogSlugs.includes(product.productSlug)) {
        selectedCatalogSlugs.push(product.productSlug);
      }
      if (!lineItems.some((row) => row.catalogSlug === product.productSlug)) {
        const rate = parseIndicativeRate(product.priceFrom);
        const row: QuotationLineItem = {
          ...createEmptyLineItem(),
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
    } else {
      selectedCatalogSlugs = selectedCatalogSlugs.filter((s) => s !== product.productSlug);
      lineItems = lineItems.filter((row) => row.catalogSlug !== product.productSlug);
      if (lineItems.length === 0) {
        lineItems = [createEmptyLineItem()];
      }
    }

    const subject =
      form.subject.trim() ||
      (selectedCatalogSlugs.length > 0
        ? `Quotation — ${selectedCatalogSlugs
            .map((slug) => findCatalogProduct(slug)?.productName)
            .filter(Boolean)
            .slice(0, 3)
            .join(", ")}${selectedCatalogSlugs.length > 3 ? "…" : ""}`
        : "");

    onChange({ ...form, selectedCatalogSlugs, lineItems, subject });
  }

  return (
    <section className="card-elevated p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-bold text-foreground">Service & product catalogue</h2>
          <p className="mt-1 text-xs text-foreground/60 sm:text-sm">
            Select services and products required. Selected items are added to line items below (you can
            edit rates and quantities).
          </p>
        </div>
        <p className="rounded-full border border-brand/25 bg-brand/5 px-3 py-1 text-xs font-semibold text-brand">
          {form.selectedCatalogSlugs.length} selected
        </p>
      </div>

      <input
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search product, category, or service…"
        className="mt-4 h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      />

      <div className="mt-4 space-y-3">
        {filteredGroups.map((service) => {
          const isOpen = openServices[service.servicePath] ?? false;
          const serviceCount = service.categories.reduce(
            (n, cat) => n + cat.products.filter((p) => selectedSet.has(p.productSlug)).length,
            0,
          );

          return (
            <div
              key={service.servicePath}
              className="overflow-hidden rounded-xl border border-foreground/10 bg-section"
            >
              <button
                type="button"
                onClick={() => toggleService(service.servicePath)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-card"
              >
                <span className="text-sm font-bold text-foreground">{service.serviceLabel}</span>
                <span className="shrink-0 text-xs font-semibold text-brand">
                  {serviceCount > 0 ? `${serviceCount} picked · ` : ""}
                  {isOpen ? "Hide" : "Show"}
                </span>
              </button>

              {isOpen ? (
                <div className="border-t border-foreground/10 px-3 pb-3 pt-2">
                  {service.categories.map((category) => (
                    <div key={category.categorySlug} className="mt-3 first:mt-1">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-foreground/55">
                        {category.categoryTitle}
                      </p>
                      <ul className="space-y-2">
                        {category.products.map((product) => {
                          const checked = selectedSet.has(product.productSlug);
                          return (
                            <li key={product.productSlug}>
                              <label className="flex cursor-pointer gap-3 rounded-lg border border-foreground/10 bg-card p-3 transition hover:border-brand/25 has-[:checked]:border-brand/40 has-[:checked]:bg-brand/5">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={(e) => toggleProduct(product, e.target.checked)}
                                  className="mt-1 h-4 w-4 shrink-0 rounded border-foreground/20 text-brand focus:ring-brand/30"
                                />
                                <span className="min-w-0 flex-1">
                                  <span className="block text-sm font-semibold text-foreground">
                                    {product.productName}
                                  </span>
                                  <span className="mt-0.5 block text-xs font-semibold text-brand">
                                    {product.priceFrom}
                                    {product.priceNote ? (
                                      <span className="font-normal text-foreground/50">
                                        {" "}
                                        · {product.priceNote}
                                      </span>
                                    ) : null}
                                  </span>
                                  <span className="mt-1 line-clamp-2 text-xs text-foreground/55">
                                    {product.summary}
                                  </span>
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
