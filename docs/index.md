---
layout: home

hero:
  name: origam
  text: A Vue 3 design system
  tagline: Tokens-first, theme-aware, Figma-synced.
  actions:
    - theme: brand
      text: Get started
      link: /guide/installation
    - theme: alt
      text: Components
      link: /components/Btn/OrigamBtn

features:
  - title: Design tokens at the core
    details: |
      Every color, spacing, typography, and motion value flows from
      a Tokens Studio source-of-truth. Edit in Figma, push to GitHub,
      ship to production — no hand-rewriting CSS.
  - title: Multi-theme out of the box
    details: |
      Light, dark, and as many brand themes as you need. Switch with
      `data-theme` on `<html>` or scope per sub-tree via
      `<OrigamThemeProvider>`. No Vue re-render required.
  - title: CSS-first, JS-fallback
    details: |
      Modern CSS (grid-template-areas, container queries, :has,
      aspect-ratio, color-mix, view transitions) is the first-choice
      tool. The `useCssSupport()` composable centralises feature
      detection so JS only kicks in when the browser can't do it natively.
  - title: 60+ components, fully typed
    details: |
      Btn, Card, DataTable, Form, Drawer, ConfirmWrapper… every
      component ships with TypeScript types, Histoire stories,
      and Playwright e2e coverage.
---

## Quick example

```vue
<script setup lang="ts">
import { OrigamBtn, OrigamCard, OrigamThemeProvider } from 'origam/components'
import { useTheme } from 'origam/composables'

const { toggle } = useTheme()
</script>

<template>
    <OrigamThemeProvider theme="dark">
        <OrigamCard>
            <h3>Hello, world.</h3>
            <OrigamBtn color="primary" text="Click me" />
            <OrigamBtn variant="text" @click="toggle" text="Toggle theme" />
        </OrigamCard>
    </OrigamThemeProvider>
</template>
```

## Documentation

- **[Components](/components/Btn/OrigamBtn)** — every component with
  variants, slots, emits, and a token-by-token anatomy.
- **[Composables](/composables/useTheme)** — `useTheme`,
  `useCssSupport`, `useColorEffect`, `useDefaults`, and ~80 more.
- **[Guide](/guide/installation)** — installation, theming,
  Tokens Studio sync, accessibility, migration from v0.x.
