"use client";

import { useState, type ReactNode } from "react";

import { motion } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import OverlapImageCard from "@/components/OverlapImageCard";

import type { ServiceCatalogCategory, ServiceCatalogItem } from "@/data/serviceProductLists";

const CARDS_PER_ROW = 3;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 320 },
  },
};

function ProductCard({
  card,
  categoryTitle,
  onEnquiry,
}: {
  card: ServiceCatalogItem;
  categoryTitle: string;
  onEnquiry: (tag: string, interest: ServiceCatalogItem["defaultInterest"]) => void;
}) {
  return (
    <motion.div variants={item} className="h-full">
      <OverlapImageCard
        image={card.image}
        imageAlt={card.imageAlt}
        eyebrow={categoryTitle}
        title={card.name}
        footer={
          <button
            type="button"
            onClick={() => onEnquiry(card.enquiryTag, card.defaultInterest)}
            className="mt-4 w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover"
          >
            Enquiry
          </button>
        }
      />
    </motion.div>
  );
}

function CategoryBlock({ category }: { category: ServiceCatalogCategory }) {
  const { openEnquiry } = useEnquiryModal();
  const [expanded, setExpanded] = useState(false);
  const hasMore = category.items.length > CARDS_PER_ROW;
  const visibleItems = expanded || !hasMore ? category.items : category.items.slice(0, CARDS_PER_ROW);

  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 border-b border-foreground/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{category.title}</h3>
        {category.description ? (
          <p className="max-w-xl text-sm leading-relaxed text-foreground/65">{category.description}</p>
        ) : null}
      </div>

      <motion.div
        key={`${category.title}-${expanded ? "all" : "top3"}`}
        className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {visibleItems.map((c) => (
          <ProductCard
            key={c.enquiryTag}
            card={c}
            categoryTitle={category.title}
            onEnquiry={(tag, interest) => openEnquiry(`${tag} — enquiry`, interest)}
          />
        ))}
      </motion.div>

      {hasMore ? (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-card px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-brand/30 hover:text-brand"
          >
            {expanded ? "See less" : "See more"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  categories: ServiceCatalogCategory[];
};

export default function ServiceProductCatalog({ id, eyebrow, title, subtitle, categories }: Props) {
  return (
    <section
      id={id}
      className="relative min-w-0 scroll-mt-24 bg-section py-10 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            {eyebrow}
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">{subtitle}</p>
        </div> */}

        <div className="flex flex-col gap-14 sm:gap-16">
          {categories.map((category) => (
            <CategoryBlock key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
