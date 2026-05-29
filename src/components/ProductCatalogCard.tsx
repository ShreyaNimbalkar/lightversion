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
    <article className="card-elevated group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl">
      
      {/* ================= TOP SECTION ================= */}
      <div className="relative flex items-start gap-4 p-5 sm:p-6">
        
        {/* SMALL IMAGE LEFT */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-black/5 bg-muted">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="80px"
          />
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">
          
          {/* TOP BADGE */}
          {/* <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
            <FontAwesomeIcon
              icon={faFileInvoice}
              className="text-[9px]"
            />
            GST Quote
          </div> */}

          {/* TITLE */}
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-foreground sm:text-xl">
            {title}
          </h3>

          {/* SUMMARY */}
          <p className="mt-1 text-sm font-medium text-foreground/70">
            {summary}
          </p>
        </div>
      </div>

      {/* ================= PRICE SECTION ================= */}
      <div className="mx-5 rounded-2xl border border-brand/10 bg-gradient-to-br from-brand/10 via-brand/[0.07] to-transparent p-4 sm:mx-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand/80">
          Starting From
        </p>

        <div className="mt-1 flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-bold leading-none tracking-tight text-brand sm:text-3xl">
              {priceFrom}
            </p>

            <p className="mt-2 text-xs font-medium text-foreground/55">
              {priceNote || "Written quotation before work starts"}
            </p>
          </div>

          {/* <div className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-brand shadow-sm">
            GST Ready
          </div> */}
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        
        {/* OVERVIEW */}
        <p className="text-sm leading-relaxed text-foreground/65">
          {overview}
        </p>

        {/* FEATURES */}
        {features.length > 0 ? (
          <ul className="mt-5 space-y-2 border-t border-foreground/8 pt-4">
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

        {/* BUTTON */}
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={onRequestQuote}
            className="btn-primary group/btn w-full"
          >
            Request Quote

            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </button>
        </div>
      </div>
    </article>
  );
}