export const DEFAULT_GST_PERCENT = 18;

export type QuotationLineItem = {
  id: string;
  description: string;
  hsnSac: string;
  qty: number;
  unit: string;
  rate: number;
  /** GST % applied to this line only */
  gstPercent: number;
  /** Links row to a catalogue product when added from the picker */
  catalogSlug?: string;
};

export type QuotationFormData = {
  quotationNumber: string;
  quotationDate: string;
  validUntil: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientPincode: string;
  clientGstin: string;
  /** Product slugs selected in the service catalogue section */
  selectedCatalogSlugs: string[];
  subject: string;
  lineItems: QuotationLineItem[];
  /** Default GST % for newly added line items */
  defaultGstPercent: number;
  notes: string;
  paymentTerms: string;
};

export function createEmptyLineItem(gstPercent = DEFAULT_GST_PERCENT): QuotationLineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    hsnSac: "",
    qty: 1,
    unit: "Nos",
    rate: 0,
    gstPercent,
  };
}

export function defaultQuotationForm(): QuotationFormData {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10);
  const valid = new Date(today);
  valid.setDate(valid.getDate() + 15);

  return {
    quotationNumber: generateQuotationNumber(),
    quotationDate: dateStr,
    validUntil: valid.toISOString().slice(0, 10),
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    clientAddress: "",
    clientPincode: "",
    clientGstin: "",
    selectedCatalogSlugs: [],
    subject: "",
    lineItems: [createEmptyLineItem()],
    defaultGstPercent: DEFAULT_GST_PERCENT,
    notes: "Prices are indicative until site survey or inspection where applicable. GST extra as shown.",
    paymentTerms: "50% advance to confirm order · balance on delivery unless agreed otherwise.",
  };
}

export function generateQuotationNumber(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 9000) + 1000);
  return `QT-${y}${m}${day}-${seq}`;
}

export function lineAmount(item: QuotationLineItem): number {
  return Math.round(item.qty * item.rate * 100) / 100;
}

export function lineGstAmount(item: QuotationLineItem): number {
  const rate = item.gstPercent ?? DEFAULT_GST_PERCENT;
  return Math.round(lineAmount(item) * (rate / 100) * 100) / 100;
}

export type GstBreakdownRow = {
  rate: number;
  taxable: number;
  gst: number;
};

export function activeLineItems(items: QuotationLineItem[]): QuotationLineItem[] {
  return items.filter((row) => row.description.trim() || row.rate > 0);
}

export function quotationTotals(items: QuotationLineItem[]) {
  const lines = activeLineItems(items);
  const subtotal = lines.reduce((sum, item) => sum + lineAmount(item), 0);

  const byRate = new Map<number, { taxable: number; gst: number }>();
  for (const item of lines) {
    const rate = item.gstPercent ?? DEFAULT_GST_PERCENT;
    const taxable = lineAmount(item);
    const gst = lineGstAmount(item);
    const prev = byRate.get(rate) ?? { taxable: 0, gst: 0 };
    byRate.set(rate, { taxable: prev.taxable + taxable, gst: prev.gst + gst });
  }

  const gstBreakdown: GstBreakdownRow[] = Array.from(byRate.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([rate, v]) => ({
      rate,
      taxable: Math.round(v.taxable * 100) / 100,
      gst: Math.round(v.gst * 100) / 100,
    }));

  const gstAmount = Math.round(gstBreakdown.reduce((sum, row) => sum + row.gst, 0) * 100) / 100;
  const grandTotal = Math.round((subtotal + gstAmount) * 100) / 100;

  return { subtotal, gstAmount, grandTotal, gstBreakdown };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}
