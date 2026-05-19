"use client";


import { motion } from "framer-motion";

import ServiceProductCatalog from "@/components/ServiceProductCatalog";

import { wfhCatalog } from "@/data/serviceProductLists";

export default function WfhServiceBody() {
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
            className="max-w-3xl"
          >
            <div className="inline-flex items-center rounded-full border border-brand/25 bg-brand/10 px-5 py-2 text-sm font-semibold tracking-wide text-brand backdrop-blur-xl">
              Work from home
            </div>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Home-office deployments
              <span className="text-brand"> at scale</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-foreground/70">
              Equip individuals or entire departments with matched hardware, secure connectivity, and collaboration
              accessories — available on rental or purchase with GST-compliant invoicing.
            </p>
          </motion.div>
        </div>
      </section> */}

      <ServiceProductCatalog
        id="product-catalog"
        eyebrow="WFH service"
        title={
          <>
            Product catalogue
            <span className="text-brand"> — all items</span>
          </>
        }
        subtitle="Remote-work laptops, connectivity, and collaboration gear in a single grid."
        categories={wfhCatalog}
      />
    </>
  );
}
