"use client";

import React from "react";
import { motion } from "motion/react";
import { Brain, ShieldAlert, Cpu, Activity, TrendingUp, Layers, CheckCircle2, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BentoGridSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-3.5 py-1 font-mono text-xs font-semibold text-blue-400 mb-4">
            <Layers className="size-3.5" /> SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
            Built for institutional risk precision.
          </h2>
          <p className="mt-4 text-base text-neutral-400">
            Parallax combines onchain data streams, multi-agent AI research quorums, statistical Brier score weights, and non-custodial transaction execution.
          </p>
        </motion.div>

        {/* Vetra Style Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Hero Large Bento Box (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-neutral-900/60 to-neutral-950 p-8 relative overflow-hidden group hover:border-blue-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="absolute top-0 right-0 size-72 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all duration-500" />
            
            <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Brain className="size-6" />
                </div>
                <Badge variant="lime" className="font-mono text-xs">BRIER SCORE 0.128 CALIBRATED</Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight sm:text-3xl">
                  Multi-Agent AI Quorum & Consensus
                </h3>
                <p className="mt-3 text-sm text-neutral-400 leading-6 max-w-xl">
                  Four specialist LLM agent models (Onchain Flow, Quant Regime, News Impact, Macro Tape) independently evaluate prediction event probabilities. Outputs are synthesized using historical Brier calibration accuracy weights.
                </p>
              </div>

              {/* Agent Breakdown Mini-Bars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono text-xs">
                <div className="rounded-lg bg-neutral-900/80 p-3 border border-white/5">
                  <span className="text-[10px] text-neutral-400">ONCHAIN FLOW</span>
                  <p className="mt-1 font-bold text-blue-400 text-base">72% BULLISH</p>
                </div>
                <div className="rounded-lg bg-neutral-900/80 p-3 border border-white/5">
                  <span className="text-[10px] text-neutral-400">QUANT REGIME</span>
                  <p className="mt-1 font-bold text-blue-400 text-base">63% BULLISH</p>
                </div>
                <div className="rounded-lg bg-neutral-900/80 p-3 border border-white/5">
                  <span className="text-[10px] text-neutral-400">NEWS IMPACT</span>
                  <p className="mt-1 font-bold text-blue-400 text-base">66% BULLISH</p>
                </div>
                <div className="rounded-lg bg-neutral-900/80 p-3 border border-white/5">
                  <span className="text-[10px] text-neutral-400">MACRO TAPE</span>
                  <p className="mt-1 font-bold text-emerald-400 text-base">53% NEUTRAL</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: PX Risk Dial Stat Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8 flex flex-col justify-between relative overflow-hidden group hover:border-red-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30">
              <ShieldAlert className="size-6" />
            </div>

            <div className="my-6">
              <span className="font-mono text-xs uppercase text-neutral-400">PROPRIETARY SCORE</span>
              <h4 className="text-5xl font-black text-white mt-1">PX Risk 72</h4>
              <Badge variant="red" className="mt-2 font-mono">HIGH EVENT SENSITIVITY</Badge>
            </div>

            <p className="text-xs text-neutral-400 leading-5">
              Measures portfolio vulnerability across 6 risk components (Concentration, Volatility, Event Sensitivity, Correlation, Liquidity, Protection).
            </p>
          </motion.div>

          {/* Card 3: Deterministic Solana Execution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-neutral-900/60 p-8 flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Lock className="size-6" />
            </div>

            <div className="my-6">
              <span className="font-mono text-xs uppercase text-neutral-400">SAFETY BOUNDS</span>
              <h4 className="text-2xl font-bold text-white mt-1">Policy-Bounded Sizing</h4>
              <p className="mt-2 text-xs text-neutral-400 leading-5">
                Every trade is hard-capped by user risk policy ($65 max size, $150 daily budget). Parallax never executes without your non-custodial signature.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <CheckCircle2 className="size-4" /> Non-Custodial & Wallet Signed
            </div>
          </motion.div>

          {/* Card 4: Jupiter Orderbook Depth (Spans 2 columns) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-2 rounded-2xl border border-white/10 bg-neutral-900/60 p-8 flex flex-col justify-between group hover:border-blue-500/40 transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30">
                  <Activity className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Jupiter Prediction Orderbook Depth</h3>
                  <span className="font-mono text-xs text-neutral-400">Live Bid/Ask Quote & Slippage Bounds</span>
                </div>
              </div>
              <Badge variant="blue" className="font-mono text-xs">JUPITER ADAPTER ACTIVE</Badge>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div className="rounded-xl bg-neutral-950 p-4 border border-white/5">
                <span className="text-[10px] text-neutral-400 uppercase">Best Bid (YES)</span>
                <p className="mt-1 text-2xl font-bold text-emerald-400">55c</p>
                <span className="text-[10px] text-neutral-500">Orderbook Depth: $41.2k</span>
              </div>
              <div className="rounded-xl bg-neutral-950 p-4 border border-white/5">
                <span className="text-[10px] text-neutral-400 uppercase">Best Ask (NO)</span>
                <p className="mt-1 text-2xl font-bold text-red-400">57c</p>
                <span className="text-[10px] text-neutral-500">Orderbook Depth: $38.9k</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
