import Link from "next/link";
import { ArrowUpRight, Brain, ShieldAlert, WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExpandDetails } from "@/components/ui/expand-details";
import { TransactionDialog } from "@/components/marketing/transaction-dialog";
import { agentSignals, assets, pxRisk, transactionSteps } from "@/lib/domain/demo-data";

export function LaunchAppSection() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-background/88 py-20 text-foreground">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[url('/obsidian-field.svg')] bg-cover bg-center opacity-55" />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
          <div>
            <Badge variant="lime">Launch app</Badge>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-6xl">
              Open the terminal and watch the constraint chain.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-muted-foreground">
              The demo shows the complete decision loop: wallet read, exposure scoring, agent disagreement, market sizing, and wallet review.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/app">
                  Enter terminal <ArrowUpRight />
                </Link>
              </Button>
              <TransactionDialog />
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-md border border-border bg-card/84 p-4 text-foreground shadow-[0_0_46px_rgba(36,88,255,0.12)]">
              <div className="grid gap-4 md:grid-cols-3">
                <MiniPanel icon={WalletCards} label="Wallet" value="$48.6K" />
                <MiniPanel icon={ShieldAlert} label="PX Risk" value={`${pxRisk.score} ${pxRisk.level}`} />
                <MiniPanel icon={Brain} label="Agents" value="4 active" />
              </div>
              <div className="mt-4 grid gap-2">
                {assets.map((asset) => (
                  <div key={asset.symbol} className="grid grid-cols-[64px_1fr_72px] items-center gap-3 rounded border border-border bg-background/60 p-3">
                    <span className="font-mono text-xs font-semibold">{asset.symbol}</span>
                    <span className="h-2 overflow-hidden rounded bg-secondary">
                      <span className="block h-full bg-primary" style={{ width: `${asset.portfolioWeight}%` }} />
                    </span>
                    <span className="text-right font-mono text-xs">{asset.portfolioWeight}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                {agentSignals.slice(0, 2).map((agent) => (
                  <ExpandDetails
                    key={agent.agentId}
                    eyebrow={agent.label}
                    title={`${agent.probability}% probability, ${agent.confidence}% confidence`}
                    className="border-border bg-card/82 text-foreground"
                    defaultOpen={agent.agentId === "onchain"}
                  >
                    <p className="text-muted-foreground">{agent.signal}</p>
                    <ul className="mt-3 space-y-2">
                      {agent.evidence.map((item) => (
                        <li key={item} className="font-mono text-xs uppercase tracking-[0.08em] text-muted-foreground">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </ExpandDetails>
                ))}
              </div>
              <div className="rounded-md border border-border bg-card/82 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Transaction rail</p>
                <div className="mt-4 space-y-2">
                  {transactionSteps.map((step, index) => (
                    <div key={step.step} className="flex items-center gap-3 text-sm">
                      <span className={step.complete ? "grid size-7 place-items-center rounded bg-primary font-mono text-xs text-primary-foreground" : "grid size-7 place-items-center rounded border border-border font-mono text-xs text-muted-foreground"}>
                        {index + 1}
                      </span>
                      <span className={step.complete ? "text-foreground" : "text-muted-foreground"}>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniPanel({ icon: Icon, label, value }: { icon: typeof WalletCards; label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background/55 p-4">
      <Icon className="size-5" />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
