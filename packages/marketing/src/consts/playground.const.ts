import type { CSSProperties } from 'vue'

/**
 * T4 — HomePlayground
 *
 * Snippet example displayed in the live REPL on first load (also the static
 * fallback rendered through <OrigamCode lang="vue"> when the client editor
 * fails to mount). The `from 'origam'` bare specifier is resolved at runtime
 * by the REPL's import map (see PLAYGROUND_IMPORT_MAP / HomePlaygroundEditor)
 * — without that map the sandbox throws
 * `Failed to resolve module specifier "origam"`.
 */
export const PLAYGROUND_SNIPPET = `<script setup lang="ts">
import { OrigamCard, OrigamTitle, OrigamBtn } from 'origam'
</script>

<template>
  <OrigamCard rounded="lg" border>
    <OrigamTitle tag="h3">Hello Origam</OrigamTitle>
    <p>The Vue 3 design system that just works. Try a component live.</p>
    <OrigamBtn color="primary" append-icon="mdi-arrow-right">
      Get started
    </OrigamBtn>
  </OrigamCard>
</template>
`

/**
 * Preview-card surface (right pane). Non-intent surface token painted via the
 * card's public bg custom-prop (bgColor rejects var() refs by DS policy).
 */
export const PLAYGROUND_PREVIEW_VARS: CSSProperties = {
    '--origam-card---background': 'var(--origam-color__surface---default, #ffffff)',
    '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)'
} as CSSProperties

/**
 * Preview "Get started" button — the maquette renders a light pill (raised
 * surface + ink text + 10px radius), not a solid violet. Driven through the
 * btn's public instance custom-props (the documented escape hatch).
 */
export const PLAYGROUND_PREVIEW_BTN_VARS: CSSProperties = {
    '--origam-btn---background-color': 'var(--origam-color__surface---raised, #fafafa)',
    '--origam-btn---color': 'var(--origam-color__text---primary, #0a0a0a)',
    '--origam-btn---border-radius': 'var(--origam-radius---btn, 10px)'
} as CSSProperties

/**
 * Snippet actually compiled + executed in the live @vue/repl sandbox.
 *
 * It is intentionally SELF-CONTAINED (only `vue`, which the REPL ships in its
 * import map) so the live preview renders with a CLEAN console: the published
 * `origam` ESM cannot be reliably resolved/typed inside the browser sandbox
 * (named-export shape varies by CDN build), which previously surfaced as
 * `Failed to resolve module specifier "origam"` then
 * `module 'origam' does not provide an export named 'OrigamBtn'`.
 *
 * The origam-branded source (PLAYGROUND_SNIPPET) is what the section showcases
 * via the static <OrigamCode> fallback; the live editor demonstrates the
 * "edit & see it render" affordance without a fragile external dependency.
 */
export const PLAYGROUND_REPL_SNIPPET = `<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <main style="font-family: system-ui; display: grid; place-items: center; min-height: 200px; gap: 12px;">
    <h1 style="margin: 0; font-size: 20px;">Hello origam</h1>
    <p style="margin: 0; color: #525252;">Live playground — edit me</p>
    <button
      style="padding: 8px 16px; border-radius: 10px; border: none; background: #7c3aed; color: #fff; cursor: pointer;"
      @click="count++"
    >
      Clicked {{ count }} times
    </button>
  </main>
</template>
`

/**
 * Editor-frame chrome (browser window) instance overrides for <OrigamSheet>.
 *
 * `bgColor`/`rounded` reject `var(--origam-…)` (they expect a TIntent / a
 * radius literal, and warn+deprecate a raw var). The frame surface/radius are
 * non-intent semantic tokens, so — per the project color policy — we paint
 * the sheet's public bg/radius custom-props with the sobre tokens directly.
 * Border colour/width still ride the Sheet's typed `border`/`borderColor`
 * props in the template.
 *
 *   bg     #fafafa → --origam-color__surface---raised (sobre)
 *   shadow         → --origam-shadow---card-elevated (marketing display token)
 *
 * Radius rides the typed `rounded="var(--origam-radius---lg)"` prop now
 * (useRounded accepts custom-property refs since the v2.6 DS fix). The shadow
 * is set on the BASE `--origam-sheet---box-shadow` custom-prop: since the v2.6
 * Sheet fix, the `.origam-sheet--border` rule reads
 * `var(--origam-sheet--border---box-shadow, var(--origam-sheet---box-shadow))`,
 * so the base var is honoured even when `border` is active (border no longer
 * clobbers the elevation).
 */
export const PLAYGROUND_FRAME_RADIUS = 'var(--origam-radius---lg, 14px)'

export const PLAYGROUND_FRAME_VARS: CSSProperties = {
    '--origam-sheet---background': 'var(--origam-color__surface---raised, #fafafa)',
    '--origam-sheet---box-shadow': 'var(--origam-shadow---card-elevated)'
} as CSSProperties

