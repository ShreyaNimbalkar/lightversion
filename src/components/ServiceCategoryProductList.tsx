"use client";

import { motion, type Variants } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import ProductCatalogCard from "@/components/ProductCatalogCard";
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
        Compare indicative pricing and key specs below — open a product or request a written quote.
      </p>

      <motion.div
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {category.items.map((item) => (
          <motion.div key={item.slug} variants={cardMotion} className="h-full">
            <ProductCatalogCard
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.name}
              summary={item.summary}
              overview={item.overview}
              priceFrom={item.priceFrom}
              priceNote={item.priceNote}
              features={item.specs}
              onRequestQuote={() =>
                openEnquiry(`${item.enquiryTag} — quotation`, defaultInterest)
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </PageSection>
  );
}
