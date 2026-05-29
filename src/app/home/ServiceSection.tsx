"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faHouseLaptop,
  faKey,
  faNetworkWired,
  faScrewdriverWrench,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { siteContent } from "@/data/siteContent";

const services = siteContent.services.cards;

const SERVICE_ICONS: Record<string, IconDefinition> = {
  "/repair-rental": faScrewdriverWrench,
  "/networking": faNetworkWired,
  "/cctv-services": faVideo,
  "/wfh-service": faHouseLaptop,
  "/licenses": faKey,
};

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const icon =
    SERVICE_ICONS[service.link] ?? faScrewdriverWrench;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-slate-200/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand/20 hover:shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="20vw"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

        {/* ICON */}
        <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-md">
          <FontAwesomeIcon icon={icon} className="text-sm" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[1.05rem] font-bold leading-snug tracking-tight text-slate-900">
          {service.title}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
          {service.desc}
        </p>

        {/* BUTTON */}
        <Link
          href={service.link}
          className="group/btn mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-hover"
        >
          Know More

          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-[11px] transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export default function ServicesSection() {
  const {
    sectionTitle,
    sectionAccent,
    sectionIntro,
  } = siteContent.services;

  return (
    <PageSection
      id="services"
      border="top"
      className="!overflow-visible !py-16 sm:!py-20"
    >
      {/* HEADER */}
      <SectionHeader
        eyebrow="Our services"
        title={
          <>
            {sectionTitle}{" "}
            <span className="text-brand">
              {sectionAccent}
            </span>
          </>
        }
        description={sectionIntro}
      />

      {/* SERVICES GRID */}
      <div className="mt-12">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => (
            <ServiceCard
              key={service.link}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
}