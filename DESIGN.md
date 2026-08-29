# PARALLAX — Masterclass Design System & Architecture Blueprint

This document defines the exact design philosophy, visual token architecture, layout principles, typography rules, animation physics, and micro-interaction patterns developed for **PARALLAX** (Autonomous Event-Risk Intelligence OS). 

It is designed to serve as a reusable blueprint for building state-of-the-art, institutional-grade web applications and hackathon-winning products.

---

## 1. Foundational Philosophy: Concept-Driven Identity

### Core Rule: Never Build a Generic Template
Most crypto and AI web applications suffer from visual homogeneity:
- ❌ Generic purple/blue neon gradients
- ❌ Floating glowing AI orbs or 3D coins
- ❌ Repetitive 3-column bento grids wrapped in dark cards
- ❌ Meaningless "future of finance" marketing slogans

### The Parallax Paradigm: Visual Displacement
Every design choice must stem directly from the core product thesis:
> *"What could happen to what I own — and what should I do about it?"*

The visual identity is built around **PARALLAX DISPLACEMENT** — the analytical gap between two perspectives on the same event:
1. **MARKET VIEW** (Baseline implied market odds)
2. **PARALLAX VIEW** (Specialist AI quorum consensus)

#### Signature Visual Tokens:
- **Displaced Layers**: Offsetting Market baseline lines and Parallax active lines by a few pixels on mouse move.
- **Offset Probability Markers**: Staggered ticks along horizontal spectrum rulers.
- **Physical Analyst Note Objects**: High-contrast warm-white cards (`#F1F0EA` with dark ink text) placed strategically against dark page canvases to make key event memorandums feel tangible.

---

## 2. Color System & Signal Balance

The color architecture avoids aggressive neon glows, favoring an analytical, dark obsidian foundation with high-contrast signal accents.

### Palette Architecture
```css
:root {
  /* Canvas Backgrounds */
  --background: #070A0E; /* Deep Analytical Obsidian */
  --surface:    #0C1016; /* Card & Panel Surface */
  --raised:     #111720; /* Elevated Panels & Active Ticks */
  --rule:       #1A2029; /* Hairline Vector Borders */

  /* Typography */
  --foreground:     #F1F0EA; /* Warm Alabaster Ink */
  --secondary-text: #9398A2; /* Slate Monospace Metadata */

  /* Signal Accents */
  --parallax-cobalt: #2878FF; /* Electric Analytical Blue */
  --positive:        #B9FF57; /* Lime Edge / Profit Green */
  --negative:        #FF654D; /* Warm Vermilion Risk Red */
  --warning:         #FFB648; /* Amber Macro Warning */
}
```

### Contrast Rules:
1. **Signal Color Restraint**: Signal colors (`#2878FF`, `#B9FF57`, `#FF654D`) must be used sparingly for data callouts, active connections, and probability edge values — never for whole backgrounds.
2. **Physical Analyst Note Inversion**: Use `#F1F0EA` (Warm Alabaster) as a solid background with `#070A0E` dark text for physical memorandum cards. This creates an immediate visual anchor on dark pages.

---

## 3. Typography & Data Density Rules

### Scale Hierarchy
- **Hero Title**: `text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]`
- **Act / Section Headers**: `text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight`
- **Data Callouts & Raw Stats**: `text-5xl sm:text-8xl font-black font-mono tracking-tighter`
- **Supporting Copy**: `text-base sm:text-lg text-[#9398A2] max-w-2xl`
- **Monospace Metadata**: `font-mono text-xs uppercase tracking-wider`

### Strict Monospace Scoping:
Use `font-mono` and `tabular-nums` **ONLY** for:
- Probabilities (`56.0%`, `68.4%`)
- Financial dollar values (`$38,750`, `$18,420`)
- Model Brier scores (`0.128`)
- Micro badges & timestamps (`STEP 01`, `0.82 BETA`)

Do **NOT** use monospace for long-form explanatory body copy.

### Metallic Text Shine Streams (`.animate-hero-shine`)
For hero headlines, use a continuous multi-stop linear gradient sweep to simulate metallic light traveling across the typography:

```css
@keyframes heroTextShine {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-hero-shine {
  background: linear-gradient(
    110deg,
    #F1F0EA 0%,
    #F1F0EA 20%,
    #38BDF8 40%,
    #FFFFFF 50%,
    #2878FF 60%,
    #F1F0EA 80%,
    #F1F0EA 100%
  );
  background-size: 200% 100%;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: heroTextShine 4.5s ease-in-out infinite;
}
```

---

## 4. Layout Composition & Narrative Acts

### The 50% Card Reduction Rule
Avoid surrounding every element in a dark bordered card. Reduce card usage by 50% using:
- **Spatial Alignment & Negative Space**
- **Hairline Horizontal Rules (`#1A2029`)**
- **Raw Large Typography Stats**
- **Direct Canvas Vector Graphs**

### 4-Act Narrative Layout Blueprint

