"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

type Props = {
  items: string[];
  className?: string;
};

/** Checklist rows used in service-style heroes (matches PageServiceHero desktop column). */
export default function HeroChecklist({ items, className = "" }: Props) {
  return (
    <div className={`flex flex-col gap-3 sm:gap-4 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 rounded-2xl border border-foreground/10 bg-card px-4 py-3 shadow-sm sm:px-5 sm:py-4"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand sm:h-10 sm:w-10">
            <FontAwesomeIcon icon={faCheck} className="text-sm sm:text-base" />
          </div>

          <p className="min-w-0 text-sm font-semibold leading-snug text-foreground/80">{item}</p>
        </div>
      ))}
    </div>
  );
}
