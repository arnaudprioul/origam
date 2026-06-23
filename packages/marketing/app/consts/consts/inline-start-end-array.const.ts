import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const INLINE_START_END_ARRAY_CONST_DOC: IConstDoc = {
    slug: 'inline-start-end-array',
    name: 'INLINE_START_END_ARRAY',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.inline_start_end_array.description',
    descriptionFallback: 'Extended set of horizontal anchor positions: left, right, start, end. Spreads INLINE_ARRAY and appends the logical-property equivalents (start / end) for RTL-aware layouts.',
    definition: `export const INLINE_START_END_ARRAY: Array<TInlineStartEnd> = [
    ...INLINE_ARRAY,
    START_END.START,
    START_END.END
]`,
    values: [
        { value: 'INLINE.LEFT', descriptionKey: 'consts.detail.inline_start_end_array.left', descriptionFallback: 'Physical left position.' },
        { value: 'INLINE.RIGHT', descriptionKey: 'consts.detail.inline_start_end_array.right', descriptionFallback: 'Physical right position.' },
        { value: 'START_END.START', descriptionKey: 'consts.detail.inline_start_end_array.start', descriptionFallback: 'Logical start (maps to left in LTR, right in RTL).' },
        { value: 'START_END.END', descriptionKey: 'consts.detail.inline_start_end_array.end', descriptionFallback: 'Logical end (maps to right in LTR, left in RTL).' },
    ],
    usedBy: [
        { name: 'useAnchor' },
        { name: 'useLocationStrategies' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/anchor.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.inline_start_end_array.example',
            titleFallback: 'Checking whether a position is a valid horizontal anchor',
            code: `import { INLINE_START_END_ARRAY } from 'origam'

const isValidHorizontal = (pos: string) =>
  (INLINE_START_END_ARRAY as string[]).includes(pos)`,
            lang: 'typescript',
        },
    ],
}
