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
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
              Routes that reach
              <span className="text-brand"> the right bench</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
              Call either Pune number, email {site.email}, or use the form — we route enquiries to the workshop or field team
              based on what you describe. {site.workingHours}
            </p>

            {/* FEATURES */}
            {/* <div className="mt-10 flex flex-col gap-4">
              {[
                "Two verified Pune locations (Manikbaug + Navi Peth)",
                "GST-ready quotations before billable site time",
                "Repairs, rentals, networking, CCTV, voice, and genuine licences",
                "No offshore call centre — you speak with local staff",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-card px-5 py-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>

                  <p className="text-sm font-semibold text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div> */}

            {/* CONTACT INFO */}
            <div className="mt-10 grid gap-5">
              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-6 shadow-md transition-all duration-500 hover:border-brand/30 hover:shadow-lg"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
                </div>
                <div className="relative flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faPhone} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-foreground">Phone</h4>
                    <div className="mt-3 flex flex-col gap-2">
                      {site.phones.map((p) => (
                        <div key={p.tel} className="flex flex-wrap items-center gap-3">
                          <a
                            href={siteTelHref(p.tel)}
                            className="text-sm font-semibold text-brand hover:underline"
                          >
                            {p.display}
                          </a>
                          <button
                            type="button"
                            onClick={() => handlePhoneClick(p.display)}
                            className="text-xs font-medium text-foreground/50 underline-offset-2 hover:text-brand hover:underline"
                          >
                            Copy
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-6 shadow-md transition-all duration-500 hover:border-brand/30 hover:shadow-lg"
              >
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
                </div>
                <div className="relative flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-foreground">Email</h4>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-2 block text-sm leading-relaxed text-foreground/65 transition hover:text-brand"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              </motion.div>

              <div id="locations" className="contents">
              {site.locations.map((loc) => (
                <motion.div
                  key={loc.label}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-6 shadow-md transition-all duration-500 hover:border-brand/30 hover:shadow-lg"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
                  </div>
                  <div className="relative flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      <FontAwesomeIcon icon={faLocationDot} className="text-xl" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-foreground">{loc.label}</h4>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 block text-sm leading-relaxed text-foreground/65 transition hover:text-brand"
                      >
                        {loc.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>

              <motion.div
                whileHover={{ y: -5 }}
                className="group relative overflow-hidden rounded-[28px] border border-foreground/10 bg-card p-6 shadow-md transition-all duration-500 hover:border-brand/30 hover:shadow-lg"
              >
                <div className="relative flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faClock} className="text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-foreground">Hours</h4>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/65">{site.workingHours}</p>
                  </div>
                </div>
              </motion.div>
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