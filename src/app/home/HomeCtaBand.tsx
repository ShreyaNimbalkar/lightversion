"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site, siteTelHref } from "@/data/site";

/** Single closing CTA — no duplicate quotation section elsewhere on home */
export default function HomeCtaBand() {
  const { openQuotation } = useEnquiryModal();

  return (
    <section id="quotation" className="scroll-mt-24 border-t border-foreground/10 bg-section pb-16 pt-4 sm:pb-20">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl bg-surface-nav px-6 py-10 text-center sm:rounded-3xl sm:px-10 sm:py-12"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">Ready to start?</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-white/75 sm:text-base">
            Tell us what you need — repair, rental, network, CCTV, or licences. We respond with a written scope and GST-ready
            quote.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" onClick={() => openQuotation()} className="btn-primary min-w-[11rem]">
              Request quotation
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </button>
            <Link href="/contact" className="btn-on-dark min-w-[11rem]">
              Contact us
            </Link>
            <a
              href={siteTelHref(site.phones[0].tel)}
              className="inline-flex min-h-11 items-center justify-center gap-2 px-4 text-sm font-semibold text-white/90 hover:text-white"
            >
              <FontAwesomeIcon icon={faPhone} />
              {site.phones[0].display}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
