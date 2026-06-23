import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const MASONRY_DEFAULTS_CONST_DOC: IConstDoc = {
    slug: 'masonry-defaults',
    name: 'MASONRY_DEFAULTS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.masonry_defaults.description',
    descriptionFallback: 'Default prop values for OrigamMasonry. Exported so consumers can reference or override them when authoring wrappers without re-importing the component.',
    definition: `export const MASONRY_DEFAULTS = {
    columns: 3,
    gap: 'md' as TGridGapSize,
    animated: true,
    align: 'top' as TMasonryAlign,
    tag: 'div'
} as const`,
    values: [
        { value: 'columns: 3', descriptionKey: 'consts.detail.masonry_defaults.columns', descriptionFallback: 'Default number of columns — 3 (typical Pinterest-style layout).' },
        { value: "gap: 'md'", descriptionKey: 'consts.detail.masonry_defaults.gap', descriptionFallback: "Default gap size — 'md', reusing the same token matrix as OrigamGrid." },
        { value: 'animated: true', descriptionKey: 'consts.detail.masonry_defaults.animated', descriptionFallback: 'Transitions enabled by default for smoother resize and column-flip.' },
        { value: "align: 'top'", descriptionKey: 'consts.detail.masonry_defaults.align', descriptionFallback: "Default alignment — 'top' (Pinterest semantics)." },
        { value: "tag: 'div'", descriptionKey: 'consts.detail.masonry_defaults.tag', descriptionFallback: "Root HTML tag — neutral 'div' wrapper." },
    ],
    usedBy: [
        { name: 'OrigamMasonry', slug: 'masonry' },
    ],
    sourceFile: 'packages/ds/src/consts/Masonry/masonry.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.masonry_defaults.example',
            titleFallback: 'Extending MASONRY_DEFAULTS in a wrapper component',
            code: `import { MASONRY_DEFAULTS } from 'origam'

const myDefaults = {
  ...MASONRY_DEFAULTS,
  columns: 4,
  gap: 'lg'
}`,
            lang: 'typescript',
        },
    ],
}
