import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_DENSITY_DOC: IComposableDoc = {
    slug: 'use-density',
    name: 'useDensity',
    domain: 'Commons',
    icon: 'mdi-view-compact',
    descriptionKey: '',
    descriptionFallback: 'Emits the density modifier class (`compact`, `default`, `comfortable`) onto the root element. Component SCSS rules then pick up the matching density token to adjust spacing, padding and line-height without JS involvement.',
    signature: `function useDensity(
  props: IDensityProps | Ref<number | string | undefined>,
  name?: string
): {
  densityClasses: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IDensityProps | Ref<number | string | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Component props extending IDensityProps, or a plain Ref. Reads the `density` value.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--density-{value}` class.',
        },
    ],
    returns: [
        {
            name: 'densityClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'A single-element array containing the density modifier class (e.g. ["origam-btn--density-compact"]), or an empty array when density is null/undefined.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Density variants',
            code: `<origam-btn density="compact">Compact</origam-btn>
<origam-btn density="default">Default</origam-btn>
<origam-btn density="comfortable">Comfortable</origam-btn>

<!-- Compact text-field inside a toolbar -->
<origam-text-field density="compact" label="Search" />`,
            lang: 'vue',
        },
    ],
    related: ['use-size'],
    consumedInterfaces: ['IDensityProps'],
    noteFallback: 'useDensity only emits a class — there is no densityStyles. All spacing adjustments live in the component SCSS via the `{name}--density-*` selector tree.',
}
