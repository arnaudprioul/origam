import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ROUNDED_DOC: IComposableDoc = {
    slug: 'use-rounded',
    name: 'useRounded',
    domain: 'Commons',
    icon: 'mdi-rounded-corner',
    descriptionKey: '',
    descriptionFallback: 'Resolves the `rounded` prop to border-radius classes and inline styles. Supports the modern utility taxonomy (xs/sm/md/lg/xl/none/full), the legacy named variants (x-small/small/default/medium/large/x-large/shaped), numbers and free-form CSS values.',
    signature: `function useRounded(
  props: IRoundedProps | Ref<boolean | number | string | TRounded | null | undefined>,
  name?: string
): {
  roundedClasses: ComputedRef<string[]>
  roundedStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IRoundedProps | Ref<boolean | number | string | TRounded | null | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Either the component props object or a plain Ref. Reads the `rounded` value.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--rounded-*` legacy classes.',
        },
    ],
    returns: [
        {
            name: 'roundedClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Utility classes (origam--rounded-*) for modern rungs, or component-local classes for legacy named variants.',
        },
        {
            name: 'roundedStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline border-radius declaration. Always emitted alongside the class to win cascade specificity battles against scoped component rules.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Radius presets',
            code: `<!-- Modern utility rung -->
<origam-card rounded="lg" />     <!-- → origam--rounded-lg + border-radius: 12px -->
<origam-card rounded="full" />   <!-- → circle / pill -->

<!-- Legacy named variant -->
<origam-btn rounded="x-large" />

<!-- Numeric px -->
<origam-card :rounded="20" />

<!-- Custom CSS value -->
<origam-card rounded="var(--origam-radius---card)" />`,
            lang: 'vue',
        },
    ],
    related: ['use-border'],
    consumedInterfaces: ['IRoundedProps'],
    noteFallback: 'Inline roundedStyles is always emitted alongside the class because component scoped rules (specificity 0,2,0) routinely win over utility classes (0,1,0). The inline style lands at specificity 1,0,0 and wins everywhere.',
}
