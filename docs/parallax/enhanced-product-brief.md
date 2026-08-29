# Parallax Enhanced Product Brief

Date: 2026-08-29

## One-Line Product

Parallax is an autonomous event-risk intelligence layer for Solana portfolios: it maps what a user owns to real-world and market-priced events, forecasts portfolio impact, recommends bounded protection or opportunity actions, simulates the action, and leaves execution under user signature.

## Core Question

What could happen to what I own, and what should I do about it?

## Product Position

Parallax is not a prediction market clone, a token dashboard, or a chatbot. It combines:

- Portfolio understanding: what the wallet owns and what those assets are exposed to.
- Market probability: what event markets currently imply.
- Agent research: structured specialist signals, not hidden chain-of-thought.
- Deterministic engines: forecast aggregation, PX Risk, relevance, sizing, and recommendations.
- User-controlled execution: researched, sized, simulated, then signed by the user.

## Surfaces

### Public Website

Purpose: make the problem obvious within 15 seconds and move qualified users to the app.

Required first impression:

- Thesis: "Your portfolio is betting on events you never chose."
- Product visual: interactive portfolio-to-event graph, not a static illustration.
- CTA hierarchy: Launch App first, Explore Markets second.
- Tone: precise, financial, restrained, and trust-building.

### Application

Purpose: provide the actual event-risk operating system.

Required first impression:

- More data-dense and operational than the homepage.
- Demo portfolio works without credentials or a wallet.
- Wallet flow never dead-ends.
- Analysis sequence reveals structured intermediate work.
- Every financial action shows potential loss, timestamp, simulation status, and user approval boundary.

## Demo Story

The first build should optimize for this 90-second path:

1. Open homepage and understand hidden event exposure.
2. Launch the app.
3. Use demo portfolio if no wallet is connected.
4. Watch analysis identify three material event risks.
5. Open a SOL-related event.
6. Compare MARKET, PARALLAX, EDGE, confidence, and personal exposure.
7. Inspect agent committee disagreement.
8. Open the risk graph and click the SOL event cluster.
9. Generate protection.
10. Review a bounded NO action.
11. Simulate transaction.
12. Sign a demo transaction.
13. See protection active and PX Risk improve.
14. Open Replay or Agents to prove auditability.

## Must-Have Product Mechanics

- Typed domain model for assets, protocols, events, markets, agents, forecasts, risks, recommendations, positions, transactions, and user risk policy.
- Prediction provider adapter with live Jupiter Prediction API path and deterministic fallback path.
- Portfolio provider adapter with live Solana wallet/indexing path and deterministic demo portfolio path.
- AI provider abstraction that only handles classification, evidence extraction, structured signals, summaries, and command interpretation.
- Forecast engine that combines normalized signals by deterministic weights.
- PX Risk engine with visible components: concentration, event sensitivity, correlation, liquidity, protection, and confidence.
- Sizing engine that bounds recommendations through model edge, confidence, correlation, liquidity, portfolio cap, and risk policy.
- Review drawer with quote, max loss, max payout, policy checks, and simulation status.
- Transaction state machine from preparing through confirmed or failed.

## Design Intent To Preserve

Visual language:

- Editorial financial intelligence.
- Research terminal discipline.
- Precision industrial software.
- Warm tactile base with restrained signal colors.

Avoid:

- Purple-to-blue gradient crypto styling.
- Giant AI sphere.
- Generic dark SaaS.
- Component showcase.
- Fake terminal theatrics.
- Identical rounded card grids.
- Unbounded AI trade decisions.

## Language Rules

Use:

- estimate
- forecast
- model
- signal
- confidence
- market-implied
- simulation passed
- wallet signature required

Avoid:

- knows the future
- guaranteed profit
- trade smarter with AI
- future of prediction markets
- unlock powerful insights

## Deferred Until Component Libraries Arrive

- Exact stack and component system.
- Homepage composition details.
- App shell layout.
- Visual hierarchy and motion vocabulary.
- Concrete implementation plan.

## Component Selection Criteria

A component is useful if it improves one of these workflows:

- Interactive event graph.
- Probability and forecast comparison.
- Market list filtering and search.
- Market detail charting.
- Agent committee visualization.
- Recommendation review.
- Transaction state progression.
- Replay timeline.
- Command-generated UI.

A component is rejected if it mainly adds decoration, generic cards, landing-page spectacle, or visual inconsistency.
