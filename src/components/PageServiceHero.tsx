"use client";

import { Fragment, type ReactNode } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import HeroChecklist from "@/components/HeroChecklist";

export type PageServiceHeroBreadcrumb = { label: string; href?: string };

export type PageServiceHeroProps = {
  tag: string;
  title: ReactNode;
  description: string;
  highlights: string[];
  breadcrumbs: PageServiceHeroBreadcrumb[];
};

/**
 * Shared page hero — matches Repair / Networking / Licences service headers
 * (bg-section, dual glows, grid overlays, pill tag, split title, checklist column, card-style breadcrumb).
 */
export default function PageServiceHero({ tag, title, description, highlights, breadcrumbs }: PageServiceHeroProps) {
  return (
    <section className="relative mt-0 overflow-hidden bg-section py-8 sm:py-10">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[min(500px,120vw)] w-[min(500px,120vw)] max-w-none -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[min(350px,90vw)] w-[min(350px,90vw)] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand sm:px-5 sm:py-2 sm:text-sm">
              {tag}
            </div>

            <div className="mt-4 sm:mt-5 [&_h1]:mt-0">{title}</div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-8 sm:text-lg">
              {description}
            </p>

            <HeroChecklist items={highlights} className="mt-6 lg:hidden" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <HeroChecklist items={highlights} className="mt-10" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-foreground/10 bg-card px-4 py-4 shadow-sm sm:gap-3 sm:px-6 sm:py-5">
            {breadcrumbs.map((crumb, i) => (
              <Fragment key={`${crumb.label}-${i}`}>
                {i > 0 ? (
                  <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-foreground/50" aria-hidden />
                ) : null}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-xs font-medium text-foreground/65 transition hover:text-brand sm:text-sm"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="max-w-[min(100%,14rem)] text-xs font-semibold leading-snug text-brand sm:max-w-none sm:text-sm">
                    {crumb.label}
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
