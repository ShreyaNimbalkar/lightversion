"use client";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <section aria-labelledby="service-feature-cards-heading">
      <SectionHeader
        id="service-feature-cards-heading"
        align="left"
        eyebrow="Plans & pricing"
        title="Choose a configuration"
        description="Compare options below — select a plan and request a quote. We confirm availability, scope, and GST on your estimate."
      />

      <div
        className={`mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 ${
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
              className="card-elevated flex h-full flex-col overflow-hidden"
            >
              <div className="relative flex h-full flex-1 flex-col px-5 pb-6 pt-6 sm:px-6 sm:pb-7 sm:pt-7">
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-80"
                  aria-hidden
                />
                <h3 className="relative text-center text-lg font-bold leading-snug text-foreground sm:text-xl">
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
                <ul className="relative mt-6 flex-1 divide-y divide-brand/25 border-y border-brand/20">
                  {lines.map((line) => (
                    <li
                      key={line}
                      className="px-1 py-3 text-center text-sm leading-relaxed text-foreground/85 sm:py-3.5 sm:text-[0.9375rem]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="relative mt-auto flex shrink-0 justify-center pt-7">
                  <button
                    type="button"
                    onClick={() => openProductQuote(planLabel, defaultInterest)}
                    className="btn-outline-brand"
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
