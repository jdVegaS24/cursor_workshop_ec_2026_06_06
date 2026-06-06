import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
  as?: "section" | "article" | "div";
};

export function SurfaceCard({
  children,
  className,
  as: Component = "section",
}: SurfaceCardProps) {
  return (
    <Component
      className={cn(
        "rounded-2xl border border-border/80 bg-card shadow-sm",
        className,
      )}
    >
      {children}
    </Component>
  );
}
