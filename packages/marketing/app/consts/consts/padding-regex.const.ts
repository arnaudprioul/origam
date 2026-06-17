import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const PADDING_REGEX_CONST_DOC: IConstDoc = {
    slug: 'padding-regex',
    name: 'PADDING_REGEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.padding_regex.description',
    descriptionFallback: 'RegExp that validates a CSS shorthand padding string (0 to 4 space-separated values each followed by a supported unit: px, pt, PC, in, cm, mm, em, rem, %, ex, ch, or fr). Returns null for invalid input.',
    definition: `export const PADDING_REGEX = /^(?<padding>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr)){0,4})$/`,
    value: `/^(?<padding>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr)){0,4})$/`,
    usedBy: [
        { name: 'usePadding' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/padding.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.padding_regex.example',
            titleFallback: 'Validating a CSS padding shorthand value',
            code: `import { PADDING_REGEX } from 'origam'

PADDING_REGEX.test('8px 16px')    // true
PADDING_REGEX.test('1em 2rem 0')  // true
PADDING_REGEX.test('auto')        // false`,
            lang: 'typescript',
        },
    ],
}
