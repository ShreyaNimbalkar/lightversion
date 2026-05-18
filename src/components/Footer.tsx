"use client";

import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPhone,
  faEnvelope,
  faClock,
  faLocationDot,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { site, siteTelHref } from "@/data/site";
import { siteContent } from "@/data/siteContent";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Repair & rental", href: "/repair-rental" },
  { name: "Networking", href: "/networking" },
  { name: "CCTV services", href: "/cctv-services" },
  { name: "WFH service", href: "/wfh-service" },
  { name: "Software licences", href: "/licenses" },
];

const socialIcon = {
  facebook: faFacebookF,
  instagram: faInstagram,
  linkedin: faLinkedinIn,
  twitter: faTwitter,
} as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface-nav text-white">
      <div className="mx-auto max-w-7xl min-w-0 px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid min-w-0 gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center">
  <div className="relative h-24 w-40 sm:h-28 sm:w-52">
    <Image
      src="/softlink_logowht.png"
      alt={`${site.brandName} logo`}
      fill
      priority
      className="object-contain"
    />
  </div>
</Link>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              {siteContent.footer.blurb} Led by {site.proprietor}.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/55">{site.serviceArea}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {site.socials.map((s) => (
                <a
                  key={s.network}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-accent/50 hover:bg-brand hover:text-white"
                >
                  <FontAwesomeIcon icon={socialIcon[s.network]} className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Quick links</h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-white/70 transition hover:text-accent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={siteTelHref(p.tel)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-accent"
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-xs text-accent" />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-start gap-2 break-all text-sm font-medium text-white/80 transition hover:text-accent"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mt-0.5 shrink-0 text-xs text-accent" />
                  {site.email}
                </a>
              </li>
              <li className="flex gap-2 text-xs leading-relaxed text-white/60">
                <FontAwesomeIcon icon={faClock} className="mt-0.5 shrink-0 text-accent" />
                {site.workingHours}
              </li>
            </ul>
          </div>

          {/* Addresses */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-white">Locations</h3>
            <ul className="mt-4 flex flex-col gap-5">
              {site.locations.map((loc) => (
                <li key={loc.label}>
                  <div className="flex gap-2">
                    <FontAwesomeIcon icon={faLocationDot} className="mt-0.5 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white">{loc.label}</p>
                      <p className="mt-1 text-xs leading-relaxed text-white/65">
                        {loc.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        Google Maps
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[9px]" />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-center text-xs text-white/50 sm:text-left">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <nav className="flex gap-6 text-xs text-white/55">
            <Link href="/privacy" className="transition hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-accent">
              Terms & Conditions
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
