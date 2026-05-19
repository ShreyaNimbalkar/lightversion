"use client";

import Link from "next/link";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import type { ServiceCatalogItem } from "@/data/serviceProductLists";

type Props = {
  item: ServiceCatalogItem;
  productLabel: string;
};

export default function ProductDetailActions({ item, productLabel }: Props) {
  const { openEnquiry, openProductQuote } = useEnquiryModal();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={() =>
          openEnquiry(`${productLabel} — ${item.name} — enquiry`, item.defaultInterest)
        }
        className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover sm:min-w-[10rem] sm:flex-none"
      >
        Enquiry
      </button>

      <button
        type="button"
        onClick={() => openProductQuote(productLabel, item.defaultInterest)}
        className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl border border-foreground/15 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand sm:min-w-[10rem] sm:flex-none"
      >
        Request quotation
      </button>

      <Link
        href="/contact"
        className="inline-flex min-h-[2.75rem] flex-1 items-center justify-center rounded-xl border border-brand/25 bg-brand/5 px-5 py-2.5 text-center text-sm font-semibold text-brand transition hover:bg-brand/10 sm:min-w-[10rem] sm:flex-none"
      >
        Contact
      </Link>
    </div>
  );
}
