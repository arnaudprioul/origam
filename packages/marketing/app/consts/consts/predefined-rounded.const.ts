import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PREDEFINED_ROUNDED_CONST_DOC: IConstDoc = {
    slug: 'predefined-rounded',
    name: 'PREDEFINED_ROUNDED',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.predefined_rounded.description',
    descriptionFallback: 'Whitelist of named border-radius variants (xs → shaped-invert) used by useRounded to decide between a utility class and an inline border-radius declaration.',
    definition: `export const PREDEFINED_ROUNDED: Array<TRounded> = [
    ROUNDED.X_SMALL,
    ROUNDED.SMALL,
    ROUNDED.DEFAULT,
    ROUNDED.MEDIUM,
    ROUNDED.LARGE,
    ROUNDED.X_LARGE,
    ROUNDED.SHAPED,
    ROUNDED.SHAPED_INVERT
]`,
    values: [
        { value: 'ROUNDED.X_SMALL', descriptionKey: 'consts.detail.predefined_rounded.x_small', descriptionFallback: 'Extra-small radius — very subtle rounding.' },
        { value: 'ROUNDED.SMALL', descriptionKey: 'consts.detail.predefined_rounded.small', descriptionFallback: 'Small radius — light rounding.' },
        { value: 'ROUNDED.DEFAULT', descriptionKey: 'consts.detail.predefined_rounded.default', descriptionFallback: 'Default radius — standard component rounding.' },
        { value: 'ROUNDED.MEDIUM', descriptionKey: 'consts.detail.predefined_rounded.medium', descriptionFallback: 'Medium radius — moderately rounded corners.' },
        { value: 'ROUNDED.LARGE', descriptionKey: 'consts.detail.predefined_rounded.large', descriptionFallback: 'Large radius — strongly rounded corners.' },
        { value: 'ROUNDED.X_LARGE', descriptionKey: 'consts.detail.predefined_rounded.x_large', descriptionFallback: 'Extra-large radius — very pronounced rounding.' },
        { value: 'ROUNDED.SHAPED', descriptionKey: 'consts.detail.predefined_rounded.shaped', descriptionFallback: 'Shaped — asymmetric pill-like rounding.' },
        { value: 'ROUNDED.SHAPED_INVERT', descriptionKey: 'consts.detail.predefined_rounded.shaped_invert', descriptionFallback: 'Shaped invert — asymmetric rounding in the opposite direction.' },
    ],
    usedBy: [
        { name: 'useRounded' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/rounded.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.predefined_rounded.example',
            titleFallback: 'Checking whether a rounded value is a named token',
            code: `import { PREDEFINED_ROUNDED } from 'origam'

const isNamedRounded = (value: string) =>
  PREDEFINED_ROUNDED.includes(value as never)`,
            lang: 'typescript',
        },
    ],
}