```
┌─────────────────────────────────────────────────────────────┐
│ 01 — LIVE EVENT-RISK HERO                                   │
│ • Massive headline + metallic text shine stream             │
│ • Direct canvas graph: Tokens → Discovered Events          │
│ • Edge beta labels + Node Inspector + Cursor Micro-Parallax │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 02 — HIDDEN EXPOSURE (TOKENS ARE NOT YOUR TRUE RISK)        │
│ • Section Label: 01 / HIDDEN EXPOSURE                       │
│ • Scroll Transformation: Token Weights → Event Mapping      │
│ • Physical Warm-White Analyst Note Card (#F1F0EA)           │
│ • Thesis: "Tokens are positions. Events are the hidden portfolio."
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 03 — MARKET vs PARALLAX (INTELLIGENCE SCENE)                │
│ • Protagonist event: SOL ABOVE $250 BEFORE DEC 31           │
│ • Raw typography numbers: 56.0% vs 68.4% (+12.4% Edge)      │
│ • 0–100 Staggered Zero-Collision Probability Ruler          │
│ • Specialist Quorum Evidence Inspector                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 04 — RISK TO ACTION PAYOFF                                  │
│ • Enormous PX 72 HIGH typography                            │
│ • Interactive Hedge Simulation (72 ↓ 59 risk reduction)     │
│ • Sequential Constraint Chain (Steps 01-06)                 │
│ • Trust Statement: "The agent can think. Your wallet decides."
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│ 05 — MINIMAL FINAL CTA & FOOTER DISCLOSURE                  │
│ • "Know your risk before the market does."                 │
│ • Launch Parallax → CTA                                     │
│ • Collapsible FAQ Accordion                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Motion System & Micro-Interactions

Motion must always serve data computation or viewport reveal — never random decorative bouncing.

### 1. Viewport Scroll Entrance (`<ScrollReveal>`)
Wrap sections in a scroll reveal wrapper that fades, shifts upward by 30-40px, and un-blurs from `blur(12px)` to `blur(0px)` as it enters the viewport:

```tsx
<motion.div
  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
>
  {children}
</motion.div>
```

### 2. Animated Number Count-Up (`<AnimatedCounter>`)
Interpolate financial statistics and probability values smoothly using an `easeOutExpo` function when scrolled into view:

```tsx
<AnimatedCounter value={68.4} decimals={1} suffix="%" />
```

### 3. Zero-Collision Probability Ruler
To prevent text labels from colliding when probability ticks are close together (e.g. 53% and 56%), stagger label positions:
- **Even Index Ticks**: Position label ABOVE the horizontal axis (`-top-12`).
- **Odd Index Ticks**: Position label BELOW the horizontal axis (`top-5`).

### 4. Interactive Hover Glow (`.hover-glow-card`)
Apply micro-hover lifts with cobalt border highlights on interactive elements:

```css
.hover-glow-card {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hover-glow-card:hover {
  transform: translateY(-2px);
  border-color: rgba(40, 120, 255, 0.4);
  box-shadow: 0 0 25px rgba(40, 120, 255, 0.15);
}
```

---

## 6. Microcopy & Tone Guidelines

Replace generic marketing buzzwords with structured, analytical system terminology:

| ❌ AVOID (Generic Marketing) | ✅ USE (System Intelligence) |
| :--- | :--- |
| "Trade smarter with AI." | "3 material event risks detected." |
| "Unlock powerful insights." | "Parallax disagrees with the market by 12.4%." |
| "AI-powered risk management." | "62% of this wallet has positive SOL beta." |
| "Future of prediction markets." | "Simulation passed. Wallet signature required." |
| "Automated trading bot." | "The agent can think. Your wallet still decides." |

---

## 7. Reusable Implementation Checklist for Future Projects

When starting a new high-end web app using this blueprint:

- [ ] **Define Concept Theme**: Identify the core thesis and signature visual metaphor (e.g. displacement, spectrum, topology).
- [ ] **Configure CSS Tokens**: Set up `#070A0E` background, `#0C1016` surface, `#1A2029` rules, and `#2878FF` primary cobalt in `globals.css`.
- [ ] **Set Up Monospace Rules**: Apply `tabular-nums` to `font-mono` and scope monospace exclusively to numbers and metadata.
- [ ] **Build ScrollReveal Wrapper**: Create `scroll-reveal.tsx` for un-blur viewport entrance animations.
- [ ] **Build AnimatedCounter**: Create `animated-counter.tsx` for cubic-bezier number count-ups.
- [ ] **Craft Physical Analyst Notes**: Create at least 1 high-contrast warm-white card object (`#F1F0EA`) to break dark page density.
- [ ] **Enforce Card Reduction**: Use raw typography, spatial rules, and alignment instead of wrapping every section in bordered cards.
- [ ] **Audit Build Health**: Verify zero TypeScript/lint errors in `pnpm run build` and 100% test pass rate in `pnpm run test`.
