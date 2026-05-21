"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { sectorsServed } from "@/data/sectors";
import { site } from "@/data/site";

type Props = {
  variant?: "about" | "standalone";
};

export default function SectorsSection({ variant = "about" }: Props) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <PageSection border="top" tone="muted">
      <SectionHeader
        eyebrow="Sectors served"
        title={
          <>
            Who we work with in
            <span className="text-brand"> Pune &amp; PCMC</span>
          </>
        }
        description={`Since ${site.establishedYear}, ${site.brandName} has supported 1,000+ customers across these sectors — with written scope, GST-ready quotes, and direct engineer access.`}
      />

      <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {sectorsServed.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.05, duration: 0.45 }}
            whileHover={{ y: -4 }}
            className="group card-elevated flex flex-col overflow-hidden transition hover:border-brand/25 hover:shadow-lg"
          >
            <div className="relative h-40 w-full shrink-0 overflow-hidden border-b border-foreground/10">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/40 to-transparent" />
              <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-surface-deep/80 text-accent">
                <FontAwesomeIcon icon={item.icon} />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/70">{item.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {item.services.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-foreground/10 bg-section px-2.5 py-0.5 text-[11px] font-medium text-foreground/65"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {/* <button
                type="button"
                onClick={() => openEnquiry(item.enquiryContext, item.defaultInterest)}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand/30 bg-brand/5 py-2.5 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white"
              >
                Discuss your {item.title.toLowerCase()} project
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button> */}
            </div>
          </motion.article>
        ))}
      </div>
    </PageSection>
  );
}
