import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const CONVERT_TO_INTERNAL_HEADERS_UTIL_DOC: IUtilDoc = {
    slug: 'convert-to-internal-headers',
    name: 'convertToInternalHeaders',
    category: 'DataTable',
    icon: 'mdi-table-headers-eye',
    descriptionKey: 'utils.catalog.convert_to_internal_headers.description',
    descriptionFallback: 'Transforms an array of user-supplied IDataTableHeader definitions into normalised IInternalDataTableHeader objects, filling in default key/value fields, sortable flags, and recursively processing nested column groups.',
    signature: `function convertToInternalHeaders(
  items: Array<IDataTableHeader>
): Array<IInternalDataTableHeader>`,
    params: [
        {
            name: 'items',
            type: 'Array<IDataTableHeader>',
            required: true,
            descriptionKey: 'utils.detail.convert_to_internal_headers.param_items',
            descriptionFallback: 'The raw header definitions as provided by the consumer via the headers prop of OrigamDataTable.',
        },
    ],
    returns: {
        type: 'Array<IInternalDataTableHeader>',
        descriptionKey: 'utils.detail.convert_to_internal_headers.returns',
        descriptionFallback: 'Normalised internal header objects with guaranteed key, value, sortable, and (optionally) children fields.',
    },
    sourceFile: 'packages/ds/src/utils/DataTable/headers.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.convert_to_internal_headers.example_basic',
            titleFallback: 'Used internally by OrigamDataTable',
            code: `import { convertToInternalHeaders } from 'origam'

const internal = convertToInternalHeaders([
  { title: 'Name', key: 'name' },
  { title: 'Age',  value: 'age', sortable: false },
])`,
            lang: 'typescript',
        },
    ],
    related: [],
}
