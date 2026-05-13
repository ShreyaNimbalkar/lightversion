"use client";

import Link from "next/link";

import { motion, Variants } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { site } from "@/data/site";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import OverlapImageCard from "@/components/OverlapImageCard";

const services = [
  {
    title: "Repair & rental",
    eyebrow: "Workshop & field",
    desc: "Laptop and desktop diagnosis, parts replacement, loan units, and workshop turnaround with clear ticket notes.",
    link: "/repair-rental",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Technician servicing laptop hardware",
    enquiryInterest: "Repair & rental" as const,
    enquiryContext: "Home — Repair & rental services",
  },
  {
    title: "Networking & cabling",
    eyebrow: "Infrastructure",
    desc: "Structured cabling, Wi‑Fi, switching, CCTV, and PBX — documented for handover and audit.",
    link: "/networking",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Network cabling and server environment",
    enquiryInterest: "Networking & cabling" as const,
    enquiryContext: "Home — Networking & cabling",
  },
  {
    title: "Software licences",
    eyebrow: "Authorised SKUs",
    desc: "Windows, Microsoft 365, Tally, and security software through authorised channels with GST-ready paperwork.",
    link: "/licenses",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    imageAlt: "Business professionals reviewing documents with a laptop",
    enquiryInterest: "Software licences" as const,
    enquiryContext: "Home — Software licences",
  },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 22, stiffness: 300 } },
};

function ServiceCardBlock({
  service,
}: {
  service: (typeof services)[number];
}) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <motion.div variants={item} className="h-full">
      <OverlapImageCard
        image={service.image}
        imageAlt={service.imageAlt}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.desc}
        footer={
          <div className="mt-4 flex flex-col gap-2.5">
            {/* <button
              type="button"
              onClick={() => openEnquiry(`${service.enquiryContext} — enquiry`, service.enquiryInterest)}
              className="w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover"
            >
              Enquiry
            </button> */}
            <Link
              href={service.link}
              className="w-full rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover"
            >
              View product list
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        }
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden border-t border-foreground/10 bg-section py-20 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            Core services
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            How we support
            <span className="text-brand"> your operations</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            Three delivery lines — each with written scope, GST-ready billing, and engineers who stay on your ticket through
            sign-off. Detailed product lists live on the matching service page. {site.brandName} has served Pune since{" "}
            {site.establishedYear}.
          </p>
        </div>

        <motion.div
          className="mt-14 grid gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => (
            <ServiceCardBlock key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
