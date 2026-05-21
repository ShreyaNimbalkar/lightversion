"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import RequestQuotationForm from "@/components/RequestQuotationForm";

export type EnquiryModalPayload = {
  mode: "quotation" | "enquiry";
  productContext?: string;
  defaultInterest?: string;
  /** Opened from a plan card “Request a quote” on a product page */
  fromPlanCard?: boolean;
};

type EnquiryModalContextValue = {
  open: boolean;
  payload: EnquiryModalPayload;
  openQuotation: () => void;
  openEnquiry: (productContext: string, defaultInterest?: string) => void;
  openProductQuote: (productContext: string, defaultInterest?: string) => void;
  close: () => void;
};

const EnquiryModalContext = createContext<EnquiryModalContextValue | null>(null);

export function useEnquiryModal() {
  const ctx = useContext(EnquiryModalContext);
  if (!ctx) {
    throw new Error("useEnquiryModal must be used within EnquiryModalProvider");
  }
  return ctx;
}

function EnquiryModalShell() {
  const { open, payload, close } = useEnquiryModal();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isPlanQuote = Boolean(payload.fromPlanCard && payload.productContext);

  const title = isPlanQuote
    ? "Request a quote"
    : payload.mode === "quotation"
      ? "Request a quotation"
      : "Product enquiry";

  const subtitle = isPlanQuote
    ? "Fill in your details for this plan. We confirm quantity, timeline, and GST before sending your quote."
    : payload.mode === "quotation"
      ? "Same fields as our on-page form — we reply with scope questions and a GST-ready estimate."
      : "Tell us what you need for this product line. We route your enquiry to the right engineer.";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close dialog"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[300] bg-surface-deep/60 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] top-[max(3.5rem,env(safe-area-inset-top,0px)+3.25rem)] z-[301] mx-auto flex max-h-none w-full max-w-[min(32rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[5vh] sm:max-h-[90vh] sm:w-full sm:max-w-lg sm:-translate-x-1/2"
          >
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-foreground/10 bg-section px-5 py-4 sm:px-6">
                <div>
                  <h2
                    id="enquiry-modal-title"
                    className="text-lg font-bold text-foreground sm:text-xl"
                  >
                    {title}
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/65 sm:text-sm">
                    {subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-foreground/10 text-foreground transition hover:bg-brand/10 hover:text-brand"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-lg" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
                <RequestQuotationForm
                  key={`${payload.mode}-${payload.productContext ?? ""}-${payload.fromPlanCard ?? false}`}
                  mode={payload.mode}
                  productContext={payload.productContext}
                  defaultInterest={payload.defaultInterest}
                  fromPlanCard={payload.fromPlanCard}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function EnquiryModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<EnquiryModalPayload>({
    mode: "quotation",
  });

  const openQuotation = useCallback(() => {
    setPayload({ mode: "quotation" });
    setOpen(true);
  }, []);

  const openEnquiry = useCallback(
    (productContext: string, defaultInterest?: string) => {
      setPayload({
        mode: "enquiry",
        productContext,
        defaultInterest,
        fromPlanCard: false,
      });
      setOpen(true);
    },
    []
  );

  const openProductQuote = useCallback(
    (productContext: string, defaultInterest?: string) => {
      setPayload({
        mode: "enquiry",
        productContext,
        defaultInterest,
        fromPlanCard: true,
      });
      setOpen(true);
    },
    []
  );

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      payload,
      openQuotation,
      openEnquiry,
      openProductQuote,
      close,
    }),
    [open, payload, openQuotation, openEnquiry, openProductQuote, close]
  );

  return (
    <EnquiryModalContext.Provider value={value}>
      {children}
      <EnquiryModalShell />
    </EnquiryModalContext.Provider>
  );
}
