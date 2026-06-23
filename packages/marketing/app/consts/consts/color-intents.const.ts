import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const COLOR_INTENTS_CONST_DOC: IConstDoc = {
    slug: 'color-intents',
    name: 'COLOR_INTENTS',
    category: 'Color',
    descriptionKey: 'consts.catalog.color_intents.description',
    descriptionFallback: 'Runtime Set of every semantic intent recognised by useColorEffect and useColor. Keep in sync with TIntent — adding an intent there must also add the literal here so the isIntent type guard works at runtime.',
    definition: `export const COLOR_INTENTS: ReadonlySet<string> = new Set([
    'neutral', 'primary', 'secondary', 'ghost',
    'success', 'warning', 'danger', 'info'
])`,
    values: [
        { value: "'neutral'", descriptionKey: 'consts.detail.color_intents.neutral', descriptionFallback: 'Neutral surface — maps to the default grey scale.' },
        { value: "'primary'", descriptionKey: 'consts.detail.color_intents.primary', descriptionFallback: 'Brand primary accent color.' },
        { value: "'secondary'", descriptionKey: 'consts.detail.color_intents.secondary', descriptionFallback: 'Brand secondary accent color.' },
        { value: "'ghost'", descriptionKey: 'consts.detail.color_intents.ghost', descriptionFallback: 'Transparent surface — adopts parent color, no utility class shipped.' },
        { value: "'success'", descriptionKey: 'consts.detail.color_intents.success', descriptionFallback: 'Positive / success state.' },
        { value: "'warning'", descriptionKey: 'consts.detail.color_intents.warning', descriptionFallback: 'Warning / caution state.' },
        { value: "'danger'", descriptionKey: 'consts.detail.color_intents.danger', descriptionFallback: 'Error / destructive state.' },
        { value: "'info'", descriptionKey: 'consts.detail.color_intents.info', descriptionFallback: 'Informational state.' },
    ],
    usedBy: [
        { name: 'useColor' },
        { name: 'useColorEffect' },
        { name: 'isIntent' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/color.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.color_intents.example',
            titleFallback: 'Checking if a value is a valid intent at runtime',
            code: `import { COLOR_INTENTS } from 'origam'

const isIntent = (v: unknown): boolean =>
  typeof v === 'string' && COLOR_INTENTS.has(v)`,
            lang: 'typescript',
        },
    ],
}
