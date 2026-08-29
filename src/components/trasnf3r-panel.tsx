"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";

type StatusKind = "idle" | "ready" | "pending" | "success" | "error";

function isValidPubkey(value: string): boolean {
  try {
    const key = new PublicKey(value.trim());
    return key.toBase58().length > 0;
  } catch {
    return false;
  }
}

function parseAmount(value: string): number | null {
  const n = Number(value);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function formatSol(lamports: number): string {
  const sol = lamports / LAMPORTS_PER_SOL;
  return `${sol.toLocaleString("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
  })} SOL`;
}

const shell: CSSProperties = {
  margin: "0 auto",
  width: "100%",
  maxWidth: "36rem",
  padding: "4rem 1.5rem",
  color: "#e8e8e8",
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
};

const mono: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
};

const box: CSSProperties = {
  marginBottom: "2rem",
  padding: "1.25rem",
  border: "1px solid rgba(255,255,255,0.15)",
  background: "rgba(0,0,0,0.35)",
};

const input: CSSProperties = {
  ...mono,
  minHeight: "2.75rem",
  width: "100%",
  padding: "0 0.75rem",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.45)",
  color: "#e8e8e8",
  outline: "none",
};

const btn: CSSProperties = {
  ...mono,
  minHeight: "2.75rem",
  padding: "0 1rem",
  border: "1px solid rgba(255,255,255,0.35)",
  background: "transparent",
  color: "#e8e8e8",
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontSize: "0.7rem",
  cursor: "pointer",
};

