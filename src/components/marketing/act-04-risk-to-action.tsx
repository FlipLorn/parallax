"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Act04RiskToAction() {
  const [isProtected, setIsProtected] = useState<boolean>(false);

  return (
    <section className="py-28 bg-[#070A0E] border-b border-[#1A2029] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1A2029]">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-[#2878FF] mb-2">
              03 / RISK TO ACTION PAYOFF
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#F1F0EA] md:text-5xl lg:text-6xl">
              Quantify the threat. Execute the hedge.
            </h2>
          </div>

          <Button
            onClick={() => setIsProtected(!isProtected)}
            className="font-mono text-xs font-bold bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-5 shadow-[0_0_20px_rgba(40,120,255,0.4)]"
          >
            {isProtected ? "Reset Risk Simulation" : "Simulate Hedge Action ($43 NO)"}
          </Button>
        </div>

        {/* ENORMOUS PX RISK NUMBER (NO CARD WRAPPER!) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-mono text-xs text-[#9398A2] uppercase tracking-wider">
              PORTFOLIO EVENT SENSITIVITY SCORE
            </span>

            <div className="relative flex items-baseline gap-4">
              <motion.div
                key={isProtected ? "prot" : "unprot"}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl sm:text-9xl font-black font-mono tracking-tighter"
                style={{ color: isProtected ? "#B9FF57" : "#FF654D" }}
              >
                <AnimatedCounter value={isProtected ? 59 : 72} decimals={0} />
              </motion.div>

              <div>
                <span className="font-mono text-xl font-bold uppercase" style={{ color: isProtected ? "#B9FF57" : "#FF654D" }}>
                  {isProtected ? "MODERATE" : "HIGH"}
                </span>
                <div className="font-mono text-xs text-[#9398A2] mt-1">
                  {isProtected ? "Hedged against SOL drop" : "Unhedged Event Exposure"}
                </div>
              </div>
            </div>

            {/* Risk Reduction Interpolation indicator */}
            {isProtected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-mono text-xs text-[#B9FF57] flex items-center gap-2 pt-2 border-t border-[#1A2029]"
              >
                <CheckCircle2 className="size-4 animate-bounce" />
                <span>Projected Risk Score: 72 ↓ 59 (-18% Event Sensitivity)</span>
              </motion.div>
            )}
          </div>

          {/* Right: Protection Found Object */}
          <div className="lg:col-span-7 space-y-6">
            <div className="hover-glow-card rounded border border-[#1A2029] bg-[#0C1016] p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#1A2029] pb-4">
                <span className="font-mono text-xs font-bold text-[#B9FF57] uppercase">
                  PROTECTION FOUND
                </span>
                <span className="font-mono text-xs text-[#9398A2]">SOL Downside Concentration</span>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#9398A2] uppercase">SUGGESTED ACTION</span>
                  <div className="text-lg font-bold text-[#F1F0EA] mt-1">BUY NO (SOL &gt; $250)</div>
                </div>
                <div>
                  <span className="text-[#9398A2] uppercase">BOUNDED COST</span>
                  <div className="text-lg font-bold text-[#B9FF57] mt-1">$43.00 USDC</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEQUENTIAL CONSTRAINT CHAIN */}
        <div className="mt-20 pt-12 border-t border-[#1A2029]">
          <span className="font-mono text-xs text-[#9398A2] uppercase tracking-wider block mb-8 text-center">
            DETERMINISTIC CONSTRAINT CHAIN & SAFETY RAIL
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 font-mono text-xs">
            {[
              { step: "1", label: "RESEARCHED", meta: "4 Agents", icon: Activity },
              { step: "2", label: "FORECASTED", meta: "68.4% AI", icon: Zap },
              { step: "3", label: "SIZED", meta: "$43 Max", icon: ShieldCheck },
              { step: "4", label: "POLICY CHECK ✓", meta: "PASS", icon: CheckCircle2 },
              { step: "5", label: "SIMULATED ✓", meta: "PASS", icon: CheckCircle2 },
              { step: "6", label: "YOU SIGN", meta: "Wallet", icon: Lock },
            ].map((c, idx) => (
              <div key={idx} className="hover-glow-card rounded border border-[#1A2029] bg-[#0C1016] p-4 text-center space-y-1">
                <div className="font-bold text-[#2878FF] text-xs">STEP 0{c.step}</div>
                <div className="font-bold text-[#F1F0EA] text-xs">{c.label}</div>
                <div className="text-[10px] text-[#9398A2]">{c.meta}</div>
              </div>
            ))}
          </div>

          {/* Strongest Trust Statement */}
          <div className="mt-12 text-center space-y-4">
            <h3 className="text-2xl font-extrabold text-[#F1F0EA] tracking-tight">
              “The agent can think. Your wallet still decides.”
            </h3>

            <Button asChild size="lg" className="font-mono text-sm font-bold bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-8 shadow-[0_0_25px_rgba(40,120,255,0.4)]">
              <Link href="/app">
                Open Parallax <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
