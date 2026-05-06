import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import "./Tag.scss";

interface Props {
  children: ReactNode;
  tone?: "blue" | "green" | "coral" | "gold" | "ink";
  className?: string;
}

export function Tag({ children, tone = "blue", className }: Props) {
  return <span className={cn("tag", `tag--${tone}`, className)}>{children}</span>;
}
