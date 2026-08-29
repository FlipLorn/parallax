import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  detail,
  tone = "default",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "hot" | "good" | "bad";
}) {
  return (
    <div className="rounded-md border border-border bg-card/82 p-4 shadow-[0_0_28px_rgba(36,88,255,0.08)]">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-3 text-3xl font-semibold leading-none",
          tone === "hot" && "text-primary",
          tone === "good" && "text-primary",
          tone === "bad" && "text-destructive",
        )}
      >
        {value}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}
