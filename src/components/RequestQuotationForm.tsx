"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

import { site } from "@/data/site";

const interests = [
  "General / not sure yet",
  "Repair & rental",
  "Networking & cabling",
  "Software licences",
  "CCTV / security",
  "WFH service",
  "Other",
] as const;

export type RequestQuotationFormProps = {
  mode?: "quotation" | "enquiry";
  defaultInterest?: string;
  productContext?: string;
  fromPlanCard?: boolean;
};

export default function RequestQuotationForm({
  mode = "quotation",
  defaultInterest,
  productContext,
  fromPlanCard = false,
}: RequestQuotationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const productSeedDone = useRef(false);

  useEffect(() => {
    if (!defaultInterest) return;
    const match = interests.find((i) => i === defaultInterest);
    if (match) setSelectedInterests([match]);
  }, [defaultInterest]);

  useEffect(() => {
    if (productContext && mode === "enquiry" && !productSeedDone.current) {
      productSeedDone.current = true;
      setMessage(
        fromPlanCard
          ? `Quote request for: ${productContext}\n\nQuantity / seats:\nDuration or timeline:\n\n`
          : `Enquiry regarding: ${productContext}\n\n`,
      );
    }
  }, [productContext, mode, fromPlanCard]);

  const toggleInterest = (opt: string) => {
    setSelectedInterests((prev) =>
      prev.includes(opt) ? prev.filter((i) => i !== opt) : [...prev, opt],
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const subject =
      fromPlanCard && productContext
        ? encodeURIComponent(`Quote request — ${productContext}`)
        : mode === "enquiry" && productContext
          ? encodeURIComponent(`Product enquiry — ${productContext}`)
          : encodeURIComponent(`Quotation request — ${company || "Individual"}`);

    const serviceLine =
      selectedInterests.length > 0 ? selectedInterests.join(", ") : "Not specified";

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      `Address: ${address || "(not provided)"}`,
      `Pincode: ${pincode || "(not provided)"}`,
      productContext ? `Product / service: ${productContext}` : null,
      `Service area(s): ${serviceLine}`,
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
      {productContext && (
        <div className="sm:col-span-2 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-sm text-foreground">
          <span className="font-semibold text-brand">Focus: </span>
          {productContext}
        </div>
      )}

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
        <fieldset>
          <legend className="mb-2 block text-xs font-semibold uppercase tracking-wide text-foreground/70">
            Service area <span className="font-normal normal-case text-foreground/50">(select all that apply)</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {interests.map((opt) => {
              const checked = selectedInterests.includes(opt);
              return (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition ${
                    checked
                      ? "border-brand/40 bg-brand/10 text-foreground"
                      : "border-foreground/12 bg-card text-foreground/80 hover:border-brand/25"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleInterest(opt)}
                    className="h-4 w-4 shrink-0 rounded border-foreground/20 text-brand focus:ring-brand/30"
                  />
                  {opt}
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="rq-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          {fromPlanCard ? "Quote details" : mode === "enquiry" ? "Your enquiry" : "Project details"}
        </label>
        <textarea
          id="rq-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder={
            fromPlanCard
              ? "Number of units, rental period, delivery address, or any add-ons needed."
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
          className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-brand-hover sm:w-auto"
        >
          {sent
            ? "Open email client again"
            : fromPlanCard
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
