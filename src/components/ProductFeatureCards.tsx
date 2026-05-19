"use client";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import type { ProductHighlightCard, ServiceProductInterest } from "@/data/serviceProductLists";

function highlightFeatureLines(body: string): string[] {
  const sentences = body
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
  if (sentences.length >= 2) {
    return sentences;
  }
  const clauses = body
    .split(/[,;]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (clauses.length >= 2) {
    return clauses;
  }
  return [body.trim()].filter(Boolean);
}

type Props = {
  productName: string;
  defaultInterest: ServiceProductInterest;
  highlights: ProductHighlightCard[];
};

export default function ProductFeatureCards({
  productName,
  defaultInterest,
  highlights,
}: Props) {
  const { openProductQuote } = useEnquiryModal();

  return (
    <section className="mt-14 sm:mt-16" aria-labelledby="service-feature-cards-heading">
      <h2 id="service-feature-cards-heading" className="text-center text-2xl font-bold text-foreground sm:text-3xl">
        Plans &amp; options
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-foreground/65 sm:text-base">
        Pick a plan and submit the enquiry form — we confirm availability, scope, and GST on your quote.
      </p>

      <div
        className={`mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8 ${
          highlights.length >= 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        {highlights.map((card) => {
          const lines: string[] =
            card.features && card.features.length > 0
              ? card.features
              : card.body
                ? highlightFeatureLines(card.body)
                : [];
          const planLabel = `${productName} — ${card.title}`;

          return (
            <div
              key={card.title}
              className="flex min-h-full flex-col overflow-hidden border border-foreground/10 bg-card shadow-md"
            >
              <div className="h-2 shrink-0 bg-surface-nav" aria-hidden />
              <div className="relative flex flex-1 flex-col px-5 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-80"
                  aria-hidden
                />
                <h3 className="relative text-center text-lg font-bold leading-snug text-surface-nav sm:text-xl">
                  {card.title}
                </h3>
                {card.subtitle ? (
                  <p className="relative mt-2 text-center text-xs text-foreground/60">{card.subtitle}</p>
                ) : null}
                {card.price ? (
                  <p className="relative mt-4 text-center text-xl font-bold text-brand">{card.price}</p>
                ) : null}
                {card.priceNote ? (
                  <p className="relative mt-1 text-center text-xs text-foreground/55">{card.priceNote}</p>
                ) : null}
                {card.body && card.features?.length ? (
                  <p className="relative mt-4 text-center text-sm leading-relaxed text-foreground/70">{card.body}</p>
                ) : null}
                <ul className="relative mt-6 divide-y divide-brand/25 border-y border-brand/20">
                  {lines.map((line) => (
                    <li
                      key={line}
                      className="px-1 py-3 text-center text-sm leading-relaxed text-foreground/85 sm:py-3.5 sm:text-[0.9375rem]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={() => openProductQuote(planLabel, defaultInterest)}
                    className="inline-flex min-h-[2.75rem] items-center justify-center border-2 border-brand bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand transition hover:bg-brand/10 sm:px-8"
                  >
                    Request a quote
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
