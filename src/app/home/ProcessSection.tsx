"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faComments,
  faClipboardList,
  faLaptopCode,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";

const process = [
  {
    step: "01",
    title: "Assessment",
    icon: faComments,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Team discussion at a conference table",
    desc: "We capture symptoms, timeline, and business impact. On-site visits include power, cabling, and port checks before hardware is replaced.",
  },

  {
    step: "02",
    title: "Written scope",
    icon: faClipboardList,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Documents and laptop on a desk",
    desc: "Labour, materials, and licence line items are listed in plain language. If repair is uneconomical, we recommend alternatives in writing.",
  },

  {
    step: "03",
    title: "Delivery",
    icon: faLaptopCode,
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Technician working with cabling",
    desc: "Work is performed at your premises or our workshop as agreed. Cabling and rack changes are labelled and photographed for records.",
  },

  {
    step: "04",
    title: "Support",
    icon: faHeadset,
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Customer support professional with headset",
    desc: "AMC clients receive a dedicated escalation path. All jobs close with a short summary suitable for finance and internal IT files.",
  },
];

export default function ProcessSection() {
  return (
    <section className="relative overflow-hidden border-t border-foreground/10 bg-section py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            Service process
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From enquiry to sign-off
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            A single, repeatable path for every ticket — whether it is one access point or a full office rollout — so
            stakeholders always know what happens next.
          </p>
        </div>

        <div className="relative mt-14 lg:mt-16">
          <div className="absolute left-[8%] right-[8%] top-[118px] hidden h-0.5 bg-gradient-to-r from-brand/0 via-brand/30 to-brand/0 lg:block" />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.06, type: "spring", damping: 22, stiffness: 320 }}
                whileHover={{ y: -5 }}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-md transition-shadow hover:shadow-lg"
              >
                <div className="relative h-28 w-full shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/45 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-2xl font-bold tabular-nums text-white/90">
                    {item.step}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={item.icon} className="text-lg" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/70">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-foreground/55">
          Direct engineer access, realistic SLAs, and paperwork that still reads cleanly when finance audits the same quarter
          we installed your rack.
        </p>
      </div>
    </section>
  );
}
