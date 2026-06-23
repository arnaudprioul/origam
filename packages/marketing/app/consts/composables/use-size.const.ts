import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_SIZE_DOC: IComposableDoc = {
    slug: 'use-size',
    name: 'useSize',
    domain: 'Commons',
    icon: 'mdi-magnify-plus-outline',
    descriptionKey: '',
    descriptionFallback: 'Resolves the `size` prop to component-local modifier classes and optional width/height inline styles. Named presets (x-small/small/default/large/x-large) emit BEM modifier classes; custom values emit pixel dimensions.',
    signature: `function useSize(
  props: ISizeProps,
  name?: string
): {
  sizeClasses: ComputedRef<string[]>
  sizeStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'ISizeProps',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending ISizeProps. Reads the `size` value.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--size-{value}` class.',
        },
    ],
    returns: [
        {
            name: 'sizeClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Component-local BEM modifier class (e.g. "origam-btn--size-small") plus the typographic utility class (e.g. "origam--text-sm") bridging the legacy to modern taxonomy.',
        },
        {
            name: 'sizeStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline width and height declarations for custom numeric or CSS-length sizes (when the value is not a named preset).',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Named size presets',
            code: `<origam-btn size="x-small">XS</origam-btn>
<origam-btn size="small">S</origam-btn>
<origam-btn size="default">M</origam-btn>
<origam-btn size="large">L</origam-btn>
<origam-btn size="x-large">XL</origam-btn>`,
            lang: 'vue',
        },
        {
            titleKey: '',
            titleFallback: 'Custom pixel size (Avatar)',
            code: `<!-- 64px square avatar — emits width: 64px; height: 64px -->
<origam-avatar size="64" icon="mdi-account" />`,
            lang: 'vue',
        },
    ],
    related: ['use-dimension', 'use-density'],
    consumedInterfaces: ['ISizeProps'],
    noteFallback: 'sizeClasses is most useful for typographic components (Btn, Chip) where the named size implies a font-size rung. For purely box-sized components (Avatar, Icon), use the numeric form and rely on sizeStyles.',
}
