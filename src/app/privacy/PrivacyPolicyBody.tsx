"use client";

import { motion } from "framer-motion";

import { site } from "@/data/site";

const sections = [
  {
    title: "Information we collect",
    desc: "We may collect your name, email, phone, company, and project details when you call, email, use our contact form, or engage us for services.",
  },

  {
    title: "How we use information",
    desc: "Your information is used to respond to enquiries, prepare quotations, deliver and invoice services, and maintain support history for repeat visits.",
  },

  {
    title: "Data protection",
    desc: "We apply reasonable administrative and technical safeguards appropriate to a small IT practice — access on a need-to-know basis and secure storage of business correspondence.",
  },

  {
    title: "Third-party sharing",
    desc: "We do not sell personal data. We may share the minimum required with distributors, couriers, or payment processors strictly to fulfil an order you have placed with us.",
  },

  {
    title: "Cookies & analytics",
    desc: "Our website may use basic cookies or analytics to understand traffic patterns. You can control cookies through your browser settings.",
  },

  {
    title: "Policy updates",
    desc: "We may update this policy from time to time. The current version will always be published on this page — check the site periodically for changes.",
  },
];

export default function PrivacyPolicyBody() {
  return (
    <section className="relative overflow-hidden bg-section py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />

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
            How we handle
            <span className="text-brand"> your data</span>
          </h2>
          <p className="mt-3 text-base leading-relaxed text-foreground/70 md:text-lg">
            {site.brandName} treats contact and project information as confidential business correspondence. The summaries
            below explain typical practices for our Pune workshop and field teams.
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
              <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-transparent" />
              </div>

              <div className="relative">
                <div className="inline-flex rounded-lg border border-brand/20 bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
                  Topic
                </div>

                <h3 className="mt-4 text-xl font-bold text-foreground sm:text-2xl">{section.title}</h3>

                <p className="mt-4 leading-relaxed text-foreground/65">{section.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-20 overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-brand to-brand-deep p-8 shadow-xl shadow-brand/25 sm:p-10 lg:mt-24 lg:p-12"
        >
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <h3 className="text-2xl font-bold leading-tight text-white md:text-3xl">Questions about privacy?</h3>

            <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
              Email {site.email} or call {site.phoneLine} — we will route your request to the proprietor desk and respond on
              working days.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
