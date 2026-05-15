"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHouseLaptop,
  faKey,
  faLaptop,
  faNetworkWired,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const OFFERING_ICONS: IconDefinition[] = [
  faLaptop,
  faNetworkWired,
  faVideo,
  faHouseLaptop,
  faKey,
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroSection() {
  const { openQuotation } = useEnquiryModal();
  const { hero } = siteContent;

  return (
    <section className="relative overflow-hidden border-b border-foreground/8 bg-section">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface-nav)_6%,transparent)_0%,transparent_42%)]" />
        <div className="absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand/[0.07] blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full bg-accent/[0.08] blur-3xl" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="inline-flex items-center rounded-full border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold tracking-wide text-foreground/80 shadow-sm"
          >
            {hero.badge}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-6 text-3xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]"
          >
            {hero.headline}
            <span className="mt-2 block text-brand">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              type="button"
              onClick={() => openQuotation()}
              className="inline-flex h-12 min-w-[11rem] items-center justify-center gap-2 rounded-lg bg-brand px-7 text-sm font-semibold text-white shadow-md shadow-brand/25 transition hover:bg-brand-hover"
            >
              {hero.ctaPrimary}
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden />
            </button>
            <Link
              href="#services"
              className="inline-flex h-12 min-w-[11rem] items-center justify-center rounded-lg border border-foreground/15 bg-card px-7 text-sm font-semibold text-foreground transition hover:border-brand/40 hover:text-brand"
            >
              {hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-14 sm:mt-16"
        >
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">What we do</p>
              <h2 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{hero.offeringsLabel}</h2>
            </div>
            <p className="max-w-md text-sm text-foreground/60">
              Five dedicated practices — each with a product catalogue and specialist engineers.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {hero.offerings.map((item, index) => (
              <motion.div
                key={item.href}
                custom={5 + index}
                variants={fadeUp}
                initial="hidden"
                animate="show"
              >
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-xl border border-foreground/10 bg-card p-5 shadow-sm transition hover:border-brand/35 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand transition group-hover:bg-brand group-hover:text-white">
                    <FontAwesomeIcon icon={OFFERING_ICONS[index]} className="text-base" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-foreground/65">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand">
                    Learn more
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[10px] transition group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          custom={11}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-12 rounded-xl border border-foreground/10 bg-card/80 px-4 py-6 backdrop-blur-sm sm:px-8"
        >
          <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
            {hero.trustStats.map((stat) => (
              <div
                key={stat.label}
                className="text-center sm:border-r sm:border-foreground/10 sm:last:border-r-0"
              >
                <p className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium leading-snug text-foreground/65 sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-foreground/10 pt-5 text-center text-xs text-foreground/55 sm:text-sm">
            {site.brandName} · {site.serviceArea}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
