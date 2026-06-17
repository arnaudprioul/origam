import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BORDER_RADIUS_REGEX_CONST_DOC: IConstDoc = {
    slug: 'border-radius-regex',
    name: 'BORDER_RADIUS_REGEX',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.border_radius_regex.description',
    descriptionFallback: 'Regular expression used to detect a free-form CSS border-radius string passed via the rounded prop. Accepts 1–4 values with standard CSS length units or a unit-less 0. Non-matching values fall through to the named-variant or boolean branches of useRounded.',
    definition: `export const BORDER_RADIUS_REGEX = /^(?<radius>(?: ?(?:0|(?:[0-9]+(?:\\.[0-9]+)?)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr))){0,4})$/`,
    value: '/^(?<radius>(?: ?(?:0|(?:[0-9]+(?:\\.[0-9]+)?)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr))){0,4})$/',
    usedBy: [
        { name: 'useRounded' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/rounded.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.border_radius_regex.example',
            titleFallback: 'Testing if a value is a free-form radius',
            code: `import { BORDER_RADIUS_REGEX } from 'origam'

BORDER_RADIUS_REGEX.test('4px')         // true
BORDER_RADIUS_REGEX.test('4px 0 4px 0') // true
BORDER_RADIUS_REGEX.test('lg')           // false → named variant`,
            lang: 'typescript',
        },
    ],
}
