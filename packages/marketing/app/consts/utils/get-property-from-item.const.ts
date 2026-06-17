import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_PROPERTY_FROM_ITEM_UTIL_DOC: IUtilDoc = {
    slug: 'get-property-from-item',
    name: 'getPropertyFromItem',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_property_from_item.description',
    descriptionFallback: 'Extracts a value from a data item using a flexible TSelectItemKey accessor — a string path, an array path, a boolean identity flag, or a custom extractor function — with a fallback for missing values.',
    signature: `function getPropertyFromItem(item: any, property: TSelectItemKey, fallback?: any): any`,
    params: [
        {
            name: 'item',
            type: 'any',
            required: true,
            descriptionKey: 'utils.detail.get_property_from_item.param_item',
            descriptionFallback: 'The data item (object, primitive, or array) to extract a value from.',
        },
        {
            name: 'property',
            type: 'TSelectItemKey',
            required: true,
            descriptionKey: 'utils.detail.get_property_from_item.param_property',
            descriptionFallback: 'The key accessor. true = return the item itself; string = dot-path; string[] = nested path; function = custom extractor. null, undefined, or false returns the fallback.',
        },
        {
            name: 'fallback',
            type: 'any',
            required: false,
            descriptionKey: 'utils.detail.get_property_from_item.param_fallback',
            descriptionFallback: 'Value returned when the property cannot be resolved. Defaults to undefined.',
        },
    ],
    returns: {
        type: 'any',
        descriptionKey: 'utils.detail.get_property_from_item.returns',
        descriptionFallback: 'The extracted value, the item itself (when property is true), or the fallback.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_property_from_item.example_basic',
            titleFallback: 'Extract label and value from a select item',
            code: `import { getPropertyFromItem } from 'origam'

const item = { label: 'Alice', value: 1, meta: { role: 'admin' } }

getPropertyFromItem(item, 'label')            // → 'Alice'
getPropertyFromItem(item, ['meta', 'role'])   // → 'admin'
getPropertyFromItem(item, true)               // → item (identity)
getPropertyFromItem(item, i => i.value * 10) // → 10`,
            lang: 'typescript',
        },
    ],
    related: ['get-nested-value', 'get-object-value-by-path'],
}
