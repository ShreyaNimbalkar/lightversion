"use client";

import { motion } from "framer-motion";

import { site } from "@/data/site";

const sections = [
  {
    title: "Acceptance of Terms",
    desc: "By accessing and using our website or services, you agree to comply with these terms and conditions.",
  },

  {
    title: "Services & Solutions",
    desc: "We provide IT infrastructure, networking, software licensing, CCTV, and related technology services based on client requirements.",
  },

  {
    title: "User Responsibilities",
    desc: "Users are responsible for providing accurate information and using our services in compliance with applicable laws and regulations.",
  },

  {
    title: "Payments & Billing",
    desc: "All payments for products and services must be completed as agreed in quotations, invoices, or service agreements.",
  },

  {
    title: "Intellectual Property",
    desc: "All website content, branding, graphics, and service materials are protected and may not be copied without permission.",
  },

  {
    title: "Limitation of Liability",
    desc: "We are not liable for indirect damages, business interruptions, or losses arising from service misuse or external factors.",
  },

  {
    title: "Termination of Services",
    desc: "We reserve the right to suspend or terminate services in cases of policy violations or misuse of our services.",
  },

  {
    title: "Policy Updates",
    desc: "These terms and conditions may be updated periodically. Continued use of our services indicates acceptance of updated policies.",
  },
];

export default function TermsConditionsBody() {
  return (
    <section className="relative overflow-hidden bg-section py-28">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-brand/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
            In plain language
            <span className="text-brand"> for clients</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/70 md:text-lg">
            The sections below summarise how {site.brandName} engages for IT hardware, services, and software licensing in
            India. For a formal engagement, a written quotation or work order prevails where it adds detail.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand/25 hover:shadow-lg sm:p-8"
            >
              {/* HOVER EFFECT */}
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
              </div>

              <div className="relative">
                <div className="inline-flex rounded-lg border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
                  Clause
                </div>

                <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">
                  {section.title}
                </h3>

                <p className="mt-5 leading-relaxed text-foreground/65">
                  {section.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-20 overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-brand to-brand-deep p-8 shadow-xl shadow-brand/25 sm:p-10 lg:mt-24 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">
              Reliable business &amp; technology standards
            </h3>

            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Our terms are designed for transparent relationships with every Pune client we serve — workshop, on-site, or
              licence desk. Questions? Email {site.email} or call {site.phoneLine}.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}