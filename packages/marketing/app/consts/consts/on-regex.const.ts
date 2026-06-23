import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ON_REGEX_CONST_DOC: IConstDoc = {
    slug: 'on-regex',
    name: 'ON_REGEX',
    category: 'Utilities',
    descriptionKey: 'consts.catalog.on_regex.description',
    descriptionFallback: "Regular expression that matches Vue event-listener prop names (any string starting with 'on' followed by a non-lowercase letter, e.g. onClick, onUpdate:modelValue). Used internally to split attrs into listeners vs plain props.",
    definition: `export const ON_REGEX = /^on[^a-z]/`,
    value: '/^on[^a-z]/',
    usedBy: [
        { name: 'useAttrsAsProps' },
        { name: 'filterProps' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.on_regex.example',
            titleFallback: 'Splitting attrs into listeners and props',
            code: `import { ON_REGEX } from 'origam'

const listeners = Object.fromEntries(
  Object.entries(attrs).filter(([key]) => ON_REGEX.test(key))
)
const plainProps = Object.fromEntries(
  Object.entries(attrs).filter(([key]) => !ON_REGEX.test(key))
)`,
            lang: 'typescript',
        },
    ],
}
