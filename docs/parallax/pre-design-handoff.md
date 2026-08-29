# Parallax Pre-Design Handoff

Date: 2026-08-29

## Current Instruction

Wait for the provided component libraries before starting visual design or implementation.

## Completed Prep

- Audited the workspace and confirmed it is currently empty and not a git repository.
- Converted the pasted Parallax prompt into a tighter product brief.
- Captured primary-source research constraints for Solana, Jupiter Prediction, Helius, Wallet Standard, Polymarket concepts, and financial-action UX.
- Created a component intake checklist to evaluate incoming UI libraries.

## Next Sequence After Components Arrive

1. Save or inspect the supplied component libraries in place.
2. Inventory components, dependencies, framework assumptions, styling primitives, accessibility support, and motion/chart/graph coverage.
3. Write `docs/parallax/component-audit.md` with `use`, `adapt`, and `reject` decisions.
4. Use brainstorming to convert the enhanced brief plus component audit into 2-3 product/design approaches.
5. Present the recommended approach for approval before implementation.
6. After approval, write `docs/superpowers/specs/2026-08-29-parallax-product-design.md`.
7. Self-review the design spec for placeholders, contradictions, ambiguous requirements, and scope creep.
8. Ask for review of the written spec.
9. After approval, create `docs/superpowers/plans/2026-08-29-parallax-implementation.md`.
10. Only then begin implementation.

## Non-Negotiable Build Principles

- The homepage sells the thesis; the app carries the product.
- Demo mode is mandatory and must feel intentional.
- Live API integrations must be adapter-backed with deterministic fallbacks.
- API keys stay server-side.
- Forecasting, PX Risk, relevance, and sizing use deterministic math.
- AI produces structured signals and summaries, not unchecked probabilities or trade sizes.
- Transaction flow must show max loss, max payout, fees, quote timestamp, policy checks, simulation status, and wallet signature boundary.
- U.S./restricted-region states must be handled without broken buttons.
- The visual language must stay warm, precise, editorial, data-rich, and clearly distinct from generic crypto UI.

## Files Created So Far

- `docs/parallax/repo-audit.md`
- `docs/parallax/enhanced-product-brief.md`
- `docs/parallax/research-notes.md`
- `docs/parallax/component-intake-checklist.md`
- `docs/parallax/pre-design-handoff.md`
