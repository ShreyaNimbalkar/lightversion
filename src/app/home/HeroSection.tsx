"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowRight,
  faCircleCheck,
  faServer,
} from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import { site } from "@/data/site";

export default function HeroSection() {
  const { openQuotation } = useEnquiryModal();

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-x-hidden bg-section pb-10 pt-6 text-foreground sm:pb-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,58,107,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,58,107,0.04)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="mb-6 flex max-w-full flex-col gap-2 rounded-lg border border-foreground/10 bg-card px-3 py-2 shadow-sm sm:mb-8 sm:flex-row sm:items-center sm:gap-3 sm:px-4">
              <FontAwesomeIcon icon={faCircleCheck} className="shrink-0 text-sm text-brand" />
              <span className="text-xs font-medium leading-snug text-foreground/80 sm:text-sm">
                Pune · Since {site.establishedYear} · GST-ready invoices · Two service points
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.65rem]">
              {site.brandName} — IT support
              <span className="mt-1 block text-brand">your finance team can file with confidence</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
              Workshop and on-site help for laptops, desktops, rentals, structured cabling, Wi‑Fi, CCTV, IP PBX, and
              attendance systems — plus Microsoft, Tally, and security licensing through proper distribution. We quote
              labour and parts before we spend your budget, and we leave cable maps and photos when the job is done.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openQuotation()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-colors duration-200 hover:bg-brand-hover"
              >
                Request quotation
                <FontAwesomeIcon icon={faArrowRight} className="text-xs opacity-90" />
              </motion.button>

              <Link
                href="/repair-rental"
                className="inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-card px-7 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:border-brand hover:text-brand"
              >
                View services
              </Link>
            </div>

            <p className="mt-4 text-sm text-foreground/60">
              Prefer to talk first?{" "}
              <Link
                href="/contact"
                className="font-medium text-brand underline-offset-2 hover:underline"
              >
                Contact the team
              </Link>
              .
            </p>

            <div className="mt-12 grid grid-cols-1 gap-6 border-t border-foreground/10 pt-10 sm:grid-cols-3">
              {[
                ["Two Pune locations", "Manikbaug workshop dispatch · Navi Peth walk-in for sales and drop-offs"],
                ["No surprise bills", "Scope and parts discussed in writing before clockable work starts"],
                ["Real people on the phone", "You reach the same desk that updates your ticket — not a random script"],
              ].map(([title, detail], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.08 }}
                >
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-foreground/60">
                    {detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08f9a097?q=80&w=1200&auto=format&fit=crop"
                alt="Engineer reviewing network equipment in a client environment"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/50 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <div className="max-w-md rounded-xl border border-foreground/15 bg-card/95 p-4 shadow-lg backdrop-blur sm:p-5 dark:border-white/10 dark:bg-surface-deep/90">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                      <FontAwesomeIcon icon={faServer} className="text-brand" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">
                        Networking & field documentation
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                        Port labels, rack photos, and test notes — so the next engineer is not guessing above your ceiling tiles.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
