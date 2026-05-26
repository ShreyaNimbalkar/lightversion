"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export type CatalogCardProps = {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  featureBadges: string[];
  href: string;
};

export default function CatalogCard({
  image,
  imageAlt,
  title,
  description,
  featureBadges,
  href,
}: CatalogCardProps) {
  return (
    <article className="card-elevated flex h-full flex-col overflow-hidden transition hover:border-brand/25 hover:shadow-lg">
      <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-foreground/10 sm:h-48">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/20 via-transparent to-transparent" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5">
  <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground">
    {title}
  </h3>

  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground/65">
    {description}
  </p>

  {featureBadges.length > 0 ? (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {featureBadges.map((badge) => (
        <li
          key={badge}
          title={badge}
          className="max-w-full truncate rounded-xl border border-brand/20 bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-brand"
        >
          {badge}
        </li>
      ))}
    </ul>
  ) : null}
</div>

      <div className="shrink-0 border-t border-foreground/10 p-4">
        <Link
          href={href}
          className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-foreground/12 bg-section text-sm font-semibold text-foreground transition hover:border-brand/35 hover:text-brand"
        >
          Know More
          <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
        </Link>
      </div>
    </article>
  );
}
