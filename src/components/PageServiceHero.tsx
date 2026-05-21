"use client";

import PageHero, { PAGE_HERO_BACKGROUND, type PageHeroBreadcrumb } from "@/components/PageHero";

export type { PageHeroBreadcrumb as PageServiceHeroBreadcrumb };
export { PAGE_HERO_BACKGROUND };

export type PageServiceHeroProps = {
  title: string;
  description: string;
  breadcrumbs: PageHeroBreadcrumb[];
  backgroundImage?: string;
  variant?: "immersive" | "compact";
  accent?: "brand" | "sky" | "slate";
  showEnquiryCta?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function PageServiceHero({
  variant = "immersive",
  accent = "brand",
  showEnquiryCta = true,
  ...props
}: PageServiceHeroProps) {
  return <PageHero variant={variant} accent={accent} showEnquiryCta={showEnquiryCta} {...props} />;
}
