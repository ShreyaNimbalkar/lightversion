import AboutBody from "./AboutBody";
import AboutHeader from "./AboutHeader";

import { site } from "@/data/site";

export const metadata = {
  title: `About us — ${site.brandName}`,
  description: `${site.brandName} in Pune — laptop repair, networking, CCTV, and software licences since ${site.establishedYear}. Two shops, honest quotes, and a team you can call directly.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHeader />
      <AboutBody />
    </>
  );
}
