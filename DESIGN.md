---
version: alpha
name: SportyPlus — developer docs
description: >-
  docs.sporty.plus on Docus 5 / Nuxt UI 4. A SportyPlus-owned surface, so it carries the
  brand in full — no club theming.
colors:
  # Brand core, from Inspirium/tennis-web DESIGN.md — do not redefine
  primary: "#02AAF5"
  primary-deep: "#0187C4"
  primary-ink: "#0275A9"
  primary-soft: "#E6F6FE"
  logo-ink: "#3F444C"
  on-primary: "#FFFFFF"
  neutral: "#6B7280"
typography:
  headline:
    fontFamily: Quicksand
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: Quicksand
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.6
  code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
rounded:
  md: 8px
  full: 9999px
components:
  link:
    textColor: "{colors.primary-ink}"
  button-primary:
    backgroundColor: "{colors.primary-ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
  callout-tip:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-ink}"
  accent-bar:
    backgroundColor: "{colors.primary}"
  hover:
    textColor: "{colors.primary-deep}"
  logo:
    textColor: "{colors.logo-ink}"
  meta:
    textColor: "{colors.neutral}"
---

# SportyPlus docs design system

The **brand core** is owned by `Inspirium/tennis-web`'s `DESIGN.md`. Resolve it with
`repo-path Inspirium/tennis-web`, and never redefine those values here. The gaps in this
repo are tracked in that repo's `docs/DESIGN_ROADMAP.md`.

Validate after editing: `npx @google/design.md lint DESIGN.md`.

## Overview

These are the developer and integration docs for SportyPlus. Like the marketing site, the
docs are a **SportyPlus-owned** surface, so they wear the brand in full: SportyPlus blue and
Quicksand. Club theming does not apply. The tone is clear and technical, close to the
Docus defaults, recoloured.

## Colors

- **Primary is SportyPlus blue.** Docus defaults to **emerald**, and this repo currently
  overrides nothing, so links, buttons and the loading bar are green.
  - The fix is an `app/app.css` that defines a `sporty` ramp in `@theme`, with
    `#02AAF5` at 500.
  - Then `ui.colors.primary: 'sporty'` in `app/app.config.ts`.
- **Text-size blue** uses `primary-ink`. `#02AAF5` is 2.6:1 on white, so it is only for
  fills, accents and dark mode.
- **Neutral:** Docus uses `zinc` by default. Leave neutrals to Nuxt UI's semantic tokens.

## Typography

- Use **Quicksand** (400/500/600/700) for headings and body, loaded with `@nuxt/fonts`.
- Use a monospace face for code.

## Components

- Prefer Docus and Nuxt UI components and MDC blocks. Add custom components only for
  things Docus lacks.
- The header logo is `app/components/AppHeaderLogo.vue`: the SportyPlus mark in
  `currentColor`. Give it the wordmark and an accessible name.
- Icons use the custom `sporty-` collection in `app/assets/icons/`.

## Do's and Don'ts

- **Don't** ship with Docus's default emerald, or any colour that isn't the brand's.
- **Do** keep the favicon visible on both light and dark tabs. Today
  `public/favicon.svg` is white-only.
- **Don't** hard-code colours in content. Use MDC props (`color: primary`).
