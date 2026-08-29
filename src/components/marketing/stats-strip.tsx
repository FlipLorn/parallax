import { Badge } from "@/components/ui/badge";
import { markets, pxRisk, positionSizing, wallet } from "@/lib/domain/demo-data";

const stats = [
  { label: "Portfolio scanned", value: `$${Math.round(wallet.portfolioValue / 1000)}K`, detail: "demo wallet" },
  { label: "PX Risk", value: String(pxRisk.score), detail: pxRisk.level },
  { label: "Suggested hedge", value: `$${positionSizing.finalUsd}`, detail: "policy capped" },
  { label: "Markets watched", value: String(markets.length), detail: "live style feed" },
];

export function StatsStrip() {
  return (
    <section id="risk" className="border-y border-border bg-background/82">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge>Stats</Badge>
            <h2 className="mt-3 text-3xl font-semibold md:text-5xl">The instrument readout before a trade exists.</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            Every number comes from the same demo state as the terminal: wallet value, exposure score, market edge, and policy cap.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border shadow-[0_0_46px_rgba(36,88,255,0.1)] md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card/88 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{stat.label}</p>
              <p className="mt-4 text-5xl font-semibold leading-none">{stat.value}</p>
              <p className="mt-3 text-sm text-muted-foreground">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
