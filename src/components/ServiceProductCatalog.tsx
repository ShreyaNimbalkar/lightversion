"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { motion, Variants } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import OverlapImageCard from "@/components/OverlapImageCard";

import type { ServiceCatalogCategory, ServiceCatalogItem } from "@/data/serviceProductLists";

const CARDS_PER_ROW = 3;

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.03 },
  },
};

const item: Variants = {
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
        description={card.summary}
        footer={
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              href={`/products/${card.slug}`}
              className="inline-flex min-h-[2.65rem] items-center justify-center rounded-xl border border-foreground/15 bg-card px-2 text-center text-xs font-semibold text-foreground shadow-sm transition hover:border-brand/35 hover:text-brand sm:px-3 sm:text-sm"
            >
              View details
            </Link>
            <button
              type="button"
              onClick={() => onEnquiry(card.enquiryTag, card.defaultInterest)}
              className="inline-flex min-h-[2.65rem] items-center justify-center rounded-xl bg-brand px-2 text-center text-xs font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover sm:px-3 sm:text-sm"
            >
              Enquiry
            </button>
          </div>
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
            key={c.slug}
            card={c}
            categoryTitle={category.title}
            onEnquiry={(tag, interest) => openEnquiry(`${tag} — enquiry`, interest)}
          />
        ))}
      </motion.div>

      {hasMore ? (
  <div className="mt-20 flex justify-center">
    <button
      type="button"
      onClick={() => setExpanded((e) => !e)}
      className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:scale-105 hover:bg-brand/90 hover:shadow-xl hover:shadow-brand/30"
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
