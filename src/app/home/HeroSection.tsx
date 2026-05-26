"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site, siteTelHref } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const HERO_SLIDES = [
  "/head1.jpg",
  "/head2.jpg",
  "/head3.jpg",
];

export default function HeroSection() {
  const { openQuotation } = useEnquiryModal();
  const { hero } = siteContent;
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative -mt-[4.25rem] w-full min-h-[92svh] sm:-mt-20 sm:min-h-[88svh]"
      aria-label="Hero"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_SLIDES[slide]}
              alt={`${site.brandName} — IT services Pune`}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-surface-deep/40" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-r from-surface-deep/72 via-surface-deep/25 to-surface-deep/10"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-surface-deep/70 via-transparent to-surface-deep/30"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex min-h-[92svh] flex-col justify-center sm:min-h-[88svh]">
        <div className="page-container w-full py-[5.5rem] sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
              {hero.badge}
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem]">
              {hero.headlineLines[0]}
              <span className="block text-white/95">{hero.headlineLines[1]}</span>
              <span className="font-hero-accent mt-2 block text-2xl font-medium text-brand sm:text-3xl md:text-4xl">
                {hero.titleAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => openQuotation()}
                className="btn-primary"
              >
                {hero.ctaPrimary}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden />
              </button>
              {/* <a
                href={siteTelHref(site.phones[0].tel)}
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <FontAwesomeIcon icon={faPhone} className="text-brand" aria-hidden />
                Call now
              </a> */}
              <Link
                href="#services"
                className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                View services
                <FontAwesomeIcon icon={faArrowDown} className="text-xs" aria-hidden />
              </Link>
            </div>
          </motion.div>
        </div>

        <Link
          href="#services"
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1 text-white/50 transition hover:text-white"
          aria-label="Scroll to services"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <FontAwesomeIcon icon={faArrowDown} className="text-xs animate-bounce" />
          </span>
        </Link>
      </div>
    </section>
  );
}
