import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_PADDING_DOC: IComposableDoc = {
    slug: 'use-padding',
    name: 'usePadding',
    domain: 'Commons',
    icon: 'mdi-arrow-collapse-all',
    descriptionKey: '',
    descriptionFallback: 'Resolves the `padding` shorthand prop into utility classes for spacing-scale steps (0–12) or inline padding declarations for custom values. Mirror of useMargin for the padding axis.',
    signature: `function usePadding(
  props: IPaddingProps,
  name?: string
): {
  paddingClasses: ComputedRef<string[]>
  paddingStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IPaddingProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending IPaddingProps. Reads the `padding` shorthand.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix used for the `--padded` class.',
        },
    ],
    returns: [
        {
            name: 'paddingClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility class names (e.g. ["origam--p-4"]) for scale steps.',
        },
        {
            name: 'paddingStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline CSS declarations for custom padding values.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Card with scale padding',
            code: `<!-- Emits utility class .origam--p-6 -->
<origam-card padding="6">
  Content
</origam-card>

<!-- Multi-axis: top+bottom=4, left+right=2 -->
<origam-card padding="y-4 x-2">
  Content
</origam-card>`,
            lang: 'vue',
        },
    ],
    related: ['use-margin'],
    consumedInterfaces: ['IPaddingProps'],
}
