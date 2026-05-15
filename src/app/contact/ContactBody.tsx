"use client";

import { motion } from "framer-motion";

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

const services = [
  "Laptop / desktop repair & upgrade",
  "Rental & interim devices",
  "Structured cabling & Wi‑Fi",
  "Switches, routers & firewalls",
  "NAS / server setup",
  "CCTV & NVR",
  "IP PBX & attendance terminals",
  "Microsoft 365 / Windows licensing",
  "Tally Prime & renewals",
  "Quick Heal / endpoint security",
  "AMC & on-site support",
];

export default function ContactBody() {
  const handlePhoneClick = (phone: string) => {
    void navigator.clipboard.writeText(phone);
    alert("Phone number copied to clipboard");
  };

  return (
    <section className="relative overflow-hidden bg-section py-28">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLOW */}
        <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-brand/20 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
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
            <div className="relative overflow-hidden rounded-[36px] border border-foreground/10 bg-card shadow-xl">
              {/* HOVER EFFECT */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />

              {/* HEADER */}
              <div className="relative border-b border-foreground/10 px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon
                      icon={faHeadset}
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-brand">
                      Send Message
                    </p>

                    <h3 className="mt-1 text-3xl font-black text-foreground">
                      Request Consultation
                    </h3>
                  </div>
                </div>
              </div>

              {/* FORM */}
              <form className="relative grid gap-5 p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="h-14 rounded-2xl border border-foreground/15 bg-section px-5 text-foreground outline-none transition-all duration-300 placeholder:text-foreground/45 focus:border-brand"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="h-14 rounded-2xl border border-foreground/15 bg-section px-5 text-foreground outline-none transition-all duration-300 placeholder:text-foreground/45 focus:border-brand"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="h-14 rounded-2xl border border-foreground/15 bg-section px-5 text-foreground outline-none transition-all duration-300 placeholder:text-foreground/45 focus:border-brand"
                  />

                  <input
                    type="text"
                    placeholder="Company Name"
                    className="h-14 rounded-2xl border border-foreground/15 bg-section px-5 text-foreground outline-none transition-all duration-300 placeholder:text-foreground/45 focus:border-brand"
                  />
                </div>

                {/* SERVICE DROPDOWN */}
                <select
                  className="h-14 rounded-2xl border border-foreground/15 bg-section px-5 text-foreground outline-none transition-all duration-300 focus:border-brand"
                >
                  <option value="" className="bg-card text-foreground/60">
                    Select Service
                  </option>

                  {services.map((service, index) => (
                    <option
                      key={index}
                      value={service}
                      className="bg-card text-foreground"
                    >
                      {service}
                    </option>
                  ))}
                </select>

                <textarea
                  rows={6}
                  placeholder="Tell us about your requirement..."
                  className="rounded-2xl border border-foreground/15 bg-section p-5 text-foreground outline-none transition-all duration-300 placeholder:text-foreground/45 focus:border-brand"
                />

                <button
                  type="submit"
                  className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-brand px-6 font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-hover"
                >
                  Send Message

                  <FontAwesomeIcon
                    icon={faPaperPlane}
                    className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}