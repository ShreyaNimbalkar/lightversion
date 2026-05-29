"use client";

/** Category cards on main service landing pages only (e.g. /repair-rental). */

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

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
    <article className="card-elevated group relative flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card transition-all duration-500 hover:-translate-y-1.5 hover:border-brand/25 hover:shadow-2xl">
      
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-brand/5 blur-3xl" />
      </div>

      {/* IMAGE SECTION — kept same structure */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden border-b border-foreground/10 sm:h-48">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center transition duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/40 via-surface-deep/5 to-transparent" />

        {/* Floating Badge */}
        {/* {featureBadges.length > 0 ? (
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-surface-deep/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-[9px] text-brand-light"
              />
              Featured
            </span>
          </div>
        ) : null} */}
      </div>

      {/* CONTENT */}
      <div className="relative flex min-h-0 flex-1 flex-col p-5">
        
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/65">
          {description}
        </p>

        {/* Badges */}
        {featureBadges.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {featureBadges.slice(0, 4).map((badge) => (
              <li
                key={badge}
                title={badge}
                className="inline-flex items-center gap-1 rounded-full border border-brand/15 bg-brand/8 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand transition-all duration-300 hover:border-brand/30 hover:bg-brand/15"
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-[8px]"
                />
                <span className="truncate">{badge}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* CTA */}
      <div className="shrink-0 border-t border-foreground/10 p-4">
        <Link
          href={href}
          className="btn-primary group/btn w-full"
        >
          Know More

          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}