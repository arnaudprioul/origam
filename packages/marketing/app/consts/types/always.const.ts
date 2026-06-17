import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const ALWAYS_TYPE_DOC: ITypeDoc = {
    slug: 'always',
    name: 'TAlways',
    kind: 'type',
    category: 'Misc',
    descriptionKey: 'types.catalog.always.description',
    descriptionFallback: 'Tri-state boolean prop pattern — forces a value always on, always off, or defers to the component default.',
    definition: `export type TAlways = boolean | 'always'`,
    values: [
        { value: 'true', descriptionKey: 'types.detail.always.true', descriptionFallback: 'Force the behaviour on.' },
        { value: 'false', descriptionKey: 'types.detail.always.false', descriptionFallback: 'Force the behaviour off.' },
        { value: 'always', descriptionKey: 'types.detail.always.always', descriptionFallback: 'Keep the behaviour active unconditionally, even in states that would normally suppress it (e.g. hover-only).' },
    ],
    usedBy: [
        { slug: 'slider-field', name: 'SliderField', propName: 'showTicks' },
    ],
    sourceFile: 'packages/ds/src/types/SliderField/slider-field.type.ts',
    examples: [
        {
            titleKey: 'types.detail.always.example',
            titleFallback: 'SliderField with ticks always visible vs on thumb only',
            code: `<!-- ticks only near thumb (default) -->
<origam-slider-field :model-value="50" show-ticks />

<!-- ticks always shown -->
<origam-slider-field :model-value="50" show-ticks="always" />`,
            lang: 'html',
        },
    ],
}
