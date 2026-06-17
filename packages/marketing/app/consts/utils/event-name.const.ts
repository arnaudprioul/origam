import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const EVENT_NAME_UTIL_DOC: IUtilDoc = {
    slug: 'event-name',
    name: 'eventName',
    category: 'Commons',
    icon: 'mdi-lightning-bolt',
    descriptionKey: 'utils.catalog.event_name.description',
    descriptionFallback: 'Converts a Vue prop name in the "onXxx" format to the corresponding event name "xxx". Used internally to derive emit names from prop names.',
    signature: `function eventName(propName: string): string`,
    params: [
        {
            name: 'propName',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.event_name.param_prop_name',
            descriptionFallback: 'A Vue prop name starting with "on" followed by a capitalised event name, e.g. "onClick", "onUpdate:modelValue".',
        },
    ],
    returns: {
        type: 'string',
        descriptionKey: 'utils.detail.event_name.returns',
        descriptionFallback: 'The corresponding event name with the "on" prefix removed and the first letter lowercased, e.g. "click" or "update:modelValue".',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.event_name.example_basic',
            titleFallback: 'Derive event name from prop',
            code: `import { eventName } from 'origam'

eventName('onClick')               // → 'click'
eventName('onUpdate:modelValue')   // → 'update:modelValue'`,
            lang: 'typescript',
        },
    ],
    related: ['find-children-with-provide', 'defer'],
}
