"use client";

import Link from "next/link";

import { motion, Variants } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { site } from "@/data/site";
import { siteContent } from "@/data/siteContent";

import OverlapImageCard from "@/components/OverlapImageCard";

const services = siteContent.services.cards;

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 22, stiffness: 300 } },
};

function ServiceCardBlock({ service }: { service: (typeof services)[number] }) {
  return (
    <motion.div variants={item} className="h-full">
      <OverlapImageCard
        image={service.image}
        imageAlt={service.imageAlt}
        eyebrow={service.eyebrow}
        title={service.title}
        description={service.desc}
        footer={
          <Link
            href={service.link}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-brand/20 transition hover:bg-brand-hover"
          >
            View catalogue
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" aria-hidden />
          </Link>
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
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/8 blur-3xl" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            {siteContent.services.sectionTitle}
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {siteContent.services.sectionAccent}
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            {siteContent.services.sectionIntro}
          </p>
        </div>

        <motion.div
          className="mt-14 grid auto-rows-fr items-stretch gap-8 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6 2xl:gap-8"
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
