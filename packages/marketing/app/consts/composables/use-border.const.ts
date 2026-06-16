import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_BORDER_DOC: IComposableDoc = {
    slug: 'use-border',
    name: 'useBorder',
    domain: 'Commons',
    icon: 'mdi-border-all',
    descriptionKey: '',
    descriptionFallback: 'Resolves the `border` prop (boolean, width keyword, direction string or number) into utility classes and inline border declarations. Supports standalone borderColor and borderStyle props.',
    signature: `function useBorder(
  props: IBorderProps | Ref<boolean | number | string | TDirectionBoth | TDirectionBoth[] | null | undefined>,
  name?: string
): {
  borderClasses: ComputedRef<string[]>
  borderStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IBorderProps | Ref<...>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Either the component props object (reads border, borderColor, borderStyle) or a plain Ref for the border shorthand only.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--border` class.',
        },
    ],
    returns: [
        {
            name: 'borderClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Classes including `{name}--border`, optional direction suffix, and utility classes (origam--border-thin/thick/none).',
        },
        {
            name: 'borderStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline border declarations for numeric widths and free-form string shorthand. Also includes standalone borderColor and borderStyle when set.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Common border patterns',
            code: `<!-- Boolean: thin border (utility class origam--border-thin) -->
<origam-card border />

<!-- Named width keyword -->
<origam-card border="thick" />

<!-- Direction subset -->
<origam-card border="top" />

<!-- Custom color override -->
<origam-card border border-color="var(--origam-color__action--primary---bg)" />`,
            lang: 'vue',
        },
    ],
    related: ['use-rounded', 'use-elevation'],
    consumedInterfaces: ['IBorderProps'],
}
