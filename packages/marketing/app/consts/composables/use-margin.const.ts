import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_MARGIN_DOC: IComposableDoc = {
    slug: 'use-margin',
    name: 'useMargin',
    domain: 'Commons',
    icon: 'mdi-arrow-expand-all',
    descriptionKey: '',
    descriptionFallback: 'Resolves the `margin` shorthand prop into utility classes for spacing-scale steps (0–12) or inline margin declarations for custom values. Pass values as strings to opt into the scale ("4" → var(--origam-space---4)).',
    signature: `function useMargin(
  props: IMarginProps,
  name?: string
): {
  marginClasses: ComputedRef<string[]>
  marginStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IMarginProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending IMarginProps. Reads the `margin` shorthand.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix used for the `--marged` class. Defaults to the current Vue instance name.',
        },
    ],
    returns: [
        {
            name: 'marginClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names (e.g. ["origam--m-4"]) for scale steps. Includes the `{name}--marged` class for boolean margin.',
        },
        {
            name: 'marginStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations for custom margin values not covered by the utility scale.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Using the spacing scale',
            code: `<!-- Scale step — emits utility class .origam--m-4 -->
<origam-card margin="4" />

<!-- Numeric pixels (legacy) -->
<origam-card :margin="24" />

<!-- Multi-axis shorthand "top right bottom left" -->
<origam-card margin="t-4 x-2" />`,
            lang: 'vue',
        },
    ],
    related: ['use-padding'],
    consumedInterfaces: ['IMarginProps'],
    noteFallback: 'String "4" opts into the design-system scale (var(--origam-space---4) = 16 px). The numeric 4 is treated as raw pixels (legacy). Axis-specific utilities (mx, mt, …) are not yet in the Phase 1 manifest.',
}
