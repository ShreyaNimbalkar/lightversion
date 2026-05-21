import { Fragment } from "react";

import Link from "next/link";

export type PageHeroBreadcrumb = { label: string; href?: string };

type PageHeroBreadcrumbsProps = {
  items: PageHeroBreadcrumb[];
  className?: string;
  /** No card bar — for editorial heroes */
  bare?: boolean;
};

/** White bar breadcrumb row — Home > Services > Current page */
export default function PageHeroBreadcrumbs({ items, className = "", bare = false }: PageHeroBreadcrumbsProps) {
  return (
    <div
      className={
        bare
          ? className
          : `border-b border-foreground/10 bg-card ${className}`.trim()
      }
    >
      <nav
        aria-label="Breadcrumb"
        className="scroll-x-touch mx-auto flex max-w-7xl items-center gap-x-2 whitespace-nowrap px-4 py-2.5 text-[11px] sm:flex-wrap sm:whitespace-normal sm:px-6 sm:py-3 sm:text-sm lg:px-8"
      >
        {items.map((crumb, i) => (
          <Fragment key={`${crumb.label}-${i}`}>
            {i > 0 ? (
              <span className="shrink-0 select-none font-medium text-foreground/35" aria-hidden>
                &gt;
              </span>
            ) : null}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="shrink-0 font-medium text-brand-deep/80 transition hover:text-brand sm:max-w-none"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="max-w-[min(12rem,45vw)] truncate font-semibold text-foreground sm:max-w-none sm:whitespace-normal">
                {crumb.label}
              </span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
