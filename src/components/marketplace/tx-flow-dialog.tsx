"use client";

import React, { useState } from "react";
import { CheckCircle2, ExternalLink, Loader2, Lock, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PrepareTransactionData } from "@/lib/aggregator/types";
import { explorerUrl, signAndSendBase64Transaction } from "@/lib/solana/sign-and-send";
import { useSolanaWallet } from "@/components/wallet/solana-wallet-provider";

function extractTransactionBase64(data: PrepareTransactionData): string | null {
  if (data.transactionBase64) return data.transactionBase64;
  if (typeof data.transaction === "string") return data.transaction;
  if (data.transaction && typeof data.transaction === "object") {
    return data.transaction.serializedTransaction ?? data.transaction.tx ?? null;
  }
  return null;
}

type TxFlowDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  prepareResult: PrepareTransactionData | null;
  prepareError: string | null;
  preparing: boolean;
  onRetryPrepare?: () => void;
};

export function TxFlowDialog({
  open,
  onClose,
  title,
  subtitle,
  prepareResult,
  prepareError,
  preparing,
  onRetryPrepare,
}: TxFlowDialogProps) {
  const { walletProvider, connected, connect } = useSolanaWallet();
  const [signing, setSigning] = useState(false);
  const [signError, setSignError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const transactionBase64 = prepareResult ? extractTransactionBase64(prepareResult) : null;
  const walletReady = prepareResult?.walletReady ?? false;
  const canSign = Boolean(transactionBase64 && walletReady && connected && walletProvider);

  const handleSign = async () => {
    if (!transactionBase64 || !walletProvider) return;
    setSigning(true);
    setSignError(null);
    try {
      if (!connected) await connect();
      const sig = await signAndSendBase64Transaction(walletProvider, transactionBase64);
      setSignature(sig);
    } catch (error) {
      setSignError(error instanceof Error ? error.message : "Transaction failed.");
    } finally {
      setSigning(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <Badge variant="default">MAGIC EDEN · AGGREGATOR</Badge>
                <h2 className="mt-2 text-xl font-semibold">{title}</h2>
                {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {preparing ? (
                <div className="flex items-center gap-2 rounded border border-border bg-background/70 p-4 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin text-primary" />
                  Validating listing and preparing wallet transaction…
                </div>
              ) : null}

              {prepareError ? (
                <div className="rounded border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  {prepareError}
                </div>
              ) : null}

              {prepareResult?.listing ? (
                <div className="grid grid-cols-2 gap-3 rounded border border-border bg-background/70 p-4 font-mono text-xs">
                  <div>
                    <p className="text-muted-foreground">Price</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{prepareResult.listing.priceSol} SOL</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Mint</p>
                    <p className="mt-1 truncate text-foreground">{prepareResult.listing.tokenMint}</p>
                  </div>
                </div>
              ) : null}

              {prepareResult && !walletReady ? (
                <div className="rounded border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100/90">
                  Transaction is not wallet-ready yet.
                  {prepareResult.diagnostics?.simulation?.err ? (
                    <span className="mt-1 block font-mono text-xs text-amber-200/80">
                      Simulation: {String(prepareResult.diagnostics.simulation.err)}
                    </span>
                  ) : null}
                  <span className="mt-2 block text-xs text-muted-foreground">
                    The Aggregator server must simulate the transaction before returning a signable payload. If this persists, check RPC configuration on the Aggregator deployment.
                  </span>
                </div>
              ) : null}

              {signError ? (
                <div className="rounded border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  {signError}
                </div>
              ) : null}

              {signature ? (
                <div className="rounded border border-emerald-500/30 bg-emerald-500/10 p-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="size-4" />
                    <span className="font-semibold">Transaction confirmed</span>
                  </div>
                  <a
                    href={explorerUrl(signature)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                  >
                    View on Solscan <ExternalLink className="size-3" />
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              {!signature && prepareResult && !preparing ? (
                <>
                  {onRetryPrepare ? (
                    <Button variant="outline" onClick={() => void onRetryPrepare()}>
                      Re-prepare
                    </Button>
                  ) : null}
                  {!connected ? (
                    <Button onClick={() => void connect()}>Connect Wallet</Button>
                  ) : (
                    <Button onClick={() => void handleSign()} disabled={!canSign || signing}>
                      {signing ? (
                        <Loader2 className="mr-2 size-4 animate-spin" />
                      ) : (
                        <Lock className="mr-2 size-4" />
                      )}
                      Sign & Submit
                    </Button>
                  )}
                </>
              ) : null}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
