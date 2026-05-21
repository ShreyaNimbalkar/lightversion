import type { ReactNode } from "react";

type Props = {
  id?: string;
  children: ReactNode;
  /** default | muted | card */
  tone?: "default" | "muted" | "card";
  border?: "none" | "top";
  className?: string;
  containerClassName?: string;
};

/**
 * Standard page section — same vertical rhythm and container width everywhere.
 */
export default function PageSection({
  id,
  children,
  tone = "default",
  border = "top",
  className = "",
  containerClassName = "",
}: Props) {
  const toneClass =
    tone === "muted"
      ? "bg-section"
      : tone === "card"
        ? "bg-card"
        : "bg-section";

  const borderClass = border === "top" ? "border-t border-foreground/10" : "";

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${toneClass} ${borderClass} section-padding ${className}`.trim()}
    >
      <div className={`page-container relative ${containerClassName}`.trim()}>{children}</div>
    </section>
  );
}
