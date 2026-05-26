import { notFound } from "next/navigation";

import PageHero from "@/components/PageHero";
import ServiceCategoryProductList from "@/components/ServiceCategoryProductList";
import { getCategoryInCatalog } from "@/data/serviceProductLists";
import { getServiceRouteByPath } from "@/data/serviceCatalogRoutes";

type PageProps = {
  params: Promise<{ categorySlug: string }>;
};

export function createServiceCategoryPage(servicePath: string) {
  return async function ServiceCategoryPage({ params }: PageProps) {
    const { categorySlug } = await params;
    const route = getServiceRouteByPath(servicePath);
    if (!route) {
      notFound();
    }

    const category = getCategoryInCatalog(route.catalog, categorySlug);
    if (!category) {
      notFound();
    }

    return (
      <>
        <PageHero
          variant="compact"
          accent="brand"
          showEnquiryCta
          title={category.title}
          description={category.description ?? `Products and plans under ${route.label}.`}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: route.label, href: `/${servicePath}` },
            { label: category.title },
          ]}
        />
        <ServiceCategoryProductList category={category} serviceLabel={route.label} />
      </>
    );
  };
}

export function createServiceCategoryMetadata(servicePath: string) {
  return async function generateMetadata({ params }: PageProps) {
    const { categorySlug } = await params;
    const route = getServiceRouteByPath(servicePath);
    const category = route ? getCategoryInCatalog(route.catalog, categorySlug) : undefined;
    if (!category || !route) {
      return { title: "Category" };
    }
    return {
      title: `${category.title} — ${route.label}`,
      description: category.description,
    };
  };
}
