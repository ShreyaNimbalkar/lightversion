"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { useEnquiryModal } from "@/components/EnquiryModalProvider";
import OverlapImageCard from "@/components/OverlapImageCard";
import PageSection from "@/components/ui/PageSection";
import type { ServiceCatalogCategory } from "@/data/serviceProductLists";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

const cardMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 22, stiffness: 320 },
  },
};

type Props = {
  category: ServiceCatalogCategory;
  serviceLabel: string;
  defaultInterest: ServiceCatalogCategory["items"][0]["defaultInterest"];
};

export default function ServiceCategoryProductList({
  category,
  serviceLabel,
  defaultInterest,
}: Props) {
  const { openEnquiry } = useEnquiryModal();

  return (
    <PageSection border="none" className="!pt-6 !pb-16 sm:!pb-20">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand">{serviceLabel}</p>
      <p className="mt-2 max-w-3xl text-sm text-foreground/65 sm:text-base">
        Select a product for full specs, plan options, and indicative pricing.
      </p>

      <motion.div
        className="mt-8 grid grid-cols-1 items-start gap-5 min-[480px]:grid-cols-2 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {category.items.map((item) => (
          <motion.div key={item.slug} variants={cardMotion} className="h-auto">
            <OverlapImageCard
              image={item.image}
              imageAlt={item.imageAlt}
              title={item.name}
              description={
                item.summary ? (
                  <>
                    <span className="block font-semibold text-brand">{item.priceFrom}</span>
                    {item.priceNote ? (
                      <span className="mt-0.5 block text-[11px] text-foreground/55">{item.priceNote}</span>
                    ) : null}
                    <span className="mt-1.5 block line-clamp-2">{item.summary}</span>
                  </>
                ) : (
                  <span className="font-semibold text-brand">{item.priceFrom}</span>
                )
              }
              footer={
                <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
                  <Link href={`/products/${item.slug}`} className="btn-secondary-sm">
                    View details
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEnquiry(`${item.enquiryTag} — enquiry`, defaultInterest)}
                    className="btn-primary-sm"
                  >
                    Enquiry
                  </button>
                </div>
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </PageSection>
  );
}


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { motion, type Variants } from "framer-motion";
// import { CheckCircle2, ArrowRight, Star } from "lucide-react";

// import { useEnquiryModal } from "@/components/EnquiryModalProvider";
// import PageSection from "@/components/ui/PageSection";
// import type { ServiceCatalogCategory } from "@/data/serviceProductLists";

// const container: Variants = {
//   hidden: { opacity: 0 },
//   show: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.08,
//       delayChildren: 0.05,
//     },
//   },
// };

// const cardMotion: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   show: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 260,
//       damping: 24,
//     },
//   },
// };

// type Props = {
//   category: ServiceCatalogCategory;
//   serviceLabel: string;
//   defaultInterest: ServiceCatalogCategory["items"][0]["defaultInterest"];
// };

// export default function ServiceCategoryProductList({
//   category,
//   serviceLabel,
//   defaultInterest,
// }: Props) {
//   const { openEnquiry } = useEnquiryModal();

//   return (
//     <PageSection border="none" className="!pt-8 !pb-20">
//       {/* Heading */}
//       <div className="max-w-3xl">
//         <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
//           {serviceLabel}
//         </p>

//         <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
//           Premium Rental & IT Solutions
//         </h2>

//         <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
//           Explore our professional systems and IT solutions designed for
//           businesses, offices, startups, and personal users.
//         </p>
//       </div>

//       {/* Cards */}
//       <motion.div
//         className="mt-12 grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3"
//         variants={container}
//         initial="hidden"
//         animate="show"
//       >
//         {category.items.map((item) => (
//           <motion.article
//             key={item.slug}
//             variants={cardMotion}
//             className="group overflow-hidden rounded-[34px] border border-white/10 bg-[#07152d] shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-brand/30 hover:shadow-[0_30px_80px_rgba(37,99,235,0.18)]"
//           >
//             {/* Image */}
//             <div className="relative h-[250px] overflow-hidden">
//               <Image
//                 src={item.image}
//                 alt={item.imageAlt}
//                 fill
//                 className="object-cover transition duration-700 group-hover:scale-110"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#07152d] via-[#07152d]/20 to-transparent" />

//               {/* Price */}
//               <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-sm font-bold text-brand shadow-lg">
//                 {item.priceFrom}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="p-7">
//               {/* Title */}
//               <h3 className="text-3xl font-bold leading-tight text-white">
//                 {item.name}
//               </h3>

//               {/* Rating */}
//               <div className="mt-7 flex items-center gap-3">
//                 <div className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-sm font-semibold text-white">
//                   <Star className="h-4 w-4 fill-white" />
//                   4.8
//                 </div>

//                 <span className="text-sm font-medium text-white/45">
//                   (Trusted Rentals)
//                 </span>
//               </div>

//               {/* Tags */}
//               <div className="mt-5 flex flex-wrap gap-3">
//                 <div className="rounded-full bg-lime-300 px-4 py-1 text-xs font-bold text-black">
//                   35% OFF
//                 </div>

//                 <div className="rounded-full bg-white px-4 py-1 text-xs font-bold text-brand">
//                   Best Seller
//                 </div>
//               </div>

//               {/* Specs */}
//               <div className="mt-7 space-y-4">
//                 {[
//                   "Intel Core i5 Processor",
//                   "4 - 8 GB RAM",
//                   "250 GB - 500 GB HDD",
//                   "10/100 MBPS LAN CARD",
//                   "Logitech Keyboard & Mouse",
//                   '18.5" TFT Screen',
//                 ].map((feature, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-3"
//                   >
//                     <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />

//                     <p className="text-sm leading-6 text-white/85">
//                       {feature}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Summary */}
//               {item.summary ? (
//                 <p className="mt-7 border-t border-white/10 pt-6 text-sm leading-7 text-white/60">
//                   {item.summary}
//                 </p>
//               ) : null}

//               {/* Buttons */}
//               <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//                 <Link
//                   href={`/products/${item.slug}`}
//                   className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-brand hover:bg-white/5"
//                 >
//                   View Details
//                 </Link>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openEnquiry(
//                       `${item.enquiryTag} — enquiry`,
//                       defaultInterest
//                     )
//                   }
//                   className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-brand/25 transition-all duration-300 hover:bg-brand-hover hover:shadow-brand/40"
//                 >
//                   Request Quote

//                   <ArrowRight className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </motion.article>
//         ))}
//       </motion.div>
//     </PageSection>
//   );
// }