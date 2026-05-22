"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import CatalogIcon from "@/components/CatalogIcon";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ServiceCatalogCategory } from "@/data/serviceProductLists";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.02 },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 320 },
  },
};

type Props = {
  id?: string;
  servicePath: string;
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  categories: ServiceCatalogCategory[];
};

export default function ServiceCategoryGrid({
  id,
  servicePath,
  eyebrow,
  title,
  subtitle,
  categories,
}: Props) {
  return (
    <PageSection id={id} border="top" className="scroll-mt-24">
      <SectionHeader eyebrow={eyebrow} title={title} description={subtitle} />

      <motion.div
        className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {categories.map((category) => {
          const href = `/${servicePath}/${category.slug}`;
          const count = category.items.length;
          const priceHint = category.items[0]?.priceFrom;

          return (
            <motion.div key={category.slug} variants={cardMotion} className="h-auto">
              <Link
                href={href}
                className="group card-elevated flex h-full flex-col p-6 transition hover:border-brand/30 hover:shadow-lg sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand transition group-hover:bg-brand/15">
                  <CatalogIcon iconKey={category.iconKey} className="text-2xl" />
                </div>
                <h3 className="mt-6 text-xl font-bold leading-snug text-foreground">{category.title}</h3>
                {category.description ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/65">
                    {category.description}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground/55">
                  <span className="rounded-full border border-foreground/10 bg-section px-3 py-1">
                    {count} {count === 1 ? "product" : "products"}
                  </span>
                  {priceHint ? (
                    <span className="rounded-full border border-brand/20 bg-brand/5 px-3 py-1 text-brand">
                      {priceHint}
                    </span>
                  ) : null}
                </div>
                <span className="btn-link mt-auto pt-6">
                  View {category.title.toLowerCase()}
                  <span aria-hidden><FontAwesomeIcon icon={faArrowRight} /></span>
                </span>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </PageSection>
  );
}
