"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHouseLaptop,
  faKey,
  faLaptop,
  faNetworkWired,
  faPhone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site, siteTelHref } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const OFFERING_ICONS: IconDefinition[] = [
  faLaptop,
  faNetworkWired,
  faVideo,
  faHouseLaptop,
  faKey,
];

const HERO_IMAGE = "/headersection.jpg";

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeRight = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardStagger = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.35 + i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/** Middle card highlighted by default — core repair line */
const DEFAULT_FEATURED = 0;

export default function HeroSection() {
  const { openQuotation } = useEnquiryModal();
  const { hero } = siteContent;
  const [featured, setFeatured] = useState(DEFAULT_FEATURED);

  return (
    <section className="relative border-b border-foreground/10 bg-section pb-6 pt-3 sm:pb-12 sm:pt-6 lg:pb-16">
      <div className="page-container">
        {/* Dark rounded panel — SoluTek-style hero shell */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0a1220] shadow-2xl shadow-surface-deep/30 sm:rounded-[2.25rem] lg:overflow-visible lg:rounded-[3rem]">
          {/* Circuit / tech pattern */}
          {/* <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[0.14]"
            style={{
              backgroundImage: `url("/header.jpg")`,
            }}
            aria-hidden
          /> */}
          <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden />

          <div className="relative grid min-h-0 items-center gap-6 px-4 pb-6 pt-8 max-lg:grid-cols-1 sm:min-h-[400px] sm:gap-8 sm:px-10 sm:pb-8 sm:pt-12 lg:min-h-[460px] lg:grid-cols-2 lg:gap-4 lg:px-12 lg:pb-36 lg:pt-14">
            {/* Left — copy */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              className="relative z-10 max-w-xl"
            >
              <motion.span
                custom={0}
                variants={fadeLeft}
                className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-brand"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
                {site.brandName}
              </motion.span>

              <motion.h1
                custom={1}
                variants={fadeLeft}
                className="mt-4 text-[1.65rem] font-bold leading-[1.15] tracking-tight text-white sm:mt-6 sm:text-3xl md:text-[2.65rem] lg:text-5xl"
              >
                The expertise behind
                <span className="mt-1 block text-white/95">IT services in Pune.</span>
              </motion.h1>

              <motion.p custom={2} variants={fadeLeft} className="mt-5 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
                {hero.description}
              </motion.p>

              <motion.div custom={3} variants={fadeLeft} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <button
                  type="button"
                  onClick={() => openQuotation()}
                  className="btn-primary btn-block sm:w-auto"
                >
                  {hero.ctaPrimary}
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden />
                </button>
                {/* <a
                  href={siteTelHref(site.phones[0].tel)}
                  className="group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-white/90 transition hover:text-white"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-md transition group-hover:scale-105">
                    <FontAwesomeIcon icon={faPhone} className="text-sm" aria-hidden />
                  </span>
                  Call now
                </a> */}
              </motion.div>

            </motion.div>

            {/* Right — image + decorative scallop */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="show"
              className="relative z-10 mx-auto flex w-full max-w-[220px] items-end justify-center sm:max-w-[280px] lg:mx-0 lg:max-w-[380px] lg:justify-end"
            >
              {/* Scalloped / flower outline */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,420px)] w-[min(90%,380px)] -translate-x-1/2 -translate-y-[45%] opacity-[0.12]"
                aria-hidden
              >
                <svg viewBox="0 0 200 200" className="h-full w-full text-white" fill="currentColor">
                  <path d="M100 8c8 28 28 48 56 56-28 8-48 28-56 56-8-28-28-48-56-56 28-8 48-28 56-56 8 28 28 48 56 56 28 8 48-28 56-56-28-8-48-28-56-56z" />
                </svg>
              </div>

              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={HERO_IMAGE}
                  alt={`${site.brandName} engineer supporting business IT`}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 60vw, 380px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1220] via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#0a1220] lg:via-transparent lg:to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Service cards — stacked on mobile, overlapping on large screens */}
          <div
            id="services"
            className="scroll-mt-28 border-t border-white/10 px-4 py-5 sm:px-8 sm:py-6 lg:absolute lg:bottom-0 lg:left-0 lg:right-0 lg:z-20 lg:translate-y-[42%] lg:border-t-0 lg:px-10 lg:py-0"
          >
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
              {hero.offerings.map((item, index) => {
                const isFeatured = featured === index;
                const Icon = OFFERING_ICONS[index];

                return (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={cardStagger}
                    initial="hidden"
                    animate="show"
                    className="min-w-0"
                    onMouseEnter={() => setFeatured(index)}
                    onFocus={() => setFeatured(index)}
                  >
                    <Link
                      href={item.href}
                      className={`group flex h-full min-h-[120px] flex-col rounded-xl border p-3 shadow-lg transition-all duration-300 sm:min-h-[140px] sm:rounded-2xl sm:p-4 lg:min-h-[155px] lg:p-5 ${
                        isFeatured
                          ? "border-brand bg-brand text-white shadow-brand/25"
                          : "border-foreground/10 bg-card text-foreground hover:border-brand/30 hover:shadow-xl"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                          isFeatured
                            ? "bg-white/15 text-white"
                            : "bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white"
                        }`}
                      >
                        <FontAwesomeIcon icon={Icon} className="text-lg" aria-hidden />
                      </div>
                      <h3
                        className={`mt-4 text-sm font-bold leading-snug sm:text-base ${
                          isFeatured ? "text-white" : "text-foreground"
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p
                        className={`mt-2 line-clamp-2 flex-1 text-xs leading-relaxed ${
                          isFeatured ? "text-white/85" : "text-foreground/60"
                        }`}
                      >
                        {item.desc}
                      </p>
                      <span
                        className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${
                          isFeatured ? "text-white" : "text-brand"
                        }`}
                      >
                        Explore
                        <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Trust strip — extra top margin on lg for overlapping cards */}
        <div className="mt-6 sm:mt-8 lg:mt-[9rem]">
          <div className="grid grid-cols-2 gap-2 rounded-2xl border border-foreground/10 bg-card p-3 sm:grid-cols-4 sm:gap-3 sm:p-5">
            {hero.trustStats.map((stat, i) => (
              <div
                key={stat.label}
                className={`text-center ${i < hero.trustStats.length - 1 ? "sm:border-r sm:border-foreground/10" : ""}`}
              >
                <p className="text-lg font-bold tabular-nums text-brand sm:text-xl">{stat.value}</p>
                <p className="mt-0.5 text-[10px] font-medium leading-snug text-foreground/55 sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center text-xs text-foreground/50">
            {site.brandName} · {site.serviceArea}
          </p>
        </div>
      </div>
    </section>
  );
}
