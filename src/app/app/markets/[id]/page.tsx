import { notFound } from "next/navigation";
import { MetricCard } from "@/components/app/metric-card";
import { TransactionSimulatorDrawer } from "@/components/ui/transaction-simulator-drawer";
import { ProbabilityTrendChart } from "@/components/ui/probability-trend-chart";
import { MarketOrderbookDepth } from "@/components/ui/market-orderbook-depth";
import { AgentConsensusBar } from "@/components/ui/agent-consensus-bar";
import { Badge } from "@/components/ui/badge";
import { agentSignals, eventRisks, markets, positionSizing } from "@/lib/domain/demo-data";

export default async function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const market = markets.find((item) => item.id === id) || markets[0];
  if (!market) notFound();

  const risk = eventRisks.find((item) => item.marketId === market.id);
  const edge = market.parallaxProbability - market.marketProbability;

  return (
    <div className="grid gap-6">
      {/* Top Header */}
      <section className="rounded-lg border border-border bg-card/90 p-6 shadow-[0_0_40px_rgba(36,88,255,0.08)]">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={market.classification === "PROTECTION" ? "red" : market.classification === "OPPORTUNITY" ? "lime" : "default"}>
                {market.classification}
              </Badge>
              <span className="font-mono text-xs text-muted-foreground">Event ID {market.eventId} • Closes {market.closeDate}</span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-5xl leading-tight max-w-4xl">
              {market.title}
            </h1>
          </div>

          <TransactionSimulatorDrawer
            marketTitle={market.title}
            side={market.classification === "PROTECTION" ? "NO" : "YES"}
            suggestedUsd={43}
            maxPayoutUsd={76.8}
            triggerText="Simulate Trade"
          />
        </div>

        {/* Metric Row */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Market Implied" value={`${market.marketProbability}%`} detail="Prediction orderbook price" />
          <MetricCard label="Parallax Forecast" value={`${market.parallaxProbability}%`} detail="Weighted AI quorum model" tone="hot" />
          <MetricCard label="Model Edge" value={`${edge > 0 ? `+${edge.toFixed(1)}` : edge.toFixed(1)}pt`} detail="Model vs Market" tone={edge > 0 ? "good" : "bad"} />
          <MetricCard label="Suggested Position" value={`$${positionSizing.finalUsd}`} detail="Bounded by Risk Policy ($65 cap)" />
        </div>
      </section>

      {/* Probability Trend Chart */}
      <section>
        <ProbabilityTrendChart title={`Probability History & AI Model Divergence — ${market.title}`} />
      </section>

      {/* Grid: Orderbook Depth & Agent Quorum */}
      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        {/* Left Column: Orderbook Depth & Wallet Exposure */}
        <div className="space-y-6">
          <MarketOrderbookDepth
            bestBidCents={market.bestBidCents || 55}
            bestAskCents={market.bestAskCents || 57}
            orderbook={market.orderbook}
          />

          {risk && (
            <div className="rounded-lg border border-border bg-card/90 p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Wallet Impact & Sensitivity Analysis
              </span>
              <p className="mt-2 text-sm leading-6 text-foreground font-medium">{risk.title}</p>
              <div className="mt-3 flex items-center gap-4 font-mono text-xs text-muted-foreground">
                <span>Correlation: {risk.correlation.toFixed(2)}</span>
                <span>Expected Move: {risk.expectedMagnitude}%</span>
                <span>Confidence: {risk.modelConfidence}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Agent Committee Rationale */}
        <div>
          <AgentConsensusBar
            signals={agentSignals}
            marketProbability={market.marketProbability}
            parallaxProbability={market.parallaxProbability}
          />
        </div>
      </section>
    </div>
  );
}
