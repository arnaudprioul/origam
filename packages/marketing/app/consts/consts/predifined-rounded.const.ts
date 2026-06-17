import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PREDIFINED_ROUNDED_CONST_DOC: IConstDoc = {
    slug: 'predifined-rounded',
    name: 'PREDIFINED_ROUNDED',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.predifined_rounded.description',
    descriptionFallback: 'Whitelist of named border-radius variants (xs → shaped-invert) used by useRounded to decide between a utility class and an inline border-radius declaration.',
    definition: `export const PREDIFINED_ROUNDED: Array<TRounded> = [
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
        { value: 'ROUNDED.X_SMALL', descriptionKey: 'consts.detail.predifined_rounded.x_small', descriptionFallback: 'Extra-small radius — very subtle rounding.' },
        { value: 'ROUNDED.SMALL', descriptionKey: 'consts.detail.predifined_rounded.small', descriptionFallback: 'Small radius — light rounding.' },
        { value: 'ROUNDED.DEFAULT', descriptionKey: 'consts.detail.predifined_rounded.default', descriptionFallback: 'Default radius — standard component rounding.' },
        { value: 'ROUNDED.MEDIUM', descriptionKey: 'consts.detail.predifined_rounded.medium', descriptionFallback: 'Medium radius — moderately rounded corners.' },
        { value: 'ROUNDED.LARGE', descriptionKey: 'consts.detail.predifined_rounded.large', descriptionFallback: 'Large radius — strongly rounded corners.' },
        { value: 'ROUNDED.X_LARGE', descriptionKey: 'consts.detail.predifined_rounded.x_large', descriptionFallback: 'Extra-large radius — very pronounced rounding.' },
        { value: 'ROUNDED.SHAPED', descriptionKey: 'consts.detail.predifined_rounded.shaped', descriptionFallback: 'Shaped — asymmetric pill-like rounding.' },
        { value: 'ROUNDED.SHAPED_INVERT', descriptionKey: 'consts.detail.predifined_rounded.shaped_invert', descriptionFallback: 'Shaped invert — asymmetric rounding in the opposite direction.' },
    ],
    usedBy: [
        { name: 'useRounded' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/rounded.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.predifined_rounded.example',
            titleFallback: 'Checking whether a rounded value is a named token',
            code: `import { PREDIFINED_ROUNDED } from 'origam'

const isNamedRounded = (value: string) =>
  PREDIFINED_ROUNDED.includes(value as never)`,
            lang: 'typescript',
        },
    ],
}
