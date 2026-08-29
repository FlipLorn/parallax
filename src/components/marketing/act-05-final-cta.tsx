"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Act05FinalCta() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Does Parallax custody my wallet funds?",
      a: "No. Parallax is 100% non-custodial. All proposed protection actions and swaps are simulated and require your explicit wallet signature before onchain submission.",
    },
    {
      q: "Why use prediction markets instead of stop losses?",
      a: "Stop-losses only trigger after asset prices crash, creating slippage. Prediction markets allow hedging macro and event risk before price moves manifest onchain.",
    },
    {
      q: "Are the markets and AI forecasts real?",
      a: "Yes. In live mode, Parallax connects to Jupiter Prediction Market API orderbooks and Pyth oracle feeds.",
    },
    {
      q: "What makes the agent output trustworthy?",
      a: "Four specialist LLM models operate independently. Their predictions are combined using historical Brier score accuracy calibration rather than a single prompt output.",
    },
  ];

  return (
    <footer className="py-24 bg-[#070A0E] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center">
        {/* Minimal Final CTA */}
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#F1F0EA] sm:text-6xl">
            Know your risk before the market does.
          </h2>

          <div className="pt-4">
            <Button asChild size="lg" className="font-mono text-sm font-bold bg-[#2878FF] hover:bg-[#2878FF]/90 text-white px-10">
              <Link href="/app">
                Launch Parallax <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Compact Footer Disclosure (Collapsible FAQ) */}
        <div className="mt-24 pt-12 border-t border-[#1A2029] max-w-3xl mx-auto text-left">
          <span className="font-mono text-xs text-[#9398A2] uppercase tracking-wider block mb-6 text-center">
            SYSTEM DISCLOSURES & FREQUENTLY ASKED QUESTIONS
          </span>

          <div className="space-y-3 font-mono text-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded border border-[#1A2029] bg-[#0C1016]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-[#F1F0EA] hover:text-[#2878FF] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`size-4 text-[#9398A2] transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-4 pb-4 text-[#9398A2] leading-relaxed border-t border-[#1A2029] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center font-mono text-[11px] text-[#9398A2]">
            © {new Date().getFullYear()} PARALLAX INTELLIGENCE OS • BUILT FOR SOLANA HACKATHON
          </div>
        </div>
      </div>
    </footer>
  );
}
