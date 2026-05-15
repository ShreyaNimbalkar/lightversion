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
    <article className={`group flex h-full min-h-0 flex-col ${className}`}>
      <div className="relative shrink-0 overflow-hidden rounded-t-[1.65rem] sm:rounded-t-[1.85rem]">
        <div className="relative aspect-[4/3] w-full bg-surface-deep/10 sm:aspect-[4/3.1]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/35 via-transparent to-transparent" />
        </div>
      </div>

      <div className="relative z-10 -mt-11 mx-2 flex min-h-0 flex-1 flex-col rounded-2xl border border-foreground/10 bg-card px-4 pb-4 pt-3 shadow-[0_18px_40px_-12px_rgba(30,42,59,0.25)] dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] sm:-mt-12 sm:mx-3 sm:rounded-[1.35rem] sm:px-5 sm:pb-5 sm:pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand sm:text-[11px]">{eyebrow}</p>
        <h3 className="mt-2 line-clamp-2 min-h-[2.5rem] break-words text-base font-bold leading-snug tracking-tight text-foreground sm:min-h-[2.75rem] sm:text-lg">
          {title}
        </h3>
        {description ? (
          <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-xs leading-relaxed text-foreground/65 sm:min-h-[4rem] sm:text-sm">
            {description}
          </p>
        ) : (
          <div className="mt-2 min-h-[3.75rem] sm:min-h-[4rem]" aria-hidden />
        )}
        <div className="mt-auto pt-4">{footer}</div>
      </div>
    </article>
  );
}
