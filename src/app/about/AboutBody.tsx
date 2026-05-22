"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCheck,
  faLocationDot,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import SectorsSection from "@/components/SectorsSection";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { site } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const yearsServing = new Date().getFullYear() - site.establishedYear;

const stats = [
  { value: yearsServing, suffix: "+", label: `Years in Pune (since ${site.establishedYear})` },
  { value: 1000, suffix: "+", label: "Happy customers" },
  { value: 2, suffix: "", label: "Shops — Manikbaug & Navi Peth" },
  { value: 24, suffix: " hr", label: "Typical reply (working days)" },
];

const principles = [
  "Written estimate before billable work",
  "Two Pune locations — workshop and walk-in counter",
  "Genuine software with GST documentation",
  "You speak with the team who does the job",
];

export default function AboutBody() {
  return (
    <>
      {/* Stats */}
      <section className="border-b border-foreground/10 bg-card">
        <div className="page-container">
          <div className="grid grid-cols-2 gap-px bg-foreground/10 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-card px-3 py-6 text-center sm:px-4 sm:py-9"
              >
                <p className="text-xl font-bold tabular-nums text-brand sm:text-3xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1.5 max-w-[9.5rem] text-[10px] font-medium leading-snug text-foreground/65 sm:max-w-[11rem] sm:text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <PageSection border="none" className="!pt-10 !pb-10 sm:!py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-foreground/10 shadow-lg">
              <Image
                src="/header.jpg"
                alt={`${site.brandName} workshop`}
                width={1200}
                height={800}
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 sm:-bottom-5 sm:left-6 sm:right-auto sm:max-w-[260px]">
              <div className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-card p-4 shadow-lg">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand text-white">
                  <FontAwesomeIcon icon={faUserTie} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand">Proprietor</p>
                  <p className="font-bold text-foreground">{site.proprietor}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Our story"
              title={
                <>
                  A Pune business
                  <span className="text-brand"> you can trust</span>
                </>
              }
              description={siteContent.about.storyLead}
            />
            <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
              {siteContent.about.storyDetail}
            </p>
            <ul className="mt-6 space-y-2.5">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            {/* <Link
              href="/#services"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:gap-3"
            >
              View our services
              <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link> */}
          </div>
        </div>
      </PageSection>

      <SectorsSection />

      {/* Locations */}
      <PageSection id="locations" border="top" tone="muted" className="scroll-mt-24">
        <SectionHeader
          align="left"
          eyebrow="Visit us"
          title="Two Pune locations"
          description={`${site.workingHours} · Repairs and workshop at Manikbaug · Sales and walk-in at Navi Peth.`}
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {site.locations.map((loc) => (
            <article key={loc.label} className="card-elevated p-6 sm:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                <FontAwesomeIcon icon={faLocationDot} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{loc.label}</h3>
              <address className="mt-2 space-y-0.5 text-sm not-italic text-foreground/70">
                {loc.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-link mt-4"
              >
                Open in Maps
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-foreground/65">
          Prefer a form?{" "}
          <Link href="/contact" className="font-semibold text-brand hover:underline">
            Go to Contact us
          </Link>{" "}
          for phone, email, and the enquiry form.
        </p>
      </PageSection>
    </>
  );
}
