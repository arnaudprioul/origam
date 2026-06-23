import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CONSOLE_WARN_UTIL_DOC: IUtilDoc = {
    slug: 'console-warn',
    name: 'consoleWarn',
    category: 'Commons',
    icon: 'mdi-alert-outline',
    descriptionKey: 'utils.catalog.console_warn.description',
    descriptionFallback: 'Emits a Vue warn-level message prefixed with "Origam:" to the developer console. Prefer this over console.warn for internal warnings so the message is linked to the Vue component tree.',
    signature: `function consoleWarn(message: string): void`,
    params: [
        {
            name: 'message',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.console_warn.param_message',
            descriptionFallback: 'The warning text to display. It is automatically prefixed with "Origam: ".',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.console_warn.returns',
        descriptionFallback: 'Returns nothing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/console.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.console_warn.example_basic',
            titleFallback: 'Internal component warning',
            code: `import { consoleWarn } from 'origam'

consoleWarn('deprecated prop "size" will be removed in v3')
// → Vue warn: "Origam: deprecated prop "size" will be removed in v3"`,
            lang: 'typescript',
        },
    ],
    related: ['console-error'],
}
