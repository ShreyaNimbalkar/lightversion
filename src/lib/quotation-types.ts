export type QuotationLineItem = {
  id: string;
  description: string;
  hsnSac: string;
  qty: number;
  unit: string;
  rate: number;
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
  gstPercent: number;
  notes: string;
  paymentTerms: string;
};

export function createEmptyLineItem(): QuotationLineItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    hsnSac: "",
    qty: 1,
    unit: "Nos",
    rate: 0,
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
    gstPercent: 18,
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

export function quotationTotals(items: QuotationLineItem[], gstPercent: number) {
  const subtotal = items.reduce((sum, item) => sum + lineAmount(item), 0);
  const gstAmount = Math.round(subtotal * (gstPercent / 100) * 100) / 100;
  const grandTotal = Math.round((subtotal + gstAmount) * 100) / 100;
  return { subtotal, gstAmount, grandTotal };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}
