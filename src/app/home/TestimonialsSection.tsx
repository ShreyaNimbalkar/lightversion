"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faStar } from "@fortawesome/free-solid-svg-icons";

import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

const testimonials = [
  {
    name: "Rajesh S.",
    company: "Regional distributor, Pune",
    text: "Wi‑Fi survey and AP placement agreed in writing before installation.",
  },
  {
    name: "Priya M.",
    company: "CA firm, 12 seats",
    text: "Tally and Microsoft renewals with formal invoices for compliance.",
  },
  {
    name: "Neha K.",
    company: "Clinic administration",
    text: "CCTV upgrade planned around patient hours with documented handover.",
  },
];

export default function TestimonialsSection() {
  return (
    <PageSection border="top">
      <SectionHeader
        eyebrow="Client feedback"
        title="Trusted by Pune businesses"
        description="Summarised references — sector-specific details available when you request a quote."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="card-elevated flex flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <FontAwesomeIcon icon={faQuoteLeft} className="text-sm" />
              </div>
              <div className="flex gap-0.5 text-brand" aria-hidden>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} className="text-[10px]" />
                ))}
              </div>
            </div>
            <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">"{item.text}"</p>
            <div className="mt-5 border-t border-foreground/10 pt-4">
              <p className="text-sm font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-foreground/55">{item.company}</p>
            </div>
          </article>
        ))}
      </div>
    </PageSection>
  );
}
