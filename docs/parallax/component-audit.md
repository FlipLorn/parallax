# Parallax Component Audit

Date: 2026-08-29

## Design Read

Reading this as: greenfield Solana financial-intelligence product for hackathon judges and serious crypto users, with editorial terminal motion, leaning toward shadcn-owned components plus custom data visualization and restrained industrial styling.

Homepage dials:

- `DESIGN_VARIANCE: 8`
- `MOTION_INTENSITY: 8`
- `VISUAL_DENSITY: 7`

App dials:

- `DESIGN_VARIANCE: 6`
- `MOTION_INTENSITY: 6`
- `VISUAL_DENSITY: 9`

## Supplied Components

### `@componentry/closing-plasma`

Decision: use and adapt heavily.

Role:

- Main homepage hero background.
- Recolor to warm paper, charcoal, and deep cobalt.
- Lower sparkle and opacity so it behaves like financial atmosphere, not generic AI glow.
- Keep pointer interaction as a subtle scanning field.

Implementation notes:

- WebGL canvas component.
- Props include `speed`, `turbulence`, `mouseInfluence`, `grain`, `sparkle`, `vignette`, `opacity`, `interactive`, and color stops.
- Must have reduced-motion fallback or static low-speed mode.

### `@componentry/dithered-logo`

Decision: use and adapt.

Role:

- Parallax wordmark/icon treatment in navbar and launch surface.
- Use a custom local SVG mark as source.
- Keep small in navbar, larger inside launch/onboarding transition.

Implementation notes:

- Canvas particle logo with cursor repulsion and click ripples.
- Needs local SVG asset to avoid cross-origin image failures.
- Should not be the only logo signal; pair with accessible text.

### Watermelon `navigation-6`

Decision: adapt only.

Role:

- Use the floating popover navigation mechanics.
- Replace generic SaaS mega menu with Parallax-specific command nav and live event strip.

Required edits:

- Replace orange palette with Parallax cobalt.
- Replace default copy and icons.
- Reduce pill softness and over-large dropdown.
- Remove hand-rolled default logo.
- Ensure nav stays under 80px on desktop.

### Watermelon `stats-3`

Decision: adapt only.

Role:

- Use as homepage trust/data strip and app overview metric language.
- Replace fake SaaS metrics with Parallax stats: PX Risk reduction, event exposures, agent disagreement, simulation boundary.

Required edits:

- Remove fake-perfect numbers such as `99.99%`.
- Remove Product Hunt/G2/Vercel endorsement row.
- Remove purple gradient underline.
- Use tabular figures and thin separators instead of pill cards.

### Watermelon `minimal-carousel`

Decision: adapt.

Role:

- Use for a compact market/opportunity carousel on homepage.
- Could also support the app `Relevant to You` market rail.

Required edits:

- Replace colorful rounded wallet-card look with monochrome market slips.
- Use `motion/react` instead of legacy `framer-motion` imports if the installed package supports it.
- Remove copy/edit wallet behavior.

### Watermelon `expand-details`

Decision: use in product surfaces.

Role:

- PX Risk component inspection.
- Sizing ladder details.
- Agent rationale details.

Required edits:

- Generalize props instead of hardcoded model/cost fields.
- Replace large center demo wrapper.
- Add keyboard semantics and reduced-motion guard.

### Watermelon `dialog-1`

Decision: adapt.

Role:

- Transaction review and risk acknowledgement.
- Failure/restricted-region dialogs.

Required edits:

- Use as a real review drawer/dialog, not a generic destructive alert.
- Replace copy with quote, max loss, max payout, policy checks, simulation status, and signature boundary.
- Radius reduced to Parallax scale.

### Osmo `parallax-scrolling`

Decision: use as scroll-story engine if source installs cleanly.

Role:

- Homepage transformation from portfolio allocation view to event-risk view.
- Launch App transition explaining the product through motion.

Implementation notes:

- 21st.dev page lists dependencies: `gsap` and `@studio-freight/lenis`.
- Remove demo credits from UI.
- Motion must communicate portfolio scanning and event graph expansion.
- No raw fake terminal treatment.

## Icon Direction

Use the screenshot direction provided by the user:

- Monochrome black glyphs.
- Tight square cells.
- Fine dot-grid or hairline context.
- Small, technical, and legible at 16px.
- Signal colors only for semantic states such as success, warning, negative exposure, active risk, and simulation pass.

## Component Usage Map

- Homepage hero: `ClosingPlasma`, `DitheredLogo`, custom event graph overlay.
- Navbar: adapted `navigation-6`.
- Hidden exposure scroll: Osmo-style parallax scrolling.
- Intelligence stats: adapted `stats-3`.
- Market/opportunity strip: adapted `minimal-carousel`.
- FAQ: adapted `faq-5`.
- App inspectable metrics: adapted `expand-details`.
- Transaction review: adapted `dialog-1`.

## Rejections

- Do not use the raw Watermelon visual style.
- Do not keep orange, purple gradients, default SaaS copy, generic icons, demo wrappers, or showcase structure.
- Do not use every component where it weakens the workflow. The mandate is to use these as source material, not ship a component museum.
