"use client";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faNetworkWired,
  faShieldHalved,
  faHeadset,
  faMicrochip,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { site } from "@/data/site";

const features = [
  {
    icon: faNetworkWired,
    title: "Networking & connectivity",
    desc: "Copper plant, Wi‑Fi, switching, and perimeter gear sized to your headcount — not a generic “best router” blog post.",
  },

  {
    icon: faShieldHalved,
    title: "CCTV & low-voltage",
    desc: "Camera placement for coverage, NVR retention you can defend in an incident review, and PoE budgets that do not brown out at 5 p.m.",
  },

  {
    icon: faMicrochip,
    title: "Workshop & rentals",
    desc: "Laptop and desktop repairs with parts quoted before we order, plus interim devices when procurement timelines slip.",
  },

  {
    icon: faHeadset,
    title: "Licensing & renewals",
    desc: "Microsoft 365, Windows, Tally, and security SKUs through proper distribution — invoices your CA can file without follow-up calls.",
  },
];

export default function AboutBody() {
  return (
    <section className="relative overflow-hidden bg-section py-28">
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {/* GLOW */}
        <div className="absolute top-0 right-0 h-[450px] w-[450px] rounded-full bg-brand/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-brand/10 blur-3xl" />

        {/* GRID */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-20 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
              How we show up
              <span className="text-brand"> day to day</span>
            </h2>

            <p className="mt-4 text-base leading-relaxed text-foreground/70 md:text-lg">
              {site.brandName} is proprietor-led by {site.proprietor}. One GST number from workshop board work to ceiling
              cable runs — so finance and IT share a single accountable thread from estimate to invoice.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Two Pune touchpoints: Manikbaug dispatch and Navi Peth walk-in",
                "Written scope before billable labour — especially on site visits",
                "Licence renewals planned around your GST calendar, not our convenience",
                "Field engineers who photograph racks and label switch ports by default",
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/10 bg-card px-5 py-4 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faCheck} />
                  </div>

                  <p className="text-base font-medium text-foreground">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            {/* <div className="mt-10">
              <button className="group inline-flex items-center gap-3 rounded-2xl bg-brand px-7 py-4 font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-hover">
                Explore Solutions

                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </div> */}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-6 shadow-lg transition-all duration-500 hover:border-brand/25 hover:shadow-xl sm:rounded-3xl sm:p-8"
              >
                {/* HOVER EFFECT */}
                <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
                </div>

                <div className="relative">
                  {/* ICON */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="text-2xl"
                    />
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-8 text-2xl font-black text-foreground">
                    {feature.title}
                  </h3>

                  {/* DESC */}
                  <p className="mt-5 leading-relaxed text-foreground/60">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* BOTTOM SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-28 overflow-hidden rounded-[40px] border border-foreground/10 bg-card p-10 shadow-xl lg:p-14"
        >
          {/* GLOW */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          {/* HOVER GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="max-w-4xl">
              <div className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand">
                How we prefer to work
              </div>

              <h3 className="mt-6 text-4xl font-black leading-tight text-foreground md:text-5xl">
                Clear paperwork
                <span className="block text-brand">
                  and technicians who show up
                </span>
              </h3>

              <p className="mt-6 text-lg leading-relaxed text-foreground/70">
                {site.serviceArea} If we cannot meet a timeline honestly, we say so before you block your users. Our repeat
                business comes from finance teams who recognise our invoice format — and from IT leads who still have the
                rack photos we attached when the job closed.
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-5 lg:min-w-[320px]">
              <div className="rounded-3xl border border-foreground/10 bg-section p-6 shadow-inner">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                      className="text-2xl"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[2px] text-brand">
                      Licences & renewals
                    </p>

                    <h4 className="mt-1 text-2xl font-black text-foreground">
                      Microsoft · Tally · Security
                    </h4>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-foreground/60">
                  Keys and distributor invoices in one mail thread — we decline grey-market pricing that evaporates when you need vendor support.
                </p>
              </div>

              {/* <button className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-brand px-7 py-4 font-semibold text-white shadow-xl shadow-brand/25 transition-all duration-300 hover:scale-[1.02] hover:bg-brand-hover">
                Get Started

                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-sm transition-transform duration-300 group-hover:translate-x-1"
                />
              </button> */}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}