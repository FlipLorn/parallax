"use client";

import { Wallet, Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSolanaWallet } from "@/components/wallet/solana-wallet-provider";

function shortenAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

export function WalletConnectButton() {
  const { publicKey, connecting, connected, connect, disconnect } = useSolanaWallet();

  if (connected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden rounded border border-border bg-background/80 px-2 py-1 font-mono text-[10px] text-muted-foreground sm:inline">
          {shortenAddress(publicKey)}
        </span>
        <Button variant="outline" size="sm" onClick={() => void disconnect()} className="font-mono text-xs">
          <LogOut className="mr-1.5 size-3.5" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" onClick={() => void connect()} disabled={connecting} className="font-mono text-xs">
      {connecting ? <Loader2 className="mr-1.5 size-3.5 animate-spin" /> : <Wallet className="mr-1.5 size-3.5" />}
      Connect Phantom
    </Button>
  );
}
