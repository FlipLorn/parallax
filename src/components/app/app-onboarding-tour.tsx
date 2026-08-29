"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Brain,
  Sliders,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TOUR_STEPS = [
  {
    step: 1,
    title: "Portfolio Event Exposure Indexing",
    badge: "STEP 1 OF 4",
    icon: ShieldCheck,
    description:
      "Parallax connects your read-only Solana wallet holdings (SOL, JUP, USDC) and maps them against live prediction markets to uncover invisible directional bets.",
    highlight: "Your token allocation is translated into event sensitivity vectors.",
  },
  {
    step: 2,
    title: "Multi-Agent AI Quorum",
    badge: "STEP 2 OF 4",
    icon: Brain,
    description:
      "Four specialist agent models (Onchain Flow, Quant Regime, News Impact, Macro Tape) independently research events. Outputs are combined by historical Brier score accuracy weights.",
    highlight: "Statistical Brier scores ensure models are transparently calibrated.",
  },
  {
    step: 3,
    title: "PX Risk Score & Policy Bounding",
    badge: "STEP 3 OF 4",
    icon: Sliders,
    description:
      "The proprietary PX Risk Score (0-100) measures portfolio vulnerability across 6 components. Every recommendation is strictly bounded by user risk policy caps ($65 max position, $150 daily budget).",
    highlight: "No unchecked trade sizes. Risk policy limits are enforced automatically.",
  },
  {
    step: 4,
    title: "Deterministic Solana Execution",
    badge: "STEP 4 OF 4",
    icon: Sparkles,
    description:
      "Before any transaction exists, Parallax quotes prediction orderbook liquidity, runs Monte Carlo stress simulations, and prepares the transaction for your non-custodial wallet signature.",
    highlight: "Full control stays in your wallet. You review, simulate, and sign.",
  },
];

export function AppOnboardingTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const handleComplete = () => {
    localStorage.setItem("parallax_tour_completed", "true");
    setIsOpen(false);
  };

  const currentStep = TOUR_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;

  return (
    <>
      {/* Trigger Button in App Header */}
      <button
        onClick={() => {
          setCurrentStepIndex(0);
          setIsOpen(true);
        }}
        className="flex items-center gap-1.5 rounded border border-border bg-card/80 px-2.5 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary hover:text-foreground transition-all"
        title="App Tour & Walkthrough"
      >
        <HelpCircle className="size-3.5 text-primary" />
        <span className="hidden sm:inline">Tour</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-2xl"
            >
              {/* Top header */}
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="lime" className="font-mono text-[10px]">
                    {currentStep.badge}
                  </Badge>
                  <span className="font-mono text-xs uppercase text-muted-foreground">App Walkthrough</span>
                </div>
                <button
                  onClick={handleComplete}
                  className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Step Card Content */}
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded bg-primary/15 text-primary border border-primary/30">
                    <StepIcon className="size-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{currentStep.title}</h2>
                </div>

                <p className="mt-4 text-xs leading-6 text-muted-foreground">{currentStep.description}</p>

                <div className="mt-4 rounded border border-primary/30 bg-primary/10 p-3 font-mono text-xs text-primary">
                  💡 {currentStep.highlight}
                </div>
              </div>

              {/* Progress Dots & Buttons */}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5">
                  {TOUR_STEPS.map((_, i) => (
                    <span
                      key={i}
                      className={`size-2 rounded-full transition-all ${
                        i === currentStepIndex ? "w-6 bg-primary" : "bg-secondary"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {currentStepIndex > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentStepIndex((prev) => prev - 1)}
                      className="font-mono text-xs"
                    >
                      <ArrowLeft className="mr-1 size-3" /> Back
                    </Button>
                  )}

                  {currentStepIndex < TOUR_STEPS.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={() => setCurrentStepIndex((prev) => prev + 1)}
                      className="font-mono text-xs font-semibold bg-primary"
                    >
                      Proceed <ArrowRight className="ml-1 size-3" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={handleComplete}
                      className="font-mono text-xs font-semibold bg-emerald-600 hover:bg-emerald-500"
                    >
                      Get Started <CheckCircle2 className="ml-1 size-3" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
