import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const NOOP_UTIL_DOC: IUtilDoc = {
    slug: 'noop',
    name: 'noop',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.noop.description',
    descriptionFallback: 'A no-operation function that accepts no arguments and returns nothing. Used as a safe default callback placeholder where a function reference is required.',
    signature: `function noop(): void`,
    params: [],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.noop.returns',
        descriptionFallback: 'Nothing. The function body is empty.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.noop.example_basic',
            titleFallback: 'Use as a default prop value',
            code: `import { noop } from 'origam'

const props = withDefaults(defineProps<{ onClick?: () => void }>(), {
    onClick: noop,
})`,
            lang: 'typescript',
        },
    ],
    related: ['keys', 'omit'],
}
