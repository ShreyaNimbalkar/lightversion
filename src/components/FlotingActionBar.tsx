"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import { site, siteTelHref } from "@/data/site";

export default function FloatingActionBar() {
  const { openQuotation, open: modalOpen } = useEnquiryModal();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => setVisible(window.scrollY > 380);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (modalOpen) return null;

  return (
    <AnimatePresence>
      {visible && !dismissed ? (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          className="safe-bottom fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg px-4 pb-4 sm:bottom-6 sm:left-auto sm:right-6 sm:px-0 sm:pb-0 sm:mx-0"
          role="region"
          aria-label="Quick contact actions"
        >
          <div className="flex items-stretch gap-2 rounded-2xl border border-foreground/10 bg-card/95 p-2.5 shadow-2xl backdrop-blur-md sm:p-2">
            <a
              href={siteTelHref(site.phones[0].tel)}
              className="inline-flex min-h-11 flex-1 basis-0 items-center justify-center gap-1.5 rounded-xl bg-surface-nav px-3 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-brand-deep sm:gap-2 sm:px-4"
            >
              <FontAwesomeIcon icon={faPhone} className="shrink-0 text-sm" aria-hidden />
              Call
            </a>
            <button
              type="button"
              onClick={() => openQuotation()}
              className="inline-flex min-h-11 min-w-[7.25rem] flex-[1.2] basis-0 items-center justify-center gap-1.5 rounded-xl bg-brand px-4 text-sm font-semibold whitespace-nowrap text-white shadow-md transition hover:bg-brand-hover sm:min-w-0 sm:gap-2 sm:px-5"
            >
              <FontAwesomeIcon icon={faFileLines} className="shrink-0 text-sm" aria-hidden />
              Get quote
            </button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl border border-foreground/10 text-foreground/50 transition hover:text-foreground"
              aria-label="Dismiss quick actions"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
