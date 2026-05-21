"use client";

import { useMemo, useState } from "react";

import {
  createEmptyLineItem,
  defaultQuotationForm,
  formatInr,
  generateQuotationNumber,
  lineAmount,
  quotationTotals,
  type QuotationFormData,
  type QuotationLineItem,
} from "@/lib/quotation-types";
import QuotationCatalogPicker from "@/components/admin/QuotationCatalogPicker";
import { site } from "@/data/site";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70">
      {children}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

export default function QuotationForm() {
  const [form, setForm] = useState<QuotationFormData>(defaultQuotationForm);
  const [downloading, setDownloading] = useState(false);
  const [pdfError, setPdfError] = useState("");

  const totals = useMemo(
    () => quotationTotals(form.lineItems, form.gstPercent),
    [form.lineItems, form.gstPercent],
  );

  function update<K extends keyof QuotationFormData>(key: K, value: QuotationFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateLine(id: string, patch: Partial<QuotationLineItem>) {
    setForm((prev) => ({
      ...prev,
      lineItems: prev.lineItems.map((row) => (row.id === id ? { ...row, ...patch } : row)),
    }));
  }

  function addLine() {
    setForm((prev) => ({
      ...prev,
      lineItems: [...prev.lineItems, createEmptyLineItem()],
    }));
  }

  function removeLine(id: string) {
    setForm((prev) => {
      const removed = prev.lineItems.find((r) => r.id === id);
      const lineItems =
        prev.lineItems.length > 1 ? prev.lineItems.filter((r) => r.id !== id) : prev.lineItems;
      const selectedCatalogSlugs =
        removed?.catalogSlug != null
          ? prev.selectedCatalogSlugs.filter((s) => s !== removed.catalogSlug)
          : prev.selectedCatalogSlugs;
      return { ...prev, lineItems, selectedCatalogSlugs };
    });
  }

  async function downloadPdf() {
    setPdfError("");
    if (!form.clientName.trim()) {
      setPdfError("Client name is required before downloading PDF.");
      return;
    }
    if (!form.lineItems.some((r) => r.description.trim() && r.rate > 0)) {
      setPdfError("Add at least one line item with description and rate.");
      return;
    }

    setDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { QuotationPdfDocument } = await import("@/lib/quotation-pdf-document");

      const logoUrl = `${window.location.origin}/softlink_logowht.png`;
      const blob = await pdf(
        <QuotationPdfDocument data={form} logoUrl={logoUrl} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.quotationNumber.replace(/\s+/g, "-")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setPdfError("PDF generation failed. Try again or use Chrome/Edge.");
    } finally {
      setDownloading(false);
    }
  }

  const office = site.locations[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <div className="space-y-6">
        <section className="card-elevated p-4 sm:p-6">
          <h2 className="text-sm font-bold text-foreground">Quotation details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <FieldLabel>Quotation number</FieldLabel>
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={form.quotationNumber}
                  onChange={(e) => update("quotationNumber", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => update("quotationNumber", generateQuotationNumber())}
                  className="shrink-0 rounded-lg border border-foreground/15 px-3 text-xs font-semibold text-foreground hover:border-brand hover:text-brand"
                  title="Generate new number"
                >
                  New
                </button>
              </div>
            </div>
            <div>
              <FieldLabel>Date</FieldLabel>
              <input
                type="date"
                className={inputClass}
                value={form.quotationDate}
                onChange={(e) => update("quotationDate", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Valid until</FieldLabel>
              <input
                type="date"
                className={inputClass}
                value={form.validUntil}
                onChange={(e) => update("validUntil", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Subject / reference</FieldLabel>
              <input
                className={inputClass}
                value={form.subject}
                onChange={(e) => update("subject", e.target.value)}
                placeholder="e.g. Laptop repair & SSD upgrade — 5 units"
              />
            </div>
          </div>
        </section>

        <section className="card-elevated p-4 sm:p-6">
          <h2 className="text-sm font-bold text-foreground">Client details (FOR)</h2>
          <p className="mt-1 text-xs text-foreground/55">Shown on the PDF in the FOR block.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <FieldLabel>Client / company name *</FieldLabel>
              <input
                className={inputClass}
                value={form.clientName}
                onChange={(e) => update("clientName", e.target.value)}
                required
              />
            </div>
            <div>
              <FieldLabel>Phone number</FieldLabel>
              <input
                type="tel"
                className={inputClass}
                value={form.clientPhone}
                onChange={(e) => update("clientPhone", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <input
                type="email"
                className={inputClass}
                value={form.clientEmail}
                onChange={(e) => update("clientEmail", e.target.value)}
                placeholder="client@company.com"
              />
            </div>
            <div>
              <FieldLabel>GST number</FieldLabel>
              <input
                className={inputClass}
                value={form.clientGstin}
                onChange={(e) => update("clientGstin", e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div>
              <FieldLabel>Pincode</FieldLabel>
              <input
                inputMode="numeric"
                maxLength={6}
                className={inputClass}
                value={form.clientPincode}
                onChange={(e) =>
                  update("clientPincode", e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="e.g. 411001"
              />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel>Address</FieldLabel>
              <textarea
                rows={3}
                className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                value={form.clientAddress}
                onChange={(e) => update("clientAddress", e.target.value)}
              />
            </div>
          </div>
        </section>

        <QuotationCatalogPicker form={form} onChange={setForm} />

        <section className="card-elevated overflow-hidden p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-bold text-foreground">Line items</h2>
            <button
              type="button"
              onClick={addLine}
              className="rounded-lg border border-brand/30 bg-brand/5 px-3 py-2 text-xs font-semibold text-brand hover:bg-brand/10"
            >
              + Add row
            </button>
          </div>

          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-foreground/10 text-xs uppercase tracking-wide text-foreground/55">
                  <th className="py-2 pr-2">Description</th>
                  <th className="py-2 pr-2 w-24">HSN/SAC</th>
                  <th className="py-2 pr-2 w-16 text-right">Qty</th>
                  <th className="py-2 pr-2 w-20">Unit</th>
                  <th className="py-2 pr-2 w-24 text-right">Rate</th>
                  <th className="py-2 pr-2 w-24 text-right">Amount</th>
                  <th className="py-2 w-10" />
                </tr>
              </thead>
              <tbody>
                {form.lineItems.map((row) => (
                  <tr key={row.id} className="border-b border-foreground/5">
                    <td className="py-2 pr-2">
                      <input
                        className={inputClass}
                        value={row.description}
                        onChange={(e) => updateLine(row.id, { description: e.target.value })}
                        placeholder="Item description"
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        className={inputClass}
                        value={row.hsnSac}
                        onChange={(e) => updateLine(row.id, { hsnSac: e.target.value })}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        min={0}
                        step={1}
                        className={`${inputClass} text-right`}
                        value={row.qty}
                        onChange={(e) => updateLine(row.id, { qty: Number(e.target.value) || 0 })}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        className={inputClass}
                        value={row.unit}
                        onChange={(e) => updateLine(row.id, { unit: e.target.value })}
                      />
                    </td>
                    <td className="py-2 pr-2">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        className={`${inputClass} text-right`}
                        value={row.rate || ""}
                        onChange={(e) => updateLine(row.id, { rate: Number(e.target.value) || 0 })}
                      />
                    </td>
                    <td className="py-2 pr-2 text-right font-semibold tabular-nums text-foreground">
                      {formatInr(lineAmount(row))}
                    </td>
                    <td className="py-2">
                      <button
                        type="button"
                        onClick={() => removeLine(row.id)}
                        className="text-xs font-semibold text-foreground/45 hover:text-brand"
                        aria-label="Remove row"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-4 md:hidden">
            {form.lineItems.map((row, index) => (
              <div key={row.id} className="rounded-xl border border-foreground/10 bg-section p-3">
                <p className="mb-2 text-xs font-bold text-brand">Item {index + 1}</p>
                <div className="grid gap-3">
                  <div>
                    <FieldLabel>Description</FieldLabel>
                    <input
                      className={inputClass}
                      value={row.description}
                      onChange={(e) => updateLine(row.id, { description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <FieldLabel>HSN/SAC</FieldLabel>
                      <input
                        className={inputClass}
                        value={row.hsnSac}
                        onChange={(e) => updateLine(row.id, { hsnSac: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel>Unit</FieldLabel>
                      <input
                        className={inputClass}
                        value={row.unit}
                        onChange={(e) => updateLine(row.id, { unit: e.target.value })}
                      />
                    </div>
                    <div>
                      <FieldLabel>Qty</FieldLabel>
                      <input
                        type="number"
                        className={inputClass}
                        value={row.qty}
                        onChange={(e) => updateLine(row.id, { qty: Number(e.target.value) || 0 })}
                      />
                    </div>
                    <div>
                      <FieldLabel>Rate (₹)</FieldLabel>
                      <input
                        type="number"
                        className={inputClass}
                        value={row.rate || ""}
                        onChange={(e) => updateLine(row.id, { rate: Number(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Amount: {formatInr(lineAmount(row))}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeLine(row.id)}
                    className="text-xs font-semibold text-brand"
                  >
                    Remove row
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap items-end gap-4">
            <div className="w-28">
              <FieldLabel>GST %</FieldLabel>
              <input
                type="number"
                min={0}
                max={28}
                className={inputClass}
                value={form.gstPercent}
                onChange={(e) => update("gstPercent", Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </section>

        <section className="card-elevated p-4 sm:p-6">
          <h2 className="text-sm font-bold text-foreground">Terms & notes</h2>
          <div className="mt-4 grid gap-4">
            <div>
              <FieldLabel>Payment terms</FieldLabel>
              <textarea
                rows={2}
                className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                value={form.paymentTerms}
                onChange={(e) => update("paymentTerms", e.target.value)}
              />
            </div>
            <div>
              <FieldLabel>Notes</FieldLabel>
              <textarea
                rows={3}
                className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
          </div>
        </section>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-28">
        <div className="card-elevated p-4 sm:p-5">
          <h2 className="text-sm font-bold text-foreground">From (on PDF)</h2>
          <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-foreground/70">
            <li className="font-semibold text-foreground">{site.legalName}</li>
            <li>{office.lines.join(", ")}</li>
            <li>{site.email}</li>
            <li>{site.phoneLine}</li>
            <li>GSTIN: {site.gstin}</li>
          </ul>
          <p className="mt-3 text-[11px] text-foreground/50">
            Update GSTIN in <code className="rounded bg-section px-1">src/data/site.ts</code>
          </p>
        </div>

        <div className="card-elevated p-4 sm:p-5">
          <h2 className="text-sm font-bold text-foreground">Totals</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-foreground/65">Subtotal</dt>
              <dd className="font-semibold tabular-nums">{formatInr(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-foreground/65">GST ({form.gstPercent}%)</dt>
              <dd className="font-semibold tabular-nums">{formatInr(totals.gstAmount)}</dd>
            </div>
            <div className="flex justify-between border-t border-foreground/10 pt-2 text-base">
              <dt className="font-bold">Grand total</dt>
              <dd className="font-bold tabular-nums text-brand">{formatInr(totals.grandTotal)}</dd>
            </div>
          </dl>

          {pdfError ? (
            <p className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-300">
              {pdfError}
            </p>
          ) : null}

          <button
            type="button"
            onClick={() => void downloadPdf()}
            disabled={downloading}
            className="btn-primary mt-4 w-full disabled:opacity-60"
          >
            {downloading ? "Generating PDF…" : "Download PDF"}
          </button>
          <p className="mt-3 text-[11px] leading-relaxed text-foreground/50">
            After download, email or WhatsApp the PDF to the client. Signature blocks are included for
            client and authorised signatory.
          </p>
        </div>
      </aside>
    </div>
  );
}
