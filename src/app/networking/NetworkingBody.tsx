"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWifi,
  faServer,
  faDesktop,
  faVideo,
  faPhoneVolume,
  faFingerprint,
  faCheck,
  faArrowRight,
  faXmark,
  faUser,
  faEnvelope,
  faPhone,
  faBuilding,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import ServiceProductCatalog from "@/components/ServiceProductCatalog";

import { networkingCatalog } from "@/data/serviceProductLists";

const services = [
  {
    icon: faWifi,
    title: "Wired & wireless networking",
    desc: "Cat6 runs, patch panels, UniFi or TP‑Link Omada stacks, and guest networks that stay isolated from payroll VLANs.",
  },

  {
    icon: faServer,
    title: "NAS & server setup",
    desc: "Synology / QNAP RAID planning, Windows Server basics, and backup targets your accountant will not argue with.",
  },

  {
    icon: faDesktop,
    title: "Hardware & accessories",
    desc: "Business-class desktops, docks, UPS sizing, and spares we can source with warranty cards in your company name.",
  },

  {
    icon: faPhoneVolume,
    title: "IP PBX systems",
    desc: "Yeastar / Asterisk-style deployments: IVR, hunt groups, and handsets programmed before we hand over admin passwords.",
  },

  {
    icon: faVideo,
    title: "CCTV & surveillance",
    desc: "PoE camera placement for coverage (not just more pixels), NVR storage math, and remote viewing without opening your whole LAN.",
  },

  {
    icon: faFingerprint,
    title: "Attendance systems",
    desc: "Biometric terminals wired cleanly, software paired to your shift rules, and export formats that HR already uses.",
  },
];

export default function NetworkingBody() {
  const { openEnquiry } = useEnquiryModal();

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
      <section className="relative overflow-hidden bg-section py-24 sm:py-28">
       {/* GLOW */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ================= TOP ================= */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-7xl"
          >
            {/* <div className="inline-flex items-center rounded-lg border border-surface-nav/20 bg-card px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-deep">
              Networking & on-site installs
            </div> */}

            <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-5 py-2 text-sm font-semibold tracking-wide text-brand backdrop-blur-xl">
              Networking & on-site installs
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Complete business
              <span className="text-brand"> networking infrastructure</span>
            </h2>

            <p className="mt-6 max-w-7xl text-base leading-relaxed text-foreground/70">
              Cabling, switching, Wi‑Fi, CCTV, and PBX — documented with photos and
              port maps so the next engineer (us or yours) is not guessing in the
              ceiling void.
            </p>
          </motion.div>

          {/* ================= SERVICES ================= */}
          {/* <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => (
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
                className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card p-7 shadow-md transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="relative flex h-full flex-col">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                    <FontAwesomeIcon
                      icon={service.icon}
                      className="text-xl"
                    />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {service.title}
                  </h3>

                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/70">
                    {service.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-brand">
                    <FontAwesomeIcon icon={faCheck} />
                    Rack photos & port list included
                  </div>

                  <div className="mt-auto flex flex-col gap-3 pt-8">
                    <button
                      type="button"
                      onClick={() => openServiceModal(service.title)}
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-hover"
                    >
                      Request service
                      <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openEnquiry(`${service.title} (networking)`, "Networking & cabling")
                      }
                      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-brand/30 bg-white px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
                    >
                      Enquiry
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
        eyebrow="Networking services"
        title={
          <>
            Product catalogue
            <span className="text-brand"> by category</span>
          </>
        }
        subtitle="Three cards per row on large screens: title, icon, and photo with an Enquiry button. Categories with more than three items use See more / See less."
        categories={networkingCatalog}
      />

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {openModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[101] flex items-center justify-center overflow-y-auto p-3 sm:p-4"
            >
              <div className="relative my-auto w-full max-h-[min(92dvh,92vh)] max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-surface-deep/95 shadow-2xl backdrop-blur-2xl sm:rounded-[36px]">
                {/* TOP */}
                <div className="relative overflow-hidden border-b border-white/10 px-5 py-5 sm:px-8 sm:py-7">
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-transparent" />

                  <div className="relative flex items-start justify-between gap-6">
                    <div>
                      <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-brand">
                        Service inquiry
                      </div>

                      <h3 className="mt-4 text-xl font-black text-white sm:mt-5 sm:text-3xl">
                        {selectedService}
                      </h3>

                      <p className="mt-3 text-slate-400">
                        We read every message in order — include site location and any
                        floor plans if you have them.
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
                <div className="p-5 sm:p-8">
                  <form className="grid gap-6 md:grid-cols-2">
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
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>

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
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
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
                          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
                        />

                        <input
                          type="tel"
                          placeholder="Phone number"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>

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
                          placeholder="Company name"
                          className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="mb-3 block text-sm font-semibold text-slate-300">
                        Requirement Details
                      </label>

                      <div className="relative">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          className="absolute left-5 top-6 text-slate-500"
                        />

                        <textarea
                          rows={5}
                          placeholder="Describe your networking requirement..."
                          className="w-full rounded-3xl border border-white/10 bg-white/[0.04] pl-14 pr-5 pt-5 text-white outline-none transition placeholder:text-slate-500 focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-brand to-brand-deep px-8 py-4 font-semibold text-white shadow-2xl shadow-brand/20 transition-all duration-300 hover:scale-[1.01]"
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