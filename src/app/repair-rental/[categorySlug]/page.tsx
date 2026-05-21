import {
  createServiceCategoryMetadata,
  createServiceCategoryPage,
} from "@/lib/serviceCategoryPage";
import { getServiceRouteByPath } from "@/data/serviceCatalogRoutes";

const SERVICE_PATH = "repair-rental";

export const generateMetadata = createServiceCategoryMetadata(SERVICE_PATH);

export async function generateStaticParams() {
  const route = getServiceRouteByPath(SERVICE_PATH);
  return (route?.catalog ?? []).map((category) => ({ categorySlug: category.slug }));
}

export default createServiceCategoryPage(SERVICE_PATH);
