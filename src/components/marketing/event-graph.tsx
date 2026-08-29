"use client";

import { motion } from "motion/react";
import { Brain, CircleDollarSign, DatabaseZap, Landmark, WalletCards } from "lucide-react";
import { IconCell } from "@/components/brand/icon-cell";

const cells = [
  { icon: WalletCards, label: "wallet", active: true },
  { icon: DatabaseZap, label: "helius" },
  { icon: Brain, label: "agents", active: true },
  { icon: Landmark, label: "markets" },
  { icon: CircleDollarSign, label: "size" },
];

export function EventGraph() {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-md border border-border bg-card/72 p-4 text-foreground shadow-[0_0_60px_rgba(36,88,255,0.16)] backdrop-blur">
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_1px_1px,var(--primary)_1px,transparent_0)] [background-size:18px_18px]" />
      <div className="relative grid gap-3 sm:grid-cols-5">
        {cells.map((cell, index) => (
          <motion.div
            key={cell.label}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <IconCell
              icon={cell.icon}
              label={cell.label}
              active={cell.active}
              className="border-border bg-background/50 text-foreground hover:border-primary"
            />
          </motion.div>
        ))}
      </div>
      <div className="relative mt-6 grid gap-3 md:grid-cols-[1fr_0.82fr]">
        <motion.div
          className="rounded-md border border-border bg-background/64 p-4"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.28 }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            <span>PX Risk</span>
            <span>72 HIGH</span>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded bg-secondary">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "72%" }}
              transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
            {["Exposure", "Liquidity", "Confidence"].map((label, index) => (
              <div key={label} className="rounded border border-border bg-card/55 p-3">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">{label}</div>
                <div className="mt-2 text-xl font-semibold">{[82, 38, 81][index]}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="rounded-md border border-primary/40 bg-primary/12 p-4 text-foreground"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            review packet
          </div>
          <h3 className="mt-3 text-2xl font-semibold leading-tight">Buy NO as protection</h3>
          <div className="mt-5 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-border pb-2">
              <span>Max loss</span>
              <span>$65</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>Max payout</span>
              <span>$116</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span>Requires</span>
              <span>wallet signature</span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-5 left-5 right-5 h-px bg-primary/35"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 1.1 }}
      />
    </div>
  );
}
