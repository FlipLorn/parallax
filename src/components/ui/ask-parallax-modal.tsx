"use client";

import React, { useState, useEffect } from "react";
import { Command, Search, Sparkles, Terminal, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { parseAskCommand } from "@/lib/domain/demo-data";
import type { CommandResult } from "@/lib/domain/types";
import { TransactionSimulatorDrawer } from "@/components/ui/transaction-simulator-drawer";

export function AskParallaxModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CommandResult | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled externally
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = parseAskCommand(query);
    setResult(res);
  };

  const handleQuickPrompt = (txt: string) => {
    setQuery(txt);
    setResult(parseAskCommand(txt));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-background/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="relative w-full max-w-2xl rounded-lg border border-border bg-card p-4 shadow-2xl"
        >
          {/* Header & input form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-border pb-3">
            <Search className="size-4 text-primary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask Parallax (e.g. Protect $50 against SOL downside)..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-mono"
              autoFocus
            />
            <button type="button" onClick={onClose} className="rounded p-1 text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </form>

          {/* Quick prompts */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase text-muted-foreground">Quick queries:</span>
            <button
              type="button"
              onClick={() => handleQuickPrompt("Protect $50 against SOL downside")}
              className="rounded bg-secondary/80 px-2 py-1 font-mono text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Protect $50 SOL downside
            </button>
            <button
              type="button"
              onClick={() => handleQuickPrompt("Show high confidence agent edge")}
              className="rounded bg-secondary/80 px-2 py-1 font-mono text-[11px] text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Show high agent edge
            </button>
          </div>

          {/* Result card output */}
          {result && (
            <div className="mt-4 rounded-md border border-border bg-background/90 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em]">
                  Generated Intelligence Card
                </span>
                {result.confidenceScore && (
                  <Badge variant="lime" className="ml-auto">
                    {result.confidenceScore}% CONFIDENCE
                  </Badge>
                )}
              </div>

              <p className="mt-3 text-xs leading-5 text-muted-foreground">{result.summary}</p>

              {result.recommendedMarketId && (
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-muted-foreground">Target Action</span>
                    <p className="font-mono text-xs font-semibold">{result.suggestedSide} on SOL Market</p>
                  </div>
                  <TransactionSimulatorDrawer
                    marketTitle="SOL above $220 by Friday close"
                    side={result.suggestedSide || "NO"}
                    suggestedUsd={result.suggestedUsd || 43}
                    triggerText="Simulate & Review"
                  />
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
