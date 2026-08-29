# Parallax Homepage Redesign Brainstorm

Date: 2026-08-29

## Current Pixel Audit

- The hero has the closest energy to the requested reference, but the rest of the homepage snaps into beige product blocks.
- The scroll section feels pasted on because Lenis is installed from a component and takes over global page scroll.
- White cards and lime badges fight the near-black blue-vein background reference.
- The app screens read like generic SaaS dashboard cards instead of a prediction-risk terminal.
- Registry components are present, but too visibly arranged as stock blocks.

## New Direction

Name: Obsidian Prediction Field

The whole homepage should feel like one continuous dark mineral surface with faint blue market-energy veins. Product surfaces sit inside that field as etched instruments: thin blue borders, dark translucent panels, compact data labels, and sharp motion that responds to scroll without hijacking it.

## Design Dials

- Visual density: 8/10 for the app, 6/10 for homepage storytelling.
- Motion: 7/10, focused on scroll-linked transforms and brief text flashes.
- Color variance: 4/10, intentionally restrained around black, blue, steel, and red risk states.
- Radius: 6px maximum, matching the supplied component/icon reference.
- Decorative motion: only background plasma and graph signals.

## Component Decisions

- Closing Plasma stays, but becomes a section material, not a separate hero-only color world.
- Dithered Logo stays and adopts the blue-white foreground.
- Navigation becomes dark glass over the same page background.
- Stats becomes an instrument strip, not a white SaaS KPI block.
- Carousel becomes a market tape with one active thesis, not colorful cards.
- Expand Details becomes agent evidence drawers in dark panels.
- Alert Dialog becomes transaction review with controlled signature boundary.
- Parallax scrolling is rebuilt without Lenis. Native scroll plus Motion transforms only.

## Scroll Fix

Root cause: `ParallaxComponent` instantiated Lenis and GSAP ScrollTrigger internally, creating global scroll behavior from a page section. On a long homepage this can feel broken, especially with sticky/fixed nav and mobile.

Fix: remove global Lenis and GSAP ScrollTrigger from the component. Use `motion/react` `useScroll` with a section ref and transform-only effects. This keeps normal browser scrolling, respects reduced motion, and prevents scroll ownership conflicts.
