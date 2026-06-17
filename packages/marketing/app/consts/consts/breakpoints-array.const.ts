import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BREAKPOINTS_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'breakpoints-array',
    name: 'BREAKPOINTS_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.breakpoints_array.description',
    descriptionFallback: 'Ordered list of the named responsive breakpoints (sm → xxl) used by the display system. Excludes the implicit xs base.',
    definition: `export const BREAKPOINTS_ARRAY: Array<TBreakpoint> = [
    BREAKPOINTS.SM,
    BREAKPOINTS.MD,
    BREAKPOINTS.LG,
    BREAKPOINTS.XL,
    BREAKPOINTS.XXL
]`,
    values: [
        { value: 'BREAKPOINTS.SM', descriptionKey: 'consts.detail.breakpoints_array.sm', descriptionFallback: 'Small breakpoint — from 600px.' },
        { value: 'BREAKPOINTS.MD', descriptionKey: 'consts.detail.breakpoints_array.md', descriptionFallback: 'Medium breakpoint — from 960px.' },
        { value: 'BREAKPOINTS.LG', descriptionKey: 'consts.detail.breakpoints_array.lg', descriptionFallback: 'Large breakpoint — from 1280px.' },
        { value: 'BREAKPOINTS.XL', descriptionKey: 'consts.detail.breakpoints_array.xl', descriptionFallback: 'Extra-large breakpoint — from 1920px.' },
        { value: 'BREAKPOINTS.XXL', descriptionKey: 'consts.detail.breakpoints_array.xxl', descriptionFallback: 'Double-extra-large breakpoint — from 2560px.' },
    ],
    usedBy: [
        { name: 'useDisplay' },
        { name: 'DEFAULT_DISPLAY_OPTIONS' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/display.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.breakpoints_array.example',
            titleFallback: 'Iterating over the named breakpoints',
            code: `import { BREAKPOINTS_ARRAY } from 'origam'

for (const bp of BREAKPOINTS_ARRAY) {
  console.log(bp) // 'sm', 'md', 'lg', 'xl', 'xxl'
}`,
            lang: 'typescript',
        },
    ],
}
