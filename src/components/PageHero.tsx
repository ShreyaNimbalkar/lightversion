"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import PageHeroBreadcrumbs, { type PageHeroBreadcrumb } from "@/components/PageHeroBreadcrumbs";
import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site } from "@/data/site";

export type { PageHeroBreadcrumb };

export const PAGE_HERO_BACKGROUND = "/header.jpg";

export type PageHeroVariant = "immersive" | "compact";

export type PageHeroProps = {
  title: string;
  description: string;
  breadcrumbs: PageHeroBreadcrumb[];
  variant?: PageHeroVariant;
  accent?: "brand" | "sky" | "slate";
  backgroundImage?: string;
  /** Optional primary action below description */
  ctaLabel?: string;
  ctaHref?: string;
  showEnquiryCta?: boolean;
};

const accentBar: Record<NonNullable<PageHeroProps["accent"]>, string> = {
  brand: "bg-brand",
  sky: "bg-accent",
  slate: "bg-surface-nav",
};

export default function PageHero({
  title,
  description,
  breadcrumbs,
  variant = "immersive",
  accent = "brand",
  backgroundImage = PAGE_HERO_BACKGROUND,
  ctaLabel,
  ctaHref,
  showEnquiryCta = false,
}: PageHeroProps) {
  const { openQuotation } = useEnquiryModal();

  if (variant === "compact") {
    return (
      <header className="relative border-b border-foreground/10 bg-section">
        <div className={`h-1 w-full ${accentBar[accent]}`} aria-hidden />
        <div className="page-container py-8 sm:py-10">
          <PageHeroBreadcrumbs items={breadcrumbs} bare className="mb-4" />
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground/70 sm:text-base">{description}</p>
          </motion.div>
        </div>
      </header>
    );
  }

  /* immersive — services & product pages */
  return (
    <header className="relative mt-0">
      <section className="relative min-h-[200px] overflow-hidden sm:min-h-[260px] lg:min-h-[320px]">
        <Image src={backgroundImage} alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-surface-deep/80" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-surface-deep/95 via-surface-deep/85 to-surface-deep/70"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className={`absolute left-0 top-0 h-full w-1.5 sm:w-2 ${accentBar[accent]}`} aria-hidden />

        <div className="page-container relative flex min-h-[inherit] flex-col justify-center py-10 sm:py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="mb-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
              Pune &amp; PCMC · Since {site.establishedYear}
            </p>
            <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl lg:text-[2.5rem]">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">{description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {showEnquiryCta ? (
                <button type="button" onClick={() => openQuotation()} className="btn-primary">
                  Get a quote
                  <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                </button>
              ) : null}
              {ctaHref && ctaLabel ? (
                <Link href={ctaHref} className="btn-on-dark">
                  {ctaLabel}
                </Link>
              ) : null}
            </div>
          </motion.div>
        </div>
      </section>
      <PageHeroBreadcrumbs items={breadcrumbs} />
    </header>
  );
}
