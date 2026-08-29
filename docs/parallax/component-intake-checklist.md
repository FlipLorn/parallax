# Component Library Intake Checklist

Date: 2026-08-29

Use this checklist when the component libraries arrive. Do not start Parallax design before this review is complete.

## Inventory

- Library name and source.
- Framework and runtime assumptions.
- Package manager and install steps.
- Required peer dependencies.
- Styling system and token strategy.
- Accessibility primitives.
- Motion primitives.
- Chart, graph, table, drawer, command palette, and navigation primitives.
- License or usage notes if supplied.

## Fit Assessment

Rate each component as `use`, `adapt`, or `reject`.

- Homepage graph visual.
- Homepage scroll transformation.
- Navigation and Launch App CTA.
- App shell navigation.
- Wallet/demo onboarding.
- Analysis sequence.
- Overview event feed.
- PX Risk metric and component breakdown.
- Risk graph.
- Market discovery.
- Market detail chart.
- Agent committee visualization.
- Recommendation panel.
- Review drawer.
- Transaction progression.
- Ask Parallax command interface.
- Positions dashboard.
- Replay timeline.

## Rejection Criteria

Reject or heavily rewrite components that:

- Look like generic crypto/Solana marketing.
- Force purple-blue gradients or dark SaaS defaults.
- Produce a component showcase instead of a workflow.
- Rely on fake terminal code as decoration.
- Use oversized rounded cards everywhere.
- Hide financial risk details.
- Break keyboard navigation or focus visibility.
- Make the app feel less serious, less dense, or less trustworthy.

## Output After Intake

After intake, create:

- `docs/parallax/component-audit.md`
- `docs/superpowers/specs/2026-08-29-parallax-product-design.md`
- `docs/superpowers/plans/2026-08-29-parallax-implementation.md`

The design spec and implementation plan should be written only after the component audit is complete.
