"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { SolanaWalletProvider } from "@/lib/solana/sign-and-send";

type WalletContextValue = {
  publicKey: string | null;
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  walletProvider: SolanaWalletProvider | null;
};

const WalletContext = createContext<WalletContextValue | null>(null);

function getPhantomProvider(): SolanaWalletProvider | null {
  if (typeof window === "undefined") return null;
  const provider = window.phantom?.solana ?? window.solana;
  if (!provider?.connect) return null;
  return provider as SolanaWalletProvider;
}

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [walletProvider, setWalletProvider] = useState<SolanaWalletProvider | null>(null);

  useEffect(() => {
    const provider = getPhantomProvider();
    setWalletProvider(provider);
    if (provider?.publicKey) {
      setPublicKey(provider.publicKey.toBase58());
    }
  }, []);

  const connect = useCallback(async () => {
    const provider = getPhantomProvider();
    if (!provider) {
      window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
      throw new Error("Phantom wallet not found. Install Phantom and refresh.");
    }

    setConnecting(true);
    try {
      const response = await provider.connect!();
      setWalletProvider(provider);
      setPublicKey(response.publicKey.toBase58());
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    const provider = getPhantomProvider();
    await provider?.disconnect?.();
    setPublicKey(null);
  }, []);

  const value = useMemo(
    () => ({
      publicKey,
      connecting,
      connected: Boolean(publicKey),
      connect,
      disconnect,
      walletProvider,
    }),
    [publicKey, connecting, connect, disconnect, walletProvider],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useSolanaWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useSolanaWallet must be used within SolanaWalletProvider");
  }
  return context;
}

declare global {
  interface Window {
    phantom?: { solana?: SolanaWalletProvider & { isPhantom?: boolean; connect(): Promise<{ publicKey: { toBase58(): string } }>; disconnect?(): Promise<void> } };
    solana?: SolanaWalletProvider & { isPhantom?: boolean; connect(): Promise<{ publicKey: { toBase58(): string } }>; disconnect?(): Promise<void> };
  }
}
