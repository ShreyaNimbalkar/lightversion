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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-section pb-14 pt-24 text-foreground sm:pb-10 sm:pt-28 lg:pb-0">

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-brand/10 blur-3xl md:h-[420px] md:w-[420px]" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[320px] w-[320px] rounded-full bg-accent/15 blur-3xl md:h-[500px] md:w-[500px]" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,58,107,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(26,58,107,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />

      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-12">

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="w-full"
          >

            {/* TOP BADGE */}
            <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-foreground/10 bg-card px-4 py-2 shadow-sm">

              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-xs text-brand"
              />

              <span className="text-[11px] font-medium leading-relaxed text-foreground/75 sm:text-sm">

                Pune · Since {site.establishedYear} · GST-ready invoices

              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.65rem]">

              {site.brandName}

              <span className="mt-2 block text-brand">
                IT support built for modern businesses
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">

              Workshop and on-site support for laptops, desktops,
              networking, CCTV, IP PBX, rentals, attendance systems,
              and enterprise software licensing.

            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

              <motion.button
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openQuotation()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-hover sm:h-14 sm:px-8"
              >

                Request quotation

                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-xs"
                />

              </motion.button>

              <Link
                href="/repair-rental"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-foreground/15 bg-card px-6 text-sm font-semibold text-foreground transition hover:border-brand hover:text-brand sm:h-14 sm:px-8"
              >

                View services

              </Link>

            </div>

            {/* CONTACT */}
            <p className="mt-5 text-sm leading-relaxed text-foreground/60">

              Prefer to talk first?{" "}

              <Link
                href="/contact"
                className="font-medium text-brand underline-offset-4 hover:underline"
              >

                Contact the team

              </Link>

            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-1 gap-4 border-t border-foreground/10 pt-8 sm:grid-cols-2 lg:grid-cols-3">

              {[
                [
                  "Two Pune locations",
                  "Workshop dispatch and walk-in support",
                ],

                [
                  "Transparent pricing",
                  "Parts and labour discussed before work starts",
                ],

                [
                  "Real support",
                  "Direct communication with technicians",
                ],
              ].map(([title, detail], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.1,
                  }}
                  className="rounded-2xl border border-foreground/10 bg-card/60 p-4 backdrop-blur"
                >

                  <h3 className="text-sm font-semibold text-foreground">
                    {title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                    {detail}
                  </p>

                </motion.div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
            className="relative"
          >

            <div className="relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card shadow-2xl">

              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08f9a097?q=80&w=1200&auto=format&fit=crop"
                alt="IT engineer"
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[260px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* FLOATING CARD */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                }}
                className="absolute bottom-2 left-2 right-2 sm:bottom-6 sm:left-6 sm:right-6"
              >

                <div className="rounded-2xl border border-white/10 bg-card/90 p-3 shadow-xl backdrop-blur-lg sm:p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10">

                      <FontAwesomeIcon
                        icon={faServer}
                        className="text-brand"
                      />

                    </div>

                    <div>

                      <h4 className="text-sm font-semibold text-foreground">
                        Networking & documentation
                      </h4>

                      <p className="mt-1 text-xs leading-relaxed text-foreground/70">

                        Port labels, rack photos, and proper testing notes
                        for every installation.

                      </p>

                    </div>

                  </div>

                </div>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}