import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CONSOLE_ERROR_UTIL_DOC: IUtilDoc = {
    slug: 'console-error',
    name: 'consoleError',
    category: 'Commons',
    icon: 'mdi-alert-circle-outline',
    descriptionKey: 'utils.catalog.console_error.description',
    descriptionFallback: 'Emits a Vue warn-level message prefixed with "Origam error:" to the developer console. Prefer this over console.error for internal error reporting so the message is tied to the Vue component tree.',
    signature: `function consoleError(message: string): void`,
    params: [
        {
            name: 'message',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.console_error.param_message',
            descriptionFallback: 'The error description to display. It is automatically prefixed with "Origam error: ".',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.console_error.returns',
        descriptionFallback: 'Returns nothing.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/console.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.console_error.example_basic',
            titleFallback: 'Internal component error reporting',
            code: `import { consoleError } from 'origam'

consoleError('prop "color" received an invalid value')
// → Vue warn: "Origam error: prop "color" received an invalid value"`,
            lang: 'typescript',
        },
    ],
    related: ['console-warn'],
}
