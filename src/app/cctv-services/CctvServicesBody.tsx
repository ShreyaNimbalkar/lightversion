"use client";


import { motion } from "framer-motion";

import ServiceProductCatalog from "@/components/ServiceProductCatalog";

import { cctvCatalog } from "@/data/serviceProductLists";

export default function CctvServicesBody() {
  return (
    <>
      {/* <section className="relative overflow-hidden bg-section py-24 sm:py-28">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-7xl"
          >
            <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-5 py-2 text-sm font-semibold tracking-wide text-brand backdrop-blur-xl">
              CCTV & surveillance
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Surveillance systems
              <span className="text-brand"> you can defend in review</span>
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/70">
              IP cameras, recorders, and door-entry solutions specified for your site — with retention calculations, labelled
              cabling, and operator training included in our delivery scope.
            </p>
          </motion.div>
        </div>
      </section> */}

      <ServiceProductCatalog
        id="product-catalog"
        eyebrow="CCTV services"
        title={
          <>
            Product catalogue
            <span className="text-brand"> — all items</span>
          </>
        }
        subtitle="Cameras, recorders, door entry, and infrastructure — one list with pagination for larger catalogues."
        categories={cctvCatalog}
      />
    </>
  );
}
