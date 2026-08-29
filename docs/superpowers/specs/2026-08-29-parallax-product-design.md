# Parallax Product Design Spec

Date: 2026-08-29

## Goal

Build Parallax as a polished hackathon product with a public homepage and a real app surface for Solana event-risk intelligence, deterministic demo mode, market discovery, agent forecasts, PX Risk, recommendations, and simulated execution.

## Stack

- Next.js App Router with TypeScript.
- pnpm package manager.
- Tailwind CSS and shadcn-owned components.
- Motion for React for UI transitions.
- GSAP and Lenis only for scroll-driven sequences that need pinned/parallax behavior.
- Deterministic local fixtures and engines for the hackathon demo.

## Routes

- `/`: public homepage.
- `/app`: app overview and first-launch/demo analysis.
- `/app/markets`: market discovery.
- `/app/markets/[id]`: market detail.
- `/app/risk`: interactive risk graph.
- `/app/agents`: agent performance.
- `/app/positions`: positions dashboard.
- `/app/replay`: forecast replay.

## Public Homepage

The homepage must communicate the thesis fast: "Your portfolio is betting on events you never chose."

Sections:

- Floating Parallax navigation adapted from `navigation-6`.
- Hero with `ClosingPlasma` background and event graph overlay.
- Launch App CTA that opens into an app preview sequence, not a dead link.
- Scroll-driven hidden exposure transformation using the Osmo parallax pattern.
- How Parallax works as a system diagram.
- Agent committee preview.
- PX Risk preview.
- Market carousel adapted from `minimal-carousel`.
- Execution and trust strip.
- FAQ adapted from `faq-5`.

## App Experience

The app must feel more dense and operational than the homepage.

Required flows:

- Wallet disconnected state with Analyze Wallet and Use Demo Portfolio.
- Demo portfolio mode with SOL, JUP, JTO, USDC, and SOL/USDC LP exposure.
- Fast analysis sequence that reveals structured intermediate work.
- Overview feed with material event risks.
- Risk graph with asset, protocol, event, and market nodes.
- Market detail with probability history, agent committee, recommendation, and review action.
- Review dialog with max loss, max payout, fees, policy checks, simulation status, and signature boundary.
- Transaction progression ending in Protection Active.
- Ask Parallax command interface that generates UI results.

## Data And Engines

Create typed domain models and deterministic engines:

- Forecast engine combines market baseline and agent signals through fixed weights.
- PX Risk engine combines concentration, volatility, event sensitivity, correlation, liquidity, protection, and confidence.
- Sizing engine applies model edge, confidence, event correlation, liquidity, portfolio cap, and risk policy.
- Recommendation engine returns only Protection, Opportunity, or Watch.

## Integration Boundaries

- `PredictionProvider` supports Jupiter live mode and deterministic demo mode.
- `PortfolioProvider` supports Solana/Helius live mode and deterministic demo mode.
- API keys stay server-side.
- Restricted or missing live APIs never create dead buttons.

## Visual System

- Warm tactile base: `#F2F0E9`, `#FAF9F5`, `#EAE8E1`.
- Ink: `#111111`, `#51504B`, `#77756F`.
- Border: `#D5D2CA`.
- Primary signal: deep electric cobalt.
- Positive: acidic green.
- Negative: warm vermilion.
- Warning: amber.
- Radius scale: 4-8px for most components, with pills only for true command/status controls.
- Typography: Geist Sans and Geist Mono. Tabular numerals for probabilities and money.

## Motion System

- Motion must communicate computation and change.
- Use number interpolation, graph edge reveals, agent arrivals, timeline scrubbing, and transaction progression.
- Avoid decorative loops except subtle hero plasma and meaningful scanning.
- Reduced motion must preserve all content without scroll hijack dependence.

## Trust And Safety

- Use "estimate", "forecast", "model", "signal", and "market-implied".
- Never imply guaranteed profit.
- Always show live/demo/restricted status.
- Always show quote timestamp, potential loss, max payout, simulation status, and user signature boundary.

## Acceptance Criteria

- Homepage and app routes render without runtime errors.
- Demo path completes without credentials.
- Launch App and Use Demo Portfolio both work.
- Market detail can generate protection and reach Protection Active in demo mode.
- Components from the supplied libraries are installed or recreated from their registries and visibly adapted.
- Build and lint pass, or documented blockers are explicit.
- Browser QA checks desktop and mobile layouts.
