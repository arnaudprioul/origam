/**
 * /directives/contrast — documentation data.
 *
 * SOURCE OF TRUTH: packages/ds/src/directives/Contrast/contrast.directive.ts
 */
import type { IDirectiveDoc } from '~/interfaces/directive-doc.interface'

export const CONTRAST_DOC: IDirectiveDoc = {
    slug: 'contrast',
    name: 'v-contrast',
    icon: 'mdi-contrast-circle',
    category: 'Directive',
    descriptionKey: 'directives.contrast.description',
    descriptionFallback: 'Automatically adjusts foreground text colour to meet the WCAG AA contrast ratio (4.5:1 by default, configurable via createOrigam). Pass false to opt out on a specific element.',
    signatureSummary: 'v-contrast | v-contrast="false"',
    signatureCode: `// Enabled — follows createOrigam({ contrast }) global config
v-contrast

// Per-element opt-out
v-contrast="false"`,
    signatureLang: 'ts',

    args: [
        {
            name: 'value',
            type: 'boolean | undefined',
            descriptionKey: 'directives.contrast.arg_value',
            descriptionFallback: 'Omit or set to true to enable auto-contrast. Pass false to disable contrast enforcement for this element only.'
        }
    ],

    examples: [
        {
            titleKey: 'directives.contrast.example_basic_title',
            titleFallback: 'Auto-contrast on a coloured surface',
            lang: 'vue',
            code: `<template>
  <!-- Text colour is computed to satisfy WCAG AA against the background -->
  <origam-btn v-contrast color="primary">
    Auto-legible text
  </origam-btn>
</template>`
        },
        {
            titleKey: 'directives.contrast.example_optout_title',
            titleFallback: 'Per-element opt-out',
            lang: 'vue',
            code: `<template>
  <!-- Skips contrast correction; the declared colour is applied as-is -->
  <origam-btn v-contrast="false" color="primary">
    No auto-contrast
  </origam-btn>
</template>`
        }
    ],

    noteKey: 'directives.contrast.note',
    noteFallback: 'The threshold and algorithm are set globally in createOrigam({ contrast: { threshold: 4.5 } }). Individual elements can override with v-contrast="false" but cannot raise the threshold above the global value.',

    related: [
        {
            slug: 'btn',
            name: 'Btn',
            kind: 'component',
            descriptionKey: 'directives.related.btn',
            descriptionFallback: 'Uses v-contrast internally when color is an intent token.'
        },
        {
            slug: 'chip',
            name: 'Chip',
            kind: 'component',
            descriptionKey: 'directives.related.chip',
            descriptionFallback: 'Applies v-contrast to ensure the label is legible on any coloured surface.'
        }
    ]
}
