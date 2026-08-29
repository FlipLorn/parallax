"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
  ArrowRight,
  Terminal,
  X,
  FileCode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TransactionStep } from "@/lib/domain/types";

export function TransactionSimulatorDrawer({
  marketTitle = "SOL above $220 by Friday close",
  side = "NO",
  suggestedUsd = 43,
  maxPayoutUsd = 76.8,
  initialPxRisk = 72,
  projectedPxRisk = 59,
  triggerText = "Generate Protection",
}: {
  marketTitle?: string;
  side?: "YES" | "NO";
  suggestedUsd?: number;
  maxPayoutUsd?: number;
  initialPxRisk?: number;
  projectedPxRisk?: number;
  triggerText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<TransactionStep>("PREPARING");
  const [logs, setLogs] = useState<string[]>([]);
  const [signed, setSigned] = useState(false);

  const startSimulation = () => {
    setIsOpen(true);
    setStep("PREPARING");
    setSigned(false);
    setLogs(["[00.01s] Initializing Parallax Transaction Simulator...", "[00.03s] Reading Solana wallet holdings (SOL, JUP, USDC)..."]);

    setTimeout(() => {
      setStep("QUOTING");
      setLogs((prev) => [...prev, "[00.18s] Quoting Jupiter Prediction market liquidity...", "[00.22s] Best ask: 57c per NO contract. Max slippage 0.4%."]);
    }, 800);

    setTimeout(() => {
      setStep("SIMULATING");
      setLogs((prev) => [
        ...prev,
        "[00.41s] Running Monte Carlo stress simulation (10,000 runs)...",
        "[00.54s] Simulation Passed: Downside protection reduces SOL beta exposure by 18.4%.",
      ]);
    }, 1800);

    setTimeout(() => {
      setStep("READY_TO_SIGN");
      setLogs((prev) => [
        ...prev,
        "[00.75s] User Risk Policy verification: Max Position ($65 cap) PASS.",
        "[00.78s] User Risk Policy verification: Daily Risk Budget ($150 cap) PASS.",
        "[00.82s] Transaction payload constructed. Awaiting wallet signature.",
      ]);
    }, 2800);
  };

  const handleSign = () => {
    setStep("WALLET");
    setLogs((prev) => [...prev, "[01.12s] Phantom Wallet signature prompt dispatched..."]);

    setTimeout(() => {
      setStep("SUBMITTED");
      setLogs((prev) => [...prev, "[01.88s] Transaction signed. Submitting to Solana mainnet beta via Helius RPC..."]);
    }, 1200);

    setTimeout(() => {
      setStep("CONFIRMED");
      setSigned(true);
      setLogs((prev) => [
        ...prev,
        "[02.45s] Transaction CONFIRMED on Solana block #289,412,084.",
        "[02.48s] Protection active! PX Risk reduced from 72 -> 59.",
      ]);
    }, 2800);
  };

  return (
    <>
      <Button onClick={startSimulation} className="font-semibold shadow-[0_0_24px_rgba(36,88,255,0.2)]">
        <ShieldCheck className="mr-2 size-4 text-primary" />
        {triggerText}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-6 shadow-2xl"
            >
              {/* Top header */}
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={side === "NO" ? "red" : "lime"}>{side} POSITION</Badge>
                    <span className="font-mono text-xs uppercase text-muted-foreground">Deterministic Execution Drawer</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold">{marketTitle}</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Step progression */}
              <div className="mt-5 grid grid-cols-4 gap-2 rounded bg-background/60 p-2.5">
                <StepIndicator label="Quote & Sizing" active={step === "PREPARING" || step === "QUOTING"} done={step !== "PREPARING" && step !== "QUOTING"} />
                <StepIndicator label="Stress Sim" active={step === "SIMULATING"} done={step === "READY_TO_SIGN" || step === "WALLET" || step === "SUBMITTED" || step === "CONFIRMED"} />
                <StepIndicator label="Policy Check" active={step === "READY_TO_SIGN"} done={step === "WALLET" || step === "SUBMITTED" || step === "CONFIRMED"} />
                <StepIndicator label="Sign & Confirm" active={step === "WALLET" || step === "SUBMITTED"} done={step === "CONFIRMED"} />
              </div>

              {/* Financial Review Box */}
              <div className="mt-5 grid gap-4 rounded border border-border bg-background/80 p-4 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">Estimated Cost</p>
                  <p className="mt-1 text-2xl font-semibold">${suggestedUsd.toFixed(2)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Jupiter Orderbook quote</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">Max Potential Payout</p>
                  <p className="mt-1 text-2xl font-semibold text-emerald-400">${maxPayoutUsd.toFixed(2)}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">Settles at $1.00/contract</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">PX Risk Impact</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-destructive">{initialPxRisk}</span>
                    <ArrowRight className="size-4 text-muted-foreground" />
                    <span className="text-2xl font-semibold text-emerald-400">{projectedPxRisk}</span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-emerald-400/90">-18.4% risk reduction</p>
                </div>
              </div>

              {/* Log stream window */}
              <div className="mt-5 rounded border border-border bg-background/95 p-3">
                <div className="flex items-center gap-2 border-b border-border/60 pb-2">
                  <Terminal className="size-3.5 text-primary" />
                  <span className="font-mono text-[11px] text-muted-foreground">Simulated Execution Log</span>
                </div>
                <div className="mt-2 h-32 overflow-y-auto font-mono text-xs text-muted-foreground space-y-1">
                  {logs.map((log, i) => (
                    <p key={i} className={i === logs.length - 1 ? "text-foreground font-semibold" : ""}>
                      {log}
                    </p>
                  ))}
                  {(step === "PREPARING" || step === "QUOTING" || step === "SIMULATING" || step === "SUBMITTED") && (
                    <p className="flex items-center gap-2 text-primary">
                      <Loader2 className="size-3 animate-spin" /> Processing step...
                    </p>
                  )}
                </div>
              </div>

              {/* Action bar */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Close
                </Button>

                {step === "READY_TO_SIGN" && (
                  <Button onClick={handleSign} className="font-semibold bg-emerald-600 hover:bg-emerald-500">
                    <Lock className="mr-2 size-4" /> Sign Transaction with Wallet
                  </Button>
                )}

                {step === "CONFIRMED" && (
                  <Button onClick={() => setIsOpen(false)} className="bg-primary">
                    <CheckCircle2 className="mr-2 size-4" /> Position Active
                  </Button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function StepIndicator({ label, active, done }: { label: string; active?: boolean; done?: boolean }) {
  return (
    <div className={`flex flex-col items-center p-1.5 rounded text-center transition-all ${done ? "bg-emerald-950/40 text-emerald-400" : active ? "bg-primary/20 text-primary border border-primary/40" : "text-muted-foreground opacity-60"}`}>
      <span className="font-mono text-[10px] font-semibold">{label}</span>
    </div>
  );
}
