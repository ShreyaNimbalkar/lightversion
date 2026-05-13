"use client";

import { useState, FormEvent, useEffect, useRef } from "react";

import { site } from "@/data/site";

const interests = [
  "General / not sure yet",
  "Repair & rental",
  "Networking & cabling",
  "Software licences",
  "CCTV / security",
  "Other",
] as const;

export type RequestQuotationFormProps = {
  mode?: "quotation" | "enquiry";
  defaultInterest?: string;
  productContext?: string;
};

export default function RequestQuotationForm({
  mode = "quotation",
  defaultInterest,
  productContext,
}: RequestQuotationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState<(typeof interests)[number]>(
  interests[0]
);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const productSeedDone = useRef(false);

  useEffect(() => {
    if (!defaultInterest) return;
    const match = interests.find((i) => i === defaultInterest);
    if (match) setInterest(match);
  }, [defaultInterest]);

  useEffect(() => {
    if (productContext && mode === "enquiry" && !productSeedDone.current) {
      productSeedDone.current = true;
      setMessage(`Enquiry regarding: ${productContext}\n\n`);
    }
  }, [productContext, mode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const subject =
      mode === "enquiry" && productContext
        ? encodeURIComponent(`Product enquiry — ${productContext}`)
        : encodeURIComponent(`Quotation request — ${company || "Individual"}`);

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      productContext ? `Product / service: ${productContext}` : null,
      `Service area: ${interest}`,
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
          htmlFor="rq-interest"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          Service area
        </label>
        <select
          id="rq-interest"
          value={interest}
          onChange={(e) =>
  setInterest(e.target.value as (typeof interests)[number])
}
          className="h-11 w-full rounded-lg border border-foreground/15 bg-card px-3 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          {interests.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="rq-message"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-foreground/70"
        >
          {mode === "enquiry" ? "Your enquiry" : "Project details"}
        </label>
        <textarea
          id="rq-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-foreground/15 bg-card px-3 py-2.5 text-sm text-foreground outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          placeholder={
            mode === "enquiry"
              ? "Quantity, timeline, site location, or part numbers if known."
              : "Sites, timelines, brands, approximate seats — helps us respond with a realistic estimate."
          }
        />
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground/55">
          By submitting, you agree we may contact you regarding this enquiry. GST-ready
          quotes are issued after scope confirmation.
        </p>
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-lg bg-brand px-8 text-sm font-semibold text-white shadow-md transition-colors duration-200 hover:bg-brand-hover"
        >
          {sent ? "Open email client again" : mode === "enquiry" ? "Submit enquiry" : "Submit request"}
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
