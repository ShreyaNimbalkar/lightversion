"use client";

import { motion } from "framer-motion";

import RequestQuotationForm from "@/components/RequestQuotationForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { site, siteTelHref } from "@/data/site";

import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faClock,
  faPaperPlane,
  faHeadset,
  faCheck,
  faArrowRight,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ContactBody() {
  const handlePhoneClick = (phone: string) => {
    void navigator.clipboard.writeText(phone);
    alert("Phone number copied to clipboard");
  };

  return (
    <section className="relative overflow-hidden bg-section section-padding">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLOW */}
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="page-container relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* CONTACT CARD */}
            <div className="relative overflow-hidden rounded-[32px] border border-foreground/10 bg-card/90 p-6 shadow-xl backdrop-blur-xl sm:p-8">
              <div className="absolute top-0 right-0 h-44 w-44 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faHeadset} className="text-2xl" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                      Support Desk
                    </p>

                    <h2 className="text-2xl font-black text-foreground">
                      Contact Information
                    </h2>
                  </div>
                </div>

                {/* PHONE */}
                <div className="mt-8 space-y-5">
                  <div className="rounded-2xl border border-foreground/10 bg-background/40 p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-brand">
                        <FontAwesomeIcon icon={faPhone} />
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">Phone</h4>

                        <div className="mt-2 flex flex-col gap-2">
                          {site.phones.map((p) => (
                            <div
                              key={p.tel}
                              className="flex items-center gap-3"
                            >
                              <a
                                href={siteTelHref(p.tel)}
                                className="text-sm font-medium text-brand hover:underline"
                              >
                                {p.display}
                              </a>

                              <button
                                type="button"
                                onClick={() =>
                                  handlePhoneClick(p.display)
                                }
                                className="text-xs text-foreground/50 hover:text-brand"
                              >
                                Copy
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div className="rounded-2xl border border-foreground/10 bg-background/40 p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-brand">
                        <FontAwesomeIcon icon={faEnvelope} />
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">Email</h4>

                        <a
                          href={`mailto:${site.email}`}
                          className="mt-2 block text-sm text-foreground/65 hover:text-brand"
                        >
                          {site.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* HOURS */}
                  <div className="rounded-2xl border border-foreground/10 bg-background/40 p-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-brand">
                        <FontAwesomeIcon icon={faClock} />
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground">
                          Working Hours
                        </h4>

                        <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                          {site.workingHours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FEATURES */}
                {/* <div className="mt-8 space-y-3">
                  {[
                    "GST-ready quotations",
                    "Local Pune support team",
                    "Networking, rentals & repair services",
                    "Fast response for business enquiries",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >
                      <div className="text-brand">
                        <FontAwesomeIcon icon={faCheckCircle} />
                      </div>

                      <p className="text-sm text-foreground/70">
                        {item}
                      </p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            {/* LOCATIONS */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              {site.locations.map((loc) => (
                <motion.a
                  whileHover={{ y: -4 }}
                  key={loc.label}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    loc.mapQuery,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[28px] border border-foreground/10 bg-card/80 p-6 backdrop-blur-xl transition-all hover:border-brand/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <FontAwesomeIcon icon={faLocationDot} />
                    </div>

                    <div>
                      <h4 className="font-black text-foreground">
                        {loc.label}
                      </h4>

                      <div className="mt-2 text-sm leading-relaxed text-foreground/60">
                        {loc.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                        Open Map
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-xs transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>


          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-xl sm:rounded-3xl">
              {/* HOVER EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />

              {/* HEADER */}
              <div className="relative border-b border-foreground/10 px-5 py-5 sm:px-8 sm:py-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand sm:h-14 sm:w-14">
                    <FontAwesomeIcon
                      icon={faHeadset}
                      className="text-xl sm:text-2xl"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-brand sm:text-sm">
                      Send Message
                    </p>

                    <h3 className="mt-0.5 text-xl font-black text-foreground sm:mt-1 sm:text-3xl">
                      Request Consultation
                    </h3>
                  </div>
                </div>
              </div>

              <div className="relative p-4 sm:p-8">
                <RequestQuotationForm mode="enquiry" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}