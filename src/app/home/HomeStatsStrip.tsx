"use client";

import { siteContent } from "@/data/siteContent";

export default function HomeStatsStrip() {
  const { trustStats } = siteContent.hero;

  return (
    <section className="relative z-30 -mt-1 border-b border-foreground/10 bg-card">
      <div className="page-container">
        <div className="grid grid-cols-2 divide-x divide-y divide-foreground/10 sm:grid-cols-4 sm:divide-y-0">
          {trustStats.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center sm:px-6 sm:py-8">
              <p className="text-2xl font-bold tabular-nums text-brand sm:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs leading-snug text-foreground/60 sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
