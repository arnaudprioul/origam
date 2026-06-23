import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_UTILITY_INTENTS_CONST_DOC: IConstDoc = {
    slug: 'color-utility-intents',
    name: 'COLOR_UTILITY_INTENTS',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_utility_intents.description',
    descriptionFallback: 'Subset of COLOR_INTENTS for which a global utility class is shipped in origam-utilities.css. ghost is intentionally excluded because its transparent surface cannot be expressed by a single static utility class.',
    definition: `export const COLOR_UTILITY_INTENTS: ReadonlySet<string> = new Set([
    'neutral', 'primary', 'secondary',
    'success', 'warning', 'danger', 'info'
])`,
    values: [
        { value: "'neutral'", descriptionKey: 'consts.detail.color_utility_intents.neutral', descriptionFallback: 'Utility class .origam--color-neutral shipped.' },
        { value: "'primary'", descriptionKey: 'consts.detail.color_utility_intents.primary', descriptionFallback: 'Utility class .origam--color-primary shipped.' },
        { value: "'secondary'", descriptionKey: 'consts.detail.color_utility_intents.secondary', descriptionFallback: 'Utility class .origam--color-secondary shipped.' },
        { value: "'success'", descriptionKey: 'consts.detail.color_utility_intents.success', descriptionFallback: 'Utility class .origam--color-success shipped.' },
        { value: "'warning'", descriptionKey: 'consts.detail.color_utility_intents.warning', descriptionFallback: 'Utility class .origam--color-warning shipped.' },
        { value: "'danger'", descriptionKey: 'consts.detail.color_utility_intents.danger', descriptionFallback: 'Utility class .origam--color-danger shipped.' },
        { value: "'info'", descriptionKey: 'consts.detail.color_utility_intents.info', descriptionFallback: 'Utility class .origam--color-info shipped.' },
    ],
    usedBy: [
        { name: 'useColor' },
        { name: 'useBackgroundColor' },
        { name: 'useTextColor' },
        { name: 'useColorEffect' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_utility_intents.example',
            titleFallback: 'Checking whether an intent has a utility class',
            code: `import { COLOR_UTILITY_INTENTS } from 'origam'

const hasUtilityClass = (intent: string) =>
  COLOR_UTILITY_INTENTS.has(intent)

// hasUtilityClass('ghost') → false (falls back to inline style)`,
            lang: 'typescript',
        },
    ],
}
