"use client";

import Image from "next/image";

import type { ReactNode } from "react";

type Props = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  description?: string;
  footer: ReactNode;
  className?: string;
};

/**
 * Image on top + white panel overlapping the bottom (marketing card style).
 */
export default function OverlapImageCard({
  image,
  imageAlt,
  eyebrow,
  title,
  description,
  footer,
  className = "",
}: Props) {
  return (
    <article className={`group flex flex-col ${className}`}>
      <div className="relative overflow-hidden rounded-t-[1.65rem] sm:rounded-t-[1.85rem]">
        <div className="relative aspect-[4/3] w-full sm:aspect-[4/3.1]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/35 via-transparent to-transparent" />
        </div>
      </div>

        <div className="relative z-10 -mt-11 mx-2 rounded-2xl border border-foreground/10 bg-card px-4 pb-4 pt-3 shadow-[0_18px_40px_-12px_rgba(10,22,40,0.25)] dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] sm:-mt-12 sm:mx-3 sm:rounded-[1.35rem] sm:px-5 sm:pb-5 sm:pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-[11px]">{eyebrow}</p>
        <h3 className="mt-2 line-clamp-2 min-h-[2.5rem] break-words text-base font-bold leading-snug tracking-tight text-foreground sm:min-h-[3rem] sm:text-lg">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-foreground/65 sm:text-sm">{description}</p>
        ) : null}
        {footer}
      </div>
    </article>
  );
}
