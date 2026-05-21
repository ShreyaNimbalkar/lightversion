"use client";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import type { ServiceCatalogItem } from "@/data/serviceProductLists";

type Props = {
  item: ServiceCatalogItem;
  productLabel: string;
};

export default function ProductDetailActions({ item, productLabel }: Props) {
  const { openEnquiry, openProductQuote } = useEnquiryModal();

  return (
    <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
      <button
        type="button"
        onClick={() =>
          openEnquiry(`${productLabel} — ${item.name} — enquiry`, item.defaultInterest)
        }
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover sm:min-h-[2.75rem] sm:min-w-[10rem] sm:w-auto sm:flex-none"
      >
        Enquiry
      </button>

      <button
        type="button"
        onClick={() => openProductQuote(productLabel, item.defaultInterest)}
        className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-foreground/15 bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand sm:min-h-[2.75rem] sm:min-w-[10rem] sm:w-auto sm:flex-none"
      >
        Request quotation
      </button>
    </div>
  );
}
