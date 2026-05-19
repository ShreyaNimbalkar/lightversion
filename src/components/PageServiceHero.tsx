"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import PageHeroBreadcrumbs, { type PageHeroBreadcrumb } from "@/components/PageHeroBreadcrumbs";

export type { PageHeroBreadcrumb as PageServiceHeroBreadcrumb };

export const PAGE_HERO_BACKGROUND = "/header.jpg";

export type PageServiceHeroProps = {
  title: string;
  description: string;
  breadcrumbs: PageHeroBreadcrumb[];
  backgroundImage?: string;
};

/**
 * Dark tech hero + white breadcrumb bar (matches Software licences reference layout).
 */
export default function PageServiceHero({
  title,
  description,
  breadcrumbs,
  backgroundImage = PAGE_HERO_BACKGROUND,
}: PageServiceHeroProps) {
  return (
    <header className="relative mt-0">
      <section className="relative min-h-[220px] overflow-hidden sm:min-h-[260px] lg:min-h-[300px]">
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <motion.div
          className="absolute inset-0 bg-surface-deep/75"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-surface-deep/95 via-surface-deep/88 to-surface-deep/72"
          aria-hidden
        />

        <motion.div className="relative mx-auto flex min-h-[inherit] max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl lg:text-[2.35rem] lg:leading-tight">
              {title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
              {description}
            </p>
          </motion.div>
        </motion.div>
      </section>

      <PageHeroBreadcrumbs items={breadcrumbs} />
    </header>
  );
}
