import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./Card.scss";

interface Props {
  children: ReactNode;
  variant?: "default" | "feature" | "ghost";
  className?: string;
  as?: "div" | "article" | "section";
}

export function Card({ children, variant = "default", className, as: Tag = "div" }: Props) {
  return <Tag className={cn("card", `card--${variant}`, className)}>{children}</Tag>;
}
