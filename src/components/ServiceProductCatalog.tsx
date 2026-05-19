"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";

import { motion, type Variants } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import OverlapImageCard from "@/components/OverlapImageCard";
import type {
  CatalogItemWithCategory,
  ServiceCatalogCategory,
  ServiceCatalogItem,
} from "@/data/serviceProductLists";

const DEFAULT_PAGE_SIZE = 12;

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

function flattenCategories(categories: ServiceCatalogCategory[]): CatalogItemWithCategory[] {
  return categories.flatMap((category) =>
    category.items.map((item) => ({
      categoryTitle: category.title,
      item,
    })),
  );
}

function ProductCard({
  card,
  onEnquiry,
}: {
  card: ServiceCatalogItem;
  onEnquiry: (tag: string, interest: ServiceCatalogItem["defaultInterest"]) => void;
}) {
  return (
    <motion.div variants={cardMotion} className="h-full">
      <OverlapImageCard
        image={card.image}
        imageAlt={card.imageAlt}
        eyebrow={card.defaultInterest}
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

type Props = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  categories: ServiceCatalogCategory[];
  pageSize?: number;
};

export default function ServiceProductCatalog({
  id,
  eyebrow,
  title,
  subtitle,
  categories,
  pageSize = DEFAULT_PAGE_SIZE,
}: Props) {
  const { openEnquiry } = useEnquiryModal();
  const [page, setPage] = useState(1);

  const items = useMemo(() => flattenCategories(categories), [categories]);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const { slice, rangeStart, rangeEnd } = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    const end = Math.min(start + pageSize, items.length);
    return {
      slice: items.slice(start, end),
      rangeStart: items.length === 0 ? 0 : start + 1,
      rangeEnd: end,
    };
  }, [items, safePage, pageSize]);

  const goToPage = (next: number) => {
    const target = Math.min(Math.max(1, next), totalPages);
    setPage(target);
    const el = id ? document.getElementById(id) : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id={id} className="relative min-w-0 scroll-mt-24 bg-section py-10 sm:py-20">
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl" />
      </motion.div>

      <motion.div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div className="mx-auto max-w-2xl text-center">
          <motion.div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            {eyebrow}
          </motion.div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">{subtitle}</p>
        </motion.div>

        <motion.div
          key={safePage}
          className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {slice.map((entry) => (
            <ProductCard
              key={entry.item.slug}
              card={entry.item}
              onEnquiry={(tag, interest) => openEnquiry(`${tag} — enquiry`, interest)}
            />
          ))}
        </motion.div>

        {totalPages > 1 ? (
          <nav
            className="mt-10 flex flex-col items-center gap-4 sm:mt-12"
            aria-label="Product catalogue pagination"
          >
            <p className="text-sm text-foreground/65">
              Showing {rangeStart}–{rangeEnd} of {items.length} products
            </p>
            <motion.div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={safePage <= 1}
                onClick={() => goToPage(safePage - 1)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-foreground/12 bg-card px-4 text-sm font-semibold text-foreground transition enabled:hover:border-brand/30 enabled:hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-current={p === safePage ? "page" : undefined}
                  onClick={() => goToPage(p)}
                  className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition ${
                    p === safePage
                      ? "border-brand bg-brand text-white shadow-md shadow-brand/20"
                      : "border-foreground/12 bg-card text-foreground hover:border-brand/30 hover:text-brand"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                disabled={safePage >= totalPages}
                onClick={() => goToPage(safePage + 1)}
                className="inline-flex min-h-10 items-center justify-center rounded-full border border-foreground/12 bg-card px-4 text-sm font-semibold text-foreground transition enabled:hover:border-brand/30 enabled:hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </motion.div>
          </nav>
        ) : items.length > 0 ? (
          <p className="mt-10 text-center text-sm text-foreground/60">
            Showing all {items.length} products
          </p>
        ) : null}
      </motion.div>
    </section>
  );
}
