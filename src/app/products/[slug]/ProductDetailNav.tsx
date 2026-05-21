"use client";

type NavLink = { id: string; label: string };

const baseLinks: NavLink[] = [
  { id: "overview", label: "Overview" },
  { id: "specifications", label: "Specifications" },
  { id: "plans", label: "Plans & pricing" },
  { id: "related", label: "Related" },
];

type Props = {
  showPlans?: boolean;
  showRelated?: boolean;
};

export default function ProductDetailNav({ showPlans = true, showRelated = true }: Props) {
  const links = baseLinks.filter((link) => {
    if (link.id === "plans" && !showPlans) return false;
    if (link.id === "related" && !showRelated) return false;
    return true;
  });
  return (
    <nav
      aria-label="On this page"
      className="sticky top-[4.25rem] z-30 -mx-4 border-b border-foreground/10 bg-section/95 backdrop-blur-md sm:top-20"
    >
      <ul className="scroll-x-touch flex gap-1 px-4 py-2.5 sm:px-0 sm:py-3">
        {links.map((link) => (
          <li key={link.id} className="shrink-0">
            <a
              href={`#${link.id}`}
              className="inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-xs font-semibold text-foreground/70 transition hover:bg-card hover:text-brand sm:min-h-0 sm:text-sm"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
