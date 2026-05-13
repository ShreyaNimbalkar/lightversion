"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import ServiceProductCatalog from "@/components/ServiceProductCatalog";

import { licenseCatalog } from "@/data/serviceProductLists";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWindows,
  faMicrosoft,
} from "@fortawesome/free-brands-svg-icons";

import {
  faShieldHalved,
  faFileInvoiceDollar,
  faCheck,
  faXmark,
  faEnvelope,
  faPhone,
  faBuilding,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const licenses = [
  {
    icon: faMicrosoft,
    title: "Microsoft Licenses",
    desc: "Windows 11 Pro volume where applicable, Microsoft 365 plans sized to real headcount, and activation support in your tenant — not a random key reseller.",
  },

  {
    icon: faFileInvoiceDollar,
    title: "Tally Solutions",
    desc: "Tally Prime licensing with GST-ready setup notes. We align releases with your accountant’s cut-off so you are not mid-migration at quarter end.",
  },

  {
    icon: faShieldHalved,
    title: "Quick Heal Security",
    desc: "Endpoint suites sized for laptops you actually manage — policies explained before we lock USB ports your sales team still needs.",
  },

  {
    icon: faWindows,
    title: "Business Software",
    desc: "CAD viewers, PDF tools, and vertical apps where the vendor still expects a human invoice — we quote only SKUs we can fulfil.",
  },
];

export default function LicenseBody() {
  const { openQuotation, openEnquiry } = useEnquiryModal();

  const [openModal, setOpenModal] = useState(false);

  const [selectedLicense, setSelectedLicense] = useState("");

  const openLicenseModal = (license: string) => {
    setSelectedLicense(license);

    setOpenModal(true);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpenModal(false);

    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section className="relative overflow-hidden bg-section py-28">
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-brand/10 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-brand-deep/20 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-5 py-2 text-sm font-semibold tracking-wide text-brand backdrop-blur-xl">
              Licensed software (authorised channels)
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
              Genuine Software
              <span className="bg-gradient-to-r from-brand to-brand-deep bg-clip-text text-transparent">
                {" "}
                Licensing Services
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
              Keys, invoices, and activation help in one thread — so your CA and your
              IT lead see the same paper trail. We only quote SKUs we can fulfil through
              proper distribution.
            </p>
          </motion.div>

          {/* CARDS */}
          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {licenses.map((license, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-8 shadow-md transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="relative flex flex-1 flex-col">
                  {/* ICON */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand transition duration-300 group-hover:bg-brand/15">
                    <FontAwesomeIcon
                      icon={license.icon}
                      className="text-2xl"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-8 text-2xl font-bold text-foreground">
                    {license.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-5 flex-1 leading-relaxed text-foreground/70">
                    {license.desc}
                  </p>

                  {/* SUPPORT */}
                  <div className="mt-6 flex items-center gap-3 text-sm font-semibold text-brand">
                    <FontAwesomeIcon icon={faCheck} />
                    Genuine & verified licence
                  </div>

                  {/* BUTTONS */}
                  <div className="mt-auto flex flex-col gap-3 pt-10">
                    <button
                      type="button"
                      onClick={() => openLicenseModal(license.title)}
                      className="group inline-flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
                    >
                      Request licence

                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-sm transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry(`${license.title} (licensing)`, "Software licences")
                      }
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-brand/30 bg-section px-6 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
                    >
                      Enquiry
                    </button>

                    <button
                      type="button"
                      onClick={() => openQuotation()}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-foreground/10 bg-card px-6 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                    >
                      Request quotation
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProductCatalog
        id="product-catalog"
        eyebrow="Licence products"
        title={
          <>
            Product catalogue
            <span className="text-brand"> by product</span>
          </>
        }
        subtitle="Three cards per row on large screens: title, icon, and photo with an Enquiry button. Extra licence lines use See more / See less like repair and networking."
        categories={licenseCatalog}
      />

      {/* MODAL */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="fixed left-1/2 top-1/2 z-50 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-[36px] border border-white/10 bg-surface-deep/95 shadow-2xl backdrop-blur-2xl">
                {/* HEADER */}
                <div className="relative overflow-hidden border-b border-white/10 px-8 py-7">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />

                  <div className="relative flex items-start justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-brand">
                        License Request
                      </div>

                      <h3 className="mt-5 text-3xl font-black text-white">
                        {selectedLicense}
                      </h3>

                      <p className="mt-3 text-slate-400">
                        Fill out the form and our licensing team will contact
                        you shortly.
                      </p>
                    </div>

                    <button
                      onClick={closeModal}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:border-brand hover:text-brand"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>

                {/* FORM */}
                <form className="grid gap-5 p-8">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Full Name
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder="Enter full name"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Phone Number
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-300">
                      Email Address
                    </label>

                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="email"
                        placeholder="Enter email address"
                        className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-300">
                      Requirement Details
                    </label>

                    <textarea
                      rows={5}
                      placeholder="Tell us your software license requirement..."
                      className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand to-brand-deep text-sm font-semibold text-white shadow-2xl shadow-brand/20 transition-all duration-300 hover:scale-[1.01]"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}