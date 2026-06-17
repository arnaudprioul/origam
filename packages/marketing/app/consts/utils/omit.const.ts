import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const OMIT_UTIL_DOC: IUtilDoc = {
    slug: 'omit',
    name: 'omit',
    category: 'Commons',
    icon: 'mdi-filter-remove-outline',
    descriptionKey: 'utils.catalog.omit.description',
    descriptionFallback: 'Returns a shallow clone of an object with the specified keys removed. The original object is not mutated. TypeScript narrows the return type to Omit<T, U>.',
    signature: `function omit<T extends object, U extends Extract<keyof T, string>>(
  obj: T,
  exclude: Array<U>
): Omit<T, U>`,
    params: [
        {
            name: 'obj',
            type: 'T extends object',
            required: true,
            descriptionKey: 'utils.detail.omit.param_obj',
            descriptionFallback: 'The source object. A shallow clone is created before removing keys.',
        },
        {
            name: 'exclude',
            type: 'Array<U extends Extract<keyof T, string>>',
            required: true,
            descriptionKey: 'utils.detail.omit.param_exclude',
            descriptionFallback: 'Array of key names to exclude from the clone. TypeScript enforces that each key exists on T.',
        },
    ],
    returns: {
        type: 'Omit<T, U>',
        descriptionKey: 'utils.detail.omit.returns',
        descriptionFallback: 'A new object of type Omit<T, U> containing all properties of obj except those listed in exclude.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.omit.example_basic',
            titleFallback: 'Remove internal props before passing to a child',
            code: `import { omit } from 'origam'

const attrs = { id: 'x', class: 'btn', 'data-cy': 'submit', disabled: false }
const cleaned = omit(attrs, ['data-cy', 'disabled'])
// cleaned → { id: 'x', class: 'btn' }`,
            lang: 'typescript',
        },
    ],
    related: ['keys'],
}
