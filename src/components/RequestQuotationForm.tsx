"use client";

import { useState, FormEvent, useEffect, useMemo, useRef } from "react";

import MultiSelectDropdown from "@/components/ui/MultiSelectDropdown";
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

const OTHER_SERVICE = "Other";

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
  const [otherServiceDetail, setOtherServiceDetail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const productSeedDone = useRef(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

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

  const interestOptions = useMemo(
    () => interests.map((opt) => ({ value: opt, label: opt })),
    [],
  );

  const showOtherDetail = selectedInterests.includes(OTHER_SERVICE);

  function handleInterestsChange(next: string[]) {
    setSelectedInterests(next);
    if (!next.includes(OTHER_SERVICE)) {
      setOtherServiceDetail("");
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !acceptedTerms) return;
    if (showOtherDetail && !otherServiceDetail.trim()) return;

    const subject =
      fromPlanCard && productContext
        ? encodeURIComponent(`Quote request — ${productContext}`)
        : mode === "enquiry" && productContext
          ? encodeURIComponent(`Product enquiry — ${productContext}`)
          : encodeURIComponent(`Quotation request — ${company || "Individual"}`);

    const serviceParts = selectedInterests.filter((i) => i !== OTHER_SERVICE);
    const serviceLine =
      serviceParts.length > 0 ? serviceParts.join(", ") : showOtherDetail ? "" : "Not specified";

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Company: ${company}`,
      `Address: ${address || "(not provided)"}`,
      `Pincode: ${pincode || "(not provided)"}`,
      productContext ? `Product / service: ${productContext}` : null,
      serviceLine ? `Service area(s): ${serviceLine}` : null,
      showOtherDetail
        ? `Other service (manual): ${otherServiceDetail.trim()}`
        : null,
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
        <MultiSelectDropdown
          label="Service area"
          hint="(select all that apply)"
          placeholder="Choose service areas…"
          countNoun="selected"
          options={interestOptions}
          value={selectedInterests}
          onChange={handleInterestsChange}
          searchable={false}
          expandableOption={{
            value: OTHER_SERVICE,
            detail: otherServiceDetail,
            onDetailChange: setOtherServiceDetail,
            detailLabel: "Tell us about your requirement",
            detailPlaceholder:
              "e.g. Biometric attendance, printer AMC, mixed hardware + software bundle…",
            detailHint:
              "A short description helps us route your request to the right engineer and send a GST-ready quote.",
            required: true,
          }}
        />
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
      <div className="sm:col-span-2">
  <label className="flex items-start gap-3 text-sm text-foreground/70">
    <input
      type="checkbox"
      checked={acceptedTerms}
      onChange={(e) => setAcceptedTerms(e.target.checked)}
      className="mt-1 h-4 w-4 rounded border-foreground/20 text-brand focus:ring-brand/30"
    />

    <span>
      I agree to the{" "}
      <a
        href="/terms-and-conditions"
        className="font-medium text-brand underline hover:text-brand-hover"
      >
        Terms & Conditions
      </a>{" "}
      and consent to being contacted regarding this enquiry.
    </span>
  </label>
</div>

      <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* <p className="text-xs text-foreground/55">
          By submitting, you agree we may contact you regarding this enquiry. GST-ready quotes are issued after scope
          confirmation.
        </p> */}
        {/* <button type="submit" className="btn-primary btn-block sm:w-auto sm:shrink-0"> */}
        <button
  type="submit"
  disabled={!acceptedTerms}
  className="btn-primary btn-block disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[220px] sm:shrink-0"
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
