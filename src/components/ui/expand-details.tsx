"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

export function ExpandDetails({
  title,
  eyebrow,
  children,
  defaultOpen = false,
  className,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [ref, bounds] = useMeasure();

  return (
    <div className={cn("rounded-md border border-border bg-background", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </span>
          <span className="mt-1 block text-sm font-semibold">{title}</span>
        </span>
        <ChevronDown className={cn("size-4 transition", open && "rotate-180")} />
      </button>
      <motion.div
        animate={{ height: open ? bounds.height : 0 }}
        transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div ref={ref} className="border-t border-border p-4 text-sm leading-6 text-muted-foreground">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
