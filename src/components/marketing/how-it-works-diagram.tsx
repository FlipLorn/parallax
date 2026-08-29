"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Wallet, Search, Network, Brain, ShieldAlert, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SYSTEM_STEPS = [
  {
    step: "01",
    label: "CONNECT",
    title: "Wallet State Input",
    icon: Wallet,
    detail: "Read-only holdings, token balances (SOL, JUP, USDC), and protocol beta are indexed.",
  },
  {
    step: "02",
    label: "ANALYZE",
    title: "Portfolio Beta Engine",
    icon: Search,
    detail: "Calculates asset concentration, volatility percentiles, and directional correlation clusters.",
  },
  {
    step: "03",
    label: "MAP EVENTS",
    title: "Jupiter Prediction Scout",
    icon: Network,
    detail: "Maps portfolio holdings against active prediction markets to identify hidden event dependencies.",
  },
  {
    step: "04",
    label: "AGENTS",
    title: "Multi-Agent AI Quorum",
    icon: Brain,
    detail: "Onchain, Quant, News, and Macro agents publish independent probabilities & evidence.",
  },
  {
    step: "05",
    label: "QUANTIFY",
    title: "PX Risk & Sizing Engine",
    icon: ShieldAlert,
    detail: "Derives PX Risk Score (0-100) and bounds suggested hedge sizes by user policy caps.",
  },
  {
    step: "06",
    label: "ACT",
    title: "Simulate & Sign",
    icon: CheckCircle2,
    detail: "Prepares transaction, simulates max loss & payout, and prompts user signature.",
  },
];

export function HowItWorksDiagram() {
  const [activeStepIndex, setActiveStepIndex] = useState(3);

  return (
    <section id="how-it-works" className="py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-7xl px-4"
      >
        <div className="text-center">
          <Badge variant="ink" className="font-mono text-xs uppercase tracking-widest">
            System Architecture
          </Badge>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            From raw wallet state to bounded execution.
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-sm leading-6 text-muted-foreground">
            Parallax does not trust single LLMs or unconstrained execution. Every action is calculated, bounded, simulated, and signed.
          </p>
        </div>

        {/* Horizontal interactive step rail */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {SYSTEM_STEPS.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStepIndex === idx;
            return (
              <div
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`group cursor-pointer rounded-lg border p-4 transition-all ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-[0_0_24px_rgba(36,88,255,0.15)]"
                    : "border-border bg-card/60 hover:border-border/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground">{s.step}</span>
                  <Icon className={`size-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <h3 className="mt-4 font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                  {s.label}
                </h3>
                <p className="mt-1 text-sm font-medium">{s.title}</p>
              </div>
            );
          })}
        </div>

        {/* Step detail card */}
        <div className="mt-6 rounded-lg border border-border bg-card/90 p-6 shadow-xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Badge variant="lime" className="font-mono text-xs uppercase">
              STAGE {SYSTEM_STEPS[activeStepIndex].step}: {SYSTEM_STEPS[activeStepIndex].label}
            </Badge>
            <h4 className="font-semibold text-lg">{SYSTEM_STEPS[activeStepIndex].title}</h4>
          </div>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            {SYSTEM_STEPS[activeStepIndex].detail}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
