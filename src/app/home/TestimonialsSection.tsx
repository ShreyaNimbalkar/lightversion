"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faQuoteLeft,
  faStar,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { site } from "@/data/site";

const testimonials = [
  {
    name: "Rajesh S.",
    company: "Regional distributor, Pune",
    text: "Wi‑Fi survey and AP placement were agreed in writing before installation. Professional documentation throughout.",
  },

  {
    name: "Priya M.",
    company: "CA firm, 12 seats",
    text: "Tally and Microsoft renewals handled with formal invoices and email trail suitable for our compliance review.",
  },

  {
    name: "Amit V.",
    company: "Retail chain outlet",
    text: "Critical POS hardware restored within agreed timelines. Clear communication on parts used and labour charges.",
  },

  {
    name: "Neha K.",
    company: "Clinic administration",
    text: "CCTV upgrade planned around patient hours. Cable routes and NVR configuration documented for our records.",
  },

  {
    name: "Karan P.",
    company: "Manufacturing office",
    text: "Structured cabling coordinated with our electrical contractor. Neat rack work and port mapping provided at handover.",
  },

  {
    name: "Sneha J.",
    company: "Co-working operator",
    text: "Guest network segmentation completed with VLAN documentation we could share with our security consultant.",
  },
];

export default function TestimonialsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;

  const nextSlide = () => {
    if (startIndex + visibleCards < testimonials.length) setStartIndex(startIndex + 1);
  };

  const prevSlide = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + visibleCards);

  return (
    <section className="relative overflow-hidden border-t border-foreground/10 bg-section py-24 text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
            Client references
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Feedback from
            <span className="text-brand"> verified engagements</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            Summarised client feedback. Sector-specific references are available on
            request during the quotation stage.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={prevSlide}
            disabled={startIndex === 0}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-foreground/15 bg-card text-foreground transition-colors duration-200 hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Previous testimonials"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            disabled={startIndex + visibleCards >= testimonials.length}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white transition-colors duration-200 hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Next testimonials"
          >
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </button>
        </div>

        <div key={startIndex} className="mt-8 grid animate-fade-in gap-6 lg:grid-cols-3">
          {visibleTestimonials.map((item, index) => (
            <article
              key={`${item.name}-${index}`}
              className="flex min-h-[280px] flex-col rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-brand">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-sm" />
                </div>
                <div className="flex gap-0.5 text-brand" aria-hidden>
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                  ))}
                </div>
              </div>

              <p className="mt-6 flex-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                “{item.text}”
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-foreground/10 pt-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-foreground/55">{item.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {Array.from({ length: testimonials.length - visibleCards + 1 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setStartIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                startIndex === index ? "w-8 bg-brand" : "w-1.5 bg-foreground/20 hover:bg-foreground/35"
              }`}
              aria-label={`Go to testimonial page ${index + 1}`}
            />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-foreground/55">
          {site.brandName} does not pay for review copy. Where something goes wrong, we document the fix under the same ticket
          number so your team has a single thread to follow.
        </p>
      </div>
    </section>
  );
}
