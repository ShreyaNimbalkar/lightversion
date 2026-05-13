"use client";

import Image from "next/image";

import { AnimatedCounter } from "@/components/ui/animated-counter";

import { site } from "@/data/site";

export default function AboutSection() {
  const yearsServing = new Date().getFullYear() - site.establishedYear;

  const features = [
    "Plain-language options before we touch your hardware or your LAN",
    "Common laptop and desktop parts stocked to shorten workshop turnaround",
    "Site photos and port notes bundled with cabling and CCTV handovers",
    "Software keys and renewals only through channels that issue proper tax paperwork",
  ];

  const stats: (
    | { kind: "count"; value: number; suffix: string; label: string }
    | { kind: "text"; headline: string; label: string }
  )[] = [
    {
      kind: "count",
      value: yearsServing,
      suffix: "+",
      label: `Years serving Pune & PCMC (since ${site.establishedYear})`,
    },
    {
      kind: "count",
      value: 1000,
      suffix: "+",
      label: "Relationships built — from single laptops to multi-floor offices",
    },
    {
      kind: "count",
      value: 24,
      suffix: " hr",
      label: "Typical callback window on working days once we have your brief",
    },
    {
      kind: "text",
      headline: "Yes",
      label: "Written estimate before billable labour or cable pulls begin",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-foreground/10 bg-section py-20 text-foreground sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Professional team collaborating in an office setting"
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-[320px] w-full object-cover sm:h-[440px] lg:h-[520px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-deep/40 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-4 left-4 max-w-[240px] rounded-xl border border-foreground/10 bg-card p-4 shadow-lg sm:bottom-6 sm:left-6">
              <h3 className="text-2xl font-bold tabular-nums text-brand">
                <AnimatedCounter value={yearsServing} suffix="+" />
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground/70">
                Years at this bench — same proprietor-led team your neighbours have called since {site.establishedYear}.
              </p>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep">
              About {site.brandName}
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
              A Pune IT partner
              <span className="mt-1 block text-brand">that still answers the phone</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-foreground/70 sm:text-lg">
              {site.brandName} is led by {site.proprietor}. We combine a workshop on Sinhagad Road with a Navi Peth counter for
              walk-ins and parts pickup. Whether you need a board-level laptop repair, a rental while procurement catches up, or
              a documented Wi‑Fi rollout, you get itemised paperwork your CA and your IT lead can both live with.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-foreground/10 bg-card p-4 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <p className="text-sm leading-snug text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-foreground/10 bg-card p-5 text-center shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6"
            >
              <h3 className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">
                {item.kind === "count" ? (
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                ) : (
                  <span>{item.headline}</span>
                )}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-foreground/65 sm:text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
