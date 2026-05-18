import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CatalogIcon from "@/components/CatalogIcon";
import ProductDetailActions from "@/app/products/[slug]/ProductDetailActions";
import PageServiceHero from "@/components/PageServiceHero";

import { getProductPageContent } from "@/data/productPageContent";
import { getAllCatalogEntries, getProductBySlug, getRelatedCatalogItems } from "@/data/serviceProductLists";

import { site } from "@/data/site";

function SpecCheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="currentColor" aria-hidden>
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.998-9.997 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.998 9.997 9.998 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.206 9.997-36.204-.001z" />
    </svg>
  );
}

/** Turn highlight copy into centred “spec line” rows like a rental menu card. */
function highlightFeatureLines(body: string): string[] {
  const sentences = body
    .split(/\.\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : `${s}.`));
  if (sentences.length >= 2) {
    return sentences;
  }
  const clauses = body
    .split(/[,;]\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (clauses.length >= 2) {
    return clauses;
  }
  return [body.trim()].filter(Boolean);
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
    title: `${found.item.name} — product details`,
    description: found.item.summary,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const found = getProductBySlug(slug);
  if (!found) {
    notFound();
  }

  const { item, categoryTitle } = found;
  const content = getProductPageContent(item);
  const productLabel = `${categoryTitle}: ${item.name}`;
  const related = getRelatedCatalogItems(slug, 4);
  const heroDescription =
    item.summary ??
    `Supply, sizing, and support from ${site.brandName} — structured like a product sheet so procurement and IT see the same facts.`;

  return (
    <>
      <PageServiceHero
        title={item.name}
        description={heroDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/#services" },
          { label: item.name },
        ]}
      />

      <article className="relative min-w-0 overflow-hidden bg-section pb-16 pt-10 text-foreground sm:pb-20 sm:pt-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
          {categoryTitle}
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-card shadow-lg">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <section className="rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand">
                  <CatalogIcon iconKey={item.iconKey} className="text-lg" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground sm:text-xl">Key specifications</h2>
                  <p className="text-sm text-foreground/60">Typical delivery checklist — final scope is confirmed on quote.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3.5">
                {content.specs.map((line) => (
                  <li key={line} className="flex gap-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    <SpecCheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-foreground/10 bg-card/80 p-6 backdrop-blur-sm sm:p-8">
              <h2 className="text-lg font-bold text-foreground sm:text-xl">Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75 sm:text-base">{content.intro}</p>
            </section>
          </div>
        </div>

        <section className="mt-14 sm:mt-16" aria-labelledby="service-feature-cards-heading">
          <h2 id="service-feature-cards-heading" className="sr-only">
            Service feature highlights
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {content.highlights.map((card) => {
              const lines = highlightFeatureLines(card.body);
              return (
                <div
                  key={card.title}
                  className="flex min-h-full flex-col overflow-hidden border border-foreground/10 bg-card shadow-md"
                >
                  <div className="h-2 shrink-0 bg-surface-nav" aria-hidden />
                  <div className="relative flex flex-1 flex-col px-5 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent opacity-80"
                      aria-hidden
                    />
                    <h3 className="relative text-center text-lg font-bold leading-snug text-surface-nav sm:text-xl">
                      {card.title}
                    </h3>
                    <ul className="relative mt-6 divide-y divide-brand/25 border-y border-brand/20">
                      {lines.map((line) => (
                        <li
                          key={line}
                          className="px-1 py-3 text-center text-sm leading-relaxed text-foreground/85 sm:py-3.5 sm:text-[0.9375rem]"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                    <div className="relative mt-7 flex justify-center">
                      <Link
                        href="/contact"
                        className="inline-flex min-h-[2.75rem] items-center justify-center border-2 border-brand bg-transparent px-6 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-brand transition hover:bg-brand/10 sm:px-8"
                      >
                        Request a quote
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mt-14 border-t border-foreground/10 pt-12 sm:mt-16 sm:pt-14" aria-labelledby="related-products-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 id="related-products-heading" className="text-2xl font-bold text-foreground sm:text-3xl">
                Related products
              </h2>
              <p className="max-w-xl text-sm text-foreground/65">
                Same category first, then other lines that share your enquiry route — quick jumps without returning to the full
                catalogue.
              </p>
            </div>

            <ul className="mt-8 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {related.map(({ item: rel, categoryTitle: relCat }) => (
                <li key={rel.slug} className="min-w-0">
                  <Link
                    href={`/products/${rel.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-card shadow-sm transition hover:border-brand/30 hover:shadow-md"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-deep/30 via-transparent to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand sm:text-[11px]">{relCat}</p>
                      <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-foreground sm:text-base">{rel.name}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand transition group-hover:gap-2">
                        View details
                        <span aria-hidden className="translate-y-px">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-14 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-card to-card p-6 shadow-lg sm:mt-16 sm:p-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Next step</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
            Send a SKU‑level enquiry, ask for a bundled quotation, or speak with the team — reference{" "}
            <span className="font-semibold text-foreground">{item.name}</span> so routing stays fast.
          </p>
          <div className="mt-6 max-w-xl">
            <ProductDetailActions item={item} productLabel={productLabel} />
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
