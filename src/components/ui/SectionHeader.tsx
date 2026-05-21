import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Consistent section titles sitewide — same spacing, type scale, and badge style */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left";

  return (
    <header className={`${alignClass} ${className}`.trim()}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 id={id} className="section-title">{title}</h2>
      {description ? <p className="section-intro">{description}</p> : null}
    </header>
  );
}
