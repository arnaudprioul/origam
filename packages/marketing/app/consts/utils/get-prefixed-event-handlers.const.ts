import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_PREFIXED_EVENT_HANDLERS_UTIL_DOC: IUtilDoc = {
    slug: 'get-prefixed-event-handlers',
    name: 'getPrefixedEventHandlers',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_prefixed_event_handlers.description',
    descriptionFallback: 'Filters event-handler attrs by a trailing suffix, strips the suffix, and wraps each handler so it receives an extra getData argument. Used internally to forward scoped event listeners through component boundaries.',
    signature: `function getPrefixedEventHandlers<T extends \`:\${string}\`>(
  attrs: Record<string, any>,
  suffix: T,
  getData: TEventHandler
): Record<\`\${string}\${T}\`, TEventHandler>`,
    params: [
        {
            name: 'attrs',
            type: 'Record<string, any>',
            required: true,
            descriptionKey: 'utils.detail.get_prefixed_event_handlers.param_attrs',
            descriptionFallback: 'The raw attrs object from $attrs / useAttrs(). Only keys that pass isOn() and end with the given suffix are selected.',
        },
        {
            name: 'suffix',
            type: 'T extends `:${string}`',
            required: true,
            descriptionKey: 'utils.detail.get_prefixed_event_handlers.param_suffix',
            descriptionFallback: 'A colon-prefixed suffix string (e.g. ":input"). Event handler keys ending with this suffix are matched and stripped.',
        },
        {
            name: 'getData',
            type: 'TEventHandler',
            required: true,
            descriptionKey: 'utils.detail.get_prefixed_event_handlers.param_get_data',
            descriptionFallback: 'A function called with each event to produce the extra data argument forwarded to the original handler.',
        },
    ],
    returns: {
        type: 'Record<`${string}${T}`, TEventHandler>',
        descriptionKey: 'utils.detail.get_prefixed_event_handlers.returns',
        descriptionFallback: 'An object keyed by the stripped event handler names, each wrapping the original handler with the extra getData call.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/event.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_prefixed_event_handlers.example_basic',
            titleFallback: 'Forward scoped event handlers',
            code: `import { getPrefixedEventHandlers } from 'origam'
import { useAttrs } from 'vue'

const attrs = useAttrs()
// Collect all "onXxx:row" handlers and inject the row data
const rowHandlers = getPrefixedEventHandlers(
  attrs,
  ':row',
  (event) => ({ row: currentRow })
)`,
            lang: 'typescript',
        },
    ],
    related: ['get-position'],
}
