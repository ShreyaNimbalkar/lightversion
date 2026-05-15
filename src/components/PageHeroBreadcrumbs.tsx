import { Fragment } from "react";

import Link from "next/link";

export type PageHeroBreadcrumb = { label: string; href?: string };

type PageHeroBreadcrumbsProps = {
  items: PageHeroBreadcrumb[];
  className?: string;
};

/** White bar breadcrumb row — Home > Services > Current page */
export default function PageHeroBreadcrumbs({ items, className = "" }: PageHeroBreadcrumbsProps) {
  return (
    <div className={`border-b border-foreground/10 bg-card ${className}`.trim()}>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-2 gap-y-1 px-4 py-3 text-xs sm:px-6 sm:text-sm lg:px-8"
      >
        {items.map((crumb, i) => (
          <Fragment key={`${crumb.label}-${i}`}>
            {i > 0 ? (
              <span className="select-none font-medium text-foreground/35" aria-hidden>
                &gt;
              </span>
            ) : null}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="font-medium text-[#3d5a80] transition hover:text-brand dark:text-accent"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#2c3e58] dark:text-foreground">{crumb.label}</span>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
