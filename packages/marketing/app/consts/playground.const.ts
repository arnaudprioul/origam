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
export const PLAYGROUND_SNIPPET = `<script setup>
import { OrigamCard, OrigamBtn } from 'origam'
</script>

<template>
  <OrigamCard
    title="Hello origam"
    subtitle="Live playground — edit me"
    rounded
    border
    style="max-width:360px; margin:auto"
  >
    <template #footer>
      <OrigamBtn color="primary" rounded>
        Get started
      </OrigamBtn>
    </template>
  </OrigamCard>
</template>
`

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

/**
 * "OPEN" pill (OrigamChip) instance override. OrigamChip has NO `variant`
 * prop — the outlined-pill chrome is built from color="primary" + border +
 * borderColor + pill in the template, identical to HERO_BADGE.
 *
 * The surface is TRANSPARENT (not a purple tint): the chip carries the DS
 * `v-contrast` a11y directive, which — on a purple-tinted fill — forces white
 * text for contrast and overrides the purple ink. Against a transparent
 * surface it correctly keeps the primary purple ink (proven against the live
 * hero badge). A transparent outlined purple pill is the DS-faithful rendering.
 */
export const PLAYGROUND_OPEN_PILL_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties
