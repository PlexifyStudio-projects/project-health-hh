import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./SectionHeader.scss";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "center", className }: Props) {
  return (
    <header className={cn("section-header", `section-header--${align}`, className)}>
      {eyebrow && <span className="section-header__eyebrow">{eyebrow}</span>}
      <h2 className="section-header__title">{title}</h2>
      {description && <p className="section-header__description">{description}</p>}
    </header>
  );
}
