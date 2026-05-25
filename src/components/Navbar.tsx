"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBars,
  faXmark,
  faChevronDown,
  faArrowRight,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";

import { site, siteTelHref } from "@/data/site";

const navLinks = [
  { name: "About", href: "/about" },

  {
    name: "Services",
    href: "/#services",

    submenu: [
      {
        name: "Repair & Rental Services",
        href: "/repair-rental",
      },
      {
        name: "Networking Solutions",
        href: "/networking",
      },
      {
        name: "CCTV Services",
        href: "/cctv-services",
      },
      {
        name: "WFH Service",
        href: "/wfh-service",
      },
      {
        name: "Software Licenses",
        href: "/licenses",
      },
    ],
  },

  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  const { open: enquiryModalOpen, openQuotation } = useEnquiryModal();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);

  const [mobileDropdown, setMobileDropdown] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= LOCK BODY SCROLL =================
  useEffect(() => {
    if (mobileMenu || enquiryModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu, enquiryModalOpen]);

  // ================= ACTIVE LINK =================
  const isActive = (href: string) => pathname === href;

  const isServiceActive = navLinks
    .find((link) => link.name === "Services")
    ?.submenu?.some((item) => pathname === item.href);

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-surface-nav/95 text-white backdrop-blur-md border-b border-white/10 shadow-md"
            : "bg-surface-nav text-white"
        }`}
      >
        <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[3.25rem] items-center justify-between gap-3 py-2 sm:h-20 sm:min-h-0 sm:py-0">
            {/* ================= LOGO ================= */}
            <Link
              href="/"
              className="relative z-50 flex min-w-0 shrink-0 items-center"
              aria-label={`${site.brandName} home`}
            >
              {/* Wide box so horizontal / padded PNGs scale by height without looking tiny */}
              <div className="relative h-11 w-[8.75rem] max-w-[min(11rem,calc(100vw-9rem))] sm:h-14 sm:w-44 sm:max-w-none md:h-16 md:w-48 lg:h-[4.25rem] lg:w-[12.5rem]">
                <Image
                  src="/softlink_logowht.png"
                  alt=""
                  fill
                  priority
                  className="object-contain object-left drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 640px) 140px, (max-width: 768px) 176px, (max-width: 1024px) 192px, 200px"
                  role="presentation"
                />
              </div>
            </Link>

            {/* ================= DESKTOP MENU ================= */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setOpenDropdown(true)}
                      onMouseLeave={() => setOpenDropdown(false)}
                    >
                      <button
                        className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                          isServiceActive
                            ? "text-accent"
                            : "text-white hover:text-accent"
                        }`}
                      >
                        {link.name}

                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`text-xs transition-transform duration-300 ${
                            openDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* ACTIVE LINE */}
                      <div
                        className={`absolute -bottom-1 left-0 h-[2px] bg-brand transition-all duration-300 ${
                          isServiceActive ? "w-full" : "w-0"
                        }`}
                      />

                      <AnimatePresence>
                        {openDropdown && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-12 left-0 w-72 overflow-hidden rounded-2xl border border-white/10 bg-surface-deep shadow-xl"
                          >
                            <div className="p-3">
                              {link.submenu.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-medium transition-all duration-300 ${
                                    pathname === item.href
                                      ? "bg-brand/15 text-accent"
                                      : "text-slate-200 hover:bg-white/5 hover:text-accent"
                                  }`}
                                >
                                  {item.name}

                                  <FontAwesomeIcon
                                    icon={faArrowRight}
                                    className={`text-xs transition-all duration-300 ${
                                      pathname === item.href
                                        ? "opacity-100 translate-x-1"
                                        : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                                    }`}
                                  />
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      className={`relative font-medium transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-brand after:transition-all after:duration-300 ${
                        isActive(link.href)
                          ? "text-accent after:w-full"
                          : "text-white hover:text-accent after:w-0 hover:after:w-full"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* ================= RIGHT SIDE ================= */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={siteTelHref(site.phones[0].tel)}
                className="hidden inline-flex min-h-[2.80rem] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                <FontAwesomeIcon icon={faPhone} className="text-xs opacity-90" />
                <span className="tabular-nums">{site.phones[0].display}</span>
              </a>

              <button type="button" onClick={() => openQuotation()} className="btn-primary">
                Request quotation
                <FontAwesomeIcon icon={faArrowRight} className="text-sm opacity-90" />
              </button>
            </div>

            {/* ================= MOBILE ACTIONS ================= */}
            <div className="flex lg:hidden items-center gap-2 relative z-50 sm:gap-3">
              <a
                href={siteTelHref(site.phones[0].tel)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-brand/90 text-white shadow-sm transition hover:bg-brand"
                aria-label={`Call ${site.phones[0].display}`}
              >
                <FontAwesomeIcon icon={faPhone} className="text-sm" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-surface-deep/60 text-white shadow-sm"
                aria-expanded={mobileMenu}
                aria-label={mobileMenu ? "Close menu" : "Open menu"}
              >
                <FontAwesomeIcon
                  icon={mobileMenu ? faXmark : faBars}
                  className="text-white text-lg"
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden"
            />

            {/* MOBILE PANEL */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                duration: 0.22,
                ease: "easeOut",
              }}
              className="fixed top-0 right-0 z-50 flex h-[100dvh] max-h-[100dvh] w-[min(100%,20rem)] max-w-[380px] flex-col overflow-hidden lg:hidden"
            >
              <div className="relative flex h-full min-h-0 flex-col bg-surface-deep text-white border-l border-white/10 shadow-2xl safe-top">
                
                {/* TOP SECTION */}
                <div className="relative shrink-0 px-5 pt-6 pb-5 border-b border-white/10 bg-gradient-to-br from-brand/10 to-transparent sm:px-6 sm:pt-7 sm:pb-6">
                  <div className="flex items-center justify-between">
                    
                    <Link
                      href="/"
                      onClick={() => setMobileMenu(false)}
                      className="relative flex min-w-0 max-w-[calc(100%-3rem)] items-center"
                      aria-label={`${site.brandName} home`}
                    >
                      <div className="relative h-14 w-44 max-w-full sm:h-16 sm:w-52">
                        <Image
                          src="/softlink_logowht.png"
                          alt=""
                          fill
                          priority
                          className="object-contain object-left"
                          sizes="208px"
                          role="presentation"
                        />
                      </div>
                    </Link>

                    <button
                      onClick={() => setMobileMenu(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-surface-nav shadow-md"
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="text-white"
                      />
                    </button>
                  </div>

                  <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                    {site.brandName} — Pune workshop and on-site visits since {site.establishedYear}. Repairs, networking, CCTV, and genuine licences with GST-ready paperwork.
                  </p>
                </div>

                {/* NAVIGATION */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6 safe-bottom">
                  <div className="flex flex-col gap-3">
                    {navLinks.map((link) => (
                      <div key={link.name}>
                        {!link.submenu ? (
                          <Link
                            href={link.href}
                            onClick={() => setMobileMenu(false)}
                            className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-base font-semibold transition-all duration-300 ${
                              isActive(link.href)
                                ? "border-brand/40 bg-brand/10 text-brand"
                                : "border-white/10 bg-white/[0.03] text-white hover:border-brand/40 hover:bg-brand/5"
                            }`}
                          >
                            {link.name}

                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className={`text-sm transition-transform duration-300 ${
                                isActive(link.href)
                                  ? "translate-x-1 opacity-100"
                                  : "opacity-60 group-hover:translate-x-1"
                              }`}
                            />
                          </Link>
                        ) : (
                          <div
                            className={`rounded-2xl border overflow-hidden ${
                              isServiceActive
                                ? "border-brand/40 bg-brand/5"
                                : "border-white/10 bg-white/[0.03]"
                            }`}
                          >
                            <button
                              onClick={() =>
                                setMobileDropdown(!mobileDropdown)
                              }
                              className={`flex w-full items-center justify-between px-5 py-4 text-base font-semibold transition-all duration-300 ${
                                isServiceActive
                                  ? "text-brand"
                                  : "text-white"
                              }`}
                            >
                              {link.name}

                              <motion.div
                                animate={{
                                  rotate: mobileDropdown ? 180 : 0,
                                }}
                                transition={{ duration: 0.25 }}
                              >
                                <FontAwesomeIcon
                                  icon={faChevronDown}
                                  className="text-sm"
                                />
                              </motion.div>
                            </button>

                            <AnimatePresence>
                              {mobileDropdown && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{
                                    opacity: 1,
                                    height: "auto",
                                  }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-3 pb-4 flex flex-col gap-2">
                                    {link.submenu.map((item) => (
                                      <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() =>
                                          setMobileMenu(false)
                                        }
                                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                                          pathname === item.href
                                            ? "bg-brand/10 text-brand"
                                            : "text-slate-300 hover:bg-brand/10 hover:text-brand"
                                        }`}
                                      >
                                        {item.name}

                                        <FontAwesomeIcon
                                          icon={faArrowRight}
                                          className="text-xs"
                                        />
                                      </Link>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* MOBILE CTA */}
                  <div className="mt-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-brand to-brand-deep p-6 text-white shadow-2xl shadow-brand/25">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-5 backdrop-blur-md">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="text-xl"
                      />
                    </div>

                    <h3 className="text-2xl font-black leading-tight">
                      Need IT Support?
                    </h3>

                    <p className="mt-3 text-white/80 leading-relaxed text-sm">
                      Same-day triage when we can, otherwise a clear date. We keep
                      parts and licence paperwork on record so your next issue is
                      faster to solve.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenu(false);
                        openQuotation();
                      }}
                      className="btn-inverse mt-6"
                    >
                      Request quotation

                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="text-sm"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
