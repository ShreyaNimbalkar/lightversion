"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import ServiceProductCatalog from "@/components/ServiceProductCatalog";

import { repairRentalCatalog } from "@/data/serviceProductLists";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLaptop,
  faDesktop,
  faNetworkWired,
  faCamera,
  faCheck,
  faArrowRight,
  faXmark,
  faUser,
  faEnvelope,
  faPhone,
  faBuilding,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    icon: faLaptop,
    title: "Laptop Repair",
    desc: "Complete repair and maintenance solutions for all laptop brands and models.",
  },

  {
    icon: faDesktop,
    title: "Desktop Services",
    desc: "Hardware upgrades, troubleshooting, maintenance, and custom system support.",
  },

  {
    icon: faNetworkWired,
    title: "Networking Hardware",
    desc: "Routers, switches, accessories, and networking infrastructure support.",
  },

  {
    icon: faCamera,
    title: "CCTV Systems",
    desc: "Installation, maintenance, and repair of surveillance camera systems.",
  },
];

export default function RepairRentalBody() {
  const { openQuotation, openEnquiry } = useEnquiryModal();

  const [openModal, setOpenModal] = useState(false);

  const [selectedService, setSelectedService] = useState("");

  const openServiceModal = (service: string) => {
    setSelectedService(service);

    setOpenModal(true);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setOpenModal(false);

    document.body.style.overflow = "auto";
  };

  return (
    <>
      <section className="relative overflow-hidden bg-section py-28 text-foreground">
        {/* GLOW */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-7xl"
          >
            <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand">
              Our Solutions
            </div>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Complete repair &
              <span className="text-brand"> rental infrastructure</span>
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-foreground/70">
              We provide professional repair, maintenance, rental, and IT
              infrastructure support services for businesses, offices,
              institutes, and organizations.
            </p>
          </motion.div>

          {/* CARDS */}
          {/* <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-8 shadow-md transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="relative flex h-full flex-col"> */}
                  {/* ICON */}
                  {/* <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-brand">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-2xl"
                    />
                  </div> */}

                  {/* TITLE */}
                  {/* <h3 className="mt-8 text-2xl font-bold leading-tight text-foreground">
                    {service.title}
                  </h3> */}

                  {/* DESC */}
                  {/* <p className="mt-5 leading-relaxed text-foreground/70">
                    {service.desc}
                  </p> */}

                  {/* SUPPORT */}
                  {/* <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-brand">
                    <FontAwesomeIcon icon={faCheck} />

                    Professional support
                  </div> */}

                  {/* BUTTONS */}
                  {/* <div className="mt-auto flex flex-col gap-3 pt-10">
                    <button
                      type="button"
                      onClick={() => openServiceModal(service.title)}
                      className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
                    >
                      Request service

                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-sm transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry(`${service.title} (repair & rental)`, "Repair & rental")
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
          </div> */}
        </div>
      </section>

      <ServiceProductCatalog
        id="product-catalog"
        eyebrow="Rental & repair"
        title={
          <>
            Product catalogue
            <span className="text-brand"> by category</span>
          </>
        }
        subtitle="Three cards per row on large screens: title, icon, and photo with an Enquiry button. Categories with more than three items use See more / See less."
        categories={repairRentalCatalog}
      />

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {openModal && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            />

            {/* MODAL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto p-3 sm:p-4"
            >
              <div className="relative my-auto w-full max-h-[min(92dvh,92vh)] max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-surface-deep text-white shadow-2xl sm:rounded-[36px]">
                {/* TOP */}
                <div className="relative overflow-hidden border-b border-white/10 px-5 py-5 sm:px-8 sm:py-7">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />

                  <div className="relative flex items-start justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-brand">
                        Service Inquiry
                      </div>

                      <h3 className="mt-4 text-xl font-black text-white sm:mt-5 sm:text-3xl">
                        {selectedService}
                      </h3>

                      <p className="mt-3 text-slate-400">
                        Fill out the form and our team will contact you shortly.
                      </p>
                    </div>

                    <button
                      onClick={closeModal}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-surface-deep text-white transition hover:border-brand hover:text-brand"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>

                {/* FORM */}
                <div className="p-5 sm:p-8">
                  <form className="grid gap-6 md:grid-cols-2">
                    {/* NAME */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Full Name
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-surface-deep pl-14 pr-5 text-white outline-none transition focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Email Address
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-surface-deep pl-14 pr-5 text-white outline-none transition focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Phone Number
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-surface-deep pl-14 pr-5 text-white outline-none transition focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* COMPANY */}
                    <div>
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Company Name
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faBuilding}
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="text"
                          placeholder="Enter company name"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-surface-deep pl-14 pr-5 text-white outline-none transition focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* MESSAGE */}
                    <div className="md:col-span-2">
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Service Requirement
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          className="absolute left-5 top-6 text-slate-500"
                        />

                        <textarea
                          rows={5}
                          placeholder="Describe your service requirement..."
                          className="w-full rounded-3xl border border-white/10 bg-surface-deep pl-14 pr-5 pt-5 text-white outline-none transition focus:border-brand"
                        />
                      </div>
                    </div>

                    {/* BUTTON */}
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 rounded-2xl bg-brand px-8 py-4 font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:scale-[1.01] hover:bg-brand-deep"
                      >
                        Submit Inquiry

                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-sm"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}