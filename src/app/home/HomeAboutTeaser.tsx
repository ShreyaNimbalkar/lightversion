"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";

import PageSection from "@/components/ui/PageSection";
import SectionHeader from "@/components/ui/SectionHeader";
import { site } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const highlights = siteContent.about.features.slice(0, 3);

export default function HomeAboutTeaser() {
  return (
    <PageSection border="top" tone="muted">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl border border-foreground/10 shadow-lg"
        >
          <Image
            src="/images/services/header.jpg"
            alt={`${site.brandName} workshop`}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>

        <div>
          <SectionHeader
            align="left"
            eyebrow="About us"
            title={
              <>
                Local team,
                <span className="text-brand"> accountable delivery</span>
              </>
            }
            description={siteContent.about.storyLead}
          />

          <ul className="mt-6 space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand/10 text-brand">
                  <FontAwesomeIcon icon={faCheck} className="text-[10px]" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link href="/about" className="btn-link mt-8">
            Full story, sectors &amp; locations
            <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </PageSection>
  );
}
