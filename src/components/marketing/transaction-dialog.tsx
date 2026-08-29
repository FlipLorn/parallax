"use client";

import { AlertTriangle, Check, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { positionSizing, transactionSteps } from "@/lib/domain/demo-data";

export function TransactionDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          Review protection <LockKeyhole />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Badge variant="red" className="w-fit">Signature required</Badge>
          <AlertDialogTitle>Buy NO as portfolio protection</AlertDialogTitle>
          <AlertDialogDescription>
            Parallax never submits this transaction automatically. Review max loss, payout, and policy caps before opening the wallet signature step.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-3 rounded-md border border-border bg-secondary p-4 sm:grid-cols-3">
          <Metric label="Size" value={`$${positionSizing.finalUsd}`} />
          <Metric label="Max loss" value={`$${positionSizing.finalUsd}`} />
          <Metric label="Model raw" value={`$${positionSizing.rawModelUsd}`} />
        </div>
        <div className="grid gap-2">
          {transactionSteps.map((step) => (
            <div key={step.step} className="flex items-center gap-3 rounded-md border border-border p-3 text-sm">
              <span className={step.complete ? "grid size-7 place-items-center rounded bg-primary text-primary-foreground" : "grid size-7 place-items-center rounded bg-secondary text-muted-foreground"}>
                {step.complete ? <Check className="size-4" /> : <AlertTriangle className="size-4" />}
              </span>
              {step.label}
            </div>
          ))}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction>Open wallet preview</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
