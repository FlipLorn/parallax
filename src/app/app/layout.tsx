"use client";

import React, { useState } from "react";
import { AppNav } from "@/components/app/app-nav";
import { AskParallaxModal } from "@/components/ui/ask-parallax-modal";
import { SolanaWalletProvider } from "@/components/wallet/solana-wallet-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isAskOpen, setIsAskOpen] = useState(false);

  return (
    <SolanaWalletProvider>
      <div className="min-h-screen bg-background text-foreground">
        <AppNav onOpenAsk={() => setIsAskOpen(true)} />
        <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
        <AskParallaxModal isOpen={isAskOpen} onClose={() => setIsAskOpen(false)} />
      </div>
    </SolanaWalletProvider>
  );
}
