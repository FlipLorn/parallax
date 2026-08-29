# Parallax Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working Parallax demo product with homepage, app shell, deterministic engines, adapted supplied components, and verified demo execution.

**Architecture:** Use Next.js App Router with typed fixtures, deterministic engines, provider adapters, and isolated client components for motion-heavy visuals. Keep product logic out of page files and adapt shadcn registry components into Parallax-specific components.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, Motion for React, GSAP, Lenis, Vitest, Playwright.

## Global Constraints

- Demo mode must work without API keys.
- API keys must stay server-side.
- Use supplied components as source material where they strengthen the experience.
- Do not ship raw generic component-library styling.
- Forecasting, PX Risk, relevance, recommendation, and sizing must be deterministic.
- Use warm neutral visual base with restrained signal color.
- Avoid generic crypto, purple-blue gradients, fake terminal copy, and dead buttons.

---

### Task 1: Scaffold Foundation

**Files:**

- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `components.json`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Create: `src/lib/utils.ts`

**Steps:**

- [ ] Create the Next.js/Tailwind/shadcn foundation.
- [ ] Install runtime and test dependencies.
- [ ] Run `pnpm lint` and `pnpm build`.

### Task 2: Domain Models And Engines

**Files:**

- Create: `src/lib/domain/types.ts`
- Create: `src/lib/domain/demo-data.ts`
- Create: `src/lib/engines/forecast.ts`
- Create: `src/lib/engines/risk.ts`
- Create: `src/lib/engines/sizing.ts`
- Create: `src/lib/engines/recommendation.ts`
- Create: `src/lib/engines/*.test.ts`

**Steps:**

- [ ] Write failing Vitest tests for forecast aggregation, PX Risk, sizing cap, and recommendation classification.
- [ ] Implement deterministic engines.
- [ ] Run `pnpm test`.

### Task 3: Install And Adapt Components

**Files:**

- Create or install: `src/components/ui/closing-plasma.tsx`
- Create or install: `src/components/ui/dithered-logo.tsx`
- Create or install: Watermelon components and shadcn primitives.
- Create: `src/components/brand/parallax-mark.svg`
- Create: `src/components/brand/parallax-logo.tsx`

**Steps:**

- [ ] Run the supplied shadcn commands where the scaffold supports them.
- [ ] Replace raw component copy, colors, radii, and icon behavior.
- [ ] Confirm components compile.

### Task 4: Homepage

**Files:**

- Create: `src/components/marketing/*`
- Modify: `src/app/page.tsx`

**Steps:**

- [ ] Build hero with Closing Plasma, Dithered Logo, event graph, and Launch App.
- [ ] Build scroll-driven exposure transformation.
- [ ] Build stats, market carousel, FAQ, and final CTA.
- [ ] Verify `/` in browser.

### Task 5: App Product Surface

**Files:**

- Create: `src/app/app/**`
- Create: `src/components/app/*`
- Create: `src/providers/*`

**Steps:**

- [ ] Build app shell and onboarding/demo analysis.
- [ ] Build overview, markets, market detail, risk graph, agents, positions, and replay.
- [ ] Build Ask Parallax command UI.
- [ ] Build review dialog and transaction progression.
- [ ] Verify routes in browser.

### Task 6: Final Verification

**Steps:**

- [ ] Run `pnpm test`.
- [ ] Run `pnpm lint`.
- [ ] Run `pnpm build`.
- [ ] Run browser QA with Playwright screenshots for desktop and mobile.
- [ ] Fix runtime, layout, responsiveness, and console errors.
