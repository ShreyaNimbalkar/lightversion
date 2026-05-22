import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductDetailNav from "@/app/products/[slug]/ProductDetailNav";
import ProductDetailSummary from "@/app/products/[slug]/ProductDetailSummary";
import ProductFeatureCards from "@/components/ProductFeatureCards";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";

import { getProductPageContent } from "@/data/productPageContent";
import { getServicePathForInterest } from "@/data/serviceCatalogRoutes";
import { getAllCatalogEntries, getProductBySlug, getRelatedCatalogItems } from "@/data/serviceProductLists";

function SpecCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.998-9.997 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.998 9.997 9.998 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.206 9.997-36.204-.001z" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllCatalogEntries().map(({ item }) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const found = getProductBySlug(slug);
  if (!found) {
    return { title: "Product" };
  }
  return {
    title: `${found.item.name} — ${found.categoryTitle}`,
    description: found.item.summary,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const found = getProductBySlug(slug);
  if (!found) {
    notFound();
  }

  const { item, categoryTitle, categorySlug } = found;
  const content = getProductPageContent(item, categoryTitle);
  const productLabel = `${categoryTitle}: ${item.name}`;
  const servicePath = getServicePathForInterest(item.defaultInterest);
  const related = getRelatedCatalogItems(slug, 4);
  const hasPlans = content.highlights.length > 0;

  return (
    <>
      <PageHero
        variant="immersive"
        accent="brand"
        title={item.name}
        description={item.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: item.defaultInterest, href: `/${servicePath}` },
          { label: categoryTitle, href: `/${servicePath}/${categorySlug}` },
          { label: item.name },
        ]}
      />

      <article className="bg-section text-foreground">
        <div className="page-container pb-16 pt-6 sm:pb-20 sm:pt-8">
          <ProductDetailSummary item={item} categoryTitle={categoryTitle} productLabel={productLabel} />

          <ProductDetailNav showPlans={hasPlans} showRelated={related.length > 0} />

          {/* 1 — Overview */}
          <PageSection id="overview" border="none" className="scroll-mt-28 !py-8 sm:scroll-mt-36 sm:!py-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-foreground/10 shadow-lg">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7">
                <h2 className="text-lg font-bold text-foreground sm:text-xl">Overview</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">{content.intro}</p>
              </div>
            </div>
          </PageSection>

          {/* 2 — Specifications */}
          <PageSection id="specifications" border="top" tone="muted" className="scroll-mt-28 !py-8 sm:scroll-mt-36 sm:!py-12">
            <SectionHeader
              align="left"
              eyebrow="Specifications"
              title="Key specifications"
              description="Typical inclusions for this line — your quote may add or adjust items based on site and quantity."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {content.specs.map((line) => (
                <li
                  key={line}
                  className="card-elevated flex gap-3 p-4 text-sm leading-relaxed text-foreground/85 sm:text-base"
                >
                  <SpecCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </PageSection>

          {/* 3 — Plans & pricing */}
          {hasPlans ? (
            <div id="plans" className="scroll-mt-28 border-t border-foreground/10 sm:scroll-mt-36">
              <PageSection border="none" className="!py-8 sm:!py-12">
                <ProductFeatureCards
                  productName={item.name}
                  defaultInterest={item.defaultInterest}
                  highlights={content.highlights}
                />
              </PageSection>
            </div>
          ) : null}

          {/* 4 — Related */}
          {related.length > 0 ? (
            <PageSection id="related" border="top" tone="muted" className="scroll-mt-28 !py-8 sm:scroll-mt-36 sm:!py-12">
              <SectionHeader
                align="left"
                eyebrow="Related"
                title="Similar products"
                description={
                  <>
                    More items in <span className="font-semibold text-foreground">{categoryTitle}</span> and related
                    lines — or{" "}
                    <Link href={`/${servicePath}/${categorySlug}`} className="font-semibold text-brand hover:underline">
                      browse the full {categoryTitle} category
                    </Link>
                    .
                  </>
                }
              />
              <ul className="mt-8 grid list-none gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {related.map(({ item: rel, categoryTitle: relCat }) => (
                  <li key={rel.slug}>
                    <Link
                      href={`/products/${rel.slug}`}
                      className="group card-elevated flex h-full flex-col overflow-hidden transition hover:border-brand/30"
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={rel.image}
                          alt={rel.imageAlt}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-[1.03]"
                          sizes="25vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-brand">{relCat}</p>
                        <p className="mt-1 text-xs font-semibold text-brand">{rel.priceFrom}</p>
                        <p className="mt-2 line-clamp-2 text-sm font-bold text-foreground">{rel.name}</p>
                        <span className="btn-link mt-auto pt-3 text-xs">View details →</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </PageSection>
          ) : null}
        </div>
      </article>
    </>
  );
}
