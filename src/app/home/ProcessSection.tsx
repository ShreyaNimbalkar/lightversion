"use client";

import { motion } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faClipboardList,
  faLaptopCode,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const steps: {
  step: string;
  title: string;
  desc: string;
  icon: IconDefinition;
  enquiry: string;
}[] = [
  {
    step: "01",
    title: "Tell us the problem",
    desc: "Call, visit, or request a quote — we note symptoms, site, and timeline.",
    icon: faComments,
    enquiry: "Process — Assessment",
  },
  {
    step: "02",
    title: "Written estimate",
    desc: "Parts, labour, and licences listed clearly before work begins.",
    icon: faClipboardList,
    enquiry: "Process — Written scope",
  },
  {
    step: "03",
    title: "We deliver",
    desc: "Workshop repair or on-site install with handover notes.",
    icon: faLaptopCode,
    enquiry: "Process — Delivery",
  },
  {
    step: "04",
    title: "Stay supported",
    desc: "GST invoice, records for renewals, and AMC when you need it.",
    icon: faHeadset,
    enquiry: "Process — Support",
  },
];

export default function ProcessSection() {
  const { openEnquiry } = useEnquiryModal();

  return (
    <PageSection id="how-it-works" border="top">
      <SectionHeader
        eyebrow="How it works"
        title="Four steps — same for every job"
        description="Tap a step to open the enquiry form with that stage pre-selected."
      />

      <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {steps.map((item, index) => (
          <motion.button
            key={item.step}
            type="button"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            onClick={() => openEnquiry(item.enquiry)}
            className="card-elevated flex w-full flex-col p-5 text-left transition hover:border-brand/30 hover:shadow-md"
          >
            <span className="text-xs font-bold tabular-nums text-brand">{item.step}</span>
            <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <h3 className="mt-4 text-base font-bold text-foreground">{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/65">{item.desc}</p>
            <span className="mt-4 text-xs font-semibold text-brand">Start here →</span>
          </motion.button>
        ))}
      </div>
    </PageSection>
  );
}
