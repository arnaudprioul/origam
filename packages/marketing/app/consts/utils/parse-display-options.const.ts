import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const PARSE_DISPLAY_OPTIONS_UTIL_DOC: IUtilDoc = {
    slug: 'parse-display-options',
    name: 'parseDisplayOptions',
    category: 'Commons',
    icon: 'mdi-monitor-edit',
    descriptionKey: 'utils.catalog.parse_display_options.description',
    descriptionFallback: 'Merge caller-supplied display options with `DEFAULT_DISPLAY_OPTIONS` via a deep merge, returning a fully resolved `IInternalDisplayOptions` object ready to be consumed by the display composable.',
    signature: `function parseDisplayOptions(options?: IDisplayOptions): IInternalDisplayOptions`,
    params: [
        {
            name: 'options',
            type: 'IDisplayOptions',
            required: false,
            defaultValue: 'DEFAULT_DISPLAY_OPTIONS',
            descriptionKey: 'utils.detail.parse_display_options.param_options',
            descriptionFallback: 'Partial display configuration supplied by the consumer. Falls back to `DEFAULT_DISPLAY_OPTIONS` when omitted.',
        },
    ],
    returns: {
        type: 'IInternalDisplayOptions',
        descriptionKey: 'utils.detail.parse_display_options.returns',
        descriptionFallback: 'A fully resolved display options object with defaults filled in for every unspecified field.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/display.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.parse_display_options.example_basic',
            titleFallback: 'Resolve display options',
            code: `import { parseDisplayOptions } from 'origam'

const resolved = parseDisplayOptions({ mobile: 768 })
// All other thresholds come from DEFAULT_DISPLAY_OPTIONS`,
            lang: 'typescript',
        },
    ],
    related: ['get-client-width', 'get-client-height', 'merge-deep'],
}
