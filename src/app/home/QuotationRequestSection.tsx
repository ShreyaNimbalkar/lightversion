"use client";

import { useEffect } from "react";

import Link from "next/link";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines, faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

export default function QuotationRequestSection() {
  const { openQuotation } = useEnquiryModal();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#quotation") {
      const t = window.setTimeout(() => openQuotation(), 200);
      return () => window.clearTimeout(t);
    }
  }, [openQuotation]);

  return (
    <section
      id="quotation"
      className="scroll-mt-24 border-t border-foreground/10 bg-section py-16 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="overflow-hidden rounded-2xl border border-foreground/10 bg-card p-8 text-center shadow-lg sm:p-10"
        >
          <div className="mx-auto inline-flex items-center gap-2 rounded-lg border border-foreground/10 bg-section px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-deep">
            <FontAwesomeIcon icon={faFileLines} className="text-brand" />
            Request a quotation
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Request a formal quotation
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-foreground/70">
            Tell us what you need repaired, cabled, or licensed. The form opens in an overlay and sends a structured email to
            our desk so nothing gets lost in a chat thread.
          </p>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => openQuotation()}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-hover"
          >
            Open quotation form
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </motion.button>

          <p className="mt-6 text-xs text-foreground/55">
            Prefer phone? Reach us from the{" "}
            <Link
              href="/contact"
              className="font-medium text-brand hover:text-brand-hover hover:underline"
            >
              contact page
            </Link>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
