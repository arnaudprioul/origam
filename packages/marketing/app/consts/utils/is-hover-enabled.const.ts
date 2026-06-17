import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const IS_HOVER_ENABLED_UTIL_DOC: IUtilDoc = {
    slug: 'is-hover-enabled',
    name: 'isHoverEnabled',
    category: 'Commons',
    icon: 'mdi-cursor-default',
    descriptionKey: 'utils.catalog.is_hover_enabled.description',
    descriptionFallback: 'Type guard that returns true when hover interactions should be active: when the value is undefined (default-on) or any truthy value. Falsy values (false, 0, "") disable hover.',
    signature: `function isHoverEnabled(value: any): value is true`,
    params: [
        {
            name: 'value',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.is_hover_enabled.param_value',
            descriptionFallback: 'The raw prop value controlling hover. undefined means the prop was not set and hover defaults to enabled; any falsy value other than undefined disables it.',
        },
    ],
    returns: {
        type: 'value is true',
        descriptionKey: 'utils.detail.is_hover_enabled.returns',
        descriptionFallback: 'true when hover is enabled (value is undefined or truthy), narrowing the type to true. false otherwise.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/hover.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.is_hover_enabled.example_basic',
            titleFallback: 'Checking hover state from a prop',
            code: `import { isHoverEnabled } from 'origam'

isHoverEnabled(undefined) // → true  (default enabled)
isHoverEnabled(true)      // → true
isHoverEnabled(false)     // → false
isHoverEnabled(0)         // → false`,
            lang: 'typescript',
        },
    ],
    related: ['is-ripple-enabled'],
}
