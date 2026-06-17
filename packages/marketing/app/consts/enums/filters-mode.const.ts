import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const FILTERS_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'filters-mode',
    name: 'FILTERS_MODE',
    category: 'Data Display',
    descriptionKey: 'enums.catalog.filters_mode.description',
    descriptionFallback: 'Strategy used when multiple active filters are evaluated together on a collection. Determines whether an item must satisfy some or all conditions.',
    definition: `export enum FILTERS_MODE {
    SOME         = 'some',
    EVERY        = 'every',
    UNION        = 'union',
    INTERSECTION = 'intersection',
}`,
    values: [
        {
            value: 'FILTERS_MODE.SOME',
            descriptionKey: 'enums.detail.filters_mode.some',
            descriptionFallback: 'An item passes if it satisfies at least one active filter.',
        },
        {
            value: 'FILTERS_MODE.EVERY',
            descriptionKey: 'enums.detail.filters_mode.every',
            descriptionFallback: 'An item passes only if it satisfies every active filter.',
        },
        {
            value: 'FILTERS_MODE.UNION',
            descriptionKey: 'enums.detail.filters_mode.union',
            descriptionFallback: 'Returns the union of all per-filter result sets.',
        },
        {
            value: 'FILTERS_MODE.INTERSECTION',
            descriptionKey: 'enums.detail.filters_mode.intersection',
            descriptionFallback: 'Returns only items present in every per-filter result set.',
        },
    ],
    usedBy: [
        { slug: 'select', name: 'Select', propName: 'filterMode' },
    ],
    sourceFile: 'packages/ds/src/enums/Commons/filters.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.filters_mode.example',
            titleFallback: 'Requiring all conditions to match',
            code: `<origam-select :filter-mode="FILTERS_MODE.EVERY" :items="options" />`,
            lang: 'vue',
        },
    ],
}
