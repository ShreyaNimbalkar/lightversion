"use client";

import Image from "next/image";

import type { ReactNode } from "react";

type Props = {
  image: string;
  imageAlt: string;
  title: string;
  description?: ReactNode;
  footer: ReactNode;
  className?: string;
};

/**
 * Image on top + white panel overlapping the bottom (marketing card style).
 */
export default function OverlapImageCard({
  image,
  imageAlt,
  title,
  description,
  footer,
  className = "",
}: Props) {
  return (
    <article className={`group flex flex-col ${className}`}>
      <div className="relative shrink-0 overflow-hidden rounded-t-[1.65rem] sm:rounded-t-[1.85rem]">
        <div className="relative aspect-[4/3] w-full bg-surface-deep/10 sm:aspect-[4/2.8]">
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

      <div className="relative z-10 -mt-9 mx-1.5 flex flex-col rounded-xl border border-foreground/10 bg-card px-3.5 pb-3.5 pt-2.5 shadow-[0_18px_40px_-12px_rgba(30,42,59,0.25)] dark:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.45)] sm:-mt-12 sm:mx-3 sm:rounded-[1.35rem] sm:px-5 sm:pb-5 sm:pt-4">
        <h3 className="line-clamp-2 break-words text-sm font-bold leading-snug tracking-tight text-foreground sm:text-lg">
          {title}
        </h3>
        {description ? (
          <div className="mt-2 text-xs leading-relaxed text-foreground/65 sm:text-sm">{description}</div>
        ) : null}
        <div className="mt-3">{footer}</div>
      </div>
    </article>
  );
}
