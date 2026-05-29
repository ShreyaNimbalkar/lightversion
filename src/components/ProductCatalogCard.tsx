"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
  faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";

export type ProductCatalogCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  summary: string;
  overview: string;
  priceFrom: string;
  priceNote?: string;
  features: string[];
  onRequestQuote: () => void;
};

export default function ProductCatalogCard({
  image,
  imageAlt,
  title,
  summary,
  overview,
  priceFrom,
  priceNote,
  features,
  onRequestQuote,
}: ProductCatalogCardProps) {
  return (
    <article className="card-elevated flex h-full flex-col overflow-hidden rounded-2xl transition hover:border-brand/30 hover:shadow-lg">
      <div className="relative h-40 w-full shrink-0 overflow-hidden sm:h-44">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/55 via-surface-deep/10 to-transparent" />

        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/20 bg-surface-deep/80 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
          <FontAwesomeIcon icon={faFileInvoice} className="text-[9px] text-accent" />
          GST quote
        </span>
      </div>

      <div className="shrink-0 border-b border-brand/20 bg-gradient-to-br from-brand/15 via-brand/8 to-card px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand/90">
          Indicative price
        </p>
        <p className="mt-1 font-extrabold leading-none tracking-tight text-brand tabular-nums text-3xl sm:text-4xl">
          {priceFrom}
        </p>
        {priceNote ? (
          <p className="mt-2 text-xs font-medium text-foreground/60">{priceNote}</p>
        ) : (
          <p className="mt-2 text-xs font-medium text-foreground/55">
            Written quotation before work starts
          </p>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground sm:text-lg">
          {title}
        </h3>

        <p className="mt-2 text-sm font-medium text-foreground/75">{summary}</p>

        <p className="mt-2 text-sm leading-relaxed text-foreground/65">{overview}</p>

        {features.length > 0 ? (
          <ul className="mt-3 space-y-1.5 border-t border-foreground/8 pt-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-xs leading-snug text-foreground/80 sm:text-[13px]"
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="mt-0.5 shrink-0 text-brand"
                  aria-hidden
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="shrink-0 border-t border-foreground/10 p-4 sm:p-5">
        <button
          type="button"
          onClick={onRequestQuote}
          className="inline-flex min-h-12 w-full items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-bold uppercase tracking-wide text-white shadow-md shadow-brand/25 transition hover:bg-brand-hover"
        >
          Request quote
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </button>
      </div>
    </article>
  );
}
