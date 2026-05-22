"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import OverlapImageCard from "@/components/OverlapImageCard";
import PageSection from "@/components/ui/PageSection";
import type { ServiceCatalogCategory } from "@/data/serviceProductLists";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 320 },
  },
};

type Props = {
  category: ServiceCatalogCategory;
  serviceLabel: string;
  defaultInterest: ServiceCatalogCategory["items"][0]["defaultInterest"];
};

export default function ServiceCategoryProductList({
  category,
  serviceLabel,
  defaultInterest,
}: Props) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <PageSection border="none" className="!pt-6 !pb-16 sm:!pb-20">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{serviceLabel}</p>
      <p className="mt-2 max-w-3xl text-sm text-foreground/65 sm:text-base">
        Select a product for full specs, plan options, and indicative pricing.
      </p>

      <motion.div
        className="mt-8 grid grid-cols-1 items-start gap-5 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {category.items.map((item) => (
          <motion.div key={item.slug} variants={cardMotion} className="h-auto">
            <OverlapImageCard
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.name}
              description={
                item.summary ? (
                  <>
                    <span className="block font-semibold text-brand">{item.priceFrom}</span>
                    {item.priceNote ? (
                      <span className="mt-0.5 block text-[11px] text-foreground/55">{item.priceNote}</span>
                    ) : null}
                    <span className="mt-1.5 block line-clamp-2">{item.summary}</span>
                  </>
                ) : (
                  <span className="font-semibold text-brand">{item.priceFrom}</span>
                )
              }
              footer={
                <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
                  <Link href={`/products/${item.slug}`} className="btn-secondary-sm">
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEnquiry(`${item.enquiryTag} — enquiry`, defaultInterest)}
                    className="btn-primary-sm"
                  >
                    Enquiry
                  </button>
                </div>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </PageSection>
  );
}
