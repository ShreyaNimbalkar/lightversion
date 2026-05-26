"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import CatalogCard from "@/components/CatalogCard";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import type { ServiceCatalogCategory } from "@/data/serviceProductLists";

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
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
      >
        {categories.map((category) => (
          <motion.div key={category.slug} variants={cardMotion} className="h-full">
            <CatalogCard
              image={category.image}
              imageAlt={category.imageAlt}
              title={category.title}
              description={category.description ?? ""}
              featureBadges={category.featureBadges}
              href={`/${servicePath}/${category.slug}`}
            />
          </motion.div>
        ))}
      </motion.div>
    </PageSection>
  );
}
