"use client";

import {
  Connection,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";
import { getClientRpcUrl } from "./connection";

export type SolanaWalletProvider = {
  publicKey: { toBase58(): string } | null;
  connect?(): Promise<{ publicKey: { toBase58(): string } }>;
  disconnect?(): Promise<void>;
  signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
};

function decodeTransaction(base64: string) {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
  try {
    return VersionedTransaction.deserialize(bytes);
  } catch {
    return Transaction.from(bytes);
  }
}

export async function signAndSendBase64Transaction(
  wallet: SolanaWalletProvider,
  transactionBase64: string,
): Promise<string> {
  const connection = new Connection(getClientRpcUrl(), "confirmed");
  const transaction = decodeTransaction(transactionBase64);
  const signed = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signed.serialize(), {
    skipPreflight: false,
    preflightCommitment: "confirmed",
  });

  const latest = await connection.getLatestBlockhash("confirmed");
  await connection.confirmTransaction(
    {
      signature,
      blockhash: latest.blockhash,
      lastValidBlockHeight: latest.lastValidBlockHeight,
    },
    "confirmed",
  );

  return signature;
}

export function explorerUrl(signature: string) {
  return `https://solscan.io/tx/${signature}`;
}
