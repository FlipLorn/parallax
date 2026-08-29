import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function IconCell({
  icon: Icon,
  label,
  active,
  className,
}: {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group grid min-h-20 place-items-center rounded-md border border-border bg-background/70 p-3 text-center transition hover:-translate-y-1 hover:border-primary hover:bg-secondary",
        active && "border-primary bg-primary/16 text-foreground shadow-[0_0_26px_rgba(36,88,255,0.28)]",
        className,
      )}
    >
      <Icon className="size-5 stroke-[2.2]" />
      <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em]">{label}</span>
    </div>
  );
}
