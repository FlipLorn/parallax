"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Search,
  Command,
  ShieldCheck,
  TrendingUp,
  Brain,
  Sliders,
  Sparkles,
  ChevronDown,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { walletProfiles } from "@/lib/domain/demo-data";
import type { ArchetypeId } from "@/lib/domain/types";
import { AppOnboardingTour } from "@/components/app/app-onboarding-tour";
import { WalletConnectButton } from "@/components/wallet/wallet-connect-button";

export function AppNav({ onOpenAsk }: { onOpenAsk: () => void }) {
  const pathname = usePathname();
  const [selectedProfileId, setSelectedProfileId] = useState<ArchetypeId>("sol_whale");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const activeProfile = walletProfiles.find((p) => p.id === selectedProfileId) || walletProfiles[0];

  const navLinks = [
    { href: "/app", label: "Overview" },
    { href: "/app/markets", label: "Markets" },
    { href: "/app/marketplace", label: "NFT Desk" },
    { href: "/app/risk", label: "Risk Graph" },
    { href: "/app/agents", label: "Agents" },
    { href: "/app/positions", label: "Positions" },
    { href: "/app/replay", label: "Replay" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      {/* Main app bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight group">
            <img
              src="/parallax-mark.svg"
              alt="Parallax Logo Mark"
              className="size-7 rounded-lg shadow-[0_0_12px_rgba(37,99,235,0.5)] group-hover:scale-105 transition-transform duration-200"
            />
            <span className="font-mono text-sm font-bold tracking-wider text-white">PARALLAX</span>
          </Link>

          {/* Nav links */}
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Ask Parallax ⌘K Button */}
          <button
            onClick={onOpenAsk}
            className="flex items-center gap-2 rounded border border-border bg-card/80 px-3 py-1.5 font-mono text-xs text-muted-foreground hover:border-primary hover:text-foreground transition-all"
          >
            <Search className="size-3.5 text-primary" />
            <span className="hidden sm:inline">Ask Parallax</span>
            <kbd className="rounded border border-border bg-secondary px-1 text-[10px]">⌘K</kbd>
          </button>

          {/* App Tour & Walkthrough */}
          <AppOnboardingTour />

          <WalletConnectButton />

          {/* Portfolio Archetype Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 rounded border border-border bg-card/90 px-3 py-1.5 font-mono text-xs font-medium text-foreground hover:border-primary transition-all"
            >
              <Wallet className="size-3.5 text-primary" />
              <span className="max-w-[120px] truncate">{activeProfile.name}</span>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-64 rounded-md border border-border bg-card p-2 shadow-xl z-50">
                <p className="px-2 py-1 font-mono text-[10px] font-semibold uppercase text-muted-foreground">
                  Switch Wallet Archetype
                </p>
                <div className="mt-1 space-y-1">
                  {walletProfiles.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProfileId(p.id);
                        setShowProfileDropdown(false);
                      }}
                      className={`w-full rounded p-2 text-left transition-colors font-mono text-xs ${
                        p.id === selectedProfileId ? "bg-primary/20 text-primary font-semibold" : "hover:bg-secondary text-foreground"
                      }`}
                    >
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">${p.portfolioValue.toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
