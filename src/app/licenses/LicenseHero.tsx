"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import HeroChecklist from "@/components/HeroChecklist";

const LICENSE_HIGHLIGHTS = [
  "Microsoft 365 & Windows: tenant-aware plans and SKUs we can fulfil with proper tax lines",
  "Tally Prime & renewals: releases planned around your statutory dates — not surprise migrations",
  "Security suites: Quick Heal, Seqrite, and endpoint packs sized to hardware you already manage",
];

export default function LicenseHero() {
  return (
    // <section className="relative overflow-hidden bg-slate-950 pt-36 pb-20">
    <section className="relative mt-0 overflow-hidden bg-section py-8 sm:py-10">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* TAG */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand sm:px-5 sm:py-2 sm:text-sm">
              Authorised distribution · GST paperwork
            </div>

            {/* TITLE */}
            <h1 className="mt-4 text-[1.65rem] font-black leading-tight text-foreground sm:mt-5 sm:text-3xl md:text-5xl">
              Genuine software
              <span className="block text-brand">
                licences & renewals
              </span>
            </h1>

            {/* DESC */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/70 sm:mt-8 sm:text-lg">
              Microsoft 365 and Windows paths sized to your headcount, Tally Prime releases planned around statutory dates,
              Quick Heal and endpoint suites matched to laptops you actually manage — we quote SKUs we can fulfil, not grey keys
              that disappear when audit season arrives.
            </p>

            {/* <HeroChecklist items={LICENSE_HIGHLIGHTS} className="mt-6 lg:hidden" /> */}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            {/* <div className="hidden lg:block relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl"> */}
            {/* TOP CARD */}
            {/* SERVICE 1 */}
            {/* <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8"> */}
            {/* SERVICE 1 */}
            {/* <div className="flex items-start gap-5">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-brand">
      <FontAwesomeIcon
        icon={faNetworkWired}
        className="text-2xl"
      />
    </div>

    <div>
      <h4 className="text-[18px] font-semibold text-foreground">
        Network Setup
      </h4>

      <p className="mt-1 text-sm leading-relaxed text-foreground/65">
        Wired, wireless & NAS solutions for offices and businesses
      </p>
    </div>
  </div> */}

            {/* SERVICE 2 */}
            {/* <div className="flex items-start gap-5 mt-5">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-brand">
      <FontAwesomeIcon
        icon={faLaptop}
        className="text-2xl"
      />
    </div>

    <div>
      <h4 className="text-[18px] font-semibold text-foreground">
        Laptop & Desktop Sales
      </h4>

      <p className="mt-1 text-sm leading-relaxed text-foreground/65">
        Old/new laptops, desktops & IT accessories available
      </p>
    </div>
  </div> */}

            {/* SERVICE 3 */}
            {/* <div className="flex items-start gap-5 mt-5">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-brand">
      <FontAwesomeIcon
        icon={faVideo}
        className="text-2xl"
      />
    </div>

    <div>
      <h4 className="text-[18px] font-semibold text-foreground">
        CCTV & Security Systems
      </h4>

      <p className="mt-1 text-sm leading-relaxed text-foreground/65">
        CCTV, attendance machines & IP PBX security solutions
      </p>
    </div>
  </div> */}

            {/* SERVICE 4 */}
            {/* <div className="flex items-start gap-5 mt-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand/20 text-brand">
                    <FontAwesomeIcon icon={faShieldHalved} className="text-2xl"/>
                  </div>

                  <div>
                    <h4 className="text-[18px] font-semibold text-foreground">
                      Software Licenses
                    </h4>

                    <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                      Microsoft, Tally, Quick-Heal & other software licenses at
                      affordable prices
                    </p>
                  </div>
                </div>
              </div> */}

            {/* SMALL CARDS */}
            {/* <div className="mt-6 grid grid-cols-2 gap-5">
                <div className="rounded-3xl border border-foreground/10 bg-card p-6 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon icon={faComputer} className="text-2xl"/>
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-foreground">
                    Rental Systems
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                    Computers, laptops & accessories
                  </p>
                </div>

                <div className="rounded-3xl border border-foreground/10 bg-card p-6 shadow-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                    <FontAwesomeIcon
                      icon={faCamera}
                      className="text-2xl"
                    />
                  </div>

                  <h4 className="mt-5 text-lg font-bold text-foreground">
                    CCTV Solutions
                  </h4>

                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">
                    Security cameras & surveillance systems
                  </p>
                </div>
              </div> */}
            {/* </div> */}
            <HeroChecklist items={LICENSE_HIGHLIGHTS} className="mt-10 hidden lg:block" />
          </motion.div>
        </div>

        {/* ================= BREADCRUMB ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 sm:mt-10"
        >
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-foreground/10 bg-card px-4 py-4 shadow-sm sm:gap-3 sm:px-6 sm:py-5">
            <Link href="/" className="text-xs font-medium text-foreground/65 transition hover:text-brand sm:text-sm">
              Home
            </Link>

            <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-foreground/50" />

            <Link href="/#services" className="text-xs font-medium text-foreground/65 transition hover:text-brand sm:text-sm">
              Services
            </Link>

            <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-foreground/50" />

            <span className="max-w-[min(100%,12rem)] text-xs font-semibold leading-snug text-brand sm:max-w-none sm:text-sm">
              Software licences
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// "use client";

// import Link from "next/link";
// import { motion } from "framer-motion";

// export default function LicenseHero() {
//   return (
//     <section className="relative overflow-hidden bg-slate-950 pt-40 pb-24">
//       {/* BACKGROUND GLOW */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-brand/20 blur-3xl" />

//         <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />
//       </div>

//       {/* GRID */}
//       <div className="absolute inset-0 opacity-[0.04]">
//         <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 35 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           className="max-w-4xl"
//         >
//           {/* LABEL */}
//           <div className="inline-flex items-center rounded-full border border-[#33CCCC]/20 bg-brand/10 px-5 py-2 text-sm font-semibold text-brand backdrop-blur-xl">
//             Software Licensing Solutions
//           </div>

//           {/* TITLE */}
//           <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-foreground">
//             Genuine Software
//             <span className="block text-brand">
//               Licenses & Subscriptions
//             </span>
//           </h1>

//           {/* DESCRIPTION */}
//           <p className="mt-8 max-w-3xl text-lg leading-relaxed text-foreground/70 md:text-xl">
//             We provide genuine Microsoft, Tally, Quick Heal, antivirus,
//             productivity, and enterprise software licenses at competitive
//             pricing for businesses, offices, institutes, and organizations.
//           </p>
//         </motion.div>

//         {/* BREADCRUMB */}
//         <motion.div
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="mt-20 flex items-center gap-3 border-t border-white/10 pt-6 text-sm text-foreground/65"
//         >
//           <Link
//             href="/"
//             className="transition hover:text-brand"
//           >
//             Home
//           </Link>

//           <span>/</span>

//           <Link
//             href="/services"
//             className="transition hover:text-brand"
//           >
//             Services
//           </Link>

//           <span>/</span>

//           <span className="text-foreground">
//             Licenses
//           </span>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
