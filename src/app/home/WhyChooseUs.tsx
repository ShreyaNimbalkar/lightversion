"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHandshake,
  faStar,
  faUser,
  faLightbulb,
  faChartLine,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { site } from "@/data/site";

type Reason = {
  id: string;
  icon: IconDefinition;
  title: string;
  description: string;
};

const reasons: Reason[] = [
  {
    id: "trust",
    icon: faHandshake,
    title: "Partnership",
    description:
      "Written estimates before billable labour, change notes when scope shifts, and GST-ready invoices your accounts desk can file without rework.",
  },
  {
    id: "quality",
    icon: faStar,
    title: "Proven delivery",
    description:
      "Serials where they matter, rack and cable photos on handover, and licence PDFs organised so audits are not a scavenger hunt.",
  },
  {
    id: "people",
    icon: faUser,
    title: "Same faces on site",
    description: `Workshop and field visits stay with familiar engineers under ${site.proprietor}'s bench — fewer re-explained problems every time we return.`,
  },
  {
    id: "ideas",
    icon: faLightbulb,
    title: "Practical design",
    description:
      "We size Wi‑Fi, storage, and CCTV for how your team actually works — not spec sheets that only look good on paper.",
  },
  {
    id: "growth",
    icon: faChartLine,
    title: "Scale with you",
    description:
      "From a single rack to multi-site VLANs and genuine volume licensing — paths that grow without constant rip-outs.",
  },
  {
    id: "craft",
    icon: faScrewdriverWrench,
    title: "Clean handover",
    description:
      "Labeled panels, short written summaries, and recovery basics explained before we close — so the next vendor is not guessing.",
  },
];

const stats = [
  { value: "1000", label: "Happy clients" },
  { value: String(new Date().getFullYear() - site.establishedYear), label: "Years in Pune" },
  { value: "500", label: "IT & network projects" },
  { value: "100", label: "CCTV & security installs" },
];

function StatPlus() {
  return (
    <sup className="ml-0.5 align-super text-lg font-bold text-accent sm:text-xl" aria-hidden>
      +
    </sup>
  );
}

export default function WhyChooseUs() {
  const [active, setActive] = useState(1);
  const ringRef = useRef<HTMLDivElement>(null);
  const [ringRadiusPx, setRingRadiusPx] = useState(128);

  useLayoutEffect(() => {
    const el = ringRef.current;
    if (!el) return;

    const update = () => {
      const side = el.clientWidth;
      // Orbit radius scales with the square — keeps nodes on the ring across breakpoints
      setRingRadiusPx(Math.round(Math.min(210, Math.max(88, side * 0.345))));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const nodes = useMemo(
    () =>
      reasons.map((_, i) => {
        const deg = -90 + i * (360 / reasons.length);
        const rad = (deg * Math.PI) / 180;
        return { x: Math.cos(rad), y: Math.sin(rad) };
      }),
    [],
  );

  const activeReason = reasons[active];

  return (
    <section className="relative overflow-hidden border-t border-foreground/10 bg-section py-20 text-foreground sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-brand/8 blur-3xl" />
        <div className="absolute left-0 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-lg border border-foreground/10 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-deep shadow-sm">
            Why {site.brandName}
          </div>

          <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
            Why choose
            <span className="text-brand"> us</span>
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 sm:text-base">
            Workshop on Sinhagad Road, walk-in at Navi Peth, and on-site visits across Pune &amp; PCMC — repairs, networking,
            CCTV, and genuine licences with paperwork your CA and IT lead can both use. Led by {site.proprietor} since{" "}
            {site.establishedYear}.
          </p>
        </div>

        <div className="relative mt-10 rounded-2xl border border-foreground/10 bg-card p-4 shadow-lg sm:mt-14 sm:p-6 md:p-8 lg:mt-16 lg:p-10">
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-[min(42%,20rem)] rounded-r-2xl opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M32 2l10 17h19l-15 11 6 19-20-12-20 12 6-19-15-11h19z' fill='none' stroke='%231a3a6b' stroke-width='1'/%3E%3C/svg%3E")`,
              backgroundSize: "64px 64px",
            }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            {/* Large circular selector */}
            <div className="relative mx-auto flex w-full justify-center lg:mx-0 lg:justify-start">
              <div
                ref={ringRef}
                className="relative aspect-square w-full max-w-[19rem] sm:max-w-[23rem] md:max-w-[27rem] lg:max-w-[31rem] xl:max-w-[34rem]"
              >
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-foreground/10 bg-section/60 shadow-inner"
                  style={{ width: "82%", height: "82%" }}
                />

                {reasons.map((reason, i) => {
                  const { x, y } = nodes[i];
                  const isActive = i === active;
                  return (
                    <button
                      key={reason.id}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-pressed={isActive}
                      aria-label={reason.title}
                      style={{
                        transform: `translate(calc(-50% + ${x * ringRadiusPx}px), calc(-50% + ${y * ringRadiusPx}px))`,
                      }}
                      className={`absolute left-1/2 top-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-md transition sm:h-14 sm:w-14 md:h-[3.75rem] md:w-[3.75rem] ${
                        isActive
                          ? "border-transparent bg-gradient-to-br from-brand to-brand-deep text-white ring-2 ring-brand/35 ring-offset-2 ring-offset-card"
                          : "border-foreground/10 bg-card text-brand hover:border-brand/30 hover:shadow-lg"
                      }`}
                    >
                      <FontAwesomeIcon icon={reason.icon} className="text-base sm:text-lg md:text-xl" />
                    </button>
                  );
                })}

                <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center p-6 sm:p-8 md:p-10">
                  <div className="pointer-events-auto max-w-[15rem] text-center sm:max-w-[17rem] md:max-w-[19rem]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeReason.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.24 }}
                      >
                        <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl md:text-2xl">
                          {activeReason.title}
                        </h3>
                        <p className="mt-3 text-xs leading-relaxed text-foreground/70 sm:text-sm md:text-[0.95rem]">
                          {activeReason.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats — same card language as AboutSection */}
            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 lg:max-w-xl lg:justify-self-end xl:max-w-none">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-foreground/10 bg-section/50 p-4 text-center shadow-sm transition-shadow hover:shadow-md sm:p-5 md:p-6"
                >
                  <p className="text-2xl font-bold tabular-nums tracking-tight text-brand sm:text-3xl md:text-4xl">
                    {s.value}
                    <StatPlus />
                  </p>
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/60 sm:text-xs">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
