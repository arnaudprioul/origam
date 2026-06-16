import type { IComposableDoc } from '~/interfaces/composables-catalog.interface'

export const USE_ELEVATION_DOC: IComposableDoc = {
    slug: 'use-elevation',
    name: 'useElevation',
    domain: 'Commons',
    icon: 'mdi-layers',
    descriptionKey: '',
    descriptionFallback: 'Maps the `elevation` prop to a `--origam-shadow-*` design token. Accepts origam rung names (none/xs/sm/md/lg/xl/2xl/3xl) or Material 0–24 integers. The bgColor parameter is deprecated and ignored since v2.5.',
    signature: `function useElevation(
  props: IElevationProps | Ref<number | string | undefined>,
  flat?: Ref<boolean>,
  bgColor?: Ref<TColor>,
  name?: string
): {
  elevationClasses: ComputedRef<string[]>
  elevationStyles: ComputedRef<string[]>
}`,
    params: [
        {
            name: 'props',
            type: 'IElevationProps | Ref<number | string | undefined>',
            required: true,
            descriptionKey: '',
            descriptionFallback: 'Either the component props object (reads `elevation`) or a plain Ref.',
        },
        {
            name: 'flat',
            type: 'Ref<boolean>',
            required: false,
            defaultValue: 'ref(false)',
            descriptionKey: '',
            descriptionFallback: 'When true, all shadow output is suppressed regardless of the elevation value.',
        },
        {
            name: 'bgColor',
            type: 'Ref<TColor>',
            required: false,
            defaultValue: "ref('rgb(0,0,0)')",
            descriptionKey: '',
            descriptionFallback: 'Deprecated since v2.5. Shadows now come from design tokens. The parameter is still accepted to avoid breaking callers but is completely ignored.',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            defaultValue: 'getCurrentInstanceName()',
            descriptionKey: '',
            descriptionFallback: 'Component name prefix for the `{name}--elevated` class.',
        },
    ],
    returns: [
        {
            name: 'elevationClasses',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Includes `{name}--elevated` and optionally `origam--shadow-{rung}` utility class when the rung is in the Phase 1 manifest.',
        },
        {
            name: 'elevationStyles',
            type: 'ComputedRef<string[]>',
            descriptionKey: '',
            descriptionFallback: 'Inline `box-shadow: var(--origam-shadow---{rung})` declaration.',
        },
    ],
    examples: [
        {
            titleKey: '',
            titleFallback: 'Card elevation variants',
            code: `<!-- Origam rung (preferred) -->
<origam-card elevation="md" />
<origam-card elevation="xl" />

<!-- Material legacy integer (mapped to nearest rung) -->
<origam-card :elevation="4" />   <!-- → md -->
<origam-card :elevation="12" />  <!-- → lg -->

<!-- Remove shadow -->
<origam-card :flat="true" />`,
            lang: 'vue',
        },
    ],
    related: ['use-border'],
    consumedInterfaces: ['IElevationProps'],
    noteFallback: 'The bgColor param warned since v2.5 and will be removed in v3.0.0. Remove it from your composable calls to eliminate the console warning.',
}
