"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

import ServiceAreaPicker, {
  formatServiceAreas,
  SERVICE_AREA_OPTIONS,
  SERVICE_AREA_OTHER,
  type ServiceAreaSelection,
} from "@/components/ServiceAreaPicker";
import { site } from "@/data/site";

const allInterestOptions = [...SERVICE_AREA_OPTIONS, SERVICE_AREA_OTHER] as const;

export type RequestQuotationFormProps = {
  mode?: "quotation" | "enquiry";
  defaultInterest?: string;
  productContext?: string;
  productLabel?: string;
  lockSelection?: boolean;
  fromPlanCard?: boolean;
};

export default function RequestQuotationForm({
  mode = "quotation",
  defaultInterest,
  productContext,
  productLabel,
  lockSelection = false,
  fromPlanCard = false,
}: RequestQuotationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [serviceAreas, setServiceAreas] = useState<ServiceAreaSelection>({
    presets: [],
    custom: [],
  });
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const productSeedDone = useRef(false);

  const isLocked = lockSelection && Boolean(defaultInterest);
  const displayProduct = productLabel ?? productContext;

  useEffect(() => {
    if (!defaultInterest) return;
    const match = allInterestOptions.find((i) => i === defaultInterest);
    if (match) setServiceAreas({ presets: [match], custom: [] });
  }, [defaultInterest]);

  useEffect(() => {
    if (!displayProduct || productSeedDone.current) return;
    productSeedDone.current = true;

    if (fromPlanCard || isLocked) {
      setMessage(
        `Quote request for: ${displayProduct}\n\nQuantity / seats:\nTimeline:\n\n`,
      );
      return;
    }

    if (mode === "enquiry" && productContext) {
      setMessage(`Enquiry regarding: ${productContext}\n\n`);
    }
  }, [displayProduct, productContext, mode, fromPlanCard, isLocked]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const subject =
      isLocked && displayProduct
        ? encodeURIComponent(`Quote request — ${displayProduct}`)
        : fromPlanCard && productContext
          ? encodeURIComponent(`Quote request — ${productContext}`)
          : mode === "enquiry" && productContext
            ? encodeURIComponent(`Product enquiry — ${productContext}`)
            : encodeURIComponent(`Quotation request — ${company || "Individual"}`);

    const serviceLine = formatServiceAreas(serviceAreas);

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      `Address: ${address || "(not provided)"}`,
      `Pincode: ${pincode || "(not provided)"}`,
      displayProduct ? `Product / plan: ${displayProduct}` : null,
      productContext && productContext !== displayProduct ? `Reference: ${productContext}` : null,
      `Service line: ${serviceLine}`,
      "",
      "Requirement:",
      message || "(none)",
    ].filter(Boolean);

    const body = encodeURIComponent(bodyLines.join("\n"));
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2 sm:gap-5"
      noValidate
    >
      {isLocked && displayProduct ? (
        <div className="sm:col-span-2 space-y-3">
          <div className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand/90">
              Product / plan
            </p>
            <p className="mt-1 text-base font-bold text-foreground sm:text-lg">{displayProduct}</p>
          </div>
        </div>
      ) : productContext && !isLocked ? (
        <div className="sm:col-span-2 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-sm text-foreground">
          <span className="font-semibold text-brand">Focus: </span>
          {productContext}
        </div>
      ) : null}

      <div className="sm:col-span-1">
        <label
          htmlFor="rq-name"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Full name <span className="text-brand">*</span>
        </label>
        <input
          id="rq-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none ring-brand/0 transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="As on GST records"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="rq-phone"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Mobile <span className="text-brand">*</span>
        </label>
        <input
          id="rq-phone"
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="+91"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="rq-email"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Work email
        </label>
        <input
          id="rq-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="name@company.com"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="rq-company"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Organisation
        </label>
        <input
          id="rq-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Company or department"
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="rq-address"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Address
        </label>
        <input
          id="rq-address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="Building, street, area"
        />
      </div>

      <div className="sm:col-span-1">
        <label
          htmlFor="rq-pincode"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Pincode
        </label>
        <input
          id="rq-pincode"
          type="text"
          inputMode="numeric"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder="e.g. 411001"
        />
      </div>

      <div className="sm:col-span-2">
        <ServiceAreaPicker
          value={serviceAreas}
          onChange={setServiceAreas}
          lockedInterest={isLocked ? defaultInterest : undefined}
        />
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="rq-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          {isLocked || fromPlanCard ? "Quote details" : mode === "enquiry" ? "Your enquiry" : "Project details"}
        </label>
        <textarea
          id="rq-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder={
            isLocked || fromPlanCard
              ? "Number of seats, edition, renewal date, or deployment notes."
              : mode === "enquiry"
                ? "Quantity, timeline, site location, or part numbers if known."
                : "Sites, timelines, brands, approximate seats — helps us respond with a realistic estimate."
          }
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground/55">
          By submitting, you agree we may contact you regarding this enquiry. GST-ready quotes are issued after scope
          confirmation.
        </p>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-brand-hover"
        >
          {sent
            ? "Open email client again"
            : isLocked || fromPlanCard
              ? "Send quote request"
              : mode === "enquiry"
                ? "Submit enquiry"
                : "Submit request"}
        </button>
      </div>

      {sent && (
        <p className="sm:col-span-2 rounded-lg border border-brand/25 bg-brand/5 px-3 py-2 text-xs text-foreground">
          If your mail app did not open, email{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-semibold text-brand underline hover:text-brand-hover"
          >
            {site.email}
          </a>{" "}
          with the same details.
        </p>
      )}
    </form>
  );
}
