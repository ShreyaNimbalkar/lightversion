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
        className="btn-primary btn-block sm:w-auto sm:min-w-[10rem] sm:flex-none"
      >
        Enquiry
      </button>

      <button
        type="button"
        onClick={() => openProductQuote(productLabel, item.defaultInterest)}
        className="btn-secondary btn-block sm:w-auto sm:min-w-[10rem] sm:flex-none"
      >
        Request quotation
      </button>
    </div>
  );
}