export default function Trasnf3rPanel() {
  const searchParams = useSearchParams();
  const { connection } = useConnection();
  const { publicKey, connected, disconnect, sendTransaction } = useWallet();
  const { setVisible } = useWalletModal();

  const [to, setTo] = useState(() => searchParams.get("to") ?? "");
  const [amount, setAmount] = useState(() => searchParams.get("amount") ?? "");
  const [statusKind, setStatusKind] = useState<StatusKind>("idle");
  const [statusText, setStatusText] = useState("Ready.");
  const [signature, setSignature] = useState("—");
  const [balanceText, setBalanceText] = useState("—");

  const canSend =
    connected &&
    Boolean(publicKey) &&
    isValidPubkey(to) &&
    parseAmount(amount) !== null &&
    statusKind !== "pending";

  useEffect(() => {
    let cancelled = false;

    async function loadBalance() {
      if (!publicKey) {
        setBalanceText("—");
        return;
      }
      try {
        const lamports = await connection.getBalance(publicKey, "confirmed");
        if (!cancelled) setBalanceText(formatSol(lamports));
      } catch {
        if (!cancelled) setBalanceText("—");
      }
    }

    void loadBalance();
    return () => {
      cancelled = true;
    };
  }, [connection, publicKey, signature, statusKind]);

  async function handleSend() {
    if (!publicKey || !canSend) return;

    setStatusKind("pending");
    setStatusText("Building transfer…");
    setSignature("—");

    try {
      const toPubkey = new PublicKey(to.trim());
      const sol = parseAmount(amount);
      if (sol === null) throw new Error("Enter a valid amount greater than zero.");
      const lamports = Math.round(sol * LAMPORTS_PER_SOL);
      if (lamports <= 0) throw new Error("Amount must be greater than zero.");

      const { blockhash, lastValidBlockHeight } =
        await connection.getLatestBlockhash("confirmed");

      const transaction = new Transaction({
        feePayer: publicKey,
        blockhash,
        lastValidBlockHeight,
      }).add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey,
          lamports,
        }),
      );

      setStatusText("Awaiting wallet approval…");

      const sig = await sendTransaction(transaction, connection, {
        skipPreflight: false,
        preflightCommitment: "confirmed",
        maxRetries: 3,
      });

      setSignature(sig);
      setStatusText(`Submitted ${sig.slice(0, 8)}… confirming`);

      const start = Date.now();
      let confirmed = false;
      while (Date.now() - start < 90_000) {
        const { value } = await connection.getSignatureStatuses([sig]);
        const status = value[0];
        if (status?.err) {
          throw new Error(`On-chain error: ${JSON.stringify(status.err)}`);
        }
        if (
          status?.confirmationStatus === "confirmed" ||
          status?.confirmationStatus === "finalized"
        ) {
          confirmed = true;
          break;
        }
        const height = await connection.getBlockHeight("confirmed");
        if (height > lastValidBlockHeight) {
          throw new Error("Transaction expired before confirmation.");
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      if (!confirmed) throw new Error("Timed out waiting for confirmation.");

      setStatusKind("success");
      setStatusText("Transfer confirmed.");
    } catch (error) {
      setStatusKind("error");
      setStatusText(error instanceof Error ? error.message : "Transfer failed.");
    }
  }

  return (
    <div
      id="trasnf3r-root"
      data-testid="trasnf3r-root"
      data-connected={connected ? "true" : "false"}
      data-status={statusKind}
      style={shell}
    >
      <header style={{ marginBottom: "2.5rem" }}>
        <p style={{ ...mono, fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6 }}>
          Wallet transfer
        </p>
        <h1 style={{ margin: "0.5rem 0 0", fontSize: "2.5rem", fontWeight: 700 }}>trasnf3r</h1>
        <p style={{ marginTop: "0.75rem", opacity: 0.7, maxWidth: "28rem" }}>
          Non-custodial Solana mainnet SOL transfer. Signing stays in your wallet.
        </p>
      </header>

      <section aria-label="Wallet" style={box}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
          <code
            id="trasnf3r-wallet"
            data-testid="trasnf3r-wallet"
            style={{ ...mono, flex: 1, minWidth: 0, fontSize: "0.75rem", wordBreak: "break-all", opacity: 0.85 }}
          >
            {publicKey ? publicKey.toBase58() : "not-connected"}
          </code>
          <button
            id="trasnf3r-connect"
            data-testid="trasnf3r-connect"
            type="button"
            disabled={connected}
            onClick={() => setVisible(true)}
            style={{ ...btn, opacity: connected ? 0.4 : 1 }}
          >
            Connect
          </button>
          <button
            id="trasnf3r-disconnect"
            data-testid="trasnf3r-disconnect"
            type="button"
            disabled={!connected}
            onClick={() => void disconnect()}
            style={{ ...btn, opacity: !connected ? 0.4 : 1 }}
          >
            Disconnect
          </button>
        </div>
        <p style={{ ...mono, marginTop: "1rem", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}>
          Balance{" "}
          <span id="trasnf3r-balance" data-testid="trasnf3r-balance" style={{ opacity: 1, color: "#fff" }}>
            {balanceText}
          </span>
        </p>
      </section>

      <section aria-label="Transfer form" style={box}>
        <label style={{ display: "block", marginBottom: "1.25rem" }}>
          <span style={{ ...mono, display: "block", marginBottom: "0.5rem", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
            Recipient
          </span>
          <input
            id="trasnf3r-to"
            data-testid="trasnf3r-to"
            name="to"
            autoComplete="off"
            spellCheck={false}
            value={to}
            onChange={(event) => setTo(event.target.value)}
            style={input}
            placeholder="Base58 pubkey"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1.25rem" }}>
          <span style={{ ...mono, display: "block", marginBottom: "0.5rem", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.55 }}>
            Amount (SOL)
          </span>
          <input
            id="trasnf3r-amount"
            data-testid="trasnf3r-amount"
            name="amount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            style={input}
            placeholder="0.01"
          />
        </label>

        <button
          id="trasnf3r-send"
          data-testid="trasnf3r-send"
          type="button"
          disabled={!canSend}
          onClick={() => void handleSend()}
          style={{
            ...btn,
            width: "100%",
            minHeight: "3rem",
            fontSize: "0.85rem",
            opacity: canSend ? 1 : 0.4,
            cursor: canSend ? "pointer" : "not-allowed",
          }}
        >
          {statusKind === "pending" ? "Sending…" : "Send SOL"}
        </button>
      </section>

      <section aria-label="Status" style={{ ...box, marginBottom: 0 }}>
        <p
          id="trasnf3r-status"
          data-testid="trasnf3r-status"
          data-kind={statusKind}
          style={{ ...mono, fontSize: "0.875rem", margin: 0 }}
        >
          {statusText}
        </p>
        <p style={{ ...mono, marginTop: "1rem", marginBottom: "0.35rem", fontSize: "0.65rem", letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.5 }}>
          Signature
        </p>
        <code
          id="trasnf3r-signature"
          data-testid="trasnf3r-signature"
          style={{ ...mono, display: "block", fontSize: "0.75rem", wordBreak: "break-all", opacity: 0.75 }}
        >
          {signature}
        </code>
      </section>

      <style>{`
        .wallet-adapter-modal-wrapper { z-index: 10000 !important; }
      `}</style>
    </div>
  );
}
