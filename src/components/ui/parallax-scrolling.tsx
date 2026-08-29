"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Brain, ChartNoAxesCombined, KeyRound, ShieldCheck, WalletCards } from "lucide-react";
import { useRef } from "react";
import { IconCell } from "@/components/brand/icon-cell";
import { launchSteps } from "@/lib/domain/demo-data";

export function ParallaxComponent() {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.08, 0.88], [0, 1]);
  const fieldY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-42, 42]);
  const icons = [WalletCards, Brain, ShieldCheck, ChartNoAxesCombined, KeyRound];

  return (
    <section
      id="product"
      ref={rootRef}
      className="relative isolate overflow-hidden border-y border-border bg-background/78 py-24"
    >
      <motion.div
        aria-hidden="true"
        style={{ y: fieldY }}
        className="absolute inset-x-0 top-0 -z-10 h-[120%] bg-[url('/obsidian-field.svg')] bg-cover bg-center opacity-70"
      />
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Product pass
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight text-balance md:text-6xl">
              The scroll is the decision path.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">
              Each state exposes what the system knows before the wallet is ever asked to sign.
            </p>
          </div>
          <div className="relative grid gap-4">
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute left-7 top-10 hidden h-[calc(100%-5rem)] w-px origin-top bg-primary/70 md:block"
            />
            {launchSteps.map((step, index) => {
              const Icon = icons[index] ?? ShieldCheck;
              return (
                <ScrollStep
                  key={step.label}
                  index={index}
                  icon={Icon}
                  label={step.label}
                  title={step.title}
                  body={step.body}
                  progress={scrollYProgress}
                  reduced={Boolean(prefersReducedMotion)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollStep({
  index,
  icon,
  label,
  title,
  body,
  progress,
  reduced,
}: {
  index: number;
  icon: typeof WalletCards;
  label: string;
  title: string;
  body: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
}) {
  const start = 0.14 + index * 0.15;
  const y = useTransform(progress, [start - 0.18, start + 0.14], reduced ? [0, 0] : [42, -8]);
  const opacity = useTransform(progress, [start - 0.18, start - 0.02, start + 0.18], [0.72, 1, 1]);

  return (
    <motion.article
      style={{ y, opacity }}
      className="relative rounded-md border border-border bg-card/92 p-4 shadow-[0_0_34px_rgba(36,88,255,0.14)] backdrop-blur"
    >
      <div className="grid gap-5 sm:grid-cols-[112px_1fr]">
        <IconCell icon={icon} label={label} active={index === 2} className="min-h-28" />
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            State 0{index + 1}
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-foreground">{title}</h3>
          <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">{body}</p>
        </div>
      </div>
    </motion.article>
  );
}
