import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Scroll reveal driven by CSS scroll timelines. Content renders visible on the
// server and in browsers without support, so nothing depends on hydration.
export function Reveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  return <Tag className={cn("reveal", className)}>{children}</Tag>;
}
