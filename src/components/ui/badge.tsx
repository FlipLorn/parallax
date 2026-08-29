import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] font-semibold uppercase leading-none tracking-[0.12em]",
  {
    variants: {
      variant: {
        default: "border border-border bg-secondary text-foreground",
        blue: "border border-primary/40 bg-primary/10 text-primary font-bold",
        lime: "border border-emerald-600/40 bg-emerald-100/60 text-emerald-800 font-bold",
        red: "border border-red-600/40 bg-red-100/60 text-red-800 font-bold",
        ink: "bg-foreground text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
